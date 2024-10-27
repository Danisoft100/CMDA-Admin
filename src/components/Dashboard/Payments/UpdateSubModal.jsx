import { useForm } from "react-hook-form";
import Button from "~/components/Global/Button/Button";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Modal from "~/components/Global/Modal/Modal";

const UpdateSubModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Activate Subscription Status" maxWidth={400} showCloseBtn>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput title="Date Subscribed" label="subDate" type="date" register={register} required errors={errors} />

        <Button label="Submit" type="submit" loading={loading} className="mt-2 w-full" />
      </form>
    </Modal>
  );
};

export default UpdateSubModal;
