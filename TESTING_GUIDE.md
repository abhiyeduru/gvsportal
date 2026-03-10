# Gravity Job Portal - Complete Testing Guide

## Prerequisites

### Backend Setup
```bash
cd backend
npm install
```

**Environment Variables** (`.env`):
```env
DATABASE_URL=mongodb://localhost:27017/gravity_test
JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
PORT=8000
```

### Frontend Setup
```bash
cd client
npm install
```

**Environment Variables** (`.env`):
```env
VITE_API_URL=http://localhost:8000
```

---

## Starting the Application

### Terminal 1 - Backend
```bash
cd backend
npm start
```
**Expected Output**:
```
Server is running on http://localhost:8000
MongoDB connected successfully
```

### Terminal 2 - Frontend
```bash
cd client
npm run dev
```
**Expected Output**:
```
VITE ready in XXX ms
Local: http://localhost:3000
```

---

## Test Credentials

### School Account
- **Email**: school@test.com
- **Password**: test123
- **Role**: recruiter (displays as "school")

### Teacher Account
- **Email**: demo@test.com
- **Password**: test123
- **Role**: jobSeeker (displays as "teacher")

### Parent Account
- **Email**: parent@test.com
- **Password**: test123
- **Role**: parent

### Super Admin
- **Email**: admin@gravity.com
- **Password**: admin123
- **Role**: super_admin

---

## Testing Workflow 1: School Posts Job → Teacher Applies

### Step 1: School Posts Job

1. **Login as School**
   - Navigate to http://localhost:3000/login
   - Email: school@test.com
   - Password: test123
   - Click "Login"

2. **Verify Dashboard Access**
   - Should redirect to `/dashboard/school`
   - Sidebar should show: Dashboard, Job Openings, Settings

3. **Navigate to Post Job**
   - Click "Job Openings" in sidebar
   - Click "Post Job" tab or button

4. **Fill Job Form**
   ```
   Job Title: Mathematics Teacher
   Subject: Mathematics
   Description: Looking for experienced math teacher for grades 9-12
   Location: 
     - City: Mumbai
     - State: Maharashtra
     - Country: India
   Salary Range:
     - Min: 40000
     - Max: 60000
     - Currency: INR
     - Frequency: monthly
   Job Type: full-time
   Work Mode: Hybrid
   Experience Required: 3-5 years
   Skills Required: Algebra, Geometry, Calculus
   Requirements: B.Ed, M.Sc Mathematics
   ```

5. **Submit Job**
   - Click "Post Job" button
   - Should see success message
   - Job should appear in "Job Posts" tab

6. **Verify Job in Database**
   ```bash
   cd backend
   npm run check:jobs
   ```
   Should show the newly created job with status "open"

---

### Step 2: Teacher Views and Applies

1. **Logout from School Account**
   - Click logout button

2. **Login as Teacher**
   - Email: demo@test.com
   - Password: test123

3. **Verify Dashboard Access**
   - Should redirect to `/dashboard/teacher`
   - Sidebar should show: Dashboard, Find Jobs, Applications, etc.

4. **Navigate to Find Jobs**
   - Click "Find Jobs" in sidebar
   - Should see list of available jobs
   - The Mathematics Teacher job should be visible

5. **View Job Details**
   - Click on the Mathematics Teacher job card
   - Should navigate to `/dashboard/teacher/jobs/:jobId`
   - Should see full job description, salary, location, etc.

6. **Apply for Job**
   - Click "Apply Now" button
   - Should open application form
   - Fill form:
     ```
     Cover Letter: I am an experienced mathematics teacher...
     Expected Salary: 50000
     Available From: [Select date]
     ```
   - Click "Submit Application"
   - Should see success message

7. **Verify Application**
   - Navigate to "Applications" in sidebar
   - Should see the application with status "applied"

---

### Step 3: School Reviews Application

1. **Logout and Login as School**
   - school@test.com / test123

2. **Navigate to Applications**
   - Click "Job Openings" → "Applications" tab
   - Should see the teacher's application

3. **View Application Details**
   - Should see:
     - Teacher name
     - Qualification
     - Experience
     - Cover letter
     - Expected salary

4. **Update Application Status**
   - Click "Shortlist" or "Interview" button
   - Status should update
   - Teacher should see updated status in their Applications page

---

## Testing Workflow 2: Parent Finds Tutor → Hires

### Step 1: Teacher Sets Up Profile

1. **Login as Teacher**
   - demo@test.com / test123

2. **Navigate to Settings**
   - Click "Settings" in sidebar

3. **Update Profile**
   - Fill/verify:
     ```
     Primary Subject: Mathematics
     Secondary Subjects: Physics, Chemistry
     Qualification: M.Sc Mathematics, B.Ed
     Experience: 5 years
     Hourly Rate: 800
     City: Mumbai
     State: Maharashtra
     Teaching Mode: Hybrid
     Available for Hire: ✓ (toggle ON)
     ```
   - Click "Save Changes"

---

### Step 2: Parent Searches for Tutors

1. **Login as Parent**
   - parent@test.com / test123

2. **Verify Dashboard**
   - Should redirect to `/dashboard/parent`
   - Should see dashboard with stats

3. **Navigate to Find Tutors**
   - Click "Find Tutors" in sidebar
   - Should see list of available tutors
   - Teacher (demo@test.com) should appear in list

4. **Apply Filters**
   - Subject: Mathematics
   - City: Mumbai
   - Mode: Hybrid
   - Click "Search" or filters auto-apply
   - Results should filter accordingly

5. **View Tutor Profile**
   - Click on teacher's card
   - Should see full profile:
     - Name, photo
     - Subjects
     - Qualification
     - Experience
     - Hourly rate
     - Rating
     - Bio

---

### Step 3: Parent Requests Tuition

1. **Click "Hire" Button**
   - Should open tuition request form

2. **Fill Request Form**
   ```
   Subject: Mathematics
   Class Level: Grade 10
   Mode: Online
   Location: (optional for online)
   Message: Need help with algebra and geometry preparation for board exams
   ```

3. **Submit Request**
   - Click "Send Request"
   - Should see success message
   - Should redirect to "My Requests" page

4. **Verify Request**
   - Navigate to "Tuition Requests" in sidebar
   - Should see request with status "Requested"

---

### Step 4: Teacher Accepts Request

1. **Logout and Login as Teacher**
   - demo@test.com / test123

2. **Navigate to Tuition Requests**
   - Click "Tuitions" or "Tuition Requests" in sidebar
   - Should see the parent's request

3. **View Request Details**
   - Should see:
     - Parent name
     - Subject
     - Class level
     - Mode
     - Message
     - Hourly rate

4. **Accept Request**
   - Click "Accept" button
   - Select start date
   - Click "Confirm"
   - Status should update to "Accepted"

5. **Verify in Parent Dashboard**
   - Login as parent
   - Navigate to "Tuition Requests"
   - Status should show "Accepted"
   - Should see start date

---

## Testing Workflow 3: Messaging System

### Step 1: Send Message (After Job Application)

1. **Login as School**
   - school@test.com / test123

2. **Navigate to Applications**
   - Find teacher's application
   - Click "Message" button (if available)
   - OR navigate to "Messages" in sidebar

3. **Send Message**
   - Select teacher from conversation list
   - Type message: "We would like to schedule an interview"
   - Click "Send"
   - Message should appear in chat

---

### Step 2: Teacher Receives and Replies

1. **Login as Teacher**
   - demo@test.com / test123

2. **Check Messages**
   - Should see unread count badge on Messages icon
   - Navigate to "Messages"
   - Should see conversation with school

3. **View Conversation**
   - Click on school's conversation
   - Should see school's message
   - Unread count should decrease

4. **Reply**
   - Type: "Thank you! I'm available this week"
   - Click "Send"
   - Message should appear

---

### Step 3: Verify Message Features

1. **Unread Count**
   - Logout and login as school
   - Should see unread count badge
   - Click Messages
   - Count should clear after viewing

2. **Conversation List**
   - Should show all conversations
   - Should show last message preview
   - Should show timestamp
   - Should be sorted by most recent

3. **Message History**
   - All messages should be visible
   - Sorted chronologically
   - Sender/receiver clearly indicated

---

## API Testing with Postman/Thunder Client

### Authentication

#### 1. Register User
```http
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "email": "newuser@test.com",
  "password": "test123",
  "fullName": "New User",
  "role": "jobSeeker"
}
```

#### 2. Login
```http
POST http://localhost:8000/api/auth/login
Content-Type: application/json

{
  "email": "demo@test.com",
  "password": "test123"
}
```
**Save the token from response cookies**

---

### Job Endpoints

#### 3. Get All Jobs
```http
GET http://localhost:8000/api/jobs/get-all?status=open
Cookie: token=<your_token>
```

#### 4. Create Job (School)
```http
POST http://localhost:8000/api/jobs/create
Cookie: token=<school_token>
Content-Type: application/json

{
  "title": "Science Teacher",
  "description": "Looking for experienced science teacher",
  "location": {
    "city": "Delhi",
    "state": "Delhi",
    "country": "India"
  },
  "salaryRange": {
    "min": "35000",
    "max": "50000",
    "currency": "INR"
  },
  "subject": "Science",
  "jobType": "full-time",
  "workFrom": "Hybrid",
  "experience": "2-4 years"
}
```

---

### Application Endpoints

#### 5. Apply for Job (Teacher)
```http
POST http://localhost:8000/api/applications/jobs/:jobId/apply
Cookie: token=<teacher_token>
Content-Type: application/json

{
  "coverLetter": "I am interested in this position...",
  "expectedSalary": 45000,
  "availableFrom": "2024-04-01"
}
```

#### 6. Get School Applications
```http
GET http://localhost:8000/api/applications/school
Cookie: token=<school_token>
```

#### 7. Update Application Status
```http
PATCH http://localhost:8000/api/applications/:applicationId/status
Cookie: token=<school_token>
Content-Type: application/json

{
  "status": "interview"
}
```

---

### Tuition Endpoints

#### 8. Get Available Tutors
```http
GET http://localhost:8000/api/tuition/tutors?subject=Mathematics&city=Mumbai
Cookie: token=<parent_token>
```

#### 9. Create Tuition Request
```http
POST http://localhost:8000/api/tuition/request
Cookie: token=<parent_token>
Content-Type: application/json

{
  "teacherId": "<teacher_id>",
  "subject": "Mathematics",
  "classLevel": "Grade 10",
  "mode": "online",
  "message": "Need help with board exam preparation"
}
```

#### 10. Get Teacher Requests
```http
GET http://localhost:8000/api/tuition/teacher/requests
Cookie: token=<teacher_token>
```

#### 11. Update Request Status
```http
PATCH http://localhost:8000/api/tuition/teacher/request/:requestId/status
Cookie: token=<teacher_token>
Content-Type: application/json

{
  "status": "accepted",
  "startDate": "2024-04-01"
}
```

---

### Message Endpoints

#### 12. Send Message
```http
POST http://localhost:8000/api/messages/send
Cookie: token=<your_token>
Content-Type: application/json

{
  "receiverId": "<receiver_user_id>",
  "message": "Hello, I would like to discuss...",
  "relatedTo": "job_application",
  "relatedId": "<application_id>"
}
```

#### 13. Get Conversation
```http
GET http://localhost:8000/api/messages/conversation/:otherUserId
Cookie: token=<your_token>
```

#### 14. Get All Conversations
```http
GET http://localhost:8000/api/messages/conversations
Cookie: token=<your_token>
```

#### 15. Get Unread Count
```http
GET http://localhost:8000/api/messages/unread-count
Cookie: token=<your_token>
```

---

## Database Verification

### Check Jobs
```bash
cd backend
npm run check:jobs
```

### Check Users
```bash
npm run check:user
```

### Check Admin
```bash
npm run check:admin
```

### MongoDB Shell Commands
```bash
# Connect to MongoDB
mongosh

# Use database
use gravity_test

# Check jobs
db.jobs.find().pretty()

# Check applications
db.applications.find().pretty()

# Check tuition bookings
db.tuitionbookings.find().pretty()

# Check messages
db.messages.find().pretty()

# Count documents
db.jobs.countDocuments()
db.applications.countDocuments()
db.tuitionbookings.countDocuments()
db.messages.countDocuments()
```

---

## Common Issues and Solutions

### Issue 1: 403 Forbidden Errors
**Cause**: Browser cache from previous sessions
**Solution**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Use incognito mode
3. Hard refresh (Ctrl+Shift+R)

### Issue 2: Jobs Not Showing
**Cause**: Database connection or API issue
**Solution**:
1. Check backend logs
2. Verify MongoDB is running
3. Run `npm run check:jobs`
4. Check API endpoint directly: http://localhost:8000/api/jobs/get-all

### Issue 3: Input Fields Not Working
**Status**: ✅ Fixed
**Solution**: Already replaced with native HTML inputs

### Issue 4: Authentication Errors
**Cause**: Token expired or invalid
**Solution**:
1. Logout and login again
2. Check token in cookies
3. Verify JWT secrets in .env

---

## Performance Testing

### Load Testing
```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Test job listing endpoint
ab -n 1000 -c 10 http://localhost:8000/api/jobs/get-all

# Test with authentication
ab -n 1000 -c 10 -C "token=<your_token>" http://localhost:8000/api/jobs/get-all
```

### Database Performance
```javascript
// In MongoDB shell
db.messages.explain("executionStats").find({ receiver: ObjectId("..."), isRead: false })
```

---

## Security Testing

### Test Role-Based Access
1. Login as teacher
2. Try to access school-only endpoint:
   ```http
   GET http://localhost:8000/api/applications/school
   ```
3. Should return 403 Forbidden

### Test Token Expiry
1. Login and get token
2. Wait 20 minutes (access token expiry)
3. Try to access protected endpoint
4. Should return 401 Unauthorized
5. Use refresh token to get new access token

---

## Deployment Checklist

### Backend
- [ ] Set NODE_ENV=production
- [ ] Use strong JWT secrets
- [ ] Configure CORS for production domain
- [ ] Set up MongoDB Atlas or production database
- [ ] Enable HTTPS
- [ ] Set up logging (Winston, Morgan)
- [ ] Configure rate limiting
- [ ] Set up monitoring (PM2, New Relic)

### Frontend
- [ ] Build production bundle: `npm run build`
- [ ] Configure production API URL
- [ ] Enable service worker for PWA
- [ ] Optimize images
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets

### Database
- [ ] Create indexes
- [ ] Set up backups
- [ ] Configure replica set
- [ ] Monitor performance

---

## Success Criteria

### All Tests Pass When:
- ✅ School can post jobs
- ✅ Teachers can view and apply for jobs
- ✅ Schools can view and manage applications
- ✅ Teachers can set up profiles
- ✅ Parents can find and view tutors
- ✅ Parents can request tuition
- ✅ Teachers can accept/reject requests
- ✅ Users can send and receive messages
- ✅ Unread counts update correctly
- ✅ All role-based permissions work
- ✅ No console errors
- ✅ All API endpoints return correct responses
- ✅ Database relationships work correctly

---

**Last Updated**: Current Session
**Status**: Ready for Testing ✅
