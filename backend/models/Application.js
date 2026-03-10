import { Schema, model } from "mongoose";

const applicationSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "reviewing", "interview", "hired", "rejected"],
    default: "applied",
  },
  coverLetter: { type: String },
  expectedSalary: { type: Number },
  availableFrom: { type: Date },
  resume: { type: String }, // URL to uploaded resume
  appliedAt: { type: Date, default: Date.now },
});

export default model("Application", applicationSchema);
