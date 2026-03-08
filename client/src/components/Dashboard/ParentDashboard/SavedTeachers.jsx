import React from "react";
import { User, Star, MapPin, Heart, Trash2, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTutors } from "@/services/tuitionServices";
import ParentSidebar from "./ParentSidebar";
import ParentTopbar from "./ParentTopbar";

const SavedTeachers = () => {
  // For now, we'll fetch recommended teachers as "saved" teachers
  // In a real app, you'd have a separate API for saved/bookmarked teachers
  const { data: teachersResponse, isLoading, isError } = useQuery({
    queryKey: ["saved-teachers"],
    queryFn: () => getTutors({ limit: 6 })
  });

  const savedTeachers = teachersResponse?.data || [];

  const getModeColor = (mode) => {
    switch(mode) {
      case "ONLINE": return "bg-blue-100 text-blue-600";
      case "OFFLINE": return "bg-green-100 text-green-600";
      case "HOME TUTOR": return "bg-purple-100 text-purple-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#111827] mb-2">
                Saved Teachers ({isLoading ? "..." : savedTeachers.length})
              </h2>
              <p className="text-[#6B7280]">Teachers you've bookmarked for future reference</p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#5B3DF5]" />
                <span className="ml-2 text-[#6B7280]">Loading saved teachers...</span>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-2">Error loading saved teachers</p>
                <p className="text-gray-600">Please try again later</p>
              </div>
            )}

            {/* Teachers Grid */}
            {!isLoading && !isError && savedTeachers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTeachers.map((teacher) => (
                  <div key={teacher.id} className="bg-white rounded-2xl p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {teacher.profileImage ? (
                          <img 
                            src={teacher.profileImage} 
                            alt={teacher.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-r from-[#5B3DF5] to-[#7A5CFF] rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-[#111827]">{teacher.name}</h3>
                          <p className="text-sm text-[#6B7280]">{teacher.subject}</p>
                        </div>
                      </div>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6B7280]">Experience:</span>
                        <span className="font-medium">{teacher.experience}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6B7280]">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{teacher.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6B7280]">Students:</span>
                        <span className="font-medium">{teacher.studentsCount} students</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6B7280]">Location:</span>
                        <span className="font-medium">{teacher.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{teacher.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-[#5B3DF5]">{teacher.fee}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getModeColor(teacher.mode)}`}>
                        {teacher.mode}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-[#5B3DF5] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#4B2BBF] transition-colors">
                        View Profile
                      </button>
                      <button className="flex-1 border border-[#E5E7EB] text-[#6B7280] py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Saved Teachers */}
            {!isLoading && !isError && savedTeachers.length === 0 && (
              <div className="bg-white rounded-2xl p-12 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">No Saved Teachers</h3>
                <p className="text-[#6B7280] mb-6">You haven't saved any teachers yet. Browse and save teachers you're interested in.</p>
                <button 
                  className="px-6 py-3 bg-[#5B3DF5] text-white rounded-lg hover:bg-[#4B2BBF] transition-colors"
                  onClick={() => window.location.href = '/dashboard/parent/find-teachers'}
                >
                  Find Teachers
                </button>
              </div>
            )}
          </div>

  return (
    <div className="min-h-screen bg-[#F5F6FA] font-inter">
      <div className="flex">
        {/* Sidebar */}
        <ParentSidebar />

        {/* Main Content Area */}
        <div className="ml-[260px] flex-1">
          {/* Top Navbar */}
          <ParentTopbar title="Saved Teachers" searchPlaceholder="Search saved teachers..." />

          {/* Page Content */}
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#111827] mb-2">
                Your Saved Teachers ({savedTeachers.length})
              </h2>
              <p className="text-[#6B7280]">Teachers you've bookmarked for future reference</p>
            </div>

            {savedTeachers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTeachers.map((teacher) => (
                  <div key={teacher.id} className="bg-white rounded-2xl p-5 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all">
                    {/* Teacher Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#5B3DF5] to-[#7A5CFF] rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#111827] text-sm">{teacher.name}</h3>
                          <p className="text-xs text-[#6B7280]">{teacher.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                        <button className="p-2 text-[#6B7280] hover:bg-gray-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Fee */}
                    <div className="mb-3">
                      <span className="text-lg font-bold text-[#5B3DF5]">{teacher.fee}</span>
                      <span className="text-sm text-[#6B7280]"> / hour</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">
                      {teacher.description}
                    </p>
                    
                    {/* Mode Tag */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getModeColor(teacher.mode)}`}>
                        {teacher.mode}
                      </span>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-[#6B7280] mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="font-medium">{teacher.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{teacher.location}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-[#6B7280] mb-4">
                      <span className="font-medium">{teacher.studentsCount} students</span> • {teacher.experience}
                    </div>
                    
                    {/* Saved Date */}
                    <div className="text-xs text-[#6B7280] mb-4">
                      Saved {teacher.savedDate}
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-[#5B3DF5] text-white py-2 px-3 rounded-[20px] text-xs font-medium hover:bg-[#4B2BBF] transition-colors">
                        View Profile
                      </button>
                      <button className="flex-1 border border-[#E5E7EB] text-[#6B7280] py-2 px-3 rounded-[20px] text-xs font-medium hover:bg-gray-50 transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
                <Bookmark className="h-16 w-16 mx-auto text-[#6B7280] mb-4" />
                <h3 className="text-lg font-semibold text-[#111827] mb-2">No Saved Teachers</h3>
                <p className="text-[#6B7280] mb-6">You haven't saved any teachers yet. Start exploring and save your favorites!</p>
                <Link
                  to="/dashboard/parent/find-teachers"
                  className="inline-flex items-center px-6 py-3 bg-[#5B3DF5] text-white rounded-lg hover:bg-[#4B2BBF] transition-colors"
                >
                  Find Teachers
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedTeachers;