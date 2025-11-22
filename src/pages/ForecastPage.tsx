import { useState } from "react";
import ChartView from "../components/ChartView";
import PressureCard from "../components/PressureCard";
import BackHome from "../components/BackHome";

type Range = "6h" | "12h" | "24h";
type Tab = "forecast" | "historical";

interface ForecastSeries {
  labels: string[];
  actual: number[];
  forecast: number[];
  weather: string;
  currentPressure: number;
}

const ForecastPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>("forecast");
  const [range, setRange] = useState<Range>("6h");

  // ----- Mock Data -----
  const forecastData: Record<Range, ForecastSeries> = {
    "6h": {
      labels: ["-3h", "-2h", "-1h", "now", "+1h", "+2h", "+3h", "+4h", "+5h", "+6h"],
      actual: [1012, 1011.4, 1011.1, 1010.8],
      forecast: [1010.5, 1010.2, 1009.9, 1009.7, 1009.5, 1009.2],
      weather: "Rain likely",
      currentPressure: 1010.8,
    },
    "12h": {
      labels: Array.from({ length: 16 }, (_, i) => (i - 4) + "h"),
      actual: Array.from({ length: 4 }, (_, i) => 1012 - i * 0.3),
      forecast: Array.from({ length: 12 }, (_, i) => 1010 - i * 0.1),
      weather: "Cloudy improving",
      currentPressure: 1010.0,
    },
    "24h": {
      labels: Array.from({ length: 28 }, (_, i) => (i - 4) + "h"),
      actual: [1008, 1008.5, 1009, 1009.5],
      forecast: Array.from({ length: 24 }, (_, i) => 1010 + Math.sin(i / 4)),
      weather: "Stable",
      currentPressure: 1009.5,
    },
  };

  const mockHistoricalPhy = [1012, 1011.4, 1011.2, 1011.0];
  const mockHistoricalOWM = [1011.8, 1011.1, 1010.9, 1010.7];
  const mockFusion = [1012, 1011.3, 1011.05, 1010.8];

  const current = forecastData[range];

  // ----- Combined Forecast + Actual Plot -----
  const mergedLabels = current.labels;
  const mergedData = [
    ...current.actual,
    ...current.forecast,
  ];

  const actualLength = current.actual.length;

  return (
    <div className="w-[50vw] mx-auto p-6 flex flex-col gap-6">
    <BackHome />
      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        <button
          className={`px-4 py-2 ${
            tab === "forecast" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
          }`}
          onClick={() => setTab("forecast")}
        >
          Forecast
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "historical" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
          }`}
          onClick={() => setTab("historical")}
        >
          Historical
        </button>
      </div>

      {/* ---------- FORECAST TAB ---------- */}
      {tab === "forecast" && (
        <div className="flex flex-col gap-6">
          {/* Range Selection */}
          <div className="flex gap-3">
            {(["6h", "12h", "24h"] as Range[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setRange(opt)}
                className={`px-4 py-2 rounded-xl border ${
                  range === opt ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {opt.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Current Pressure + Weather */}
          <PressureCard
            pressure={current.currentPressure}
            weather={current.weather}
            updatedAt="now"
          />

          {/* Actual + Forecast on same chart */}
          <ChartView
            title={`Actual + Forecast (${range})`}
            labels={mergedLabels}
            data={mergedData}
            splitIndex={actualLength}  // <--- 新增參數：告訴 component 何處開始變成預測線
          />
        </div>
      )}

      {/* ---------- HISTORICAL TAB ---------- */}
      {tab === "historical" && (
        <div className="flex flex-col gap-6">
          {/* Phyphox + OWM on same chart */}
          <ChartView
            title={"Historical: Phyphox vs OWM"}
            labels={["-3h", "-2h", "-1h", "now"]}
            multiData={[
              { label: "Phyphox", data: mockHistoricalPhy },
              { label: "OpenWeatherMap", data: mockHistoricalOWM },
            ]}
          />

          {/* Fusion Data Only */}
          <ChartView
            title="Fused Pressure (Historical)"
            labels={["-3h", "-2h", "-1h", "now"]}
            data={mockFusion}
          />
        </div>
      )}
    </div>
  );
};

export default ForecastPage;
