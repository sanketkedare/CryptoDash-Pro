import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { CryptoMarketItem } from "@/types";
import MarketFallback from "@/data/fallbacks/Market.json";

async function fetchMarket(
  currency: string,
  page: number,
  perPage: number
): Promise<CryptoMarketItem[]> {
  const res = await fetch(`/api/market?currency=${currency}&page=${page}&perPage=${perPage}`);
  if (!res.ok) throw new Error(`Market API error: ${res.status}`);
  return res.json();
}

export function useMarketData(currency: string, page = 1, perPage = 100) {
  return useQuery<CryptoMarketItem[]>({
    queryKey: ["market", currency, page, perPage],
    queryFn: () => fetchMarket(currency, page, perPage),
    placeholderData: keepPreviousData,
  });
}

export const MARKET_FALLBACK = MarketFallback as CryptoMarketItem[];
