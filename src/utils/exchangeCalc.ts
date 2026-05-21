import ExchangeData from "@/data/fallbacks/Exchange.json";
import { ExchangeEntry } from "@/types";

type ExchangeMap = Record<string, ExchangeEntry>;
const Exchange = ExchangeData as ExchangeMap;

/**
 * Calculates how much of `buyName` you get when selling `sellAmount` of `sellName`.
 *
 * FIX: The old calculate.js had a Bitcoin special-case that returned a fundamentally
 * different type of value (absolute quantity vs. ratio). This unified formula is
 * mathematically consistent for all coin combinations.
 *
 * Formula: (sellUSDValue / buyUSDValue) * sellAmount
 * All exchange values in Exchange.json are expressed in USD terms relative to BTC.
 */
export function calculateExchangeRate(
  sellName: string,
  sellAmount: number,
  buyName: string
): number {
  const sellKey = Object.keys(Exchange).find((k) => Exchange[k].name === sellName);
  const buyKey = Object.keys(Exchange).find((k) => Exchange[k].name === buyName);

  if (!sellKey || !buyKey) return 0;

  const sellUSDValue = Exchange[sellKey].value;
  const buyUSDValue = Exchange[buyKey].value;

  if (buyUSDValue === 0) return 0;

  // How much USD does the sell produce? Then divide by buy's USD price.
  return (sellUSDValue / buyUSDValue) * sellAmount;
}

export function getExchangeKeys(): string[] {
  return Object.keys(Exchange).map((k) => Exchange[k].name);
}

export function getUnitForCoin(name: string): string {
  const key = Object.keys(Exchange).find((k) => Exchange[k].name === name);
  return key ? Exchange[key].unit : "";
}
