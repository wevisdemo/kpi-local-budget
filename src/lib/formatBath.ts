export function formatBaht(value: number) {
  const millions = value / 1_000_000;
  return millions.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}
