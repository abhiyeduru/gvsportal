# Role-Based Profile Completion System 🎯

## Overview

Complete implementation of a role-based profile completion system for the Gravity Job Portal. Users must complete their profile after registration before accessing the dashboard.

---

## System Architecture

### Backend Components

#### 1. **User Model Updates** (`backend/models/User.js`)
- Added `profileCompleted` field (Boolean, default: false)
- Added role-specific fields:
  - **Teacher**: `whatsappNumber`, `aadhaarNumber`, `primarySubject`, `qualification`, `yoe`, `teachingMode`, `bio`, `availableForHire`
  - **Parent**: `childName`, `childGrade`, `preferredTeachingMode`, `aadhaarNumber`, `whatsappNumber`
  - **School**: `schoolRegistrationNumber`, `principalName`, `whatsapp`

#### 2. **Profile Completion Middleware** (`backend/middleware/profileCompletion.middleware.js`)
- `requireProfileCompletion`: Checks if user has completed profile
- `validateProfileFields`: Validates required fields based on role
- `getProfileCompletionPercentage`: Calculates profile completion %

#### 3. **Profile Completion Controller** (`backend/controllers/profileCompletion.controller.js`)
- `getProfileStatus`: Returns profile completion status
- `completeProfile`: Marks profile as complete
- `getProfile`: Fetches user profile data
- `updateProfile`: Updates profile fields
- `getRequiredFields`: Returns required fields for user's role

#### 4. **Profile Routes** (`backend/routes/profile.routes.js`)
```
GET  /api/profile/status          - Get profile completion status
GET  /api/profile                 - Get profile data
GET  /api/profile/required-fields - Get required fields for role
PUT  /api/profile/complete        - Complete profile (first time)
PUT  /api/profile/update          - Update profile (anytime)
```

### Frontend Components

#### 1. **Profile Services** (`client/src/services/profileServices.js`)
- `getProfileStatus()` - Check if profile is complete
- `getProfile()` - Fetch profile data
- `getRequiredFields()` - Get role-specific required fields
- `completeProfile()` - Submit completed profile
- `updateProfile()` - Update profile anytime
- `uploadProfilePicture()` - Upload profile image

#### 2. **Profile Completion Hook** (`client/src/hooks/useProfileCompletion.jsx`)
- Manages profile state with React Query
- Handles mutations for profile operations
- Provides loading and error states
- Auto-invalidates queries on success

#### 3. **Profile Completion Route** (`client/src/ProtectedRoutes/ProfileCompletionRoute.jsx`)
- Wraps dashboard routes
- Redirects to `/complete-profile` if not complete
- Shows loading state while checking

#### 4. **Complete Profile Page** (`client/src/pages/CompleteProfilePage.jsx`)
- Dynamic form based on user role
- Profile image upload
- Form validation
- Error handling
- Progress tracking

---

## Required Fields by Role

### Teacher Profile
```
✓ Full Name
✓ Phone Number
✓ WhatsApp Number
✓ Email
✓ Address
✓ City
✓ State
✓ Aadhaar Number
✓ Primary Subject
✓ Secondary Subjects
✓ Qualification
✓ Years of Experience
✓ Teaching Mode (Online/Offline/Hybrid)
✓ Bio / About Teacher
✓ Profile Image (optional)
✓ Available for Tuition (toggle)
```

### Parent Profile
```
✓ Full Name
✓ Phone Number
✓ WhatsApp Number
✓ Email
✓ Address
✓ City
✓ State
✓ Aadhaar Number
✓ Child Name
✓ Class / Grade
✓ Preferred Subjects
✓ Preferred Teaching Mode
✓ Profile Image (optional)
```

### School Profile
```
✓ School Name
✓ School Address
✓ City
✓ State
✓ School Phone Number
✓ School Email
✓ School Registration Number
✓ Principal Name
✓ Description about School
✓ School Logo (optional)
```

---

## User Flow

### Registration → Profile Completion → Dashboard

```
1. User registers with email, password, and role
   ↓
2. Backend creates user with profileCompleted = false
   ↓
3. Frontend redirects to /complete-profile
   ↓
4. User fills in role-specific required fields
   ↓
5. User uploads profile image (optional)
   ↓
6. User clicks "Complete Profile"
   ↓
7. Backend validates all required fields
   ↓
8. If valid: profileCompleted = true, redirect to dashboard
   If invalid: show error messages
   ↓
9. Dashboard is now accessible
```

---

## API Endpoints

### Get Profile Status
```
GET /api/profile/status

Response:
{
  "success": true,
  "profileCompleted": false,
  "completionPercentage": 45,
  "missingFields": ["primarySubject", "qualification"],
  "role": "jobSeeker"
}
```

### Get Profile Data
```
GET /api/profile

Response:
{
  "success": true,
  "user": { /* full user object */ },
  "completionPercentage": 45,
  "profileCompleted": false
}
```

### Get Required Fields
```
GET /api/profile/required-fields

Response:
{
  "success": true,
  "role": "jobSeeker",
  "fields": [
    {
      "name": "fullName",
      "label": "Full Name",
      "type": "text",
      "required": true
    },
    // ... more fields
  ]
}
```

### Complete Profile
```
PUT /api/profile/complete

Body:
{
  "fullName": "John Doe",
  "contact": "9876543210",
  "email": "john@example.com",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "primarySubject": "Mathematics",
  "qualification": "M.Sc",
  "yoe": "5",
  "teachingMode": "Online",
  "bio": "Experienced teacher...",
  "whatsappNumber": "9876543210",
  "aadhaarNumber": "123456789012"
}

Response:
{
  "success": true,
  "message": "Profile completed successfully!",
  "profileCompleted": true,
  "completionPercentage": 100,
  "missingFields": [],
  "user": { /* updated user */ }
}
```

### Update Profile
```
PUT /api/profile/update

Body: { /* any fields to update */ }

Response: { /* same as complete */ }
```

---

## Frontend Integration

### Using the Hook

```jsx
import { useProfileCompletion } from '@/hooks/useProfileCompletion';

function MyComponent() {
  const {
    profileCompleted,
    completionPercentage,
    missingFields,
    profile,
    requiredFields,
    completeProfile,
    updateProfile,
    uploadProfilePicture,
    isCompletingProfile,
    isUpdatingProfile,
    isUploadingPicture
  } = useProfileCompletion();

  return (
    // Use the data and functions
  );
}
```

### Protecting Routes

```jsx
<Route
  path="/dashboard/teacher"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <RoleBasedRoute allowedRole="teacher">
        <ProfileCompletionRoute>
          <TeacherDashboard />
        </ProfileCompletionRoute>
      </RoleBasedRoute>
    </ProtectedRoute>
  }
/>
```

---

## Validation Rules

### Email
- Must be valid email format
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Phone Number
- Must be 10 digits
- Accepts numbers only
- Regex: `/^\d{10}$/`

### Aadhaar Number
- Must be 12 digits
- Accepts numbers only

### Required Fields
- Cannot be empty
- Arrays must have at least one item

---

## Database Schema

### Users Table
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['jobSeeker', 'parent', 'recruiter']),
  profileCompleted: Boolean (default: false),
  
  // Common fields
  fullName: String,
  contact: String,
  address: String,
  city: String,
  state: String,
  profilePic: String (URL),
  
  // Role-specific fields
  // ... (see User model)
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing

### Test Credentials

```
Teacher:
Email: demo@test.com
Password: test123

Parent:
Email: parent@test.com
Password: test123

School:
Email: school@test.com
Password: test123
```

### Test Flow

1. **Register New User**
   - Go to `/register`
   - Fill in email, password, and select role
   - Submit

2. **Complete Profile**
   - Should redirect to `/complete-profile`
   - Fill in all required fields
   - Upload profile image (optional)
   - Click "Complete Profile"

3. **Access Dashboard**
   - Should redirect to `/dashboard/{role}`
   - Dashboard should load successfully

4. **Edit Profile**
   - Go to profile settings
   - Update any field
   - Click "Save Changes"
   - Changes should persist

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Profile not found" | User doesn't exist | Log in again |
| "Invalid email format" | Email validation failed | Enter valid email |
| "Invalid phone number" | Phone validation failed | Enter 10-digit number |
| "Required field missing" | Incomplete form | Fill all required fields |
| "Image upload failed" | File too large or wrong format | Use JPG/PNG < 5MB |

---

## Features

✅ Role-based profile fields
✅ Profile completion tracking
✅ Dashboard access control
✅ Profile image upload
✅ Form validation
✅ Error handling
✅ Loading states
✅ Profile editing anytime
✅ Completion percentage
✅ Missing fields tracking

---

## File Structure

```
backend/
├── controllers/
│   └── profileCompletion.controller.js
├── middleware/
│   └── profileCompletion.middleware.js
├── routes/
│   └── profile.routes.js
└── models/
    └── User.js (updated)

client/
├── hooks/
│   └── useProfileCompletion.jsx
├── pages/
│   └── CompleteProfilePage.jsx
├── services/
│   └── profileServices.js
└── ProtectedRoutes/
    └── ProfileCompletionRoute.jsx
```

---

## Next Steps

1. **Test all flows** with different roles
2. **Verify image uploads** work correctly
3. **Check validation** for all field types
4. **Monitor error logs** for issues
5. **Gather user feedback** on UX

---

## Support

For issues or questions:
1. Check browser console for errors
2. Check backend logs
3. Verify MongoDB connection
4. Ensure all routes are registered
5. Check authentication token validity

---

**Status:** ✅ Complete and Ready for Testing
**Last Updated:** March 2026
**Version:** 1.0.0
