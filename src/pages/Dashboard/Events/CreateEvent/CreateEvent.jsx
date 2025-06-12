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
import { formatCurrency } from "~/utilities/formatCurrency";
import { conferenceTypes, conferenceZones, conferenceRegions } from "~/constants/conferences";

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
    watch,
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
      paymentPlans: evt?.paymentPlans?.reduce((acc, { role, price, registrationPeriod }) => {
        const key = registrationPeriod ? `${role}_${registrationPeriod}` : role;
        acc[key] = +price;
        return acc;
      }, {}),
      // Conference fields
      isConference: evt?.isConference || false,
      conferenceType: evt?.conferenceConfig?.conferenceType,
      conferenceZone: evt?.conferenceConfig?.zone,
      conferenceRegion: evt?.conferenceConfig?.region,
      regularRegistrationEndDate: evt?.conferenceConfig?.regularRegistrationEndDate?.slice(0, 16),
      lateRegistrationEndDate: evt?.conferenceConfig?.lateRegistrationEndDate?.slice(0, 16),
      paystackSplitCode: evt?.conferenceConfig?.paystackSplitCode,
      usePayPalForGlobal: evt?.conferenceConfig?.usePayPalForGlobal || false,
    },
  });

  useEffect(() => {
    if (slug && evt) {
      setImage(evt.featuredImageUrl);
    }
  }, [evt, slug]);

  const [featuredImage, setFeaturedImage] = useState();
  const [image, setImage] = useState(null);

  const [isPaid, setIsPaid] = useState(!!evt?.isPaid);

  // Watch form values to show/hide conditional fields
  const isConference = watch("isConference");
  const conferenceType = watch("conferenceType");
  const useMultipleRegistrationPeriods = isConference && isPaid;

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
    // Process payment plans for conferences
    let paymentPlans = [];
    if (isPaid) {
      if (useMultipleRegistrationPeriods) {
        // For conferences, handle regular and late registration plans
        paymentPlans = Object.entries(payload.paymentPlans).map(([key, value]) => {
          const [role, registrationPeriod] = key.includes("_") ? key.split("_") : [key, "Regular"];
          return { role, price: +value, registrationPeriod };
        });
      } else {
        // For regular events
        paymentPlans = Object.entries(payload.paymentPlans).map(([key, value]) => ({
          role: key,
          price: +value,
        }));
      }
    } // Clean up conference-specific fields based on conference type
    const cleanedPayload = { ...payload };

    // Only include conference fields if this is actually a conference
    if (cleanedPayload.isConference) {
      // Only include conferenceZone if it's a Zonal conference
      if (cleanedPayload.conferenceType !== "Zonal") {
        delete cleanedPayload.conferenceZone;
      }

      // Only include conferenceRegion if it's a Regional conference
      if (cleanedPayload.conferenceType !== "Regional") {
        delete cleanedPayload.conferenceRegion;
      }

      // Validate required fields based on conference type
      if (cleanedPayload.conferenceType === "Zonal" && !cleanedPayload.conferenceZone) {
        return toast.error("Conference zone is required for zonal conferences");
      }

      if (cleanedPayload.conferenceType === "Regional" && !cleanedPayload.conferenceRegion) {
        return toast.error("Conference region is required for regional conferences");
      }
    } else {
      // If not a conference, remove all conference-specific fields
      delete cleanedPayload.conferenceType;
      delete cleanedPayload.conferenceZone;
      delete cleanedPayload.conferenceRegion;
      delete cleanedPayload.regularRegistrationEndDate;
      delete cleanedPayload.lateRegistrationEndDate;
      delete cleanedPayload.paystackSplitCode;
      delete cleanedPayload.usePayPalForGlobal;
    }

    // Remove empty or undefined conference-specific fields
    Object.keys(cleanedPayload).forEach((key) => {
      if (
        key.startsWith("conference") ||
        key.includes("Registration") ||
        key === "paystackSplitCode" ||
        key === "usePayPalForGlobal"
      ) {
        if (cleanedPayload[key] === undefined || cleanedPayload[key] === null || cleanedPayload[key] === "") {
          delete cleanedPayload[key];
        }
      }
    });

    payload = {
      ...cleanedPayload,
      ...(!slug ? { featuredImage } : {}),
      isPaid,
      paymentPlans,
    };

    // Debug: Log the final payload being sent
    console.log("Final payload being sent:", payload);

    const formData = new FormData();
    Object.entries(payload).forEach(([key, val]) => {
      // Skip undefined, null, or empty string values
      if (val === undefined || val === null || val === "") {
        return;
      }

      if (Array.isArray(val)) {
        if (key === "paymentPlans") {
          // Append each object in paymentPlans as a JSON string
          formData.append("paymentPlans", val.length ? JSON.stringify(val) : null);
        } else {
          // For other arrays, append each value individually with key[]
          val.forEach((v) => {
            formData.append(`${key}[]`, v);
          });
        }
      } else {
        formData.append(key, val);
      }
    });

    // Debug: Log the FormData entries
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

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
      <BackButton label="Back to Events List" to="/events" />{" "}
      <section className="bg-white rounded-2xl p-6 shadow mt-6">
        <h3 className="font-bold text-lg mb-4">
          {slug ? "Edit" : "Create"} {isConference ? "Conference" : "Event"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 gap-x-6">
          {/* Conference Type Toggle */}
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("isConference")} className="form-checkbox h-4 w-4 text-primary" />
                <span className="font-medium">This is a Conference</span>
              </label>
            </div>
          </div>
          {/* Conference-specific fields */}
          {isConference && (
            <>
              <Select
                label="conferenceType"
                title="Conference Type"
                control={control}
                options={conferenceTypes}
                required={isConference}
              />

              {conferenceType === "Zonal" && (
                <Select
                  label="conferenceZone"
                  title="Conference Zone"
                  control={control}
                  options={conferenceZones}
                  required={conferenceType === "Zonal"}
                />
              )}

              {conferenceType === "Regional" && (
                <Select
                  label="conferenceRegion"
                  title="Conference Region"
                  control={control}
                  options={conferenceRegions}
                  required={conferenceType === "Regional"}
                />
              )}

              <TextInput
                label="regularRegistrationEndDate"
                title="Regular Registration End Date"
                type="datetime-local"
                register={register}
                errors={errors}
                required={isConference}
              />

              <TextInput
                label="lateRegistrationEndDate"
                title="Late Registration End Date"
                type="datetime-local"
                register={register}
                errors={errors}
                required={isConference}
              />

              <TextInput
                label="paystackSplitCode"
                title="Paystack Split Code (Optional)"
                register={register}
                errors={errors}
                placeholder="SPL_xxxxxx"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("usePayPalForGlobal")}
                  className="form-checkbox h-4 w-4 text-primary"
                />
                <label className="text-sm font-medium">Use PayPal for Global Network</label>
              </div>
            </>
          )}
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
            options={["Physical", "Virtual", "Hybrid"].map((v) => ({ label: v, value: v }))}
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
          />{" "}
          <div className="col-span-2 my-4">
            <div className="flex items-center gap-8 mb-4">
              <h3 className="font-semibold text-sm">Payment Plans</h3>
              <Button
                variant="outlined"
                label={isPaid ? "Remove Plans" : "Add Plans"}
                onClick={() => setIsPaid(!isPaid)}
              />
            </div>

            {isPaid ? (
              <div className="space-y-4">
                {useMultipleRegistrationPeriods ? (
                  // Conference with multiple registration periods
                  <>
                    <h4 className="font-medium text-sm text-gray-700 mb-3">Regular Registration Prices</h4>
                    {["Student", "Doctor", "GlobalNetwork"].map((role) => (
                      <div key={`${role}_Regular`} className="flex items-center gap-8 mb-3">
                        <p className="text-sm font-medium flex-shrink-0 w-1/3">
                          {role + "s - Regular (" + (role === "GlobalNetwork" ? "USD" : "NGN") + ")"}
                        </p>
                        <TextInput
                          label={`paymentPlans.${role}_Regular`}
                          type="number"
                          showTitleLabel={false}
                          register={register}
                          errors={errors}
                          required
                          placeholder={
                            "e.g. " +
                            (role === "GlobalNetwork"
                              ? formatCurrency(20, "USD")
                              : formatCurrency(role == "Student" ? 500 : 3500))
                          }
                          className="w-1/4"
                        />
                      </div>
                    ))}

                    <h4 className="font-medium text-sm text-gray-700 mb-3 mt-6">Late Registration Prices</h4>
                    {["Student", "Doctor", "GlobalNetwork"].map((role) => (
                      <div key={`${role}_Late`} className="flex items-center gap-8 mb-3">
                        <p className="text-sm font-medium flex-shrink-0 w-1/3">
                          {role + "s - Late (" + (role === "GlobalNetwork" ? "USD" : "NGN") + ")"}
                        </p>
                        <TextInput
                          label={`paymentPlans.${role}_Late`}
                          type="number"
                          showTitleLabel={false}
                          register={register}
                          errors={errors}
                          required
                          placeholder={
                            "e.g. " +
                            (role === "GlobalNetwork"
                              ? formatCurrency(30, "USD")
                              : formatCurrency(role == "Student" ? 750 : 5000))
                          }
                          className="w-1/4"
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  // Regular event pricing
                  ["Student", "Doctor", "GlobalNetwork"].map((role) => (
                    <div key={role} className="flex items-center gap-8 mb-3">
                      <p className="text-sm font-medium flex-shrink-0">
                        Price for {role + "s (" + (role === "GlobalNetwork" ? "USD" : "NGN") + ")"}
                      </p>
                      <TextInput
                        label={`paymentPlans.${role}`}
                        type="number"
                        showTitleLabel={false}
                        register={register}
                        errors={errors}
                        required
                        placeholder={
                          "e.g. " +
                          (role === "GlobalNetwork"
                            ? formatCurrency(20, "USD")
                            : formatCurrency(role == "Student" ? 500 : 3500))
                        }
                        className="w-1/4"
                      />
                    </div>
                  ))
                )}
              </div>
            ) : null}
          </div>
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
