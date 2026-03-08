import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventsSection = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: 'National Teacher Hiring Drive',
      institution: 'Delhi Public School',
      date: '15 March 2024',
      time: '10:00 AM',
      location: 'Hyderabad',
      subjects: ['Physics', 'Mathematics'],
      type: 'Hiring Drive',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 2,
      title: 'CBSE Faculty Recruitment',
      institution: 'Narayana Group',
      date: '22 March 2024',
      time: '2:00 PM',
      location: 'Bangalore',
      subjects: ['Chemistry', 'Biology'],
      type: 'Walk-in Interview',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 3,
      title: 'Online Teaching Opportunities',
      institution: 'BYJU\'S',
      date: '28 March 2024',
      time: '11:00 AM',
      location: 'Virtual Event',
      subjects: ['All Subjects'],
      type: 'Virtual Hiring',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 4,
      title: 'International School Recruitment',
      institution: 'Ryan International',
      date: '5 April 2024',
      time: '9:00 AM',
      location: 'Mumbai',
      subjects: ['English', 'Social Studies'],
      type: 'Campus Drive',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Teaching Events & Hiring Drives
          </h2>
          <p className="text-lg text-gray-600">
            Don't miss these exclusive hiring opportunities from top educational institutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className={`${event.color} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group`}
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#4A7DFF] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-700 font-medium mb-2">{event.institution}</p>
                </div>
                <span className="bg-[#4A7DFF] text-white text-xs px-3 py-1 rounded-full">
                  {event.type}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  <span className="text-sm">{event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">Subjects: {event.subjects.join(', ')}</span>
                </div>
              </div>

              <button className="w-full bg-[#4A7DFF] hover:bg-[#3B6EFF] text-white py-2 px-4 rounded-lg font-medium transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/events')}
            className="bg-white border border-[#4A7DFF] text-[#4A7DFF] hover:bg-[#4A7DFF] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;