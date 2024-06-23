import { Link } from "react-router-dom";
import { classNames } from "~/utilities/classNames";
import formatDate from "~/utilities/fomartDate";

const EventCard = ({ width = 288, row }) => {
  return (
    <Link
      to="/events/1"
      className={classNames(
        "bg-white border p-4 rounded-2xl flex overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300",
        row ? "flex-row gap-4 items-center" : "flex-col gap-2"
      )}
      style={{ width }}
    >
      <img
        src="/atmosphere.png"
        className={classNames("bg-onPrimary h-36 w-full rounded-lg", row && "max-w-[200px] h-28")}
      />
      <div>
        <span className="px-2 py-1 text-tertiary text-xs font-semibold bg-onTertiary rounded-3xl">Conference</span>
        <h4 className="text-sm font-bold truncate my-2">Medical Problems in West Africa And How to Solve them</h4>
        <p className="text-gray-dark text-xs">{formatDate(new Date()).date + ", " + formatDate(new Date()).time}</p>
        <p className="text-gray-dark text-xs mt-2 truncate">Gbagada, Lagos</p>
      </div>
    </Link>
  );
};

export default EventCard;
