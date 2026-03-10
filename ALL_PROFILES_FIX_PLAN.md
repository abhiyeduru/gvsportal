# Fix All Profile Pages - Complete Plan

## Goal
Make ALL profile pages fully functional with:
- ✅ Save all profile data to database
- ✅ Upload profile images (JPG/PNG, max 5MB)
- ✅ Load existing data on page mount
- ✅ Form validation
- ✅ Success/error notifications

## Profiles to Fix

### 1. Teacher Profile ✅ (ALREADY DONE)
**Location:** `client/src/components/Dashboard/Profile/TeacherProfile.jsx`
**Status:** Complete and working
**Features:**
- Profile image upload
- All fields save correctly
- Skills management
- Portfolio links
- Available for hire toggle

### 2. Parent Profile ❌ (NEEDS FIX)
**Location:** `client/src/components/Dashboard/ParentDashboard/ProfileSettings.jsx`
**Current Status:** Needs implementation
**Required Fields:**
- Profile image
- Full name
- Email
- Contact number
- Address, City, State
- Child's information (optional)

### 3. School Profile ❌ (NEEDS FIX)
**Location:** 
- `client/src/components/Dashboard/Profile/SchoolProfileForm.jsx`
- `client/src/pages/SchoolProfilePage.jsx`
**Current Status:** Needs implementation
**Required Fields:**
- School logo/image
- School name
- Email
- Contact number
- Address, City, State
- Establishment year
- Board (CBSE, ICSE, State, etc.)
- Description

## Backend Support

### Existing Endpoints ✅
```
PUT /api/user/profile-update     - Update profile data
PUT /api/user/profile-pic         - Upload profile picture
GET /api/user/current-user        - Get current user data
```

### User Model Fields ✅
All required fields exist in the User model:
- profilePic
- fullName
- email
- contact
- address
- city
- state
- bio
- role (jobSeeker, parent, recruiter)

## Implementation Order

1. ✅ Teacher Profile - DONE
2. ⏳ Parent Profile - IN PROGRESS
3. ⏳ School Profile - IN PROGRESS

## Common Features for All Profiles

### Profile Image Upload
- Accept: JPG, PNG
- Max size: 5MB
- Upload to Cloudinary
- Preview before upload
- Update immediately after upload

### Form Validation
- Required fields check
- Email format validation
- Phone number validation (10 digits)
- File size validation

### Save Functionality
- Call `/api/user/profile-update`
- Show loading state
- Success/error notifications
- Refetch user data after save

### Load Existing Data
- Fetch on component mount
- Populate all form fields
- Show profile image if exists

## Files to Modify

### Parent Profile
1. `client/src/components/Dashboard/ParentDashboard/ProfileSettings.jsx`

### School Profile
1. `client/src/components/Dashboard/Profile/SchoolProfileForm.jsx`
2. `client/src/components/Dashboard/Profile/SchoolProfileSummary.jsx`
3. `client/src/pages/SchoolProfilePage.jsx`

## Next Steps

1. Fix Parent Profile page
2. Fix School Profile page
3. Test all three profiles
4. Verify image uploads work
5. Verify data persistence

Let's start!
