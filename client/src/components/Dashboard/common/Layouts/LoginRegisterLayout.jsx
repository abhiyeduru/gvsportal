import { Outlet } from "react-router-dom";

const LoginRegisterLayout = () => (
  <>
    <div className="container min-h-full h-[calc(100vh-8vh)] flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900" />
        <img
          className="bg-center min-h-full bg-cover inset-0 absolute"
          src="/pngegg.png"
        />

        <div className="absolute inset-x-0 bottom-1/4 z-20 flex flex-col items-center justify-center text-lg font-medium">
          <div className="text-8xl font-grotesk text-white border-4 border-white py-4 px-10 font-black tracking-[0.2em] w-fit h-fit drop-shadow-2xl hover:bg-white hover:text-black transition-all duration-500 cursor-pointer uppercase">
            GRAVITY
          </div>
          <div className="mt-4 text-white/70 font-grotesk tracking-widest uppercase">Edu Recruiting Portal</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Outlet />
        </div>
      </div>
    </div>
  </>
);

export default LoginRegisterLayout;
