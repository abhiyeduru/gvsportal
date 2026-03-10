# Clear Cookies and Login Again

## Issue
You're getting 404 errors because you have an old/invalid authentication token in your browser cookies.

## Solution

### Step 1: Clear Browser Cookies

**Option A: Clear All Cookies (Recommended)**
1. Open browser DevTools (F12 or Right-click → Inspect)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Click "Cookies" in the left sidebar
4. Click "http://localhost:5173"
5. Right-click → "Clear" or delete all cookies
6. Refresh the page

**Option B: Clear Specific Cookie**
1. Open browser DevTools (F12)
2. Go to "Application" → "Cookies" → "http://localhost:5173"
3. Find and delete the "token" cookie
4. Refresh the page

**Option C: Use Incognito/Private Window**
1. Open a new Incognito/Private window
2. Go to http://localhost:5173/login
3. Login with credentials

### Step 2: Login Again

1. Go to: http://localhost:5173/login
2. Login with one of these accounts:

**Parent Account:**
- Email: parent@test.com
- Password: test123

**Teacher Account:**
- Email: demo@test.com
- Password: test123

**School Account:**
- Email: school@test.com
- Password: test123

### Step 3: Verify It Works

After logging in:
- ✅ No 404 errors in console
- ✅ Dashboard loads correctly
- ✅ If parent: "Find Teachers" shows Demo Teacher
- ✅ If teacher: Profile page works

---

## Why This Happened

The backend was restarted multiple times, and the user IDs in the database changed when we ran `seedTestUsers.js`. Your browser still had the old authentication token with an invalid user ID, causing the errors.

---

## Quick Commands

### Check if backend is running:
```bash
curl http://localhost:8000/
```

### Test tuition endpoints:
```bash
curl http://localhost:8000/api/tuition/tutors
# Should return: 401 Unauthorized (this is correct!)
```

### Recreate test users:
```bash
cd backend
node scripts/seedTestUsers.js
```

### Setup demo teacher profile:
```bash
cd backend
node scripts/setupTeacherProfile.js
```

---

## Current Status

✅ Backend running on port 8000
✅ MongoDB connected
✅ All routes loaded correctly
✅ Tuition endpoints working (returning 401 = needs auth)
✅ Test users created
✅ Demo teacher configured

**Next step:** Clear cookies and login again!
