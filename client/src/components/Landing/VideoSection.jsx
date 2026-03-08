import React from 'react';
import { Play, Users, Award, Clock } from 'lucide-react';

const VideoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              A Platform Where Teachers Build Their Careers
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Gravity helps teachers find the right schools and institutions hire the best educators quickly. 
              Join thousands of successful educators who have built their careers with us.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#4A7DFF] rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Connect with top educational institutions</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#FF7555] rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Get verified and showcase your expertise</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#4A7DFF] rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Fast-track your hiring process</span>
              </div>
            </div>

            <button className="bg-[#4A7DFF] hover:bg-[#3B6EFF] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Your Journey
            </button>
          </div>

          {/* Right Side - Video Thumbnail */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#4A7DFF] to-[#FF7555] rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-black/20 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors group">
                  <Play className="w-8 h-8 text-[#4A7DFF] ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              {/* Video Overlay Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">How Gravity Works</h4>
                  <p className="text-sm text-gray-600">See how teachers and schools connect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;