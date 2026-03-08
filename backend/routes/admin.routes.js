import express from "express";
import {
  adminLogin,
  adminLogout,
  getCurrentAdmin,
  createAdmin,
  updateAdminProfile
} from "../controllers/admin/auth.controller.js";
import {
  getDashboardStats,
  getPlatformAnalytics
} from "../controllers/admin/dashboard.controller.js";
import {
  getAllUsers,
  getUserDetails,
  updateUserStatus,
  deleteUser,
  getUserStatistics
} from "../controllers/admin/users.controller.js";
import { adminAuth } from "../middleware/adminAuth.middleware.js";

const router = express.Router();

// Auth routes
router.post("/login", adminLogin);
router.post("/logout", adminAuth, adminLogout);
router.get("/me", adminAuth, getCurrentAdmin);
router.post("/create", adminAuth, createAdmin);
router.put("/profile", adminAuth, updateAdminProfile);

// Dashboard routes
router.get("/dashboard/stats", adminAuth, getDashboardStats);
router.get("/dashboard/analytics", adminAuth, getPlatformAnalytics);

// User management routes
router.get("/users", adminAuth, getAllUsers);
router.get("/users/statistics", adminAuth, getUserStatistics);
router.get("/users/:userId", adminAuth, getUserDetails);
router.patch("/users/:userId/status", adminAuth, updateUserStatus);
router.delete("/users/:userId", adminAuth, deleteUser);

export default router;