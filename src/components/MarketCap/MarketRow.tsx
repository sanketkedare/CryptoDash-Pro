"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCrypto } from "@/features/crypto/slice";
import { CryptoMarketItem } from "@/types";
import { formatMarketCap } from "@/utils/formatters";
import AnimatedPrice from "@/components/ui/AnimatedPrice";

interface Props {
  crypto: CryptoMarketItem;
}

const MarketRow = memo(function MarketRow({ crypto }: Props) {
  const dispatch = useAppDispatch();
  const currentId = useAppSelector((s) => s.crypto?.id);
  const symbol = useAppSelector((s) => s.currency.symbol);

  const change = crypto.price_change_percentage_24h ?? 0;
  const isUp = change >= 0;
  const isSelected = currentId === crypto.id;

  return (
    <motion.div
      layout
      className="grid grid-cols-[1fr_auto_auto] items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors"
      style={{
        background: isSelected
          ? "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.06))"
          : "transparent",
        borderLeft: isSelected ? "2px solid #6366f1" : "2px solid transparent",
        borderBottom: "1px solid rgba(255,255,255,0.03)",
      }}
      onClick={() => dispatch(setCrypto(crypto))}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
    >
      {/* Coin info */}
      <div className="flex items-center gap-2 min-w-0">
        <Image
          src={crypto.image}
          alt={crypto.name}
          width={28}
          height={28}
          className="rounded-full shrink-0"
          unoptimized
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>
            {crypto.name}
          </p>
          <p className="text-[10px] uppercase" style={{ color: "var(--text-muted)" }}>
            {crypto.symbol}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="price-mono text-xs font-medium" style={{ color: "var(--text-primary)" }}>
          <AnimatedPrice
            value={`${symbol}${crypto.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          />
        </p>
        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
          {symbol}
          {formatMarketCap(crypto.market_cap)}
        </p>
      </div>

      {/* 24h change */}
      <div className="text-right">
        <AnimatedPrice
          value={`${isUp ? "+" : ""}${change.toFixed(2)}%`}
          className={isUp ? "badge-positive" : "badge-negative"}
        />
      </div>
    </motion.div>
  );
});

export default MarketRow;
