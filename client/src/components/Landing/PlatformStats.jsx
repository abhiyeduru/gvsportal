import React from 'react';
import { Users, School, Briefcase, Award } from 'lucide-react';

const PlatformStats = () => {
  const stats = [
    {
      id: 1,
      number: '25K+',
      label: 'Teachers Registered',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 2,
      number: '3K+',
      label: 'Schools Hiring',
      icon: School,
      color: 'text-green-600'
    },
    {
      id: 3,
      number: '12K+',
      label: 'Jobs Posted',
      icon: Briefcase,
      color: 'text-purple-600'
    },
    {
      id: 4,
      number: '8K+',
      label: 'Successful Hires',
      icon: Award,
      color: 'text-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#4A7DFF] to-[#FF7555]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Trusted by Educators Across India
          </h2>
          <p className="text-xl text-white/90">
            Join thousands of teachers and institutions building successful careers together
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="text-center">
                <div className="mb-4">
                  <IconComponent className="w-12 h-12 text-white mx-auto mb-2" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;