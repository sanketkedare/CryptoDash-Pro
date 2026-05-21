"use client";

import { FiLinkedin } from "react-icons/fi";

const LINKEDIN_URL = "https://www.linkedin.com/in/sanket-kedare-dev/";

export default function NavActions() {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-medium"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "var(--text-secondary)",
      }}
    >
      <FiLinkedin className="text-[#0A66C2] text-sm" />
      <span className="hidden sm:inline">LinkedIn</span>
    </a>
  );
}
