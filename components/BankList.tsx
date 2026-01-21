"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BanksResponse } from "@/lib/types";
import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import clsx from "clsx";

export default function BankList({ data }: { data: BanksResponse }) {
  const selectedBank = useRemittanceStore((s) => s.selectedBank);
  const setSelectedBank = useRemittanceStore((s) => s.setSelectedBank);

  return (
    <div className="bg-gradient-to-b from-[#EDFFEC] via-white to-white min-h-screen md:min-h-[90dvh] w-full flex flex-col">
      {/* Header */}
      <div className="pb-4 pt-5 px-5">
        <h1 className="text-2xl font-bold tracking-tight">Bank Lists</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select from the listed banks and send cash gift.
        </p>
      </div>

      {/* Scrollable Bank Grid */}
      <ScrollArea className="flex-1 px-4 md:px-6 pb-24">
        <div className="grid grid-cols-3 gap-3 md:gap-4 pb-6">
          {data.data.map((bank) => {
            const isSelected = selectedBank?._id === bank._id;

            return (
              <Card
                key={bank._id}
                onClick={() => {
                  setSelectedBank(bank);
                }}
                className={clsx(
                  "overflow-hidden transition-all duration-200 cursor-pointer border",
                  "hover:shadow-md hover:scale-[1.02]",
                  isSelected
                    ? "border-primary ring-2 ring-primary/30 bg-primary/5"
                    : "border-border/60",
                )}
              >
                <CardContent className="p-4 md:p-5 flex flex-col items-center justify-center text-center h-full">
                  <div className="relative w-14 h-14 md:w-16 md:h-16 mb-3">
                    <Image
                      src={bank.logo}
                      alt={`${bank.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 56px, 64px"
                    />
                  </div>

                  <p
                    className={clsx(
                      "text-xs md:text-sm font-medium leading-tight line-clamp-2",
                      isSelected && "text-primary",
                    )}
                  >
                    {bank.name}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
