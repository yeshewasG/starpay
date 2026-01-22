import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import { Field } from "./ui/field";
import { useNameCheck } from "@/app/hooks/useAppService";
import { NameCheckPayload } from "@/lib/types";
import { giftSchema } from "@/lib/validation-schema";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

type GiftFormValues = yup.InferType<typeof giftSchema>;

export default function GiftReceiverDetails() {
  const { mutateAsync: nameCheck, isPending: isCheckingName } = useNameCheck();

  // Store actions/state
  const {
    selectedBank,
    recipientName,
    setRecipientName,
    setRecipientAccount,
    setSenderName,
    recipientAccount,
    senderName,
  } = useRemittanceStore();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<GiftFormValues>({
    resolver: yupResolver(giftSchema),
    defaultValues: {
      recipientAccount: "",
      senderName: "",
    },
  });

  // Step 1: Check the account and fetch name
  const handleVerifyAccount = async () => {
    const accountNum = getValues("recipientAccount");
    if (!accountNum || accountNum.length < 5) return;

    try {
      const payload: NameCheckPayload = {
        institutionId: selectedBank?.etSwitchCode!,
        account_number: accountNum,
      };

      const res = await nameCheck({ data: payload });
      if (res?.accountName) {
        setRecipientAccount(accountNum);
        setRecipientName(res.accountName);
      }
    } catch (error) {
      console.error("Verification failed", error);
    }
  };

  return (
    <div className="space-y-8 pb-10 ">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative w-20 h-20">
          <Image
            src="/images/gift-receiver.webp"
            alt="Gift receiver illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div
        className="
          flex items-center justify-between gap-3 pr-3 w-full
          rounded-2xl cursor-pointer
          shadow-md shadow-gray-50
          bg-white p-2
          border border-primary/30
        "
      >
        {selectedBank && (
          <div className="flex items-center gap-3 p-1">
            <Image
              src={selectedBank?.logo}
              alt={selectedBank?.name}
              width={48}
              height={48}
              className="size-12 rounded-full object-contain border"
            />

            <div className="space-y-0">
              <p className="font-semibold text-[16px] md:text-[18px]">
                {selectedBank?.name}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Account Number Field */}
      <div className="space-y-2">
        <Label htmlFor="recipientAccount">Receiver&apos;s Account Number</Label>
        <Field orientation="horizontal">
          <Input
            value={recipientAccount}
            {...register("recipientAccount", {
              onChange: (e) => setRecipientAccount(e.target.value),
            })}
            placeholder="Enter Account Number"
            className={`rounded-2xl py-6 ${errors.recipientAccount ? "border-red-500" : ""}`}
          />
          <Button
            type="button"
            disabled={isCheckingName}
            onClick={handleVerifyAccount}
          >
            {isCheckingName ? <Loader2 className="animate-spin" /> : "Verify"}
          </Button>
        </Field>
        {errors.recipientAccount && (
          <span className="text-xs text-red-500">
            {errors.recipientAccount.message}
          </span>
        )}
      </div>

      {recipientName && (
        <>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#01913a] via-[#03B94C] to-[#03B94C] flex items-center justify-center text-white font-bold text-lg shrink-0">
              {recipientName?.substring(0, 2).toUpperCase()}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col items-start justify-center">
                <p className="font-medium text-gray-900">{recipientName}</p>
                <span className="text-sm text-gray-500">
                  {recipientAccount}
                </span>
              </div>
            </div>
          </div>
          {/* Sender Name */}
          {/* Sender Name Field */}
          <div className="space-y-2">
            <Label htmlFor="senderName" className="text-gray-700 font-medium">
              Sender Name
            </Label>
            <Input
              id="senderName"
              placeholder="Enter your full name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className={`rounded-2xl py-6 px-4 border-gray-200 focus-visible:ring-primary/30 ${
                errors.senderName ? "border-red-500" : ""
              }`}
            />
            {errors.senderName && (
              <span className="text-xs text-red-500">
                {errors.senderName.message}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
