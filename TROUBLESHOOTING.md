# Troubleshooting Guide - GravIIty Platform

## Issue: "Job not found" or 403 Forbidden Errors

### Problem Description
- Teachers see "Job not found" when trying to view jobs
- 403 Forbidden errors for `/get-recruiter-jobs` and `/applications/school`
- Jobs posted by schools don't appear in teacher panel

### Root Causes
1. **Browser Cache**: Old cached data from previous sessions
2. **Mixed Role Sessions**: Browser trying to fetch school data while logged in as teacher
3. **Cookie Conflicts**: Old authentication cookies interfering

### ✅ Solution Steps

#### Step 1: Clear Browser Data
1. Open browser DevTools (F12)
2. Go to Application tab (Chrome) or Storage tab (Firefox)
3. Clear:
   - Local Storage
   - Session Storage
   - Cookies (especially `refreshToken`)
4. Close and reopen browser

#### Step 2: Verify Jobs Exist in Database
Run this command in the backend folder:
```bash
npm run check:jobs
```

This will show all jobs in the database. You should see jobs with `status: open`.

#### Step 3: Login with Correct Credentials

**For Teachers (to view and apply for jobs):**
- Email: `demo@test.com`
- Password: `test123`
- URL: `http://localhost:3000/login`

**For Schools (to post jobs):**
- Email: `school@test.com`
- Password: `test123`
- URL: `http://localhost:3000/login`

#### Step 4: Verify API is Working
1. Open browser DevTools → Network tab
2. Login as teacher
3. Navigate to Find Jobs page
4. Look for `/api/jobs/get-all` request
5. Should return 200 status with jobs array

### Expected Behavior

#### When School Posts a Job:
1. School logs in → Goes to Post Job page
2. Fills form and clicks "Post Job"
3. Job is saved to MongoDB database with `status: 'open'`
4. Job appears in School's "Job Posts" page
5. Job is immediately available to ALL teachers

#### When Teacher Views Jobs:
1. Teacher logs in → Goes to "Find Jobs" page
2. System calls `/api/jobs/get-all?status=open`
3. All open jobs from database are displayed
4. Teacher can click on any job to view details
5. Teacher can click "Apply Now" to submit application

### Common Errors and Fixes

#### Error: 403 Forbidden on `/get-recruiter-jobs`
**Cause:** You're logged in as a teacher, but browser is trying to call school-only endpoint

**Fix:**
1. Clear all browser data (cookies, local storage)
2. Logout completely
3. Close browser
4. Reopen and login again

#### Error: "Job not found" when clicking on a job
**Cause:** Job ID in URL doesn't exist in database or was deleted

**Fix:**
1. Go back to jobs list
2. Click on a different job
3. If all jobs show "not found", run `npm run check:jobs` to verify database

#### Error: No jobs showing in teacher panel
**Cause:** Either no jobs in database OR API call failing

**Fix:**
1. Verify jobs exist: `npm run check:jobs`
2. Check browser console for API errors
3. Check backend logs for errors
4. Verify you're logged in as teacher (not school)

### Database Verification Commands

```bash
# Check all jobs in database
npm run check:jobs

# Check all users
npm run check:user

# Check admin accounts
npm run check:admin

# Seed test users (if needed)
npm run seed:test

# Create super admin (if needed)
npm run create:admin
```

### API Endpoints Reference

#### Jobs (Teachers can access)
- `GET /api/jobs/get-all` - Get all jobs (with filters)
- `GET /api/jobs/:jobId/job-data` - Get specific job details
- `POST /api/applications/jobs/:jobId/apply` - Apply for a job
- `GET /api/applications/jobs/:jobId/check` - Check if already applied

#### Jobs (Schools only)
- `POST /api/jobs/create` - Create new job
- `GET /api/jobs/get-recruiter-jobs` - Get school's posted jobs
- `PUT /api/jobs/:jobId/update` - Update job
- `DELETE /api/jobs/:jobId/delete` - Delete job

#### Applications (Schools only)
- `GET /api/applications/school` - Get all applications for school's jobs
- `PATCH /api/applications/:applicationId/status` - Update application status

#### Applications (Teachers only)
- `GET /api/applications/teacher` - Get teacher's applications

### Testing the Complete Flow

1. **As School:**
   ```
   Login → Post Job → Verify in Job Posts page
   ```

2. **As Teacher:**
   ```
   Login → Find Jobs → Should see the posted job → Click to view → Apply
   ```

3. **Back to School:**
   ```
   Go to Applications page → Should see the teacher's application
   ```

### Still Having Issues?

1. **Restart Backend Server:**
   ```bash
   # Stop the backend (Ctrl+C)
   cd backend
   npm start
   ```

2. **Restart Frontend:**
   ```bash
   # Stop the frontend (Ctrl+C)
   cd client
   npm run dev
   ```

3. **Check MongoDB Connection:**
   - Ensure MongoDB is running
   - Check DATABASE_URL in backend/.env
   - Database name should be `gravity_test`

4. **Check Console Logs:**
   - Backend terminal: Look for errors
   - Browser console: Look for API errors
   - Network tab: Check API responses

### Quick Reset (Nuclear Option)

If nothing works, do a complete reset:

```bash
# 1. Stop all servers
# 2. Clear browser completely (Ctrl+Shift+Delete)
# 3. In backend folder:
npm run seed:test
npm run create:admin
npm start

# 4. In client folder (new terminal):
npm run dev

# 5. Open fresh browser window (incognito mode)
# 6. Login as school, post a job
# 7. Logout, login as teacher, view jobs
```

---

**Last Updated:** March 9, 2026


---

## Issue: Input Fields Not Working in Profile Edit Page

### Problem Description
- Teacher opens Settings → Profile Edit page
- Input fields are visible but cannot type in them
- Fields appear "frozen" or unresponsive
- Text cannot be entered or edited

### Root Cause
The issue was caused by shadcn/ui Input components not properly handling onChange events in certain contexts. The Input component wrapper was interfering with native input behavior.

### ✅ Solution Applied

**Status: FIXED** ✅

All input fields have been replaced with native HTML `<input>` elements that work correctly.

**Files Fixed:**
1. `client/src/components/Dashboard/Profile/TeacherProfile.jsx` - Standalone profile edit page
2. `client/src/components/Dashboard/Settings/Profile/TeacherProfileEdit.jsx` - Settings profile edit page

### How to Access Profile Edit

**Method 1: Via Sidebar (Recommended)**
1. Login as teacher (demo@test.com / test123)
2. Click "Settings" in the left sidebar
3. Page loads with editable form
4. All fields should now be typeable

**Method 2: Via Top Bar**
1. Login as teacher
2. Click on your profile picture/name in top right
3. Redirects to Settings page
4. All fields should now be typeable

### Features Now Working

✅ **All Input Fields:**
- First Name, Middle Name, Last Name
- Username (read-only)
- Password fields with show/hide toggle
- Mobile, WhatsApp, Email
- Address, City, State selection
- Primary Subject, Secondary Subjects
- Experience, Qualification
- Teaching Mode selection

✅ **Text Areas:**
- About Me section (fully editable)

✅ **Skills Management:**
- Add new skills
- Edit skill names
- Adjust skill levels with sliders
- Remove skills

✅ **Save Functionality:**
- Save button updates profile in database
- Success toast notification
- Profile data refreshes automatically
- Password fields clear after save

### If Input Fields Still Don't Work

Try these steps in order:

1. **Hard Refresh the Page**
   ```
   Windows/Linux: Ctrl + Shift + R
   Mac: Cmd + Shift + R
   ```

2. **Clear Browser Cache**
   - Press F12 to open DevTools
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

3. **Check Browser Console**
   - Press F12
   - Go to Console tab
   - Look for any JavaScript errors
   - Share errors if you see any

4. **Try Incognito Mode**
   - Open new incognito/private window
   - Login fresh
   - Test input fields

5. **Verify You're on Correct Page**
   - URL should be: `http://localhost:3000/dashboard/teacher/settings`
   - Page title should show "Edit Profile"
   - Should see form with multiple sections

### Testing the Fix

To verify everything works:

1. **Login as Teacher:**
   - Email: demo@test.com
   - Password: test123

2. **Navigate to Settings:**
   - Click "Settings" in left sidebar
   - OR click profile picture in top right

3. **Test Input Fields:**
   - Click in "First Name" field
   - Type some text
   - Text should appear as you type
   - Try other fields

4. **Test Save:**
   - Make some changes
   - Click "Save Changes" button
   - Should see success message
   - Changes should persist after page refresh

### Sidebar Navigation

All sidebar buttons are working correctly:

✅ **Teacher Sidebar Links:**
- Dashboard → `/dashboard/teacher`
- Find Jobs → `/dashboard/teacher/jobs`
- Applications → `/dashboard/teacher/applied-jobs`
- Messages → `/dashboard/teacher/messages`
- Analytics → `/dashboard/teacher/analytics`
- My Classes → `/dashboard/teacher/my-classes`
- Settings → `/dashboard/teacher/settings`

All routes are properly configured and protected with authentication.

### Technical Details (For Developers)

**What Was Changed:**

**Before (Not Working):**
```jsx
<Input
  name="firstName"
  value={formData.firstName}
  onChange={handleInputChange}
  placeholder="First Name"
/>
```

**After (Working):**
```jsx
<input
  type="text"
  value={formData.firstName}
  onChange={(e) => handleInputChange('firstName', e.target.value)}
  placeholder="First Name"
  className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-2 focus:outline-none focus:border-[#6C5DD3] text-gray-900 bg-transparent"
/>
```

**Key Changes:**
1. Replaced `<Input>` with native `<input>`
2. Added explicit `type` attribute
3. Changed onChange to use inline arrow function
4. Added proper CSS classes for styling
5. Ensured proper value binding

**Why This Works:**
- Native HTML inputs have no wrapper interference
- Direct event handling with proper value extraction
- No component lifecycle issues
- Better browser compatibility
- Simpler debugging

---

**Last Updated:** March 9, 2026 (Input Fields Fix Applied)
