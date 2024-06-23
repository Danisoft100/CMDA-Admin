import { classNames } from "~/utilities/classNames";
import { useEffect } from "react";
import icons from "~/assets/js/icons";

const Modal = ({ isOpen, onClose, className, title, subtitle, showCloseBtn = true, children, maxWidth = 480 }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 overflow-auto transition-opacity duration-300 scrollbar-hide",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
        <div
          className={classNames(
            "bg-white p-6 rounded-lg z-10 transform transition-transform duration-300 shadow-md w-full",
            isOpen ? "translate-y-0" : "translate-y-full",
            className
          )}
          style={{ maxWidth }}
        >
          {title && (
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold">{title}</h3>
                {subtitle && <p className="text-gray text-sm">{title}</p>}
              </div>
              {showCloseBtn && (
                <button type="button" className="text-xl text-gray-dark" onClick={onClose}>
                  {icons.close}
                </button>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
