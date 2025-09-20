export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
};
