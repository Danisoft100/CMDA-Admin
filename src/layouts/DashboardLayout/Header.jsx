import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import icons from "~/assets/js/icons";
import Dropdown from "~/components/Global/Dropdown/DropDown";
import Logo from "~/components/Global/Logo/Logo";
import { setUser } from "~/redux/features/auth/authSlice";
import { clearTokens } from "~/redux/features/auth/tokenSlice";
import { classNames } from "~/utilities/classNames";

const Header = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    window.location.href = "/login";
    dispatch(clearTokens());
    dispatch(setUser(null));
  };

  return (
    <header className="bg-white fixed top-0 inset-x-0 z-[2] gap-4">
      <nav className="h-full w-full flex items-center gap-4 p-6 py-3">
        {/* Sidebar Toggle Button */}
        <button
          className="text-primary text-2xl focus:outline-none hover:bg-onPrimary rounded-md transition-all p-1 lg:hidden"
          onClick={onToggleSidebar}
        >
          {icons.menu}
        </button>
        {/* Logo */}
        <Logo className="w-auto h-14" />

        <div className="flex-1" />
        {/* Avatar Dropdown */}
        <Dropdown
          toggleElement={
            <button className="inline-flex items-center gap-2 hover:bg-onPrimary transition rounded-lg">
              <span className="size-12 bg-onPrimary rounded-full inline-flex items-center justify-center text-3xl text-primary">
                {icons.person}
              </span>
            </button>
          }
        >
          <ul className="w-56 rounded-2xl text-sm pt-2 pb-2 bg-white shadow-lg border border-gray/20">
            <li className="py-2 px-4 truncate">
              <p className="font-semibold truncate">{user?.fullName || "No Name"}</p>
              <p className="text-xs text-gray truncate">{user?.role || "Admin"}</p>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  classNames(
                    "flex items-center gap-3 px-5 py-2 cursor-pointer border-t  font-medium transition-all",
                    isActive ? "bg-onPrimary text-primary" : "bg-transparent text-black hover:bg-onPrimary"
                  )
                }
              >
                <span className="text-lg">{icons.settings}</span> Settings
              </NavLink>
            </li>
            <li
              className="flex gap-3 items-center text-black cursor-pointer border-t px-5 py-2 hover:bg-onPrimary transition-all"
              onClick={handleLogout}
            >
              <span className="text-lg">{icons.logout}</span> Logout
            </li>
          </ul>
        </Dropdown>
      </nav>
    </header>
  );
};

export default Header;
