import { Schema, model } from "mongoose";

const tuitionBookingSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  classLevel: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: ["online", "offline", "hybrid"],
    required: true,
  },
  location: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ["requested", "accepted", "rejected", "completed", "cancelled"],
    default: "requested",
  },
  hourlyRate: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

tuitionBookingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const TuitionBooking = model("TuitionBooking", tuitionBookingSchema);

export default TuitionBooking;
