import Admin from "../../models/Admin.js";
import { generateTokens } from "../../utils/generateTokens.js";
import { ApiError } from "../../utils/error.js";

// Admin Login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, "Email and password are required"));
    }

    // Find admin by email
    const admin = await Admin.findOne({ email, isActive: true });
    if (!admin) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(admin._id, "admin");

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      admin: admin.toJSON(),
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Logout
export const adminLogout = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "Admin logout successful",
    });
  } catch (error) {
    next(error);
  }
};

// Get Current Admin
export const getCurrentAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return next(new ApiError(404, "Admin not found"));
    }

    res.status(200).json({
      success: true,
      message: "Admin data fetched successfully",
      admin: admin.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// Create Admin (Super Admin only)
export const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role, permissions } = req.body;

    // Check if current user is super admin
    const currentAdmin = await Admin.findById(req.user.id);
    if (currentAdmin.role !== "super_admin") {
      return next(new ApiError(403, "Only super admins can create new admins"));
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return next(new ApiError(400, "Admin with this email already exists"));
    }

    const newAdmin = new Admin({
      name,
      email,
      password,
      role: role || "moderator",
      permissions: permissions || {},
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: newAdmin.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// Update Admin Profile
export const updateAdminProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const adminId = req.user.id;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return next(new ApiError(404, "Admin not found"));
    }

    if (name) admin.name = name;
    if (email) admin.email = email;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      admin: admin.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};