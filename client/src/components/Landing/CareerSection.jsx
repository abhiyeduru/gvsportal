import React from 'react';
import { GraduationCap, Users, Award, Monitor, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CareerSection = () => {
  const navigate = useNavigate();

  const careers = [
    {
      id: 1,
      title: 'School Teachers',
      description: 'K-12 teaching positions',
      icon: GraduationCap,
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
      iconColor: 'text-blue-600',
      route: '/jobs?level=school'
    },
    {
      id: 2,
      title: 'Junior Lecturers',
      description: 'College level teaching',
      icon: Users,
      color: 'bg-green-50 border-green-200 hover:border-green-400',
      iconColor: 'text-green-600',
      route: '/jobs?level=junior'
    },
    {
      id: 3,
      title: 'College Professors',
      description: 'University positions',
      icon: Award,
      color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
      iconColor: 'text-purple-600',
      route: '/jobs?level=professor'
    },
    {
      id: 4,
      title: 'Online Tutors',
      description: 'Remote teaching roles',
      icon: Monitor,
      color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
      iconColor: 'text-orange-600',
      route: '/jobs?level=tutor'
    },
    {
      id: 5,
      title: 'EdTech Trainers',
      description: 'Digital education roles',
      icon: BookOpen,
      color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
      iconColor: 'text-teal-600',
      route: '/jobs?level=edtech'
    }
  ];

  return (
    <section className="py-16 bg-[#F7F8FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Teaching Opportunities for Every Level
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From fresh graduates to experienced educators, find the perfect teaching role that matches your expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {careers.map((career) => {
            const IconComponent = career.icon;
            return (
              <div
                key={career.id}
                onClick={() => navigate(career.route)}
                className={`${career.color} border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg group`}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <IconComponent className={`w-12 h-12 ${career.iconColor} mx-auto`} />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#4A7DFF] transition-colors">
                    {career.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600">
                    {career.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/jobs')}
            className="bg-[#4A7DFF] hover:bg-[#3B6EFF] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Explore All Opportunities
          </button>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;