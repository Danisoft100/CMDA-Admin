import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Button from "~/components/Global/Button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfirmationModal from "~/components/Global/ConfirmationModal/ConfirmationModal";
import icons from "~/assets/js/icons";
import { usePasswordResetMutation } from "~/redux/api/auth/authApi";
import { toast } from "react-toastify";

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [confirm, setConfirm] = useState(false);
  const [passwordReset, { isLoading }] = usePasswordResetMutation();

  const handleResetPassword = async (payload) => {
    const resetData = { ...payload, token };
    passwordReset(resetData)
      .unwrap()
      .then(() => setConfirm(true))
      .catch((error) => toast.error(error));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">New Password</h2>
      <p className=" text-gray-dark text-sm">Kindly input your New Password to Login into your account </p>
      <form className="my-6" onSubmit={handleSubmit(handleResetPassword)}>
        <div className="max-w-[480px] w-full">
          <div className="mb-4  text-gray-500">
            <TextInput
              type="password"
              label="newPassword"
              required={true}
              register={register}
              errors={errors}
              placeholder="Enter password"
              className="text-gray-500"
            />
          </div>
          <div className="mb-4  text-gray-500">
            <TextInput
              type="password"
              label="confirmNewPassword"
              required={true}
              register={register}
              errors={errors}
              placeholder="Enter password"
              className="text-gray-500"
            />
          </div>

          <div className="grid w-full">
            <Button type="submit" large loading={isLoading}>
              Change Password
            </Button>
          </div>
        </div>
      </form>

      <ConfirmationModal
        icon={icons.check}
        title="Congratulations"
        subtitle={`Password reset successfully`}
        subAction={null}
        maxWidth={400}
        mainAction={() => navigate("/login")}
        mainActionText="Go Back to Login"
        isOpen={confirm}
        onClose={() => setConfirm(false)}
      />
    </div>
  );
};

export default NewPassword;
