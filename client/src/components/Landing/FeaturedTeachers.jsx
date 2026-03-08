import React from 'react';
import { Star, MapPin, GraduationCap, Eye, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedTeachers = () => {
  const navigate = useNavigate();

  const teachers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      subject: 'Physics Teacher',
      experience: '5 years experience',
      rating: 4.9,
      location: 'Hyderabad',
      avatar: 'RS',
      color: 'from-blue-500 to-blue-600',
      specialization: 'IIT-JEE Physics'
    },
    {
      id: 2,
      name: 'Priya Patel',
      subject: 'Mathematics Lecturer',
      experience: '7 years experience',
      rating: 4.8,
      location: 'Mumbai',
      avatar: 'PP',
      color: 'from-purple-500 to-purple-600',
      specialization: 'Advanced Mathematics'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      subject: 'Chemistry Professor',
      experience: '6 years experience',
      rating: 4.7,
      location: 'Delhi',
      avatar: 'AK',
      color: 'from-green-500 to-green-600',
      specialization: 'Organic Chemistry'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      subject: 'English Faculty',
      experience: '4 years experience',
      rating: 4.9,
      location: 'Bangalore',
      avatar: 'SR',
      color: 'from-orange-500 to-orange-600',
      specialization: 'Literature & Grammar'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      subject: 'Computer Science',
      experience: '8 years experience',
      rating: 4.6,
      location: 'Pune',
      avatar: 'VS',
      color: 'from-teal-500 to-teal-600',
      specialization: 'Programming & AI'
    },
    {
      id: 6,
      name: 'Kavya Nair',
      subject: 'Biology Teacher',
      experience: '3 years experience',
      rating: 4.8,
      location: 'Chennai',
      avatar: 'KN',
      color: 'from-pink-500 to-pink-600',
      specialization: 'NEET Biology'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top Verified Teachers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with highly qualified and experienced teachers ready to join your institution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group"
            >
              <div className="p-6">
                {/* Teacher Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${teacher.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">{teacher.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#6C5CE7] transition-colors duration-200">
                      {teacher.name}
                    </h3>
                    <p className="text-[#6C5CE7] font-medium">{teacher.subject}</p>
                  </div>
                </div>

                {/* Teacher Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span className="text-sm">{teacher.experience}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{teacher.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-700">{teacher.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{teacher.specialization}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/teacher/${teacher.id}`)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Profile
                  </button>
                  <button
                    onClick={() => navigate(`/hire/${teacher.id}`)}
                    className="flex-1 bg-gradient-to-r from-[#6C5CE7] to-[#4A7DFF] hover:from-[#5A4FCF] to-[#3B6EFF] text-white py-2 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Hire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/teachers')}
            className="bg-gradient-to-r from-[#6C5CE7] to-[#4A7DFF] hover:from-[#5A4FCF] to-[#3B6EFF] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            View All Teachers
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTeachers;