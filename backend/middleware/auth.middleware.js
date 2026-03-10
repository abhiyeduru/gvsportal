import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { createError } from "../utils/error.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      // Get user from the token
      const user = await User.findById(decoded.id).select("-password");
      
      if (!user) {
        console.error("User not found for token ID:", decoded.id);
        return next(createError(401, "User no longer exists"));
      }
      
      req.user = user;
      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return next(createError(401, "Not authorized, token failed"));
    }
  } else {
    return next(createError(401, "Not authorized, no token"));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createError(
          403,
          `User role ${req.user.role} is not authorized to access this route`
        )
      );
    }
    next();
  };
};
