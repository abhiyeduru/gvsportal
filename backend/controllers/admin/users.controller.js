import User from "../../models/User.js";
import Job from "../../models/Job.js";
import Application from "../../models/Application.js";
import { ApiError } from "../../utils/error.js";

// Get All Users with Filters
export const getAllUsers = async (req, res, next) => {
  try {
    const {
      role,
      isVerified,
      isBlocked,
      page = 1,
      limit = 20,
      search,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    // Build filter object
    const filter = {};
    if (role) filter.role = role;
    if (isVerified !== undefined) filter.isVerified = isVerified === "true";
    if (isBlocked !== undefined) filter.isBlocked = isBlocked === "true";

    // Add search functionality
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { "location.city": { $regex: search, $options: "i" } },
        { "location.state": { $regex: search, $options: "i" } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Get users with pagination
    const users = await User.find(filter)
      .select("-password")
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("companies", "name")
      .lean();

    // Get total count for pagination
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / parseInt(limit));

    // Add additional stats for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        let additionalStats = {};

        if (user.role === "teacher") {
          const applicationCount = await Application.countDocuments({ applicant: user._id });
          const jobsApplied = await Application.find({ applicant: user._id })
            .populate("job", "title")
            .limit(3);
          additionalStats = { applicationCount, recentApplications: jobsApplied };
        } else if (user.role === "school") {
          const jobsPosted = await Job.countDocuments({ company: { $in: user.companies } });
          const applicationsReceived = await Application.countDocuments({
            job: { $in: await Job.find({ company: { $in: user.companies } }).select("_id") }
          });
          additionalStats = { jobsPosted, applicationsReceived };
        }

        return {
          ...user,
          ...additionalStats
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: {
        users: usersWithStats,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalUsers,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get User Details
export const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select("-password")
      .populate("companies", "name location")
      .populate("education")
      .populate("experience")
      .populate("projects");

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Get user-specific data
    let additionalData = {};

    if (user.role === "teacher") {
      const applications = await Application.find({ applicant: userId })
        .populate("job", "title company")
        .populate({
          path: "job",
          populate: {
            path: "company",
            select: "name"
          }
        })
        .sort({ createdAt: -1 });

      const jobsApplied = applications.length;
      const interviewsScheduled = applications.filter(app => app.status === "interview_scheduled").length;
      const jobsHired = applications.filter(app => app.status === "hired").length;

      additionalData = {
        applications,
        stats: {
          jobsApplied,
          interviewsScheduled,
          jobsHired,
          successRate: jobsApplied > 0 ? ((jobsHired / jobsApplied) * 100).toFixed(1) : 0
        }
      };
    } else if (user.role === "school") {
      const jobs = await Job.find({ company: { $in: user.companies } })
        .populate("applicants", "fullName email")
        .sort({ createdAt: -1 });

      const totalApplications = await Application.countDocuments({
        job: { $in: jobs.map(job => job._id) }
      });

      const hiredCount = await Application.countDocuments({
        job: { $in: jobs.map(job => job._id) },
        status: "hired"
      });

      additionalData = {
        jobs,
        stats: {
          jobsPosted: jobs.length,
          totalApplications,
          hiredCount,
          activeJobs: jobs.filter(job => job.status === "active").length
        }
      };
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: {
        user,
        ...additionalData
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update User Status
export const updateUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { isVerified, isBlocked, reason } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Update user status
    if (isVerified !== undefined) user.isVerified = isVerified;
    if (isBlocked !== undefined) user.isBlocked = isBlocked;

    await user.save();

    // Log the action (you can create an audit log model for this)
    console.log(`Admin ${req.user.id} updated user ${userId} status:`, {
      isVerified,
      isBlocked,
      reason
    });

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: {
        user: user.toJSON()
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Delete related data
    if (user.role === "teacher") {
      await Application.deleteMany({ applicant: userId });
    } else if (user.role === "school") {
      // Delete jobs and applications
      const jobs = await Job.find({ company: { $in: user.companies } });
      const jobIds = jobs.map(job => job._id);
      await Application.deleteMany({ job: { $in: jobIds } });
      await Job.deleteMany({ company: { $in: user.companies } });
    }

    await User.findByIdAndDelete(userId);

    // Log the action
    console.log(`Admin ${req.user.id} deleted user ${userId}:`, { reason });

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

// Get User Statistics
export const getUserStatistics = async (req, res, next) => {
  try {
    // Role distribution
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
          verified: {
            $sum: { $cond: [{ $eq: ["$isVerified", true] }, 1, 0] }
          },
          blocked: {
            $sum: { $cond: [{ $eq: ["$isBlocked", true] }, 1, 0] }
          }
        }
      }
    ]);

    // Registration trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const registrationTrends = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            role: "$role"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.date": 1 }
      }
    ]);

    // Geographic distribution
    const geographicStats = await User.aggregate([
      {
        $match: {
          "location.state": { $exists: true, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$location.state",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.status(200).json({
      success: true,
      message: "User statistics fetched successfully",
      data: {
        roleStats,
        registrationTrends,
        geographicStats
      }
    });
  } catch (error) {
    next(error);
  }
};