"use client";

import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { useMarketData } from "@/hooks/useMarketData";
import { TbMedal, TbTrendingUp, TbTrendingDown } from "react-icons/tb";

const MEDAL = ["🥇", "🥈", "🥉"];

export default function TopCoins() {
  const currency = useAppSelector((s) => s.currency);
  const { data: market = [], isLoading } = useMarketData(currency.code);
  const top3 = market.slice(0, 3);

  return (
    <div
      className="rounded-xl p-3 h-full"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2.5">
        <TbMedal className="text-yellow-500 text-sm" />
        <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
          Top 3 Coins
        </span>
        <span className="section-label ml-1">by market cap</span>
      </div>

      {/* Compact rows */}
      <div className="flex flex-col gap-1.5">
        {isLoading
          ? [...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="shimmer w-6 h-6 rounded-full" />
                <div className="shimmer h-2.5 flex-1 rounded" />
                <div className="shimmer h-2.5 w-16 rounded" />
              </div>
            ))
          : top3.map((coin, i) => {
              const change = coin.price_change_percentage_24h ?? 0;
              const isUp = change >= 0;
              return (
                <div
                  key={coin.id}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <span className="text-xs shrink-0">{MEDAL[i]}</span>
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={20}
                    height={20}
                    className="rounded-full shrink-0"
                    unoptimized
                  />
                  <span
                    className="text-xs font-semibold flex-1 truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {coin.name}
                  </span>
                  <span
                    className="text-xs price-mono shrink-0"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {currency.symbol}
                    {coin.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-[10px] font-bold shrink-0 flex items-center gap-0.5 ${isUp ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {isUp ? <TbTrendingUp /> : <TbTrendingDown />}
                    {Math.abs(change).toFixed(2)}%
                  </span>
                </div>
              );
            })}
      </div>
    </div>
  );
}
