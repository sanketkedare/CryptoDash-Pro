"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  // Start with "dark" to match the server-rendered html class="dark"
  // This prevents a flash on first render
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored ?? "dark"; // default to dark for this premium UI
    const timer = setTimeout(() => {
      setTheme(initial);
      applyTheme(initial);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
      return next;
    });
  };

  return { theme, toggle };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.style.setProperty("--bg-base", "#080B14");
    root.style.setProperty("--bg-surface", "#0D1117");
    root.style.setProperty("--bg-card", "rgba(255,255,255,0.03)");
    root.style.setProperty("--bg-card-hover", "rgba(255,255,255,0.06)");
    root.style.setProperty("--bg-nav", "rgba(8,11,20,0.88)");
    root.style.setProperty("--bg-ticker", "rgba(8,11,20,0.92)");
    root.style.setProperty("--bg-toast", "rgba(13,17,23,0.96)");
    root.style.setProperty("--border", "rgba(255,255,255,0.08)");
    root.style.setProperty("--border-nav", "rgba(255,255,255,0.06)");
    root.style.setProperty("--border-hover", "rgba(99,102,241,0.4)");
    root.style.setProperty("--text-primary", "#f1f5f9");
    root.style.setProperty("--text-secondary", "#94a3b8");
    root.style.setProperty("--text-muted", "#475569");
    root.style.setProperty("--positive-bg", "rgba(16,185,129,0.12)");
    root.style.setProperty("--negative-bg", "rgba(239,68,68,0.12)");
  } else {
    root.classList.remove("dark");
    root.style.setProperty("--bg-base", "#f1f5f9");
    root.style.setProperty("--bg-surface", "#ffffff");
    root.style.setProperty("--bg-card", "rgba(0,0,0,0.03)");
    root.style.setProperty("--bg-card-hover", "rgba(0,0,0,0.06)");
    root.style.setProperty("--bg-nav", "rgba(248,250,252,0.92)");
    root.style.setProperty("--bg-ticker", "rgba(226,232,240,0.98)");
    root.style.setProperty("--bg-toast", "rgba(255,255,255,0.97)");
    root.style.setProperty("--border", "rgba(0,0,0,0.09)");
    root.style.setProperty("--border-nav", "rgba(0,0,0,0.08)");
    root.style.setProperty("--border-hover", "rgba(99,102,241,0.4)");
    root.style.setProperty("--text-primary", "#0f172a");
    root.style.setProperty("--text-secondary", "#475569");
    root.style.setProperty("--text-muted", "#94a3b8");
    root.style.setProperty("--positive-bg", "rgba(16,185,129,0.10)");
    root.style.setProperty("--negative-bg", "rgba(239,68,68,0.10)");
  }
}
