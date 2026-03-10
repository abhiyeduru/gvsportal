import express from "express";
import { applicationControllers } from "../controllers/application.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protect);

// Apply for a job (teachers only)
router.post(
  "/jobs/:jobId/apply",
  authorize("jobSeeker"),
  applicationControllers.applyForJob
);

// Get all applications for school's jobs (schools only)
router.get(
  "/school",
  authorize("recruiter"),
  applicationControllers.getSchoolApplications
);

// Get teacher's applications (teachers only)
router.get(
  "/teacher",
  authorize("jobSeeker"),
  applicationControllers.getTeacherApplications
);

// Update application status (schools only)
router.patch(
  "/:applicationId/status",
  authorize("recruiter"),
  applicationControllers.updateApplicationStatus
);

// Check if teacher has applied for a job
router.get(
  "/jobs/:jobId/check",
  authorize("jobSeeker"),
  applicationControllers.checkApplicationStatus
);

export default router;
