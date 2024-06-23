export const formatCurrency = (amount = 0) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  });

  return formatter.format(+amount);
};
