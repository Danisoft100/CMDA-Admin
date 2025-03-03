import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "~/components/Global/BackButton/BackButton";
import Button from "~/components/Global/Button/Button";
import RadioGroup from "~/components/Global/FormElements/RadioGroup/RadioGroup";
import Select from "~/components/Global/FormElements/Select/Select";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import { useCreateMemberMutation, useGetMemberByIdQuery, useUpdateMemberMutation } from "~/redux/api/membersApi";
import { EMAIL_PATTERN } from "~/utilities/regExpValidations";
import {
  admissionYearOptions,
  currentYearOptions,
  doctorsRegionLists,
  genderOptions,
  globalRegionsData,
  studentChapterOptions,
} from "~/utilities/reusableVariables";

const AddMember = () => {
  const fourteenYrsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split("T")[0];

  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");
  const { data: member } = useGetMemberByIdQuery(edit, { skip: !edit });

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      role: member?.role || "Student",
      firstName: member?.firstName,
      middleName: member?.middleName,
      lastName: member?.lastName,
      phone: member?.phone,
      region: member?.region,
      dateOfBirth: member?.dateOfBirth?.slice(0, 10),
      email: member?.email,
      admissionYear: member?.admissionYear,
      gender: member?.gender,
      yearOfStudy: member?.yearOfStudy,
      licenseNumber: member?.licenseNumber,
      specialty: member?.specialty,
      yearsOfExperience: member?.yearsOfExperience,
    },
  });

  const role = watch("role");

  const [createMember, { isLoading }] = useCreateMemberMutation();
  const [updateMember, { isLoading: isUpdating }] = useUpdateMemberMutation();
  const navigate = useNavigate();

  const onSubmit = (payload) => {
    if (edit && member?._id) {
      updateMember({ id: edit, body: payload })
        .unwrap()
        .then(() => {
          toast.success("Member profile UPDATED");
          navigate(-1);
        });
    } else {
      createMember(payload)
        .unwrap()
        .then(() => {
          toast.success("Member account CREATED");
          navigate(-1);
        });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-md mb-4">
        <BackButton />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg p-6 w-full shadow-sm max-w-screen-md grid grid-cols-2 gap-6"
      >
        <div className="col-span-2">
          <h2 className="text-xl font-bold">{edit ? `Edit ${member?.role}` : `Add New`} Member</h2>
        </div>
        {!edit && (
          <div className="col-span-2">
            <RadioGroup
              title="Select Member Type"
              label="role"
              control={control}
              options={["Student", "Doctor", "GlobalNetwork"].map((x) => ({ label: x, value: x }))}
              errors={errors}
            />
          </div>
        )}
        <div>
          <TextInput
            title="First name"
            label="firstName"
            type="text"
            register={register}
            errors={errors}
            required
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <TextInput
            title="Middle name (optional)"
            label="middleName"
            type="text"
            register={register}
            errors={errors}
            placeholder="Enter your middle name"
          />
        </div>

        <div>
          <TextInput
            title="Last name"
            label="lastName"
            type="text"
            register={register}
            errors={errors}
            required
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <TextInput
            title="Date of Birth"
            label="dateOfBirth"
            register={register}
            errors={errors}
            type="date"
            max={fourteenYrsAgo}
            required
          />
        </div>

        <div className="w-full">
          <Select
            label="gender"
            control={control}
            options={genderOptions}
            errors={errors}
            required={"Select your gender"}
            placeholder="Male or Female"
          />
        </div>

        <div>
          <TextInput type="tel" title="Phone number (optional)" label="phone" register={register} errors={errors} />
        </div>
        <div className="col-span-2">
          <TextInput
            title="Email Address"
            label="email"
            register={register}
            errors={errors}
            required
            placeholder="Enter email address"
            rules={{
              pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" },
            }}
          />
        </div>

        <div className="col-span-2">
          <Select
            label="region"
            control={control}
            options={
              role === "Doctor"
                ? doctorsRegionLists
                : role === "GlobalNetwork"
                  ? globalRegionsData
                  : studentChapterOptions
            }
            errors={errors}
            required
            title="Chapter/Region"
            placeholder="choose your chapter/region"
          />
        </div>

        {role === "Student" ? (
          <>
            <div className="w-full">
              <Select
                label="admissionYear"
                control={control}
                options={admissionYearOptions}
                errors={errors}
                required
                title="Admission Year"
                placeholder="year of admission"
              />
            </div>

            <div className="w-full">
              <Select
                label="yearOfStudy"
                control={control}
                options={currentYearOptions}
                errors={errors}
                required
                title="Current year of study"
                placeholder="Enter current level/year"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <TextInput
                title="License number"
                label="licenseNumber"
                register={register}
                errors={errors}
                required
                placeholder="Enter your license number"
              />
            </div>

            <div>
              <TextInput
                label="specialty"
                type="text"
                register={register}
                errors={errors}
                required
                placeholder="professional Cadre"
              />
            </div>

            <div>
              <Select
                label="yearsOfExperience"
                control={control}
                options={["0 - 5 Years", "5 Years and Above"]}
                errors={errors}
                required
                placeholder="Select..."
              />
            </div>
          </>
        )}

        <div className="col-span-2">
          <Button
            type="submit"
            label={edit ? "Edit Member" : "Create Member"}
            className="w-full flex"
            large
            loading={isLoading || isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default AddMember;
