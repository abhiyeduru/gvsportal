import Job from "../../models/Job.js";
import { User } from "../../models/User.js";
import { createError } from "../../utils/error.js";

export const jobControllers = {
  // Create a new job
  createJob: async (req, res, next) => {
    const recruiterId = req.user.id;
    console.log("Creating job for recruiter:", recruiterId);
    try {
      const recruiter = await User.findById(recruiterId);
      if (!recruiter || recruiter.role !== "recruiter") {
        return next(createError(403, "Only schools can post jobs"));
      }

      // For school-based system, use the school (recruiter) as the company
      // Create job with school information
      const newJob = new Job({
        title: req.body.jobTitle || req.body.title,
        description: req.body.description,
        requirements: req.body.requirements || [],
        responsibilities: req.body.responsibilities || [],
        benefits: req.body.benefits || [],
        skillsRequired: req.body.subject || req.body.skillsRequired,
        experience: req.body.experience,
        jobType: req.body.jobType || 'full-time',
        workFrom: req.body.workFrom || 'on-site',
        location: {
          city: req.body.location || recruiter.city || 'Not specified',
          state: recruiter.state || '',
          country: 'India'
        },
        salaryRange: {
          min: req.body.salaryMin || req.body.salary?.split('-')[0]?.trim() || '0',
          max: req.body.salaryMax || req.body.salary?.split('-')[1]?.trim() || '0',
          currency: 'INR'
        },
        applicationDeadline: req.body.applicationDeadline ? new Date(req.body.applicationDeadline) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        startDate: req.body.startDate ? new Date(req.body.startDate) : null,
        workingHours: req.body.workingHours || 'Not specified',
        classLevels: req.body.classLevels || [],
        subject: req.body.subject,
        postedBy: recruiter._id,
        company: recruiter._id, // Use school user as company
        companyName: recruiter.fullName || 'School',
        status: 'open',
        postedAt: new Date()
      });

      const savedJob = await newJob.save();

      console.log("Job created successfully:", savedJob._id);

      res.status(201).json({
        success: true,
        message: "Job posted successfully!",
        job: savedJob,
      });
    } catch (err) {
      console.log("ERROR creating job:", err.message);
      next(err);
    }
  },

  // Get all jobs (with optional filtering)
  getAllJobs: async (req, res, next) => {
    console.log("entered getAll jobs", req.body);
    try {
      const {
        company,
        title,
        location,
        jobType,
        workFrom,
        experience,
        frequency,
        skills,
        salaryMin,
        salaryMax,
        postedAfter,
        postedBefore,
        status,
        cursor = null,
        limit = 10,
        sortBy = "postedAt",
        sortOrder = "desc",
      } = req.query;

      console.log("Raw query parameters:", req.query);

      const filter = {};
      if (company) filter.company = company;
      if (title) filter.title = { $regex: title, $options: "i" };
      if (location) {
        filter["location.city"] = { $regex: location, $options: "i" };
      }
      if (jobType) filter.jobType = jobType;
      if (workFrom) filter.workFrom = workFrom;
      if (experience) filter.experience = experience;
      if (frequency) filter.frequency = frequency;
      if (skills && skills.length > 0) {
        filter.skillsRequired = {
          $all: skills.split(",").map((skill) => skill.trim()),
        };
      }
      if (salaryMin) {
        filter.$expr = filter.$expr || { $and: [] }; // Initialize $expr if not already done
        filter.$expr.$and.push({
          $gte: [{ $toInt: "$salaryRange.min" }, parseInt(salaryMin)],
        });
      }

      if (salaryMax) {
        filter.$expr = filter.$expr || { $and: [] };
        filter.$expr.$and.push({
          $lte: [{ $toInt: "$salaryRange.max" }, parseInt(salaryMax)],
        });
      }
      if (postedAfter) filter.postedAt = { $gte: new Date(postedAfter) };
      if (postedBefore) filter.postedAt = { $lte: new Date(postedBefore) };
      if (status) filter.status = status;

      console.log("Constructed filter:", JSON.stringify(filter, null, 2));

      const sort = {};
      const sortField = sortBy === 'newest' || sortBy === 'oldest' ? 'postedAt' : sortBy;
      sort[sortField] = sortOrder === "asc" ? 1 : -1;

      const query = Job.find(filter)
        .sort(sort)
        .limit(parseInt(limit) + 1);

      if (cursor) {
        query.where("_id").gt(cursor);
      }

      console.log(
        "Executing query with filter:",
        JSON.stringify(filter, null, 2)
      );
      console.log("Sort:", JSON.stringify(sort, null, 2));
      console.log("Cursor:", cursor);
      console.log("Limit:", parseInt(limit));

      const _jobs = await query
        .populate("company", "name logo")
        .populate("postedBy", "fullName");

      console.log("Query executed. Number of jobs found:", _jobs.length);

      // Return empty array if no jobs found instead of error
      if (_jobs.length === 0) {
        return res.status(200).json({
          nextCursor: null,
          jobs: [],
        });
      }

      const hasNextPage = _jobs.length > parseInt(limit);
      const jobs = hasNextPage ? _jobs.slice(0, -1) : _jobs;
      // console.log("requiredSkills", jobs[0].skillsRequired); // This line was causing the error
      const formattedJobs = jobs.map((job) => ({
        ...job.toObject(),
        combinedField: {
          requiredSkills: job.skillsRequired
            ? job.skillsRequired.split(",").map((skill) => skill.trim())[0]
            : [], // Return an empty array if skillsRequired is undefined
          jobType: job.jobType,
          workFrom: job.workFrom,
          experience: job.experience,
        },
      }));

      res.status(200).json({
        nextCursor: hasNextPage ? jobs[jobs.length - 1]._id : null,
        jobs: formattedJobs,
      });
    } catch (err) {
      console.error("Error in getAllJobs:", err);
      next(err);
    }
  },

  // Get a specific job by ID
  getJobById: async (req, res, next) => {
    try {
      const jobId = req.params.jobId || req.params.id;
      console.log("Getting job by ID:", jobId);
      
      const job = await Job.findById(jobId)
        .populate("company")
        .populate("postedBy", "fullName email");

      if (!job) {
        return next(createError(404, "Job not found"));
      }

      res.status(200).json(job);
    } catch (err) {
      console.error("Error in getJobById:", err);
      next(err);
    }
  },

  // Update a job
  updateJob: async (req, res, next) => {
    const jobId = req.params.jobId;
    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return next(createError(404, "Job not found"));
      }

      // Check if the user is the one who posted the job
      if (job.postedBy.toString() !== req.user.id) {
        return next(createError(403, "You can update only your own job posts"));
      }

      // Map form data to job schema
      const updateData = {
        title: req.body.jobTitle || req.body.title,
        description: req.body.description,
        requirements: req.body.requirements || [],
        responsibilities: req.body.responsibilities || [],
        benefits: req.body.benefits || [],
        skillsRequired: req.body.subject || req.body.skillsRequired,
        experience: req.body.experience,
        jobType: req.body.jobType || 'full-time',
        workFrom: req.body.workFrom || 'on-site',
        location: {
          city: req.body.location || job.location?.city || 'Not specified',
          state: job.location?.state || '',
          country: 'India'
        },
        salaryRange: {
          min: req.body.salaryMin || req.body.salary?.split('-')[0]?.trim() || job.salaryRange?.min || '0',
          max: req.body.salaryMax || req.body.salary?.split('-')[1]?.trim() || job.salaryRange?.max || '0',
          currency: 'INR'
        },
        applicationDeadline: req.body.applicationDeadline ? new Date(req.body.applicationDeadline) : job.applicationDeadline,
        startDate: req.body.startDate ? new Date(req.body.startDate) : job.startDate,
        workingHours: req.body.workingHours || job.workingHours,
        classLevels: req.body.classLevels || job.classLevels || [],
        subject: req.body.subject || job.subject
      };

      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { $set: updateData },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Job updated successfully!",
        job: updatedJob,
      });
    } catch (err) {
      next(err);
    }
  },

  // Delete a job
  deleteJob: async (req, res, next) => {
    try {
      const jobId = req.params.jobId || req.params.id;
      console.log("Deleting job:", jobId);
      
      const job = await Job.findById(jobId);
      if (!job) {
        return next(createError(404, "Job not found"));
      }

      // Check if the user is the one who posted the job
      if (job.postedBy.toString() !== req.user.id) {
        return next(createError(403, "You can delete only your own job posts"));
      }

      await Job.findByIdAndDelete(jobId);

      res.status(200).json({ 
        success: true,
        message: "Job has been deleted successfully" 
      });
    } catch (err) {
      console.error("Error deleting job:", err);
      next(err);
    }
  },

  // Get jobs posted by a recruiter
  getRecruiterJobs: async (req, res, next) => {
    const recruiterId = req.user.id;
    try {
      const {
        status,
        cursor = null,
        limit = 10,
        sortBy = "postedAt",
        sortOrder = "desc",
      } = req.query;

      const filter = { postedBy: recruiterId }; // Add postedBy filter
      if (status) filter.status = status;

      const sort = {};
      sort[sortBy] = sortOrder === "asc" ? 1 : -1;

      const query = Job.find(filter)
        .sort(sort)
        .limit(parseInt(limit) + 1);

      if (cursor) {
        query.where("_id").gt(cursor);
      }

      const _jobs = await query
        .populate("company", "name logo")
        .populate("applicants", "fullName email");

      // Return empty array if no jobs found instead of error
      if (_jobs.length === 0) {
        return res.status(200).json({
          nextCursor: null,
          jobs: [],
        });
      }

      const hasNextPage = _jobs.length > parseInt(limit);
      const jobs = hasNextPage ? _jobs.slice(0, -1) : _jobs;

      const formattedJobs = jobs.map((job) => ({
        ...job.toObject(),
        combinedField: {
          requiredSkills: job.skillsRequired
            ? job.skillsRequired.split(",").map((skill) => skill.trim())[0]
            : null,
          jobType: job.jobType,
          workFrom: job.workFrom,
          experience: job.experience,
        },
      }));

      res.status(200).json({
        nextCursor: hasNextPage ? jobs[jobs.length - 1]._id : null,
        jobs: formattedJobs,
      });
    } catch (err) {
      next(err);
    }
  },
};
