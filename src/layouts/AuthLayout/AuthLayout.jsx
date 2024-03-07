import Logo from "~/components/Global/Logo/Logo";
import { Outlet, useLocation } from "react-router-dom";
import { classNames } from "~/utilities/classNames";
import authImg from "~/assets/images/auth/auth-img.png";

const AuthLayout = ({ withOutlet = true, children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="h-screen flex w-full">
      <div
        className={classNames(
          "h-full w-full hidden lg:flex flex-col relative",
          ["/forgot-password", "/reset-password"].includes(pathname) && "lg:hidden"
        )}
      >
        <img src={authImg} className="w-full h-full  z-10 absolute inset-0" />
      </div>
      <div
        className={classNames(
          "h-full w-full flex flex-col items-center p-4 lg:p-8 gap-4 overflow-y-auto",
          "justify-center"
        )}
      >
        <div className={classNames("w-full px-4 md:px-8 py-8 bg-white  rounded-lg", "max-w-md")}>
          <Logo />
        </div>

        <div className={classNames("w-full px-4 md:px-8 py-8 bg-white  rounded-lg", "max-w-md")}>
          {withOutlet ? <Outlet /> : children}
        </div>
        <p className="text-gray-500 text-sm">&copy;{new Date().getFullYear()} CMDA Nigeria</p>
      </div>
    </div>
  );
};

export default AuthLayout;
