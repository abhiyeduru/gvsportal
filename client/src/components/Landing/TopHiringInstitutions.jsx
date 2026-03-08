import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopHiringInstitutions = () => {
  const navigate = useNavigate();

  const institutions = [
    {
      id: 1,
      name: 'Delhi Public School',
      location: 'Hyderabad',
      jobs: '5 Teaching Jobs',
      logo: 'DPS',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'Narayana Junior College',
      location: 'Bangalore',
      jobs: '8 Teaching Jobs',
      logo: 'NJC',
      color: 'bg-green-600'
    },
    {
      id: 3,
      name: 'Sri Chaitanya School',
      location: 'Mumbai',
      jobs: '12 Teaching Jobs',
      logo: 'SCS',
      color: 'bg-purple-600'
    },
    {
      id: 4,
      name: 'FIITJEE Institute',
      location: 'Delhi',
      jobs: '6 Teaching Jobs',
      logo: 'FJE',
      color: 'bg-orange-600'
    },
    {
      id: 5,
      name: 'Kendriya Vidyalaya',
      location: 'Chennai',
      jobs: '4 Teaching Jobs',
      logo: 'KVS',
      color: 'bg-teal-600'
    },
    {
      id: 6,
      name: 'Ryan International',
      location: 'Pune',
      jobs: '7 Teaching Jobs',
      logo: 'RIS',
      color: 'bg-pink-600'
    }
  ];

  return (
    <section className="py-12 bg-[#F7F8FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Top Institutions Hiring Now
          </h2>
          <p className="text-gray-600">
            Leading educational institutions actively recruiting teachers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutions.map((institution) => (
            <div
              key={institution.id}
              onClick={() => navigate(`/institution/${institution.id}`)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#4A7DFF] transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${institution.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{institution.logo}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#4A7DFF] transition-colors mb-2">
                    {institution.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{institution.location}</span>
                  </div>
                  
                  <div className="flex items-center text-[#4A7DFF]">
                    <Briefcase className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{institution.jobs}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-[#4A7DFF] hover:bg-[#3B6EFF] text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  View Jobs
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/institutions')}
            className="bg-white border border-[#4A7DFF] text-[#4A7DFF] hover:bg-[#4A7DFF] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View All Institutions
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopHiringInstitutions;