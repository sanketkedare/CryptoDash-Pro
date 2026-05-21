import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "@/features/currency/slice";
import cryptoReducer from "@/features/crypto/slice";
// market state removed — owned by TanStack Query

export const makeStore = () =>
  configureStore({
    reducer: {
      currency: currencyReducer,
      crypto: cryptoReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
