import React from 'react';
import { Calendar, Briefcase, Users, Mail } from 'lucide-react';

const StatsGrid = ({ stats }) => {
  const cards = [
    {
      icon: Calendar,
      title: 'Interviews Schedule',
      value: stats?.pendingApplications || 0,
      subtitle: `${stats?.applicationsSent || 0} total applications`,
      gradient: 'from-purple-500 to-purple-700',
    },
    {
      icon: Briefcase,
      title: 'Application Sent',
      value: stats?.applicationsSent || 0,
      subtitle: `${stats?.pendingApplications || 0} pending review`,
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: Users,
      title: 'Profile Viewed',
      value: stats?.jobOpportunities || 0,
      subtitle: `${stats?.activeClasses || 0} active classes`,
      gradient: 'from-green-400 to-green-600',
    },
    {
      icon: Mail,
      title: 'Unread Message',
      value: stats?.unreadMessages || 0,
      subtitle: `${stats?.messagesFromSchools || 0} from schools`,
      gradient: 'from-lime-400 to-lime-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm font-medium opacity-90 mb-2">
                  {card.title}
                </p>
                <p className="text-4xl font-bold mb-2">{card.value}</p>
                <p className="text-xs opacity-75">{card.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
