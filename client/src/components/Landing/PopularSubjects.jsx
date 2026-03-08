import React from 'react';
import { Calculator, Atom, TestTube, Dna, BookOpen, Monitor, DollarSign, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PopularSubjects = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      name: 'Mathematics',
      icon: Calculator,
      jobs: '2,450',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      route: '/jobs?subject=mathematics'
    },
    {
      name: 'Physics',
      icon: Atom,
      jobs: '1,890',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      route: '/jobs?subject=physics'
    },
    {
      name: 'Chemistry',
      icon: TestTube,
      jobs: '1,650',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      route: '/jobs?subject=chemistry'
    },
    {
      name: 'Biology',
      icon: Dna,
      jobs: '1,420',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      route: '/jobs?subject=biology'
    },
    {
      name: 'English',
      icon: BookOpen,
      jobs: '2,100',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      route: '/jobs?subject=english'
    },
    {
      name: 'Computer Science',
      icon: Monitor,
      jobs: '1,780',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      route: '/jobs?subject=computer-science'
    },
    {
      name: 'Commerce',
      icon: DollarSign,
      jobs: '1,320',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      route: '/jobs?subject=commerce'
    },
    {
      name: 'Economics',
      icon: TrendingUp,
      jobs: '980',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      route: '/jobs?subject=economics'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popular Teaching Subjects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore teaching opportunities in high-demand subjects across India
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(subject.route)}
                className={`${subject.bgColor} rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group text-center`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {subject.name}
                </h3>
                
                <p className="text-2xl font-bold text-[#6C5CE7] mb-1">
                  {subject.jobs}
                </p>
                
                <p className="text-sm text-gray-600">
                  Jobs Available
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/jobs')}
            className="bg-gradient-to-r from-[#6C5CE7] to-[#4A7DFF] hover:from-[#5A4FCF] to-[#3B6EFF] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            View All Subjects
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularSubjects;