import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

async function checkUser() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email: 'demo@test.com' }).select('+password');
    
    if (!user) {
      console.log('❌ User not found!');
      process.exit(1);
    }

    console.log('\n✅ User found:');
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('Password hash:', user.password);
    console.log('Is Verified:', user.isVerified);

    // Test password
    const testPassword = 'test123';
    const isMatch = await bcrypt.compare(testPassword, user.password);
    
    console.log('\n🔐 Password Test:');
    console.log('Testing password:', testPassword);
    console.log('Match result:', isMatch ? '✅ CORRECT' : '❌ INCORRECT');

    if (!isMatch) {
      console.log('\n⚠️  Password does not match! Resetting password...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testPassword, salt);
      user.password = hashedPassword;
      await user.save();
      console.log('✅ Password reset successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUser();
