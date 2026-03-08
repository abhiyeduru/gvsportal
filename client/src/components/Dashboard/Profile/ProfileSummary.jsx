import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  Linkedin,
  Globe,
  Youtube,
  ExternalLink,
  MoreHorizontal
} from 'lucide-react';

const ProfileSummary = ({ user, profileData }) => {
  // Calculate stats based on user role
  const getStatsForRole = () => {
    switch (user?.role) {
      case 'teacher':
        return [
          { label: 'Applications', value: '120' },
          { label: 'Students Taught', value: '450' },
          { label: 'Rating', value: '4.8' }
        ];
      case 'school':
        return [
          { label: 'Jobs Posted', value: '25' },
          { label: 'Teachers Hired', value: '85' },
          { label: 'Success Rate', value: '92%' }
        ];
      case 'parent':
        return [
          { label: 'Tutors Found', value: '8' },
          { label: 'Sessions', value: '156' },
          { label: 'Satisfaction', value: '4.9' }
        ];
      default:
        return [
          { label: 'Connections', value: '228' },
          { label: 'Followers', value: '4,842' },
          { label: 'Rating', value: '4.8' }
        ];
    }
  };

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'teacher':
        return 'Mathematics Teacher';
      case 'school':
        return 'School Administrator';
      case 'parent':
        return 'Parent';
      default:
        return 'Platform User';
    }
  };

  const getSkillsForRole = () => {
    switch (user?.role) {
      case 'teacher':
        return [
          { name: 'Teaching', percentage: 90 },
          { name: 'Communication', percentage: 85 },
          { name: 'Subject Expertise', percentage: 95 }
        ];
      case 'school':
        return [
          { name: 'Management', percentage: 88 },
          { name: 'Leadership', percentage: 92 },
          { name: 'Operations', percentage: 85 }
        ];
      case 'parent':
        return [
          { name: 'Communication', percentage: 87 },
          { name: 'Organization', percentage: 90 },
          { name: 'Support', percentage: 93 }
        ];
      default:
        return [
          { name: 'Communication', percentage: 86 },
          { name: 'Collaboration', percentage: 91 },
          { name: 'Problem Solving', percentage: 88 }
        ];
    }
  };

  const stats = getStatsForRole();
  const skills = getSkillsForRole();
  const fullName = `${profileData.firstName} ${profileData.lastName}`.trim() || user?.fullName || 'User Name';

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-6">
      {/* Profile Header */}
      <div className="text-center mb-6">
        {/* Profile Avatar with Progress Ring */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="w-full h-full rounded-full overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage src={profileData.profilePic || user?.profilePic} />
              <AvatarFallback className="bg-gradient-to-br from-[#6C5CE7] to-[#8B7FE8] text-white text-2xl">
                {fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#6C5CE7"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${85 * 2.83} ${100 * 2.83}`}
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-1">{fullName}</h3>
        <p className="text-gray-500 mb-4">{getRoleTitle()}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{profileData.mobile || user?.contact || '+91 9876543210'}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{profileData.email || user?.email || 'user@email.com'}</span>
        </div>
      </div>

      {/* Skill Circles */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-4">Skills Overview</h4>
        <div className="grid grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={index === 0 ? '#FF9800' : index === 1 ? '#10B981' : '#06B6D4'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${skill.percentage * 2.51} ${100 * 2.51}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">{skill.percentage}%</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Links */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-800">Portfolio</h4>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Linkedin className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">LinkedIn</p>
              <p className="text-xs text-gray-500">/in/{profileData.username || 'username'}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Portfolio</p>
              <p className="text-xs text-gray-500">portfolio.com</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <Youtube className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">YouTube</p>
              <p className="text-xs text-gray-500">@{profileData.username || 'username'}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;