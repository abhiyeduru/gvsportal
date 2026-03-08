import React, { useState } from 'react';
import TeacherLayout from './TeacherDashboard/TeacherLayout';
import {
  Eye,
  MessageSquare,
  Briefcase,
  Reply,
  Calendar,
  Phone,
  TrendingUp,
  Users,
  ChevronDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

const TeacherAnalytics = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [timeRange, setTimeRange] = useState('weekly');

  // Profile Strength Data (Stacked Bar Chart)
  const profileStrengthData = [
    { day: 'Sun', sent: 30, answered: 20, hired: 10, pending: 15 },
    { day: 'Mon', sent: 45, answered: 30, hired: 15, pending: 20 },
    { day: 'Tue', sent: 35, answered: 25, hired: 12, pending: 18 },
    { day: 'Wed', sent: 50, answered: 35, hired: 18, pending: 22 },
    { day: 'Thu', sent: 40, answered: 28, hired: 14, pending: 19 },
    { day: 'Fri', sent: 55, answered: 40, hired: 20, pending: 25 },
    { day: 'Sat', sent: 25, answered: 18, hired: 8, pending: 12 },
  ];

  // Visitor Graph Data (Line Chart)
  const visitorData = [
    { time: '1', viewProfile: 120, hire: 80 },
    { time: '2', viewProfile: 150, hire: 95 },
    { time: '3', viewProfile: 180, hire: 110 },
    { time: '4', viewProfile: 140, hire: 85 },
    { time: '5', viewProfile: 200, hire: 130 },
    { time: '6', viewProfile: 170, hire: 105 },
    { time: '7', viewProfile: 220, hire: 145 },
    { time: '8', viewProfile: 190, hire: 120 },
    { time: '9', viewProfile: 240, hire: 160 },
    { time: '10', viewProfile: 210, hire: 135 },
    { time: '11', viewProfile: 260, hire: 175 },
    { time: '12', viewProfile: 230, hire: 150 },
    { time: '13', viewProfile: 280, hire: 190 },
  ];

  // Network Data (Donut Chart)
  const networkData = [
    { name: 'Following', value: 567, color: '#4C8DFF' },
    { name: 'Followers', value: 8334, color: '#FFA500' },
  ];

  // Job Trends Data
  const jobTrends = [
    { title: 'Engineer', percentage: 66, vacancies: '5,050', color: '#5B2EFF' },
    { title: 'Designer', percentage: 31, vacancies: '10,524', color: '#4C8DFF' },
    { title: 'Manager', percentage: 75, vacancies: '621', color: '#30C48D' },
    { title: 'Programmer', percentage: 62, vacancies: '9,662', color: '#FFA500' },
  ];

  // Stats Cards Data
  const statsCards = [
    {
      title: 'Profile Viewed',
      value: '456k',
      icon: Eye,
      trend: '+24% than last month',
      trendPositive: true,
      color: 'from-[#5B2EFF] to-[#7B61FF]',
    },
    {
      title: 'Unread Messages',
      value: '28',
      icon: MessageSquare,
      link: 'Go to Message',
      color: 'from-[#4C8DFF] to-[#6BA3FF]',
    },
    {
      title: 'Application Sent',
      value: '651',
      icon: Briefcase,
      color: 'from-[#FFA500] to-[#FFB733]',
    },
  ];

  const secondRowStats = [
    { title: 'App. Answered', value: '24', icon: Reply, color: '#30C48D' },
    { title: 'Interviewed', value: '261', icon: Calendar, color: '#4C8DFF' },
    { title: 'Hired', value: '69', icon: Phone, color: '#FFA500' },
  ];

  const CircularProgress = ({ percentage, color, size = 120 }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <TeacherLayout>
      <div className="p-6 bg-[#F5F6FA] min-h-screen">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Strength */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Strength Card */}
            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Profile Strength</h3>
              
              <div className="flex gap-8">
                {/* Bar Chart */}
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={profileStrengthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip />
                      <Bar dataKey="sent" stackId="a" fill="#30C48D" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="answered" stackId="a" fill="#FFA500" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="hired" stackId="a" fill="#4C8DFF" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="pending" stackId="a" fill="#E5E7EB" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#30C48D] rounded"></div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">30%</p>
                      <p className="text-xs text-gray-500">Application Sent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#FFA500] rounded"></div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">46%</p>
                      <p className="text-xs text-gray-500">Application Answered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#4C8DFF] rounded"></div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">14%</p>
                      <p className="text-xs text-gray-500">Hired</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#E5E7EB] rounded"></div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">10%</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row Stats */}
            <div className="grid grid-cols-3 gap-6">
              {secondRowStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-3xl p-6 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Visitor Graph */}
            <div className="bg-white rounded-3xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Visitor Graph</h3>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={showDetails}
                      onChange={(e) => setShowDetails(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#5B2EFF]"
                    />
                    Show Details
                  </label>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B2EFF]"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#5B2EFF] rounded-full"></div>
                  <span className="text-sm text-gray-600">View Profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#4C8DFF] rounded-full"></div>
                  <span className="text-sm text-gray-600">Hire</span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="viewProfile"
                    stroke="#5B2EFF"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hire"
                    stroke="#4C8DFF"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Job Trends */}
            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Job Trends</h3>
              <div className="grid grid-cols-4 gap-6">
                {jobTrends.map((job, index) => (
                  <div key={index} className="text-center">
                    <CircularProgress percentage={job.percentage} color={job.color} size={120} />
                    <h4 className="text-lg font-bold text-gray-800 mt-4">{job.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {job.vacancies} Vacancy
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats Cards */}
            {statsCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <p className="text-sm opacity-90 mb-2">{card.title}</p>
                  <p className="text-4xl font-bold mb-3">{card.value}</p>
                  {card.trend && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">{card.trend}</span>
                    </div>
                  )}
                  {card.link && (
                    <button className="text-sm underline hover:no-underline">
                      {card.link}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Network Card */}
            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Network</h3>
              
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={networkData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {networkData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">23%</span>
                  </div>
                </div>

                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-[#4C8DFF] rounded"></div>
                      <span className="text-sm text-gray-600">Following</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">567</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-7">Companies</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-[#FFA500] rounded"></div>
                      <span className="text-sm text-gray-600">Followers</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">8,334</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-7">Person</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherAnalytics;
