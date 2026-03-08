import mongoose from "mongoose";

const platformSettingsSchema = new mongoose.Schema(
  {
    platformName: {
      type: String,
      default: "Gravity Portal",
    },
    logo: {
      type: String,
      default: "",
    },
    primaryColor: {
      type: String,
      default: "#6C5CE7",
    },
    emailSettings: {
      smtpHost: String,
      smtpPort: Number,
      smtpUser: String,
      smtpPassword: String,
      fromEmail: String,
      fromName: String,
    },
    paymentSettings: {
      jobPostingFee: {
        type: Number,
        default: 500,
      },
      contactUnlockFee: {
        type: Number,
        default: 100,
      },
      subscriptionPlans: {
        basic: {
          price: { type: Number, default: 999 },
          jobPosts: { type: Number, default: 5 },
          contactUnlocks: { type: Number, default: 20 },
        },
        premium: {
          price: { type: Number, default: 2999 },
          jobPosts: { type: Number, default: 20 },
          contactUnlocks: { type: Number, default: 100 },
        },
        enterprise: {
          price: { type: Number, default: 9999 },
          jobPosts: { type: Number, default: -1 }, // unlimited
          contactUnlocks: { type: Number, default: -1 }, // unlimited
        },
      },
    },
    maintenanceMode: {
      enabled: { type: Boolean, default: false },
      message: { type: String, default: "We are currently under maintenance. Please check back later." },
    },
    features: {
      allowRegistration: { type: Boolean, default: true },
      requireEmailVerification: { type: Boolean, default: true },
      allowJobPosting: { type: Boolean, default: true },
      allowMessaging: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const PlatformSettings = mongoose.model("PlatformSettings", platformSettingsSchema);

export default PlatformSettings;