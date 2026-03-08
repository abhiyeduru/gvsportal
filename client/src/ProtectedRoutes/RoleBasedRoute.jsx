import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RoleBasedRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  const roleMap = {
    jobSeeker: "teacher",
    recruiter: "school",
    teacher: "teacher",
    school: "school",
    parent: "parent",
    admin: "admin",
  };

  const effectiveRole = roleMap[user?.role] || user?.role;

  if (!isLoading && isAuthenticated && effectiveRole !== allowedRole) {
    console.log(`RoleBasedRoute: effectiveRole=${effectiveRole}, allowedRole=${allowedRole}. Redirecting to /unauthorized`);
    return <Navigate to="/unauthorized" replace />; // Handle unauthorized
  }
  return children;
};

RoleBasedRoute.propTypes = {
  allowedRole: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RoleBasedRoute;
