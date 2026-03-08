import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-r from-[#6C5CE7] to-[#4A7DFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Hire Verified Teachers <span className="text-[#6C5CE7]">Faster</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Access verified teachers, schedule interviews, and hire within days. 
                  Our platform streamlines the entire hiring process for educational institutions.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Verified teacher profiles with background checks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-500" />
                  <span className="text-gray-700">Schedule interviews in just a few clicks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-purple-500" />
                  <span className="text-gray-700">Secure platform with data protection</span>
                </div>
              </div>

              <Button
                onClick={() => navigate('/post-job')}
                className="w-fit bg-gradient-to-r from-[#6C5CE7] to-[#4A7DFF] hover:from-[#5A4FCF] to-[#3B6EFF] text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
              >
                Post a Job
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Visual */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 lg:p-12 flex items-center justify-center">
              <div className="relative">
                {/* Teacher Cards */}
                <div className="grid grid-cols-2 gap-4 transform rotate-3">
                  <div className="bg-white rounded-xl shadow-lg p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-3"></div>
                    <h4 className="font-semibold text-gray-900">Physics Teacher</h4>
                    <p className="text-sm text-gray-600">5+ years exp</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Verified</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-4 transform rotate-6 hover:rotate-0 transition-transform duration-300 mt-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mb-3"></div>
                    <h4 className="font-semibold text-gray-900">Math Lecturer</h4>
                    <p className="text-sm text-gray-600">3+ years exp</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Verified</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-3"></div>
                    <h4 className="font-semibold text-gray-900">English Faculty</h4>
                    <p className="text-sm text-gray-600">7+ years exp</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Verified</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300 mt-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mb-3"></div>
                    <h4 className="font-semibold text-gray-900">Chemistry Prof</h4>
                    <p className="text-sm text-gray-600">4+ years exp</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBanner;