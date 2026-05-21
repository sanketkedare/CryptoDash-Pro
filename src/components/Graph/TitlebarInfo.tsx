"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { useMarketData } from "@/hooks/useMarketData";
import { findCoinByName } from "@/utils/formatters";
import { TbTrendingUp, TbTrendingDown } from "react-icons/tb";

export default function TitlebarInfo() {
  const coin = useAppSelector((s) => s.crypto);
  const currency = useAppSelector((s) => s.currency);
  const { data: market = [] } = useMarketData(currency.code);

  const liveCoin = useMemo(() => {
    if (!coin) return null;
    return findCoinByName(market, coin.name) ?? coin;
  }, [market, coin]);

  if (!liveCoin)
    return (
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Select a coin from the market table →
      </p>
    );

  const change = liveCoin.price_change_percentage_24h ?? 0;
  const isUp = change >= 0;

  return (
    <motion.div
      key={liveCoin.id}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-3"
    >
      <Image
        src={liveCoin.image}
        alt={liveCoin.name}
        width={36}
        height={36}
        className="rounded-full"
        unoptimized
      />
      <div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
            {liveCoin.name}
          </span>
          <span
            className="text-xs uppercase px-1.5 py-0.5 rounded"
            style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-muted)" }}
          >
            {liveCoin.symbol}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="price-mono text-lg font-semibold gradient-text">
            {currency.symbol}
            {liveCoin.current_price.toLocaleString()}
          </span>
          <span className={isUp ? "badge-positive" : "badge-negative"}>
            {isUp ? (
              <TbTrendingUp className="inline mr-0.5" />
            ) : (
              <TbTrendingDown className="inline mr-0.5" />
            )}
            {isUp ? "+" : ""}
            {change.toFixed(2)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
