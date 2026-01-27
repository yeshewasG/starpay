import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import BankList from "./BankList";
import GiftReceiverDetails from "./GiftReceiverInfo";
import ConfirmOrder from "./ConfirmOrder";
import CyberSourceRedirect from "./CyberSourceRedirect";
import {  STEP_META } from "@/lib/constants";
import { ModalProps } from "@/lib/types";
import { toast } from "sonner";
import { Payment, usePaymentService } from "@/app/hooks/usePaymentService";
import { Spinner, SpinnerCustom } from "./Loading";
import { PaymentData, PaymentResult } from "./PaymentResult";

export function FloatingSheet({ open, onOpenChange }: ModalProps) {
  const [cyberSourceData, setCyberSourceData] = useState<PaymentData | null>(
    null,
  ); // <-- fix type

  const { useInitiate } = usePaymentService();
  const { mutateAsync: initiate, isPending: isInitiating } = useInitiate();
  const {
    step,
    setStep,
    usdAmount,
    cybersourcePayload,
    setCybersourcePayload,
    reset,
    selectedBank,
    recipientAccount,
    recipientName,
    senderName,
  } = useRemittanceStore();

  const handleClose = () => {
    onOpenChange(false);
    reset();
    // else if (step !== "amount") setStep("amount");
  };
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "CYBERSOURCE_RESPONSE") {
        try {
          const payload =
            typeof event.data.payload === "string"
              ? JSON.parse(event.data.payload)
              : event.data.payload;
          // console.log("Received CyberSource Data:", payload);
          setCyberSourceData(payload);
          setStep("success"); // Automatically go to success step
        } catch (err) {
          console.error("Failed to parse CyberSource payload", err);
          toast.error("Invalid payment response", { position: "top-center" });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setStep]);
  useEffect(() => {
    if (step === "payment" && !cybersourcePayload) {
      const payload: Payment = {
        amount: usdAmount,
        senderName: senderName,
        receiverName: recipientName,
      };

      const initPayment = async () => {
        try {
          const res = await initiate(payload);
          console.log(res);
          setCybersourcePayload(res);
        } catch (err) {
          console.log(err);
          toast.error("Payment Initialize failed", { position: "top-center" });
        }
      };

      initPayment();
    }
  }, [step, cybersourcePayload, setCybersourcePayload, usdAmount, initiate]);

  const next = () => {
    if (step === "bank" && !selectedBank) {
      toast.error("Please select a bank first!", { position: "top-center" });
      return;
    }

    if (
      step === "recipient" &&
      (!recipientAccount || !recipientName || !senderName)
    ) {
      toast.error("Please enter Receiver details!", { position: "top-center" });
      return;
    }

    const steps: (typeof step)[] = [
      "amount",
      "bank",
      "recipient",
      "confirm",
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
      "confirm",
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
        onOpenChange(o);
        if (!o && step === "success") reset();
      }}
    >
      <SheetContent
        side="right"
        className="top-10 right-4 bottom-10 h-auto rounded-2xl border shadow-lg w-[calc(100%-2rem)] md:w-[400px] lg:w-1/2 sm:max-w-none "
        style={{
          background:
            "linear-gradient(180deg, #EDFFEC 0%, #FDFFFD 23.13%, #FFFFFF 50.89%)",
        }}
      >
        {/* HEADER */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="text-xl font-semibold text-gray-900">
            {STEP_META[step]?.title}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {STEP_META[step]?.description}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === "bank" && <BankList />}
          {step === "recipient" && <GiftReceiverDetails />}
          {step === "confirm" && <ConfirmOrder />}
          {step === "payment" && (
            <div className="h-full flex items-center justify-center">
              {!cybersourcePayload && isInitiating ? (
                <div className="space-y-4 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Redirecting to secure payment…
                  </p>
                </div>
              ) : (
                <CyberSourceRedirect />
              )}
            </div>
          )}

          {step === "success" && cyberSourceData && (
            <PaymentResult data={cyberSourceData} />
          )}
        </div>

        {step !== "success" && step !== "payment" && (
          <div className="p-6 flex gap-3 ">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={step === "bank" ? handleClose : back}
            >
              {step === "bank" ? "Cancel" : "Back"}
            </Button>
            <Button
              className="flex-1 h-12 bg-[#008162] hover:bg-[#006b52]"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        )}
        {step === "success" && (
          <div className="p-6 flex gap-3 ">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
