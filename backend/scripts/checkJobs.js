import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import { User } from "../models/User.js";

dotenv.config();

const checkJobs = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB\n");

    const jobs = await Job.find({}).populate('postedBy', 'fullName email role');
    console.log(`=== Total Jobs in Database: ${jobs.length} ===\n`);
    
    if (jobs.length === 0) {
      console.log("No jobs found in database!");
      process.exit(0);
    }

    jobs.forEach((job, index) => {
      console.log(`Job ${index + 1}:`);
      console.log(`  ID: ${job._id}`);
      console.log(`  Title: ${job.title}`);
      console.log(`  Company: ${job.companyName}`);
      console.log(`  Status: ${job.status}`);
      console.log(`  Posted By: ${job.postedBy?.fullName} (${job.postedBy?.email})`);
      console.log(`  Posted At: ${job.postedAt}`);
      console.log(`  Location: ${job.location?.city}`);
      console.log(`  Salary: ₹${job.salaryRange?.min} - ₹${job.salaryRange?.max}`);
      console.log(`  Applicants: ${job.applicants?.length || 0}`);
      console.log('---\n');
    });

    // Check open jobs specifically
    const openJobs = await Job.find({ status: 'open' });
    console.log(`\n=== Open Jobs: ${openJobs.length} ===`);

    process.exit(0);
  } catch (error) {
    console.error("Error checking jobs:", error);
    process.exit(1);
  }
};

checkJobs();
