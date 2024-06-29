import { classNames } from "~/utilities/classNames";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

const ConfirmationModal = ({
  isOpen,
  onClose,
  icon,
  title = "Title",
  subtitle = "Are you sure you want to do this?",
  mainAction, // function for the mainAction - button with filled variant // set as null to hide
  mainActionText = "Yes, Proceed",
  mainActionLoading = false,
  subAction, // function for subAction - outlined button // set as null to hide
  subActionText = "No, Cancel",
  subActionLoading = false,
  maxWidth = 480,
  actionsFlex = "flex-row", // flex-row-reverse, flex-col, flex-col-reverse ==> change the flex direction of the action buttons
  titleClassName, // classNames to adjust the styling of the title
  subtitleClassName, // classNames to adjust the styling of the subtitle
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="m-4" maxWidth={maxWidth}>
      <div className="flex flex-col gap-4">
        {icon && (
          <span
            className={classNames(
              "text-3xl rounded-full w-14 h-14 inline-flex justify-center items-center mx-auto p-2",
              "bg-onPrimary text-primary"
            )}
          >
            {icon}
          </span>
        )}
        <div className="text-center">
          {title && <h4 className={classNames("text-lg font-semibold mb-1", titleClassName)}>{title}</h4>}
          <p className={classNames("text-sm", subtitleClassName)}>{subtitle}</p>
        </div>
        {(mainAction || subAction) && (
          <div className={classNames("flex gap-4", actionsFlex)}>
            {subAction && (
              <div className="flex-1">
                <Button className="w-full" variant="outlined" loading={subActionLoading} onClick={subAction || onClose}>
                  {subActionText}
                </Button>
              </div>
            )}
            {mainAction && (
              <div className="flex-1">
                <Button className="w-full" loading={mainActionLoading} onClick={mainAction || onClose}>
                  {mainActionText}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
