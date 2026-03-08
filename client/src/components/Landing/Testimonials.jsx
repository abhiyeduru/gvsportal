import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      position: 'Principal',
      institution: 'Delhi Public School, Hyderabad',
      avatar: 'RK',
      rating: 5,
      text: 'Gravity helped us hire qualified teachers within days. The platform\'s verification process ensures we get the best candidates for our institution.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'Physics Teacher',
      institution: 'Found job through Gravity',
      avatar: 'PS',
      rating: 5,
      text: 'I found my dream teaching job within a week of joining Gravity. The platform made the entire process smooth and hassle-free.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      name: 'Mr. Anil Patel',
      position: 'Director',
      institution: 'Narayana Junior College',
      avatar: 'AP',
      rating: 5,
      text: 'The quality of teachers we\'ve hired through Gravity is exceptional. Their screening process saves us time and ensures quality hires.',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      position: 'Mathematics Lecturer',
      institution: 'Sri Chaitanya College',
      avatar: 'SR',
      rating: 5,
      text: 'Gravity connected me with the perfect institution that values my teaching methodology. Highly recommend for all educators.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      name: 'Dr. Vikram Singh',
      position: 'Academic Head',
      institution: 'FIITJEE Institute',
      avatar: 'VS',
      rating: 5,
      text: 'We\'ve been using Gravity for over a year now. The platform consistently delivers high-quality teacher candidates.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 6,
      name: 'Kavya Nair',
      position: 'English Faculty',
      institution: 'Kendriya Vidyalaya',
      avatar: 'KN',
      rating: 5,
      text: 'The support team at Gravity is amazing. They helped me throughout my job search and made sure I found the right fit.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Schools Say About Gravity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from educators and institutions who have found success on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4">
                <Quote className="w-6 h-6 text-gray-300" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center mr-4 shadow-lg`}>
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-xs text-gray-500">{testimonial.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-gradient-to-r from-[#6C5CE7] to-[#4A7DFF] rounded-3xl p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">4.8/5</div>
              <div className="text-white/90">Average Rating</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-white/90">Happy Users</div>
            </div>
            
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-white/90">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;