import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolLayout from './SchoolLayout';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  User, 
  GraduationCap,
  Award,
  Clock,
  Heart,
  MessageSquare
} from 'lucide-react';

const SearchTeachers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 
    'Hindi', 'History', 'Geography', 'Computer Science', 'Economics'
  ];

  const experienceRanges = [
    '0-2 years', '2-5 years', '5-10 years', '10+ years'
  ];

  const locations = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  const teachers = [
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
      profileImage: null
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
      profileImage: null
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
      profileImage: null
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
      profileImage: null
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
      profileImage: null
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || teacher.subject === selectedSubject;
    const matchesLocation = !selectedLocation || teacher.location === selectedLocation;
    
    return matchesSearch && matchesSubject && matchesLocation;
  });

  return (
    <SchoolLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Search Teachers</h1>
          <p className="text-gray-600">Find the perfect teachers for your institution</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
              />
            </div>

            {/* Subject Filter */}
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

            {/* Experience Filter */}
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
            >
              <option value="">All Experience</option>
              {experienceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredTeachers.length} teachers
          </p>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]">
              <option>Sort by Rating</option>
              <option>Sort by Experience</option>
              <option>Sort by Price</option>
            </select>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
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

              {/* Status and Verification */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${teacher.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium">{teacher.availability}</span>
                </div>
                {teacher.verified && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                    <Award className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => navigate(`/dashboard/school/teacher/${teacher.id}`)}
                  className="flex-1 bg-[#6C5CE7] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#5A4FCF] transition-colors"
                >
                  View Profile
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredTeachers.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-6 py-3 border border-[#6C5CE7] text-[#6C5CE7] rounded-xl hover:bg-[#6C5CE7] hover:text-white transition-colors">
              Load More Teachers
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No teachers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </SchoolLayout>
  );
};

export default SearchTeachers;