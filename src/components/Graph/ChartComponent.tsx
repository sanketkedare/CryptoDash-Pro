"use client";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from "chart.js";
import { HistoricalData, ChartType, DayRange } from "@/types";
import { daySwitch } from "@/utils/chartHelpers";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  day: DayRange;
  chart: ChartType;
  data: HistoricalData;
}

export default function ChartComponent({ day, chart, data }: Props) {
  const labels = daySwitch(day);

  const values = data.market_caps.map((item) => parseFloat((item[1] / 1_000_000_000).toFixed(3)));
  const isUp = values.length > 1 ? values[values.length - 1] >= values[0] : true;
  const color = isUp ? "#10b981" : "#ef4444";
  const colorAlpha = isUp ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)";

  const coinData = {
    labels,
    datasets: [
      {
        label: "Market Cap (Billions USD)",
        data: values,
        backgroundColor: chart === "Bar" ? values.map(() => colorAlpha) : colorAlpha,
        borderColor: color,
        borderWidth: chart === "Line" ? 2 : 0,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: color,
        tension: 0.4,
        fill: chart === "Line",
        barThickness: "flex" as const,
        borderRadius: chart === "Bar" ? 4 : 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(13,17,23,0.95)",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        titleColor: "#94a3b8",
        bodyColor: "#f1f5f9",
        bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
        callbacks: {
          label: (ctx: TooltipItem<"bar"> | TooltipItem<"line">) =>
            ` ${(ctx.parsed.y ?? 0).toFixed(2)}B USD`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: {
          color: "#475569",
          font: { size: 10, family: "'Space Grotesk', sans-serif" },
          maxTicksLimit: 8,
        },
        border: { color: "rgba(255,255,255,0.06)" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: {
          color: "#475569",
          font: { size: 10, family: "'JetBrains Mono', monospace" },
          callback: (v: string | number) => `${Number(v).toFixed(0)}B`,
        },
        title: { display: true, text: "In Billions (USD)", color: "#475569", font: { size: 10 } },
        border: { color: "rgba(255,255,255,0.06)" },
      },
    },
  };

  return (
    <div className="w-full h-full">
      {chart === "Line" && <Line data={coinData} options={options} />}
      {chart === "Bar" && <Bar data={coinData} options={options} />}
    </div>
  );
}
