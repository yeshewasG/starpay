import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Bank, BanksResponse } from "@/lib/types";
import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import { cn } from "@/lib/utils";
import { useBankService } from "@/app/hooks/useBankService";

export default function BankList() {
  const { useBanks } = useBankService();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBanks(100);
  const banks: Bank[] = data?.pages?.[0]?.data;

  const selectedBank = useRemittanceStore((s) => s.selectedBank);
  const setSelectedBank = useRemittanceStore((s) => s.setSelectedBank);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 pb-10">
      {banks?.map((bank) => {
        const isSelected = selectedBank?._id === bank._id;

        return (
          <Card
            key={bank._id}
            onClick={() => setSelectedBank(bank)}
            className={cn(
              "relative cursor-pointer transition-all duration-200 border-2",
              "flex flex-col items-center justify-center aspect-square md:aspect-auto md:h-36",
              isSelected
                ? "border-[#008162] shadow-sm"
                : "border-gray-100 hover:border-gray-200 shadow-none bg-white",
            )}
          >
            <CardContent className="p-2 flex flex-col items-center justify-center text-center w-full">
              {/* Smaller logos for mobile to fit 3-col layout */}
              <div className="relative w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2">
                <Image
                  src={bank.logoUrl}
                  alt={`${bank.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 32px, 56px"
                />
              </div>

              {/* Smaller text for mobile */}
              <p
                className={cn(
                  "text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-tight line-clamp-2 leading-none px-0.5",
                  isSelected ? "text-[#008162]" : "text-gray-500",
                )}
              >
                {bank.name}
              </p>
            </CardContent>

            {/* Subtle Checkmark for selection */}
            {isSelected && (
              <div className="absolute top-1 right-1">
                <div className="bg-[#008162] rounded-full p-0.5 shadow-sm">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
