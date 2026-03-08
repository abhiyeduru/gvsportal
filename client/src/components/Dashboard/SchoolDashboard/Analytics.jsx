import React, { useState } from 'react';
import SchoolLayout from './SchoolLayout';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Calendar,
  Download,
  Filter,
  Briefcase,
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('applications');

  // Sample data for charts
  const applicationTrends = [
    { month: 'Jan', applications: 45, interviews: 12, hired: 3 },
    { month: 'Feb', applications: 52, interviews: 15, hired: 5 },
    { month: 'Mar', applications: 38, interviews: 10, hired: 2 },
    { month: 'Apr', applications: 61, interviews: 18, hired: 6 },
    { month: 'May', applications: 55, interviews: 16, hired: 4 },
    { month: 'Jun', applications: 67, interviews: 20, hired: 7 }
  ];

  const subjectWiseData = [
    { subject: 'Mathematics', applications: 45, hired: 8 },
    { subject: 'Physics', applications: 38, hired: 6 },
    { subject: 'Chemistry', applications: 32, hired: 5 },
    { subject: 'Biology', applications: 28, hired: 4 },
    { subject: 'English', applications: 35, hired: 7 },
    { subject: 'Computer Science', applications: 42, hired: 9 }
  ];

  const hiringFunnelData = [
    { name: 'Applications Received', value: 240, color: '#6C5CE7' },
    { name: 'Applications Reviewed', value: 180, color: '#8B7FE8' },
    { name: 'Candidates Shortlisted', value: 85, color: '#00D4FF' },
    { name: 'Interviews Conducted', value: 45, color: '#00E676' },
    { name: 'Teachers Hired', value: 18, color: '#8BC34A' }
  ];

  const performanceMetrics = [
    {
      title: 'Application Response Rate',
      value: '68%',
      change: '+12%',
      trend: 'up',
      description: 'Percentage of job posts that received applications'
    },
    {
      title: 'Time to Hire',
      value: '21 days',
      change: '-3 days',
      trend: 'down',
      description: 'Average time from job posting to hiring'
    },
    {
      title: 'Interview to Hire Ratio',
      value: '2.5:1',
      change: '+0.3',
      trend: 'up',
      description: 'Number of interviews per successful hire'
    },
    {
      title: 'Cost per Hire',
      value: '₹8,500',
      change: '-₹1,200',
      trend: 'down',
      description: 'Average cost to hire one teacher'
    }
  ];

  const topPerformingJobs = [
    { title: 'Senior Mathematics Teacher', applications: 45, views: 234, hired: 2 },
    { title: 'Physics Teacher', applications: 38, views: 189, hired: 1 },
    { title: 'Computer Science Teacher', applications: 42, views: 267, hired: 3 },
    { title: 'English Literature Teacher', applications: 35, views: 156, hired: 2 },
    { title: 'Chemistry Lab Assistant', applications: 28, views: 123, hired: 1 }
  ];

  const candidateSourceData = [
    { name: 'Direct Applications', value: 35, color: '#6C5CE7' },
    { name: 'Job Portals', value: 28, color: '#00D4FF' },
    { name: 'Referrals', value: 20, color: '#00E676' },
    { name: 'Social Media', value: 12, color: '#FF9800' },
    { name: 'Campus Recruitment', value: 5, color: '#E91E63' }
  ];

  return (
    <SchoolLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Hiring Analytics</h1>
            <p className="text-gray-600">Track your recruitment performance and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#6C5CE7] text-white rounded-xl hover:bg-[#5A4FCF] transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  index === 0 ? 'bg-[#6C5CE7] bg-opacity-10' :
                  index === 1 ? 'bg-blue-100' :
                  index === 2 ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  {index === 0 && <FileText className="w-6 h-6 text-[#6C5CE7]" />}
                  {index === 1 && <Clock className="w-6 h-6 text-blue-600" />}
                  {index === 2 && <Users className="w-6 h-6 text-green-600" />}
                  {index === 3 && <TrendingUp className="w-6 h-6 text-orange-600" />}
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{metric.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
              <p className="text-sm font-medium text-gray-800 mb-2">{metric.title}</p>
              <p className="text-xs text-gray-500">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Application Trends */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Application Trends</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#6C5CE7] rounded-full"></div>
                  <span className="text-gray-600">Applications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#00E676] rounded-full"></div>
                  <span className="text-gray-600">Interviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#FF9800] rounded-full"></div>
                  <span className="text-gray-600">Hired</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line type="monotone" dataKey="applications" stroke="#6C5CE7" strokeWidth={3} dot={{ fill: '#6C5CE7', r: 4 }} />
                  <Line type="monotone" dataKey="interviews" stroke="#00E676" strokeWidth={3} dot={{ fill: '#00E676', r: 4 }} />
                  <Line type="monotone" dataKey="hired" stroke="#FF9800" strokeWidth={3} dot={{ fill: '#FF9800', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject-wise Applications */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Subject-wise Applications</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectWiseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="subject" stroke="#9CA3AF" fontSize={12} angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="applications" fill="#6C5CE7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hired" fill="#00E676" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hiring Funnel and Candidate Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Hiring Funnel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Hiring Funnel</h3>
            <div className="space-y-4">
              {hiringFunnelData.map((stage, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                    <span className="text-sm font-bold text-gray-800">{stage.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(stage.value / hiringFunnelData[0].value) * 100}%`,
                        backgroundColor: stage.color
                      }}
                    ></div>
                  </div>
                  {index < hiringFunnelData.length - 1 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Conversion: {Math.round((hiringFunnelData[index + 1].value / stage.value) * 100)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Sources */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Candidate Sources</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={candidateSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {candidateSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {candidateSourceData.map((source, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                  <span className="text-xs text-gray-600">{source.name}</span>
                  <span className="text-xs font-medium text-gray-800">{source.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Jobs */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Top Performing Job Posts</h3>
            <button className="text-[#6C5CE7] hover:text-[#5A4FCF] font-medium text-sm">
              View All Jobs
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Job Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Applications</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Views</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Hired</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingJobs.map((job, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-800">{job.title}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{job.applications}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{job.views}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="font-medium">{job.hired}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-[#6C5CE7]">
                        {Math.round((job.hired / job.applications) * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SchoolLayout>
  );
};

export default Analytics;