import icons from "~/assets/js/icons";
import { classNames } from "~/utilities/classNames";

const Drawer = ({ active, children, setActive, containerClassName, side = "right" }) => {
  return (
    <div
      className={classNames(
        "fixed w-screen min-h-screen bg-[#00000052] flex justify-center items-center overflow-x-hidden overflow-y-auto  inset-0 transition-all duration-300 lg:hidden",
        active ? "opacity-1 z-[8000]" : "opacity-0 -z-10 delay-20000",
        containerClassName
      )}
    >
      <div
        className={classNames(
          "w-full bg-white absolute top-0 transition-all duration-500 delay-75",
          active && side === "right" ? "left-0" : "left-[100%]",
          active && side === "left" ? "right-0" : "right-[100%]"
        )}
      >
        {children}
        <div
          className="text-white bg-primary p-2 flex justify-center items-center absolute top-3 right-5 cursor-pointer rounded-full"
          onClick={() => setActive(false)}
        >
          {icons.close}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
