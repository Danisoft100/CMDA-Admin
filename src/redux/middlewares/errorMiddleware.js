import { toast } from "react-toastify";

const errorMiddleware = () => (next) => (action) => {
  const isRejected = action.type.endsWith("/rejected");
  const isFulfilled = action.type.endsWith("/fulfilled");

  // check for error message
  const errorMessage =
    action.payload?.data?.error ||
    action.payload?.data?.message ||
    action.error?.message ||
    action?.error ||
    action.payload?.error ||
    "Oops, something went wrong!";

  // check if action is rejected or is fufilled but an error exists
  if ((isFulfilled && action.payload?.error) || isRejected) {
    // Use toast.error to show a toast with the error message
    toast.error(errorMessage);
  }

  // Pass the action to the next middleware or the reducer
  return next(action);
};

export default errorMiddleware;
