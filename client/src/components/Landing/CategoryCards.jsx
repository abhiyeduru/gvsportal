import React from 'react';
import { 
  Monitor, 
  GraduationCap, 
  Building2, 
  Users, 
  Globe, 
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCards = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: 'Remote Teaching',
      icon: Monitor,
      color: 'bg-blue-50 text-blue-600',
      route: '/jobs?category=remote'
    },
    {
      id: 2,
      title: 'CBSE Schools',
      icon: GraduationCap,
      color: 'bg-green-50 text-green-600',
      route: '/jobs?category=cbse'
    },
    {
      id: 3,
      title: 'Junior Colleges',
      icon: Building2,
      color: 'bg-purple-50 text-purple-600',
      route: '/jobs?category=college'
    },
    {
      id: 4,
      title: 'Coaching Institutes',
      icon: Users,
      color: 'bg-orange-50 text-orange-600',
      route: '/jobs?category=coaching'
    },
    {
      id: 5,
      title: 'International Schools',
      icon: Globe,
      color: 'bg-teal-50 text-teal-600',
      route: '/jobs?category=international'
    },
    {
      id: 6,
      title: 'EdTech Companies',
      icon: BookOpen,
      color: 'bg-pink-50 text-pink-600',
      route: '/jobs?category=edtech'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Teaching Opportunities by Category
          </h2>
          <p className="text-gray-600">
            Explore teaching positions across different educational sectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => navigate(category.route)}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#4A7DFF] transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#4A7DFF] transition-colors">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#4A7DFF] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;