import { classNames } from "~/utilities/classNames";
import { NavLink } from "react-router-dom";
import icons from "~/assets/js/icons";
import { useDispatch } from "react-redux";
import { setUser } from "~/redux/features/auth/authSlice";
import { clearTokens } from "~/redux/features/auth/tokenSlice";

const Sidebar = ({ isOpen, onToggleSidebar, navLinks = [] }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.location.href = "/login";
    dispatch(clearTokens());
    dispatch(setUser(null));
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-[5] lg:hidden" onClick={onToggleSidebar}></div>}

      {/* Sidebar */}
      <aside
        className={classNames(
          isOpen ? "translate-x-0 animate-slidein" : "-translate-x-full",
          "shadow-md lg:shadow-none p-5 pt-20",
          "transition-all duration-200 fixed inset-y-0 left-0 w-60 bg-white overflow-y-auto ease-in-out transform z-10 lg:z-[1]"
        )}
      >
        {/* Navigation Links */}
        <nav className="mt-6">
          <ul className="flex-1 space-y-4">
            {navLinks.map((navItem) => (
              <li key={navItem.title}>
                <NavLink
                  to={navItem.link}
                  className={({ isActive }) =>
                    classNames(
                      "flex items-center gap-4 px-4 py-3 cursor-pointer text-sm font-semibold rounded-lg transition-all",
                      isActive ? "bg-primary text-white" : "bg-transparent text-black hover:bg-onPrimary"
                    )
                  }
                >
                  <span className="text-xl">{navItem.icon}</span> {navItem.title}
                </NavLink>
              </li>
            ))}
            <li className="py-8" />
            <li
              className={classNames(
                "flex items-center gap-4 px-4 py-3 cursor-pointer text-sm font-semibold rounded-lg",
                "bg-transparent text-black hover:bg-onPrimary transition-all"
              )}
              onClick={handleLogout}
            >
              <span className="text-xl">{icons.logout}</span> Logout
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
