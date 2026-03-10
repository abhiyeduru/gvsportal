import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");

    const admins = await Admin.find({});
    console.log("\n=== All Admins in Database ===");
    console.log(`Total admins: ${admins.length}\n`);
    
    admins.forEach((admin, index) => {
      console.log(`Admin ${index + 1}:`);
      console.log(`  Name: ${admin.name}`);
      console.log(`  Email: ${admin.email}`);
      console.log(`  Role: ${admin.role}`);
      console.log(`  Active: ${admin.isActive}`);
      console.log(`  Created: ${admin.createdAt}`);
      console.log(`  Permissions:`, admin.permissions);
      console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error("Error checking admins:", error);
    process.exit(1);
  }
};

checkAdmin();
