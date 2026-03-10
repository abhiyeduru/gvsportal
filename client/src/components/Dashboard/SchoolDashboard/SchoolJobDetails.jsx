import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SchoolLayout from './SchoolLayout';
import axiosInstance from '@/lib/axiosInstance';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const SchoolJobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/jobs/${jobId}/job-data`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError(error.response?.data?.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/school/edit-job/${jobId}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axiosInstance.delete(`/jobs/${jobId}/delete`);
        toast.success('Job deleted successfully');
        navigate('/dashboard/school/job-posts');
      } catch (error) {
        toast.error('Failed to delete job');
      }
    }
  };

  const handleViewApplications = () => {
    navigate(`/dashboard/school/applications?jobId=${jobId}`);
  };

  const getTimeAgo = (date) => {
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `Posted ${days} days ago`;
  };

  if (loading) {
    return (
      <SchoolLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin h-12 w-12 text-[#6C5CE7]" />
        </div>
      </SchoolLayout>
    );
  }

  if (error || !job) {
    return (
      <SchoolLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-red-400 mb-4" />
            <p className="text-xl text-gray-600 mb-4">{error || 'Job not found'}</p>
            <button
              onClick={() => navigate('/dashboard/school/job-posts')}
              className="text-[#6C5CE7] hover:underline"
            >
              Back to Job Posts
            </button>
          </div>
        </div>
      </SchoolLayout>
    );
  }

  return (
    <SchoolLayout>
      <div className="p-6 bg-[#F5F6FA] min-h-screen">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard/school/job-posts')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#6C5CE7] transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Job Posts</span>
          </button>
          <p className="text-sm text-gray-500">
            Job Posts / {job.title}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-8 shadow-md">
          {/* Job Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <span className="font-medium">{job.companyName}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">{getTimeAgo(job.postedAt)}</span>
                  <span className="text-gray-400">•</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {job.status === 'open' ? 'Active' : 'Closed'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleViewApplications}
                  className="px-6 py-3 bg-[#6C5CE7] text-white rounded-xl hover:bg-[#5A4FCF] transition-colors font-medium flex items-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  View Applications ({job.applicants?.length || 0})
                </button>
                <button
                  onClick={handleEdit}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
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
                <span className="text-xs">Location</span>
              </div>
              <p className="font-semibold text-gray-800">{job.location?.city || 'Not specified'}</p>
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

          {/* Subject and Class Levels */}
          {(job.subject || (job.classLevels && job.classLevels.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {job.subject && (
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-xs font-medium">Subject</span>
                  </div>
                  <p className="font-semibold text-gray-800">{job.subject}</p>
                </div>
              )}
              {job.classLevels && job.classLevels.length > 0 && (
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-medium">Class Levels</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.classLevels.map((level, idx) => (
                      <span key={idx} className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full">
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description Section */}
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
                      <CheckCircle className="w-5 h-5 text-[#6C5CE7] flex-shrink-0 mt-0.5" />
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
    </SchoolLayout>
  );
};

export default SchoolJobDetails;
