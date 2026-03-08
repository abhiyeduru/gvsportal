import React, { useState } from 'react';
import SchoolLayout from './SchoolLayout';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MapPin,
  Phone,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  FileText,
  MessageSquare
} from 'lucide-react';

const Interviews = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const interviews = [
    {
      id: 1,
      candidateName: 'Dr. Rajesh Kumar',
      jobTitle: 'Senior Mathematics Teacher',
      date: '2024-03-15',
      time: '10:00 AM',
      duration: '45 minutes',
      type: 'video',
      status: 'scheduled',
      interviewers: ['Principal', 'Math Dept Head'],
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      notes: 'Focus on IIT-JEE preparation experience',
      candidateEmail: 'rajesh.kumar@email.com',
      candidatePhone: '+91 9876543210',
      round: 1,
      totalRounds: 2
    },
    {
      id: 2,
      candidateName: 'Priya Sharma',
      jobTitle: 'Physics Teacher',
      date: '2024-03-16',
      time: '2:00 PM',
      duration: '30 minutes',
      type: 'in-person',
      status: 'scheduled',
      interviewers: ['Principal', 'Physics Dept Head'],
      location: 'Conference Room A',
      notes: 'Demo class required',
      candidateEmail: 'priya.sharma@email.com',
      candidatePhone: '+91 9876543211',
      round: 1,
      totalRounds: 2
    },
    {
      id: 3,
      candidateName: 'Amit Singh',
      jobTitle: 'Senior Mathematics Teacher',
      date: '2024-03-14',
      time: '11:00 AM',
      duration: '60 minutes',
      type: 'video',
      status: 'completed',
      interviewers: ['Principal', 'Math Dept Head', 'HR Manager'],
      meetingLink: 'https://meet.google.com/xyz-abc-def',
      notes: 'Excellent technical knowledge, good communication',
      candidateEmail: 'amit.singh@email.com',
      candidatePhone: '+91 9876543212',
      round: 2,
      totalRounds: 2,
      feedback: 'Strong candidate with excellent problem-solving skills. Recommended for hiring.',
      rating: 4.5
    },
    {
      id: 4,
      candidateName: 'Sunita Patel',
      jobTitle: 'English Literature Teacher',
      date: '2024-03-13',
      time: '3:00 PM',
      duration: '45 minutes',
      type: 'in-person',
      status: 'cancelled',
      interviewers: ['Principal', 'English Dept Head'],
      location: 'Conference Room B',
      notes: 'Candidate requested reschedule',
      candidateEmail: 'sunita.patel@email.com',
      candidatePhone: '+91 9876543213',
      round: 1,
      totalRounds: 1,
      cancellationReason: 'Personal emergency'
    },
    {
      id: 5,
      candidateName: 'Vikram Joshi',
      jobTitle: 'Computer Science Teacher',
      date: '2024-03-17',
      time: '4:00 PM',
      duration: '45 minutes',
      type: 'video',
      status: 'scheduled',
      interviewers: ['Principal', 'CS Dept Head'],
      meetingLink: 'https://meet.google.com/def-ghi-jkl',
      notes: 'Technical round - coding assessment',
      candidateEmail: 'vikram.joshi@email.com',
      candidatePhone: '+91 9876543214',
      round: 1,
      totalRounds: 2
    }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: interviews.filter(i => i.status === 'scheduled').length },
    { id: 'completed', label: 'Completed', count: interviews.filter(i => i.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: interviews.filter(i => i.status === 'cancelled').length },
    { id: 'all', label: 'All', count: interviews.length }
  ];

  const filteredInterviews = activeTab === 'all' ? interviews : interviews.filter(interview => interview.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type) => {
    return type === 'video' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />;
  };

  const isToday = (dateString) => {
    const today = new Date().toDateString();
    const interviewDate = new Date(dateString).toDateString();
    return today === interviewDate;
  };

  const isTomorrow = (dateString) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const interviewDate = new Date(dateString).toDateString();
    return tomorrow.toDateString() === interviewDate;
  };

  const formatDate = (dateString) => {
    if (isToday(dateString)) return 'Today';
    if (isTomorrow(dateString)) return 'Tomorrow';
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <SchoolLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Interviews</h1>
            <p className="text-gray-600">Schedule and manage candidate interviews</p>
          </div>
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="bg-[#6C5CE7] text-white px-6 py-3 rounded-xl hover:bg-[#5A4FCF] transition-colors font-medium flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Schedule Interview</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-800">{interviews.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#6C5CE7] bg-opacity-10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#6C5CE7]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{interviews.filter(i => i.status === 'scheduled').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{interviews.filter(i => i.status === 'completed').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Interviews</p>
                <p className="text-2xl font-bold text-orange-600">
                  {interviews.filter(i => isToday(i.date) && i.status === 'scheduled').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
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

          {/* Interviews List */}
          <div className="p-6">
            {filteredInterviews.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No interviews found</h3>
                <p className="text-gray-500">
                  {activeTab === 'all' ? 'No interviews scheduled yet.' : `No ${activeTab} interviews found.`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInterviews.map(interview => (
                  <div key={interview.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#8B7FE8] rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-800">{interview.candidateName}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(interview.status)}`}>
                              {getStatusIcon(interview.status)}
                              <span className="capitalize">{interview.status}</span>
                            </span>
                            {isToday(interview.date) && interview.status === 'scheduled' && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                                Today
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[#6C5CE7] font-medium mb-3">{interview.jobTitle}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(interview.date)} at {interview.time}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{interview.duration}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                {getTypeIcon(interview.type)}
                                <span className="capitalize">{interview.type}</span>
                                {interview.type === 'video' && interview.meetingLink && (
                                  <a 
                                    href={interview.meetingLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#6C5CE7] hover:underline ml-2"
                                  >
                                    Join Meeting
                                  </a>
                                )}
                                {interview.type === 'in-person' && interview.location && (
                                  <span className="text-gray-500">- {interview.location}</span>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>Interviewers: {interview.interviewers.join(', ')}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <FileText className="w-4 h-4" />
                                <span>Round {interview.round} of {interview.totalRounds}</span>
                              </div>
                              {interview.rating && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <span>Rating: {interview.rating}/5</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {interview.notes && (
                            <div className="bg-gray-50 rounded-xl p-3 mb-4">
                              <h4 className="font-medium text-gray-800 text-sm mb-1">Notes:</h4>
                              <p className="text-sm text-gray-600">{interview.notes}</p>
                            </div>
                          )}

                          {interview.feedback && (
                            <div className="bg-green-50 rounded-xl p-3 mb-4">
                              <h4 className="font-medium text-green-800 text-sm mb-1">Feedback:</h4>
                              <p className="text-sm text-green-700">{interview.feedback}</p>
                            </div>
                          )}

                          {interview.cancellationReason && (
                            <div className="bg-red-50 rounded-xl p-3 mb-4">
                              <h4 className="font-medium text-red-800 text-sm mb-1">Cancellation Reason:</h4>
                              <p className="text-sm text-red-700">{interview.cancellationReason}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Send Message">
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Call">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <span>{interview.candidateEmail}</span>
                      <span>{interview.candidatePhone}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-3">
                        {interview.status === 'scheduled' && (
                          <>
                            {interview.type === 'video' && interview.meetingLink && (
                              <a
                                href={interview.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-[#6C5CE7] text-white rounded-lg hover:bg-[#5A4FCF] transition-colors text-sm font-medium"
                              >
                                Join Meeting
                              </a>
                            )}
                            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                              Reschedule
                            </button>
                            <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                              Cancel
                            </button>
                          </>
                        )}
                        {interview.status === 'completed' && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            View Feedback
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          View Candidate Profile
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {interview.status === 'scheduled' && isToday(interview.date) && (
                          <span className="text-orange-600 font-medium">Interview Today</span>
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

export default Interviews;