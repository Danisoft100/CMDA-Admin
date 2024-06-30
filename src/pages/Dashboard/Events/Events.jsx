import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemCard from "~/components/Dashboard/ItemCard/ItemCard";
import MiniPagination from "~/components/Global/MiniPagination/MiniPagination";
import PageHeader from "~/components/Global/PageHeader/PageHeader";
import SearchBar from "~/components/Global/SearchBar/SearchBar";
import { useGetAllEventsQuery } from "~/redux/api/eventsApi";
import { classNames } from "~/utilities/classNames";
import formatDate from "~/utilities/fomartDate";

const Events = () => {
  const navigate = useNavigate();
  const [perPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBy, setSearchBy] = useState("");
  const { data: allEvents } = useGetAllEventsQuery({ page: currentPage, limit: perPage, searchBy });

  const eventStats = useMemo(
    () => [
      { label: "Total Events", bgClass: "bg-white", value: allEvents?.meta?.totalItems },
      // { label: "Today's Events", bgClass: "bg-onPrimaryContainer", value: 50292938 },
      // { label: "Future Events", bgClass: "bg-onPrimaryContainer", value: 50292938 },
      // { label: "Past Events", bgClass: "bg-onPrimaryContainer", value: 50292938 },
      // { label: "Students Only", bgClass: "bg-primary", value: 50292938 },
      // { label: "Doctors Only", bgClass: "bg-secondary", value: 50292938 },
      // { label: "Global Network Only", bgClass: "bg-tertiary", value: 50292938 },
    ],
    [allEvents]
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
        <div className="flex justify-end mb-4">
          <SearchBar onSearch={setSearchBy} />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {allEvents?.items?.map((evt) => (
            <Link key={evt?._id} to={`/events/${evt.slug}`}>
              <ItemCard
                image={evt.featuredImageUrl}
                title={evt.name}
                category={evt.eventType}
                dateTime={formatDate(evt.eventDateTime).dateTime}
                extraText={"Posted - " + formatDate(evt.createdAt).date}
              />
            </Link>
          ))}
        </div>

        {allEvents?.meta?.totalItems && (
          <MiniPagination
            itemsPerPage={perPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={allEvents?.meta?.totalItems}
            totalPages={allEvents?.meta?.totalPages}
          />
        )}
      </section>
    </div>
  );
};

export default Events;
