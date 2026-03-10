import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { User } from "../models/User.js";
import { createError } from "../utils/error.js";

export const applicationControllers = {
  // Apply for a job
  applyForJob: async (req, res, next) => {
    try {
      const { jobId } = req.params;
      const applicantId = req.user.id;

      console.log('Applying for job:', jobId, 'by user:', applicantId);

      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return next(createError(404, "Job not found"));
      }

      // Check if already applied
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: applicantId,
      });

      if (existingApplication) {
        return next(createError(400, "You have already applied for this job"));
      }

      // Create new application with additional data from request body
      const application = new Application({
        job: jobId,
        applicant: applicantId,
        status: "applied",
        coverLetter: req.body.aboutYou || req.body.coverLetter,
        expectedSalary: req.body.expectedSalary,
        availableFrom: req.body.availableFrom,
      });

      await application.save();

      // Add application to job's applicants array
      await Job.findByIdAndUpdate(jobId, {
        $push: { applicants: application._id }
      });

      console.log('Application created successfully:', application._id);

      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        application,
      });
    } catch (error) {
      console.error('Error in applyForJob:', error);
      next(error);
    }
  },

  // Get all applications for a school's jobs
  getSchoolApplications: async (req, res, next) => {
    try {
      const schoolId = req.user.id;

      // Get all jobs posted by this school
      const jobs = await Job.find({ postedBy: schoolId }).select("_id");
      const jobIds = jobs.map((job) => job._id);

      // Get all applications for these jobs
      const applications = await Application.find({
        job: { $in: jobIds },
      })
        .populate("applicant", "fullName email contact city state skills experience qualification")
        .populate("job", "title location salaryRange")
        .sort({ appliedAt: -1 });

      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get teacher's applications
  getTeacherApplications: async (req, res, next) => {
    try {
      const teacherId = req.user.id;

      const applications = await Application.find({ applicant: teacherId })
        .populate("job", "title companyName location salaryRange status")
        .sort({ appliedAt: -1 });

      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update application status (school only)
  updateApplicationStatus: async (req, res, next) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;
      const schoolId = req.user.id;

      // Validate status
      const validStatuses = ["applied", "reviewing", "interview", "hired", "rejected"];
      if (!validStatuses.includes(status)) {
        return next(createError(400, "Invalid status"));
      }

      // Find application and verify it belongs to school's job
      const application = await Application.findById(applicationId).populate("job");
      
      if (!application) {
        return next(createError(404, "Application not found"));
      }

      // Verify the job belongs to this school
      if (application.job.postedBy.toString() !== schoolId) {
        return next(createError(403, "You can only update applications for your own jobs"));
      }

      application.status = status;
      await application.save();

      res.status(200).json({
        success: true,
        message: "Application status updated successfully",
        application,
      });
    } catch (error) {
      next(error);
    }
  },

  // Check if teacher has applied for a job
  checkApplicationStatus: async (req, res, next) => {
    try {
      const { jobId } = req.params;
      const teacherId = req.user.id;

      const application = await Application.findOne({
        job: jobId,
        applicant: teacherId,
      });

      res.status(200).json({
        success: true,
        hasApplied: !!application,
        application: application || null,
      });
    } catch (error) {
      next(error);
    }
  },
};
