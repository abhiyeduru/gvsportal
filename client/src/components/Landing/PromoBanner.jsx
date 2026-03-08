import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PromoBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 bg-[#F7F8FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#4A7DFF] to-[#FF7555] rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hire Verified Teachers Faster with Gravity
              </h2>
              <p className="text-xl mb-6 text-white/90">
                Access qualified teachers, schedule interviews, and hire the best educators for your institution.
              </p>
              
              {/* Badge Features */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Verified Teachers</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Instant Applications</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Interview Scheduling</span>
                </div>
              </div>

              <Button
                onClick={() => navigate('/post-job')}
                className="bg-white text-[#4A7DFF] hover:bg-gray-100 font-semibold px-8 py-3 rounded-full"
              >
                Post a Teaching Job
              </Button>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-64 bg-white/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-16 h-16 mx-auto mb-4 text-white/60" />
                    <p className="text-white/80">Teacher Hiring Illustration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;