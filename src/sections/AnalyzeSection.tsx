import React, { useEffect, useState } from "react";

type Record = {
  Time: number;
  Pressure: number;
};

const API_HOST = window.location.hostname;
const API_BASE = `http://${API_HOST}:8000`;

const AnalyzeSection: React.FC = () => {
  const [selfData, setSelfData] = useState<Record[]>([]);
  const [weatherData, setWeatherData] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 取得兩個 API 的資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [selfRes, weatherRes] = await Promise.all([
          fetch(`${API_BASE}/selfdata`),
          fetch(`${API_BASE}/openweatherdata`),
        ]);

        if (!selfRes.ok || !weatherRes.ok) {
          throw new Error("Network response was not ok");
        }

        const selfJson = await selfRes.json();
        const weatherJson = await weatherRes.json();

        setSelfData(selfJson.records || []);
        setWeatherData(weatherJson.records || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Please check API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-green-50 text-lg">
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-100 text-lg text-red-700">
        {API_BASE}
        {error}
        
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4 overflow-auto">
      <h2 className="text-3xl font-bold mb-6">Analyze Section</h2>

      {/* 自製感測資料 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Self Data</h3>
        <div className="bg-white rounded-lg shadow p-4 text-left w-full max-w-md">
          {selfData.slice(0, 5).map((r, i) => (
            <p key={i} className="text-gray-700">
              Time: {r.Time.toFixed(2)} | Pressure: {r.Pressure} hPa
            </p>
          ))}
        </div>
      </div>

      {/* OpenWeather 資料 */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Open Weather Data
        </h3>
        <div className="bg-white rounded-lg shadow p-4 text-left w-full max-w-md">
          {weatherData.slice(0, 5).map((r, i) => (
            <p key={i} className="text-gray-700">
              Time: {r.Time.toFixed(2)} | Pressure: {r.Pressure} hPa
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeSection;
