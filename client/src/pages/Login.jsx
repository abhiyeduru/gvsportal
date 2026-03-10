import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/constants/Icons";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { KeyRound, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const form = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { mutate: loginUser, status } = login;

  const isPending = status === "pending";

  const handleSubmit = (credentials) => {
    loginUser(credentials, {
      onSuccess: (data) => {
        toast.success("Login Success!");
        // Map backend roles to frontend routes
        const roleMap = {
          jobSeeker: "teacher",
          recruiter: "school",
          parent: "parent",
          admin: "admin"
        };
        const effectiveRole = roleMap[data?.user?.role] || data?.user?.role;
        navigate(`/dashboard/${effectiveRole}`);
      },
      onError: (error) => {
        toast.error("Error Loggin In!", { description: error.message });
      },
    }); // on save button press send data to the apis
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px] p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6C5CE7] to-[#5A4FCF] rounded-2xl flex items-center justify-center shadow-lg">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-base">
          Sign in to your GravITy account to continue
        </p>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Enter your email"
                        className="pl-10 h-12 border-gray-200 focus:border-[#6C5CE7] focus:ring-[#6C5CE7] rounded-xl"
                        {...field}
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        className="pl-10 h-12 border-gray-200 focus:border-[#6C5CE7] focus:ring-[#6C5CE7] rounded-xl"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={isPending}
                        {...field}
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              disabled={isPending} 
              className="w-full h-12 bg-gradient-to-r from-[#6C5CE7] to-[#5A4FCF] hover:from-[#5A4FCF] to-[#4C43D4] text-white font-medium rounded-xl shadow-lg transition-all duration-200"
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
              )}
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Server Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800 font-medium mb-2">
          ⚠️ Server Notice
        </p>
        <p className="text-xs text-amber-700 mb-2">
          The backend server may take up to a minute to respond on the first request after being inactive.
        </p>
        <p className="text-xs text-amber-700">
          For optimal testing, please use the live hosted links whenever possible.
        </p>
      </div>

      {/* Test Credentials */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800 font-medium mb-3">
          🧪 Test Credentials
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center p-2 bg-white rounded-lg">
            <span className="font-medium text-purple-700">Teacher:</span>
            <span className="text-gray-600">demo@test.com / test123</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white rounded-lg">
            <span className="font-medium text-blue-700">School:</span>
            <span className="text-gray-600">school@test.com / test123</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white rounded-lg">
            <span className="font-medium text-green-700">Parent:</span>
            <span className="text-gray-600">parent@test.com / test123</span>
          </div>
        </div>
      </div>

      {/* Admin Login Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Are you an administrator?{" "}
          <button
            onClick={() => navigate("/admin/login")}
            className="text-[#6C5CE7] hover:text-[#5A4FCF] font-medium underline"
          >
            Admin Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
