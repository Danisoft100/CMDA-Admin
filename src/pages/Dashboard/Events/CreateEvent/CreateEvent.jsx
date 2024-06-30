import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import icons from "~/assets/js/icons";
import BackButton from "~/components/Global/BackButton/BackButton";
import Button from "~/components/Global/Button/Button";
import Select from "~/components/Global/FormElements/Select/Select";
import TextArea from "~/components/Global/FormElements/TextArea/TextArea";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import { useCreateEventMutation, useGetEventBySlugQuery, useUpdateEventBySlugMutation } from "~/redux/api/eventsApi";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  const { data: evt } = useGetEventBySlugQuery(slug, { skip: !slug });
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventBySlugMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
    defaultValues: {
      name: evt?.name,
      description: evt?.description,
      linkOrLocation: evt?.linkOrLocation,
      eventType: evt?.eventType,
      eventTags: evt?.eventTags,
      membersGroup: evt?.membersGroup,
      eventDateTime: evt?.eventDateTime?.slice(0, 16),
      additionalInformation: evt?.additionalInformation,
      accessCode: evt?.accessCode,
    },
  });

  useEffect(() => {
    if (slug && evt) {
      setImage(evt.featuredImageUrl);
    }
  }, [evt, slug]);

  const [featuredImage, setFeaturedImage] = useState();
  const [image, setImage] = useState(null);

  const handlePreview = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onabort = () => {};
    reader.onerror = (err) => console.log("Error: ", err);
    reader.readAsDataURL(file);
  };

  const onSubmit = (payload) => {
    payload = { ...payload, ...(!slug ? { featuredImage } : {}) };

    const formData = new FormData();
    Object.entries(payload).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => {
          formData.append(`${key}[]`, v);
        });
      } else {
        formData.append(key, val);
      }
    });

    if (slug && evt) {
      updateEvent({ slug, body: formData })
        .unwrap()
        .then((res) => {
          toast.success("Event UPDATED ssuccessfully");
          navigate(`/events/${res.data.slug}`);
        });
    } else {
      if (!featuredImage) return toast.error("Featured image is required");
      createEvent(formData)
        .unwrap()
        .then((res) => {
          toast.success("Event CREATED ssuccessfully");
          navigate(`/events/${res.data.slug}`);
        });
    }
  };

  return (
    <div>
      <BackButton label="Back to Events List" to="/events" />

      <section className="bg-white rounded-2xl p-6 shadow mt-6">
        <h3 className="font-bold text-lg mb-4">{slug ? "Edit" : "Create"} Event</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 gap-x-6">
          <div className="col-span-2">
            <p className="text-sm font-semibold mb-1">
              Featured Image <span className="text-error">*</span>
            </p>
            <div className="inline-block">
              <label htmlFor="image" className="text-primary text-sm font-medium underline cursor-pointer">
                {image ? (
                  <img src={image} alt="" className="h-40 w-auto rounded-xl" />
                ) : (
                  <span className="h-40 w-60 bg-onPrimary rounded-xl inline-flex items-center justify-center text-5xl text-primary">
                    {icons.image}
                  </span>
                )}
              </label>
              <input type="file" accept="image/*" hidden id="image" name="image" onChange={handlePreview} />
            </div>
          </div>

          <TextInput label="name" register={register} errors={errors} required divClassName="col-span-2" />

          <TextArea label="description" register={register} errors={errors} divClassName="col-span-2" />

          <Select
            label="eventType"
            control={control}
            options={["Physical", "Virtual"].map((v) => ({ label: v, value: v }))}
          />

          <TextInput label="linkOrLocation" register={register} errors={errors} required />

          <Select
            label="membersGroup"
            control={control}
            options={["Student", "Doctor", "GlobalNetwork"].map((v) => ({ label: v, value: v }))}
            multiple
          />

          <Select
            label="eventTags"
            control={control}
            options={["Webinar", "Seminar", "Conference", "Training"].map((v) => ({ label: v, value: v }))}
            multiple
          />

          <TextInput label="accessCode" register={register} errors={errors} />

          <TextInput
            label="eventDateTime"
            title="Event Date & Time"
            type="datetime-local"
            register={register}
            errors={errors}
            required
          />

          <TextArea
            label="additionalInformation"
            errors={errors}
            register={register}
            rows={2}
            required={false}
            divClassName="col-span-2"
          />

          <div className="flex justify-end col-span-2">
            <Button
              label={slug ? "Save Changes" : "Submit"}
              type="submit"
              className="w-full md:w-1/3"
              large
              loading={isCreating || isUpdating}
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateEvent;
