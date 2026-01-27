"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export type PaymentData = {
  decision: string;
  auth_amount: string;
  req_currency: string;
  auth_code: string;
  auth_trans_ref_no: string;
  req_bill_to_forename: string;
  req_bill_to_surname: string;
  req_bill_to_email: string;
  req_bill_to_address_line1: string;
  req_bill_to_address_city: string;
  req_bill_to_address_state: string;
  req_bill_to_address_postal_code: string;
  card_type_name: string;
  req_card_number: string;
  message: string;
  reason_code: string;
  decision_rmsg: string;
};

type PaymentResultProps = {
  data: PaymentData;
};

export function PaymentResult({ data }: PaymentResultProps) {
  const isSuccess = data.decision === "ACCEPT";

  return (
    <div className="min-h-screen bg-[#F8FDF9] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Success/Fail Icon */}
        <div className="mb-6">
          {isSuccess ? (
            <div className="bg-[#66CC66] rounded-full p-4 shadow-lg">
              <CheckCircle2 className="w-16 h-16 text-white stroke-[1.5px]" />
            </div>
          ) : (
            <div className="bg-red-500 rounded-full p-4 shadow-lg">
              <XCircle className="w-16 h-16 text-white stroke-[1.5px]" />
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {isSuccess ? "Cash Gift Sent Successfully!" : "Transaction Failed"}
        </h1>
        <p className="text-gray-500 text-center text-sm px-6 mb-8 leading-relaxed">
          {isSuccess
            ? "Your gift has been sent successfully. The recipient will receive it shortly. Thank you for using StarGift."
            : data.message}
        </p>

        {/* Amount Card */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-50 mb-4 flex items-center gap-4">
          <div className="bg-gray-100 p-2 rounded-lg">
            <span className="text-xl">💵</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold">${data.auth_amount}</span>
              <span className="text-xs text-gray-400 font-medium">.00</span>
            </div>
            <p className="text-xs text-gray-400">Cash Gift</p>
          </div>
        </div>

        {/* Transaction Detail Card */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <h3 className="text-gray-800 font-bold mb-4">Transaction Detail</h3>

          <div className="space-y-3">
            <DetailRow
              label="Sender Name"
              value={`${data.req_bill_to_forename} ${data.req_bill_to_surname}`}
            />
            <DetailRow label="Card Type" value={data.card_type_name} />
            <DetailRow
              label="Account (Last 4)"
              value={`****${data.req_card_number.slice(-4)}`}
            />
            <DetailRow label="Reference" value={data.auth_trans_ref_no} />
            <DetailRow label="Auth Code" value={data.auth_code} />
          </div>

          <hr className="my-6 border-gray-100" />

          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-gray-900 text-lg">
              ${data.auth_amount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}:</span>
      <span className="text-gray-800 font-medium text-right ml-4">{value}</span>
    </div>
  );
}
