const FormError = ({ error }) => {
  return error ? <p className="text-error text-xs font-medium mt-1.5">{error}</p> : null;
};

export default FormError;
