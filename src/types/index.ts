export interface Currency {
  code: string;
  symbol: string;
  flag: string;
}

export interface CryptoMarketItem {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | { times: number; currency: string; percentage: number };
  last_updated: string;
}

export interface HistoricalData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface CountryOption {
  id: number;
  currency: string;
  symbol: string;
  flag: string;
}

export interface ExchangeEntry {
  name: string;
  value: number;
  unit: string;
}

export type ChartType = "Bar" | "Line";
export type DayRange = 1 | 7 | 30 | 365 | 1825 | 3650;
