import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { ApiError } from "../utils/error.js";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(new ApiError(401, "Access denied. No token provided."));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET);
    
    // Check if the token is for admin
    if (decoded.userType !== "admin") {
      return next(new ApiError(403, "Access denied. Admin privileges required."));
    }

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return next(new ApiError(401, "Invalid token. Admin not found."));
    }

    if (!admin.isActive) {
      return next(new ApiError(403, "Admin account is deactivated."));
    }

    req.user = admin;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token."));
    }
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token expired."));
    }
    next(error);
  }
};

// Check specific permissions
export const checkPermission = (permission) => {
  return (req, res, next) => {
    const admin = req.user;
    
    if (admin.role === "super_admin") {
      return next(); // Super admin has all permissions
    }

    if (!admin.permissions[permission]) {
      return next(new ApiError(403, `Access denied. ${permission} permission required.`));
    }

    next();
  };
};