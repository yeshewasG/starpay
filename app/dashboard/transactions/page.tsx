"use client";

import { useTransactions } from "@/app/hooks/useAppService";
import { TransactionTable } from "@/components/TransactionTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Download, Filter, Search } from "lucide-react";
import Link from "next/link";

export default function TransactionsPage() {
  const { data: transactions } = useTransactions();

  return (
    <div className=" mx-auto py-6 px-4 md:px-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">
              View and manage all money transfer transactions
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by reference, sender name, customer name..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <TransactionTable transactions={transactions!} />
      </div>

      {/* Pagination (mock) */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 0 of 0 transactions
        </p>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" disabled className="h-8 w-8">
            <span className="sr-only">First page</span>
            {"<<"}
          </Button>
          <Button variant="outline" size="icon" disabled className="h-8 w-8">
            {"<"}
          </Button>

          <Button variant="outline" size="sm" className="h-8 w-8">
            1
          </Button>

          <Button variant="outline" size="icon" disabled className="h-8 w-8">
            {">"}
          </Button>
          <Button variant="outline" size="icon" disabled className="h-8 w-8">
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  );
}
