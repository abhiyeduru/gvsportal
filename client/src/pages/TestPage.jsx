import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

const TestPage = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Application Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
            <div className="space-y-2">
              <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
              <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
              <p><strong>User Role:</strong> {user?.role || 'None'}</p>
              <p><strong>User Email:</strong> {user?.email || 'None'}</p>
              <p><strong>Error:</strong> {error?.message || 'None'}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Navigation Info</h2>
            <div className="space-y-2">
              <p><strong>Current Path:</strong> {location.pathname}</p>
              <p><strong>LocalStorage Auth:</strong> {localStorage.getItem('isAuthenticated')}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a href="/login" className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Go to Login
              </a>
              <a href="/dashboard/school" className="block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Go to School Dashboard
              </a>
              <a href="/dashboard/teacher" className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Go to Teacher Dashboard
              </a>
              <a href="/dashboard/parent" className="block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Go to Parent Dashboard
              </a>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
            <div className="space-y-2">
              <p><strong>API URL:</strong> {import.meta.env.VITE_API_URL}</p>
              <p><strong>Mode:</strong> {import.meta.env.MODE}</p>
              <p><strong>Dev:</strong> {import.meta.env.DEV ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;