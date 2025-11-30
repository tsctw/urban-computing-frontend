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

export const iconFor = (w: string) => {
  switch (w) {
    case "Clear": return <SunIcon className="w-5 h-5 text-yellow-400" />;
    case "Clouds": return <FontAwesomeIcon icon={faCloud} className="text-gray-400" />;
    case "Rain": return <FontAwesomeIcon icon={faCloudRain} className="text-blue-500" />;
    case "Snow": return <FontAwesomeIcon icon={faSnowflake} className="text-blue-300" />;
    case "Drizzle": return <FontAwesomeIcon icon={faCloudSunRain} className="text-blue-400" />;
    case "Fog": return <FontAwesomeIcon icon={faSmog} className="text-blue-300" />;
    case "Mist": return <FontAwesomeIcon icon={faSmog} className="text-blue-300" />;
    default: return <FontAwesomeIcon icon={faCloud} className="text-gray-300" />;
  }
};