export const currencyFormatter = (value: number) => {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "CRC",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
  });
};
