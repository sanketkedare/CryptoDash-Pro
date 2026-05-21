"use client";

import { ChartType } from "@/types";
import { TbChartBar, TbChartLine } from "react-icons/tb";

interface Props {
  chart: ChartType;
  onChartChange: (c: ChartType) => void;
}

const OPTIONS: { type: ChartType; icon: React.ElementType }[] = [
  { type: "Bar", icon: TbChartBar },
  { type: "Line", icon: TbChartLine },
];

export default function ChartTypeSelector({ chart, onChartChange }: Props) {
  return (
    <div
      className="flex items-center rounded-lg p-0.5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
    >
      {OPTIONS.map(({ type, icon: Icon }) => (
        <button
          key={type}
          onClick={() => onChartChange(type)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
          style={
            chart === type
              ? {
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                  color: "white",
                  boxShadow: "0 0 12px rgba(99,102,241,0.3)",
                }
              : { color: "var(--text-muted)" }
          }
        >
          <Icon className="text-sm" />
          {type}
        </button>
      ))}
    </div>
  );
}
