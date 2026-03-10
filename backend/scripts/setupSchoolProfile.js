import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';

dotenv.config();

const setupSchoolProfile = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.DATABASE_URL;
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Find or create school user
    let school = await User.findOne({ email: 'school@test.com' });

    if (!school) {
      console.log('❌ School user not found. Creating new school user...');
      school = await User.create({
        email: 'school@test.com',
        password: '$2a$10$YourHashedPasswordHere', // test123 hashed
        role: 'recruiter',
        fullName: 'Green Valley High School',
        isVerified: true
      });
      console.log('✅ School user created');
    } else {
      console.log('✅ School user found:', school.email);
    }

    // Update school profile with complete data
    school.fullName = 'Green Valley High School';
    school.contact = '+919876543210';
    school.email = 'school@test.com';
    school.address = '123 Education Street, Knowledge Park';
    school.city = 'Mumbai';
    school.state = 'Maharashtra';
    school.bio = 'Leading educational institution providing quality education with modern facilities and experienced faculty. We are committed to nurturing young minds and preparing them for a bright future.';
    
    // School-specific fields
    school.institutionType = 'Higher Secondary School';
    school.boardAffiliation = 'CBSE';
    school.yearEstablished = '1995';
    school.institutionSize = '800-1200 students';
    school.hrContactPerson = 'David Johnson';
    school.whatsapp = '+919876543210';
    school.facilities = [
      'Smart Classrooms',
      'Digital Library',
      'Science Laboratory',
      'Computer Lab',
      'Sports Facilities',
      'Auditorium'
    ];
    school.subjectsHiring = [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'English',
      'Computer Science'
    ];
    school.requiredQualifications = 'B.Ed, M.Sc, Ph.D';
    school.minimumExperience = '2-5 years';
    school.currentlyHiring = true;
    
    school.profileLinks = {
      website: 'www.greenvalleyschool.com',
      linkedIn: 'linkedin.com/company/greenvalley',
      youtube: 'youtube.com/@greenvalleyschool',
      github: '',
      portfolio: ''
    };

    await school.save();
    console.log('✅ School profile updated successfully');
    console.log('\n📋 School Profile Details:');
    console.log('Email:', school.email);
    console.log('Name:', school.fullName);
    console.log('Type:', school.institutionType);
    console.log('Board:', school.boardAffiliation);
    console.log('City:', school.city);
    console.log('Currently Hiring:', school.currentlyHiring);
    console.log('Subjects Hiring:', school.subjectsHiring.join(', '));
    console.log('\n🔐 Login Credentials:');
    console.log('Email: school@test.com');
    console.log('Password: test123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

setupSchoolProfile();
