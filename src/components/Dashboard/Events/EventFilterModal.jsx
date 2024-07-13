import { useForm } from "react-hook-form";
import Button from "~/components/Global/Button/Button";
import Select from "~/components/Global/FormElements/Select/Select";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Modal from "~/components/Global/Modal/Modal";

const EventFilterModal = ({ isOpen, onClose, onSubmit = console.log }) => {
  const { control, handleSubmit, register, reset } = useForm({ mode: "all" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={400} title="Filter Events">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select label="eventType" control={control} options={["Physical", "Virtual"]} required={false} errors={{}} />
        <Select
          label="membersGroup"
          control={control}
          options={["Student", "Doctor", "GlobalNetwork"]}
          required={false}
          errors={{}}
        />
        <TextInput type="date" label="eventDate" register={register} errors={{}} required={false} />
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

export default EventFilterModal;
