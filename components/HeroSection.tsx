"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useExchanges } from "@/app/hooks/useAppService";
import RemittanceSheet from "./RemittanceSheet";

export default function HeroSection() {
  const { data, isLoading } = useExchanges();

  return (
    <section className="flex items-center justify-center p-6 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content – stays mostly the same */}
        <div className="space-y-6">
          <div className="flex gap-2 items-center flex-wrap">
            <Badge
              variant="outline"
              className="bg-white px-3 py-1 border-none shadow-sm text-xs font-bold"
            >
              ✅ 1 USD = {isLoading ? "..." : (data?.cbe?.amount ?? "N/A")} ETB
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

          <div className="pt-12">
            <div className="border-l-4 border-[#008162] pl-4">
              <p className="text-gray-500 font-medium">
                Safe Payments, <br /> Seamless Transfer.
              </p>
            </div>
          </div>
        </div>

        <RemittanceSheet />
      </div>
    </section>
  );
}
