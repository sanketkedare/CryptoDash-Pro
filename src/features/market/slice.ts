import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptoMarketItem } from "@/types";

// FIX: Initial state is [] — NOT the 110KB Market.json import
const marketSlice = createSlice({
  name: "market",
  initialState: [] as CryptoMarketItem[],
  reducers: {
    setMarketData: (_state, action: PayloadAction<CryptoMarketItem[]>) => action.payload,
  },
});

export const { setMarketData } = marketSlice.actions;
export default marketSlice.reducer;
