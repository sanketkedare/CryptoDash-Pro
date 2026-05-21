"use client";

import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "@/hooks/useTheme";
import NavActions from "./NavActions";
import NavMarketStats from "./NavMarketStats";
import PriceTicker from "./PriceTicker";
import CurrencySelector from "@/components/Header/CurrencySelector";
import SearchBar from "@/components/Header/SearchBar";

import Image from "next/image";

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="shrink-0">
      <nav
        className="flex items-center gap-3 px-5 py-2.5"
        style={{
          background: "var(--bg-nav)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--border-nav)",
          transition: "background 0.25s ease",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/icon-192x192.png"
            alt="CryptoDash Logo"
            width={28}
            height={28}
            className="rounded-lg shadow-[0_0_12px_rgba(99,102,241,0.3)] border border-indigo-500/20"
            unoptimized
          />
          <div className="hidden sm:block">
            <span className="font-bold text-sm gradient-text tracking-wider">CRYPTODASH</span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-px h-5 shrink-0 hidden lg:block"
          style={{ background: "var(--border)" }}
        />

        {/* Live market stats */}
        <NavMarketStats />

        {/* Search — grows to fill center */}
        <div className="flex-1 min-w-0 max-w-md mx-auto">
          <SearchBar compact />
        </div>

        {/* Right: Currency + Theme + LinkedIn */}
        <div className="flex items-center gap-2 shrink-0">
          <CurrencySelector compact />

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            {theme === "dark" ? (
              <BsSun className="text-yellow-400 text-sm" />
            ) : (
              <BsMoon className="text-slate-500 text-sm" />
            )}
          </button>

          <NavActions />
        </div>
      </nav>

      <PriceTicker />
    </header>
  );
}
