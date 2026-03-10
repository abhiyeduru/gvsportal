import mongoose from 'mongoose';
import Job from './models/Job.js';
import { User } from './models/User.js';

mongoose.connect('mongodb://localhost:27017/gravity-job-portal')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Find a school user
    const school = await User.findOne({ role: 'recruiter' });
    if (!school) {
      console.log('No school user found');
      process.exit(1);
    }
    
    console.log('Found school:', school.email);
    
    // Create a test job
    const testJob = new Job({
      title: 'Test Mathematics Teacher',
      description: 'This is a test job posting',
      requirements: ['Bachelor degree', 'Teaching experience'],
      responsibilities: ['Teach mathematics', 'Prepare lesson plans'],
      benefits: ['Health insurance', 'Paid leave'],
      location: {
        city: 'Delhi',
        state: 'Delhi',
        country: 'India'
      },
      salaryRange: {
        min: '30000',
        max: '50000',
        currency: 'INR'
      },
      subject: 'Mathematics',
      skillsRequired: 'Mathematics',
      postedBy: school._id,
      company: school._id,
      companyName: school.fullName || 'Test School',
      status: 'open',
      jobType: 'full-time',
      workFrom: 'on-site',
      experience: 'Fresher (0-1 years)',
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      workingHours: '9:00 AM - 4:00 PM',
      classLevels: ['Secondary (9-10)', 'Senior Secondary (11-12)'],
      postedAt: new Date()
    });
    
    try {
      const savedJob = await testJob.save();
      console.log('Job created successfully!');
      console.log('Job ID:', savedJob._id);
      console.log('Job Title:', savedJob.title);
    } catch (error) {
      console.error('Error creating job:', error.message);
      if (error.errors) {
        Object.keys(error.errors).forEach(key => {
          console.error(`  - ${key}: ${error.errors[key].message}`);
        });
      }
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
