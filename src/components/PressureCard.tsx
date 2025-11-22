interface PressureCardProps {
  pressure: number;
  weather: string;
  updatedAt: string;
}

const PressureCard: React.FC<PressureCardProps> = ({ pressure, weather, updatedAt }) => {
  return (
    <div className="p-4 rounded-xl bg-white shadow-md border flex flex-col gap-2">
      <div className="text-xl font-bold">Current Pressure</div>
      <div className="text-4xl font-semibold">{pressure} hPa</div>
      <div className="text-lg opacity-80">{weather}</div>
      <div className="text-sm text-gray-500">Updated: {updatedAt}</div>
    </div>
  );
};

export default PressureCard;
