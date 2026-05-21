"use client";

import CoinSelector from "./CoinSelector";
import CoinDropdown from "./CoinDropdown";

interface Props {
  method: "Sell" | "Buy";
  coin: string;
  onCoinSelect: (name: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  amount: number;
  unit?: string;
  onAmountChange?: (v: number) => void;
}

export default function ExchangeRow({
  method,
  coin,
  onCoinSelect,
  isOpen,
  onToggle,
  amount,
  unit,
  onAmountChange,
}: Props) {
  return (
    <div className="flex flex-wrap justify-around lg:justify-between px-2 items-center relative">
      <CoinSelector method={method} coin={coin} onToggle={onToggle} />

      {isOpen && <CoinDropdown method={method} onSelect={onCoinSelect} onClose={onToggle} />}

      {method === "Sell" ? (
        <input
          className="lg:w-[200px] w-full border m-auto border-black rounded-lg p-1 text-red-600 my-1"
          value={amount}
          type="number"
          min={0}
          onChange={(e) => onAmountChange?.(parseFloat(e.target.value) || 0)}
        />
      ) : (
        <div className="lg:w-[200px] w-full border m-auto border-black rounded-lg p-1 text-green-600 my-1 font-mono">
          {unit} {amount}
        </div>
      )}
    </div>
  );
}
