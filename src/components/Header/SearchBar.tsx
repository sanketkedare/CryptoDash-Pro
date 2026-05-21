"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TbSearch } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCrypto } from "@/features/crypto/slice";
import { useMarketData } from "@/hooks/useMarketData";
import { useDebounce } from "@/hooks/useDebounce";
import { CryptoMarketItem } from "@/types";

interface Props {
  compact?: boolean;
}

export default function SearchBar({ compact }: Props) {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((s) => s.currency.code);
  const { data: market = [] } = useMarketData(currency);

  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const debouncedText = useDebounce(text, 250);

  const filtered = debouncedText
    ? market.filter((c) => c.name.toLowerCase().includes(debouncedText.toLowerCase())).slice(0, 7)
    : [];
  const showDropdown = focused && filtered.length > 0;

  const handleSelect = (coin: CryptoMarketItem) => {
    setText("");
    dispatch(setCrypto(coin));
    setFocused(false);
  };

  const h = compact ? "h-[36px]" : "h-[44px]";

  return (
    <div className="relative w-full">
      <div
        className={`${h} flex items-center gap-2 rounded-xl px-3 transition-all`}
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${focused ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
        }}
      >
        <TbSearch className="shrink-0 text-sm" style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search coin…"
          aria-label="Search cryptocurrency"
          className="bg-transparent flex-1 text-sm outline-none min-w-0"
          style={{ color: "var(--text-primary)", fontFamily: "inherit" }}
        />
        {text && (
          <button
            onClick={() => setText("")}
            style={{ color: "var(--text-muted)" }}
            className="text-xs shrink-0"
          >
            ✕
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.13 }}
            className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 rounded-xl overflow-hidden"
            style={{
              background: "rgba(13,17,23,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            {filtered.map((item) => {
              const change = item.price_change_percentage_24h ?? 0;
              return (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  onClick={() => handleSelect(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={22}
                    height={22}
                    className="rounded-full shrink-0"
                    unoptimized
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.name}
                    </p>
                    <p className="text-[10px] uppercase" style={{ color: "var(--text-muted)" }}>
                      {item.symbol}
                    </p>
                  </div>
                  <span className={change >= 0 ? "badge-positive" : "badge-negative"}>
                    {change >= 0 ? "+" : ""}
                    {change.toFixed(2)}%
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
