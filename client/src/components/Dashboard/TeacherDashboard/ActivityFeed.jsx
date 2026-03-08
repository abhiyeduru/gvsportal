import React from 'react';
import {
  CheckCircle,
  XCircle,
  Calendar,
  MessageCircle,
  Star,
  Book,
  Bell,
  ArrowDown,
} from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  const getIcon = (iconName) => {
    const icons = {
      'check-circle': CheckCircle,
      'x-circle': XCircle,
      calendar: Calendar,
      'message-circle': MessageCircle,
      star: Star,
      book: Book,
      bell: Bell,
    };
    return icons[iconName] || Bell;
  };

  const getIconColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      gray: 'bg-gray-100 text-gray-600',
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h3>

      <div className="space-y-4">
        {activities && activities.length > 0 ? (
          activities.map((activity, index) => {
            const Icon = getIcon(activity.icon);
            const iconColor = getIconColor(activity.color);

            return (
              <div
                key={activity.id || index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {activity.title}
                  </p>
                  {activity.subtitle && (
                    <p className="text-xs text-gray-500 truncate">
                      {activity.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent activities</p>
          </div>
        )}
      </div>

      {/* View All Button */}
      {activities && activities.length > 0 && (
        <button className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
          <ArrowDown className="w-4 h-4" />
          <span className="text-sm font-medium">View All</span>
        </button>
      )}
    </div>
  );
};

export default ActivityFeed;
