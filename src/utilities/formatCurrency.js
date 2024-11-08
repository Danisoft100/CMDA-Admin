export const formatCurrency = (amount = 0, currency = "NGN") => {
  const formatter = new Intl.NumberFormat("en-NG", {
    currency,
    style: "currency",
  });

  return formatter.format(+amount);
};
