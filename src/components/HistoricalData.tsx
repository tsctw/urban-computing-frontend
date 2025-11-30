// src/components/HistoricalData.tsx

import React, { useEffect, useState } from "react";
import ChartView from "./ChartView";
import { getHistoricalWeather, type WeatherMergedRecord } from "../api/weatherApi";
import {WeatherHistoricalTimeline} from "../components/WeatherHistoricalTimeline";

interface HistoricalDataProps {
  labels: string[];
  selfPressureArray: number[];
  weatherPressureArray: number[];
}

export default function HistoricalData({}: HistoricalDataProps) {
    const [records, setRecords] = useState<WeatherMergedRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 👇 call API once on mount
        getHistoricalWeather()
        .then((res) => {
            setRecords(res);
        })
        .catch((err) => {
            console.error("Failed to load historical weather:", err);
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center p-4">Loading historical data...</div>;
    }

    if (!records.length) {
        return <div className="text-center p-4">No historical data available.</div>;
    }
    

  return (
    <div className="flex flex-col gap-6">
      {/* Phyphox + OWM on same chart */}
      <ChartView
        title={"Historical: Self collected(Phyphox) vs OpenWeatherAPI"}
        labels={records.map((r) => new Date(r.timestamp * 1000).toLocaleDateString())}
        multiData={[
          { label: "Self Collected", data: records.map((r) => r.Pressure_self || null) || [] },
          { label: "OpenWeatherAPI", data: records.map((r) => r.pressure) || [] },
          { label: 'Self Collected Calibration Data', data: records.map((r) => r.Pressure_self_corrected)}
        ]}
      />
        <div className="w-100">
            <WeatherHistoricalTimeline
            weather={records.map((r) => r.weather_main)}
            dates={records.map((r) => new Date(r.timestamp * 1000).toLocaleDateString())}
            />
        </div>
    </div>
  );
}
