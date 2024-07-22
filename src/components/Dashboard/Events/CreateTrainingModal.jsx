import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "~/components/Global/Button/Button";
import Select from "~/components/Global/FormElements/Select/Select";
// import TextArea from "~/components/Global/FormElements/TextArea/TextArea";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Modal from "~/components/Global/Modal/Modal";

const CreateTrainingModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({ mode: "all" });

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Training" maxWidth={400} showCloseBtn>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput label="name" required register={register} errors={errors} />

        <Select label="membersGroup" control={control} options={["Student", "Doctor"]} required errors={errors} />

        {/* <TextArea
          label="description"
          register={register}
          errors={errors}
          rows={3}
          placeholder="optional"
          required={false}
        /> */}

        <Button label="Submit" type="submit" loading={loading} className="mt-2 w-full" />
      </form>
    </Modal>
  );
};

export default CreateTrainingModal;
