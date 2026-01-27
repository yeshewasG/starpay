"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useBankService, Bank } from "@/app/hooks/useBankService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDirtyValues } from "@/lib/getDirtyValues";

interface BankFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Bank | null;
}

export function BankFormSheet({
  open,
  onOpenChange,
  initialData,
}: BankFormSheetProps) {
  const { useCreateBank, useUpdateBank } = useBankService();
  const { mutate: createBank, isPending: isCreating } = useCreateBank();
  const { mutate: updateBank, isPending: isUpdating } = useUpdateBank();

  const isEditMode = !!initialData;

  const form = useForm<Bank>({
    defaultValues: {
      feeType: "percentage",
      feeAmount: 0,
      bonusType: "percentage",
      bonusAmount: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset();
    }
  }, [initialData, form]);

  const onSubmit = () => {
    const { dirtyFields } = form.formState;
    const payload = getDirtyValues(dirtyFields, form.getValues());

    if (isEditMode && initialData?._id) {
      updateBank(
        { id: initialData._id, data: payload },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createBank(form.getValues(), {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-1/2 min-w-[600px] p-6 space-y-6">
        <SheetHeader>
          <SheetTitle>{isEditMode ? "Edit Bank" : "Add Bank"}</SheetTitle>
          <SheetDescription>
            Configure bank details, fees, and exchange rates.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Fees & Bonuses */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="feeType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name="feeAmount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="bonusType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bonus Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name="bonusAmount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bonus Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isEditMode ? "Save Changes" : "Create Bank"}
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
