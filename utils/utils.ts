
export function autoFormatNumber(num: number): number {
  if (typeof num !== "number" || isNaN(num)) {
    return num;
  }

  const str = num.toString();

  if (!str.includes(".")) {
    return num;
  }

  const decimalPart = str.split(".")[1];

  if (decimalPart.length === 1) {
    return num;
  }

  if (decimalPart.length === 2) {
    return num;
  }

  return Number(num.toFixed(2));
}

// -----------------------------
// change timestamp → datetime format
// -----------------------------
export const formatTimestamp = (ts?: number | null): string => {
  if (!ts) return "";
  const ms = ts < 1e12 ? ts * 1000 : ts;
  return new Date(ms).toLocaleString("en-US", {
    year: "numeric",
    month: "short", // Jan, Feb, Mar...
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};