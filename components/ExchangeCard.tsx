"use client";
/* eslint-disable */

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Bank, ExchangesResponse } from "@/lib/types";
import { useRemittanceStore } from "@/lib/stores/remittanceStore"; // adjust path
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { exchangeSchema } from "@/lib/validation-schema";
import * as yup from "yup";

const QUICK_AMOUNTS = ["50", "100", "200", "300", "500", "1000"];

type ExchangeFormValues = yup.InferType<typeof exchangeSchema>;

export default function ExchangeCard({
  data,
  onNext,
}: {
  data: Bank;
  onNext: () => void;
}) {
  const [lastChanged, setLastChanged] = useState<"usd" | "etb" | null>(null);

  const { setUsdAmount } = useRemittanceStore();

  const { register, handleSubmit, setValue, watch } =
    useForm<ExchangeFormValues>({
      resolver: yupResolver(exchangeSchema),
      defaultValues: {
        usdAmount: 0,
        etbAmount: 0,
      },
    });

  const usdAmount = watch("usdAmount");
  const etbAmount = watch("etbAmount");
  useEffect(() => {
    if (lastChanged === "usd" && usdAmount && data?.buyingRate) {
      const etb = Number(usdAmount) * Number(data?.buyingRate);
      setValue("etbAmount", Number(etb.toFixed(2)), {
        shouldValidate: false,
      });
    }
  }, [usdAmount, data?.buyingRate, lastChanged, setValue]);

  useEffect(() => {
    if (lastChanged === "etb" && etbAmount && data?.buyingRate) {
      const usd = Number(etbAmount) / Number(data?.buyingRate);

      const fixedUsd = Number(usd.toFixed(2));

      setValue("usdAmount", fixedUsd, {
        shouldValidate: true,
      });

      setUsdAmount(fixedUsd);

      // ✅ auto-select quick amount if match
      if (QUICK_AMOUNTS.includes(fixedUsd.toString())) {
        setSelectedQuickAmount(fixedUsd.toString());
      } else {
        setSelectedQuickAmount(null);
      }
    }
  }, [etbAmount, data?.buyingRate, lastChanged, setValue, setUsdAmount]);

  // Local state just for UI highlight (syncs with store)
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<string | null>(
    null,
  );

  const handleQuickAmountClick = (amount: string) => {
    setLastChanged("usd");
    setSelectedQuickAmount(amount);
    setValue("usdAmount", Number(amount), { shouldValidate: true });
    setUsdAmount(Number(amount));
  };

  return (
    <div className="w-full p-2">
      <Card className="max-w-lg rounded-3xl shadow-2xl overflow-hidden border p-0">
        <div className="bg-primary-gradient p-5 flex justify-between items-center text-white rounded-t-[40px] w-full">
          <div className="flex items-center gap-2">
            <Image
              src="/images/silver-dollar.webp"
              alt="exchange"
              width={32}
              height={32}
              className="rounded-md"
            />
            <p className="text-white font-bold">
              1 USD = <span className="text-lg">{data?.buyingRate} ETB</span>
            </p>
          </div>

          <Badge
            variant="secondary"
            className="rounded-full bg-white text-green-600 px-3 py-1 text-sm font-medium"
          >
            <span className="font-bold mr-1">+{data?.bonusAmount}</span> ETB / 1
            USD
          </Badge>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* USD Input */}
          <div className="rounded-3xl p-4 bg-white shadow-md md:shadow-xl border-2 border-transparent transition-all duration-200 focus-within:border-primary/60 focus-within:shadow-lg focus-within:shadow-primary/20 focus-within:bg-gradient-to-b focus-within:from-white focus-within:to-slate-50/40 group">
            <Label
              htmlFor="amount-usd"
              className="block text-sm text-gray-500 mb-1 group-focus-within:text-primary"
            >
              Enter Amount
            </Label>

            <div className="relative flex items-center">
              <span className="absolute left-3 text-4xl font-bold text-black pointer-events-none group-focus-within:text-primary/80">
                $
              </span>

              <Input
                className="w-full text-4xl font-bold text-black pl-10 pr-28 h-16 bg-transparent border-none shadow-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                id="amount-usd"
                type="tel"
                placeholder="0.00"
                {...register("usdAmount")}
                onChange={(e) => {
                  setLastChanged("usd");
                  const value = Number(e.target.value);
                  setValue("usdAmount", value, { shouldValidate: true });
                  setUsdAmount(value);

                  if (QUICK_AMOUNTS.includes(e.target.value)) {
                    setSelectedQuickAmount(e.target.value);
                  } else {
                    setSelectedQuickAmount(null);
                  }
                }}
              />

              <div className="absolute right-3 flex items-center gap-1.5 rounded-2xl bg-[#F9F9F9] px-3 py-1.5 min-w-[90px]">
                <Image
                  src="/flags/us.webp"
                  alt="USD"
                  width={20}
                  height={20}
                  className="rounded-full border"
                />
                <span className="text-sm font-semibold text-black">USD</span>
              </div>
            </div>

            <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1 group-focus-within:text-primary/80 transition-colors">
              <InfoIcon className="w-3.5 h-3.5" />
              <span>
                Minimum Amount: <span className="font-bold">$5.00</span>
              </span>
            </div>
          </div>

          {/* ETB Input – still static for now */}
          <div className="rounded-3xl p-4 bg-white shadow-md md:shadow-xl border-2 border-transparent transition-all duration-200 focus-within:border-primary/60 focus-within:shadow-lg focus-within:shadow-primary/20 focus-within:bg-gradient-to-b focus-within:from-white focus-within:to-slate-50/40 group">
            <Label
              htmlFor="amount-etb"
              className="block text-sm text-gray-500 mb-1 group-focus-within:text-primary"
            >
              Enter Amount (ETB)
            </Label>

            <div className="relative flex items-center">
              <Input
                id="amount-etb"
                type="tel"
                placeholder="0.00"
                {...register("etbAmount")}
                onChange={(e) => {
                  setLastChanged("etb");
                  setValue("etbAmount", Number(e.target.value), {
                    shouldValidate: false,
                  });
                }}
                className="w-full text-4xl font-bold text-black  pr-28 h-16 bg-transparent border-none shadow-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
              />

              <div className="absolute right-3 flex items-center gap-1.5 rounded-2xl bg-[#F9F9F9] px-3 py-1.5 min-w-[90px]">
                <Image
                  src="/flags/et.webp"
                  alt="ETB"
                  width={20}
                  height={20}
                  className="rounded-full border"
                />
                <span className="text-sm font-semibold text-black">ETB</span>
              </div>
            </div>

            <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1 group-focus-within:text-primary/80 transition-colors">
              <InfoIcon className="w-3.5 h-3.5" />
              <span>
                Minimum Amount: <span className="font-bold">693.743 ETB</span>
              </span>
            </div>
          </div>

          {/* Total Display – example (you can compute properly) */}
          <div className="bg-gray-50 rounded-2xl p-6 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.12] pointer-events-none select-none"
              style={{
                backgroundImage: "url('/images/gift-amount-bg.png')",
                backgroundSize: "40px",
                backgroundRepeat: "repeat",
              }}
            />
            <div className="relative z-10">
              <p className="text-xs font-bold text-gray-500 uppercase">
                Total (Amount + Gift)
              </p>
              <p className="text-3xl font-black text-[#008162]">
                {usdAmount
                  ? (
                      Number(usdAmount) * Number(data?.buyingRate || 0) +
                      Number(usdAmount) * Number(data?.bonusAmount || 0)
                    ).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>

          {/* Quick Amounts – now selectable */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {QUICK_AMOUNTS.map((amt) => (
              <Button
                key={amt}
                variant="outline"
                className={cn(
                  "min-w-[64px] rounded-full border px-3 py-1 text-sm font-semibold transition",
                  selectedQuickAmount === amt &&
                    "bg-primary-gradient text-primary-foreground ",
                )}
                onClick={() => handleQuickAmountClick(amt)}
              >
                ${amt}
              </Button>
            ))}
          </div>

          <Button
            className="w-full rounded-full py-6 text-lg"
            onClick={handleSubmit(onNext)}
          >
            Send Money
          </Button>
        </CardContent>

        {/* Footer */}
        <div className="text-center text-sm text-primary pb-4">
          <a href="/terms-and-conditions">Terms and Agreements</a>
        </div>
      </Card>
    </div>
  );
}
