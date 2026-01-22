import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftRight, User, ChevronLeft } from "lucide-react";
import { useRemittanceStore } from "@/lib/stores/remittanceStore";

export default function ConfirmOrder() {
  // 1. Pull data from your Zustand store
  const {
    usdAmount,
    recipientName,
    recipientAccount,
    recipientPhone,
    senderName,
    selectedBank,
    setStep,
  } = useRemittanceStore();

  // Helper to get initials (e.g., "Yeshiwas Getawbeza" -> "YG")
  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Static example for exchange rate (Replace with your actual logic/state)
  const exchangeRate = 151.61;
  const receivedEtb = usdAmount
    ? (parseFloat(usdAmount) * exchangeRate).toLocaleString()
    : "0.00";

  return (
    <ScrollArea className="flex-1 w-full px-3 md:px-5 py-4 md:py-6 pb-24 md:pb-28">
      <div className="space-y-7">
        <div>
          <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-14 h-14 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                  <Image
                    src="/images/silver-dollar.webp"
                    alt="Cash amount"
                    width={56}
                    height={56}
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    ${usdAmount || "0.00"}
                  </p>
                  <p className="text-sm text-gray-500">Sent</p>
                </div>
              </div>

              <ArrowLeftRight className="h-6 w-6 text-gray-400 flex-shrink-0" />

              <div className="text-right flex-1">
                <p className="text-xl font-bold text-gray-900">
                  ETB {receivedEtb}
                </p>
                <p className="text-sm text-gray-500">Received</p>
              </div>
            </div>
          </div>
        </div>

        {/* Receiver Info */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3 ml-1">
            Receiver&apos;s Info
          </h3>
          <div className="flex items-center justify-between gap-3 3 w-full rounded-2xl cursor-pointer bg-white  ">
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
        </div>

        {/* Sender Info */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3 ml-1">
            Sender Information
          </h3>

          <div className="space-y-3">
            <div className="bg-white rounded-3xl p-4 border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Sender Name</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center">
                  <User className="h-5 w-5 text-[#52BC48]" />
                </div>
                <span className="font-medium text-gray-900 capitalize">
                  {senderName || "Guest"}
                </span>
              </div>
            </div>

            {/* Optional: Add Sender Contact if you have it in store */}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
