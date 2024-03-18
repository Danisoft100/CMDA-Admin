import { Link } from "react-router-dom";
import icons from "~/assets/js/icons";
import Button from "~/components/Global/Button/Button";
import { classNames } from "~/utilities/classNames";
import formatDate from "~/utilities/fomartDate";

const AdminDashboardStoreSingleEventPage = () => {
  return (
    <div className="grid grid-cols-12 place-items-start gap-x-6">
      <div className="bg-white py-6 px-2 lg:px-6 rounded-3xl col-span-9">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-6">
            <Link
              to="/events"
              className="inline-flex justify-center p-2 text-base items-center rounded-full bg-[rgba(175,175,175,0.20)] font-medium text-[#0C0900]"
            >
              {icons.arrowLeft}
            </Link>

            <p className="text-[#181818] text-lg font-bold leading-6">Event Details</p>
          </div>

          <Button className="bg-[#E0C6D7] gap-2 !text-primaryContainer font-semibold hover:bg-[#E0C6D7] hover:opacity-80">
            Update Event
          </Button>
        </div>

        {/* content */}
        <div className="mt-4">
          <img
            src="/atmosphere.png"
            className={classNames("bg-onPrimary h-40 lg:h-64 w-full rounded-lg object-cover")}
          />

          {/* title */}
          <div className="mt-4 space-y-2 text-sm text-black">
            <p className="  font-bold leading-5">Event title</p>
            <p className="leading-6">Medical Problems in West Africa And How to Solve them</p>
          </div>

          {/* description */}
          <div className="mt-4 space-y-2 text-sm ">
            <p className="  font-bold leading-5 text-primaryContainer">Event Description</p>
            <p className="leading-6 text-black">
              I’m a digital product designer specializing in UI/UX design for web and mobile apps. The products I design
              create a competitive advantage that improves customer experience and helps businesses increase profits.
            </p>
          </div>

          {/* divider */}
          <div className="my-6 w-full h-[2px] bg-onSecondary" />

          {/* date and time */}
          <div className="mt-6 flex flex-col lg:flex-row lg:justify-start gap-x-10 gap-y-5 items-start ">
            <div className="space-y-2">
              <p className="text-[#6A6769 text-xs font-semibold leading-5">Date</p>

              <p className="text-sm text-primaryContainer">{formatDate(new Date()).date}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[#6A6769 text-xs font-semibold leading-5">Time</p>

              <p className="text-sm text-primaryContainer">{formatDate(new Date()).time}</p>
            </div>
          </div>

          {/* event details */}
          <div className="flex items-start gap-x-14 my-6">
            {/* event type */}
            <div className="space-y-2">
              <p className="text-[#6a6769] text-xs font-semibold leading-5">Event type</p>
              <EventChips text="Virtual" />
            </div>

            {/* event tag */}
            <div className="space-y-2">
              <p className="text-[#6a6769] text-xs font-semibold leading-5">Event tag</p>
              <EventChips text="Training" />
            </div>

            {/* event tag */}
            <div className="space-y-2">
              <p className="text-[#6a6769] text-xs font-semibold leading-5">Member group</p>
              <div className="flex items-center justify-start gap-x-2">
                <EventChips text="All Member" />
                <EventChips text="Students" />
                <EventChips text="Doctors" />
                <EventChips text="GLobal Members" />
              </div>
            </div>
          </div>

          {/* location/link and passcode */}
          <div className="flex items-start gap-x-10">
            <div className="mt-4 space-y-2">
              <p className="  font-semibold leading-5 text-[#6A6769] text-xs">Event link/location</p>
              <p className="leading-6 text-primaryContainer text-sm">https://meetinglink.com</p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="  font-semibold leading-5 text-[#6A6769] text-xs">Event passcode</p>
              <p className="leading-6 text-primaryContainer text-sm">0POIR784</p>
            </div>
          </div>

          {/* divider */}
          <div className="my-6 w-full h-[2px] bg-onSecondary" />
        </div>
      </div>

      {/* analysis */}
      <div className="col-span-3 px-4 border-l border-[rgba(28,28,28,0.10)] h-full py-6 w-full">
        <div>
          <h4 className="text-primary font-bold leading-5 text-sm px-1">Events Analytics</h4>

          {/* registered number */}
          <div className="flex justify-between items-center px-2 mt-5">
            <p className="text-primaryContainer text-xs font-semibold leading-5">Total registered member</p>
            <p className="font-bold text-primaryContainer text-sm leading-5">24</p>
          </div>

          <div className="space-y-4 px-4">
            {["Students", "Doctors", "Global Members"].map((data, i) => (
              <div className="flex justify-between items-center px-2 mt-5" key={i}>
                <p className="text-[#4D494C] text-sm font-semibold leading-5 gap-2 flex items-center">
                  <span>{icons.world}</span> {data}
                </p>
                <p className="font-bold text-primaryContainer text-sm leading-5">24</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardStoreSingleEventPage;

const EventChips = ({ text }) => (
  <div className="py-2 px-4 flex justify-center items-center rounded-3xl border border-gray-light text-xs font-semibold leading-5 text-primaryContainer">
    {text}
  </div>
);
