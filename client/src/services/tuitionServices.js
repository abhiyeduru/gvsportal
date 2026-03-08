import axiosInstance from "@/lib/axiosInstance";

export const getTutors = async (params) => {
    const { data } = await axiosInstance.get("/tuition/get-tutors", { params });
    return data;
};

export const sendTuitionRequest = async (requestData) => {
    const { data } = await axiosInstance.post("/tuition/send-request", requestData);
    return data;
};

export const getParentDashboardData = async () => {
    const { data } = await axiosInstance.get("/tuition/dashboard");
    return data;
};

export const getTeacherTuitionDashboardData = async () => {
    const { data } = await axiosInstance.get("/tuition/teacher-dashboard");
    return data;
};

export const updateTuitionRequestStatus = async (requestId, statusData) => {
    const { data } = await axiosInstance.patch(`/tuition/request/${requestId}/status`, statusData);
    return data;
};

// ============ NEW TEACHER DASHBOARD SERVICES ============

export const getTeacherDashboardOverview = async () => {
    const { data } = await axiosInstance.get("/tuition/teacher-overview");
    return data;
};

export const checkProfileCompletion = async () => {
    const { data } = await axiosInstance.get("/tuition/check-profile-completion");
    return data;
};

// ============ DEMO CLASS SERVICES ============

export const proposeDemoClass = async (demoData) => {
    const { data } = await axiosInstance.post("/tuition/demo-class/propose", demoData);
    return data;
};

export const getDemoClasses = async () => {
    const { data } = await axiosInstance.get("/tuition/demo-classes");
    return data;
};

export const updateDemoClassStatus = async (demoClassId, statusData) => {
    const { data } = await axiosInstance.patch(`/tuition/demo-class/${demoClassId}`, statusData);
    return data;
};

// ============ ACTIVE STUDENTS SERVICES ============

export const getActiveStudents = async () => {
    const { data } = await axiosInstance.get("/tuition/active-students");
    return data;
};

export const addActiveStudent = async (studentData) => {
    const { data } = await axiosInstance.post("/tuition/active-students/add", studentData);
    return data;
};

export const updateActiveStudentStatus = async (studentId, statusData) => {
    const { data } = await axiosInstance.patch(`/tuition/active-students/${studentId}`, statusData);
    return data;
};

// ============ EARNINGS SERVICES ============

export const getEarningsDashboard = async () => {
    const { data } = await axiosInstance.get("/tuition/earnings");
    return data;
};

// ============ TEACHER JOBS SERVICES ============

export const getJobsForTeacher = async (params) => {
    const { data } = await axiosInstance.get("/tuition/teacher-jobs", { params });
    return data;
};

// ============ NOTIFICATION SERVICES ============

export const getTeacherNotifications = async () => {
    const { data } = await axiosInstance.get("/tuition/notifications");
    return data;
};

export const markNotificationAsRead = async (notificationId) => {
    const { data } = await axiosInstance.patch(`/tuition/notifications/${notificationId}/read`);
    return data;
};
