import { useForm } from "react-hook-form";
import Button from "~/components/Global/Button/Button";
import Select from "~/components/Global/FormElements/Select/Select";
import Modal from "~/components/Global/Modal/Modal";

const TrainingFilterModal = ({ isOpen, onClose, onSubmit = console.log }) => {
  const { control, handleSubmit, reset } = useForm({ mode: "all" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={400} title="Filter Trainings">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select label="membersGroup" control={control} options={["Student", "Doctor"]} required={false} errors={{}} />
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

export default TrainingFilterModal;
