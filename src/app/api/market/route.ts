import { NextRequest, NextResponse } from "next/server";
import { marketDataUrl } from "@/lib/api";
import { MarketResponseSchema } from "@/lib/schemas/market";
import MarketFallbackRaw from "@/data/fallbacks/Market.json";
import { CryptoMarketItem } from "@/types";

// Fallback is stored in INR. Convert to requested currency using approximate forex rates.
// These are only used when CoinGecko is completely unreachable.
const FOREX_FROM_INR: Record<string, number> = {
  INR: 1,
  USD: 1 / 84,
  EUR: 1 / 92,
  YEN: 84 / 0.56, // 1 INR ≈ 1.78 JPY
};

function convertFallback(currency: string): CryptoMarketItem[] {
  const rate = FOREX_FROM_INR[currency] ?? FOREX_FROM_INR["USD"];
  return (MarketFallbackRaw as CryptoMarketItem[]).map((coin) => ({
    ...coin,
    current_price: +(coin.current_price * rate).toFixed(6),
    market_cap: +(coin.market_cap * rate),
    total_volume: +(coin.total_volume * rate),
    high_24h: +((coin.high_24h ?? 0) * rate).toFixed(6),
    low_24h: +((coin.low_24h ?? 0) * rate).toFixed(6),
    ath: +((coin.ath ?? 0) * rate).toFixed(6),
    atl: +((coin.atl ?? 0) * rate).toFixed(6),
  }));
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const currency = searchParams.get("currency") ?? "INR";
  const page = Number(searchParams.get("page") ?? "1");
  const perPage = Math.min(Number(searchParams.get("perPage") ?? "100"), 250);

  try {
    const res = await fetch(marketDataUrl(currency, page, perPage), {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(
        `[/api/market] CoinGecko ${res.status} — serving converted fallback for ${currency}`
      );
      return NextResponse.json(convertFallback(currency), {
        headers: { "X-Data-Source": "fallback" },
      });
    }

    const raw = await res.json();

    const parsed = MarketResponseSchema.safeParse(raw);
    if (!parsed.success) {
      console.error("[/api/market] Schema mismatch:", parsed.error.flatten());
      return NextResponse.json(convertFallback(currency), {
        headers: { "X-Data-Source": "fallback" },
      });
    }

    return NextResponse.json(parsed.data);
  } catch (err) {
    console.error("[/api/market] fetch_failed:", err);
    return NextResponse.json(convertFallback(currency), {
      headers: { "X-Data-Source": "fallback" },
    });
  }
}
