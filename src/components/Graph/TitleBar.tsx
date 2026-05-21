"use client";

import { ChartType, DayRange } from "@/types";
import TitlebarInfo from "./TitlebarInfo";
import ChartTypeSelector from "./ChartTypeSelector";
import DaysSelector from "./DaysSelector";

interface Props {
  day: DayRange;
  chart: ChartType;
  onDayChange: (d: DayRange) => void;
  onChartChange: (c: ChartType) => void;
}

export default function TitleBar({ day, chart, onDayChange, onChartChange }: Props) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
      <TitlebarInfo />
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full md:w-auto justify-start sm:justify-end">
        <ChartTypeSelector chart={chart} onChartChange={onChartChange} />
        <div
          className="hidden sm:block"
          style={{ width: "1px", height: "20px", background: "var(--border)" }}
        />
        <DaysSelector day={day} onDayChange={onDayChange} />
      </div>
    </div>
  );
}
