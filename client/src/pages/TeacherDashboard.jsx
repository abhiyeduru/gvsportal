import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance';
import TeacherLayout from '@/components/Dashboard/TeacherDashboard/TeacherLayout';
import StatsGrid from '@/components/Dashboard/TeacherDashboard/StatsGrid';
import ProfileCard from '@/components/Dashboard/TeacherDashboard/ProfileCard';
import ActivityFeed from '@/components/Dashboard/TeacherDashboard/ActivityFeed';
import PerformanceChart from '@/components/Dashboard/TeacherDashboard/PerformanceChart';
import RecommendedJobs from '@/components/Dashboard/TeacherDashboard/RecommendedJobs';
import FeaturedSchools from '@/components/Dashboard/TeacherDashboard/FeaturedSchools';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all dashboard data in parallel
      const [
        statsRes,
        performanceRes,
        activitiesRes,
        profileRes,
        jobsRes,
        schoolsRes,
      ] = await Promise.all([
        axiosInstance.get('/teacher/dashboard-stats'),
        axiosInstance.get('/teacher/performance-data?period=month'),
        axiosInstance.get('/teacher/recent-activities?limit=10'),
        axiosInstance.get('/teacher/profile-completion'),
        axiosInstance.get('/teacher/recommended-jobs?limit=6'),
        axiosInstance.get('/teacher/featured-schools?limit=10'),
      ]);

      setStats(statsRes.data.stats);
      setPerformanceData(performanceRes.data.data);
      setActivities(activitiesRes.data.activities);
      setProfile(profileRes.data.profile);
      setJobs(jobsRes.data.jobs);
      setSchools(schoolsRes.data.schools);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <TeacherLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <StatsGrid stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Activities */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard profile={profile} />
            <ActivityFeed activities={activities} />
          </div>

          {/* Right Column - Chart & Jobs */}
          <div className="lg:col-span-2 space-y-6">
            <PerformanceChart data={performanceData} />
            <RecommendedJobs jobs={jobs} />
            <FeaturedSchools schools={schools} />
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
