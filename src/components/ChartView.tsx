import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface ChartViewProps {
  title: string;
  labels: string[];
  data?: number[];
  multiData?: { label: string; data: (number | null)[] }[];
  splitIndex?: number; // for actual vs forecast
}

const ChartView: React.FC<ChartViewProps> = ({
  title,
  labels,
  data,
  multiData,
  splitIndex,
}) => {
  const datasets = useMemo(() => {
    // Case 1: multi-line chart (Historical: Phyphox + OWM)
    if (multiData) {
      return multiData.map((d, i) => ({
        label: d.label,
        data: d.data,
        borderWidth: 2,
        borderColor: i === 0 ? "#2563eb" : i === 1 ? "#16a34a" : "#faaa32ff", // blue + green + orange
        tension: 0.3,
        spanGaps: true,
        pointRadius: i === 0 ? 5 : 0, 
        pointHoverRadius: i === 0 ? 5 : 0, 
        pointStyle: i === 0 ? "circle" : false as const, 
      }));
    }

    // Case 2: actual + forecast split
    if (data && splitIndex !== undefined) {
      return [
        {
          label: "Actual",
          data: data.map((v, i) => (i >= splitIndex ? null : v)),
          borderColor: "#6b7280",
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: "Forecast",
          data: data.map((v, i) => (i < splitIndex ? null : v)),
          borderColor: "#2563eb",
          borderWidth: 2,
          tension: 0.3,
          borderDash: [6, 4],
        },
      ];
    }

    // Case 3: basic single line
    if (data) {
      return [
        {
          label: title,
          data,
          borderWidth: 2,
          tension: 0.3,
          borderColor: "#2563eb",
        },
      ];
    }

    return [];
  }, [data, multiData, splitIndex, title]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <Line
        data={{
          labels,
          datasets,
        }}
        options={{

          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                padding: 20,
                font: {
                  size: 13,
                  family: "Inter, sans-serif",
                },
              },
            },

            tooltip: {
              mode: "index",
              intersect: false,
              padding: 12,
              backgroundColor: "rgba(0,0,0,0.8)",
              titleFont: { size: 14 },
              bodyFont: { size: 13 },
              boxPadding: 6,
            },
          },

          hover: {
            mode: "nearest",
            intersect: false,
          },

          scales: {
            y: {
              ticks: {
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "rgba(200,200,200,0.3)",
              },
            },
          },

          elements: {
            line: {
              tension: 0.35,
            },
            point: {
              radius: 0,
              hitRadius: 6,
              hoverRadius: 4,
            },
          },
        }}
      />

    </div>
  );
};

export default ChartView;
