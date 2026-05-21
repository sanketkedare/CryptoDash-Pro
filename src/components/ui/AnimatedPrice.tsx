"use client";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  value: string | number;
  className?: string;
}

export default function AnimatedPrice({ value, className = "" }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={String(value)}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}
