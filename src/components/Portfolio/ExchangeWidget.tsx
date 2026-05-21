"use client";

import { useState, useMemo } from "react";
import { TbArrowsExchange } from "react-icons/tb";
import { useAppSelector } from "@/lib/hooks";
import { useMarketData } from "@/hooks/useMarketData";
import AnimatedPrice from "@/components/ui/AnimatedPrice";

export default function ExchangeWidget() {
  const currency = useAppSelector((s) => s.currency);
  const { data: market = [] } = useMarketData(currency.code);

  // Build coin options from live market data (top 20 by market cap)
  const coinOptions = useMemo(
    () =>
      market
        .slice(0, 20)
        .map((c) => ({ name: c.name, symbol: c.symbol.toUpperCase(), price: c.current_price })),
    [market]
  );

  const [sellIdx, setSellIdx] = useState(0); // Bitcoin
  const [buyIdx, setBuyIdx] = useState(1); // Ethereum
  const [amount, setAmount] = useState<number>(1);

  const sellCoin = coinOptions[sellIdx];
  const buyCoin = coinOptions[buyIdx];

  // Live formula: (sell_price / buy_price) × amount — uses real current_price in selected currency
  const result = useMemo(() => {
    if (!sellCoin || !buyCoin || buyCoin.price === 0) return 0;
    return (sellCoin.price / buyCoin.price) * amount;
  }, [sellCoin, buyCoin, amount]);

  const handleSwap = () => {
    setSellIdx(buyIdx);
    setBuyIdx(sellIdx);
  };

  const selectStyle = {
    background: "var(--bg-surface)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    fontFamily: "inherit",
    borderRadius: "8px",
    padding: "5px 8px",
    fontSize: "12px",
    fontWeight: "600",
    outline: "none",
    cursor: "pointer",
    appearance: "auto",
  } as React.CSSProperties;

  const inputStyle = {
    background: "var(--bg-surface)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    fontFamily: "'JetBrains Mono', monospace",
    borderRadius: "8px",
    padding: "5px 8px",
    fontSize: "12px",
    outline: "none",
    textAlign: "right",
    width: "64px",
  } as React.CSSProperties;

  if (coinOptions.length === 0) {
    return (
      <div
        className="rounded-xl p-3 h-full flex items-center justify-center"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div className="shimmer h-4 w-32 rounded" />
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-3 h-full"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2.5">
        <TbArrowsExchange className="text-indigo-400 text-sm" />
        <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
          Exchange
        </span>
        <span className="section-label ml-1">live rates · {currency.code}</span>
      </div>

      {/* Compact 1-line form */}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={inputStyle}
        />

        <select
          value={sellIdx}
          onChange={(e) => setSellIdx(Number(e.target.value))}
          style={selectStyle}
          className="flex-1"
        >
          {coinOptions.map((c, i) => (
            <option key={c.symbol} value={i}>
              {c.symbol}
            </option>
          ))}
        </select>

        <button
          onClick={handleSwap}
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
          style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
          aria-label="Swap coins"
        >
          <TbArrowsExchange className="text-indigo-400 text-xs" />
        </button>

        <select
          value={buyIdx}
          onChange={(e) => setBuyIdx(Number(e.target.value))}
          style={selectStyle}
          className="flex-1"
        >
          {coinOptions.map((c, i) => (
            <option key={c.symbol} value={i}>
              {c.symbol}
            </option>
          ))}
        </select>
      </div>

      {/* Result */}
      <div
        className="rounded-lg px-3 py-2 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          {amount} {sellCoin?.symbol} =
        </span>
        <span className="price-mono text-base font-bold gradient-text">
          <AnimatedPrice value={result > 0 ? result.toFixed(8).replace(/\.?0+$/, "") : "—"} />
          <span className="text-[10px] ml-1 font-normal" style={{ color: "var(--text-muted)" }}>
            {buyCoin?.symbol}
          </span>
        </span>
      </div>
    </div>
  );
}
