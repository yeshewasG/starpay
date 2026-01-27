import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Bank, CybersourcePayload } from "@/lib/types";

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
  usdAmount: number;
  recipientName: string;
  recipientAccount: string;
  senderName: string;
  recipientPhone: string;

  selectedBank: Bank | null;
  selectedGift: string | null;
  paymentMethod: string | null;

  cybersourcePayload: CybersourcePayload | null; // ✅ Add CyberSource payload

  setStep: (step: Step) => void;
  setUsdAmount: (amount: number) => void;
  setRecipientName: (name: string) => void;
  setRecipientAccount: (name: string) => void;
  setSenderName: (name: string) => void;
  setRecipientPhone: (phone: string) => void;

  setSelectedBank: (bank: Bank | null) => void;
  setSelectedGift: (gift: string | null) => void;
  setPaymentMethod: (method: string | null) => void;

  setCybersourcePayload: (payload: CybersourcePayload | null) => void; // ✅ setter

  reset: () => void;
}

export const useRemittanceStore = create<RemittanceState>()(
  persist(
    (set) => ({
      step: "amount",
      usdAmount: 0,
      recipientName: "",
      recipientAccount: "",
      senderName: "",
      recipientPhone: "",

      selectedBank: null,
      selectedGift: null,
      paymentMethod: null,

      cybersourcePayload: null,

      setStep: (step) => set({ step }),
      setUsdAmount: (amount) => set({ usdAmount: amount }),
      setRecipientName: (name) => set({ recipientName: name }), // ✅ correct
      setRecipientAccount: (account) => set({ recipientAccount: account }), // ✅ correct
      setSenderName: (name) => set({ senderName: name }), // ✅ correct
      setRecipientPhone: (phone) => set({ recipientPhone: phone }),

      setSelectedBank: (bank) => set({ selectedBank: bank }),
      setSelectedGift: (gift) => set({ selectedGift: gift }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),

      setCybersourcePayload: (payload) => set({ cybersourcePayload: payload }),

      reset: () =>
        set({
          step: "amount",
          usdAmount: 0,
          recipientName: "",
          recipientAccount: "",
          senderName: "",
          recipientPhone: "",
          selectedBank: null,
          selectedGift: null,
          paymentMethod: null,
          cybersourcePayload: null,
        }),
    }),
    {
      name: "remittance-flow",
      partialize: (state) => ({
        usdAmount: state.usdAmount,
        recipientName: state.recipientName,
        recipientAccount: state.recipientAccount, // ✅ persist account too
        recipientPhone: state.recipientPhone,
        selectedGift: state.selectedGift,
        selectedBank: state.selectedBank,
        cybersourcePayload: state.cybersourcePayload,
      }),
    },
  ),
);
