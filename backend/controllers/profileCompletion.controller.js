import { User } from "../models/User.js";
import { createError } from "../utils/error.js";
import { validateProfileFields, getProfileCompletionPercentage } from "../middleware/profileCompletion.middleware.js";

/**
 * Get profile completion status
 * GET /api/profile/status
 */
export const getProfileStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const validation = validateProfileFields(user);
    const completionPercentage = getProfileCompletionPercentage(user);

    res.status(200).json({
      success: true,
      profileCompleted: user.profileCompleted,
      completionPercentage,
      missingFields: validation.missingFields,
      role: user.role
    });
  } catch (error) {
    console.error("Get profile status error:", error);
    next(error);
  }
};

/**
 * Complete user profile
 * PUT /api/profile/complete
 */
export const completeProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const profileData = req.body;

    const user = await User.findById(userId);
    
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Update user fields
    Object.keys(profileData).forEach(key => {
      if (profileData[key] !== undefined && profileData[key] !== null) {
        user[key] = profileData[key];
      }
    });

    // Validate if profile is complete
    const validation = validateProfileFields(user);
    
    if (validation.isComplete) {
      user.profileCompleted = true;
    }

    await user.save();

    const completionPercentage = getProfileCompletionPercentage(user);

    res.status(200).json({
      success: true,
      message: validation.isComplete 
        ? "Profile completed successfully!" 
        : "Profile updated. Please complete remaining fields.",
      profileCompleted: user.profileCompleted,
      completionPercentage,
      missingFields: validation.missingFields,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        profilePic: user.profilePic,
        profileCompleted: user.profileCompleted
      }
    });
  } catch (error) {
    console.error("Complete profile error:", error);
    next(error);
  }
};

/**
 * Get profile data
 * GET /api/profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const completionPercentage = getProfileCompletionPercentage(user);

    res.status(200).json({
      success: true,
      user,
      completionPercentage,
      profileCompleted: user.profileCompleted
    });
  } catch (error) {
    console.error("Get profile error:", error);
    next(error);
  }
};

/**
 * Update profile
 * PUT /api/profile/update
 */
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updates.password;
    delete updates.email;
    delete updates._id;
    delete updates.role;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Re-validate profile completion
    const validation = validateProfileFields(user);
    if (validation.isComplete && !user.profileCompleted) {
      user.profileCompleted = true;
      await user.save();
    }

    const completionPercentage = getProfileCompletionPercentage(user);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
      profileCompleted: user.profileCompleted,
      completionPercentage
    });
  } catch (error) {
    console.error("Update profile error:", error);
    next(error);
  }
};

/**
 * Get required fields for role
 * GET /api/profile/required-fields
 */
export const getRequiredFields = async (req, res, next) => {
  try {
    const { role } = req.user;

    const commonFields = [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'contact', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'address', label: 'Address', type: 'text', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'state', label: 'State', type: 'text', required: true }
    ];

    const roleSpecificFields = {
      jobSeeker: [
        { name: 'whatsappNumber', label: 'WhatsApp Number', type: 'tel', required: true },
        { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
        { name: 'primarySubject', label: 'Primary Subject', type: 'text', required: true },
        { name: 'secondarySubjects', label: 'Secondary Subjects', type: 'array', required: false },
        { name: 'qualification', label: 'Qualification', type: 'text', required: true },
        { name: 'yoe', label: 'Years of Experience', type: 'text', required: true },
        { name: 'teachingMode', label: 'Teaching Mode', type: 'select', options: ['Online', 'Offline', 'Hybrid'], required: true },
        { name: 'bio', label: 'About / Bio', type: 'textarea', required: true },
        { name: 'profilePic', label: 'Profile Image', type: 'file', required: false },
        { name: 'availableForHire', label: 'Available for Tuition', type: 'boolean', required: false }
      ],
      parent: [
        { name: 'whatsappNumber', label: 'WhatsApp Number', type: 'tel', required: true },
        { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
        { name: 'childName', label: 'Child Name', type: 'text', required: true },
        { name: 'childGrade', label: 'Class / Grade', type: 'text', required: true },
        { name: 'preferredSubjects', label: 'Preferred Subjects', type: 'array', required: true },
        { name: 'preferredTeachingMode', label: 'Preferred Teaching Mode', type: 'select', options: ['Online', 'Offline', 'Hybrid'], required: true },
        { name: 'profilePic', label: 'Profile Image', type: 'file', required: false }
      ],
      recruiter: [
        { name: 'fullName', label: 'School Name', type: 'text', required: true },
        { name: 'contact', label: 'School Phone Number', type: 'tel', required: true },
        { name: 'address', label: 'School Address', type: 'text', required: true },
        { name: 'schoolRegistrationNumber', label: 'School Registration Number', type: 'text', required: true },
        { name: 'principalName', label: 'Principal Name', type: 'text', required: true },
        { name: 'bio', label: 'Description about School', type: 'textarea', required: true },
        { name: 'profilePic', label: 'School Logo', type: 'file', required: false }
      ]
    };

    const fields = role === 'recruiter' 
      ? roleSpecificFields[role] 
      : [...commonFields, ...(roleSpecificFields[role] || [])];

    res.status(200).json({
      success: true,
      role,
      fields
    });
  } catch (error) {
    console.error("Get required fields error:", error);
    next(error);
  }
};
