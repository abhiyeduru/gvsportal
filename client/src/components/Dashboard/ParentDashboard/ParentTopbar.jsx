import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  MessageSquare, 
  User,
  Settings,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ParentTopbar = ({ title = "Dashboard", searchPlaceholder = "Search..." }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    logout.mutate();
  };

  const handleProfileSettings = () => {
    navigate("/dashboard/parent/profile-settings");
    setShowProfileDropdown(false);
  };

  return (
    <div className="h-[70px] bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-[#111827]">{title}</h1>
      </div>
      
      {/* Center - Search Bar */}
      <div className="flex-1 max-w-[400px] mx-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B7280] h-4 w-4" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full h-[42px] pl-12 pr-4 bg-[#F1F2F6] border-0 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#5B3DF5] text-sm"
          />
        </div>
      </div>
      
      {/* Right side */}
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-[#6B7280] hover:text-[#111827] transition-colors">
          <MessageSquare className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-[#5B3DF5] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">5</span>
        </button>
        
        <button className="relative p-2 text-[#6B7280] hover:text-[#111827] transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-[#5B3DF5] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={handleProfileClick}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-[#111827]">{user?.fullName || "Abhi Parent"}</p>
              <p className="text-xs text-[#6B7280]">Parent Account</p>
            </div>
            <div className="flex items-center space-x-1">
              {user?.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full object-cover border-2 border-[#5B3DF5]"
                />
              ) : (
                <div className="h-10 w-10 bg-gradient-to-r from-[#5B3DF5] to-[#7A5CFF] rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
              <ChevronDown className="h-4 w-4 text-[#6B7280]" />
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-2 z-50">
              <button
                onClick={handleProfileSettings}
                className="w-full flex items-center px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-4 w-4 mr-3" />
                Profile Settings
              </button>
              <hr className="my-1 border-[#E5E7EB]" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentTopbar;