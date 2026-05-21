"use client";

import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { useMarketData } from "@/hooks/useMarketData";
import { useTickerWebSocket } from "@/hooks/useTickerWebSocket";
import { TbTrendingUp, TbTrendingDown } from "react-icons/tb";

const TICKER_SYMBOLS = [
  "BTC",
  "ETH",
  "BNB",
  "SOL",
  "XRP",
  "DOGE",
  "ADA",
  "AVAX",
  "DOT",
  "LINK",
  "MATIC",
  "UNI",
];

export default function PriceTicker() {
  const currency = useAppSelector((s) => s.currency);
  const { data: market = [] } = useMarketData(currency.code);
  const livePrices = useTickerWebSocket(TICKER_SYMBOLS);

  const items = market.slice(0, 12).map((coin) => {
    const key = coin.symbol.toUpperCase();
    const price = livePrices[key] ?? coin.current_price;
    const change = coin.price_change_percentage_24h ?? 0;
    return { ...coin, price, change };
  });

  if (items.length === 0)
    return (
      <div
        className="h-[32px]"
        style={{ background: "var(--bg-ticker)", borderBottom: "1px solid var(--border-nav)" }}
      />
    );

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden h-[32px] flex items-center"
      style={{
        background: "var(--bg-ticker)",
        borderBottom: "1px solid var(--border-nav)",
        transition: "background 0.25s ease",
      }}
    >
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
      >
        {doubled.map((coin, i) => (
          <span key={`${coin.id}-${i}`} className="flex items-center gap-1.5 text-[11px]">
            <span className="font-bold" style={{ color: "var(--accent-from)" }}>
              {coin.symbol.toUpperCase()}
            </span>
            <span className="price-mono" style={{ color: "var(--text-secondary)" }}>
              {currency.symbol}
              {coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
            <span
              className="flex items-center gap-0.5 text-[10px] font-semibold"
              style={{ color: coin.change >= 0 ? "var(--positive)" : "var(--negative)" }}
            >
              {coin.change >= 0 ? (
                <TbTrendingUp className="text-xs" />
              ) : (
                <TbTrendingDown className="text-xs" />
              )}
              {Math.abs(coin.change).toFixed(2)}%
            </span>
            <span style={{ color: "var(--border)", margin: "0 2px" }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
