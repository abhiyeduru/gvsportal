import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");

    // Check if super admin already exists
    const existingAdmin = await Admin.findOne({ role: "super_admin" });
    if (existingAdmin) {
      console.log("Super admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create super admin
    const superAdmin = new Admin({
      name: "Super Admin",
      email: "admin@gravity.com",
      password: "admin123", // This will be hashed automatically
      role: "super_admin",
      permissions: {
        canManageUsers: true,
        canManageJobs: true,
        canManagePayments: true,
        canManageSettings: true,
        canViewAnalytics: true,
      },
    });

    await superAdmin.save();
    console.log("Super admin created successfully!");
    console.log("Email: admin@gravity.com");
    console.log("Password: admin123");
    console.log("Please change the password after first login.");

    process.exit(0);
  } catch (error) {
    console.error("Error creating super admin:", error);
    process.exit(1);
  }
};

createSuperAdmin();