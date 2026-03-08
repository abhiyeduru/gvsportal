import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SchoolDashboard from './pages/SchoolDashboard';

function TestApp() {
  console.log("TestApp rendering...");
  
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center py-4 text-2xl font-bold">Test App</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/school" element={<SchoolDashboard />} />
        <Route path="/test" element={
          <div className="text-center p-8">
            <h2 className="text-xl">Test Route Working!</h2>
            <p>If you can see this, routing is working.</p>
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default TestApp;