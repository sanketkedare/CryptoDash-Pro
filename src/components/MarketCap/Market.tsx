"use client";

import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCrypto } from "@/features/crypto/slice";
import { useMarketData, MARKET_FALLBACK } from "@/hooks/useMarketData";
import MarketRow from "./MarketRow";
import Shimmer from "./Shimmer";
import Toast from "@/components/ui/Toast";
import { TbRefresh, TbChevronDown } from "react-icons/tb";
import { useQueryClient } from "@tanstack/react-query";
import { CryptoMarketItem } from "@/types";

const PER_PAGE = 100;

export default function Market() {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((s) => s.currency);
  const selectedCoin = useAppSelector((s) => s.crypto);
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [allCoins, setAllCoins] = useState<CryptoMarketItem[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, isLoading, isError, isFetching } = useMarketData(currency.code, page, PER_PAGE);
  const [lastFetched, setLastFetched] = useState<string>("");

  // Reset state on render if the currency changes (official React recommended pattern)
  const [prevCurrency, setPrevCurrency] = useState(currency.code);
  if (currency.code !== prevCurrency) {
    setPrevCurrency(currency.code);
    setPage(1);
    setAllCoins([]);
  }

  useEffect(() => {
    if (!data) return;

    const timer = setTimeout(() => {
      if (page === 1) {
        setAllCoins(data);
      } else {
        setAllCoins((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const newCoins = data.filter((c) => !existingIds.has(c.id));
          return [...prev, ...newCoins];
        });
      }
      setLoadingMore(false);

      // Format and store IST timestamp (Indian Standard Time)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLastFetched(new Date().toLocaleString("en-IN", options) + " IST");
    }, 0);

    return () => clearTimeout(timer);
  }, [data, page]);

  const marketData = useMemo(() => {
    return allCoins.length > 0 ? allCoins : isError ? MARKET_FALLBACK : [];
  }, [allCoins, isError]);
  const hasMore = data?.length === PER_PAGE; // If we got a full page, there's likely more

  // Auto-select first coin
  useEffect(() => {
    if (!selectedCoin && marketData.length > 0) {
      dispatch(setCrypto(marketData[0]));
    }
  }, [marketData, selectedCoin, dispatch]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage((p) => p + 1);
  };

  const handleRefresh = () => {
    setPage(1);
    setAllCoins([]);
    queryClient.invalidateQueries({ queryKey: ["market"] });
  };

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <p className="section-label">Market Cap</p>
          {lastFetched ? (
            <p
              className="text-[10px] mt-0.5 font-medium"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}
            >
              Updated: {lastFetched}
            </p>
          ) : (
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {marketData.length} coins loaded
            </p>
          )}
        </div>
        <button
          onClick={handleRefresh}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
          aria-label="Refresh market data"
          title="Refresh"
        >
          <TbRefresh
            className={`text-sm ${isFetching && !loadingMore ? "animate-spin" : ""}`}
            style={{ color: "var(--text-muted)" }}
          />
        </button>
      </div>

      {/* Column labels */}
      <div
        className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider shrink-0"
        style={{ color: "var(--text-muted)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span>Coin</span>
        <span className="text-right">Price</span>
        <span className="text-right">24h</span>
      </div>

      {/* Scrollable rows */}
      <div className="overflow-y-auto flex-1">
        {isLoading && page === 1 ? (
          <Shimmer />
        ) : (
          <>
            {marketData.map((coin) => (
              <MarketRow key={coin.id} crypto={coin} />
            ))}

            {/* Load More */}
            {hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="w-full py-3 flex items-center justify-center gap-2 text-xs font-semibold transition-all"
                style={{
                  color: loadingMore ? "var(--text-muted)" : "var(--accent-from)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {loadingMore ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                    Loading…
                  </>
                ) : (
                  <>
                    <TbChevronDown />
                    Load next {PER_PAGE} coins
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>

      {isError && <Toast message="⚠️ Live data unavailable — showing cached snapshot" />}
    </div>
  );
}
