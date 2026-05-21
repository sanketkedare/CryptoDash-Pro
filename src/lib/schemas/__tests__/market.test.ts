import { describe, it, expect } from "vitest";
import { MarketResponseSchema, CryptoMarketItemSchema } from "@/lib/schemas/market";

const VALID_ITEM = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "btc",
  image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  current_price: 65000,
  market_cap: 1280000000000,
  market_cap_rank: 1,
  fully_diluted_valuation: null,
  total_volume: 45000000000,
  high_24h: 66000,
  low_24h: 64000,
  price_change_24h: 500,
  price_change_percentage_24h: 0.78,
  market_cap_change_24h: 9000000000,
  market_cap_change_percentage_24h: 0.71,
  circulating_supply: 19700000,
  total_supply: 21000000,
  max_supply: 21000000,
  ath: 73750,
  ath_change_percentage: -11.8,
  ath_date: "2024-03-14T07:10:36.635Z",
  atl: 67.81,
  atl_change_percentage: 95700,
  atl_date: "2013-07-06T00:00:00.000Z",
  last_updated: "2024-05-21T12:00:00.000Z",
};

describe("CryptoMarketItemSchema", () => {
  it("validates a well-formed CoinGecko market item", () => {
    const result = CryptoMarketItemSchema.safeParse(VALID_ITEM);
    expect(result.success).toBe(true);
  });

  it("rejects a non-URL image field", () => {
    const result = CryptoMarketItemSchema.safeParse({ ...VALID_ITEM, image: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("rejects string current_price", () => {
    const result = CryptoMarketItemSchema.safeParse({ ...VALID_ITEM, current_price: "65000" });
    expect(result.success).toBe(false);
  });

  it("accepts null for nullable fields", () => {
    const result = CryptoMarketItemSchema.safeParse({
      ...VALID_ITEM,
      high_24h: null,
      low_24h: null,
    });
    expect(result.success).toBe(true);
  });
});

describe("MarketResponseSchema", () => {
  it("validates an array of valid items", () => {
    const result = MarketResponseSchema.safeParse([VALID_ITEM, VALID_ITEM]);
    expect(result.success).toBe(true);
    expect(result.data?.length).toBe(2);
  });

  it("rejects non-array input", () => {
    const result = MarketResponseSchema.safeParse(VALID_ITEM);
    expect(result.success).toBe(false);
  });

  it("rejects array with one invalid item", () => {
    const result = MarketResponseSchema.safeParse([VALID_ITEM, { id: 123 }]);
    expect(result.success).toBe(false);
  });
});
