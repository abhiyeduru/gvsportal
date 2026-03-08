import React, { useState } from "react";
import { 
  MapPin,
  ChevronRight,
  User,
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  Star,
  Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTutors } from "@/services/tuitionServices";
import ParentSidebar from "./ParentSidebar";
import ParentTopbar from "./ParentTopbar";

const FindTeachers = () => {
  const [filters, setFilters] = useState({
    subject: "",
    city: "",
    experience: "",
    mode: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState({
    online: false,
    offline: false,
    verified: false,
    rating: false
  });

  // Fetch teachers data using React Query
  const { data: teachersResponse, isLoading, isError, error } = useQuery({
    queryKey: ["teachers", filters, searchQuery],
    queryFn: () => getTutors({ 
      ...filters, 
      search: searchQuery,
      page: currentPage,
      limit: 12 
    }),
    keepPreviousData: true
  });

  const teachers = teachersResponse?.data || [];
  const totalTeachers = teachersResponse?.total || 0;

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] font-inter">
        <div className="flex">
          <ParentSidebar />
          <div className="ml-[260px] flex-1">
            <ParentTopbar title="Find Teachers" searchPlaceholder="Search teachers, subjects..." />
            <div className="p-6 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-600 mb-2">Error loading teachers</p>
                <p className="text-gray-600">{error?.message || "Please try again later"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] font-inter">
      <div className="flex">
        <ParentSidebar />

        <div className="ml-[260px] flex-1">
          <ParentTopbar title="Find Teachers" searchPlaceholder="Search teachers, subjects..." />

          <div className="p-6">
            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 min-w-[150px]">
                  <MapPin className="h-4 w-4 text-[#6B7280]" />
                  <select 
                    className="border-0 focus:outline-none text-sm"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                  >
                    <option value="">Around You</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search by subject, teacher name, or keyword..."
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF5] text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <button 
                  className="flex items-center space-x-2 px-4 py-3 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 text-sm"
                  onClick={() => setShowFilters(prev => ({ ...prev, showPanel: !prev.showPanel }))}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                
                <button 
                  className="px-6 py-3 bg-[#5B3DF5] text-white rounded-lg hover:bg-[#4B2BBF] transition-colors text-sm font-medium"
                  onClick={handleSearch}
                >
                  Find
                </button>
              </div>
            </div>

            {/* Suggestion Tags */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {["Your Subject", "Math Teacher", "Physics Teacher", "Chemistry Teacher", "English Tutor", "Programming Teacher"].map((tag, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">
                  {isLoading ? "Loading..." : `Showing ${teachers.length} Teachers Results`}
                </h2>
                <p className="text-sm text-[#6B7280]">Based on your preferences</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Filter Toggles */}
                <div className="flex items-center space-x-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      showFilters.online ? 'bg-[#5B3DF5] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => setShowFilters(prev => ({ ...prev, online: !prev.online }))}
                  >
                    Online
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      showFilters.offline ? 'bg-[#5B3DF5] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => setShowFilters(prev => ({ ...prev, offline: !prev.offline }))}
                  >
                    Offline
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      showFilters.verified ? 'bg-[#5B3DF5] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => setShowFilters(prev => ({ ...prev, verified: !prev.verified }))}
                  >
                    Verified
                  </button>
                </div>
                
                {/* Sort Dropdown */}
                <select 
                  className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
                  value={filters.sortBy || "newest"}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_low">Lowest Price</option>
                  <option value="price_high">Highest Price</option>
                </select>
                
                {/* View Mode Toggle */}
                <div className="flex items-center border border-[#E5E7EB] rounded-lg">
                  <button
                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#5B3DF5] text-white' : 'text-gray-600'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    className={`p-2 ${viewMode === 'list' ? 'bg-[#5B3DF5] text-white' : 'text-gray-600'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#5B3DF5]" />
                <span className="ml-2 text-[#6B7280]">Loading teachers...</span>
              </div>
            )}

            {/* Teachers Grid */}
            {!isLoading && teachers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="bg-white rounded-2xl p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-3 mb-4">
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
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#111827]">{teacher.name}</h3>
                        <p className="text-sm text-[#6B7280]">{teacher.subject}</p>
                      </div>
                      {teacher.verified && (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      )}
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
                      <span className="text-lg font-bold text-[#5B3DF5]">{teacher.fee}/hour</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        teacher.mode === 'ONLINE' ? 'bg-blue-100 text-blue-600' :
                        teacher.mode === 'OFFLINE' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {teacher.mode}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-[#5B3DF5] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#4B2BBF] transition-colors">
                        View Profile
                      </button>
                      <button className="flex-1 border border-[#E5E7EB] text-[#6B7280] py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        Book Demo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && teachers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#6B7280] mb-2">No teachers found matching your criteria</p>
                <p className="text-sm text-[#6B7280]">Try adjusting your filters or search terms</p>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && teachers.length > 0 && (
              <div className="flex items-center justify-center space-x-2">
                <button 
                  className="flex items-center space-x-1 px-4 py-2 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 text-sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg text-sm font-medium ${
                      currentPage === page 
                        ? 'bg-[#5B3DF5] text-white' 
                        : 'border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  className="flex items-center space-x-1 px-4 py-2 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 text-sm"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTeachers;