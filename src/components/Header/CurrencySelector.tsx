"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TbChevronDown } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrency, COUNTRY_OPTIONS } from "@/features/currency/slice";
import { CountryOption } from "@/types";

interface Props {
  compact?: boolean;
}

export default function CurrencySelector({ compact }: Props) {
  const dispatch = useAppDispatch();
  const current = useAppSelector((s) => s.currency);
  const [open, setOpen] = useState(false);

  const handleSelect = (opt: CountryOption) => {
    dispatch(setCurrency({ code: opt.currency, symbol: opt.symbol, flag: opt.flag }));
    setOpen(false);
  };

  const h = compact ? "h-[36px]" : "h-[44px]";

  return (
    <div className="relative shrink-0">
      <button
        className={`${h} px-3 flex items-center gap-2 rounded-xl text-sm font-medium transition-all`}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
          minWidth: compact ? "100px" : "140px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Image
          src={current.flag}
          alt={current.code}
          width={18}
          height={12}
          className="rounded-sm object-cover shrink-0"
          unoptimized
        />
        <span className="gradient-text font-bold text-sm">{current.symbol}</span>
        {!compact && (
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {current.code}
          </span>
        )}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
          style={{ color: "var(--text-muted)" }}
        >
          <TbChevronDown className="text-xs" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className="absolute top-[calc(100%+6px)] right-0 z-50 rounded-xl overflow-hidden"
            style={{
              background: "rgba(13,17,23,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
              minWidth: "160px",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            role="listbox"
          >
            {COUNTRY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                role="option"
                aria-selected={current.code === opt.currency}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all"
                style={{
                  color:
                    current.code === opt.currency ? "var(--text-primary)" : "var(--text-secondary)",
                  background:
                    current.code === opt.currency ? "rgba(99,102,241,0.1)" : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  if (current.code !== opt.currency)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (current.code !== opt.currency)
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
                onClick={() => handleSelect(opt)}
              >
                <Image
                  src={opt.flag}
                  alt={opt.currency}
                  width={20}
                  height={13}
                  className="rounded-sm object-cover shrink-0"
                  unoptimized
                />
                <span className="font-bold">{opt.symbol}</span>
                <span className="text-xs">{opt.currency}</span>
                {current.code === opt.currency && (
                  <span className="ml-auto text-[10px] gradient-text font-bold">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
