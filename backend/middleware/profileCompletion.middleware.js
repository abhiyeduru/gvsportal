import { createError } from "../utils/error.js";

/**
 * Middleware to check if user has completed their profile
 * Redirects to profile completion page if not completed
 */
export const requireProfileCompletion = (req, res, next) => {
  if (!req.user) {
    return next(createError(401, "Not authenticated"));
  }

  if (!req.user.profileCompleted) {
    return res.status(403).json({
      success: false,
      profileCompleted: false,
      message: "Please complete your profile to access this feature",
      redirectTo: "/complete-profile"
    });
  }

  next();
};

/**
 * Check required fields based on user role
 */
export const validateProfileFields = (user) => {
  const { role } = user;
  
  // Common required fields for all roles
  const commonFields = ['fullName', 'contact', 'email', 'address', 'city', 'state'];
  
  // Role-specific required fields
  const roleFields = {
    jobSeeker: [ // Teacher
      'whatsappNumber',
      'aadhaarNumber',
      'primarySubject',
      'qualification',
      'yoe', // years of experience
      'teachingMode',
      'bio'
    ],
    parent: [
      'whatsappNumber',
      'aadhaarNumber',
      'childName',
      'childGrade',
      'preferredSubjects',
      'preferredTeachingMode'
    ],
    recruiter: [ // School
      'contact', // school phone
      'address', // school address
      'schoolRegistrationNumber',
      'principalName',
      'bio' // description
    ]
  };

  const requiredFields = [...commonFields, ...(roleFields[role] || [])];
  const missingFields = [];

  for (const field of requiredFields) {
    const value = user[field];
    
    // Check if field is missing or empty
    if (!value || (Array.isArray(value) && value.length === 0)) {
      missingFields.push(field);
    }
  }

  return {
    isComplete: missingFields.length === 0,
    missingFields
  };
};

/**
 * Get profile completion percentage
 */
export const getProfileCompletionPercentage = (user) => {
  const validation = validateProfileFields(user);
  const { role } = user;
  
  // Common fields count
  const commonFieldsCount = 6; // fullName, contact, email, address, city, state
  
  // Role-specific fields count
  const roleFieldsCount = {
    jobSeeker: 7, // Teacher fields
    parent: 6, // Parent fields
    recruiter: 4 // School fields
  };
  
  const totalFields = commonFieldsCount + (roleFieldsCount[role] || 0);
  const completedFields = totalFields - validation.missingFields.length;
  
  return Math.round((completedFields / totalFields) * 100);
};
