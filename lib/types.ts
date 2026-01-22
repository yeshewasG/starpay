export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export interface BankBonus {
  _id: string;
  bank: Partial<Bank>;
  bonusType: "FIXED" | "PERCENTAGE"; // Using a union type for better strictness
  bonusAmount: number;
  isDeleted: boolean;
  createdAt: string; // Or Date if you plan to parse it
  updatedAt: string;
  __v: number;
  id: string;
}

export interface BankDetails {
  bankId: string;
  name: string;
  logo: string;
  amount: string; // Based on your JSON, this is a string "151.6086"
  bankCode: string;
  bonus: BankBonus;
}

export interface ExchangesResponse {
  cbe: BankDetails;
  // Using a record/index signature since 'cbe' looks like a dynamic key
}

export interface Bank {
  _id: string;
  name: string;
  orgCode: string;
  type: "bank";
  etSwitchCode: string;
  address: string;
  email: string;
  phoneNumber: string;
  logo: string;
  users: string[];
  isDeleted: boolean;
  enabled: boolean;
  createdAt: string; // ISO date string
  updatedAt?: string; // some entries use updatedAt
  lastModified?: string; // some entries use lastModified
  __v: number;

  card?: string | null;
  exchangeRate?: number | null;
  bic_code?: string;
}

export interface BanksResponse {
  data: Bank[];
}

export interface NameCheckPayload {
  institutionId: string;
  account_number: string;
}

export interface ExternalResponse {
  Status: string;
  Message: string;
  TxnId: string;
  Amount: string;
  Beneficiary: string;
}

export interface Transaction {
  _id: string;
  txnId: string;
  type: string; // e.g., "CBE"
  amount: number;
  currency: string; // e.g., "ETB"
  creditAccount: string;
  remitterName: string;
  beneficiaryName: string;
  status: string; // e.g., "Success"
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  externalResponse: ExternalResponse;
}

export interface TransactionsResponse {
  data: Transaction[];
}
