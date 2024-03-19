import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "~/components/DashboardComponents/Events/EventCard";
import EventsCalender from "~/components/DashboardComponents/Events/EventsCalender";
import Button from "~/components/Global/Button/Button";
import Drawer from "~/components/Global/Drawer/Drawer";
import Tabs from "~/components/Global/Tabs/Tabs";
import { useMediaQuery2 } from "~/hooks/useMediaQuery2";

const AdminDashboardEventsPage = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("list");
  const [openMobileCalender, setOpenMobileCalender] = useState(false);

  const isSmallScreen = useMediaQuery2("750px");

  const isRowView = activeView === "list";

  const AvailableEvents = ({ row }) => {
    return (
      <div className={`flex gap-x-2 gap-y-6  ${row || isSmallScreen ? "flex-col" : "flex-row flex-wrap"}`}>
        {[...Array(10)].map((_, i) => (
          <EventCard key={i} row={row && !isSmallScreen} width={row ? "auto" : isSmallScreen ? "100%" : 300} />
        ))}
      </div>
    );
  };

  const eventTabs = [
    { label: "Upcoming events", content: <AvailableEvents row={isRowView} /> },
    { label: "Past events", content: <AvailableEvents row={isRowView} /> },
  ];

  return (
    <div>
      <section className="flex gap-10">
        <div className="w-full lg:w-2/3 ">
          {/* header text */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[#181818] font-bold leading-6">Events</h3>
              <p className="text-[#71717A] text-sm leading-5">here is what’s happening today</p>
            </div>
            <Button label="Create event" onClick={() => navigate("/create-event")} />
          </div>
          <Tabs tabs={eventTabs} equalTab={false} activeView={activeView} setActiveView={setActiveView} page="events" />
        </div>
        <div className="hidden lg:block lg:w-1/3">
          <EventsCalender />
        </div>
      </section>

      {/* mobile calender */}
      <Drawer active={openMobileCalender} setActive={setOpenMobileCalender}>
        <div className="px-4 mt-16 mb-10 max-w-md ml-auto">
          <EventsCalender />
        </div>
      </Drawer>
    </div>
  );
};

export default AdminDashboardEventsPage;
