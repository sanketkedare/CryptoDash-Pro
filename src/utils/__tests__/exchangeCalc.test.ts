import { describe, it, expect } from "vitest";
import { calculateExchangeRate, getExchangeKeys } from "@/utils/exchangeCalc";

describe("calculateExchangeRate", () => {
  it("returns a positive number for any known coin combination", () => {
    const result = calculateExchangeRate("Ether", 1, "Bitcoin");
    expect(result).toBeGreaterThan(0);
  });

  it("is mathematically consistent: BTC→ETH and ETH→BTC are inverses", () => {
    const btcToEth = calculateExchangeRate("Bitcoin", 1, "Ether");
    const ethToBtc = calculateExchangeRate("Ether", 1, "Bitcoin");
    // btcToEth * ethToBtc should approximate 1
    expect(btcToEth * ethToBtc).toBeCloseTo(1, 0);
  });

  it("returns 0 for unknown sell coin", () => {
    const result = calculateExchangeRate("MadeUpCoin", 1, "Bitcoin");
    expect(result).toBe(0);
  });

  it("returns 0 for unknown buy coin", () => {
    const result = calculateExchangeRate("Bitcoin", 1, "MadeUpCoin");
    expect(result).toBe(0);
  });

  it("returns 0 when sell amount is 0", () => {
    const result = calculateExchangeRate("Bitcoin", 0, "Ether");
    expect(result).toBe(0);
  });

  it("scales linearly with sell amount", () => {
    const one = calculateExchangeRate("Ether", 1, "Bitcoin");
    const ten = calculateExchangeRate("Ether", 10, "Bitcoin");
    expect(ten).toBeCloseTo(one * 10, 5);
  });
});

describe("getExchangeKeys", () => {
  it("returns an array of coin names", () => {
    const keys = getExchangeKeys();
    expect(Array.isArray(keys)).toBe(true);
    expect(keys.length).toBeGreaterThan(0);
  });

  it("includes Bitcoin and Ether", () => {
    const keys = getExchangeKeys();
    expect(keys).toContain("Bitcoin");
    expect(keys).toContain("Ether");
  });
});
