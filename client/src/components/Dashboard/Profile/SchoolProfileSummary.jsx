import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  Linkedin,
  Globe,
  Instagram,
  Youtube,
  ExternalLink,
  MoreHorizontal
} from 'lucide-react';

const SchoolProfileSummary = ({ user, profileData }) => {
  const stats = [
    { label: 'Active Jobs', value: '6' },
    { label: 'Applications', value: '132' },
    { label: 'Teachers Hired', value: '18' }
  ];

  const skills = [
    { name: 'Physics Teachers', percentage: 35 },
    { name: 'Math Teachers', percentage: 28 },
    { name: 'English Teachers', percentage: 22 }
  ];

  const contactInfo = {
    phone: profileData.contactPhone || '+91 9876543210',
    email: profileData.email || 'hr@greenvalleyschool.com'
  };

  const portfolioLinks = [
    {
      name: 'Website',
      icon: Globe,
      bgColor: 'bg-blue-500',
      containerColor: 'bg-blue-50',
      url: profileData.website || 'www.greenvalley.com'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      bgColor: 'bg-blue-600',
      containerColor: 'bg-blue-50',
      url: `/company/${profileData.institutionName?.toLowerCase().replace(/\s+/g, '-') || 'greenvalley'}`
    },
    {
      name: 'Campus Gallery',
      icon: Instagram,
      bgColor: 'bg-pink-500',
      containerColor: 'bg-pink-50',
      url: '@greenvalleyschool'
    }
  ];
  
  const displayName = profileData.institutionName || 'Green Valley High School';
  const roleTitle = `${profileData.boardAffiliation || 'CBSE'} Affiliated`;

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
                {displayName.charAt(0)}
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
        
        <h3 className="text-xl font-bold text-gray-800 mb-1">{displayName}</h3>
        <p className="text-gray-500 mb-4">{roleTitle}</p>
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
          <span>{contactInfo.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{contactInfo.email}</span>
        </div>
      </div>

      {/* Subject Hiring Distribution */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-4">Subject Hiring Distribution</h4>
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

      {/* Institution Media Links */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-800">Institution Media</h4>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-3">
          {portfolioLinks.map((link, index) => (
            <div key={index} className={`flex items-center gap-3 p-3 ${link.containerColor} rounded-xl`}>
              <div className={`w-8 h-8 ${link.bgColor} rounded-lg flex items-center justify-center`}>
                <link.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{link.name}</p>
                <p className="text-xs text-gray-500">{link.url}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolProfileSummary;