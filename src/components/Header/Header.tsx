"use client";

import CurrencySelector from "./CurrencySelector";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="flex items-center gap-3 h-[44px]">
      <CurrencySelector />
      <SearchBar />
    </div>
  );
}
