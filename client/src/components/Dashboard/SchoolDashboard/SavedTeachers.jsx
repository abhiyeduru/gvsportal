import React, { useState } from 'react';
import SchoolLayout from './SchoolLayout';
import { 
  Bookmark, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  User,
  Heart,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Award,
  BookOpen,
  Trash2,
  Eye
} from 'lucide-react';

const SavedTeachers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 
    'Hindi', 'History', 'Geography', 'Computer Science', 'Economics'
  ];

  const folders = [
    { id: 'all', name: 'All Saved', count: 12 },
    { id: 'favorites', name: 'Favorites', count: 5 },
    { id: 'contacted', name: 'Contacted', count: 8 },
    { id: 'interviewed', name: 'Interviewed', count: 3 },
    { id: 'shortlisted', name: 'Shortlisted', count: 4 }
  ];

  const savedTeachers = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      subject: 'Physics',
      experience: '8 years',
      qualification: 'Ph.D Physics',
      rating: 4.9,
      location: 'Delhi',
      hourlyRate: '₹800/hour',
      availability: 'Available',
      verified: true,
      specializations: ['IIT-JEE', 'NEET', 'Class 11-12'],
      languages: ['English', 'Hindi'],
      profileImage: null,
      savedDate: '2024-03-01',
      folder: 'favorites',
      contacted: true,
      notes: 'Excellent for advanced physics concepts',
      lastActivity: '2 days ago'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      subject: 'Mathematics',
      experience: '5 years',
      qualification: 'M.Sc Mathematics',
      rating: 4.7,
      location: 'Mumbai',
      hourlyRate: '₹600/hour',
      availability: 'Available',
      verified: true,
      specializations: ['CBSE', 'ICSE', 'Class 9-12'],
      languages: ['English', 'Hindi', 'Marathi'],
      profileImage: null,
      savedDate: '2024-02-28',
      folder: 'contacted',
      contacted: true,
      notes: 'Great with problem-solving techniques',
      lastActivity: '1 week ago'
    },
    {
      id: 3,
      name: 'Amit Singh',
      subject: 'Chemistry',
      experience: '6 years',
      qualification: 'M.Sc Chemistry',
      rating: 4.8,
      location: 'Bangalore',
      hourlyRate: '₹700/hour',
      availability: 'Busy',
      verified: true,
      specializations: ['NEET', 'JEE', 'Class 11-12'],
      languages: ['English', 'Hindi'],
      profileImage: null,
      savedDate: '2024-02-25',
      folder: 'interviewed',
      contacted: true,
      notes: 'Strong in organic chemistry',
      lastActivity: '3 days ago'
    },
    {
      id: 4,
      name: 'Sunita Patel',
      subject: 'Biology',
      experience: '4 years',
      qualification: 'M.Sc Biology',
      rating: 4.6,
      location: 'Chennai',
      hourlyRate: '₹550/hour',
      availability: 'Available',
      verified: false,
      specializations: ['NEET', 'CBSE', 'Class 11-12'],
      languages: ['English', 'Hindi', 'Tamil'],
      profileImage: null,
      savedDate: '2024-02-20',
      folder: 'shortlisted',
      contacted: false,
      notes: 'Good for NEET preparation',
      lastActivity: '5 days ago'
    },
    {
      id: 5,
      name: 'Vikram Joshi',
      subject: 'English',
      experience: '7 years',
      qualification: 'M.A English Literature',
      rating: 4.5,
      location: 'Pune',
      hourlyRate: '₹500/hour',
      availability: 'Available',
      verified: true,
      specializations: ['CBSE', 'ICSE', 'Class 6-12'],
      languages: ['English', 'Hindi', 'Marathi'],
      profileImage: null,
      savedDate: '2024-02-15',
      folder: 'favorites',
      contacted: false,
      notes: 'Excellent communication skills',
      lastActivity: '1 day ago'
    }
  ];

  const filteredTeachers = savedTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || teacher.subject === selectedSubject;
    const matchesFolder = selectedFolder === 'all' || teacher.folder === selectedFolder;
    
    return matchesSearch && matchesSubject && matchesFolder;
  });

  const handleRemoveFromSaved = (teacherId) => {
    console.log(`Removing teacher ${teacherId} from saved`);
    // Handle remove logic
  };

  const handleContactTeacher = (teacherId) => {
    console.log(`Contacting teacher ${teacherId}`);
    // Handle contact logic
  };

  const handleMoveToFolder = (teacherId, folder) => {
    console.log(`Moving teacher ${teacherId} to folder ${folder}`);
    // Handle move logic
  };

  return (
    <SchoolLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Saved Teachers</h1>
          <p className="text-gray-600">Manage your saved teacher profiles and shortlists</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Saved</p>
                <p className="text-2xl font-bold text-gray-800">{savedTeachers.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#6C5CE7] bg-opacity-10 rounded-xl flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-[#6C5CE7]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Favorites</p>
                <p className="text-2xl font-bold text-red-600">{savedTeachers.filter(t => t.folder === 'favorites').length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Contacted</p>
                <p className="text-2xl font-bold text-green-600">{savedTeachers.filter(t => t.contacted).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Now</p>
                <p className="text-2xl font-bold text-blue-600">{savedTeachers.filter(t => t.availability === 'Available').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Folders */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Folders</h3>
              <div className="space-y-2">
                {folders.map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                      selectedFolder === folder.id
                        ? 'bg-[#6C5CE7] text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="font-medium">{folder.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedFolder === folder.id
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {folder.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search saved teachers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
                  />
                </div>

                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent">
                    <option>Sort by Date Saved</option>
                    <option>Sort by Rating</option>
                    <option>Sort by Experience</option>
                    <option>Sort by Last Activity</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Teachers Grid */}
            {filteredTeachers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No saved teachers found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or save some teachers to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTeachers.map((teacher) => (
                  <div key={teacher.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    {/* Teacher Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#8B7FE8] rounded-full flex items-center justify-center">
                          {teacher.profileImage ? (
                            <img src={teacher.profileImage} alt={teacher.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <User className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{teacher.name}</h3>
                          <p className="text-sm text-gray-500">{teacher.subject} Teacher</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromSaved(teacher.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Teacher Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Experience:</span>
                        <span className="font-medium">{teacher.experience}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Qualification:</span>
                        <span className="font-medium">{teacher.qualification}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{teacher.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Location:</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{teacher.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Rate:</span>
                        <span className="font-bold text-[#6C5CE7]">{teacher.hourlyRate}</span>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {teacher.specializations.map((spec, index) => (
                          <span key={index} className="px-2 py-1 bg-[#6C5CE7] bg-opacity-10 text-[#6C5CE7] text-xs rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {teacher.notes && (
                      <div className="bg-gray-50 rounded-xl p-3 mb-4">
                        <p className="text-xs text-gray-500 mb-1">Notes:</p>
                        <p className="text-sm text-gray-700">{teacher.notes}</p>
                      </div>
                    )}

                    {/* Status and Verification */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${teacher.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-medium">{teacher.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {teacher.verified && (
                          <div className="flex items-center space-x-1 bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                            <Award className="w-3 h-3" />
                            <span>Verified</span>
                          </div>
                        )}
                        {teacher.contacted && (
                          <div className="flex items-center space-x-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                            <MessageSquare className="w-3 h-3" />
                            <span>Contacted</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Saved Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Saved: {new Date(teacher.savedDate).toLocaleDateString()}</span>
                      <span>Last activity: {teacher.lastActivity}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-[#6C5CE7] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#5A4FCF] transition-colors">
                        View Profile
                      </button>
                      {!teacher.contacted ? (
                        <button 
                          onClick={() => handleContactTeacher(teacher.id)}
                          className="px-4 py-2 border border-[#6C5CE7] text-[#6C5CE7] rounded-lg hover:bg-[#6C5CE7] hover:text-white transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Move to Folder */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <select
                        value={teacher.folder}
                        onChange={(e) => handleMoveToFolder(teacher.id, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
                      >
                        <option value="favorites">Favorites</option>
                        <option value="contacted">Contacted</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                      </select>
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

export default SavedTeachers;