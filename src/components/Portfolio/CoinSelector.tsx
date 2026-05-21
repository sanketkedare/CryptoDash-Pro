"use client";

import { MdOutlineArrowDropDownCircle } from "react-icons/md";

interface Props {
  method: "Sell" | "Buy";
  coin: string;
  onToggle: () => void;
}

export default function CoinSelector({ method, coin, onToggle }: Props) {
  return (
    <>
      <p className={`${method === "Sell" ? "text-red-800" : "text-green-800"} font-bold px-1 m-3`}>
        {method}:
      </p>
      {/* FIX: Was <h1> — now a semantically correct <button> */}
      <button
        className="p-1 px-3 border border-black rounded-lg w-full lg:w-[150px] flex items-center justify-between hover:bg-gray-100 transition-colors"
        onClick={onToggle}
        aria-label={`Select ${method.toLowerCase()} coin`}
      >
        {coin}
        <MdOutlineArrowDropDownCircle />
      </button>
    </>
  );
}
