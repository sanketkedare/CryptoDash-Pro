"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import GraphComponent from "@/components/Graph/GraphComponent";
import PortfolioPanel from "@/components/Portfolio/PortfolioPanel";
import Market from "@/components/MarketCap/Market";
import CoinDetail from "@/components/CoinDetail";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import MobileTabBar, { MobileTab } from "@/components/MobileTabBar";

export default function DashboardShell() {
  const [tab, setTab] = useState<MobileTab>("chart");

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      <Navbar />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden gap-2.5 p-2.5">
        {/*
         * LEFT — Market Rankings
         * lg+: fixed 256px sidebar, always visible
         * <lg:  full-width, shown only when market tab active
         */}
        <aside
          className={`
            flex flex-col w-full
            lg:w-[256px] lg:shrink-0 lg:flex
            ${tab === "market" ? "flex" : "hidden"} lg:flex
          `}
        >
          <ErrorBoundary name="Market Table">
            <Market />
          </ErrorBoundary>
        </aside>

        {/*
         * CENTER — Chart + Portfolio
         * Always full width on mobile when chart tab; flex-1 on lg+
         */}
        <main
          className={`
            flex-col gap-2.5 min-w-0 flex-1
            overflow-y-auto lg:overflow-hidden
            ${tab === "chart" ? "flex" : "hidden"} lg:flex
          `}
        >
          <ErrorBoundary name="Chart">
            <GraphComponent />
          </ErrorBoundary>
          <ErrorBoundary name="Portfolio">
            <div className="shrink-0">
              <PortfolioPanel />
            </div>
          </ErrorBoundary>
        </main>

        {/*
         * RIGHT — Coin Detail
         * xl+: fixed 272px sidebar, always visible
         * <xl:  full-width, shown only when detail tab active
         */}
        <aside
          className={`
            flex flex-col w-full
            xl:w-[272px] xl:shrink-0 xl:flex
            ${tab === "detail" ? "flex" : "hidden"} xl:flex
          `}
        >
          <ErrorBoundary name="CoinDetail">
            <CoinDetail />
          </ErrorBoundary>
        </aside>
      </div>

      {/* Bottom tab bar — hidden on lg+ */}
      <MobileTabBar activeTab={tab} onTabChange={setTab} />
    </div>
  );
}
