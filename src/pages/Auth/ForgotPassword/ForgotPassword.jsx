import { useForm } from "react-hook-form";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Button from "~/components/Global/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { usePasswordForgotMutation } from "~/redux/api/authApi";
import { EMAIL_PATTERN } from "~/utilities/regExpValidations";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const navigate = useNavigate();

  const [passwordForgot, { isLoading }] = usePasswordForgotMutation();

  const handleForgotPassword = (payload) => {
    passwordForgot(payload)
      .unwrap()
      .then((data) => {
        toast.success(data.message);
        navigate("/reset-password");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Reset password?</h2>
          <p className="text-gray-dark text-sm max-w-72 mx-auto mt-4">
            To reset your password, enter your email address. An OTP will be sent to your email.
          </p>
        </div>

        <TextInput
          label="email"
          title="Email"
          type="email"
          required={true}
          register={register}
          errors={errors}
          placeholder="Enter your email address"
          rules={{ pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" } }}
        />

        <div className="flex flex-col">
          <Button type="submit" large className="mb-4" loading={isLoading}>
            Send Reset Token
          </Button>

          <Link to="/login" className="mx-auto text-primary font-semibold text-sm hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
