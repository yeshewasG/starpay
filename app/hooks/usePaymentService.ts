import { apiBaseUrl } from "@/lib/constants";
import { NameCheckPayload } from "@/lib/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

const API_BASE = `${apiBaseUrl}/api/payments`;

export interface Payment {
  amount: number;
  senderName: string;
  receiverName: string;
}

export function usePaymentService() {
  const queryClient = useQueryClient();

  const useInitiate = () => {
    return useMutation({
      mutationFn: async (data: Payment) => {
        const response = await fetch(`${API_BASE}/initiate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        return response.json();
      },
      onSuccess: () => {
        // Refetch the bank list so the UI updates immediately
        queryClient.invalidateQueries({ queryKey: ["payments"] });
      },
    });
  };

  return {
    useInitiate,
  };
}
