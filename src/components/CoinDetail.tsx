"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { useMarketData } from "@/hooks/useMarketData";
import { useTickerWebSocket } from "@/hooks/useTickerWebSocket";
import AnimatedPrice from "@/components/ui/AnimatedPrice";
import { formatMarketCap } from "@/utils/formatters";
import { TbTrendingUp, TbTrendingDown, TbCrown, TbActivity } from "react-icons/tb";

function StatRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between py-2"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <span
        className="text-[11px] font-semibold price-mono"
        style={{ color: highlight ? "var(--positive)" : "var(--text-secondary)" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function CoinDetail() {
  const coin = useAppSelector((s) => s.crypto);
  const currency = useAppSelector((s) => s.currency);
  const { data: market = [] } = useMarketData(currency.code);

  const liveCoin = coin ? (market.find((c) => c.id === coin.id) ?? coin) : (market[0] ?? null);

  const liveWs = useTickerWebSocket(liveCoin ? [liveCoin.symbol.toUpperCase()] : []);
  const livePrice = liveCoin
    ? (liveWs[liveCoin.symbol.toUpperCase()] ?? liveCoin.current_price)
    : 0;

  if (!liveCoin) {
    return (
      <div className="glass h-full flex items-center justify-center">
        <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
          Select a coin
        </p>
      </div>
    );
  }

  const change = liveCoin.price_change_percentage_24h ?? 0;
  const isUp = change >= 0;
  const circulationPct =
    liveCoin.max_supply && liveCoin.circulating_supply
      ? Math.min((liveCoin.circulating_supply / liveCoin.max_supply) * 100, 100)
      : null;

  return (
    <motion.div
      key={liveCoin.id}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="glass flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-start gap-3 mb-4">
          <Image
            src={liveCoin.image}
            alt={liveCoin.name}
            width={44}
            height={44}
            className="rounded-full shrink-0"
            unoptimized
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="font-bold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                {liveCoin.name}
              </h2>
              {liveCoin.market_cap_rank && (
                <span
                  className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
                  style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent-from)" }}
                >
                  <TbCrown className="text-[9px]" />#{liveCoin.market_cap_rank}
                </span>
              )}
            </div>
            <p
              className="text-[10px] uppercase font-medium mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {liveCoin.symbol}
            </p>
          </div>
        </div>

        {/* Live price */}
        <div
          className="rounded-xl p-3"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))",
            border: "1px solid rgba(99,102,241,0.15)",
          }}
        >
          <p className="text-[10px] mb-1" style={{ color: "var(--text-muted)" }}>
            Current Price
          </p>
          <p className="price-mono text-xl font-bold gradient-text leading-none">
            <AnimatedPrice
              value={`${currency.symbol}${livePrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            />
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={isUp ? "badge-positive" : "badge-negative"}>
              {isUp ? (
                <TbTrendingUp className="inline mr-0.5 text-xs" />
              ) : (
                <TbTrendingDown className="inline mr-0.5 text-xs" />
              )}
              {isUp ? "+" : ""}
              {change.toFixed(2)}% 24h
            </span>
            <span
              className="flex items-center gap-0.5 text-[10px]"
              style={{ color: "var(--text-muted)" }}
            >
              <TbActivity className="text-xs" /> Live
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="section-label mb-2">Market Stats</p>

        <StatRow
          label="Market Cap"
          value={`${currency.symbol}${formatMarketCap(liveCoin.market_cap)}`}
        />
        <StatRow
          label="24h Volume"
          value={`${currency.symbol}${formatMarketCap(liveCoin.total_volume)}`}
        />
        <StatRow
          label="24h High"
          value={`${currency.symbol}${(liveCoin.high_24h ?? 0).toLocaleString()}`}
          highlight
        />
        <StatRow
          label="24h Low"
          value={`${currency.symbol}${(liveCoin.low_24h ?? 0).toLocaleString()}`}
        />
        <StatRow
          label="All-Time High"
          value={`${currency.symbol}${(liveCoin.ath ?? 0).toLocaleString()}`}
        />
        <StatRow
          label="ATH Change"
          value={`${(liveCoin.ath_change_percentage ?? 0).toFixed(1)}%`}
        />

        <div className="mt-4">
          <p className="section-label mb-2">Supply</p>
          <StatRow label="Circulating" value={formatMarketCap(liveCoin.circulating_supply)} />
          <StatRow
            label="Total"
            value={liveCoin.total_supply ? formatMarketCap(liveCoin.total_supply) : "∞"}
          />
          {liveCoin.max_supply && (
            <StatRow label="Max" value={formatMarketCap(liveCoin.max_supply)} />
          )}
        </div>

        {/* Supply bar */}
        {circulationPct !== null && (
          <div className="mt-4">
            <div className="flex justify-between mb-1.5">
              <span className="section-label">Circulating / Max</span>
              <span className="text-[10px] price-mono" style={{ color: "var(--text-muted)" }}>
                {circulationPct.toFixed(1)}%
              </span>
            </div>
            <div
              className="h-1.5 w-full rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--accent-from), var(--accent-to))",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${circulationPct}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
