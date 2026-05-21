const BASE = "https://api.coingecko.com/api/v3";

// Market data endpoint — used by the /api/market server route
// per_page max = 250 on CoinGecko; accepts optional page for pagination
export const marketDataUrl = (currency: string, page = 1, perPage = 100): string =>
  `${BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&locale=en&price_change_percentage=24h`;

// Historical chart endpoint — used by the /api/history server route
export const historicalChartUrl = (id: string, days: number, currency: string): string =>
  `${BASE}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
