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

dotenv.config();

// Seeding configuration
const SEED_CONFIG = {
  clearExisting: false, // Set to true to clear existing data
  seedUsers: true,
  seedJobs: true,
  seedApplications: true,
  seedTuitions: true,
  seedMessages: true,
  seedInviteCodes: true,
  seedAdmin: true
};

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Seed Admin Users
const seedAdmins = async () => {
  console.log('\n📋 Seeding Admin Users...');
  
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

// Seed Users (Teachers, Parents, Schools)
const seedUsers = async () => {
  console.log('\n📋 Seeding Users...');
  
  const users = [
    // Teachers
    {
      email: 'demo@test.com',
      password: await hashPassword('test123'),
      role: 'jobSeeker',
      fullName: 'Dr. Sarah Johnson',
      isVerified: true,
      bio: 'Experienced Mathematics teacher with 10+ years of teaching experience. Specialized in CBSE and ICSE curriculum.',
      contact: '+919876543210',
      city: 'Mumbai',
      state: 'Maharashtra',
      primarySubject: 'Mathematics',
      secondarySubjects: ['Physics', 'Computer Science'],
      qualification: 'Ph.D in Mathematics',
      hourlyRate: '₹800/hour',
      availableForHire: true,
      rating: 4.8,
      totalReviews: 45,
      studentsTaught: 120,
      successRate: 95,
      classesCompleted: 450,
      specializations: ['CBSE', 'ICSE', 'IIT-JEE Preparation'],
      languages: ['English', 'Hindi', 'Marathi'],
      teachingMode: 'Hybrid',
      achievements: ['Best Teacher Award 2023', 'Published 5 research papers'],
      profileLinks: {
        linkedIn: 'linkedin.com/in/sarahjohnson',
        youtube: 'youtube.com/@mathwithsarah',
        website: 'www.sarahjohnsonmath.com'
      }
    },
    {
      email: 'teacher2@test.com',
      password: await hashPassword('test123'),
      role: 'jobSeeker',
      fullName: 'Prof. Rajesh Kumar',
      isVerified: true,
      bio: 'Physics expert with passion for making complex concepts simple. IIT graduate with 8 years teaching experience.',
      contact: '+919876543211',
      city: 'Delhi',
      state: 'Delhi',
      primarySubject: 'Physics',
      secondarySubjects: ['Chemistry', 'Mathematics'],
      qualification: 'M.Sc Physics, IIT Delhi',
      hourlyRate: '₹1000/hour',
      availableForHire: true,
      rating: 4.9,
      totalReviews: 38,
      studentsTaught: 95,
      successRate: 97,
      classesCompleted: 380,
      specializations: ['IIT-JEE', 'NEET', 'Board Exams'],
      languages: ['English', 'Hindi'],
      teachingMode: 'Online'
    },
    {
      email: 'teacher3@test.com',
      password: await hashPassword('test123'),
      role: 'jobSeeker',
      fullName: 'Ms. Priya Sharma',
      isVerified: true,
      bio: 'English language expert specializing in communication skills and literature. Cambridge certified.',
      contact: '+919876543212',
      city: 'Bangalore',
      state: 'Karnataka',
      primarySubject: 'English',
      secondarySubjects: ['Literature', 'Communication Skills'],
      qualification: 'MA English Literature, Cambridge CELTA',
      hourlyRate: '₹700/hour',
      availableForHire: true,
      rating: 4.7,
      totalReviews: 52,
      studentsTaught: 140,
      successRate: 93,
      classesCompleted: 520,
      specializations: ['IELTS', 'TOEFL', 'Spoken English'],
      languages: ['English', 'Hindi', 'Kannada'],
      teachingMode: 'Hybrid'
    },
    
    // Parents
    {
      email: 'parent@test.com',
      password: await hashPassword('test123'),
      role: 'parent',
      fullName: 'Mr. Amit Patel',
      isVerified: true,
      contact: '+919876543220',
      address: '123 Green Park, Sector 15',
      city: 'Mumbai',
      state: 'Maharashtra',
      childGrade: 'Class 10',
      preferredSubjects: ['Mathematics', 'Physics', 'Chemistry']
    },
    {
      email: 'parent2@test.com',
      password: await hashPassword('test123'),
      role: 'parent',
      fullName: 'Mrs. Sunita Reddy',
      isVerified: true,
      contact: '+919876543221',
      address: '456 Lake View, Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      childGrade: 'Class 8',
      preferredSubjects: ['English', 'Science', 'Mathematics']
    },
    
    // Schools
    {
      email: 'school@test.com',
      password: await hashPassword('test123'),
      role: 'recruiter',
      fullName: 'Green Valley High School',
      isVerified: true,
      contact: '+919876543230',
      address: '123 Education Street, Knowledge Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      bio: 'Leading educational institution providing quality education with modern facilities and experienced faculty.',
      institutionType: 'Higher Secondary School',
      boardAffiliation: 'CBSE',
      yearEstablished: '1995',
      institutionSize: '800-1200 students',
      hrContactPerson: 'David Johnson',
      whatsapp: '+919876543230',
      facilities: ['Smart Classrooms', 'Digital Library', 'Science Laboratory', 'Computer Lab', 'Sports Facilities', 'Auditorium'],
      subjectsHiring: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'],
      requiredQualifications: 'B.Ed, M.Sc, Ph.D',
      minimumExperience: '2-5 years',
      currentlyHiring: true,
      profileLinks: {
        website: 'www.greenvalleyschool.com',
        linkedIn: 'linkedin.com/company/greenvalley'
      }
    },
    {
      email: 'school2@test.com',
      password: await hashPassword('test123'),
      role: 'recruiter',
      fullName: 'Delhi Public School',
      isVerified: true,
      contact: '+919876543231',
      address: '789 School Road, Education Hub',
      city: 'Delhi',
      state: 'Delhi',
      bio: 'Premier institution with 30+ years of excellence in education. Focus on holistic development.',
      institutionType: 'Higher Secondary School',
      boardAffiliation: 'CBSE',
      yearEstablished: '1990',
      institutionSize: '1200-1500 students',
      hrContactPerson: 'Ms. Anjali Verma',
      whatsapp: '+919876543231',
      facilities: ['Smart Classrooms', 'Digital Library', 'Science Laboratory', 'Sports Complex', 'Swimming Pool'],
      subjectsHiring: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Social Studies'],
      requiredQualifications: 'B.Ed, M.A, M.Sc',
      minimumExperience: '3-7 years',
      currentlyHiring: true
    }
  ];

  for (const userData of users) {
    const existing = await User.findOne({ email: userData.email });
    if (!existing) {
      await User.create(userData);
      console.log(`✅ Created user: ${userData.email} (${userData.role})`);
    } else {
      console.log(`⏭️  User already exists: ${userData.email}`);
    }
  }
};

// Seed Jobs
const seedJobs = async () => {
  console.log('\n📋 Seeding Jobs...');
  
  const schools = await User.find({ role: 'recruiter' });
  if (schools.length === 0) {
    console.log('⚠️  No schools found. Skipping job seeding.');
    return;
  }

  const jobs = [
    {
      title: 'Mathematics Teacher - Secondary Level',
      description: 'Looking for experienced Mathematics teacher for classes 9-12. Must be proficient in CBSE curriculum.',
      requirements: ['B.Ed in Mathematics', 'Minimum 3 years experience', 'CBSE curriculum knowledge'],
      location: 'Mumbai, Maharashtra',
      jobType: 'Full-time',
      experienceLevel: 'Mid-level',
      salary: '₹40,000 - ₹60,000/month',
      postedBy: schools[0]._id,
      status: 'active',
      subjects: ['Mathematics'],
      qualifications: ['B.Ed', 'M.Sc'],
      benefits: ['Health Insurance', 'Paid Leave', 'Professional Development']
    },
    {
      title: 'Physics Teacher - High School',
      description: 'Seeking passionate Physics teacher for grades 11-12. IIT-JEE coaching experience preferred.',
      requirements: ['M.Sc Physics', 'IIT-JEE coaching experience', 'Minimum 2 years experience'],
      location: 'Delhi',
      jobType: 'Full-time',
      experienceLevel: 'Mid-level',
      salary: '₹50,000 - ₹70,000/month',
      postedBy: schools[1] ? schools[1]._id : schools[0]._id,
      status: 'active',
      subjects: ['Physics'],
      qualifications: ['M.Sc', 'B.Ed']
    },
    {
      title: 'English Teacher - Primary & Secondary',
      description: 'English teacher needed for comprehensive language and literature program.',
      requirements: ['MA English', 'Cambridge certification preferred', 'Minimum 2 years experience'],
      location: 'Mumbai, Maharashtra',
      jobType: 'Full-time',
      experienceLevel: 'Entry-level',
      salary: '₹35,000 - ₹50,000/month',
      postedBy: schools[0]._id,
      status: 'active',
      subjects: ['English', 'Literature'],
      qualifications: ['MA', 'B.Ed']
    }
  ];

  for (const jobData of jobs) {
    const existing = await Job.findOne({ title: jobData.title, postedBy: jobData.postedBy });
    if (!existing) {
      await Job.create(jobData);
      console.log(`✅ Created job: ${jobData.title}`);
    } else {
      console.log(`⏭️  Job already exists: ${jobData.title}`);
    }
  }
};

// Seed Applications
const seedApplications = async () => {
  console.log('\n📋 Seeding Applications...');
  
  const teachers = await User.find({ role: 'jobSeeker' });
  const jobs = await Job.find({ status: 'active' });
  
  if (teachers.length === 0 || jobs.length === 0) {
    console.log('⚠️  No teachers or jobs found. Skipping application seeding.');
    return;
  }

  const applications = [
    {
      job: jobs[0]._id,
      applicant: teachers[0]._id,
      status: 'pending',
      coverLetter: 'I am excited to apply for the Mathematics Teacher position. With my Ph.D and 10+ years of experience, I believe I would be a great fit for your institution.'
    },
    {
      job: jobs[1]._id,
      applicant: teachers[1]._id,
      status: 'shortlisted',
      coverLetter: 'As an IIT graduate with extensive Physics teaching experience, I am confident in my ability to prepare students for competitive exams.'
    }
  ];

  for (const appData of applications) {
    const existing = await Application.findOne({ job: appData.job, applicant: appData.applicant });
    if (!existing) {
      await Application.create(appData);
      console.log(`✅ Created application for job: ${appData.job}`);
    } else {
      console.log(`⏭️  Application already exists`);
    }
  }
};

// Seed Tuition Bookings
const seedTuitions = async () => {
  console.log('\n📋 Seeding Tuition Bookings...');
  
  const parents = await User.find({ role: 'parent' });
  const teachers = await User.find({ role: 'jobSeeker' });
  
  if (parents.length === 0 || teachers.length === 0) {
    console.log('⚠️  No parents or teachers found. Skipping tuition seeding.');
    return;
  }

  const tuitions = [
    {
      parent: parents[0]._id,
      teacher: teachers[0]._id,
      subject: 'Mathematics',
      grade: 'Class 10',
      mode: 'Online',
      status: 'confirmed',
      scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: 60,
      hourlyRate: 800,
      notes: 'Focus on algebra and trigonometry'
    },
    {
      parent: parents[0]._id,
      teacher: teachers[1]._id,
      subject: 'Physics',
      grade: 'Class 10',
      mode: 'Hybrid',
      status: 'pending',
      scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      duration: 90,
      hourlyRate: 1000,
      notes: 'Need help with mechanics and optics'
    }
  ];

  for (const tuitionData of tuitions) {
    const existing = await TuitionBooking.findOne({ 
      parent: tuitionData.parent, 
      teacher: tuitionData.teacher,
      subject: tuitionData.subject 
    });
    if (!existing) {
      await TuitionBooking.create(tuitionData);
      console.log(`✅ Created tuition booking: ${tuitionData.subject}`);
    } else {
      console.log(`⏭️  Tuition booking already exists`);
    }
  }
};

// Seed Messages
const seedMessages = async () => {
  console.log('\n📋 Seeding Messages...');
  
  const users = await User.find();
  
  if (users.length < 2) {
    console.log('⚠️  Not enough users found. Skipping message seeding.');
    return;
  }

  const messages = [
    {
      sender: users[0]._id,
      receiver: users[1]._id,
      content: 'Hello! I am interested in your Mathematics tutoring services.',
      read: false
    },
    {
      sender: users[1]._id,
      receiver: users[0]._id,
      content: 'Thank you for reaching out! I would be happy to help. What topics do you need assistance with?',
      read: true
    }
  ];

  for (const msgData of messages) {
    await Message.create(msgData);
    console.log(`✅ Created message`);
  }
};

// Seed Invite Codes
const seedInviteCodes = async () => {
  console.log('\n📋 Seeding Invite Codes...');
  
  const codes = [
    {
      code: 'TEACHER2024',
      role: 'jobSeeker',
      maxUses: 100,
      usedCount: 0,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      isActive: true
    },
    {
      code: 'PARENT2024',
      role: 'parent',
      maxUses: 100,
      usedCount: 0,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true
    },
    {
      code: 'SCHOOL2024',
      role: 'recruiter',
      maxUses: 50,
      usedCount: 0,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true
    }
  ];

  for (const codeData of codes) {
    const existing = await InviteCode.findOne({ code: codeData.code });
    if (!existing) {
      await InviteCode.create(codeData);
      console.log(`✅ Created invite code: ${codeData.code}`);
    } else {
      console.log(`⏭️  Invite code already exists: ${codeData.code}`);
    }
  }
};

// Clear existing data
const clearDatabase = async () => {
  console.log('\n🗑️  Clearing existing data...');
  
  await User.deleteMany({});
  await Admin.deleteMany({});
  await Job.deleteMany({});
  await Application.deleteMany({});
  await TuitionBooking.deleteMany({});
  await Message.deleteMany({});
  await InviteCode.deleteMany({});
  
  console.log('✅ Database cleared');
};

// Main seeding function
const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.DATABASE_URL;
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    if (SEED_CONFIG.clearExisting) {
      await clearDatabase();
    }

    if (SEED_CONFIG.seedAdmin) {
      await seedAdmins();
    }

    if (SEED_CONFIG.seedUsers) {
      await seedUsers();
    }

    if (SEED_CONFIG.seedJobs) {
      await seedJobs();
    }

    if (SEED_CONFIG.seedApplications) {
      await seedApplications();
    }

    if (SEED_CONFIG.seedTuitions) {
      await seedTuitions();
    }

    if (SEED_CONFIG.seedMessages) {
      await seedMessages();
    }

    if (SEED_CONFIG.seedInviteCodes) {
      await seedInviteCodes();
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('Admin: admin@gravity.com / admin123');
    console.log('Teacher: demo@test.com / test123');
    console.log('Parent: parent@test.com / test123');
    console.log('School: school@test.com / test123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
