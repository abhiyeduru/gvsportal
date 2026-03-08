import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TeacherLayout from './TeacherDashboard/TeacherLayout';
import axiosInstance from '@/lib/axiosInstance';
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
      
      if (response.data.success) {
        setJob(response.data.job);
        setIsSaved(response.data.isSaved);
        setAlreadyApplied(response.data.alreadyApplied);
      }
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
          {/* Left Column - Company Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-md overflow-hidden sticky top-6">
              {/* Company Banner */}
              <div className="h-32 bg-gradient-to-br from-[#5B2EFF] to-[#7B61FF] relative">
                {job.company.banner && (
                  <img
                    src={job.company.banner}
                    alt="Company banner"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Company Logo */}
              <div className="px-6 -mt-12 relative z-10">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                  {job.company.logo ? (
                    <img
                      src={job.company.logo}
                      alt={job.company.displayName}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-[#5B2EFF]" />
                  )}
                </div>
              </div>

              {/* Company Info */}
              <div className="p-6 pt-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {job.company.displayName}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{job.company.subtitle}</p>

                <button className="w-full bg-[#5B2EFF] text-white py-3 rounded-xl font-semibold hover:bg-[#4A25CC] transition-all mb-6">
                  Following
                </button>

                {/* Company Stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-[#5B2EFF]" />
                    <span className="text-sm">{job.company.employees} Employee</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Star className="w-5 h-5 text-[#FFA500] fill-[#FFA500]" />
                    <span className="text-sm">
                      {job.company.rating} ({job.company.reviews} Reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-[#5B2EFF]" />
                    <span className="text-sm">{job.company.location}</span>
                  </div>
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
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <span className="font-medium">{job.company.name}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">{getTimeAgo(job.postedAt)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleApply}
                    disabled={alreadyApplied}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                      alreadyApplied
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#5B2EFF] text-white hover:bg-[#4A25CC]'
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                    {alreadyApplied ? 'ALREADY APPLIED' : 'APPLY NOW'}
                  </button>
                  <button
                    onClick={handleSave}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isSaved
                        ? 'bg-red-50 text-red-500'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Job Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-[#F5F6FA] rounded-2xl">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-xs">Work Level</span>
                  </div>
                  <p className="font-semibold text-gray-800">{job.workLevel}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Min Experience</span>
                  </div>
                  <p className="font-semibold text-gray-800">{job.minExperience}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Employee Type</span>
                  </div>
                  <p className="font-semibold text-gray-800">{job.employeeType}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Salary</span>
                  </div>
                  <p className="font-semibold text-gray-800">{job.salary}</p>
                </div>
              </div>

              {/* Overview Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
              </div>

              {/* Requirements Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Job Requirements</h2>
                {job.requirements && job.requirements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {job.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#30C48D] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{requirement}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No specific requirements listed</p>
                )}
              </div>

              {/* Gallery Section */}
              {job.company.gallery && job.company.gallery.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Gallery</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {job.company.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-gray-200 rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                      >
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Placeholder Gallery */}
              {(!job.company.gallery || job.company.gallery.length === 0) && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Gallery</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center"
                      >
                        <Building2 className="w-12 h-12 text-gray-400" />
                      </div>
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
