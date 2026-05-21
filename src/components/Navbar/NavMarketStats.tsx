"use client";

import { useAppSelector } from "@/lib/hooks";
import { useMarketData } from "@/hooks/useMarketData";
import { TbTrendingUp, TbTrendingDown } from "react-icons/tb";

export default function NavMarketStats() {
  const currency = useAppSelector((s) => s.currency);
  const { data: market = [] } = useMarketData(currency.code);
  const top3 = market.slice(0, 3);

  return (
    <div className="hidden lg:flex items-center gap-5">
      {top3.map((coin) => {
        const change = coin.price_change_percentage_24h ?? 0;
        const isUp = change >= 0;
        return (
          <div key={coin.id} className="flex items-center gap-1.5">
            <span
              className="text-[11px] font-bold uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              {coin.symbol}
            </span>
            <span
              className="text-[12px] font-semibold price-mono"
              style={{ color: "var(--text-primary)" }}
            >
              {currency.symbol}
              {coin.current_price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
            <span
              className="text-[10px] font-bold flex items-center gap-0.5"
              style={{ color: isUp ? "var(--positive)" : "var(--negative)" }}
            >
              {isUp ? <TbTrendingUp /> : <TbTrendingDown />}
              {Math.abs(change).toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
