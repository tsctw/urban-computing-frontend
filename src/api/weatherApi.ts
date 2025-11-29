// src/api/weatherApi.ts

export interface SelfRecord {
  Time: number;       
  Pressure: number;   
}

export interface SelfDataResponse {
  status: string;
  records: SelfRecord[];
}

export interface WeatherRecord {
  timestamp: number;
  temperature: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number | null;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather_id: number;
  weather_main: string;
  weather_description: string;
}

export interface OpenWeatherResponse {
  status: string;
  records: WeatherRecord[];
}

export interface PressurePredictionResponse {
    status: string;
    pressure: PressurePrediction;
}

export interface PressurePrediction {
    last10: number[];
    p6: number[];
    p12: number[];
    p24: number[];
}

export interface WeatherPredictionResponse {
  status: string;
  weather: WeatherPrediction;
}

export interface WeatherPrediction {
    last10: string[];
    w6: string[];
    w12: string[];
    w24: string[];
}

const API_BASE = "http://127.0.0.1:8000";

// -----------------------------
// selfdata
// -----------------------------
export const getSelfData = async (): Promise<SelfDataResponse> => {
  const res = await fetch(`${API_BASE}/selfdata`);
  if (!res.ok) throw new Error("Failed to fetch selfdata");
  return res.json();
};

// -----------------------------
// openweatherdata
// -----------------------------
export const getOpenWeatherData = async (): Promise<OpenWeatherResponse> => {
  const res = await fetch(`${API_BASE}/openweatherdata`);
  if (!res.ok) throw new Error("Failed to fetch openweatherdata");
  return res.json();
};

// -----------------------------
// change timestamp → datetime format
// -----------------------------
export const formatTimestamp = (ts?: number | null): string => {
  if (!ts) return "";
  const ms = ts < 1e12 ? ts * 1000 : ts;
  return new Date(ms).toLocaleString();
};

// ---------------------------------------------
// /prediction_pressure
// ---------------------------------------------
export const getPredictionPressure = async (): Promise<PressurePredictionResponse> => {
  const res = await fetch(`${API_BASE}/prediction_pressure`);
  if (!res.ok) throw new Error("Failed to fetch /prediction_pressure");
  return res.json();
};

// ---------------------------------------------
// /prediction_weather
// ---------------------------------------------
export const getPredictionWeather = async (): Promise<WeatherPredictionResponse> => {
  const res = await fetch(`${API_BASE}/prediction_weather`);
  if (!res.ok) throw new Error("Failed to fetch /prediction_weather");
  return res.json();
};
