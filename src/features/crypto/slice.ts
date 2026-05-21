import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptoMarketItem } from "@/types";

// FIX: Initial state is null — NOT a hardcoded 2024 Bitcoin snapshot
const cryptoSlice = createSlice({
  name: "crypto",
  initialState: null as CryptoMarketItem | null,
  reducers: {
    setCrypto: (_state, action: PayloadAction<CryptoMarketItem>) => action.payload,
  },
});

export const { setCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer;
