import { useState } from "react";
import { classNames } from "~/utilities/classNames";
import icons from "~/assets/js/icons";

const Tabs = ({ tabs, equalTab = true, activeView, setActiveView, page }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleViewClick = (view) => {
    setActiveView(view);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex sticky w-full lg:justify-between lg:items-center">
        {/* Tab Buttons */}
        <div className="flex border-b sticky">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={classNames(
                index === activeTab
                  ? "border-b-2 border-primary text-primary"
                  : "border-b border-transparent text-gray",
                "px-4 py-2 focus:outline-none text-base font-semibold",
                equalTab && "flex-1"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* toggle view mode */}

        {page === "events" && (
          <div className="hidden lg:flex items-center gap-x-4">
            <div
              className={classNames(activeView === "list" && "p-1 bg-[#f5f5f5] rounded-full", "cursor-pointer")}
              onClick={() => handleViewClick("list")}
            >
              {icons.list}
            </div>
            <div
              className={classNames(activeView === "grid" && "p-1 bg-[#f5f5f5] rounded-full", "cursor-pointer")}
              onClick={() => handleViewClick("grid")}
            >
              {icons.grid}
            </div>
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-4 px-0.5">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
