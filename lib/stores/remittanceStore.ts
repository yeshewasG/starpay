import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Bank } from "@/lib/types";

type Step =
  | "amount"
  | "confirm"
  | "bank"
  | "recipient"
  | "gift"
  | "review"
  | "payment"
  | "success";

interface RemittanceState {
  step: Step;
  usdAmount: string;
  recipientName: string;
  recipientPhone: string;

  selectedBank: Bank | null;
  selectedGift: string | null;
  paymentMethod: string | null;

  cybersourcePayload: Record<string, string> | null; // ✅ Add CyberSource payload

  setStep: (step: Step) => void;
  setUsdAmount: (amount: string) => void;
  setRecipientName: (name: string) => void;
  setRecipientPhone: (phone: string) => void;

  setSelectedBank: (bank: Bank | null) => void;
  setSelectedGift: (gift: string | null) => void;
  setPaymentMethod: (method: string | null) => void;

  setCybersourcePayload: (payload: Record<string, string> | null) => void; // ✅ setter

  reset: () => void;
}

export const useRemittanceStore = create<RemittanceState>()(
  persist(
    (set) => ({
      step: "amount",
      usdAmount: "",
      recipientName: "",
      recipientPhone: "",

      selectedBank: null,
      selectedGift: null,
      paymentMethod: null,

      cybersourcePayload: null, // ✅ initialize

      setStep: (step) => set({ step }),
      setUsdAmount: (amount) => set({ usdAmount: amount }),
      setRecipientName: (name) => set({ recipientName: name }),
      setRecipientPhone: (phone) => set({ recipientPhone: phone }),

      setSelectedBank: (bank) => set({ selectedBank: bank }),
      setSelectedGift: (gift) => set({ selectedGift: gift }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),

      setCybersourcePayload: (payload) => set({ cybersourcePayload: payload }), // ✅ setter

      reset: () =>
        set({
          step: "amount",
          usdAmount: "",
          recipientName: "",
          recipientPhone: "",
          selectedBank: null,
          selectedGift: null,
          paymentMethod: null,
          cybersourcePayload: null, // ✅ reset
        }),
    }),
    {
      name: "remittance-flow",
      partialize: (state) => ({
        usdAmount: state.usdAmount,
        recipientName: state.recipientName,
        recipientPhone: state.recipientPhone,
        selectedGift: state.selectedGift,
        selectedBank: state.selectedBank,
        cybersourcePayload: state.cybersourcePayload, // ✅ persist payload
      }),
    },
  ),
);
