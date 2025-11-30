import {
  SunIcon,
} from "@heroicons/react/24/solid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudRain,
  faCloudSunRain,
  faSmog,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

import {iconFor} from '../../utils/weatherIcon';

interface WeatherTimelineProps {
  weather: string[];
  dates: string[];
}

export const WeatherHistoricalTimeline: React.FC<WeatherTimelineProps> = ({
  weather,
  dates,
}) => {
  const DAY_WIDTH = 28;
  console.log(new Set(weather))
  
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h3 className="text-xl font-semibold mb-4">Weather Timeline</h3>

      <div className="overflow-x-auto">
        <div className="flex gap-2 whitespace-nowrap pb-3">

          {weather.map((w, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{ width: DAY_WIDTH, height: '100px' }}
              title={`${dates[i]} - ${w}`} // ⭐ Tooltip
            >
              {/* Month */}
              <span className="text-[10px] text-gray-500 mt-1">
                {new Date(dates[i]).toLocaleString("en-US", { month: "short" })}
              </span>
              {/* Weather Icon */}
              {iconFor(w)}

              {/* Day */}
              <span className="text-[10px] text-gray-500 mt-1">
                {new Date(dates[i]).getDate()}
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm mt-4">
        <div className="flex items-center gap-1">
          <SunIcon className="w-4 h-4 text-yellow-400" /> Clear
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faCloud} className="text-gray-400" /> Clouds
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faCloudRain} className="text-blue-500" /> Rain
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faCloudSunRain} className="text-blue-400" /> Drizzle
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faSmog} className="text-blue-300" /> Fog/Mist
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faSnowflake} className="text-blue-300" /> Snow
        </div>
      </div>
    </div>
  );
};
