import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { User } from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

const router = express.Router();

// Get parent dashboard data
router.get("/dashboard", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's tuition requests/applications
    const applications = await Application.find({ applicant: userId })
      .populate('job')
      .populate({
        path: 'job',
        populate: {
          path: 'postedBy',
          select: 'fullName profilePic'
        }
      })
      .sort({ appliedAt: -1 });

    // Calculate stats
    const totalRequests = applications.length;
    const activeRequests = applications.filter(app => app.status === 'applied' || app.status === 'reviewing').length;
    const acceptedRequests = applications.filter(app => app.status === 'hired').length;
    
    // Get nearby teachers (users with teacher role)
    const nearbyTeachers = await User.countDocuments({ role: 'jobSeeker' }); // Assuming teachers are jobSeekers
    
    const dashboardData = {
      totalRequests,
      activeRequests,
      acceptedRequests,
      nearbyTeachers,
      recentApplications: applications.slice(0, 5)
    };
    
    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get tutors/teachers with filters
router.get("/get-tutors", async (req, res) => {
  try {
    const { subject, city, experience, rating, mode } = req.query;
    
    // Build filter for teachers
    const filter = { role: 'jobSeeker' }; // Assuming teachers are jobSeekers
    
    if (subject) {
      filter.skills = { $regex: subject, $options: 'i' };
    }
    
    if (city) {
      filter.address = { $regex: city, $options: 'i' };
    }
    
    if (experience) {
      filter.yoe = experience;
    }
    
    // Get teachers with their profiles
    const teachers = await User.find(filter)
      .select('fullName profilePic bio skills yoe address contact designation')
      .limit(20);
    
    // Transform data to match frontend expectations
    const transformedTeachers = teachers.map(teacher => ({
      id: teacher._id,
      name: teacher.fullName || 'Teacher',
      subject: teacher.designation || 'Subject Teacher',
      experience: teacher.yoe ? `${teacher.yoe} Years Experience` : '1+ Years Experience',
      rating: 4.5 + Math.random() * 0.5, // Random rating for now
      studentsCount: Math.floor(Math.random() * 200) + 50,
      location: teacher.address || 'India',
      mode: ['ONLINE', 'OFFLINE', 'HOME TUTOR'][Math.floor(Math.random() * 3)],
      fee: `₹${Math.floor(Math.random() * 1000) + 500} – ₹${Math.floor(Math.random() * 1000) + 1000}`,
      description: teacher.bio || 'Experienced teacher with proven track record.',
      verified: true,
      profileImage: teacher.profilePic
    }));
    
    res.status(200).json({
      success: true,
      data: transformedTeachers,
      total: transformedTeachers.length,
      filters: { subject, city, experience, rating, mode }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get teacher jobs (jobs available for teachers to apply)
router.get("/teacher-jobs", protect, async (req, res) => {
  try {
    const { subject, location, jobType, experience } = req.query;
    
    // Build filter for jobs
    const filter = { status: 'open' };
    
    if (subject) {
      filter.$or = [
        { title: { $regex: subject, $options: 'i' } },
        { skillsRequired: { $regex: subject, $options: 'i' } }
      ];
    }
    
    if (location) {
      filter['location.city'] = { $regex: location, $options: 'i' };
    }
    
    if (jobType) {
      filter.jobType = jobType;
    }
    
    if (experience) {
      filter.experience = experience;
    }
    
    // Get jobs with company and poster info
    const jobs = await Job.find(filter)
      .populate('company', 'name logo')
      .populate('postedBy', 'fullName')
      .sort({ postedAt: -1 })
      .limit(20);
    
    res.status(200).json({
      success: true,
      jobs,
      total: jobs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user's tuition requests
router.get("/my-requests", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const applications = await Application.find({ applicant: userId })
      .populate({
        path: 'job',
        populate: {
          path: 'postedBy',
          select: 'fullName profilePic designation'
        }
      })
      .sort({ appliedAt: -1 });
    
    // Transform to match frontend expectations
    const requests = applications.map(app => ({
      id: app._id,
      teacher: app.job?.postedBy?.fullName || 'Teacher',
      subject: app.job?.title || 'Subject',
      status: app.status === 'hired' ? 'Accepted' : 
              app.status === 'rejected' ? 'Rejected' : 'Pending',
      date: app.appliedAt,
      fee: app.job?.salaryRange ? `₹${app.job.salaryRange.min}-${app.job.salaryRange.max}` : '₹500-1000',
      jobId: app.job?._id,
      teacherProfile: app.job?.postedBy?.profilePic
    }));
    
    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;