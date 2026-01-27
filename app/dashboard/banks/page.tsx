"use client";

import { useEffect, useRef, useState } from "react";
import { useBankService, Bank } from "@/app/hooks/useBankService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { BankFormSheet } from "@/components/admin/BankFormSheet";
import { BankTable } from "@/components/admin/BankTable";

export default function BanksPage() {
  const { useBanks } = useBankService();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBanks(10);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const banks = data?.pages.flatMap((page) => page.data) ?? [];

  const handleEdit = (bank: Bank) => {
    setSelectedBank(bank);
    setIsSheetOpen(true);
  };

  /** Infinite scroll observer */
  useEffect(() => {
    if (!hasNextPage || !loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { threshold: 1 },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="mx-auto py-6 px-4 md:px-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Banks</h1>
            <p className="text-muted-foreground">
              Manage financial institutions
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search banks..." className="pl-9" />
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading banks...
          </div>
        ) : (
          <>
            <BankTable banks={banks} onEdit={handleEdit} />

            {/* Infinite loader */}
            <div ref={loaderRef} className="p-4 text-center">
              {isFetchingNextPage && "Loading more banks..."}
              {!hasNextPage && "No more banks"}
            </div>
          </>
        )}
      </div>

      <BankFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        initialData={selectedBank}
      />
    </div>
  );
}
