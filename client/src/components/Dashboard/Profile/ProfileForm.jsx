import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Eye,
  EyeOff,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Plus
} from 'lucide-react';
import SkillSlider from './SkillSlider';

const ProfileForm = ({ profileData, onInputChange, onSave, onCancel, userRole }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 
    'Germany', 'France', 'Japan', 'Singapore', 'UAE'
  ];

  const handleSkillChange = (skillIndex, field, value) => {
    const updatedSkills = [...profileData.skills];
    if (field === 'remove') {
      updatedSkills.splice(skillIndex, 1);
    } else {
      updatedSkills[skillIndex] = {
        ...updatedSkills[skillIndex],
        [field]: value
      };
    }
    onInputChange('skills', updatedSkills);
  };

  const addNewSkill = () => {
    const newSkill = { name: '', level: 50 };
    onInputChange('skills', [...profileData.skills, newSkill]);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="available-hiring" className="text-sm font-medium text-gray-700">
              Available for Hiring
            </Label>
            <Switch
              id="available-hiring"
              checked={profileData.availableForHiring}
              onCheckedChange={(checked) => onInputChange('availableForHiring', checked)}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={onSave}
              className="bg-gradient-to-r from-[#6C5CE7] to-[#5A4FCF] hover:from-[#5A4FCF] hover:to-[#4C46D6] text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* General Information Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
          General Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">
              First Name
            </Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              onChange={(e) => onInputChange('firstName', e.target.value)}
              placeholder="Enter first name"
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="middleName" className="text-sm font-medium text-gray-700 mb-2 block">
              Middle Name
            </Label>
            <Input
              id="middleName"
              value={profileData.middleName}
              onChange={(e) => onInputChange('middleName', e.target.value)}
              placeholder="Enter middle name"
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 block">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              onChange={(e) => onInputChange('lastName', e.target.value)}
              placeholder="Enter last name"
              className="h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <Label htmlFor="username" className="text-sm font-medium text-gray-700 mb-2 block">
              Username
            </Label>
            <Input
              id="username"
              value={profileData.username}
              onChange={(e) => onInputChange('username', e.target.value)}
              placeholder="Enter username"
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={profileData.password}
                onChange={(e) => onInputChange('password', e.target.value)}
                placeholder="••••••••••••"
                className="h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="retypePassword" className="text-sm font-medium text-gray-700 mb-2 block">
              Re-type Password
            </Label>
            <div className="relative">
              <Input
                id="retypePassword"
                type={showRetypePassword ? "text" : "password"}
                value={profileData.retypePassword}
                onChange={(e) => onInputChange('retypePassword', e.target.value)}
                placeholder="••••••••••••"
                className="h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showRetypePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
          Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="mobile" className="text-sm font-medium text-gray-700 mb-2 block">
              Mobile Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="mobile"
                value={profileData.mobile}
                onChange={(e) => onInputChange('mobile', e.target.value)}
                placeholder="+91 9876543210"
                className="h-12 pl-12"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700 mb-2 block">
              WhatsApp Number
            </Label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="whatsapp"
                value={profileData.whatsapp}
                onChange={(e) => onInputChange('whatsapp', e.target.value)}
                placeholder="+91 9876543210"
                className="h-12 pl-12"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                placeholder="user@email.com"
                className="h-12 pl-12"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
              Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => onInputChange('address', e.target.value)}
                placeholder="Street Address"
                className="h-12 pl-12"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">
              City
            </Label>
            <Input
              id="city"
              value={profileData.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              placeholder="Enter city"
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-2 block">
              Country
            </Label>
            <Select value={profileData.country} onValueChange={(value) => onInputChange('country', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
          About Me
        </h3>
        <div>
          <Label htmlFor="about" className="text-sm font-medium text-gray-700 mb-2 block">
            Tell About You
          </Label>
          <Textarea
            id="about"
            value={profileData.about}
            onChange={(e) => onInputChange('about', e.target.value)}
            placeholder="Tell something about yourself, teaching experience, subjects, achievements..."
            className="min-h-32 resize-none rounded-2xl"
            rows={6}
          />
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">
            Skills
          </h3>
          <Button
            type="button"
            onClick={addNewSkill}
            variant="outline"
            className="text-[#6C5CE7] border-[#6C5CE7] hover:bg-[#6C5CE7] hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Skill
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileData.skills.map((skill, index) => (
            <SkillSlider
              key={index}
              skill={skill}
              onSkillChange={(field, value) => handleSkillChange(index, field, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;