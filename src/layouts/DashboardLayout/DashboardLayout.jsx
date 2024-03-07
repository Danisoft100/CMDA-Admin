import { useState } from "react";
import { classNames } from "~/utilities/classNames";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { NAV_LINKS } from "./constants";

const DashboardLayout = ({ withOutlet = true, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <Header onToggleSidebar={toggleSidebar} />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} navLinks={NAV_LINKS} />
        {/* Main content */}
        <div
          className={classNames(
            isSidebarOpen && "lg:ml-60",
            "flex-1 flex flex-col overflow-hidden transition-all duration-300"
          )}
        >
          {/* Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 mt-20">
            {withOutlet ? <Outlet /> : children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
