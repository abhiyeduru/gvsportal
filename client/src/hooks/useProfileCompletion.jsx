import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getProfileStatus,
  getProfile,
  getRequiredFields,
  completeProfile,
  updateProfile,
  uploadProfilePicture
} from '@/services/profileServices';

export const useProfileCompletion = () => {
  const queryClient = useQueryClient();

  // Get profile status
  const {
    data: statusData,
    isLoading: statusLoading,
    error: statusError,
    refetch: refetchStatus
  } = useQuery({
    queryKey: ['profileStatus'],
    queryFn: getProfileStatus,
    retry: 1,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Get profile data
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
    refetch: refetchProfile
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    retry: 1,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Get required fields
  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    error: fieldsError
  } = useQuery({
    queryKey: ['requiredFields'],
    queryFn: getRequiredFields,
    retry: 1,
    staleTime: 1000 * 60 * 60 // 1 hour
  });

  // Complete profile mutation
  const completeProfileMutation = useMutation({
    mutationFn: completeProfile,
    onSuccess: (data) => {
      toast.success(data.message || 'Profile completed successfully!');
      queryClient.invalidateQueries({ queryKey: ['profileStatus'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      return data;
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to complete profile');
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message || 'Profile updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['profileStatus'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      return data;
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile');
    }
  });

  // Upload profile picture mutation
  const uploadPictureMutation = useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: (data) => {
      toast.success('Profile picture uploaded successfully!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      return data;
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to upload profile picture');
    }
  });

  return {
    // Status
    profileCompleted: statusData?.profileCompleted || false,
    completionPercentage: statusData?.completionPercentage || 0,
    missingFields: statusData?.missingFields || [],
    statusLoading,
    statusError,
    refetchStatus,

    // Profile data
    profile: profileData?.user,
    profileLoading,
    profileError,
    refetchProfile,

    // Required fields
    requiredFields: fieldsData?.fields || [],
    fieldsLoading,
    fieldsError,

    // Mutations
    completeProfile: completeProfileMutation.mutate,
    isCompletingProfile: completeProfileMutation.isPending,
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    uploadProfilePicture: uploadPictureMutation.mutate,
    isUploadingPicture: uploadPictureMutation.isPending
  };
};
