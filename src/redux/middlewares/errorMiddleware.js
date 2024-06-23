import { toast } from "react-toastify";

const errorMiddleware = () => (next) => (action) => {
  const isRejected = action.type.endsWith("/rejected");
  const isFulfilled = action.type.endsWith("/fulfilled");

  const payload = action.payload || {};
  const { data, error, message } = payload;
  const errorMessage = data
    ? Array.isArray(data?.message)
      ? data?.message?.[0]
      : Array.isArray(data?.error)
        ? data?.error?.[0]
        : data?.message || data?.error
    : message || error || "Oops, something went wrong!";

  console.log("err", errorMessage);
  if ((isFulfilled && error) || isRejected) {
    toast.error(errorMessage);
  }

  return next(action);
};

export default errorMiddleware;
