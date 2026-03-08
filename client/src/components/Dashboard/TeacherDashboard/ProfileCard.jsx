import React from 'react';
import { User, ArrowRight } from 'lucide-react';

const ProfileCard = ({ profile }) => {
  const percentage = profile?.percentage || 0;
  const skills = profile?.skills || [];

  // Calculate circle progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      {/* Circular Progress */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90 w-40 h-40">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Profile Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Name & Role */}
        <h3 className="text-xl font-bold text-gray-800 mt-4">Teacher Name</h3>
        <p className="text-sm text-gray-500">Physics Teacher</p>

        {/* Profile Completion */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Profile Completion</p>
          <p className="text-2xl font-bold text-purple-600">{percentage}%</p>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">Skills</h4>
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{skill.name}</span>
              <span className="text-gray-500">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${
                  index === 0
                    ? 'bg-orange-500'
                    : index === 1
                    ? 'bg-green-500'
                    : 'bg-teal-500'
                }`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Complete Profile Button */}
      <button className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        <span>Complete Profile</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ProfileCard;
