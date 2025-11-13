import React from "react";

const Card: React.FC<React.PropsWithChildren<{ title: string; subtitle?: string }>> = ({
  title,
  subtitle,
  children,
}) => (
  <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
    <header className="mb-3">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </header>
    {children}
  </section>
);

const AnalyzeSection: React.FC = () => {
  return (
    // 外層背景 (整個一頁)
    <div className="h-screen bg-green-50 flex items-stretch justify-center text-left px-4 sm:px-6">
      {/* 內層可捲動區塊 + 不同背景色 */}
      <div className="w-full max-w-5xl my-16 md:my-20 overflow-y-auto rounded-2xl bg-gray-100 shadow-inner p-6 md:p-8">
        {/* 頁面標題 */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            Analyze
          </h2>
          <p className="text-center text-gray-600 mt-1">
            Data Fusion & Analysis — placeholders for your assignment Task 1
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:gap-6">
          {/* 1) Motivation */}
          <Card
            title="1) Motivation"
            subtitle="Why these processing steps & algorithms are needed"
          >
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Combine local barometric sensor readings with OpenWeather data.</li>
              <li>
                Validate sensor accuracy and detect micro-climate deviations (Δ pressure).
              </li>
              <li>
                Prepare fused time series for downstream reasoning/visualization/actuation.
              </li>
            </ul>
          </Card>

          {/* 2) Overview Diagram */}
          <Card
            title="2) Overview Diagram"
            subtitle="High-level pipeline & where custom logic lives"
          >
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 h-48 md:h-56 grid place-items-center">
              <p className="text-gray-500">
                [Diagram Placeholder] Ingest → Fusion → Analysis → Viz/Actuation
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Tip: 之後可用 Mermaid / PNG 圖嵌入此處。
            </p>
          </Card>

          {/* 3) Data Fusion */}
          <Card
            title="3) Data Fusion"
            subtitle="How records from selfdata & openweatherdata are aligned and merged"
          >
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
              <p className="text-gray-700">
                Placeholder for fusion logic description (e.g., time-binning, nearest-neighbor
                join, interpolation, timezone handling).
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-gray-500">
                    <tr>
                      <th className="text-left py-1 pr-4">Time</th>
                      <th className="text-left py-1 pr-4">Self Pressure</th>
                      <th className="text-left py-1 pr-4">OpenWeather Pressure</th>
                      <th className="text-left py-1">Δ (hPa)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="py-1 pr-4">…</td>
                      <td className="py-1 pr-4">…</td>
                      <td className="py-1 pr-4">…</td>
                      <td className="py-1">…</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4">…</td>
                      <td className="py-1 pr-4">…</td>
                      <td className="py-1 pr-4">…</td>
                      <td className="py-1">…</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* 4) Analysis Result */}
          <Card
            title="4) Analysis Result"
            subtitle="KPIs and charts to evidence your algorithm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
                <p className="text-sm text-gray-500">Mean Δ (hPa)</p>
                <p className="text-2xl font-semibold mt-1">—</p>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
                <p className="text-sm text-gray-500">RMSE (hPa)</p>
                <p className="text-2xl font-semibold mt-1">—</p>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
                <p className="text-sm text-gray-500">Correlation</p>
                <p className="text-2xl font-semibold mt-1">—</p>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 h-56 md:h-64 grid place-items-center">
              <p className="text-gray-500">[Chart Placeholder] Self vs OpenWeather</p>
            </div>
          </Card>

          {/* 5) Multi-User Support */}
          <Card
            title="5) Multi-User Support"
            subtitle="How multiple sensors/users can upload concurrently"
          >
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>
                Readings tagged by{" "}
                <code className="px-1 rounded bg-gray-100">user_id</code> /{" "}
                <code className="px-1 rounded bg-gray-100">device_id</code>.
              </li>
              <li>
                Cloud storage partitions per user; analysis stage aggregates by user or area.
              </li>
              <li>
                Endpoints accept concurrent uploads; analysis jobs are idempotent & batched.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeSection;
