import axiosInstance from "@/lib/axiosInstance";

const BASE = "applications";

// Get all applications by a teacher
export const getUserApplications = async () => {
  const { data } = await axiosInstance.get(`/${BASE}/teacher`);
  return data;
};

// Apply for a job
export const applyForJob = async (jobId) => {
  const { data } = await axiosInstance.post(`/${BASE}/jobs/${jobId}/apply`);
  return data;
};

/* ==================================== */

// For schools
export const getJobApplications = async (jobId) => {
  const { data } = await axiosInstance.get(`/${BASE}/${jobId}/get-job-applications`);
  return data;
};

export const getRecruiterDashboard = async () => {
  const { data } = await axiosInstance.get(`/${BASE}/school/dashboard`);
  return data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const { data } = await axiosInstance.patch(`/${BASE}/${applicationId}/status`, { status });
  return data;
};
