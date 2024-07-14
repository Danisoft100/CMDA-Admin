import icons from "~/assets/js/icons";
import { classNames } from "~/utilities/classNames";

const ContactListItem = ({ name = "No Name", image = null, subText = null, asHeader = false, onClick = () => {} }) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-2 p-2 transition-all duration-500",
        !asHeader && "hover:bg-onPrimary hover:rounded-lg cursor-pointer"
      )}
      onClick={onClick}
    >
      {image ? (
        <img src={image} className="bg-onPrimary rounded-full object-cover h-12 w-12" />
      ) : (
        <span className="h-12 w-12 flex-shrink-0 bg-onSecondary rounded-full inline-flex items-center justify-center text-3xl">
          {icons.person}
        </span>
      )}
      <div className="truncate">
        <h5 className="font-semibold text-sm truncate">{name}</h5>
        {subText && <p className="text-xs truncate">{subText}</p>}
      </div>
    </div>
  );
};

export default ContactListItem;
