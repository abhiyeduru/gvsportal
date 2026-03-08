import React, { useState } from 'react';
import SchoolLayout from './SchoolLayout';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Download,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';

const Applications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

  const applications = [
    {
      id: 1,
      applicantName: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543210',
      jobTitle: 'Senior Mathematics Teacher',
      jobId: 1,
      appliedDate: '2024-03-05',
      status: 'pending',
      experience: '8 years',
      qualification: 'Ph.D Mathematics',
      currentSalary: '₹45,000',
      expectedSalary: '₹55,000',
      location: 'Delhi',
      rating: 4.9,
      resumeUrl: '/resumes/rajesh-kumar.pdf',
      coverLetter: 'I am excited to apply for the Senior Mathematics Teacher position...',
      skills: ['IIT-JEE Preparation', 'CBSE Curriculum', 'Advanced Mathematics'],
      languages: ['English', 'Hindi'],
      availability: 'Immediate'
    },
    {
      id: 2,
      applicantName: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      jobTitle: 'Physics Teacher',
      jobId: 2,
      appliedDate: '2024-03-04',
      status: 'shortlisted',
      experience: '5 years',
      qualification: 'M.Sc Physics',
      currentSalary: '₹35,000',
      expectedSalary: '₹42,000',
      location: 'Mumbai',
      rating: 4.7,
      resumeUrl: '/resumes/priya-sharma.pdf',
      coverLetter: 'With 5 years of experience in teaching Physics...',
      skills: ['NEET Preparation', 'Laboratory Management', 'Physics Experiments'],
      languages: ['English', 'Hindi', 'Marathi'],
      availability: '2 weeks notice'
    },
    {
      id: 3,
      applicantName: 'Amit Singh',
      email: 'amit.singh@email.com',
      phone: '+91 9876543212',
      jobTitle: 'Senior Mathematics Teacher',
      jobId: 1,
      appliedDate: '2024-03-03',
      status: 'interviewed',
      experience: '6 years',
      qualification: 'M.Sc Mathematics, B.Ed',
      currentSalary: '₹40,000',
      expectedSalary: '₹50,000',
      location: 'Delhi',
      rating: 4.8,
      resumeUrl: '/resumes/amit-singh.pdf',
      coverLetter: 'I am passionate about mathematics education...',
      skills: ['Competitive Exam Prep', 'Online Teaching', 'Curriculum Development'],
      languages: ['English', 'Hindi'],
      availability: '1 month notice'
    },
    {
      id: 4,
      applicantName: 'Sunita Patel',
      email: 'sunita.patel@email.com',
      phone: '+91 9876543213',
      jobTitle: 'English Literature Teacher',
      jobId: 3,
      appliedDate: '2024-03-02',
      status: 'rejected',
      experience: '4 years',
      qualification: 'M.A English Literature',
      currentSalary: '₹30,000',
      expectedSalary: '₹35,000',
      location: 'Chennai',
      rating: 4.6,
      resumeUrl: '/resumes/sunita-patel.pdf',
      coverLetter: 'I have a deep passion for English literature...',
      skills: ['Creative Writing', 'Public Speaking', 'Drama & Theatre'],
      languages: ['English', 'Hindi', 'Tamil'],
      availability: 'Immediate'
    }
  ];

  const jobs = [
    { id: 1, title: 'Senior Mathematics Teacher' },
    { id: 2, title: 'Physics Teacher' },
    { id: 3, title: 'English Literature Teacher' },
    { id: 4, title: 'Chemistry Lab Assistant' }
  ];

  const tabs = [
    { id: 'all', label: 'All Applications', count: applications.length },
    { id: 'pending', label: 'Pending', count: applications.filter(app => app.status === 'pending').length },
    { id: 'shortlisted', label: 'Shortlisted', count: applications.filter(app => app.status === 'shortlisted').length },
    { id: 'interviewed', label: 'Interviewed', count: applications.filter(app => app.status === 'interviewed').length },
    { id: 'rejected', label: 'Rejected', count: applications.filter(app => app.status === 'rejected').length }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesTab = activeTab === 'all' || app.status === activeTab;
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJob = !selectedJob || app.jobId.toString() === selectedJob;
    
    return matchesTab && matchesSearch && matchesJob;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-blue-100 text-blue-800';
      case 'interviewed': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'shortlisted': return <CheckCircle className="w-4 h-4" />;
      case 'interviewed': return <Users className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (applicationId, newStatus) => {
    console.log(`Changing status of application ${applicationId} to ${newStatus}`);
    // Handle status change logic
  };

  return (
    <SchoolLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Applications</h1>
          <p className="text-gray-600">Review and manage teacher applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold text-gray-800">{applications.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#6C5CE7] bg-opacity-10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#6C5CE7]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{applications.filter(app => app.status === 'pending').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Shortlisted</p>
                <p className="text-2xl font-bold text-blue-600">{applications.filter(app => app.status === 'shortlisted').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Interviewed</p>
                <p className="text-2xl font-bold text-purple-600">{applications.filter(app => app.status === 'interviewed').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
              />
            </div>

            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
            >
              <option value="">All Job Positions</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id.toString()}>{job.title}</option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent">
                <option>Sort by Date</option>
                <option>Sort by Rating</option>
                <option>Sort by Experience</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm transition-colors relative whitespace-nowrap ${
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

          {/* Applications List */}
          <div className="p-6">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No applications found</h3>
                <p className="text-gray-500">No applications match your current filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map(application => (
                  <div key={application.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#8B7FE8] rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-800">{application.applicantName}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(application.status)}`}>
                              {getStatusIcon(application.status)}
                              <span className="capitalize">{application.status}</span>
                            </span>
                          </div>
                          
                          <p className="text-[#6C5CE7] font-medium mb-2">{application.jobTitle}</p>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{application.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{application.rating}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-gray-500">Experience:</span>
                              <p className="font-medium">{application.experience}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Qualification:</span>
                              <p className="font-medium">{application.qualification}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Current Salary:</span>
                              <p className="font-medium">{application.currentSalary}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Expected Salary:</span>
                              <p className="font-medium">{application.expectedSalary}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {application.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-[#6C5CE7] bg-opacity-10 text-[#6C5CE7] text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download Resume">
                          <Download className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Send Message">
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Call">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Email">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{application.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{application.phone}</span>
                      </div>
                      <div>
                        <span>Availability: {application.availability}</span>
                      </div>
                    </div>

                    {/* Cover Letter Preview */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">Cover Letter</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{application.coverLetter}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#6C5CE7] text-white rounded-lg hover:bg-[#5A4FCF] transition-colors text-sm font-medium">
                          View Full Profile
                        </button>
                        {application.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(application.id, 'shortlisted')}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              Shortlist
                            </button>
                            <button 
                              onClick={() => handleStatusChange(application.id, 'rejected')}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {application.status === 'shortlisted' && (
                          <button 
                            onClick={() => handleStatusChange(application.id, 'interviewed')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                          >
                            Schedule Interview
                          </button>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        Languages: {application.languages.join(', ')}
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

export default Applications;