import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import icons from "~/assets/js/icons";
import BackButton from "~/components/Global/BackButton/BackButton";
import Button from "~/components/Global/Button/Button";
import ConfirmationModal from "~/components/Global/ConfirmationModal/ConfirmationModal";
import { useDeleteEventBySlugMutation, useGetEventBySlugQuery } from "~/redux/api/eventsApi";
import { classNames } from "~/utilities/classNames";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import formatDate from "~/utilities/fomartDate";

const SingleEvent = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: evt } = useGetEventBySlugQuery(slug, { skip: !slug });
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventBySlugMutation();
  const [openDelete, setOpenDelete] = useState(false);

  const eventAnalytics = useMemo(
    () => ({
      totalRegistered: 0,
      studentsRegistered: 0,
      doctorsRegistered: 0,
      globalNetworkRegistered: 0,
    }),
    []
  );

  const handleDelete = () => {
    deleteEvent(slug)
      .unwrap()
      .then(() => {
        navigate("/events");
        toast.success("Event has been DELETED successfully");
      });
  };

  return (
    <div>
      <BackButton label="Back to Events List" to="/events" />

      <div className="flex gap-6 mt-6">
        <section className="bg-white rounded-2xl p-6 shadow w-full md:w-3/4">
          <span className="capitalize bg-onTertiary text-tertiary px-4 py-2 rounded-lg text-xs font-semibold mb-4 inline-block">
            {evt?.eventType}
          </span>

          <h2 className="font-bold mb-4 text-lg">{evt?.name}</h2>

          <img src={evt?.featuredImageUrl} className="w-full max-h-[500px] mb-6" />

          <p className="text-base">{evt?.description}</p>

          <div className="mt-6">
            <h4 className="text-sm text-gray-600 font-semibold uppercase mb-1">
              Event {evt?.eventType === "Physical" ? "Location" : "Link"}
            </h4>
            <p className="text-base mb-1">{evt?.linkOrLocation}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-sm text-gray-600 font-semibold uppercase mb-1">Access Code</h4>
              <p className="text-base mb-1">{evt?.accessCode || "N/A"}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-600 font-semibold uppercase mb-1">Event Date &amp; Time</h4>
              <p className="text-base mb-1">{formatDate(evt?.eventDateTime).dateTime}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-sm text-gray-600 font-semibold uppercase mb-2">Members Group</h4>
              <p className="flex flex-wrap gap-4">
                {evt?.membersGroup?.map((grp) => (
                  <span
                    key={grp}
                    className={classNames(
                      "capitalize px-4 py-2 rounded text-xs font-medium",
                      grp === "Student"
                        ? "bg-onPrimaryContainer text-primary"
                        : grp === "Doctor"
                          ? "bg-onSecondaryContainer text-secondary"
                          : "bg-onTertiaryContainer text-tertiary"
                    )}
                  >
                    {grp}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm text-gray-600 font-semibold uppercase mb-1">Additional Information</h4>
            <p className="text-base mb-1">{evt?.additionalInformation}</p>
          </div>

          <div className="flex flex-wrap gap-4 my-6">
            {evt?.eventTags?.map((tag) => (
              <span key={tag} className="capitalize bg-gray-light px-4 py-2 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray text-sm mb-4 mt-6">
            Posted: <span className="text-black font-medium">{formatDate(evt?.createdAt).dateTime}</span>{" "}
          </p>

          <div className="flex justify-end gap-6 mt-6">
            <Button variant="outlined" color="error" label="Delete Event" onClick={() => setOpenDelete(true)} />
            <Button label="Update Event" onClick={() => navigate(`/events/create-event?slug=${slug}`)} />
          </div>
        </section>

        <section>
          <h3 className="text-base font-bold mb-2">Event Analytics</h3>
          <div className="space-y-4">
            {Object.entries(eventAnalytics).map(([key, val]) => (
              <div key={key}>
                <h4 className="text-xs text-gray-600 font-semibold uppercase mb-0.5">
                  {convertToCapitalizedWords(key)}
                </h4>
                <p className="text-base mb-1 font-semibold">{val || 0}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/*  */}
      <ConfirmationModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        subAction={() => setOpenDelete(false)}
        mainAction={handleDelete}
        mainActionLoading={isDeleting}
        icon={icons.calendar}
        title="Delete Event"
        subtitle="Are you sure you want to delete this event?"
      />
    </div>
  );
};

export default SingleEvent;
