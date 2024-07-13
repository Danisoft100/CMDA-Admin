import { useForm } from "react-hook-form";
import Button from "~/components/Global/Button/Button";
import Select from "~/components/Global/FormElements/Select/Select";
import Modal from "~/components/Global/Modal/Modal";
import { doctorsRegionLists, globalRegionsData, studentChapterOptions } from "~/utilities/reusableVariables";

const MembersFilterModal = ({ isOpen, onClose, onSubmit = console.log }) => {
  const { control, handleSubmit, reset, watch, setValue } = useForm({ mode: "all" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={400} title="Filter Members">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          title="Member Type"
          label="role"
          control={control}
          options={["Student", "Doctor", "GlobalNetwork"]}
          required={false}
          errors={{}}
          onSelect={() => setValue("region", null)}
        />
        <Select
          title="Chapter/Region"
          label="region"
          control={control}
          options={
            watch("role") === "Student"
              ? studentChapterOptions
              : watch("role") === "Doctor"
                ? doctorsRegionLists
                : watch("role") === "GlobalNetwork"
                  ? globalRegionsData
                  : []
          }
          required={false}
          errors={{}}
        />
        <Button label="Apply Filter" type="submit" large className="w-full" />
        <div>
          <button
            type="button"
            onClick={() => {
              reset();
              onSubmit({});
            }}
            className="text-primary font-semibold text-sm underline"
          >
            Reset Filters
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MembersFilterModal;
