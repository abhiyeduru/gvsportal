import React from "react";
import { 
  Search, 
  Home,
  Sparkles,
  Bookmark,
  Users,
  ClipboardList,
  MessageSquare,
  Calendar,
  CreditCard,
  Settings,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ParentSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout.mutate();
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", to: "/dashboard/parent" },
    { icon: Search, label: "Find Teachers", to: "/dashboard/parent/find-teachers" },
    { icon: Sparkles, label: "Recommended Teachers", to: "/dashboard/parent/recommended-teachers" },
    { icon: Bookmark, label: "Saved Teachers", to: "/dashboard/parent/saved-teachers" },
    { icon: Users, label: "My Tutors", to: "/dashboard/parent/my-tutors" },
    { icon: ClipboardList, label: "Tuition Requests", to: "/dashboard/parent/tuition-requests" },
    { icon: MessageSquare, label: "Messages", to: "/dashboard/parent/messages" },
    { icon: Calendar, label: "Demo Classes", to: "/dashboard/parent/demo-classes" },
    { icon: CreditCard, label: "Payments", to: "/dashboard/parent/payments" },
    { icon: Settings, label: "Profile Settings", to: "/dashboard/parent/profile-settings" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard/parent") {
      return location.pathname === "/dashboard/parent";
    }
    return location.pathname === path;
  };

  return (
    <div className="w-[260px] bg-[#4B2BBF] min-h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo Area */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#4B2BBF] font-bold text-lg">G</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">GRAVITY</h1>
            <p className="text-purple-200 text-sm">Find Best Tutors</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="px-4 py-6 flex-1 flex flex-col">
        <div className="space-y-2 flex-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-[10px] transition-all text-sm font-medium ${
                isActive(item.to)
                  ? "bg-white/15 text-white" 
                  : "text-purple-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        {/* Logout Button at Bottom */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-[10px] transition-all text-sm font-medium text-purple-200 hover:bg-red-500/20 hover:text-red-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ParentSidebar;