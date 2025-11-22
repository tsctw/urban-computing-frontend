import { HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const BackHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="
        flex items-center gap-2 
        w-fit px-4 py-2 rounded-full
        bg-white border border-gray-300
        shadow-sm
        text-gray-700 text-sm font-medium
        hover:bg-gray-50 hover:shadow 
        transition-all duration-150
      "
    >
      <HomeIcon className="w-4 h-4 text-gray-600" />
      Home
    </button>
  );
};

export default BackHome;
