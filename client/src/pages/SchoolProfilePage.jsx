import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import SchoolLayout from '@/components/Dashboard/SchoolDashboard/SchoolLayout';
import SchoolProfileForm from '@/components/Dashboard/Profile/SchoolProfileForm';
import SchoolProfileSummary from '@/components/Dashboard/Profile/SchoolProfileSummary';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

const SchoolProfilePage = () => {
  const { user, refetchUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
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
    profilePic: ''
  });

  useEffect(() => {
    if (user) {
      // Load existing user data
      setProfileData({
        institutionName: user.fullName || '',
        institutionType: user.institutionType || '',
        boardAffiliation: user.boardAffiliation || '',
        yearEstablished: user.yearEstablished || '',
        institutionSize: user.institutionSize || '',
        hrContactPerson: user.hrContactPerson || '',
        contactPhone: user.contact || '',
        whatsapp: user.whatsapp || user.contact || '',
        email: user.email || '',
        website: user.profileLinks?.website || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: 'India',
        about: user.bio || '',
        facilities: user.facilities || [],
        subjectsHiring: user.subjectsHiring || [],
        requiredQualifications: user.requiredQualifications || '',
        minimumExperience: user.minimumExperience || '',
        currentlyHiring: user.currentlyHiring !== undefined ? user.currentlyHiring : true,
        profilePic: user.profilePic || ''
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG, PNG)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append('profilePic', file);

      const response = await axiosInstance.put('/user/profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setProfileData(prev => ({ ...prev, profilePic: response.data.profilePic }));
        toast.success('Profile picture updated successfully!');
        await refetchUser();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSave = async () => {
    try {
      // Validation
      if (!profileData.institutionName || !profileData.email) {
        toast.error('Institution name and email are required!');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profileData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      // Validate phone number
      if (profileData.contactPhone && !/^\d{10}$/.test(profileData.contactPhone.replace(/\D/g, ''))) {
        toast.error('Please enter a valid 10-digit phone number');
        return;
      }

      setIsSaving(true);

      // Prepare data for API - map to User model fields
      const updateData = {
        fullName: profileData.institutionName,
        email: profileData.email,
        contact: profileData.contactPhone,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        bio: profileData.about,
        profileLinks: {
          website: profileData.website,
          linkedIn: user?.profileLinks?.linkedIn || '',
          github: user?.profileLinks?.github || '',
          youtube: user?.profileLinks?.youtube || '',
          portfolio: user?.profileLinks?.portfolio || ''
        },
        // School-specific fields (stored as custom fields)
        institutionType: profileData.institutionType,
        boardAffiliation: profileData.boardAffiliation,
        yearEstablished: profileData.yearEstablished,
        institutionSize: profileData.institutionSize,
        hrContactPerson: profileData.hrContactPerson,
        whatsapp: profileData.whatsapp,
        facilities: profileData.facilities,
        subjectsHiring: profileData.subjectsHiring,
        requiredQualifications: profileData.requiredQualifications,
        minimumExperience: profileData.minimumExperience,
        currentlyHiring: profileData.currentlyHiring
      };

      // Call API to update profile
      const response = await axiosInstance.put('/user/profile-update', updateData);

      if (response.data.success) {
        toast.success('Profile updated successfully!');
        await refetchUser();
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original data
    if (user) {
      setProfileData({
        institutionName: user.fullName || '',
        institutionType: user.institutionType || '',
        boardAffiliation: user.boardAffiliation || '',
        yearEstablished: user.yearEstablished || '',
        institutionSize: user.institutionSize || '',
        hrContactPerson: user.hrContactPerson || '',
        contactPhone: user.contact || '',
        whatsapp: user.whatsapp || user.contact || '',
        email: user.email || '',
        website: user.profileLinks?.website || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: 'India',
        about: user.bio || '',
        facilities: user.facilities || [],
        subjectsHiring: user.subjectsHiring || [],
        requiredQualifications: user.requiredQualifications || '',
        minimumExperience: user.minimumExperience || '',
        currentlyHiring: user.currentlyHiring !== undefined ? user.currentlyHiring : true,
        profilePic: user.profilePic || ''
      });
      toast.info('Changes cancelled');
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
              isSaving={isSaving}
            />
          </div>

          {/* Profile Summary Card - Right Side */}
          <div className="w-80">
            <SchoolProfileSummary
              user={user}
              profileData={profileData}
              onImageUpload={handleImageUpload}
              isUploadingImage={isUploadingImage}
            />
          </div>
        </div>
      </div>
    </SchoolLayout>
  );
};

export default SchoolProfilePage;