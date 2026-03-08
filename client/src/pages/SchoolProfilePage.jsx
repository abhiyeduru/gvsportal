import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import SchoolLayout from '@/components/Dashboard/SchoolDashboard/SchoolLayout';
import SchoolProfileForm from '@/components/Dashboard/Profile/SchoolProfileForm';
import SchoolProfileSummary from '@/components/Dashboard/Profile/SchoolProfileSummary';

const SchoolProfilePage = () => {
  const { user } = useAuth();
  
  const [profileData, setProfileData] = useState({
    institutionName: '',
    institutionType: '',
    boardAffiliation: '',
    yearEstablished: '',
    institutionSize: '',
    hrContactPerson: '',
    contactPhone: '',
    whatsapp: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    about: '',
    facilities: [],
    subjectsHiring: [],
    requiredQualifications: '',
    minimumExperience: '',
    currentlyHiring: true,
    profilePic: '',
    socialLinks: {
      linkedin: '',
      website: '',
      instagram: '',
      youtube: ''
    }
  });

  useEffect(() => {
    if (user) {
      // Parse school/institution data
      setProfileData(prev => ({
        ...prev,
        institutionName: user.fullName || 'Green Valley High School',
        email: user.email || 'hr@greenvalley.com',
        contactPhone: user.contact || '+91 9876543210',
        address: user.address || 'Franklin Avenue St. Corner',
        about: user.bio || 'Leading educational institution providing quality education with modern facilities and experienced faculty.',
        profilePic: user.profilePic || '',
        city: user.location?.city || 'London',
        state: user.location?.state || 'England',
        country: user.location?.country || 'India',
        website: user.website || 'www.greenvalley.com',
        boardAffiliation: 'CBSE',
        institutionType: 'Higher Secondary School',
        yearEstablished: '1995',
        institutionSize: '800-1200 students',
        hrContactPerson: 'David Johnson',
        whatsapp: '+91 9876543210',
        facilities: ['Smart Classrooms', 'Digital Library', 'Science Laboratory', 'Sports Facilities'],
        subjectsHiring: ['Mathematics', 'Physics', 'Chemistry', 'English'],
        requiredQualifications: 'B.Ed, M.Sc, Ph.D',
        minimumExperience: '2-5 years'
      }));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // API call to update school profile
      console.log('Saving school profile:', profileData);
      // Add your API call here
    } catch (error) {
      console.error('Error saving school profile:', error);
    }
  };

  const handleCancel = () => {
    // Reset form to original data
    if (user) {
      setProfileData(prev => ({
        ...prev,
        institutionName: user.fullName || 'Green Valley High School',
        email: user.email || 'hr@greenvalley.com',
        contactPhone: user.contact || '+91 9876543210',
        address: user.address || 'Franklin Avenue St. Corner',
        about: user.bio || 'Leading educational institution providing quality education with modern facilities and experienced faculty.',
        profilePic: user.profilePic || ''
      }));
    }
  };

  return (
    <SchoolLayout>
      <div className="p-6">
        <div className="flex gap-6 h-full">
          {/* Main Profile Form - Left Side */}
          <div className="flex-1">
            <SchoolProfileForm
              profileData={profileData}
              onInputChange={handleInputChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>

          {/* Profile Summary Card - Right Side */}
          <div className="w-80">
            <SchoolProfileSummary
              user={user}
              profileData={profileData}
            />
          </div>
        </div>
      </div>
    </SchoolLayout>
  );
};

export default SchoolProfilePage;