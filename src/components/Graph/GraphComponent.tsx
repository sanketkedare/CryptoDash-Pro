"use client";

import { useState, lazy, Suspense } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useHistoricalData } from "@/hooks/useHistoricalData";
import { useMarketData } from "@/hooks/useMarketData";
import { findCoinByName } from "@/utils/formatters";
import { ChartType, DayRange } from "@/types";
import TitleBar from "./TitleBar";
import Loader from "./Loader";
import Toast from "@/components/ui/Toast";

const ChartComponent = lazy(() => import("./ChartComponent"));

export default function GraphComponent() {
  const coin = useAppSelector((s) => s.crypto);
  const currency = useAppSelector((s) => s.currency);
  const { data: market } = useMarketData(currency.code);

  const [days, setDays] = useState<DayRange>(365);
  const [chartType, setChartType] = useState<ChartType>("Line");

  const coinId = coin ? (findCoinByName(market ?? [], coin.name)?.id ?? coin.id) : undefined;

  const {
    data: history,
    isLoading,
    isError,
    isFetching,
  } = useHistoricalData(coinId, days, currency.code);

  return (
    // flex-1 + min-h-0 makes this grow to fill center column, overflow hidden clips chart properly
    <div className="glass p-4 flex-1 min-h-0 flex flex-col">
      <TitleBar day={days} chart={chartType} onDayChange={setDays} onChartChange={setChartType} />

      {/* Subtle refresh indicator */}
      {isFetching && !isLoading && (
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            Updating…
          </span>
        </div>
      )}

      {/* Chart area grows to fill remaining space */}
      <div className="flex-1 min-h-0">
        {isLoading || !history ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <ChartComponent day={days} chart={chartType} data={history} />
          </Suspense>
        )}
      </div>

      {isError && <Toast message="⚠️ Showing cached chart data" />}
    </div>
  );
}
