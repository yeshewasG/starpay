"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function ResponsePage() {
  const params = useSearchParams();

  const decision = params.get("decision");
  const reasonCode = params.get("reason_code");
  const message = params.get("message");

  const reference = params.get("reference_number");
  const amount = params.get("auth_amount");
  const currency = params.get("auth_currency");
  const cardType = params.get("card_type_name");

  const isSuccess = decision === "ACCEPT" && reasonCode === "100";

  return (
    <div className="max-w-[1728px] mx-auto px-6 pt-32 pb-20">
      <div className="max-w-xl mx-auto">
        <Card className="rounded-2xl shadow-lg">
          <CardHeader className="flex flex-col items-center text-center gap-2">
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-12 h-12 text-green-600" />
                <CardTitle className="text-2xl text-green-600">
                  Payment Successful
                </CardTitle>
                <Badge className="bg-green-100 text-green-700">Approved</Badge>
              </>
            ) : (
              <>
                {decision === "REJECT" ? (
                  <XCircle className="w-12 h-12 text-red-600" />
                ) : (
                  <AlertTriangle className="w-12 h-12 text-yellow-600" />
                )}
                <CardTitle className="text-2xl text-red-600">
                  Payment Failed
                </CardTitle>
                <Badge variant="destructive">{decision ?? "UNKNOWN"}</Badge>
              </>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            <Separator />

            <div className="space-y-2 text-sm">
              <Info label="Reference Number" value={reference} />
              <Info
                label="Amount"
                value={amount && currency ? `${amount} ${currency}` : "—"}
              />
              <Info label="Card Type" value={cardType} />
              <Info label="Message" value={message} />
              <Info label="Reason Code" value={reasonCode} />
            </div>

            <Separator />

            <Button
              className="w-full rounded-xl"
              onClick={() => (window.location.href = "/")}
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between text-gray-700">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}
