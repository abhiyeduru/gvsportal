import React, { useState } from 'react';
import SchoolLayout from './SchoolLayout';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const JobPosts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const jobPosts = [
    {
      id: 1,
      title: 'Senior Mathematics Teacher',
      subject: 'Mathematics',
      type: 'Full Time',
      location: 'Delhi',
      salary: '₹35,000 - ₹50,000',
      postedDate: '2024-03-01',
      deadline: '2024-03-15',
      status: 'active',
      applications: 24,
      views: 156,
      classLevels: ['Secondary (9-10)', 'Senior Secondary (11-12)'],
      description: 'We are looking for an experienced Mathematics teacher to join our team...'
    },
    {
      id: 2,
      title: 'Physics Teacher',
      subject: 'Physics',
      type: 'Full Time',
      location: 'Delhi',
      salary: '₹30,000 - ₹45,000',
      postedDate: '2024-02-28',
      deadline: '2024-03-12',
      status: 'active',
      applications: 18,
      views: 89,
      classLevels: ['Senior Secondary (11-12)'],
      description: 'Seeking a qualified Physics teacher for senior secondary classes...'
    },
    {
      id: 3,
      title: 'English Literature Teacher',
      subject: 'English',
      type: 'Part Time',
      location: 'Delhi',
      salary: '₹20,000 - ₹30,000',
      postedDate: '2024-02-25',
      deadline: '2024-03-10',
      status: 'closed',
      applications: 31,
      views: 203,
      classLevels: ['Middle (6-8)', 'Secondary (9-10)'],
      description: 'Part-time English Literature teacher position available...'
    },
    {
      id: 4,
      title: 'Chemistry Lab Assistant',
      subject: 'Chemistry',
      type: 'Contract',
      location: 'Delhi',
      salary: '₹25,000 - ₹35,000',
      postedDate: '2024-02-20',
      deadline: '2024-03-05',
      status: 'expired',
      applications: 12,
      views: 67,
      classLevels: ['Secondary (9-10)', 'Senior Secondary (11-12)'],
      description: 'Contract position for Chemistry lab assistant...'
    },
    {
      id: 5,
      title: 'Computer Science Teacher',
      subject: 'Computer Science',
      type: 'Full Time',
      location: 'Delhi',
      salary: '₹40,000 - ₹60,000',
      postedDate: '2024-03-03',
      deadline: '2024-03-18',
      status: 'draft',
      applications: 0,
      views: 0,
      classLevels: ['Middle (6-8)', 'Secondary (9-10)', 'Senior Secondary (11-12)'],
      description: 'Looking for a dynamic Computer Science teacher...'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Jobs', count: jobPosts.length },
    { id: 'active', label: 'Active', count: jobPosts.filter(job => job.status === 'active').length },
    { id: 'draft', label: 'Draft', count: jobPosts.filter(job => job.status === 'draft').length },
    { id: 'closed', label: 'Closed', count: jobPosts.filter(job => job.status === 'closed').length },
    { id: 'expired', label: 'Expired', count: jobPosts.filter(job => job.status === 'expired').length }
  ];

  const filteredJobs = activeTab === 'all' ? jobPosts : jobPosts.filter(job => job.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'closed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <AlertCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAction = (action, jobId) => {
    console.log(`${action} job ${jobId}`);
    setShowDropdown(null);
  };

  return (
    <SchoolLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Job Posts</h1>
            <p className="text-gray-600">Manage your job postings and track applications</p>
          </div>
          <button className="bg-[#6C5CE7] text-white px-6 py-3 rounded-xl hover:bg-[#5A4FCF] transition-colors font-medium">
            Post New Job
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-800">{jobPosts.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#6C5CE7] bg-opacity-10 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-[#6C5CE7]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Jobs</p>
                <p className="text-2xl font-bold text-green-600">{jobPosts.filter(job => job.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold text-blue-600">{jobPosts.reduce((sum, job) => sum + job.applications, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-bold text-orange-600">{jobPosts.reduce((sum, job) => sum + job.views, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-100">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#6C5CE7] border-b-2 border-[#6C5CE7]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Job Posts List */}
          <div className="p-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No jobs found</h3>
                <p className="text-gray-500">
                  {activeTab === 'all' ? 'You haven\'t posted any jobs yet.' : `No ${activeTab} jobs found.`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(job.status)}`}>
                            {getStatusIcon(job.status)}
                            <span className="capitalize">{job.status}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.subject}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.classLevels.map((level, index) => (
                            <span key={index} className="px-2 py-1 bg-[#6C5CE7] bg-opacity-10 text-[#6C5CE7] text-xs rounded-full">
                              {level}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                      </div>

                      <div className="flex items-center space-x-4 ml-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-800">{job.applications}</p>
                          <p className="text-xs text-gray-500">Applications</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-800">{job.views}</p>
                          <p className="text-xs text-gray-500">Views</p>
                        </div>
                        
                        <div className="relative">
                          <button
                            onClick={() => setShowDropdown(showDropdown === job.id ? null : job.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                          </button>
                          
                          {showDropdown === job.id && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                              <button
                                onClick={() => handleAction('view', job.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View Details</span>
                              </button>
                              <button
                                onClick={() => handleAction('edit', job.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Edit Job</span>
                              </button>
                              <button
                                onClick={() => handleAction('applications', job.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                              >
                                <Users className="w-4 h-4" />
                                <span>View Applications</span>
                              </button>
                              <hr className="my-2" />
                              <button
                                onClick={() => handleAction('delete', job.id)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete Job</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#6C5CE7] text-white rounded-lg hover:bg-[#5A4FCF] transition-colors text-sm font-medium">
                          View Applications ({job.applications})
                        </button>
                        <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Edit Job
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {job.status === 'active' && (
                          <span className="text-green-600 font-medium">
                            {Math.max(0, Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24)))} days left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SchoolLayout>
  );
};

export default JobPosts;