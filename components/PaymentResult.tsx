// components/PaymentResult.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

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
  if (data.decision === "ACCEPT") {
    return <PaymentSuccess data={data} />;
  } else {
    return <PaymentFailed data={data} />;
  }
}

function PaymentSuccess({ data }: { data: PaymentData }) {
  return (
    <Card className="border-green-500">
      <CardHeader className="flex items-center gap-2">
        <CheckCircle className="text-green-500 w-6 h-6" />
        <CardTitle>Payment Successful</CardTitle>
      </CardHeader>
      <CardDescription>{data.message}</CardDescription>
      <CardContent className="grid gap-2">
        <div>
          <span className="font-semibold">Amount:</span> {data.auth_amount}{" "}
          {data.req_currency}
        </div>
        <div>
          <span className="font-semibold">Authorization Code:</span>{" "}
          {data.auth_code}
        </div>
        <div>
          <span className="font-semibold">Transaction Ref No:</span>{" "}
          {data.auth_trans_ref_no}
        </div>
        <div>
          <span className="font-semibold">Card:</span> {data.card_type_name}{" "}
          ending {data.req_card_number.slice(-4)}
        </div>
        <div>
          <span className="font-semibold">Customer:</span>{" "}
          {data.req_bill_to_forename} {data.req_bill_to_surname} (
          {data.req_bill_to_email})
        </div>
        <div>
          <span className="font-semibold">Address:</span>{" "}
          {data.req_bill_to_address_line1}, {data.req_bill_to_address_city},{" "}
          {data.req_bill_to_address_state}{" "}
          {data.req_bill_to_address_postal_code}
        </div>
        <Badge className="bg-green-100 text-green-800">
          Decision: {data.decision_rmsg}
        </Badge>
      </CardContent>
    </Card>
  );
}

function PaymentFailed({ data }: { data: PaymentData }) {
  return (
    <Card className="border-red-500">
      <CardHeader className="flex items-center gap-2">
        <XCircle className="text-red-500 w-6 h-6" />
        <CardTitle>Payment Failed</CardTitle>
      </CardHeader>
      <CardDescription>{data.message}</CardDescription>
      <CardContent className="grid gap-2">
        <div>
          <span className="font-semibold">Reason Code:</span> {data.reason_code}
        </div>
        <div>
          <span className="font-semibold">Message:</span> {data.decision_rmsg}
        </div>
        <Badge className="bg-red-100 text-red-800">
          Decision: {data.decision}
        </Badge>
      </CardContent>
    </Card>
  );
}
