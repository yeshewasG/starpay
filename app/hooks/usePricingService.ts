// hooks/pricing/usePricingService.ts
"use client";

import { apiBaseUrl } from "@/lib/constants"; // ← assuming you have this
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bank } from "./useBankService";

const API_BASE = `${apiBaseUrl}/api/pricing`;

export interface Fee {
  _id?: string;
  bankId: Bank;
  transactionSource: "web" | "mobile" | "ussd" | string;
  percentage: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Bonus {
  _id?: string;
  bankId: Bank;
  transactionSource: "web" | "mobile" | "ussd" | string;
  percentage: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PricingContext {
  bankId: Bank;
  fees: Fee[];
  bonuses: Bonus[];
  // ... add more fields according to your actual response
}
export interface PricingContextItem {
  bank: Bank;
  fee: Fee | null;
  bonus: Bonus | null;
  exchangeRate: unknown | null; // you can strongly type this later
}

export interface PaginatedPricingContext {
  data: PricingContextItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PricingCalculation {
  bankId: Bank;
  amount: number;
  transactionSource: string;
  feeAmount: number;
  bonusAmount: number;
  finalAmount: number;
  // ... extend as needed
}

export function usePricingService() {
  const queryClient = useQueryClient();

  const useAllPricingContexts = (
    params: {
      page?: number;
      limit?: number;
      transactionSource?: string;
    } = {},
  ) => {
    const { page = 1, limit = 10, transactionSource } = params;

    return useQuery<PaginatedPricingContext>({
      queryKey: ["pricing-contexts", page, limit, transactionSource],
      queryFn: async () => {
        const searchParams = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        if (transactionSource) {
          searchParams.set("transactionSource", transactionSource);
        }

        const res = await fetch(`${API_BASE}?${searchParams.toString()}`);

        if (!res.ok) {
          throw new Error("Failed to fetch pricing contexts");
        }

        return res.json();
      },
    });
  };

  // ────────────────────────────────────────────────
  //  Context
  // ────────────────────────────────────────────────
  const usePricingContext = (bankId: string, transactionSource = "web") => {
    return useQuery<PricingContext>({
      queryKey: ["pricing-context", bankId, transactionSource],
      queryFn: async () => {
        const url = `${API_BASE}/context/${bankId}?transactionSource=${transactionSource}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch pricing context");
        return res.json();
      },
      enabled: !!bankId,
    });
  };

  // ────────────────────────────────────────────────
  //  Fees
  // ────────────────────────────────────────────────
  const useFees = (bankId?: string, transactionSource?: string) => {
    return useQuery<Fee[]>({
      queryKey: ["fees", bankId, transactionSource],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (bankId) params.set("bankId", bankId);
        if (transactionSource)
          params.set("transactionSource", transactionSource);

        const url = `${API_BASE}/fees?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch fees");
        const data = await res.json();
        return data.data ?? data; // adjust depending on your API wrapper shape
      },
      enabled: !!bankId,
    });
  };

  const useCreateFee = () => {
    return useMutation({
      mutationFn: async (fee: Omit<Fee, "_id">) => {
        const res = await fetch(`${API_BASE}/fees`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fee),
        });
        if (!res.ok) throw new Error("Failed to create fee");
        return res.json();
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["fees"] });
        queryClient.invalidateQueries({
          queryKey: ["fees", variables.bankId, variables.transactionSource],
        });
        // Optional: also invalidate context if you use it
        queryClient.invalidateQueries({
          queryKey: ["pricing-context", variables.bankId],
        });
      },
    });
  };

  // ────────────────────────────────────────────────
  //  Bonuses
  // ────────────────────────────────────────────────
  const useBonuses = (bankId?: string, transactionSource?: string) => {
    return useQuery<Bonus[]>({
      queryKey: ["bonuses", bankId, transactionSource],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (bankId) params.set("bankId", bankId);
        if (transactionSource)
          params.set("transactionSource", transactionSource);

        const url = `${API_BASE}/bonuses?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch bonuses");
        const data = await res.json();
        return data.data ?? data;
      },
      enabled: !!bankId,
    });
  };

  const useCreateBonus = () => {
    return useMutation({
      mutationFn: async (bonus: Omit<Bonus, "_id">) => {
        const res = await fetch(`${API_BASE}/bonuses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bonus),
        });
        if (!res.ok) throw new Error("Failed to create bonus");
        return res.json();
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["bonuses"] });
        queryClient.invalidateQueries({
          queryKey: ["bonuses", variables.bankId, variables.transactionSource],
        });
        queryClient.invalidateQueries({
          queryKey: ["pricing-context", variables.bankId],
        });
      },
    });
  };

  // ────────────────────────────────────────────────
  //  Pricing Calculation
  // ────────────────────────────────────────────────
  const useCalculatePricing = () => {
    return useMutation<
      PricingCalculation,
      Error,
      { bankId: string; amount: number; transactionSource: string }
    >({
      mutationFn: async (payload) => {
        const res = await fetch(`${API_BASE}/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to calculate pricing");
        return res.json();
      },
    });
  };

  // ────────────────────────────────────────────────
  //  Exchange Rates (latest by bank)
  // ────────────────────────────────────────────────
  const useLatestExchangeRate = (bankId: string) => {
    return useQuery({
      queryKey: ["exchange-rate", "latest", bankId],
      queryFn: async () => {
        const res = await fetch(`${API_BASE}/exchange/latest/${bankId}`);
        if (!res.ok) throw new Error("Failed to fetch latest exchange rate");
        return res.json();
      },
      enabled: !!bankId,
    });
  };

  return {
    // Context
    usePricingContext,
    useAllPricingContexts,
    // Fees
    useFees,
    useCreateFee,

    // Bonuses
    useBonuses,
    useCreateBonus,

    // Calculation
    useCalculatePricing,

    // Exchange
    useLatestExchangeRate,

    // If you later add more endpoints (update/delete fee/bonus, historical rates, etc.)
    // you can place them here in the same style
  };
}
