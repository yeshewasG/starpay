import { apiBaseUrl } from "@/lib/constants";
import { NameCheckPayload } from "@/lib/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

const API_BASE = `${apiBaseUrl}/api/banks`;

export interface Bank {
  _id?: string;
  name: string;
  institutionId: string;
  swiftCode: string;
  logoUrl?: string;
  enabled: boolean;

  bonusType: "percentage" | "fixed";
  bonusAmount: number;

  feeType: "percentage" | "fixed";
  feeAmount: number;

  buyingRate: number;
  sellingRate: number;
}

export function useBankService() {
  const queryClient = useQueryClient();

  const useBanks = (limit = 10) => {
    return useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["banks"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(`${API_BASE}?page=${pageParam}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch banks");
        return res.json();
      },
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.meta;
        return page < totalPages ? page + 1 : undefined;
      },
    });
  };
  // 2. CREATE BANK (POST)
  const useCreateBank = () => {
    return useMutation({
      mutationFn: async (newBank: Bank) => {
        const response = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBank),
        });
        return response.json();
      },
      onSuccess: () => {
        // Refetch the bank list so the UI updates immediately
        queryClient.invalidateQueries({ queryKey: ["banks"] });
      },
    });
  };

  // 3. UPDATE BANK (PUT)
  const useUpdateBank = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: Partial<Bank> }) => {
        const response = await fetch(`${API_BASE}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["banks"] });
      },
    });
  };

  // 4. DELETE BANK (DELETE)
  const useDeleteBank = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["banks"] });
      },
    });
  };
  // 2. CREATE BANK (POST)
  const useNameCheck = () => {
    return useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: NameCheckPayload;
      }) => {
        const response = await fetch(`${API_BASE}/account/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        return response.json();
      },
      onSuccess: () => {
        // Refetch the bank list so the UI updates immediately
        queryClient.invalidateQueries({ queryKey: ["banks"] });
      },
    });
  };

  return {
    useBanks,
    useCreateBank,
    useUpdateBank,
    useDeleteBank,
    useNameCheck,
  };
}
