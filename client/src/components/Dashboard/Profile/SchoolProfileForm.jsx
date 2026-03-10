import React from 'react';
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
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  Loader2
} from 'lucide-react';

const SchoolProfileForm = ({ profileData, onInputChange, onSave, onCancel, isSaving }) => {
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const institutionTypes = [
    'Primary School', 'Secondary School', 'Higher Secondary School', 
    'Junior College', 'Degree College', 'Coaching Institute', 
    'International School', 'Residential School'
  ];

  const boardAffiliations = [
    'CBSE', 'ICSE', 'State Board', 'IB (International Baccalaureate)', 
    'Cambridge', 'Autonomous', 'University Affiliated'
  ];

  const facilities = [
    'Smart Classrooms', 'Digital Library', 'Science Laboratory', 
    'Computer Lab', 'Sports Facilities', 'Hostel', 'Transportation',
    'Cafeteria', 'Medical Room', 'Playground', 'Auditorium', 'Wi-Fi Campus'
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 
    'Hindi', 'Social Studies', 'Computer Science', 'Economics', 
    'Accountancy', 'Business Studies', 'Physical Education', 'Arts'
  ];

  const handleFacilityToggle = (facility) => {
    const currentFacilities = profileData.facilities || [];
    const updatedFacilities = currentFacilities.includes(facility)
      ? currentFacilities.filter(f => f !== facility)
      : [...currentFacilities, facility];
    onInputChange('facilities', updatedFacilities);
  };

  const handleSubjectToggle = (subject) => {
    const currentSubjects = profileData.subjectsHiring || [];
    const updatedSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter(s => s !== subject)
      : [...currentSubjects, subject];
    onInputChange('subjectsHiring', updatedSubjects);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Edit Institution Profile</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="currently-hiring" className="text-sm font-medium text-gray-700">
              Currently Hiring Teachers
            </Label>
            <Switch
              id="currently-hiring"
              checked={profileData.currentlyHiring}
              onCheckedChange={(checked) => onInputChange('currentlyHiring', checked)}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} disabled={isSaving}>
              Cancel
            </Button>
            <Button 
              onClick={onSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-[#6C5CE7] to-[#5A4FCF] hover:from-[#5A4FCF] hover:to-[#4C46D6] text-white"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Institution Information Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
          Institution Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="institutionName" className="text-sm font-medium text-gray-700 mb-2 block">
              Institution Name
            </Label>
            <Input
              id="institutionName"
              value={profileData.institutionName}
              onChange={(e) => onInputChange('institutionName', e.target.value)}
              placeholder="Enter institution name"
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="institutionType" className="text-sm font-medium text-gray-700 mb-2 block">
              Institution Type
            </Label>
            <Select value={profileData.institutionType} onValueChange={(value) => onInputChange('institutionType', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {institutionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="boardAffiliation" className="text-sm font-medium text-gray-700 mb-2 block">
              Board / Affiliation
            </Label>
            <Select value={profileData.boardAffiliation} onValueChange={(value) => onInputChange('boardAffiliation', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select board" />
              </SelectTrigger>
              <SelectContent>
                {boardAffiliations.map((board) => (
                  <SelectItem key={board} value={board}>
                    {board}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <Label htmlFor="yearEstablished" className="text-sm font-medium text-gray-700 mb-2 block">
              Year Established
            </Label>
            <Input
              id="yearEstablished"
              type="number"
              value={profileData.yearEstablished}
              onChange={(e) => onInputChange('yearEstablished', e.target.value)}
              placeholder="e.g., 1995"
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="institutionSize" className="text-sm font-medium text-gray-700 mb-2 block">
              Institution Size (Number of Students)
            </Label>
            <Input
              id="institutionSize"
              value={profileData.institutionSize}
              onChange={(e) => onInputChange('institutionSize', e.target.value)}
              placeholder="e.g., 500-1000 students"
              className="h-12"
            />
          </div>
        </div>
      </div>

      {/* Location Details Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
          Location Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
              Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => onInputChange('address', e.target.value)}
                placeholder="Complete address"
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
            <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-2 block">
              State
            </Label>
            <Select value={profileData.state} onValueChange={(value) => onInputChange('state', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
          Contact Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="hrContactPerson" className="text-sm font-medium text-gray-700 mb-2 block">
              HR Contact Person
            </Label>
            <Input
              id="hrContactPerson"
              value={profileData.hrContactPerson}
              onChange={(e) => onInputChange('hrContactPerson', e.target.value)}
              placeholder="Contact person name"
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-700 mb-2 block">
              Contact Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="contactPhone"
                value={profileData.contactPhone}
                onChange={(e) => onInputChange('contactPhone', e.target.value)}
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
              Official Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                placeholder="hr@institution.com"
                className="h-12 pl-12"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="website" className="text-sm font-medium text-gray-700 mb-2 block">
              Institution Website
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="website"
                value={profileData.website}
                onChange={(e) => onInputChange('website', e.target.value)}
                placeholder="www.institution.com"
                className="h-12 pl-12"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Institution Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
          About Institution
        </h3>
        <div>
          <Label htmlFor="about" className="text-sm font-medium text-gray-700 mb-2 block">
            Describe Your Institution
          </Label>
          <Textarea
            id="about"
            value={profileData.about}
            onChange={(e) => onInputChange('about', e.target.value)}
            placeholder="Describe your institution, facilities, teaching environment, achievements, and mission..."
            className="min-h-32 resize-none rounded-2xl"
            rows={6}
          />
        </div>
      </div>

      {/* Facilities & Features Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
          Facilities & Features
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {facilities.map((facility) => (
            <div key={facility} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={facility}
                checked={(profileData.facilities || []).includes(facility)}
                onChange={() => handleFacilityToggle(facility)}
                className="rounded border-gray-300 text-[#6C5CE7] focus:ring-[#6C5CE7]"
              />
              <Label htmlFor={facility} className="text-sm text-gray-700">
                {facility}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Hiring Preferences Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
          Hiring Preferences
        </h3>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Subjects Hiring For
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={subject}
                    checked={(profileData.subjectsHiring || []).includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                    className="rounded border-gray-300 text-[#6C5CE7] focus:ring-[#6C5CE7]"
                  />
                  <Label htmlFor={subject} className="text-sm text-gray-700">
                    {subject}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="requiredQualifications" className="text-sm font-medium text-gray-700 mb-2 block">
                Required Qualifications
              </Label>
              <Input
                id="requiredQualifications"
                value={profileData.requiredQualifications}
                onChange={(e) => onInputChange('requiredQualifications', e.target.value)}
                placeholder="e.g., B.Ed, M.Sc, Ph.D"
                className="h-12"
              />
            </div>
            <div>
              <Label htmlFor="minimumExperience" className="text-sm font-medium text-gray-700 mb-2 block">
                Minimum Experience
              </Label>
              <Input
                id="minimumExperience"
                value={profileData.minimumExperience}
                onChange={(e) => onInputChange('minimumExperience', e.target.value)}
                placeholder="e.g., 2-5 years"
                className="h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolProfileForm;