import TuitionBooking from "../models/TuitionBooking.js";
import { User } from "../models/User.js";
import { createError } from "../utils/error.js";

export const tuitionControllers = {
  // Get all available tutors for parents
  getAvailableTutors: async (req, res, next) => {
    try {
      const {
        subject,
        city,
        state,
        minRate,
        maxRate,
        mode,
        qualification,
        experience,
        page = 1,
        limit = 12,
      } = req.query;

      // Build filter query
      const filter = {
        role: "jobSeeker", // Teachers
        availableForHire: true,
      };

      if (subject) {
        filter.$or = [
          { primarySubject: { $regex: subject, $options: "i" } },
          { secondarySubjects: { $in: [new RegExp(subject, "i")] } },
        ];
      }

      if (city) {
        filter.city = { $regex: city, $options: "i" };
      }

      if (state) {
        filter.state = { $regex: state, $options: "i" };
      }

      if (mode) {
        filter.teachingMode = mode;
      }

      if (qualification) {
        filter.qualification = { $regex: qualification, $options: "i" };
      }

      if (experience) {
        filter.yoe = { $gte: experience };
      }

      // Rate filtering (convert string to number for comparison)
      if (minRate || maxRate) {
        filter.hourlyRate = {};
        if (minRate) filter.hourlyRate.$gte = minRate;
        if (maxRate) filter.hourlyRate.$lte = maxRate;
      }

      const skip = (page - 1) * limit;

      const tutors = await User.find(filter)
        .select(
          "fullName profilePic bio primarySubject secondarySubjects city state qualification yoe hourlyRate rating totalReviews teachingMode languages specializations studentsTaught successRate"
        )
        .limit(parseInt(limit))
        .skip(skip)
        .sort({ rating: -1, totalReviews: -1 });

      const total = await User.countDocuments(filter);

      res.status(200).json({
        success: true,
        tutors,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Get tutor details
  getTutorDetails: async (req, res, next) => {
    try {
      const { tutorId } = req.params;

      const tutor = await User.findById(tutorId)
        .select("-password -verificationToken")
        .populate("education")
        .populate("experience");

      if (!tutor) {
        return next(createError(404, "Tutor not found"));
      }

      if (tutor.role !== "jobSeeker") {
        return next(createError(400, "User is not a tutor"));
      }

      res.status(200).json({
        success: true,
        tutor,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create tuition booking request (parent)
  createTuitionRequest: async (req, res, next) => {
    try {
      const parentId = req.user.id;
      const { teacherId, subject, classLevel, mode, location, message, hourlyRate } = req.body;

      // Validate teacher exists and is available
      const teacher = await User.findById(teacherId);
      if (!teacher) {
        return next(createError(404, "Teacher not found"));
      }

      if (teacher.role !== "jobSeeker") {
        return next(createError(400, "User is not a teacher"));
      }

      if (!teacher.availableForHire) {
        return next(createError(400, "Teacher is not available for hire"));
      }

      // Check for duplicate pending request
      const existingRequest = await TuitionBooking.findOne({
        teacher: teacherId,
        parent: parentId,
        status: "requested",
      });

      if (existingRequest) {
        return next(
          createError(400, "You already have a pending request with this teacher")
        );
      }

      // Create booking
      const booking = new TuitionBooking({
        teacher: teacherId,
        parent: parentId,
        subject,
        classLevel,
        mode,
        location,
        message,
        hourlyRate: hourlyRate || teacher.hourlyRate,
        status: "requested",
      });

      await booking.save();

      res.status(201).json({
        success: true,
        message: "Tuition request sent successfully",
        booking,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get parent's tuition requests
  getParentRequests: async (req, res, next) => {
    try {
      const parentId = req.user.id;

      const requests = await TuitionBooking.find({ parent: parentId })
        .populate(
          "teacher",
          "fullName profilePic primarySubject qualification city state hourlyRate rating"
        )
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        requests,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get teacher's tuition requests
  getTeacherRequests: async (req, res, next) => {
    try {
      const teacherId = req.user.id;

      const requests = await TuitionBooking.find({ teacher: teacherId })
        .populate("parent", "fullName email contact city state")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        requests,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update tuition request status (teacher)
  updateRequestStatus: async (req, res, next) => {
    try {
      const { requestId } = req.params;
      const { status, startDate } = req.body;
      const teacherId = req.user.id;

      // Validate status
      const validStatuses = ["accepted", "rejected"];
      if (!validStatuses.includes(status)) {
        return next(createError(400, "Invalid status"));
      }

      // Find request and verify it belongs to this teacher
      const request = await TuitionBooking.findById(requestId);

      if (!request) {
        return next(createError(404, "Request not found"));
      }

      if (request.teacher.toString() !== teacherId) {
        return next(
          createError(403, "You can only update your own tuition requests")
        );
      }

      if (request.status !== "requested") {
        return next(createError(400, "Request has already been processed"));
      }

      request.status = status;
      if (status === "accepted" && startDate) {
        request.startDate = startDate;
      }
      await request.save();

      res.status(200).json({
        success: true,
        message: `Request ${status} successfully`,
        request,
      });
    } catch (error) {
      next(error);
    }
  },

  // Cancel tuition request (parent)
  cancelRequest: async (req, res, next) => {
    try {
      const { requestId } = req.params;
      const parentId = req.user.id;

      const request = await TuitionBooking.findById(requestId);

      if (!request) {
        return next(createError(404, "Request not found"));
      }

      if (request.parent.toString() !== parentId) {
        return next(
          createError(403, "You can only cancel your own requests")
        );
      }

      if (request.status === "completed") {
        return next(createError(400, "Cannot cancel completed tuition"));
      }

      request.status = "cancelled";
      await request.save();

      res.status(200).json({
        success: true,
        message: "Request cancelled successfully",
        request,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get parent dashboard data
  getParentDashboard: async (req, res, next) => {
    try {
      const parentId = req.user.id;

      // Get statistics
      const totalRequests = await TuitionBooking.countDocuments({
        parent: parentId,
      });
      const activeRequests = await TuitionBooking.countDocuments({
        parent: parentId,
        status: "requested",
      });
      const acceptedTuitions = await TuitionBooking.countDocuments({
        parent: parentId,
        status: "accepted",
      });

      // Get recent requests
      const recentRequests = await TuitionBooking.find({ parent: parentId })
        .populate(
          "teacher",
          "fullName profilePic primarySubject qualification rating"
        )
        .sort({ createdAt: -1 })
        .limit(5);

      // Get recommended tutors (high rated, available)
      const recommendedTutors = await User.find({
        role: "jobSeeker",
        availableForHire: true,
        rating: { $gte: 4 },
      })
        .select(
          "fullName profilePic primarySubject secondarySubjects city qualification hourlyRate rating totalReviews"
        )
        .sort({ rating: -1 })
        .limit(6);

      res.status(200).json({
        success: true,
        stats: {
          totalRequests,
          activeRequests,
          acceptedTuitions,
        },
        recentRequests,
        recommendedTutors,
      });
    } catch (error) {
      next(error);
    }
  },
};
