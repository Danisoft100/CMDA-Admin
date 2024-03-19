import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import icons from "~/assets/js/icons";
import Button from "~/components/Global/Button/Button";
import FileUploader from "~/components/Global/FormElements/FileUploader/FileUploader";
import RadioGroup from "~/components/Global/FormElements/RadioGroup/RadioGroup";
import Select from "~/components/Global/FormElements/Select/Select";
import TextArea from "~/components/Global/FormElements/TextArea/TextArea";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";

const AdminDashboardCreateEvent = () => {
  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });

  const navigate = useNavigate();

  //   member options
  const memberOptions = ["All Members", "Students", "Doctors", "Global Members"].map((y) => ({
    label: y,
    value: y.toLowerCase(),
  }));

  //   event tags options
  const eventTagsOptions = ["Conference", "Training", "Webinar", "Seminar"].map((y) => ({
    label: y,
    value: y.toLowerCase(),
  }));
  //   event tags options
  const eventTypeOptions = ["Virtual", "Physical Event"].map((y) => ({
    label: y,
    value: y.toLowerCase(),
  }));

  const eventType = watch("event_type", ""); //watches the event type for a change in value

  return (
    <div>
      {/* back button */}
      <div
        className="text-primaryContainer bg-white rounded-lg gap-2 py-3 px-6 flex justify-start items-center cursor-pointer w-fit text-sm font-semibold"
        onClick={() => navigate(-1)}
      >
        <span>{icons.arrowLeft}</span>
        <span>Back</span>
      </div>

      {/* content */}
      <form className="max-w-[820px] w-full mx-auto mt-4" onSubmit={handleSubmit(console.log)}>
        {/* header */}
        <div className="flex justify-between items-center w-full">
          <h3 className="text-[#181818] font-bold text-lg leading-6">Create a new event</h3>

          <div className="flex justify-end items-center gap-x-6">
            <Button className="bg-white gap-2 !text-primaryContainer">
              <span>{icons.eye}</span>
              Preview
            </Button>
            <Button label="Create event" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-10 place-items-start mt-10 ">
          {/* left side */}
          <div className="col-span-1 w-full flex flex-col justify-start gap-y-6">
            <div className="w-full">
              <FileUploader
                label="coverImage"
                title="Add a event cover image"
                register={register}
                errors={errors}
                setValue={setValue}
                required
              />
            </div>

            <div className="w-full">
              <Select
                label="memberGroup"
                control={control}
                options={memberOptions}
                errors={errors}
                required={"Select a group"}
                placeholder="Select member group"
                title="Member group"
              />
              <span className="text-[10px] text-tertiaryContainer">What member group is this event for?</span>
            </div>

            <div className="w-full">
              <Select
                label="eventTags"
                control={control}
                options={eventTagsOptions}
                errors={errors}
                required={"Select a tag"}
                placeholder="Select a tag"
                title="Event tags"
              />
            </div>
          </div>

          {/* right side */}
          <div className="col-span-1 w-full flex flex-col justify-start gap-y-6">
            <div className="w-full">
              <TextInput
                title="Event name"
                label="eventName"
                type="text"
                register={register}
                errors={errors}
                required
                placeholder="Event name"
              />
            </div>

            <div className="w-full">
              <TextArea
                label="eventDescription"
                title="Event description"
                register={register}
                control={control}
                errors={errors}
                placeholder="Add description"
                required
              />
            </div>

            <div>
              <RadioGroup
                label="event_type"
                title="Event type"
                control={control}
                register={register}
                required="Please select a type"
                errors={errors}
                options={eventTypeOptions}
              />
            </div>

            <div className="w-full">
              {eventType == "physical event" ? (
                <TextInput
                  title="Event location"
                  label="event_location"
                  type="text"
                  register={register}
                  errors={errors}
                  required
                  placeholder="Enter location address"
                />
              ) : (
                <TextInput
                  title="Event link"
                  label="event_link"
                  type="text"
                  register={register}
                  errors={errors}
                  required
                  placeholder="Paste an event link here"
                />
              )}
            </div>

            <div className="w-full">
              <TextInput
                title="Event access code"
                label="eventAccessCode"
                register={register}
                errors={errors}
                required
                placeholder="Enter access code"
              />
            </div>

            <div className="w-full">
              <TextInput
                title="Event date"
                label="eventDate"
                register={register}
                errors={errors}
                required
                type="date"
              />
            </div>

            <div className="w-full">
              <TextInput
                title="Event time"
                label="eventTime"
                register={register}
                errors={errors}
                required
                type="time"
              />
            </div>

            <div className="w-full">
              <TextInput
                title="CME points"
                label="cme_points"
                register={register}
                errors={errors}
                required
                type="tel"
                placeholder={"Enter located points"}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboardCreateEvent;
