import User from "../../models/User.js";
import Job from "../../models/Job.js";
import Application from "../../models/Application.js";
import { Company } from "../../models/Company.js";
import { ApiError } from "../../utils/error.js";

// Get Dashboard Stats
export const getDashboardStats = async (req, res, next) => {
  try {
    // Get current date and date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Total counts
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalSchools = await User.countDocuments({ role: "school" });
    const totalParents = await User.countDocuments({ role: "parent" });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    
    // Active jobs
    const activeJobs = await Job.countDocuments({ 
      status: { $in: ["active", "open"] } 
    });

    // Applications by status
    const applicationStats = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Monthly growth
    const teachersThisMonth = await User.countDocuments({
      role: "teacher",
      createdAt: { $gte: startOfMonth }
    });

    const teachersLastMonth = await User.countDocuments({
      role: "teacher",
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
    });

    const schoolsThisMonth = await User.countDocuments({
      role: "school",
      createdAt: { $gte: startOfMonth }
    });

    const jobsThisMonth = await Job.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Recent activities
    const recentTeachers = await User.find({ role: "teacher" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("fullName email createdAt isVerified");

    const recentJobs = await Job.find()
      .populate("company", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title company createdAt status");

    const recentApplications = await Application.find()
      .populate("applicant", "fullName")
      .populate("job", "title")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("applicant job status createdAt");

    // Monthly registration trends (last 6 months)
    const monthlyTrends = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            role: "$role"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    // Job posting trends
    const jobTrends = await Job.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    // Top performing schools
    const topSchools = await Job.aggregate([
      {
        $group: {
          _id: "$company",
          jobCount: { $sum: 1 },
          applicationCount: { $sum: "$applicationsCount" }
        }
      },
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "_id",
          as: "companyInfo"
        }
      },
      {
        $unwind: "$companyInfo"
      },
      {
        $sort: { jobCount: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalStats: {
          totalTeachers,
          totalSchools,
          totalParents,
          totalJobs,
          totalApplications,
          activeJobs
        },
        applicationStats,
        monthlyGrowth: {
          teachersThisMonth,
          teachersLastMonth,
          schoolsThisMonth,
          jobsThisMonth,
          teacherGrowthRate: teachersLastMonth > 0 
            ? ((teachersThisMonth - teachersLastMonth) / teachersLastMonth * 100).toFixed(1)
            : 0
        },
        recentActivities: {
          recentTeachers,
          recentJobs,
          recentApplications
        },
        trends: {
          monthlyTrends,
          jobTrends
        },
        topSchools
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get Platform Analytics
export const getPlatformAnalytics = async (req, res, next) => {
  try {
    const { period = "30d" } = req.query;
    
    let dateFilter;
    const now = new Date();
    
    switch (period) {
      case "7d":
        dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        dateFilter = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "1y":
        dateFilter = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // User registration analytics
    const userAnalytics = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: dateFilter }
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

    // Job application success rate
    const successRate = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Most popular subjects
    const popularSubjects = await Job.aggregate([
      {
        $unwind: "$requiredSubjects"
      },
      {
        $group: {
          _id: "$requiredSubjects",
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

    // Geographic distribution
    const geographicData = await User.aggregate([
      {
        $match: {
          "location.country": { $exists: true }
        }
      },
      {
        $group: {
          _id: {
            country: "$location.country",
            state: "$location.state",
            role: "$role"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Platform analytics fetched successfully",
      data: {
        userAnalytics,
        successRate,
        popularSubjects,
        geographicData,
        period
      }
    });
  } catch (error) {
    next(error);
  }
};