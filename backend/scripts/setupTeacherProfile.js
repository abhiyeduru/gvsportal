import mongoose from 'mongoose';
import { User } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const setupTeacherProfile = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB\n');

    // Find the demo teacher
    const teacher = await User.findOne({ email: 'demo@test.com' });
    
    if (!teacher) {
      console.log('❌ Teacher not found. Run: node scripts/seedTestUsers.js');
      process.exit(1);
    }

    console.log('Found teacher:', teacher.email);
    console.log('Current availableForHire:', teacher.availableForHire);
    console.log('');

    // Update teacher profile with complete information
    teacher.availableForHire = true;
    teacher.fullName = 'Demo Teacher';
    teacher.primarySubject = 'Mathematics';
    teacher.secondarySubjects = ['Physics', 'Chemistry'];
    teacher.city = 'Mumbai';
    teacher.state = 'Maharashtra';
    teacher.qualification = 'M.Sc, B.Ed';
    teacher.yoe = '5';
    teacher.hourlyRate = '500';
    teacher.teachingMode = 'Hybrid';
    teacher.bio = 'Experienced mathematics teacher with 5 years of teaching experience. Specialized in CBSE and ICSE curriculum.';
    teacher.contact = '9876543210';
    teacher.rating = 4.5;
    teacher.totalReviews = 10;
    teacher.studentsTaught = 50;
    teacher.successRate = 95;
    
    teacher.skills = [
      { name: 'Subject Knowledge', level: 90 },
      { name: 'Communication', level: 85 },
      { name: 'Online Teaching', level: 80 },
      { name: 'Classroom Management', level: 88 }
    ];

    teacher.profileLinks = {
      linkedIn: 'https://linkedin.com/in/demoteacher',
      youtube: 'https://youtube.com/@demoteacher',
      website: 'https://demoteacher.com',
      portfolio: 'https://portfolio.demoteacher.com'
    };

    await teacher.save();

    console.log('✅ Teacher profile updated successfully!\n');
    console.log('Teacher Details:');
    console.log('  Name:', teacher.fullName);
    console.log('  Email:', teacher.email);
    console.log('  Subject:', teacher.primarySubject);
    console.log('  City:', teacher.city);
    console.log('  Available for Hire:', teacher.availableForHire);
    console.log('  Hourly Rate: ₹', teacher.hourlyRate);
    console.log('  Teaching Mode:', teacher.teachingMode);
    console.log('  Rating:', teacher.rating);
    console.log('');
    console.log('✅ Teacher is now visible in Parent "Find Teachers" page!');
    console.log('');
    console.log('Test it:');
    console.log('  1. Login as parent: parent@test.com / test123');
    console.log('  2. Navigate to "Find Teachers"');
    console.log('  3. You should see "Demo Teacher"');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

setupTeacherProfile();
