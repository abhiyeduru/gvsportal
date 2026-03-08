import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolLayout from '@/components/Dashboard/SchoolDashboard/SchoolLayout';
import { 
  Briefcase, 
  FileText, 
  Users, 
  Calendar, 
  User, 
  CheckCircle, 
  ArrowRight,
  Building2,
  Star,
  Award,
  GraduationCap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SchoolDashboard = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);

  // School Hiring Dashboard Stats
  const statsData = [
    {
      title: 'Jobs Posted',
      value: '12',
      icon: Briefcase,
      gradient: 'from-[#6C5CE7] to-[#5A4FCF]',
    },
    {
      title: 'Applications Received',
      value: '146',
      icon: FileText,
      gradient: 'from-[#00D4FF] to-[#0099CC]',
    },
    {
      title: 'Shortlisted Teachers',
      value: '32',
      icon: Users,
      gradient: 'from-[#00E676] to-[#00C853]',
    },
    {
      title: 'Interviews Scheduled',
      value: '14',
      icon: Calendar,
      gradient: 'from-[#8BC34A] to-[#689F38]',
    }
  ];

  // Teacher Hiring Analytics Chart Data
  const chartData = [
    { week: 'Week 1', applicationsReceived: 30, interviewsScheduled: 25, teachersHired: 15 },
    { week: 'Week 2', applicationsReceived: 45, interviewsScheduled: 35, teachersHired: 20 },
    { week: 'Week 3', applicationsReceived: 35, interviewsScheduled: 30, teachersHired: 18 },
    { week: 'Week 4', applicationsReceived: 50, interviewsScheduled: 40, teachersHired: 25 },
  ];

  // Recent Hiring Activities
  const recentActivities = [
    {
      id: 1,
      message: 'Physics Teacher applied for Senior Position',
      time: '2 hours ago',
      type: 'application'
    },
    {
      id: 2,
      message: 'Mathematics Lecturer shortlisted for interview',
      time: '4 hours ago',
      type: 'shortlist'
    },
    {
      id: 3,
      message: 'English Teacher interview scheduled for tomorrow',
      time: '6 hours ago',
      type: 'interview'
    },
    {
      id: 4,
      message: 'Chemistry teacher hired successfully',
      time: '1 day ago',
      type: 'hired'
    }
  ];

  // Recommended Teachers
  const recommendedTeachers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      subject: 'Physics Teacher',
      experience: '5 years',
      qualification: 'M.Sc Physics',
      rating: 4.8,
      location: 'Delhi',
      status: 'Available',
      verified: true
    },
    {
      id: 2,
      name: 'Priya Singh',
      subject: 'Mathematics Teacher',
      experience: '3 years',
      qualification: 'M.Sc Mathematics',
      rating: 4.6,
      location: 'Mumbai',
      status: 'Available',
      verified: true
    },
    {
      id: 3,
      name: 'Amit Kumar',
      subject: 'Chemistry Teacher',
      experience: '7 years',
      qualification: 'Ph.D Chemistry',
      rating: 4.9,
      location: 'Bangalore',
      status: 'Available',
      verified: true
    }
  ];

  // Top Hiring Institutions
  const topInstitutions = [
    { name: 'Delhi Public School', activeJobs: '21 Active Jobs' },
    { name: 'Narayana Junior College', activeJobs: '14 Active Jobs' },
    { name: 'Sri Chaitanya', activeJobs: '11 Active Jobs' },
    { name: 'FIITJEE', activeJobs: '8 Active Jobs' },
    { name: 'Aakash Institute', activeJobs: '6 Active Jobs' }
  ];

  if (loading) {
    return (
      <SchoolLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6C5CE7]"></div>
        </div>
      </SchoolLayout>
    );
  }

  return (
    <SchoolLayout>
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.gradient} rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-sm font-medium opacity-90 mb-2">
                      {stat.title}
                    </p>
                    <p className="text-4xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Institution Profile & Activities */}
          <div className="lg:col-span-1 space-y-6">
            {/* Institution Profile Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="text-center">
                {/* Institution Logo */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#8B7FE8] flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-white" />
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
                
                <h3 className="text-xl font-bold text-gray-800 mb-1">Green Valley High School</h3>
                <p className="text-gray-500 mb-6">CBSE Affiliated</p>
                
                {/* Institution Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-sm">6</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Teachers Required</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">3</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Active Jobs</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">4</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Departments Hiring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Hiring Activities */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Hiring Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#6C5CE7] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">{activity.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Analytics & Teachers */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teacher Hiring Analytics Chart */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Teacher Hiring Analytics</h3>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#6C5CE7] rounded-full"></div>
                      <span className="text-gray-600">Applications Received</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#00E676] rounded-full"></div>
                      <span className="text-gray-600">Interviews Scheduled</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#FF9800] rounded-full"></div>
                      <span className="text-gray-600">Teachers Hired</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4 mb-2">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">35</p>
                      <p className="text-sm text-gray-500">Applications</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#00E676]">12</p>
                      <p className="text-sm text-gray-500">Interviews</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">This Month</p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="week" 
                      stroke="#9CA3AF"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="applicationsReceived" 
                      stroke="#6C5CE7" 
                      strokeWidth={3}
                      dot={{ fill: '#6C5CE7', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#6C5CE7', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="interviewsScheduled" 
                      stroke="#00E676" 
                      strokeWidth={3}
                      dot={{ fill: '#00E676', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="teachersHired" 
                      stroke="#FF9800" 
                      strokeWidth={3}
                      dot={{ fill: '#FF9800', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recommended Teachers */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Recommended Teachers</h3>
                <button 
                  onClick={() => navigate('/dashboard/school/search-teachers')}
                  className="flex items-center space-x-2 text-[#6C5CE7] hover:text-[#5A4FCF] font-medium"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedTeachers.map((teacher) => (
                  <div key={teacher.id} className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#8B7FE8] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{teacher.name}</h4>
                        <p className="text-xs text-gray-500">{teacher.subject}</p>
                      </div>
                      {teacher.verified && (
                        <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                          Verified
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Experience:</span>
                        <span className="font-medium">{teacher.experience}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Qualification:</span>
                        <span className="font-medium">{teacher.qualification}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="font-medium">{teacher.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium">{teacher.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-[#6C5CE7] text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-[#5A4FCF] transition-colors">
                        View Profile
                      </button>
                      <button className="flex-1 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                        Shortlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Hiring Institutions */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Top Hiring Institutions</h3>
                <button className="flex items-center space-x-2 text-[#6C5CE7] hover:text-[#5A4FCF] font-medium">
                  <span>View More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {topInstitutions.map((institution, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-4 text-center hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#8B7FE8] rounded-xl mx-auto mb-3 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">{institution.name}</h4>
                    <p className="text-xs text-gray-500">{institution.activeJobs}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SchoolLayout>
  );
};

export default SchoolDashboard;