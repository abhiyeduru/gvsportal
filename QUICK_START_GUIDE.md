# Gravity Job Portal - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- MongoDB installed and running
- Git installed

---

## Step 1: Clone and Install (2 minutes)

```bash
# Clone repository
git clone <repository-url>
cd gravity-job-portal

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## Step 2: Configure Environment (1 minute)

### Backend `.env`
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL=mongodb://localhost:27017/gravity_test
JWT_ACCESS_SECRET=your_secret_key_here_change_in_production
JWT_REFRESH_SECRET=your_refresh_secret_here_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
PORT=8000
```

### Frontend `.env`
```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:8000
```

---

## Step 3: Seed Test Data (1 minute)

```bash
cd backend

# Create test users
npm run seed:test

# Create admin account
npm run create:admin
```

**Test Credentials Created**:
- School: school@test.com / test123
- Teacher: demo@test.com / test123
- Parent: parent@test.com / test123
- Admin: admin@gravity.com / admin123

---

## Step 4: Start Servers (1 minute)

### Terminal 1 - Backend
```bash
cd backend
npm start
```
✅ Backend running on http://localhost:8000

### Terminal 2 - Frontend
```bash
cd client
npm run dev
```
✅ Frontend running on http://localhost:3000

---

## Step 5: Test the System

### Quick Test Flow

1. **Open Browser**: http://localhost:3000

2. **Test School Flow**:
   - Login: school@test.com / test123
   - Post a job
   - View in Job Posts

3. **Test Teacher Flow**:
   - Logout, Login: demo@test.com / test123
   - View jobs in Find Jobs
   - Apply for the job
   - Check Applications

4. **Test Parent Flow**:
   - Logout, Login: parent@test.com / test123
   - Find Tutors
   - Request tuition

5. **Test Admin**:
   - Go to: http://localhost:3000/admin/login
   - Login: admin@gravity.com / admin123
   - View dashboard

---

## 📁 Project Structure

```
gravity-job-portal/
├── backend/
│   ├── controllers/        # Business logic
│   │   ├── auth.controller.js
│   │   ├── application.controller.js
│   │   ├── tuition.controller.js    # NEW
│   │   ├── message.controller.js    # NEW
│   │   └── user/
│   ├── models/            # Database schemas
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   ├── TuitionBooking.js        # NEW
│   │   └── Message.js               # NEW
│   ├── routes/            # API endpoints
│   │   ├── auth.routes.js
│   │   ├── job.routes.js
│   │   ├── application.routes.js
│   │   ├── tuition.routes.js        # NEW
│   │   └── message.routes.js        # NEW
│   ├── middleware/        # Auth, validation
│   ├── utils/             # Helper functions
│   └── index.js           # Server entry
│
├── client/
│   ├── src/
│   │   ├── pages/         # Main pages
│   │   │   ├── Login.jsx
│   │   │   ├── TeacherDashboard.jsx
│   │   │   ├── SchoolDashboard.jsx
│   │   │   └── admin/
│   │   ├── components/    # Reusable components
│   │   │   └── Dashboard/
│   │   │       ├── TeacherJobsPanel.jsx
│   │   │       ├── SchoolDashboard/
│   │   │       └── ParentDashboard/
│   │   ├── services/      # API calls
│   │   │   ├── authServices.js
│   │   │   ├── JobServices.js
│   │   │   ├── applicationServices.js
│   │   │   ├── tuitionServices.js   # NEW
│   │   │   └── messageServices.js   # NEW
│   │   ├── hooks/         # Custom hooks
│   │   │   └── useAuth.jsx
│   │   └── App.jsx        # Routes
│
└── Documentation/
    ├── COMPLETE_SYSTEM_OVERVIEW.md
    ├── SYSTEM_FIXES_APPLIED.md
    ├── TESTING_GUIDE.md
    ├── TROUBLESHOOTING.md
    └── QUICK_START_GUIDE.md (this file)
```

---

## 🔑 Key API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
```

### Jobs
```
GET    /api/jobs/get-all
POST   /api/jobs/create
GET    /api/jobs/:jobId/job-data
```

### Applications
```
POST   /api/applications/jobs/:jobId/apply
GET    /api/applications/school
GET    /api/applications/teacher
```

### Tuition (NEW)
```
GET    /api/tuition/tutors
POST   /api/tuition/request
GET    /api/tuition/teacher/requests
```

### Messages (NEW)
```
POST   /api/messages/send
GET    /api/messages/conversations
GET    /api/messages/conversation/:userId
```

---

## 🎯 Common Tasks

### Add New User
```bash
# Via API
POST http://localhost:8000/api/auth/register
{
  "email": "newuser@test.com",
  "password": "password123",
  "fullName": "New User",
  "role": "jobSeeker"
}
```

### Check Database
```bash
# MongoDB Shell
mongosh
use gravity_test
db.users.find().pretty()
db.jobs.find().pretty()
db.applications.find().pretty()
```

### View Logs
```bash
# Backend logs
cd backend
npm start
# Watch terminal output

# Frontend logs
# Open browser DevTools → Console
```

### Reset Database
```bash
# Drop database
mongosh
use gravity_test
db.dropDatabase()

# Re-seed
cd backend
npm run seed:test
npm run create:admin
```

---

## 🐛 Quick Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
lsof -i :8000
# Kill process if needed
kill -9 <PID>

# Check MongoDB is running
mongosh
# If not, start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Frontend won't start
```bash
# Check if port 3000 is in use
lsof -i :3000
# Kill process if needed
kill -9 <PID>

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Login not working
```bash
# Clear browser cache
# Use incognito mode
# Check backend logs for errors
# Verify test users exist:
cd backend
npm run check:user
```

### Jobs not showing
```bash
# Check if jobs exist in database
cd backend
npm run check:jobs

# Check API directly
curl http://localhost:8000/api/jobs/get-all

# Clear browser cache
```

---

## 📚 Documentation Links

- **Complete Overview**: `COMPLETE_SYSTEM_OVERVIEW.md`
- **All Fixes Applied**: `SYSTEM_FIXES_APPLIED.md`
- **Testing Guide**: `TESTING_GUIDE.md`
- **Troubleshooting**: `TROUBLESHOOTING.md`
- **API Docs**: http://localhost:8000/api-docs

---

## 🎓 Learning Resources

### Backend
- Express.js: https://expressjs.com/
- Mongoose: https://mongoosejs.com/
- JWT: https://jwt.io/

### Frontend
- React: https://react.dev/
- React Router: https://reactrouter.com/
- TanStack Query: https://tanstack.com/query/
- Tailwind CSS: https://tailwindcss.com/

---

## 💡 Pro Tips

1. **Use API Docs**: Visit http://localhost:8000/api-docs for interactive API testing

2. **Check Network Tab**: Open browser DevTools → Network to see all API calls

3. **Use React Query DevTools**: Already configured, shows all queries and cache

4. **MongoDB Compass**: Use GUI tool to view database visually

5. **Postman Collection**: Import API endpoints for easy testing

6. **Hot Reload**: Both frontend and backend support hot reload - changes reflect immediately

7. **Error Messages**: Check both browser console and backend terminal for errors

8. **Test Users**: Use provided test credentials - don't create new users unless needed

---

## 🚀 Next Steps

### For Frontend Developers
1. Connect Parent FindTeachers component to `/api/tuition/tutors`
2. Connect TuitionRequests component to `/api/tuition/my-requests`
3. Implement messaging UI using `/api/messages/*` endpoints
4. Add real-time updates (optional: Socket.io)

### For Backend Developers
1. Add email notifications
2. Implement file upload for resumes
3. Add rate limiting
4. Set up logging (Winston)
5. Add unit tests

### For DevOps
1. Set up CI/CD pipeline
2. Configure production environment
3. Set up monitoring (PM2, New Relic)
4. Configure backups
5. Set up SSL certificates

---

## 📞 Support

### Issues?
1. Check `TROUBLESHOOTING.md`
2. Review backend logs
3. Check browser console
4. Verify environment variables
5. Ensure MongoDB is running

### Need Help?
- Create GitHub issue
- Check documentation
- Review API docs
- Test with Postman

---

## ✅ Checklist

Before starting development:
- [ ] Node.js 16+ installed
- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Environment variables configured
- [ ] Test users seeded
- [ ] Both servers running
- [ ] Can login successfully
- [ ] Can view jobs
- [ ] Can apply for jobs

---

**Happy Coding! 🎉**

---

**Last Updated**: Current Session
**Version**: 1.0.0
