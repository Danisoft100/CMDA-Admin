import icons from "~/assets/js/icons";
import Button from "../Button/Button";

const PageHeader = ({ title, subtitle, action, actionIcon, actionLabel }) => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h2 className="font-bold text-lg">{title}</h2>
        {subtitle && <p className="text-gray text-sm">{subtitle}</p>}
      </div>
      {action && <Button icon={actionIcon || icons.plus} label={actionLabel} onClick={action} />}
    </header>
  );
};

export default PageHeader;
