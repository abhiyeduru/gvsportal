import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import TeacherLayout from "../../TeacherDashboard/TeacherLayout";
import {
  User, Phone, Mail, MapPin, Globe, Facebook, Linkedin, Youtube, Plus, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TeacherProfileEdit = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [availableForHire, setAvailableForHire] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.fullName?.split(' ')[0] || '',
    middleName: '',
    lastName: user?.fullName?.split(' ')[1] || '',
    username: user?.email?.split('@')[0] || '',
    password: '',
    confirmPassword: '',
    mobile: user?.phone || '',
    whatsapp: '',
    email: user?.email || '',
    address: user?.address || '',
    city: '',
    country: 'India',
    about: user?.bio || '',
  });

  // Skills state
  const [skills, setSkills] = useState([
    { name: 'Programming', level: 78 },
    { name: 'UI Design', level: 89 },
    { name: 'Prototyping', level: 65 },
    { name: 'Researching', level: 94 },
  ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index].level = value;
    setSkills(newSkills);
  };

  const handleSave = () => {
    console.log('Saving profile...', formData);
    // Add save logic here
  };

  // Calculate profile completion
  const profileCompletion = 85;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (profileCompletion / 100) * circumference;

  return (
    <TeacherLayout>
      <div className="p-8 space-y-6 bg-[#F7F8FC] min-h-screen">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          Profile / <span className="text-gray-800 font-medium">Edit Profile</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-md">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Available for hire?</span>
                    <button
                      onClick={() => setAvailableForHire(!availableForHire)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        availableForHire ? 'bg-[#6C5DD3]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          availableForHire ? 'translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* General Information */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">General</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3]"
                    />
                  </div>
                  <div>
                    <Input
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      placeholder="Middle Name"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3]"
                    />
                  </div>
                  <div>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Username"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3]"
                    />
                  </div>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3] pr-16"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6C5DD3] text-xs font-semibold"
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-Type Password"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3] pr-16"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6C5DD3] text-xs font-semibold"
                    >
                      {showConfirmPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Contact</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="relative">
                    <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Mobile Phone"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3] pl-6"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="Whatsapp"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3] pl-6"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3] pl-6"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="border-0 border-b border-gray-300 rounded-none focus:border-[#6C5DD3] pl-6"
                    />
                  </div>
                  <div>
                    <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                      <SelectTrigger className="border-0 border-b border-gray-300 rounded-none">
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                      <SelectTrigger className="border-0 border-b border-gray-300 rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* About Me */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">About Me</h3>
                <Textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  placeholder="Tell about you"
                  rows={4}
                  className="rounded-xl border-gray-300 focus:border-[#6C5DD3]"
                />
              </div>

              {/* Skills */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Skills</h3>
                  <button className="flex items-center gap-2 text-[#6C5DD3] text-sm font-semibold hover:underline">
                    <Plus className="w-4 h-4" />
                    Add New Skills
                  </button>
                </div>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-gray-500 font-semibold">{skill.level}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => handleSkillChange(index, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6C5DD3]"
                        style={{
                          background: `linear-gradient(to right, #6C5DD3 0%, #6C5DD3 ${skill.level}%, #E5E7EB ${skill.level}%, #E5E7EB 100%)`
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button variant="outline" className="rounded-xl px-8">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="rounded-xl px-8 bg-[#6C5DD3] hover:bg-[#5B4CC2]">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-md sticky top-24">
              {/* Profile Avatar with Progress */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle cx="64" cy="64" r={radius} stroke="#E5E7EB" strokeWidth="8" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      stroke="#6C5DD3"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      {user?.profilePic ? (
                        <img src={user.profilePic} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{user?.fullName || 'Admin'}</h3>
                <p className="text-sm text-gray-500">Programmer</p>
                <div className="flex gap-6 mt-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-gray-800">228</p>
                    <p className="text-gray-500">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-800">4,842</p>
                    <p className="text-gray-500">Followers</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">+50 123 456 78</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{user?.email || 'admin@email.com'}</span>
                  </div>
                </div>
              </div>

              {/* Skills Circle Indicators */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-around">
                  {[
                    { name: 'PHP', level: 66, color: '#FF9F43' },
                    { name: 'Vue', level: 31, color: '#2ECC71' },
                    { name: 'Laravel', level: 7, color: '#4ECDC4' },
                  ].map((skill, index) => {
                    const r = 30;
                    const circ = 2 * Math.PI * r;
                    const offset = circ - (skill.level / 100) * circ;
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div className="relative w-20 h-20">
                          <svg className="transform -rotate-90 w-20 h-20">
                            <circle cx="40" cy="40" r={r} stroke="#E5E7EB" strokeWidth="6" fill="none" />
                            <circle
                              cx="40"
                              cy="40"
                              r={r}
                              stroke={skill.color}
                              strokeWidth="6"
                              fill="none"
                              strokeDasharray={circ}
                              strokeDashoffset={offset}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-700">{skill.level}%</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">{skill.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Portfolios */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Portfolios</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                    <span className="text-gray-600">facebook.com/admin</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-[#EA4C89]" />
                    <span className="text-gray-600">dribbble.com/admin</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    <span className="text-gray-600">linkedin.com/admin</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Youtube className="w-4 h-4 text-[#FF0000]" />
                    <span className="text-gray-600">youtube.com/admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherProfileEdit;
