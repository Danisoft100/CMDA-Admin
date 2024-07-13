import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "~/components/Global/Button/Button";
import Select from "~/components/Global/FormElements/Select/Select";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Modal from "~/components/Global/Modal/Modal";

const CreateAdminModal = ({ isOpen, onClose, admin, onSubmit, loading }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm({ mode: "all" });

  useEffect(() => {
    if (admin) {
      ["fullName", "role", "email"].forEach((key) => {
        setValue(key, admin[key]);
      });
    } else {
      reset();
    }
  }, [admin, setValue, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={admin ? "Update Admin Role" : "Add New Admin"} showCloseBtn>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <TextInput label="fullName" register={register} required errors={errors} readOnly={admin} />
        <TextInput label="email" register={register} required errors={errors} readOnly={!!admin} />
        <Select
          label="role"
          control={control}
          required
          errors={errors}
          options={["SuperAdmin", "Admin", "FinanceAdmin"].map((x) => ({ label: x, value: x }))}
        />
        <div className="flex justify-end">
          <Button label={admin ? "Save Changes" : "Submit"} type="submit" loading={loading} className="w-1/2 mt-1" />
        </div>
      </form>
    </Modal>
  );
};

export default CreateAdminModal;
