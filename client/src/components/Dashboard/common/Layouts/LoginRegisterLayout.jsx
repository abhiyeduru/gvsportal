import { Outlet } from "react-router-dom";
import LoginHeroAnimation from "../../../login/LoginHeroAnimation";

const LoginRegisterLayout = () => (
  <>
    <div className="min-h-screen h-screen flex">
      {/* Left Panel - Animated Hero - Exactly Half Screen */}
      <div className="relative w-1/2 h-full hidden lg:flex">
        <LoginHeroAnimation />
      </div>
      
      {/* Right Panel - Login Form - Exactly Half Screen */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Outlet />
        </div>
      </div>
    </div>
  </>
);

export default LoginRegisterLayout;
