import { useNavigate } from "react-router-dom";
import PressureCard from "../components/PressureCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Barometric Forecast App</h1>

      <PressureCard
        pressure={1012.5}
        weather="Cloudy"
        updatedAt="2025-11-21 10:30"
      />

      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md"
        onClick={() => navigate("/upload")}
      >
        Upload Current Pressure (Phyphox)
      </button>
    </div>
  );
};

export default HomePage;
