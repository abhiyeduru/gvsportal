import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { RefreshCw } from 'lucide-react';

/**
 * Route wrapper that ensures user has completed their profile
 * Redirects to /complete-profile if profile is not complete
 */
const ProfileCompletionRoute = ({ children }) => {
  const navigate = useNavigate();
  const { profileCompleted, statusLoading, statusError } = useProfileCompletion();

  useEffect(() => {
    if (!statusLoading && !profileCompleted) {
      navigate('/complete-profile', { replace: true });
    }
  }, [profileCompleted, statusLoading, navigate]);

  if (statusLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="animate-spin h-10 w-10 stroke-primary mx-auto mb-4" />
          <p className="text-gray-600">Checking profile status...</p>
        </div>
      </div>
    );
  }

  if (statusError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error checking profile status</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profileCompleted) {
    return null; // Will redirect via useEffect
  }

  return children;
};

export default ProfileCompletionRoute;
