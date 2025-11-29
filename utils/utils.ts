
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

// Weather → emoji icon (day/night aware)
export const weatherIcon = (condition: string) => {
  const hour = new Date().getHours(); // 使用者本地時間

  const isDay = hour >= 6 && hour < 18;

  switch (condition) {
    case "Clear":
      return isDay ? "☀️" : "🌙";   // 白天太陽 / 晚上月亮

    case "Clouds":
      return isDay ? "🌤️" : "☁️";   // 白天帶太陽的雲 / 晚上雲

    case "Rain":
      return "🌧️";

    case "Drizzle":
      return isDay  ? "🌦️" : "🌧️";

    case "Snow":
      return "❄️";

    case "Thunderstorm":
      return "⛈️";

    default:
      return "🌫️"; // Mist / Fog / Others
  }
};
