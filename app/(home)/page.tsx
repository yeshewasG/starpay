"use client";
import HeroSection from "@/components/HeroSection";
import { useExchanges, useKey } from "../hooks/useAppService";
import { FloatingSheet } from "@/components/FloatingSheet";
import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExchangeCard from "@/components/ExchangeCard";
import RemittanceSheet from "@/components/RemittanceSheet";

export default function Home() {
  const { data: key } = useKey();
  console.info(key);
  const { data, isLoading } = useExchanges();
  const { setStep } = useRemittanceStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleStartRemittance = () => {
    setStep("bank"); // Set next step
    setIsSheetOpen(true); // Open the drawer
  };
  return (
    <div className="max-w-[1728px] mx-auto px-6 pt-32 pb-20">
      <section className="flex items-center justify-center p-6 font-sans min-h-[80vh]">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex gap-2 items-center flex-wrap">
              <Badge
                variant="outline"
                className="bg-white px-3 py-1 border-none shadow-sm text-xs font-bold"
              >
                ✅ 1 USD = {isLoading ? "..." : (data?.cbe?.amount ?? "N/A")}{" "}
                ETB
              </Badge>
              <Badge className="bg-[#008162] hover:bg-[#006b52] px-3 py-1 border-none text-xs">
                Gift:{" "}
                {isLoading ? "..." : (data?.cbe?.bonus?.bonusAmount ?? "N/A")}{" "}
                ETB/1 USD
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.1]">
              Send Money Home <br /> Instantly <br /> Without the Hassle
            </h1>

            <p className="text-gray-600 text-lg max-w-md">
              Transfer money or choose meaningful gifts—all in one place,
              delivered with ease.
            </p>

            <Button
              variant="outline"
              className="rounded-full border-[#008162] text-[#008162] hover:bg-[#008162] hover:text-white px-8 h-12 transition-all"
            >
              Why Gift Ethiopia
            </Button>
          </div>

          {/* Right Column: Exchange Card in Hero */}
          <div className="relative z-10">
            {!isLoading && data && (
              <ExchangeCard data={data} onNext={handleStartRemittance} />
            )}
          </div>
        </div>

        <FloatingSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
      </section>
    </div>
  );
}
