import { classNames } from "~/utilities/classNames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useOutsideAlerter = (ref, setX) => {
  useEffect(() => {
    // handle if clicked on outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
};

const Dropdown = ({ toggleElement, children, className }) => {
  const wrapperRef = useRef(null);
  const toggleRef = useRef(null);
  const [openWrapper, setOpenWrapper] = useState(false);
  const [positionClass, setPositionClass] = useState("");
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  const determinePosition = useCallback(() => {
    const toggleRect = toggleRef.current?.getBoundingClientRect();
    if (toggleRect) {
      const windowHeight = window.innerHeight;
      const spaceAbove = toggleRect.top;
      const spaceBelow = windowHeight - toggleRect.bottom;

      const topPositionClass = spaceAbove > spaceBelow ? "bottom-full -mb-2" : "top-full -mt-2";
      const leftPositionClass = toggleRect.left < window.innerWidth / 2 ? "left-0" : "right-0";

      setPositionClass(`${topPositionClass} ${leftPositionClass}`);
    }
  }, [toggleRef]);

  const originClass = useMemo(() => {
    return positionClass.includes("top") && positionClass.includes("left")
      ? "origin-top-left"
      : positionClass.includes("bottom") && positionClass.includes("left")
        ? "origin-bottom-left"
        : positionClass.includes("bottom") && positionClass.includes("right")
          ? "origin-bottom-right"
          : "origin-top-right";
  }, [positionClass]);

  useEffect(() => {
    determinePosition();
  }, [determinePosition]);

  return (
    <div ref={wrapperRef} className="relative select-none">
      <div onMouseDown={() => setOpenWrapper(!openWrapper)} className="inline-block cursor-pointer">
        {toggleElement}
      </div>
      <div
        ref={toggleRef}
        className={classNames(
          "absolute z-[2] transition-all duration-300 ease-in-out min-w-full",
          openWrapper ? "scale-100" : "scale-0",
          positionClass,
          originClass,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
