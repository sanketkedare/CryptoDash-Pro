"use client";

import TopCoins from "./TopCoins";
import ExchangeWidget from "./ExchangeWidget";

export default function PortfolioPanel() {
  return (
    // Fixed height — chart above gets all remaining flex space
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:h-[168px] h-auto shrink-0">
      <TopCoins />
      <ExchangeWidget />
    </div>
  );
}
