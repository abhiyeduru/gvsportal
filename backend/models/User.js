import { Schema, model } from "mongoose";

const educationSchema = new Schema({
  institution: { type: String },
  degree: { type: String },
  yearOfGraduation: { type: String },
});

const experienceSchema = new Schema({
  jobTitle: { type: String },
  employer: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
});

const projectSchema = new Schema({
  title: { type: String },
  skills: [{ type: String }],
  endDate: { type: Date },
  description: { type: String },
  url: { type: String },
  repository: { type: String },
});

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ["admin", "recruiter", "jobSeeker", "parent"],
    default: "jobSeeker",
  },
  isVerified: { type: Boolean, default: false },
  inviteCodeUsed: { type: Schema.Types.ObjectId, ref: "InviteCode" },
  verificationToken: { type: String },

  // Profile completion tracking
  profileCompleted: { type: Boolean, default: false },
  
  // Reference to profile schema
  profilePic: { type: String },
  yoe: { type: String },
  fullName: { type: String },
  bio: { type: String },
  contact: { type: String },
  whatsappNumber: { type: String },
  contactEmail: { type: String },
  designation: { type: String },
  address: { type: String },
  aadhaarNumber: { type: String },
  skills: [
    {
      name: { type: String },
      level: { type: Number, default: 50 }
    }
  ],
  profileLinks: {
    linkedIn: { type: String },
    github: { type: String },
    youtube: { type: String },
    website: { type: String },
    portfolio: { type: String },
  },

  // Teacher-specific fields
  primarySubject: { type: String },
  secondarySubjects: [{ type: String }],
  city: { type: String },
  state: { type: String },
  qualification: { type: String },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  hourlyRate: { type: String },
  availableForHire: { type: Boolean, default: true },
  specializations: [{ type: String }],
  languages: [{ type: String }],
  teachingMode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], default: 'Hybrid' },
  studentsTaught: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 },
  classesCompleted: { type: Number, default: 0 },
  achievements: [{ type: String }],

  // Parent-specific fields
  childGrade: { type: String },
  childName: { type: String },
  preferredSubjects: [{ type: String }],
  preferredTeachingMode: { type: String, enum: ['Online', 'Offline', 'Hybrid'] },

  // School/Institution-specific fields
  institutionType: { type: String },
  boardAffiliation: { type: String },
  yearEstablished: { type: String },
  institutionSize: { type: String },
  hrContactPerson: { type: String },
  whatsapp: { type: String },
  facilities: [{ type: String }],
  subjectsHiring: [{ type: String }],
  requiredQualifications: { type: String },
  minimumExperience: { type: String },
  currentlyHiring: { type: Boolean, default: false },
  schoolRegistrationNumber: { type: String },
  principalName: { type: String },

  companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],
  // Array of references to project schema
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],

  // Array of references to experience schema
  experience: [{ type: Schema.Types.ObjectId, ref: "Experience" }],

  // Array of references to education schema
  education: [{ type: Schema.Types.ObjectId, ref: "Education" }],

  // Bookmarked jobs relation
  bookmarkedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],

  createdAt: { type: Date, default: Date.now },
});

// Match user entered password to hashed password in database
/* userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Entered password:", enteredPassword);
  console.log("Stored password:", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
 */
export const Project = model("Project", projectSchema);
export const Experience = model("Experience", experienceSchema);
export const Education = model("Education", educationSchema);
export const User = model("User", userSchema);

// Default export for backward compatibility
export default User;
