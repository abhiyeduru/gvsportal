import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAdminAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData);
      toast.success('Login successful!');
      
      // Redirect to the intended page or dashboard
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C5CE7] to-[#5A4FCF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <svg width="80" height="80" viewBox="0 0 400 400" className="drop-shadow-2xl">
              <rect x="190" y="280" width="20" height="60" fill="white" opacity="0.9"/>
              <ellipse cx="160" cy="200" rx="15" ry="25" fill="white" opacity="0.8" transform="rotate(-30 160 200)"/>
              <ellipse cx="240" cy="200" rx="15" ry="25" fill="white" opacity="0.8" transform="rotate(30 240 200)"/>
              <ellipse cx="200" cy="180" rx="120" ry="100" fill="white" opacity="0.9"/>
              <path d="M 120 320 Q 130 310 140 320 Q 150 310 160 320 Q 170 310 180 320 Q 190 310 200 320 Q 210 310 220 320 Q 230 310 240 320 Q 250 310 260 320 Q 270 310 280 320" 
                    stroke="white" strokeWidth="3" fill="none" opacity="0.7"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">GravITy Cloud</h1>
          <p className="text-white/80">Super Admin Portal</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#6C5CE7] to-[#5A4FCF] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Admin Access
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to access the platform administration
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@gravity.com"
                    required
                    className="pl-10 h-12 border-gray-200 focus:border-[#6C5CE7] focus:ring-[#6C5CE7] rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="pl-10 pr-12 h-12 border-gray-200 focus:border-[#6C5CE7] focus:ring-[#6C5CE7] rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-[#6C5CE7] to-[#5A4FCF] hover:from-[#5A4FCF] to-[#4C43D4] text-white font-medium rounded-xl shadow-lg transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Access Admin Panel'
                )}
              </Button>
            </form>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-sm text-purple-800 font-medium mb-2">
                🔑 Demo Credentials
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="font-medium text-purple-700">Email:</span>
                  <span className="text-gray-600">admin@gravity.com</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="font-medium text-purple-700">Password:</span>
                  <span className="text-gray-600">admin123</span>
                </div>
              </div>
            </div>

            {/* Back to Main Login */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Not an admin?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#6C5CE7] hover:text-[#5A4FCF] font-medium underline"
                >
                  User Login
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;