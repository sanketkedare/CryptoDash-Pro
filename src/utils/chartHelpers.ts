import { DayRange } from "@/types";

export interface DayOption {
  indicator: string;
  time: DayRange;
}

export const DAY_OPTIONS: DayOption[] = [
  { indicator: "1D", time: 1 },
  { indicator: "1W", time: 7 },
  { indicator: "1M", time: 30 },
  { indicator: "1Y", time: 365 },
  { indicator: "5Y", time: 1825 },
  { indicator: "10Y", time: 3650 },
];

export const CHART_DAYS = [
  { label: "24 Hours", value: 1 },
  { label: "30 Days", value: 30 },
  { label: "3 Months", value: 90 },
  { label: "1 Year", value: 365 },
  { label: "5 Years", value: 1825 },
  { label: "10 Years", value: 3650 },
];

export const daySwitch = (day: number): (string | number)[] => {
  switch (day) {
    case 1:
      return Array.from({ length: 24 }, (_, i) => `${i + 1}h`);
    case 7:
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    case 30:
      return ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    case 1825: {
      const now = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) => String(now - 4 + i));
    }
    case 3650: {
      const now = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => String(now - 9 + i));
    }
    default:
      return Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - 11 + i);
        return d.toLocaleString("default", { month: "short" });
      });
  }
};
