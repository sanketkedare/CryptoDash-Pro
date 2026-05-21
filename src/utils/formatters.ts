import { CryptoMarketItem } from "@/types";

/** Sort market data by current_price descending */
export function sortByPrice(data: CryptoMarketItem[]): CryptoMarketItem[] {
  return [...data].sort((a, b) => b.current_price - a.current_price);
}

/** Find a coin by name in market data */
export function findCoinByName(
  data: CryptoMarketItem[],
  name: string
): CryptoMarketItem | undefined {
  return data.find((item) => item.name === name);
}

/** Format large numbers with B/M/K suffix */
export function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}
