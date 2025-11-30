import { autoFormatNumber, formatTimestamp } from "../../utils/utils";
import {
  type SelfRecord,
  type WeatherRecord,
} from "../api/weatherApi";

import {iconFor} from '../../utils/weatherIcon';

interface PressureCardProps {
  selfData: SelfRecord[];
  weatherData: WeatherRecord[];
}

const PressureCard: React.FC<PressureCardProps> = ({ selfData, weatherData }) => {
  const last_self = selfData[0];
  const last_weather = weatherData[0];

  let pressure = 0;
  let weather = "";
  let updatedAt = 0;

  // Compare timestamps
  if (last_self.Time > last_weather.timestamp) {
    pressure = last_self.Pressure;
    weather = last_weather.weather_main;
    updatedAt = last_self.Time;
  } else {
    pressure = last_weather.pressure;
    weather = last_weather.weather_main;
    updatedAt = last_weather.timestamp;
  }

  return (
    <div className="p-4 rounded-xl bg-white shadow-md border flex flex-col gap-2">
      <div className="text-xl font-bold">Current Pressure</div>

      {/* Pressure value */}
      <div className="text-4xl font-semibold">
        {autoFormatNumber(pressure)} hPa
      </div>

      {/* Weather with emoji */}
      <div className="text-lg opacity-90 flex items-center gap-2">
        <span className="text-2xl">{iconFor(weather)}</span>
        <span>{weather}</span>
      </div>

      {/* Timestamp */}
      <div className="text-sm text-gray-500">
        Updated: {formatTimestamp(updatedAt)}
      </div>
    </div>
  );
};

export default PressureCard;
