import Logo from "~/components/Global/Logo/Logo";
import { Outlet } from "react-router-dom";
import { classNames } from "~/utilities/classNames";

const AuthLayout = ({ withOutlet = true, children }) => {
  return (
    <div className="h-screen flex w-full">
      <div
        className={classNames(
          "h-full w-full flex flex-col items-center p-4 lg:p-8 gap-4 overflow-y-auto",
          "justify-center"
        )}
      >
        <Logo />

        <div className={classNames("w-full px-4 md:px-8 py-8 bg-white  rounded-lg", "max-w-md")}>
          {withOutlet ? <Outlet /> : children}
        </div>
        <p className="text-gray-500 text-sm">&copy;{new Date().getFullYear()} CMDA Nigeria</p>
      </div>
    </div>
  );
};

export default AuthLayout;
