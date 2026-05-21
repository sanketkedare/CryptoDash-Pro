import { z } from "zod";

const PriceTupleSchema = z.tuple([z.number(), z.number()]);

export const HistoricalDataSchema = z.object({
  prices: z.array(PriceTupleSchema),
  market_caps: z.array(PriceTupleSchema),
  total_volumes: z.array(PriceTupleSchema),
});

export type HistoricalDataParsed = z.infer<typeof HistoricalDataSchema>;
