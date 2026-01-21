"use client";
import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useBanks, useExchanges } from "@/app/hooks/useAppService";
import { useEffect, useState } from "react";
import ExchangeCard from "./ExchangeCard";
import BankList from "./BankList";
import GiftReceiverDetails from "./GiftReceiverInfo";
import ConfirmOrder from "./ConfirmOrder";
import CyberSourceRedirect from "./CyberSourceRedirect";
import { paymentBaseUrl } from "@/lib/constants";

export default function RemittanceSheet() {
  const { data } = useExchanges();
  const { data: banks } = useBanks();

  const {
    step,
    setStep,
    usdAmount,
    cybersourcePayload,
    setCybersourcePayload,
    reset,
  } = useRemittanceStore();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    // Optionally reset only after success
    if (step === "bank") setStep("amount");
    if (step === "success") reset();
  };
  useEffect(() => {
    if (step === "payment" && !cybersourcePayload) {
      const initPayment = async () => {
        const res = await fetch(paymentBaseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: "12",
            currency: "USD",
            referenceNumber: `ORDER_${Date.now()}`,
          }),
        });

        if (!res.ok) throw new Error("Payment init failed");

        const data = await res.json();
        setCybersourcePayload(data);
      };

      initPayment();
    }
  }, [step, cybersourcePayload, setCybersourcePayload]);

  const next = () => {
    const steps: (typeof step)[] = [
      "amount",
      "bank",
      "recipient",
      "payment",
      "success",
    ];
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const back = () => {
    const steps: (typeof step)[] = [
      "amount",
      "bank",
      "recipient",
      "payment",
      "success",
    ];
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <ExchangeCard
        data={data!}
        onNext={() => {
          setOpen(true);
          next();
        }}
      />
      {step !== "amount" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      )}

      <SheetContent
        side="right"
        className=" w-1/2 min-w-1/3  p-0 flex flex-col right-10 inset-y-10 top-5 bottom-5 rounded-[2rem] overflow-hidden border-none shadow-2xl"
        style={{
          background:
            "linear-gradient(180deg, #EDFFEC 0%, #FDFFFD 23.13%, #FFFFFF 50.89%)",
        }}
      >
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === "bank" && <BankList data={banks!} />}
          {step === "recipient" && <GiftReceiverDetails />}
          {step === "confirm" && <ConfirmOrder />}
          {step === "payment" && (
            <div className="h-full flex items-center justify-center">
              {!cybersourcePayload ? (
                <div className="space-y-4 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Redirecting to secure payment…
                  </p>
                </div>
              ) : (
                <CyberSourceRedirect payload={cybersourcePayload} />
              )}
            </div>
          )}

          {step === "success" && (
            <div className="text-center space-y-6 py-10">
              <div className="text-7xl">🎉</div>
              <h2 className="text-3xl font-bold text-green-800">
                Transfer Sent!
              </h2>
              <p className="text-gray-700">
                Your {usdAmount ? `$${usdAmount}` : "transfer"} has been
                successfully sent.
              </p>

              <Button
                className="w-full bg-[#008162] hover:bg-[#006b52]"
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Send Another Transfer
              </Button>
            </div>
          )}
        </div>

        {step !== "success" && step !== "payment" && (
          <div className="p-6 flex gap-3">
            {step !== "amount" && (
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={step === "bank" ? handleClose : back}
              >
                Back
              </Button>
            )}
            <Button
              className="flex-1 h-12 bg-[#008162] hover:bg-[#006b52] text-white"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        )}
        {step === "success" && (
          <div className="p-6 flex gap-3">
            <Button
              className="flex-1 h-12 bg-[#008162] hover:bg-[#006b52] text-white"
              onClick={handleClose}
            >
              Done
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
