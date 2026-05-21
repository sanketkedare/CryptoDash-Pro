"use client";

import { useEffect, useState } from "react";
import { TbAlertTriangle, TbX } from "react-icons/tb";

interface Props {
  message: string;
  duration?: number;
}

export default function Toast({ message, duration = 5000 }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="toast flex items-center gap-3">
      <TbAlertTriangle className="text-yellow-500 shrink-0" />
      <span>{message}</span>
      <button onClick={() => setVisible(false)} style={{ color: "var(--text-muted)" }}>
        <TbX className="text-sm" />
      </button>
    </div>
  );
}
