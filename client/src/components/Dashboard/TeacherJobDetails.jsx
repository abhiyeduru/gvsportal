import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TeacherLayout from './TeacherDashboard/TeacherLayout';
import axiosInstance from '@/lib/axiosInstance';
import { useAuth } from '@/hooks/useAuth';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Star,
  Heart,
  Share2,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle,
  Calendar,
} from 'lucide-react';

const TeacherJobDetails = () => {
  const { user } = useAuth();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/jobs/${jobId}/job-data`);
      
      console.log('Job data fetched:', response.data);
      console.log('Current user:', user);
      console.log('User role:', user?.role);
      
      setJob(response.data);
      
      // Check if user has already applied
      try {
        const appStatusResponse = await axiosInstance.get(`/applications/jobs/${jobId}/check`);
        console.log('Application status:', appStatusResponse.data);
        if (appStatusResponse.data.success) {
          setAlreadyApplied(appStatusResponse.data.hasApplied);
        }
      } catch (err) {
        console.error('Error checking application status:', err);
        // Don't fail the whole page if this check fails
      }
      
      setIsSaved(false);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError(error.response?.data?.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (alreadyApplied) {
      alert('You have already applied for this job');
      return;
    }

    // Navigate to application form page
    navigate(`/dashboard/teacher/jobs/${jobId}/apply`);
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(`/jobs/${jobId}/save`);
      
      if (response.data.success) {
        setIsSaved(response.data.isSaved);
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert(error.response?.data?.message || 'Failed to save job');
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title}`,
        url: url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('Job link copied to clipboard!');
    }
  };

  const getTimeAgo = (date) => {
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `Posted ${days} days ago`;
  };

  if (loading) {
    return (
      <TeacherLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B2EFF]"></div>
        </div>
      </TeacherLayout>
    );
  }

  if (error || !job) {
    return (
      <TeacherLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">{error || 'Job not found'}</p>
            <button
              onClick={() => navigate('/dashboard/teacher/jobs')}
              className="text-[#5B2EFF] hover:underline"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <div className="p-6 bg-[#F5F6FA] min-h-screen">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard/teacher/jobs')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#5B2EFF] transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Search Jobs</span>
          </button>
          <p className="text-sm text-gray-500">
            Search Job / {job.title}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - School Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-md overflow-hidden sticky top-6">
              {/* School Banner */}
              <div className="h-32 bg-gradient-to-br from-[#5B2EFF] to-[#7B61FF] relative">
              </div>

              {/* School Logo */}
              <div className="px-6 -mt-12 relative z-10">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                  <Building2 className="w-12 h-12 text-[#5B2EFF]" />
                </div>
              </div>

              {/* School Info */}
              <div className="p-6 pt-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {job.companyName || 'School Name'}
                </h3>
                <p className="text-sm text-gray-500 mb-4">Educational Institution</p>

                {/* School Stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-[#5B2EFF]" />
                    <span className="text-sm">{job.location?.city}, {job.location?.country}</span>
                  </div>
                  {job.subject && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Briefcase className="w-5 h-5 text-[#5B2EFF]" />
                      <span className="text-sm">Subject: {job.subject}</span>
                    </div>
                  )}
                  {job.classLevels && job.classLevels.length > 0 && (
                    <div className="flex items-col gap-3 text-gray-600">
                      <Users className="w-5 h-5 text-[#5B2EFF] flex-shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {job.classLevels.map((level, idx) => (
                          <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-md">
              {/* Job Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <span className="font-medium">{job.companyName}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">{getTimeAgo(job.postedAt)}</span>
                </div>

                {/* Action Buttons - Made more prominent */}
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={handleApply}
                    disabled={alreadyApplied}
                    className={`px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 shadow-lg ${
                      alreadyApplied
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#5B2EFF] text-white hover:bg-[#4A25CC] hover:shadow-xl'
                    }`}
                  >
                    <Briefcase className="w-6 h-6" />
                    {alreadyApplied ? 'ALREADY APPLIED' : 'APPLY NOW'}
                  </button>
                  <button
                    onClick={handleSave}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-md ${
                      isSaved
                        ? 'bg-red-50 text-red-500'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isSaved ? 'fill-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-14 h-14 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all shadow-md"
                  >
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Job Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-[#F5F6FA] rounded-2xl">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-xs">Job Type</span>
                  </div>
                  <p className="font-semibold text-gray-800 capitalize">{job.jobType || 'Not specified'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Experience</span>
                  </div>
                  <p className="font-semibold text-gray-800">{job.experience || 'Not specified'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Work Mode</span>
                  </div>
                  <p className="font-semibold text-gray-800 capitalize">{job.workFrom || 'On-site'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Salary</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {job.salaryRange?.min && job.salaryRange?.max 
                      ? `₹${parseInt(job.salaryRange.min).toLocaleString()} - ₹${parseInt(job.salaryRange.max).toLocaleString()}`
                      : 'Not specified'}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              {(job.workingHours || job.applicationDeadline || job.startDate) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-blue-50 rounded-2xl">
                  {job.workingHours && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">Working Hours</span>
                      </div>
                      <p className="font-semibold text-gray-800">{job.workingHours}</p>
                    </div>
                  )}
                  {job.applicationDeadline && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">Application Deadline</span>
                      </div>
                      <p className="font-semibold text-gray-800">
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {job.startDate && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">Start Date</span>
                      </div>
                      <p className="font-semibold text-gray-800">
                        {new Date(job.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Overview Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description || 'No description provided'}</p>
              </div>

              {/* Requirements Section */}
              {job.requirements && job.requirements.length > 0 && job.requirements[0] && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Requirements</h2>
                  <div className="space-y-3">
                    {job.requirements.map((requirement, index) => (
                      requirement && (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#30C48D] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{requirement}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Responsibilities Section */}
              {job.responsibilities && job.responsibilities.length > 0 && job.responsibilities[0] && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Key Responsibilities</h2>
                  <div className="space-y-3">
                    {job.responsibilities.map((responsibility, index) => (
                      responsibility && (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#5B2EFF] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{responsibility}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits Section */}
              {job.benefits && job.benefits.length > 0 && job.benefits[0] && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Benefits</h2>
                  <div className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      benefit && (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#FFA500] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherJobDetails;
