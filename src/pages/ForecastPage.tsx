import { useState, useEffect } from "react";
import ChartView from "../components/ChartView";
import PressureCard from "../components/PressureCard";
import BackHome from "../components/BackHome";
import WeatherTimeline from "../components/WeatherTimeline";
import { formatTimestamp } from "../../utils/utils";

import {
  getSelfData,
  getOpenWeatherData,
  getPredictionPressure,
  getPredictionWeather,
  type SelfRecord, type WeatherRecord, type PressurePrediction, type WeatherPrediction
} from "../api/weatherApi";
import HistoricalData from "../components/HistoricalData";

type Range = "6h" | "12h" | "24h";
type Tab = "forecast" | "historical";

interface ForecastSeries {
  labels: string[];
  actual?: number[];
  forecast?: number[];
}

const ForecastPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>("forecast");
  const [range, setRange] = useState<Range>("6h");
  const [selfData, setSelfData] = useState<SelfRecord[]>();
  const [weatherData, setWeatherData] = useState<WeatherRecord[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const [pressurePrediction, setPressurePrediction] = useState<PressurePrediction>()
  const [weatherPrediction, setWeatherPrediction] = useState<WeatherPrediction>()

  const [loadingPressure, setLoadingPressure] = useState<boolean>(true);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);

    useEffect(() => {
      const loadData = async () => {
        try {
          const selfData = await getSelfData();
  
          if (selfData.records.length > 0) {
            const sorted_record = [...selfData.records].sort((a, b) => b.Time - a.Time);
            setSelfData(sorted_record || undefined);
          }
  
          const weatherData = await getOpenWeatherData();
  
          if (weatherData.records.length > 0) {
            const sorted_record = [...weatherData.records].sort((a, b) => b.timestamp - a.timestamp);
            setWeatherData(sorted_record);
          }

          const pressurePredData = await getPredictionPressure();
          if (pressurePredData.pressure) {
            setPressurePrediction(pressurePredData.pressure);
          }

          const weatherPredData = await getPredictionWeather();
          if (weatherPredData.weather) {
            setWeatherPrediction(weatherPredData.weather)
          }
  
        } catch (error) {
          console.error("Load data error:", error);
        } finally {
          setLoading(false);
          setLoadingPressure(false);
          setLoadingWeather(false)
        }
      };
  
      loadData();
    }, []);

  const pressureForecastData: Record<Range, ForecastSeries> = {
    "6h": {
      labels: Array.from({ length: 13 }, (_, i) => (i - 9) * 2 + "h"),
      actual: pressurePrediction?.last10,
      forecast: pressurePrediction?.p6,
    },
    "12h": {
      labels: Array.from({ length: 16 }, (_, i) => (i - 9) * 2 + "h"),
      actual: pressurePrediction?.last10,
      forecast: pressurePrediction?.p12,
    },
    "24h": {
      labels: Array.from({ length: 22 }, (_, i) => (i - 9) * 2 + "h"),
      actual: pressurePrediction?.last10,
      forecast: pressurePrediction?.p24,
    },
  };

    


    const current = pressureForecastData[range];

    // ----- Combined Forecast + Actual Plot -----
    const mergedLabels = current.labels;
    const mergedData = [
      ...(current.actual || []),
      ...(current.forecast || []),
    ];

    const actualLength = current.actual?.length;

  const selfPressureArray = selfData?.map((d) => d.Pressure);
  const weatherPressureArray = weatherData?.map((d) => d.pressure);

  const selfTimes = selfData?.map((d) => d.Time) || [];
  const weatherTimes = weatherData?.map((d) => d.timestamp) || [];

  const tsList =
    selfTimes.length >= weatherTimes.length ? selfTimes : weatherTimes;

  const labels = tsList.map((ts) => formatTimestamp(ts));

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

         {loading ? (
          <p className="text-gray-600">Loading latest data...</p>
          ) : selfData  && weatherData ? (
            <PressureCard selfData={selfData} weatherData={weatherData} />
          ) : (
            <p className="text-red-600">Unable to load data.</p>
        )}

        {loadingPressure ? (
          <p className="text-gray-600">Loading latest data...</p>
          ) : pressurePrediction ? (
            <ChartView
              title={`Actual + Forecast (${range})`}
              labels={mergedLabels}
              data={mergedData}
              splitIndex={actualLength}
            />
          ) : (
            <p className="text-red-600">Unable to load data.</p>
        )}

        {loadingWeather ? (
          <p className="text-gray-600">Loading latest data...</p>
          ) : weatherPrediction ? (
            <div className="w-100">
            <WeatherTimeline
              weather={weatherPrediction}
              range={range}
            />
            </div>
          ) : (
            <p className="text-red-600">Unable to load data.</p>
        )}

        </div>
      )}

      {/* ---------- HISTORICAL TAB ---------- */}
      {tab === "historical" && (
        <div className="flex flex-col gap-6">
          <HistoricalData
            labels={labels}
            selfPressureArray={selfPressureArray || []}
            weatherPressureArray={weatherPressureArray || []}
          />
        </div>
      )}
    </div>
  );
};

export default ForecastPage;
