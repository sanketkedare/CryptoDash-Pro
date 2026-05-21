"use client";

import { getExchangeKeys } from "@/utils/exchangeCalc";

interface Props {
  method: "Sell" | "Buy";
  onSelect: (name: string) => void;
  onClose: () => void;
}

export default function CoinDropdown({ onSelect, onClose }: Props) {
  const coins = getExchangeKeys();

  return (
    // FIX: Was using <h1> for each list item — now a proper <ul>/<li> with role="listbox"
    <ul
      role="listbox"
      className="lg:w-[150px] w-[200px] max-h-[120px] overflow-y-auto bg-black text-white absolute left-10 top-12 z-30 rounded-xl p-2"
      onMouseLeave={onClose}
    >
      {coins.map((name) => (
        <li
          key={name}
          role="option"
          aria-selected={false}
          className="border-b border-gray-700 hover:bg-sky-400 hover:text-black text-[13px] px-2 py-1 cursor-pointer rounded"
          onClick={() => {
            onSelect(name);
            onClose();
          }}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
