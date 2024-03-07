import { classNames } from "~/utilities/classNames";
import { useRef, useState } from "react";

const OTPInput = ({
  length = 4, // adjust to desired number of inputs,
  onComplete = console.log, // function to handle the otp. it is called only when all fields have been filled
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const inputRefs = Array.from({ length }, () => useRef(null));
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // call onComplete handle when all fields have been filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
    // Focus on the next input
    if (value !== "" && index < length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      // Clear the value of the current input on Backspace
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      // Move focus to the previous input
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          ref={ref}
          type="text"
          value={otp[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength="1"
          className={classNames(
            "bg-onPrimary border border-gray rounded-md w-12 h-12 text-base font-medium text-center",
            "focus:ring focus:ring-primary/20 focus:outline-none focus:bg-white focus:border-transparent transition-all"
          )}
        />
      ))}
    </div>
  );
};

export default OTPInput;
