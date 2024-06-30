import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import icons from "~/assets/js/icons";
import Button from "~/components/Global/Button/Button";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import { useChangePasswordMutation, useUpdateProfileMutation } from "~/redux/api/authApi";
import { logout, selectAuth, setUser } from "~/redux/features/auth/authSlice";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: { fullName: user?.fullName, email: user?.email, role: user?.role },
  });

  const {
    register: registerPwd,
    handleSubmit: handlePwdSubmit,
    formState: { errors: pwdErrors },
  } = useForm({ mode: "all" });

  const onSubmitProfile = ({ fullName }) => {
    updateProfile({ fullName })
      .unwrap()
      .then((res) => {
        toast.success("Profile UPDATED successfully");
        dispatch(setUser(res));
      });
  };

  const onSubmitPassword = (payload) => {
    changePassword(payload)
      .unwrap()
      .then(() => {
        toast.success("Password UPDATED successfully");
        navigate("/login");
        dispatch(logout());
      });
  };

  return (
    <div className="flex gap-6">
      <section className="w-full md:w-1/2 bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Profile Info</h3>
        <div className="flex justify-center mb-4">
          <span className="size-20 bg-onPrimary rounded-full inline-flex items-center justify-center text-5xl text-primary">
            {icons.person}
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmitProfile)} className="flex flex-col gap-4">
          <TextInput label="fullName" register={register} errors={errors} required />
          <TextInput label="email" register={register} errors={errors} readOnly />
          <TextInput label="role" register={register} errors={errors} readOnly />
          <Button label="Save Changes" loading={isLoading} type="submit" className="ml-auto w-full md:w-1/2" />
        </form>
      </section>

      <section className="w-full md:w-1/2 bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Password Info</h3>
        <div className="flex justify-center mb-4">
          <span className="size-20 bg-onPrimary rounded-full inline-flex items-center justify-center text-4xl text-primary">
            {icons.lock}
          </span>
        </div>
        <form onSubmit={handlePwdSubmit(onSubmitPassword)} className="flex flex-col gap-4">
          <TextInput label="oldPassword" type="password" register={registerPwd} errors={pwdErrors} required />
          <TextInput label="newPassword" type="password" register={registerPwd} errors={pwdErrors} required />
          <TextInput label="confirmPassword" type="password" register={registerPwd} errors={pwdErrors} required />
          <Button label="Change Password" type="submit" loading={isChanging} className="ml-auto w-full md:w-1/2" />
        </form>
      </section>
    </div>
  );
};

export default MyProfile;
