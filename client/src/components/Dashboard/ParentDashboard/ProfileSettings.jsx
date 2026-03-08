import React from "react";
import { User, Camera, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ParentSidebar from "./ParentSidebar";
import ParentTopbar from "./ParentTopbar";

const ProfileSettings = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F5F6FA] font-inter">
      <div className="flex">
        <ParentSidebar />

        <div className="ml-[260px] flex-1">
          <ParentTopbar title="Profile Settings" />

          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#111827] mb-2">Personal Information</h2>
                <p className="text-[#6B7280]">Update your profile information and preferences</p>
              </div>

              <div className="bg-white rounded-2xl shadow-[0px_8px_24px_rgba(0,0,0,0.06)] p-6">
                {/* Profile Picture Section */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="relative">
                    {user?.profilePic ? (
                      <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-[#5B3DF5]" />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-r from-[#5B3DF5] to-[#7A5CFF] rounded-full flex items-center justify-center">
                        <User className="h-12 w-12 text-white" />
                      </div>
                    )}
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#5B3DF5] rounded-full flex items-center justify-center text-white hover:bg-[#4B2BBF] transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827]">{user?.fullName || "Abhi Parent"}</h3>
                    <p className="text-[#6B7280]">Parent Account</p>
                    <button className="mt-2 text-[#5B3DF5] text-sm font-medium hover:underline">
                      Change Profile Picture
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">Full Name</label>
                    <input type="text" defaultValue={user?.fullName || "Abhi Parent"} className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF5] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">Email Address</label>
                    <input type="email" defaultValue={user?.email || "abhi@example.com"} className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF5] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">Phone Number</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF5] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">Location</label>
                    <input type="text" defaultValue="Hyderabad, India" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF5] focus:border-transparent" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#111827] mb-2">Child's Grade/Class</label>
                    <select className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF5] focus:border-transparent">
                      <option>Class 10</option>
                      <option>Class 9</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#111827] mb-2">Preferred Subjects</label>
                    <div className="flex flex-wrap gap-2">
                      {["Physics", "Mathematics", "Chemistry", "Biology", "English"].map((subject) => (
                        <button key={subject} className="px-3 py-1 bg-[#5B3DF5] text-white rounded-full text-sm hover:bg-[#4B2BBF] transition-colors">
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-8 flex justify-end">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-[#5B3DF5] text-white rounded-lg hover:bg-[#4B2BBF] transition-colors">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;