"use client";

import { TbChartLine, TbLayoutList, TbCoin } from "react-icons/tb";

export type MobileTab = "chart" | "market" | "detail";

const TABS: { id: MobileTab; label: string; Icon: React.ElementType }[] = [
  { id: "chart", label: "Chart", Icon: TbChartLine },
  { id: "market", label: "Market", Icon: TbLayoutList },
  { id: "detail", label: "Detail", Icon: TbCoin },
];

interface Props {
  activeTab: MobileTab;
  onTabChange: (t: MobileTab) => void;
}

export default function MobileTabBar({ activeTab, onTabChange }: Props) {
  return (
    <nav
      className="lg:hidden flex shrink-0"
      style={{
        background: "var(--bg-nav)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid var(--border-nav)",
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors relative"
            style={{ color: active ? "var(--accent-from)" : "var(--text-muted)" }}
            aria-label={label}
          >
            {active && (
              <span
                className="absolute top-0 left-4 right-4 h-0.5 rounded-b"
                style={{
                  background: "linear-gradient(90deg, var(--accent-from), var(--accent-to))",
                }}
              />
            )}
            <Icon className="text-lg" />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
