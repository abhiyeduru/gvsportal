import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "User", // Changed from Company to User since schools are users
    required: true,
  },
  companyName: {
    type: String,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  benefits: [{ type: String }],
  location: {
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
  },
  salaryRange: {
    min: { type: String },
    max: { type: String },
    currency: { type: String, default: "INR" },
  },
  tags: [{ type: String }],
  socials: {
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  frequency: {
    type: String,
    enum: ["hourly", "monthly", "yearly"],
    default: "monthly",
  },
  subject: { type: String },
  skillsRequired: { type: String },
  postedAt: { type: Date, default: Date.now },
  applicants: [{ type: Schema.Types.ObjectId, ref: "Application" }],
  status: { type: String, enum: ["open", "closed"], default: "open" },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "substitute"],
    required: true,
    default: "full-time",
  },
  workFrom: {
    type: String,
    enum: ["remote", "on-site", "hybrid"],
    default: "on-site",
  },
  workingHours: { type: String },
  experience: {
    type: String,
    required: true,
  },
  applicationDeadline: { type: Date },
  startDate: { type: Date },
  classLevels: [{ type: String }],
});

export default model("Job", jobSchema);
