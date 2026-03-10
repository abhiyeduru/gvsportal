import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const testUsers = [
  {
    email: 'school@test.com',
    password: 'test123',
    role: 'recruiter',
    fullName: 'Test School',
    isVerified: true,
  },
  {
    email: 'demo@test.com',
    password: 'test123',
    role: 'jobSeeker',
    fullName: 'Demo Teacher',
    isVerified: true,
  },
  {
    email: 'parent@test.com',
    password: 'test123',
    role: 'parent',
    fullName: 'Test Parent',
    isVerified: true,
  },
];

async function seedTestUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');

    // Delete existing test users
    await User.deleteMany({ 
      email: { $in: testUsers.map(u => u.email) } 
    });
    console.log('Deleted existing test users');

    // Create new test users with hashed passwords
    for (const userData of testUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = new User({
        ...userData,
        password: hashedPassword,
      });
      
      await user.save();
      console.log(`Created test user: ${userData.email} (${userData.role})`);
    }

    console.log('\n✅ Test users created successfully!');
    console.log('\nTest Credentials:');
    console.log('School: school@test.com / test123');
    console.log('Teacher: demo@test.com / test123');
    console.log('Parent: parent@test.com / test123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding test users:', error);
    process.exit(1);
  }
}

seedTestUsers();
