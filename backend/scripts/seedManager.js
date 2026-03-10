#!/usr/bin/env node

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import Admin from '../models/Admin.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import TuitionBooking from '../models/TuitionBooking.js';
import Message from '../models/Message.js';
import InviteCode from '../models/InviteCode.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// CLI Arguments
const args = process.argv.slice(2);
const command = args[0];

// Load configuration
let config = {
  clearExisting: false,
  features: {
    admin: true,
    users: true,
    jobs: true,
    applications: true,
    tuitions: true,
    messages: true,
    inviteCodes: true
  }
};

try {
  const configPath = path.join(__dirname, 'seedConfig.json');
  if (fs.existsSync(configPath)) {
    const configFile = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configFile);
  }
} catch (error) {
  console.log('⚠️  Using default configuration');
}

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Database statistics
const getStats = async () => {
  const stats = {
    users: await User.countDocuments(),
    admins: await Admin.countDocuments(),
    jobs: await Job.countDocuments(),
    applications: await Application.countDocuments(),
    tuitions: await TuitionBooking.countDocuments(),
    messages: await Message.countDocuments(),
    inviteCodes: await InviteCode.countDocuments()
  };
  
  const usersByRole = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } }
  ]);
  
  stats.usersByRole = usersByRole.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});
  
  return stats;
};

// Display statistics
const displayStats = async () => {
  console.log('\n📊 Database Statistics\n');
  const stats = await getStats();
  
  console.log('Total Documents:');
  console.log(`  Users: ${stats.users}`);
  console.log(`  Admins: ${stats.admins}`);
  console.log(`  Jobs: ${stats.jobs}`);
  console.log(`  Applications: ${stats.applications}`);
  console.log(`  Tuition Bookings: ${stats.tuitions}`);
  console.log(`  Messages: ${stats.messages}`);
  console.log(`  Invite Codes: ${stats.inviteCodes}`);
  
  if (stats.usersByRole) {
    console.log('\nUsers by Role:');
    Object.entries(stats.usersByRole).forEach(([role, count]) => {
      console.log(`  ${role}: ${count}`);
    });
  }
};

// Clear specific collection
const clearCollection = async (collectionName) => {
  const collections = {
    users: User,
    admins: Admin,
    jobs: Job,
    applications: Application,
    tuitions: TuitionBooking,
    messages: Message,
    inviteCodes: InviteCode
  };
  
  if (collections[collectionName]) {
    await collections[collectionName].deleteMany({});
    console.log(`✅ Cleared ${collectionName}`);
  } else {
    console.log(`❌ Unknown collection: ${collectionName}`);
  }
};

// Clear all collections
const clearAll = async () => {
  console.log('\n🗑️  Clearing all data...');
  
  await User.deleteMany({});
  await Admin.deleteMany({});
  await Job.deleteMany({});
  await Application.deleteMany({});
  await TuitionBooking.deleteMany({});
  await Message.deleteMany({});
  await InviteCode.deleteMany({});
  
  console.log('✅ All data cleared');
};

// Seed specific feature
const seedFeature = async (featureName) => {
  console.log(`\n📋 Seeding ${featureName}...`);
  
  switch (featureName) {
    case 'admin':
      await seedAdmins();
      break;
    case 'users':
      await seedUsers();
      break;
    case 'jobs':
      await seedJobs();
      break;
    case 'applications':
      await seedApplications();
      break;
    case 'tuitions':
      await seedTuitions();
      break;
    case 'messages':
      await seedMessages();
      break;
    case 'inviteCodes':
      await seedInviteCodes();
      break;
    default:
      console.log(`❌ Unknown feature: ${featureName}`);
  }
};

// Seed functions (imported from seedDatabase.js logic)
const seedAdmins = async () => {
  const admins = [
    {
      email: 'admin@gravity.com',
      password: await hashPassword('admin123'),
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true
    }
  ];

  for (const adminData of admins) {
    const existing = await Admin.findOne({ email: adminData.email });
    if (!existing) {
      await Admin.create(adminData);
      console.log(`✅ Created admin: ${adminData.email}`);
    } else {
      console.log(`⏭️  Admin already exists: ${adminData.email}`);
    }
  }
};

const seedUsers = async () => {
  const users = [
    {
      email: 'demo@test.com',
      password: await hashPassword('test123'),
      role: 'jobSeeker',
      fullName: 'Dr. Sarah Johnson',
      isVerified: true,
      bio: 'Experienced Mathematics teacher with 10+ years of teaching experience.',
      contact: '+919876543210',
      city: 'Mumbai',
      state: 'Maharashtra',
      primarySubject: 'Mathematics',
      qualification: 'Ph.D in Mathematics',
      hourlyRate: '₹800/hour',
      availableForHire: true,
      rating: 4.8,
      totalReviews: 45
    },
    {
      email: 'parent@test.com',
      password: await hashPassword('test123'),
      role: 'parent',
      fullName: 'Mr. Amit Patel',
      isVerified: true,
      contact: '+919876543220',
      city: 'Mumbai',
      state: 'Maharashtra',
      childGrade: 'Class 10',
      preferredSubjects: ['Mathematics', 'Physics']
    },
    {
      email: 'school@test.com',
      password: await hashPassword('test123'),
      role: 'recruiter',
      fullName: 'Green Valley High School',
      isVerified: true,
      contact: '+919876543230',
      city: 'Mumbai',
      state: 'Maharashtra',
      institutionType: 'Higher Secondary School',
      boardAffiliation: 'CBSE',
      currentlyHiring: true
    }
  ];

  for (const userData of users) {
    const existing = await User.findOne({ email: userData.email });
    if (!existing) {
      await User.create(userData);
      console.log(`✅ Created user: ${userData.email}`);
    } else {
      console.log(`⏭️  User already exists: ${userData.email}`);
    }
  }
};

const seedJobs = async () => {
  const schools = await User.find({ role: 'recruiter' });
  if (schools.length === 0) {
    console.log('⚠️  No schools found. Run: npm run seed:users first');
    return;
  }

  const jobs = [
    {
      title: 'Mathematics Teacher - Secondary Level',
      description: 'Looking for experienced Mathematics teacher.',
      location: 'Mumbai, Maharashtra',
      jobType: 'Full-time',
      salary: '₹40,000 - ₹60,000/month',
      postedBy: schools[0]._id,
      status: 'active'
    }
  ];

  for (const jobData of jobs) {
    const existing = await Job.findOne({ title: jobData.title });
    if (!existing) {
      await Job.create(jobData);
      console.log(`✅ Created job: ${jobData.title}`);
    } else {
      console.log(`⏭️  Job already exists`);
    }
  }
};

const seedApplications = async () => {
  const teachers = await User.find({ role: 'jobSeeker' });
  const jobs = await Job.find({ status: 'active' });
  
  if (teachers.length === 0 || jobs.length === 0) {
    console.log('⚠️  Need users and jobs first');
    return;
  }

  const app = {
    job: jobs[0]._id,
    applicant: teachers[0]._id,
    status: 'pending',
    coverLetter: 'I am excited to apply for this position.'
  };

  const existing = await Application.findOne({ job: app.job, applicant: app.applicant });
  if (!existing) {
    await Application.create(app);
    console.log(`✅ Created application`);
  } else {
    console.log(`⏭️  Application already exists`);
  }
};

const seedTuitions = async () => {
  const parents = await User.find({ role: 'parent' });
  const teachers = await User.find({ role: 'jobSeeker' });
  
  if (parents.length === 0 || teachers.length === 0) {
    console.log('⚠️  Need parents and teachers first');
    return;
  }

  const tuition = {
    parent: parents[0]._id,
    teacher: teachers[0]._id,
    subject: 'Mathematics',
    grade: 'Class 10',
    mode: 'Online',
    status: 'confirmed',
    scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    duration: 60,
    hourlyRate: 800
  };

  const existing = await TuitionBooking.findOne({ 
    parent: tuition.parent, 
    teacher: tuition.teacher 
  });
  
  if (!existing) {
    await TuitionBooking.create(tuition);
    console.log(`✅ Created tuition booking`);
  } else {
    console.log(`⏭️  Tuition already exists`);
  }
};

const seedMessages = async () => {
  const users = await User.find().limit(2);
  if (users.length < 2) {
    console.log('⚠️  Need at least 2 users');
    return;
  }

  await Message.create({
    sender: users[0]._id,
    receiver: users[1]._id,
    content: 'Hello! Test message.',
    read: false
  });
  
  console.log(`✅ Created message`);
};

const seedInviteCodes = async () => {
  const codes = [
    { code: 'TEACHER2024', role: 'jobSeeker', maxUses: 100 },
    { code: 'PARENT2024', role: 'parent', maxUses: 100 },
    { code: 'SCHOOL2024', role: 'recruiter', maxUses: 50 }
  ];

  for (const codeData of codes) {
    const existing = await InviteCode.findOne({ code: codeData.code });
    if (!existing) {
      await InviteCode.create({
        ...codeData,
        usedCount: 0,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        isActive: true
      });
      console.log(`✅ Created invite code: ${codeData.code}`);
    } else {
      console.log(`⏭️  Code exists: ${codeData.code}`);
    }
  }
};

// Display help
const displayHelp = () => {
  console.log(`
📚 Database Seed Manager

Usage: node seedManager.js [command] [options]

Commands:
  all              Seed all features
  stats            Display database statistics
  clear [feature]  Clear data (all or specific feature)
  seed [feature]   Seed specific feature
  help             Display this help message

Features:
  admin            Admin users
  users            Regular users (teachers, parents, schools)
  jobs             Job postings
  applications     Job applications
  tuitions         Tuition bookings
  messages         Messages
  inviteCodes      Invite codes

Examples:
  node seedManager.js all
  node seedManager.js stats
  node seedManager.js clear all
  node seedManager.js clear users
  node seedManager.js seed users
  node seedManager.js seed jobs

Configuration:
  Edit seedConfig.json to customize seeding behavior
  `);
};

// Main execution
const main = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.DATABASE_URL;
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    switch (command) {
      case 'all':
        if (config.clearExisting) {
          await clearAll();
        }
        for (const [feature, enabled] of Object.entries(config.features)) {
          if (enabled) {
            await seedFeature(feature);
          }
        }
        await displayStats();
        console.log('\n🎉 Seeding completed!');
        break;

      case 'stats':
        await displayStats();
        break;

      case 'clear':
        const clearTarget = args[1] || 'all';
        if (clearTarget === 'all') {
          await clearAll();
        } else {
          await clearCollection(clearTarget);
        }
        await displayStats();
        break;

      case 'seed':
        const seedTarget = args[1];
        if (!seedTarget) {
          console.log('❌ Please specify a feature to seed');
          displayHelp();
        } else {
          await seedFeature(seedTarget);
          await displayStats();
        }
        break;

      case 'help':
      default:
        displayHelp();
        break;
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

main();
