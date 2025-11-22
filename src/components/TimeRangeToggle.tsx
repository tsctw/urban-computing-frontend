interface TimeRangeToggleProps {
  value: string;
  onChange: (v: string) => void;
}

const TimeRangeToggle: React.FC<TimeRangeToggleProps> = ({ value, onChange }) => {
  const options = ["6h", "12h", "24h"];

  return (
    <div className="flex gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          className={`px-4 py-2 rounded-lg border ${
            value === opt ? "bg-blue-600 text-white" : "bg-white"
          }`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeToggle;
