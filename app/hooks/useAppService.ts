import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBanks,
  getExchanges,
  getKey,
  getTransactions,
  nameCheck,
} from "../api/apiService";
import type {
  BanksResponse,
  ExchangesResponse,
  NameCheckPayload,
  Transaction,
} from "@/lib/types";

export const useKey = () => {
  return useQuery({
    queryKey: ["key"],
    queryFn: async () => {
      return await getKey();
    },
  });
};
export const useBanks = () => {
  return useQuery<BanksResponse, Error>({
    queryKey: ["banks"],
    queryFn: async () => {
      return await getBanks();
    },
  });
};

export const useExchanges = () => {
  return useQuery<ExchangesResponse, Error>({
    queryKey: ["exchanges"],
    queryFn: getExchanges,
  });
};

export const useNameCheck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: NameCheckPayload }) => {
      return await nameCheck(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-name"] });
    },
  });
};

export const useTransactions = () => {
  return useQuery<Transaction[], Error>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};
