# Database Seeding Guide 🌱

## Overview

Automated database seeding system for initializing and managing test data for all features in the Gravity Job Portal application.

## Features

- ✅ Automated seeding for all database collections
- ✅ Configurable seeding options via JSON config
- ✅ CLI tool for granular control
- ✅ Statistics and monitoring
- ✅ Safe operations with duplicate checking
- ✅ Clear and reset functionality
- ✅ NPM scripts for easy access

---

## Quick Start

### Seed Everything
```bash
cd backend
npm run seed
```

This will seed:
- Admin users
- Teachers, Parents, Schools
- Job postings
- Applications
- Tuition bookings
- Messages
- Invite codes

### View Database Statistics
```bash
npm run seed:stats
```

### Clear All Data
```bash
npm run seed:clear
```

---

## NPM Scripts

### Main Commands

| Command | Description |
|---------|-------------|
| `npm run seed` | Seed all features with default configuration |
| `npm run seed:all` | Seed all features using seed manager |
| `npm run seed:stats` | Display database statistics |
| `npm run seed:clear` | Clear all data from database |

### Granular Seeding

| Command | Description |
|---------|-------------|
| `npm run seed:admin` | Seed only admin users |
| `npm run seed:users` | Seed only regular users (teachers, parents, schools) |
| `npm run seed:jobs` | Seed only job postings |

---

## CLI Tool Usage

The `seedManager.js` provides a powerful CLI for database management:

### Basic Syntax
```bash
node scripts/seedManager.js [command] [options]
```

### Commands

#### 1. Seed All Features
```bash
node scripts/seedManager.js all
```

#### 2. View Statistics
```bash
node scripts/seedManager.js stats
```

Output example:
```
📊 Database Statistics

Total Documents:
  Users: 7
  Admins: 1
  Jobs: 3
  Applications: 2
  Tuition Bookings: 2
  Messages: 2
  Invite Codes: 3

Users by Role:
  jobSeeker: 3
  parent: 2
  recruiter: 2
```

#### 3. Clear Data

Clear all data:
```bash
node scripts/seedManager.js clear all
```

Clear specific collection:
```bash
node scripts/seedManager.js clear users
node scripts/seedManager.js clear jobs
node scripts/seedManager.js clear messages
```

#### 4. Seed Specific Feature

```bash
node scripts/seedManager.js seed admin
node scripts/seedManager.js seed users
node scripts/seedManager.js seed jobs
node scripts/seedManager.js seed applications
node scripts/seedManager.js seed tuitions
node scripts/seedManager.js seed messages
node scripts/seedManager.js seed inviteCodes
```

#### 5. Display Help
```bash
node scripts/seedManager.js help
```

---

## Configuration

### Config File: `backend/scripts/seedConfig.json`

```json
{
  "clearExisting": false,
  "features": {
    "admin": true,
    "users": true,
    "jobs": true,
    "applications": true,
    "tuitions": true,
    "messages": true,
    "inviteCodes": true
  },
  "counts": {
    "teachers": 3,
    "parents": 2,
    "schools": 2,
    "jobs": 3,
    "applications": 2,
    "tuitions": 2,
    "messages": 2
  },
  "testCredentials": {
    "adminPassword": "admin123",
    "userPassword": "test123"
  }
}
```

### Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `clearExisting` | boolean | Clear all data before seeding |
| `features` | object | Enable/disable specific features |
| `counts` | object | Number of records to create |
| `testCredentials` | object | Default passwords for test accounts |

### Customizing Configuration

1. Edit `backend/scripts/seedConfig.json`
2. Set `clearExisting: true` to reset database
3. Enable/disable features as needed
4. Adjust counts for each entity type
5. Run `npm run seed:all`

---

## Seeded Data

### Admin Users

| Email | Password | Role |
|-------|----------|------|
| admin@gravity.com | admin123 | super_admin |

### Teachers

| Email | Password | Subject | City |
|-------|----------|---------|------|
| demo@test.com | test123 | Mathematics | Mumbai |
| teacher2@test.com | test123 | Physics | Delhi |
| teacher3@test.com | test123 | English | Bangalore |

### Parents

| Email | Password | Child Grade | City |
|-------|----------|-------------|------|
| parent@test.com | test123 | Class 10 | Mumbai |
| parent2@test.com | test123 | Class 8 | Bangalore |

### Schools

| Email | Password | Name | City |
|-------|----------|------|------|
| school@test.com | test123 | Green Valley High School | Mumbai |
| school2@test.com | test123 | Delhi Public School | Delhi |

### Invite Codes

| Code | Role | Max Uses |
|------|------|----------|
| TEACHER2024 | jobSeeker | 100 |
| PARENT2024 | parent | 100 |
| SCHOOL2024 | recruiter | 50 |

---

## Data Relationships

The seeding system automatically creates relationships:

```
Schools → Jobs → Applications ← Teachers
Parents → Tuition Bookings ← Teachers
Users ↔ Messages ↔ Users
```

### Example Flow:
1. Seeds schools (recruiters)
2. Seeds teachers (jobSeekers)
3. Seeds jobs posted by schools
4. Seeds applications from teachers to jobs
5. Seeds parents
6. Seeds tuition bookings between parents and teachers
7. Seeds messages between users

---

## Advanced Usage

### Custom Seeding Script

Create your own seeding script:

```javascript
import mongoose from 'mongoose';
import { User } from '../models/User.js';

const seedCustomData = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  
  // Your custom seeding logic
  await User.create({
    email: 'custom@test.com',
    password: 'hashed_password',
    role: 'jobSeeker',
    // ... other fields
  });
  
  console.log('✅ Custom data seeded');
  process.exit(0);
};

seedCustomData();
```

### Conditional Seeding

Seed only if collection is empty:

```javascript
const users = await User.countDocuments();
if (users === 0) {
  await seedUsers();
}
```

### Incremental Seeding

Add more data without clearing:

```javascript
// Set in seedConfig.json
{
  "clearExisting": false,
  "features": {
    "users": true,
    "jobs": false  // Don't seed jobs again
  }
}
```

---

## Best Practices

### Development Environment

1. **Initial Setup**
   ```bash
   npm run seed:all
   ```

2. **Add More Users**
   ```bash
   npm run seed:users
   ```

3. **Reset Everything**
   ```bash
   npm run seed:clear
   npm run seed:all
   ```

### Testing Environment

1. **Clean State**
   ```bash
   npm run seed:clear
   npm run seed
   ```

2. **Verify Data**
   ```bash
   npm run seed:stats
   ```

### Production Environment

⚠️ **WARNING**: Never run seeding scripts in production!

- Seeding is for development and testing only
- Use migrations for production data changes
- Always backup before any database operations

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
```bash
# Check .env file has DATABASE_URL
cat backend/.env | grep DATABASE_URL

# Ensure MongoDB is running
# For local: mongod
# For Docker: docker-compose up -d mongodb
```

### Issue: "Duplicate key error"

**Solution:**
```bash
# Clear existing data first
npm run seed:clear
npm run seed:all
```

### Issue: "No schools found for job seeding"

**Solution:**
```bash
# Seed users first (includes schools)
npm run seed:users
# Then seed jobs
node scripts/seedManager.js seed jobs
```

### Issue: "Permission denied"

**Solution:**
```bash
# Make script executable
chmod +x backend/scripts/seedManager.js
```

---

## Monitoring and Verification

### Check Seeded Data

```bash
# View statistics
npm run seed:stats

# Check specific user
npm run check:user demo@test.com

# Check admin
npm run check:admin

# Check jobs
npm run check:jobs
```

### MongoDB Shell Verification

```bash
# Connect to MongoDB
mongosh

# Use database
use gravity_test

# Count documents
db.users.countDocuments()
db.jobs.countDocuments()

# View sample data
db.users.findOne({ email: 'demo@test.com' })
```

---

## Extending the System

### Adding New Features

1. **Create Model** (if not exists)
   ```javascript
   // backend/models/NewFeature.js
   const newFeatureSchema = new Schema({
     // fields
   });
   export const NewFeature = model('NewFeature', newFeatureSchema);
   ```

2. **Add Seed Function**
   ```javascript
   // In seedDatabase.js or seedManager.js
   const seedNewFeature = async () => {
     const data = [/* your data */];
     for (const item of data) {
       await NewFeature.create(item);
     }
   };
   ```

3. **Update Configuration**
   ```json
   // seedConfig.json
   {
     "features": {
       "newFeature": true
     }
   }
   ```

4. **Add NPM Script**
   ```json
   // package.json
   {
     "scripts": {
       "seed:newfeature": "node scripts/seedManager.js seed newFeature"
     }
   }
   ```

### Custom Data Templates

Create data templates for different scenarios:

```javascript
// backend/scripts/templates/teacherTemplate.js
export const teacherTemplate = {
  basic: {
    role: 'jobSeeker',
    isVerified: true,
    availableForHire: true
  },
  experienced: {
    ...basic,
    rating: 4.8,
    totalReviews: 50,
    studentsTaught: 100
  }
};
```

---

## Scripts Reference

### File Structure

```
backend/scripts/
├── seedDatabase.js       # Main seeding script
├── seedManager.js        # CLI management tool
├── seedConfig.json       # Configuration file
├── setupTeacherProfile.js
├── setupSchoolProfile.js
├── seedTestUsers.js
├── createAdmin.js
├── checkUser.js
├── checkAdmin.js
└── checkJobs.js
```

### Script Purposes

| Script | Purpose |
|--------|---------|
| `seedDatabase.js` | Complete database seeding |
| `seedManager.js` | CLI tool for granular control |
| `seedConfig.json` | Configuration options |
| `setupTeacherProfile.js` | Setup specific teacher |
| `setupSchoolProfile.js` | Setup specific school |
| `seedTestUsers.js` | Legacy test user seeding |
| `createAdmin.js` | Create admin user |
| `checkUser.js` | Verify user data |
| `checkAdmin.js` | Verify admin data |
| `checkJobs.js` | Verify job data |

---

## FAQ

### Q: How do I seed data for a new feature?

A: Add the seeding logic to `seedDatabase.js` or `seedManager.js`, update `seedConfig.json`, and run `npm run seed:all`.

### Q: Can I seed production data?

A: No! Seeding is for development/testing only. Use proper migrations for production.

### Q: How do I reset the database?

A: Run `npm run seed:clear` then `npm run seed:all`.

### Q: Can I customize the seeded data?

A: Yes! Edit the data arrays in `seedDatabase.js` or create custom templates.

### Q: How do I seed only specific collections?

A: Use `node scripts/seedManager.js seed [feature]` for granular control.

### Q: What if seeding fails midway?

A: The system checks for existing data before creating. You can safely re-run the seed command.

---

## Summary

The automated database seeding system provides:

✅ Quick setup for development
✅ Consistent test data
✅ Easy database reset
✅ Granular control over seeding
✅ Statistics and monitoring
✅ Extensible architecture
✅ Safe operations with duplicate checking

Use `npm run seed` to get started, and `npm run seed:stats` to monitor your database!

---

**Last Updated:** March 2026
**Version:** 1.0.0
