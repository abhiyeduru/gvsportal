import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProfileLayout from '@/components/Dashboard/Profile/ProfileLayout';
import ProfileForm from '@/components/Dashboard/Profile/ProfileForm';
import ProfileSummary from '@/components/Dashboard/Profile/ProfileSummary';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    password: '',
    retypePassword: '',
    mobile: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    country: 'India',
    about: '',
    skills: [],
    availableForHiring: true,
    profilePic: '',
    socialLinks: {
      linkedin: '',
      portfolio: '',
      youtube: '',
      website: ''
    }
  });

  useEffect(() => {
    if (user) {
      // Parse user data into form fields
      const nameParts = user.fullName?.split(' ') || ['', '', ''];
      setProfileData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        middleName: nameParts[1] || '',
        lastName: nameParts[2] || '',
        email: user.email || '',
        mobile: user.contact || '',
        address: user.address || '',
        about: user.bio || '',
        profilePic: user.profilePic || '',
        skills: user.skills || [],
        city: user.location?.city || '',
        country: user.location?.country || 'India'
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
      // API call to update profile
      console.log('Saving profile:', profileData);
      // Add your API call here
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      const nameParts = user.fullName?.split(' ') || ['', '', ''];
      setProfileData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        middleName: nameParts[1] || '',
        lastName: nameParts[2] || '',
        email: user.email || '',
        mobile: user.contact || '',
        address: user.address || '',
        about: user.bio || '',
        profilePic: user.profilePic || '',
        skills: user.skills || []
      }));
    }
  };

  return (
    <ProfileLayout>
      <div className="flex gap-6 h-full">
        {/* Main Profile Form - Left Side */}
        <div className="flex-1">
          <ProfileForm
            profileData={profileData}
            onInputChange={handleInputChange}
            onSave={handleSave}
            onCancel={handleCancel}
            userRole={user?.role}
          />
        </div>

        {/* Profile Summary Card - Right Side */}
        <div className="w-80">
          <ProfileSummary
            user={user}
            profileData={profileData}
          />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;