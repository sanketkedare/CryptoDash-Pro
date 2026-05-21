import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "@/types";

// flagcdn.com serves reliable PNG flags — no SVG block issues with next/image
const INR_FLAG = "https://flagcdn.com/w40/in.png";
const USD_FLAG = "https://flagcdn.com/w40/us.png";
const EUR_FLAG = "https://flagcdn.com/w40/eu.png";
const JPY_FLAG = "https://flagcdn.com/w40/jp.png";

export const COUNTRY_OPTIONS = [
  { id: 1, currency: "INR", symbol: "₹", flag: INR_FLAG },
  { id: 2, currency: "USD", symbol: "$", flag: USD_FLAG },
  { id: 3, currency: "EUR", symbol: "€", flag: EUR_FLAG },
  { id: 4, currency: "YEN", symbol: "¥", flag: JPY_FLAG },
];

const initialState: Currency = {
  code: "INR",
  symbol: "₹",
  flag: INR_FLAG,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (_state, action: PayloadAction<Currency>) => action.payload,
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
