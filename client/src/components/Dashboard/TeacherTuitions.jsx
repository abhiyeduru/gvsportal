import React, { useState, useEffect } from 'react';
import TeacherLayout from './TeacherDashboard/TeacherLayout';
import axiosInstance from '@/lib/axiosInstance';
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  BookOpen,
  Video,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

const TeacherTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTuitions();
  }, []);

  const fetchTuitions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/teacher/tuitions');
      setTuitions(response.data.tuitions || []);
    } catch (error) {
      console.error('Error fetching tuitions:', error);
      // Mock data for development
      setTuitions([
        {
          id: 1,
          studentName: 'Rahul Sharma',
          subject: 'Physics',
          grade: 'Class 12',
          status: 'active',
          mode: 'online',
          schedule: 'Mon, Wed, Fri - 4:00 PM',
          duration: '1 hour',
          fee: '₹800/hour',
          startDate: '2024-01-15',
          studentContact: '+91 9876543210',
          parentName: 'Mr. Sharma',
          location: 'Mumbai, Maharashtra'
        },
        {
          id: 2,
          studentName: 'Priya Singh',
          subject: 'Mathematics',
          grade: 'Class 10',
          status: 'pending',
          mode: 'offline',
          schedule: 'Tue, Thu, Sat - 6:00 PM',
          duration: '1.5 hours',
          fee: '₹600/hour',
          startDate: '2024-02-01',
          studentContact: '+91 9876543211',
          parentName: 'Mrs. Singh',
          location: 'Delhi, India'
        },
        {
          id: 3,
          studentName: 'Amit Kumar',
          subject: 'Chemistry',
          grade: 'Class 11',
          status: 'completed',
          mode: 'online',
          schedule: 'Daily - 5:00 PM',
          duration: '1 hour',
          fee: '₹700/hour',
          startDate: '2023-12-01',
          studentContact: '+91 9876543212',
          parentName: 'Mr. Kumar',
          location: 'Bangalore, Karnataka'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredTuitions = tuitions.filter(tuition => {
    const matchesFilter = filter === 'all' || tuition.status === filter;
    const matchesSearch = tuition.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tuition.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <TeacherLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B2EFF]"></div>
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <div className="p-6 bg-[#F5F6FA] min-h-screen">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Tuitions</h1>
          <p className="text-gray-600">Manage your ongoing and completed tuition sessions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Tuitions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tuitions.filter(t => t.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tuitions.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tuitions.filter(t => t.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">₹45,600</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students or subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tuitions List */}
        <div className="space-y-4">
          {filteredTuitions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No tuitions found</h3>
              <p className="text-gray-400">
                {searchQuery || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'You haven\'t started any tuitions yet'
                }
              </p>
            </div>
          ) : (
            filteredTuitions.map((tuition) => (
              <div key={tuition.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {tuition.studentName}
                        </h3>
                        <p className="text-gray-600">{tuition.subject} • {tuition.grade}</p>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tuition.status)}`}>
                        {getStatusIcon(tuition.status)}
                        <span className="capitalize">{tuition.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{tuition.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{tuition.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        {tuition.mode === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                        <span className="capitalize">{tuition.mode}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Star className="w-4 h-4" />
                        <span>{tuition.fee}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <p><strong>Parent:</strong> {tuition.parentName}</p>
                          <p><strong>Location:</strong> {tuition.location}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Started: {new Date(tuition.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:ml-6">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#5B2EFF] text-white rounded-lg hover:bg-[#4B1ECC] transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Phone className="w-4 h-4" />
                      Call
                    </button>
                    {tuition.status === 'pending' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherTuitions;