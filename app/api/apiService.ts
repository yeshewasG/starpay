import type {
  BanksResponse,
  ExchangesResponse,
  NameCheckPayload,
  Transaction,
} from "@/lib/types";

export const getKey = async () => {
  try {
    const res = await fetch("/api/getPublicKey");
    if (!res.ok) throw new Error("Failed to fetch banks");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getBanks = async (): Promise<BanksResponse> => {
  const res = await fetch("/api/stargift/banks/fetch-all");
  if (!res.ok) throw new Error("Failed to fetch banks");
  const data = await res.json();
  return data;
};

export const getExchanges = async (): Promise<ExchangesResponse> => {
  const res = await fetch("/api/stargift/transactions/fetch-exchange-rates");
  if (!res.ok) {
    throw new Error("Failed to fetch exchanges");
  }
  const data = await res.json();
  return data?.data;
};

export const nameCheck = async (payload: NameCheckPayload) => {
  const res = await fetch("/api/yeshilab/remit/account-name", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch account lookup");
  }

  const json = await res.json();
  return json?.data;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch("/api/yeshilab/remit");

  if (!res.ok) {
    throw new Error("Failed to fetch transactions lookup");
  }

  const json = await res.json();
  return json?.data;
};
