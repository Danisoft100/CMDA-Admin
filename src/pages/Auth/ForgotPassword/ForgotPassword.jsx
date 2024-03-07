import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Button from "~/components/Global/Button/Button";
import { Link } from "react-router-dom";
import { usePasswordForgotMutation } from "~/redux/api/auth/authApi";
import { EMAIL_PATTERN } from "~/utilities/regExpValidations";
import { toast } from "react-toastify";
import ConfirmationModal from "~/components/Global/ConfirmationModal/ConfirmationModal";
import icons from "~/assets/js/icons";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  const [passwordForgot, { isLoading }] = usePasswordForgotMutation();
  const [resendOtp, { isLoading: isResending }] = usePasswordForgotMutation();

  const handleForgotPassword = (payload) => {
    passwordForgot(payload)
      .unwrap()
      .then((data) => {
        setMessage(data?.message);
        setOpenModal(true);
      });
  };

  const handleResend = () => {
    resendOtp()
      .unwrap()
      .then(() => toast.success("OTP resent successfully"));
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Forgot password?</h2>
          <p className="text-gray-dark mt-1">Enter your email to get a reset OTP</p>
        </div>

        <TextInput
          label="email"
          title="Email Address"
          type="email"
          required={true}
          register={register}
          errors={errors}
          placeholder="Enter your email address"
          rules={{ pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" } }}
        />

        <div className="flex items-center gap-2 text-sm">
          Didn&apos;t get email?
          <Button
            variant="text"
            loading={isResending}
            loadingText="Resending..."
            label="Resend"
            className="px-[8px] h-[32px]"
            onClick={handleResend}
          />
        </div>

        <div className="flex flex-col">
          <Button type="submit" large className="mb-4" loading={isLoading}>
            Send OTP
          </Button>

          <Link to="/login" className="mx-auto text-primary font-semibold text-sm hover:underline">
            Back to Login
          </Link>
        </div>
      </form>

      {/*  */}
      <ConfirmationModal
        isOpen={openModal}
        title="Email Sent Successfully"
        subtitle={message}
        mainAction={() => setOpenModal(false)}
        mainActionText="Close and Check Email"
        maxWidth={400}
        icon={icons.check}
      />
    </>
  );
};

export default ForgotPassword;
