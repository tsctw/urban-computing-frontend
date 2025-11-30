import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PressureCard from "../components/PressureCard";

import {
  getSelfData,
  getOpenWeatherData,
  type SelfRecord, type WeatherRecord,
} from "../api/weatherApi";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [selfData, setSelfData] = useState<SelfRecord[]>();
  const [weatherData, setWeatherData] = useState<WeatherRecord[]>();
  
  const [loading, setLoading] = useState<boolean>(true);

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

      } catch (error) {
        console.error("Load data error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Barometric Forecast App - Dublin</h1>

      {loading ? (
        <p className="text-gray-600">Loading latest data...</p>
      ) : selfData  && weatherData ? (
        <PressureCard selfData={selfData} weatherData={weatherData} />
      ) : (
        <p className="text-red-600">Unable to load data.</p>
      )}

      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md"
        onClick={() => navigate("/upload")}
      >
        Upload Current Pressure (Phyphox)
      </button>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md"
        onClick={() => navigate("/forecast")}
      >
        View Forecast
      </button>
    </div>
  );
};

export default HomePage;