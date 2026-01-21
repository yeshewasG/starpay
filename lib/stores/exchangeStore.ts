"use client";

import { create } from "zustand";

interface ExchangeState {
  usdAmount: string; // string because it's coming from <Input type="tel">
  setUsdAmount: (amount: string) => void;
  resetUsdAmount: () => void;
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  usdAmount: "",
  setUsdAmount: (amount) => set({ usdAmount: amount }),
  resetUsdAmount: () => set({ usdAmount: "" }),
}));
