import React from 'react';
import { UserPlus, Search, MessageCircle, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up and create a detailed profile showcasing your qualifications, experience, and teaching expertise.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      number: '2',
      icon: Search,
      title: 'Search Jobs or Teachers',
      description: 'Browse through thousands of teaching opportunities or find qualified teachers using our advanced search filters.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      number: '3',
      icon: MessageCircle,
      title: 'Apply or Connect',
      description: 'Apply for positions that match your skills or connect directly with teachers through our messaging system.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      number: '4',
      icon: CheckCircle,
      title: 'Schedule Interview & Hire',
      description: 'Schedule interviews, conduct assessments, and make hiring decisions all through our integrated platform.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How Gravity Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple 4-step process makes it easy for teachers and institutions to connect and succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-gray-700">{step.number}</span>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2">
                      <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`${step.bgColor} rounded-2xl p-6 h-full`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-3xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Gravity?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Verified profiles and background checks</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">AI-powered matching algorithm</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Secure payment and contract management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">24/7 customer support</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#6C5CE7] to-[#4A7DFF] rounded-full mb-4">
                <span className="text-4xl font-bold text-white">G</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Trusted Platform
              </h4>
              <p className="text-gray-600">
                Join thousands of satisfied users who have found success with Gravity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;