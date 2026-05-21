"use client";

import { DayRange } from "@/types";
import { DAY_OPTIONS } from "@/utils/chartHelpers";

interface Props {
  day: DayRange;
  onDayChange: (d: DayRange) => void;
}

export default function DaysSelector({ day, onDayChange }: Props) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {DAY_OPTIONS.map((opt) => (
        <button
          key={opt.time}
          onClick={() => onDayChange(opt.time)}
          className="pill-btn"
          style={
            day === opt.time
              ? {
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                  border: "1px solid transparent",
                  color: "white",
                  boxShadow: "0 0 12px rgba(99,102,241,0.3)",
                }
              : {}
          }
        >
          {opt.indicator}
        </button>
      ))}
    </div>
  );
}
