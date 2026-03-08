import React from "react";
import { User, Video, Clock, Calendar } from "lucide-react";
import ParentSidebar from "./ParentSidebar";
import ParentTopbar from "./ParentTopbar";

const DemoClasses = () => {

  const demoClasses = [
    { id: 1, teacher: "Rahul Sharma", subject: "Physics", date: "Today", time: "4:00 PM", status: "Scheduled", duration: "30 min" },
    { id: 2, teacher: "Priya Singh", subject: "Mathematics", date: "Tomorrow", time: "10:00 AM", status: "Confirmed", duration: "45 min" },
    { id: 3, teacher: "Amit Kumar", subject: "Chemistry", date: "Dec 15", time: "2:00 PM", status: "Completed", duration: "30 min" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Scheduled": return "bg-blue-100 text-blue-600";
      case "Confirmed": return "bg-green-100 text-green-600";
      case "Completed": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] font-inter">
      <div className="flex">
        <ParentSidebar />

        <div className="ml-[260px] flex-1">
          <ParentTopbar title="Demo Classes" searchPlaceholder="Search demo classes..." />

          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#111827] mb-2">Your Demo Classes ({demoClasses.length})</h2>
              <p className="text-[#6B7280]">Manage your scheduled and completed demo classes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoClasses.map((demo) => (
                <div key={demo.id} className="bg-white rounded-2xl p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#5B3DF5] to-[#7A5CFF] rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#111827]">{demo.teacher}</h3>
                        <p className="text-sm text-[#6B7280]">{demo.subject}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(demo.status)}`}>
                      {demo.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm text-[#111827]">{demo.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm text-[#111827]">{demo.time} ({demo.duration})</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {demo.status === "Scheduled" || demo.status === "Confirmed" ? (
                      <button className="flex-1 bg-[#5B3DF5] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#4B2BBF] transition-colors flex items-center justify-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>Join Class</span>
                      </button>
                    ) : (
                      <button className="flex-1 border border-[#E5E7EB] text-[#6B7280] py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    )}
                    <button className="flex-1 border border-[#E5E7EB] text-[#6B7280] py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoClasses;