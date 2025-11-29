import React, { useEffect, useRef } from "react";
import { weatherIcon } from "../../utils/utils";

export type Range = "6h" | "12h" | "24h";

interface Props {
  weather?: {
    w6: string[];
    w12: string[];
    w24: string[];
    last10?: string[];
  };
  range: Range;
}

// Past labels (每 2 小時)
const buildPastLabels = (count: number) =>
  Array.from({ length: count }, (_, i) => count - i - 1 == 0 ? 'Now' : `-${(count - i - 1) * 2}h`);

const buildFutureLabels = (count: number) =>
  Array.from({ length: count }, (_, i) => `+${(i + 1) * 2}h`
  );

export default function WeatherTimeline({ weather, range }: Props) {
  if (!weather) return null;

  const scrollContainer = useRef<HTMLDivElement>(null);
  const nowItemRef = useRef<HTMLDivElement>(null);

  const forecastMap = {
    "6h": weather.w6,
    "12h": weather.w12,
    "24h": weather.w24,
  };

  const future = forecastMap[range];
  const past = weather.last10 ?? [];

  const pastLabels = buildPastLabels(past.length);
  const futureLabels = buildFutureLabels(future.length);

  // ✔ 自動 Scroll 到 Now
  useEffect(() => {
    if (nowItemRef.current && scrollContainer.current) {
      const container = scrollContainer.current;
      const item = nowItemRef.current;

      const left =
        item.offsetLeft -
        container.clientWidth / 2 +
        item.clientWidth / 2;

      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [weather, range]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
        
        <h2 className="text-2xl font-bold text-white mb-6">
          Weather Timeline — {range}
        </h2>

        {/* Timeline scroll area */}
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto space-x-8 pb-4 scrollbar-thin scrollbar-thumb-gray-700"
        >

          {/* ---- Past: last10 ---- */}
          {past.map((cond, index) => (
            <div key={`past-${index}`} className="flex flex-col items-center min-w-[60px] opacity-60">
              <div className="text-sm text-gray-400 mb-1">{pastLabels[index]}</div>
              <div className="w-1 h-6 bg-gray-700 rounded-full mb-2"></div>
              <div className="text-3xl">{weatherIcon(cond)}</div>
              <div className="text-xs text-gray-500 mt-1">{cond}</div>
            </div>
          ))}

          {/* ---- Future: w6/w12/w24 ---- */}
          {future.map((cond, index) => {
            const isNow = index === 0;

            return (
              <div
                key={`future-${index}`}
                ref={isNow ? nowItemRef : undefined}
                className="flex flex-col items-center min-w-[60px]"
              >
                <div className={`text-sm mb-1 ${isNow ? "text-white font-bold" : "text-gray-300"}`}>
                  {futureLabels[index]}
                </div>

                <div className={`w-1 h-6 rounded-full mb-2 ${isNow ? "bg-white" : "bg-gray-600"}`}></div>

                <div className="text-3xl">{weatherIcon(cond)}</div>
                <div className="text-xs text-gray-400 mt-1">{cond}</div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
