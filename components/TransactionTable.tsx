"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import type { Transaction } from "@/lib/types";
import { EyeIcon } from "lucide-react";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const isEmpty = transactions?.length === 0;
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40 hover:bg-muted/40">
          <TableHead className="w-[80px]">Trans ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Remitter Name</TableHead>
          <TableHead>Beneficiary Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Credit Account</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="w-[60px]">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isEmpty
          ? Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i} className="h-14 border-b last:border-0">
                {Array.from({ length: 11 }).map((_, j) => (
                  <TableCell key={j} className="text-muted-foreground/70">
                    {j === 0 ? "-" : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))
          : transactions?.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell className="font-medium">{tx.txnId}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.remitterName}</TableCell>
                <TableCell>{tx.beneficiaryName}</TableCell>
                <TableCell className="text-right font-medium">
                  {tx.amount}
                </TableCell>
                <TableCell>{tx.currency}</TableCell>
                <TableCell>{tx.creditAccount}</TableCell>
                <TableCell>{tx.status}</TableCell>
                <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(tx.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <EyeIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
