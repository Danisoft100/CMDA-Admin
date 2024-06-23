import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "~/components/Dashboard/ItemCard/ItemCard";
import Button from "~/components/Global/Button/Button";
import PageHeader from "~/components/Global/PageHeader/PageHeader";
import { classNames } from "~/utilities/classNames";
import formatDate from "~/utilities/fomartDate";

const Events = () => {
  const navigate = useNavigate();
  const eventStats = useMemo(
    () => [
      { label: "Total Events", bgClass: "bg-white", value: 50292938 },
      { label: "Today's Events", bgClass: "bg-onPrimaryContainer", value: 50292938 },
      { label: "Future Events", bgClass: "bg-onPrimaryContainer", value: 50292938 },
      { label: "Past Events", bgClass: "bg-onPrimaryContainer", value: 50292938 },
      { label: "Students Only", bgClass: "bg-primary", value: 50292938 },
      { label: "Doctors Only", bgClass: "bg-secondary", value: 50292938 },
      { label: "Global Network Only", bgClass: "bg-tertiary", value: 50292938 },
    ],
    []
  );

  return (
    <div>
      <PageHeader
        title="Events"
        subtitle="Manage all events"
        action={() => navigate("/events/create-event")}
        actionLabel="New Event"
      />

      <div className="grid grid-cols-4 gap-6 gap-y-4 mt-8">
        {eventStats.map((stat) => (
          <div
            key={stat.label}
            className={classNames("p-4 border rounded-xl", stat.bgClass, stat.label.includes("Only") && "text-white")}
          >
            <h4 className="uppercase text-xs font-medium opacity-70 mb-3">{stat.label}</h4>
            <p className="font-bold text-lg">{Number(stat.value).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <section className="my-8">
        <div className="grid grid-cols-3 gap-6">
          {[...Array(9)].map((_, x) => (
            <ItemCard
              key={x}
              title="Lorem ipsum ssome other text i no know nothing about "
              category={"Webinar " + (x + 1)}
              dateTime={formatDate(new Date()).date}
            />
          ))}
        </div>
        <div className="flex justify-end items-center text-primary p-4 mt-1">
          <Button onClick={() => {}} disabled={false} label="Prev" variant="outlined" small />
          <span className="mx-2 text-sm">
            Showing <b>1</b> - <b>10</b> of <b>12</b>
          </span>
          <Button onClick={() => {}} disabled={false} label="Next" variant="outlined" small />
        </div>
      </section>
    </div>
  );
};

export default Events;
