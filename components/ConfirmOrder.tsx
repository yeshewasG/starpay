import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftRight, User, ChevronLeft } from "lucide-react";

export default function ConfirmOrder() {
  return (
    <div className="relative h-[96vh] flex flex-col w-full bg-gradient-to-b from-[#EDFFEC] via-white to-white">
      <div className="flex flex-col h-full items-start w-full flex-1">
        {/* Mobile Header with Back Button */}
        <div className="flex items-center justify-between w-full h-14 px-4 md:hidden border-b border-gray-100 bg-white/80 backdrop-blur-sm z-10">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <p className="text-lg font-medium">Confirm</p>
          <div className="w-10" /> {/* spacer */}
        </div>

        <ScrollArea className="flex-1 w-full px-3 md:px-5 py-4 md:py-6 pb-24 md:pb-28">
          {/* Header Illustration + Title */}
          <div className="flex flex-col items-center gap-3 text-center mb-8">
            <div className="relative w-28 h-28 md:w-24 md:h-24">
              <Image
                src="/images/curled-document.png"
                alt="Order confirmation document"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Confirm Order Information
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Review the detail of cash gift and confirm order
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-7">
            {/* Gift Info */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 ml-1">
                Gift Info
              </h3>
              <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  {/* Sent */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-14 h-14 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                      <Image
                        src="/images/dollar-cash.png"
                        alt="Cash amount"
                        width={56}
                        height={56}
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">$300.00</p>
                      <p className="text-sm text-gray-500">Sent</p>
                    </div>
                  </div>

                  <ArrowLeftRight className="h-6 w-6 text-gray-400 flex-shrink-0" />

                  {/* Received */}
                  <div className="text-right flex-1">
                    <p className="text-xl font-bold text-gray-900">
                      ETB 45,482.58
                    </p>
                    <p className="text-sm text-gray-500">Received</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Receiver Info */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 mb-3 ml-1">
                Receiver&apos;s Info
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#01913a] via-[#03B94C] to-[#03B94C] flex items-center justify-center text-white font-bold text-lg shrink-0">
                  YG
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">
                      YESHIWAS GETAWBEZA TADEME
                    </p>
                    <span className="text-sm text-gray-500">Bank Name</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">1000170622506</p>
                    <p className="font-medium text-gray-900">
                      Commercial Bank of Ethiopia
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">Receiver Phone</p>
                    <p className="font-medium text-gray-800 mt-0.5">
                      +251987654333
                    </p>
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
                    <span className="font-medium text-gray-900">jao deo</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Sender Contact</p>
                  <p className="font-medium text-gray-800">+971567888878</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
