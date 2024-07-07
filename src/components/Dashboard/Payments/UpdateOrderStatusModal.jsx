import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "~/components/Global/Button/Button";
import Select from "~/components/Global/FormElements/Select/Select";
import TextArea from "~/components/Global/FormElements/TextArea/TextArea";
import Modal from "~/components/Global/Modal/Modal";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";

const UpdateOrderStatusModal = ({ isOpen, onClose, order, onSubmit, loading }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({ mode: "all" });

  useEffect(() => {
    setValue("status", order?.status);
  }, [order, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Order Status" maxWidth={400} showCloseBtn>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="status"
          control={control}
          required
          errors={errors}
          options={["pending", "shipped", "delivered", "canceled"].map((x) => ({
            label: convertToCapitalizedWords(x),
            value: x,
          }))}
        />
        <TextArea label="comment" register={register} required errors={errors} rows={3} />

        <Button label="Submit" type="submit" loading={loading} className="mt-2 w-full" />
      </form>
    </Modal>
  );
};

export default UpdateOrderStatusModal;
