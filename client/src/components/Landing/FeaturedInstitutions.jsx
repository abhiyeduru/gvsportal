import React from 'react';
import { MapPin, Briefcase, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedInstitutions = () => {
  const navigate = useNavigate();

  const institutions = [
    {
      id: 1,
      name: 'Delhi Public School',
      location: 'Hyderabad',
      jobs: 5,
      rating: 4.8,
      logo: 'DPS',
      type: 'CBSE School',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Sri Chaitanya College',
      location: 'Bangalore',
      jobs: 8,
      rating: 4.6,
      logo: 'SCC',
      type: 'Junior College',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      name: 'Narayana Junior College',
      location: 'Chennai',
      jobs: 6,
      rating: 4.7,
      logo: 'NJC',
      type: 'Junior College',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      name: 'Kendriya Vidyalaya',
      location: 'Mumbai',
      jobs: 4,
      rating: 4.9,
      logo: 'KV',
      type: 'Central School',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      name: 'FIITJEE Institute',
      location: 'Delhi',
      jobs: 7,
      rating: 4.5,
      logo: 'FJE',
      type: 'Coaching Institute',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 6,
      name: 'Akash Institute',
      location: 'Pune',
      jobs: 9,
      rating: 4.4,
      logo: 'AKS',
      type: 'Coaching Institute',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top Hiring Institutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join prestigious educational institutions that are actively hiring qualified teachers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutions.map((institution) => (
            <div
              key={institution.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group"
              onClick={() => navigate(`/school/jobs/${institution.id}`)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${institution.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">{institution.logo}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{institution.rating}</span>
                  </div>
                </div>

                {/* Institution Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-[#6C5CE7] transition-colors duration-200">
                    {institution.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{institution.type}</p>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{institution.location}</span>
                  </div>

                  <div className="flex items-center text-[#6C5CE7]">
                    <Briefcase className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{institution.jobs} Teaching Jobs</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">View opportunities</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#6C5CE7] group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/schools')}
            className="bg-gradient-to-r from-[#6C5CE7] to-[#4A7DFF] hover:from-[#5A4FCF] to-[#3B6EFF] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            View All Institutions
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInstitutions;