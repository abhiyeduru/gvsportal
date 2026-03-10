# Teacher Profile Testing Guide

## Overview
This guide provides step-by-step instructions to test the fully functional Teacher Profile page.

## Prerequisites
- Backend server running on port 5000
- Frontend server running on port 5173
- MongoDB database connected
- At least one teacher account created

## Test Scenarios

### 1. Profile Page Load
**Steps:**
1. Login as a teacher
2. Navigate to Profile page (Dashboard → Profile)
3. Verify all existing data loads correctly

**Expected Results:**
- ✅ Profile image displays (or default avatar if none)
- ✅ All form fields populate with existing data
- ✅ Skills display with correct percentages
- ✅ Portfolio links load correctly
- ✅ Profile completion percentage shows
- ✅ Available for Hire toggle reflects current status

---

### 2. Profile Image Upload
**Steps:**
1. Click on profile avatar in right sidebar
2. Select an image file (JPG/PNG, under 5MB)
3. Wait for upload to complete

**Expected Results:**
- ✅ Image uploads to Cloudinary
- ✅ Profile picture updates immediately
- ✅ Success toast notification appears
- ✅ Image persists after page refresh

**Error Cases to Test:**
- Upload file > 5MB → Should show error
- Upload non-image file → Should show error

---

### 3. Basic Information Update
**Steps:**
1. Update First Name, Middle Name, Last Name
2. Update Username
3. Update Contact information (Mobile, WhatsApp, Email)
4. Update Address, City, State
5. Click "Save Changes"

**Expected Results:**
- ✅ All fields save successfully
- ✅ Success toast notification appears
- ✅ Data persists after page refresh
- ✅ Full name updates in right sidebar preview
- ✅ Contact info updates in right sidebar

**Validation Tests:**
- Invalid email format → Should show error
- Phone number not 10 digits → Should show error
- Empty required fields → Should show error

---

### 4. Password Change
**Steps:**
1. Enter new password in "Password" field
2. Re-enter same password in "Re-Type Password" field
3. Click "Save Changes"

**Expected Results:**
- ✅ Password updates successfully
- ✅ Password fields clear after save
- ✅ Can login with new password

**Error Cases:**
- Passwords don't match → Should show error
- Password fields clear after successful save

---

### 5. Teaching Details Update
**Steps:**
1. Update Primary Subject
2. Update Secondary Subjects
3. Update Years of Experience
4. Update Qualification
5. Update Teaching Mode (Online/Offline/Hybrid)
6. Update Hourly Rate
7. Click "Save Changes"

**Expected Results:**
- ✅ All teaching details save successfully
- ✅ Primary subject updates in right sidebar
- ✅ Data persists after page refresh

---

### 6. About Me Section
**Steps:**
1. Update the "About Me" textarea
2. Click "Save Changes"

**Expected Results:**
- ✅ Bio saves successfully
- ✅ Data persists after page refresh

---

### 7. Skills Management
**Steps:**
1. Click "Add New Skills" button
2. Enter skill name
3. Adjust skill level using slider
4. Add multiple skills
5. Remove a skill using X button
6. Click "Save Changes"

**Expected Results:**
- ✅ New skills add successfully
- ✅ Skill levels update correctly
- ✅ Skills can be removed
- ✅ Top 3 skills display in right sidebar with progress circles
- ✅ Skills persist after page refresh

---

### 8. Portfolio Links
**Steps:**
1. Enter LinkedIn URL
2. Enter YouTube URL
3. Enter Website URL
4. Enter Portfolio URL
5. Click "Save Changes"

**Expected Results:**
- ✅ All portfolio links save successfully
- ✅ Links display in right sidebar
- ✅ Links are editable from sidebar inputs
- ✅ Data persists after page refresh

---

### 9. Available for Hire Toggle
**Steps:**
1. Toggle "Available for Hire" switch ON
2. Click "Save Changes"
3. Verify teacher appears in Parent's "Find Teachers" page
4. Toggle "Available for Hire" switch OFF
5. Click "Save Changes"
6. Verify teacher does NOT appear in Parent's "Find Teachers" page

**Expected Results:**
- ✅ Toggle saves correctly
- ✅ When ON: Teacher visible in parent search
- ✅ When OFF: Teacher hidden from parent search
- ✅ Status persists after page refresh

---

### 10. Profile Completion Calculation
**Steps:**
1. Start with minimal profile data
2. Add profile image → Check percentage increase
3. Fill in contact info → Check percentage increase
4. Add teaching details → Check percentage increase
5. Add skills → Check percentage increase
6. Add portfolio links → Check percentage increase

**Expected Results:**
- ✅ Percentage updates dynamically
- ✅ Percentage displays in right sidebar
- ✅ Calculation is accurate based on filled fields

---

### 11. Cancel Changes
**Steps:**
1. Make changes to any fields
2. Click "Cancel" button

**Expected Results:**
- ✅ All changes revert to original values
- ✅ Info toast notification appears
- ✅ No data is saved to database

---

### 12. Back to Dashboard
**Steps:**
1. Click "Back to Dashboard" button

**Expected Results:**
- ✅ Navigates back to teacher dashboard
- ✅ No unsaved changes are lost (if saved)

---

### 13. Parent Find Teachers Integration
**Steps:**
1. Login as teacher
2. Set "Available for Hire" to ON
3. Save profile with complete information
4. Logout
5. Login as parent
6. Navigate to "Find Teachers" page
7. Search for the teacher

**Expected Results:**
- ✅ Teacher appears in search results
- ✅ Profile picture displays correctly
- ✅ Name, subject, experience display correctly
- ✅ Hourly rate displays correctly
- ✅ Teaching mode displays correctly
- ✅ Location displays correctly
- ✅ Rating displays correctly
- ✅ Bio displays correctly

---

### 14. Profile Statistics
**Steps:**
1. Check right sidebar statistics section

**Expected Results:**
- ✅ Applications count displays (defaults to 0)
- ✅ Interviews count displays (defaults to 0)
- ✅ Profile Views count displays (defaults to 0)

---

## API Endpoints Used

### Profile Update
```
PUT /api/user/profile-update
```
**Payload:**
```json
{
  "fullName": "John Doe Smith",
  "email": "john@example.com",
  "contact": "9876543210",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "bio": "Experienced teacher...",
  "yoe": "5",
  "primarySubject": "Mathematics",
  "secondarySubjects": "Physics, Chemistry",
  "qualification": "M.Sc, B.Ed",
  "teachingMode": "Hybrid",
  "hourlyRate": "500",
  "skills": [
    {"name": "Subject Knowledge", "level": 90},
    {"name": "Communication", "level": 85}
  ],
  "availableForHire": true,
  "profileLinks": {
    "linkedIn": "https://linkedin.com/in/johndoe",
    "youtube": "https://youtube.com/@johndoe",
    "website": "https://johndoe.com",
    "portfolio": "https://portfolio.johndoe.com"
  }
}
```

### Profile Picture Upload
```
PUT /api/user/profile-pic
```
**Payload:** FormData with `profilePic` file

### Get Available Tutors (Parent View)
```
GET /api/tuition/tutors?subject=Math&city=Mumbai&page=1&limit=12
```

---

## Common Issues & Solutions

### Issue: Profile image not uploading
**Solution:** 
- Check Cloudinary credentials in backend/.env
- Verify CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

### Issue: Teacher not appearing in parent search
**Solution:**
- Verify `availableForHire` is set to `true`
- Check teacher role is "jobSeeker"
- Verify backend route `/api/tuition/tutors` is working

### Issue: Skills not saving
**Solution:**
- Verify skills array format: `[{name: "Skill", level: 90}]`
- Check backend User model has skills field

### Issue: Portfolio links not saving
**Solution:**
- Verify User model has profileLinks with youtube, website, portfolio fields
- Check backend controller includes profileLinks in update

---

## Database Verification

### Check Teacher Profile in MongoDB
```javascript
db.users.findOne({ email: "teacher@example.com" })
```

### Verify Available Teachers
```javascript
db.users.find({ 
  role: "jobSeeker", 
  availableForHire: true 
}).pretty()
```

---

## Success Criteria
✅ All 14 test scenarios pass
✅ No console errors
✅ All validations work correctly
✅ Data persists after page refresh
✅ Teacher appears in parent search when available
✅ Profile completion percentage calculates correctly
✅ All API calls succeed with 200 status

---

## Notes
- Profile completion is calculated based on 12 fields
- Skills are stored as array of objects with name and level
- Portfolio links support LinkedIn, YouTube, Website, and Portfolio
- Teaching mode options: Online, Offline, Hybrid
- Hourly rate is stored as string (can include currency symbol)
- Profile image uploads to Cloudinary and returns URL
