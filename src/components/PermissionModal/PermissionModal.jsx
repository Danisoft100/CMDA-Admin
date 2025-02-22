import Modal from "../Global/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, toggleNotAllowed } from "~/redux/features/auth/authSlice";
import { MdInfoOutline } from "react-icons/md";
import Button from "../Global/Button/Button";
import { useLocation } from "react-router-dom";

const PermissionModal = () => {
  const { notAllowed } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from;

  const onClose = () => {
    dispatch(toggleNotAllowed(false));
  };

  return (
    <Modal isOpen={notAllowed} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-3">
        <MdInfoOutline className="text-error h-14 w-14" />
        <h3 className="text-lg font-medium">Access Denied</h3>
        <p className="text-center">
          You do not have permission to view this page:
          <br />
          <i className="text-error underlie font-medium">{from?.pathname}</i>
          <br />
          Contact the administrator if you believe this is a mistake.
        </p>
        <Button className="w-full" onClick={onClose}>
          Okay
        </Button>
      </div>
    </Modal>
  );
};

export default PermissionModal;
