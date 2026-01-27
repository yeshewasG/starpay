import { Bank, useBankService } from "@/app/hooks/useBankService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Power, Building2, Pen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "../ui/switch";
import Image from "next/image";
interface BankTableProps {
  banks: Bank[];
  onEdit: (data: Bank) => void;
}

export function BankTable({ banks, onEdit }: BankTableProps) {
  const { useDeleteBank, useUpdateBank } = useBankService();
  const { mutate: deleteBank } = useDeleteBank();
  const { mutate: updateBank } = useUpdateBank();

  const handleToggleStatus = (bank: Bank) => {
    if (!bank._id) return;
    updateBank({
      id: bank._id,
      data: { enabled: !bank.enabled },
    });
  };

  if (banks.length === 0) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center text-center">
        <Building2 className="h-10 w-10 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">No banks found</h3>
        <p className="text-sm text-muted-foreground">
          Try adding a new bank to get started.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]">Logo</TableHead>
          <TableHead>Bank</TableHead>
          <TableHead>Institution ID</TableHead>
          <TableHead>SWIFT</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>Bonus</TableHead>
          <TableHead>Buy</TableHead>
          <TableHead>Sell</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {banks.map((bank) => (
          <TableRow key={bank._id || bank.institutionId}>
            {/* Logo */}
            <TableCell>
              <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
                <Image
                  src={bank.logoUrl!}
                  alt={bank.name}
                  width={48}
                  height={48}
                  className="object-contain"
                  priority // Ensures the logo loads immediately as it is above the fold
                />
              </div>
            </TableCell>

            {/* Name */}
            <TableCell className="font-medium">{bank.name}</TableCell>

            {/* Institution ID */}
            <TableCell className="font-mono text-xs">
              {bank.institutionId}
            </TableCell>

            {/* Swift */}
            <TableCell className="font-mono text-xs text-muted-foreground">
              {bank.swiftCode}
            </TableCell>

            {/* Fee */}
            <TableCell className="text-sm">
              {bank.feeAmount}
              {bank.feeType === "percentage" ? "%" : " ETB"}
            </TableCell>

            {/* Bonus */}
            <TableCell className="text-sm">
              {bank.bonusAmount}
              {bank.bonusType === "percentage" ? "%" : " ETB"}
            </TableCell>

            {/* Buying Rate */}
            <TableCell className="text-sm font-semibold">
              {bank.buyingRate || "-"}
            </TableCell>

            {/* Selling Rate */}
            <TableCell className="text-sm font-semibold">
              {bank.sellingRate || "-"}
            </TableCell>

            {/* Status */}
            <TableCell>
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Switch
                  checked={bank.enabled}
                  onCheckedChange={() => handleToggleStatus(bank)}
                />
                <Badge variant={bank.enabled ? "default" : "secondary"}>
                  {bank.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </TableCell>
            {/* Actions */}
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <DropdownMenuItem onClick={() => onEdit(bank)}>
                    <Pen className="mr-2 h-4 w-4" />
                    Edit Bank
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => handleToggleStatus(bank)}>
                    <Power className="mr-2 h-4 w-4" />
                    {bank.enabled ? "Disable Bank" : "Enable Bank"}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => bank._id && deleteBank(bank._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Bank
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
