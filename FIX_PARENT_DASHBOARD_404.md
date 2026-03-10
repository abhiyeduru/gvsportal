# Fix Parent Dashboard 404 Errors

## Problem
The parent dashboard is showing 404 errors for `/api/tuition/dashboard` and `/api/tuition/tutors` endpoints.

## Root Cause
The backend server needs to be restarted to load the tuition routes that were recently added.

## Solution

### Step 1: Restart Backend Server

1. **Stop the current backend server:**
   - If running in terminal: Press `Ctrl+C`
   - Or kill the process:
     ```bash
     lsof -ti:8000 | xargs kill -9
     ```

2. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Verify the server is running:**
   ```bash
   curl http://localhost:8000/
   ```
   
   You should see:
   ```json
   {
     "status": "Server is running!",
     "allowedURL": ["http://localhost:3000", "http://localhost:3001"]
   }
   ```

### Step 2: Test Tuition Endpoints

Test if the tuition routes are now accessible:

```bash
# This should return 401 (unauthorized) instead of 404
curl http://localhost:8000/api/tuition/tutors
```

Expected response (401 Unauthorized):
```json
{
  "message": "Not authorized, no token",
  "status": 401
}
```

If you get 404, the routes are still not loaded. If you get 401, the routes are working!

### Step 3: Create a Parent User (If Needed)

If you don't have a parent user, create one:

```bash
cd backend
node scripts/seedTestUsers.js
```

This will create:
- **Email:** parent@test.com
- **Password:** test123
- **Role:** parent

### Step 4: Login as Parent

1. Go to the login page: http://localhost:5173/login
2. Login with:
   - Email: parent@test.com
   - Password: test123
3. You should be redirected to the parent dashboard

### Step 5: Verify Parent Dashboard Works

Once logged in as a parent:
1. Navigate to "Find Teachers" page
2. You should see teachers with `availableForHire: true`
3. No 404 errors should appear in the console

---

## Troubleshooting

### Issue: Still getting 404 errors after restart

**Solution:** Check if the tuition routes are properly imported in `backend/index.js`

```bash
grep "tuitionRouter" backend/index.js
```

You should see:
```javascript
import tuitionRouter from "./routes/tuition.routes.js";
app.use("/api/tuition", tuitionRouter);
```

### Issue: Getting 401 Unauthorized

**Solution:** This is expected! It means the routes are working but you need to be logged in.

1. Make sure you're logged in as a parent user
2. Check that the token is being sent with requests
3. Open browser DevTools → Application → Cookies
4. Verify there's a `token` cookie for localhost

### Issue: No teachers showing up

**Solution:** Create a teacher with `availableForHire: true`

1. Login as a teacher (or create one)
2. Go to Profile page
3. Toggle "Available for Hire" to ON
4. Fill in all profile details
5. Click "Save Changes"
6. Logout and login as parent
7. Go to "Find Teachers" - the teacher should now appear

### Issue: Backend won't start

**Check for errors:**
```bash
cd backend
npm run dev
```

Common issues:
- MongoDB not running: `brew services start mongodb-community` (Mac)
- Port 8000 already in use: Change PORT in `.env` file
- Missing dependencies: `npm install`

---

## Quick Test Commands

### Test Backend Health
```bash
curl http://localhost:8000/
```

### Test Tuition Routes (should return 401, not 404)
```bash
curl http://localhost:8000/api/tuition/tutors
curl http://localhost:8000/api/tuition/dashboard
```

### Check Backend Logs
Look for these lines when backend starts:
```
Server is running on http://localhost:8000
MongoDB connected successfully
```

### Check Available Routes
The backend should have these tuition routes:
- GET `/api/tuition/dashboard` - Parent dashboard data
- GET `/api/tuition/tutors` - Get available tutors
- GET `/api/tuition/tutors/:tutorId` - Get tutor details
- POST `/api/tuition/request` - Create tuition request
- GET `/api/tuition/my-requests` - Get parent's requests
- PATCH `/api/tuition/request/:requestId/cancel` - Cancel request
- GET `/api/tuition/teacher/requests` - Get teacher's requests
- PATCH `/api/tuition/teacher/request/:requestId/status` - Update request status

---

## Expected Behavior After Fix

### Parent Dashboard
- ✅ No 404 errors in console
- ✅ Dashboard loads with statistics
- ✅ Recommended teachers display
- ✅ Recent requests display (if any)

### Find Teachers Page
- ✅ Teachers with `availableForHire: true` display
- ✅ Search and filter work
- ✅ Teacher cards show all information
- ✅ "View Profile" and "Book Demo" buttons work

### Teacher Profile
- ✅ When teacher sets "Available for Hire" to ON
- ✅ Teacher appears in parent's "Find Teachers" page
- ✅ When set to OFF, teacher is hidden from search

---

## Summary

The issue is that the backend server needs to be restarted to load the tuition routes. After restarting:

1. ✅ Backend runs on port 8000
2. ✅ Tuition routes are accessible
3. ✅ Parent can login and view dashboard
4. ✅ Parent can find and view teachers
5. ✅ No 404 errors

**Next Step:** Restart the backend server and test!
