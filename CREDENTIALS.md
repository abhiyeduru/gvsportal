# GravIIty Platform - Demo Credentials

## Super Admin Account
**Access URL:** http://localhost:3000/admin/login

**Credentials:**
- Email: `admin@gravity.com`
- Password: `admin123`

**Permissions:**
- Can Manage Users: ✓
- Can Manage Jobs: ✓
- Can Manage Payments: ✓
- Can Manage Settings: ✓
- Can View Analytics: ✓

**Role:** Super Admin

---

## Test User Accounts

### School Account
**Access URL:** http://localhost:3000/login

**Credentials:**
- Email: `school@test.com`
- Password: `test123`

**Role:** Recruiter (School)

**Capabilities:**
- Post job openings
- View and manage applications
- Search for teachers
- Schedule interviews
- View analytics

---

### Teacher Account
**Access URL:** http://localhost:3000/login

**Credentials:**
- Email: `demo@test.com`
- Password: `test123`

**Role:** Job Seeker (Teacher)

**Capabilities:**
- Browse job listings
- Apply for jobs
- View application status
- Update profile
- View applied jobs

---

### Parent Account
**Access URL:** http://localhost:3000/login

**Credentials:**
- Email: `parent@test.com`
- Password: `test123`

**Role:** Parent

**Capabilities:**
- Find teachers
- Request tuitions
- View recommended teachers
- Manage demo classes
- Track payments

---

## Database Information

**Database Name:** `gravity_test`

**Collections:**
- admins (Super Admin and other admins)
- users (Teachers, Schools, Parents)
- jobs (Job postings)
- applications (Job applications)
- invitecodes (Invitation codes)
- companies (School/Company profiles)

---

## API Endpoints

### Admin API
- Base URL: `http://localhost:8000/api/admin`
- Login: `POST /api/admin/login`
- Get Current Admin: `GET /api/admin/me`
- Dashboard Stats: `GET /api/admin/dashboard/stats`
- User Management: `GET /api/admin/users`

### User API
- Base URL: `http://localhost:8000/api`
- Login: `POST /api/auth/login`
- Register: `POST /api/auth/register`
- Jobs: `GET /api/jobs/get-all`
- Applications: `POST /api/applications/jobs/:jobId/apply`

---

## How to Create Additional Admins

Run the following command in the backend directory:

```bash
npm run create:admin
```

This will create the super admin account if it doesn't exist.

To check existing admins:

```bash
node scripts/checkAdmin.js
```

---

## Notes

1. **First Time Setup:** The super admin account has been created and is ready to use.
2. **Password Security:** Please change the default password after first login.
3. **Test Data:** Test user accounts are pre-seeded for testing purposes.
4. **Database:** All data is stored in MongoDB database `gravity_test`.

---

## Troubleshooting

If you can't login:

1. **Check if backend is running:** `http://localhost:8000`
2. **Check if MongoDB is connected:** Look for "MongoDB connected" in backend logs
3. **Verify admin exists:** Run `node scripts/checkAdmin.js` in backend folder
4. **Check browser console:** Look for any API errors
5. **Clear cookies:** Sometimes old cookies can cause issues

---

**Last Updated:** March 9, 2026
