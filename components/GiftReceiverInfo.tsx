"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import { Field } from "./ui/field";
import { useNameCheck } from "@/app/hooks/useAppService";
import { NameCheckPayload } from "@/lib/types";

export default function GiftReceiverDetails() {
  const { mutateAsync: nameCheck } = useNameCheck();

  const selectedBank = useRemittanceStore((s) => s.selectedBank);
  const handleAddAccount = async () => {
    try {
      const payload: NameCheckPayload = {
        institutionId: "231402",
        account_number: "1000123456789",
      };

      await nameCheck({
        data: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gradient-to-b from-[#EDFFEC] via-white to-white min-h-screen md:h-[86vh] pb-20 md:pb-0 overflow-hidden flex flex-col">
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm md:hidden">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ChevronLeft className="h-6 w-6 text-black" />
        </Button>
        <span className="text-xl font-medium text-black">
          Enter Gift Receiver Info
        </span>
        <div className="w-10" /> {/* spacer */}
      </div>

      <ScrollArea className="flex-1 px-3 md:px-6 py-6">
        <div className="max-w-md mx-auto space-y-8 pb-32 md:pb-20">
          {/* Header Illustration */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative w-40 h-40">
              <Image
                src="/images/gift-receiver.webp"
                alt="Gift receiver illustration"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Enter Gift Receiver Info
              </h1>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                Please provide the recipient&apos;s full name, address, and any
                special preferences. This will help us tailor the gift to their
                tastes.
              </p>
            </div>
          </div>

          {/* Form Fields */}
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
          {/* Receiver's Name */}
          <div className="space-y-2">
            <Label
              htmlFor="receiverAccount"
              className="text-gray-700 font-medium"
            >
              Receiver&apos;s Account Number
            </Label>
            <Field orientation="horizontal">
              <Input
                id="receiverAccount"
                placeholder="Enter Account Number"
                className="rounded-2xl py-6 px-4 border-gray-200 focus-visible:ring-primary/30"
              />
              <Button onClick={handleAddAccount}>Search</Button>
            </Field>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#01913a] via-[#03B94C] to-[#03B94C] flex items-center justify-center text-white font-bold text-lg shrink-0">
              YG
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col items-start justify-center">
                <p className="font-medium text-gray-900">
                  YESHIWAS GETAWBEZA TADEME
                </p>
                <span className="text-sm text-gray-500">1000170622506</span>
              </div>
            </div>
          </div>
          {/* Sender Name */}
          <div className="space-y-2">
            <Label htmlFor="senderName" className="text-gray-700 font-medium">
              Sender Name
            </Label>
            <Input
              id="senderName"
              placeholder="Enter your full name"
              className="rounded-2xl py-6 px-4 border-gray-200 focus-visible:ring-primary/30"
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
