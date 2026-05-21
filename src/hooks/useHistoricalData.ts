import { useQuery } from "@tanstack/react-query";
import { HistoricalData } from "@/types";
import GraphFallback from "@/data/fallbacks/GraphData.json";

async function fetchHistory(id: string, days: number, currency: string): Promise<HistoricalData> {
  const res = await fetch(`/api/history?id=${id}&days=${days}&currency=${currency}`);
  if (!res.ok) throw new Error(`History API error: ${res.status}`);
  return res.json();
}

export function useHistoricalData(coinId: string | undefined, days: number, currency: string) {
  return useQuery<HistoricalData>({
    queryKey: ["history", coinId, days, currency],
    queryFn: () => fetchHistory(coinId!, days, currency),
    enabled: !!coinId, // Don't fetch until a coin is selected
    staleTime: 5 * 60 * 1000, // 5 min — charts don't need sub-minute freshness
    placeholderData: GraphFallback as HistoricalData,
    retry: 1,
  });
}
