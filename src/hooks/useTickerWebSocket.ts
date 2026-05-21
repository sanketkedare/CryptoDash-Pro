"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const BINANCE_WS = "wss://stream.binance.com:9443/stream";
const RECONNECT_DELAY_MS = 3000;

export function useTickerWebSocket(symbols: string[]) {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const connectRef = useRef<() => void>(() => {});

  const connect = useCallback(() => {
    if (!symbols.length || !isMountedRef.current) return;

    // Binance symbols are e.g. "btcusdt@miniTicker"
    const streams = symbols.map((s) => `${s.toLowerCase()}usdt@miniTicker`).join("/");

    const ws = new WebSocket(`${BINANCE_WS}?streams=${streams}`);
    wsRef.current = ws;

    ws.onmessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data as string) as {
          data: { s: string; c: string };
        };
        const symbol = msg.data.s.replace("USDT", "");
        const price = parseFloat(msg.data.c);
        if (!isNaN(price)) {
          setPrices((prev) => ({ ...prev, [symbol]: price }));
        }
      } catch {
        // malformed frame — ignore silently
      }
    };

    ws.onclose = () => {
      if (isMountedRef.current) {
        // Exponential backoff reconnect
        reconnectTimerRef.current = setTimeout(() => {
          connectRef.current();
        }, RECONNECT_DELAY_MS);
      }
    };

    ws.onerror = () => ws.close();
  }, [symbols]);

  // Keep connectRef synced with the active connect callback
  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return prices;
}
