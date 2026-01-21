"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CircleX, Home, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { ChangePasswordSchema } from "@/lib/validation-schema";
import { resetPassword } from "@/lib/config/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type ChangeFormValues = yup.InferType<typeof ChangePasswordSchema>;

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ChangeFormValues>({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ChangeFormValues) => {
    await resetPassword({
      newPassword: values.newPassword,
      token: token || "",
      fetchOptions: {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onError(ctx) {
          toast.error(ctx.error.message);
        },
        onSuccess() {
          toast.success("Password updated successfully!");
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <Card className="overflow-hidden rounded-xl shadow-lg w-full max-w-md">
      <CardContent className="p-8">
        {!token ? (
          <div className="flex flex-col items-center text-center space-y-4">
            <CircleX size={48} className="text-red-500" />
            <h2 className="text-2xl font-semibold">Invalid Link</h2>
            <p className="text-muted-foreground">
              Missing or invalid token. Please check your email link.
            </p>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => router.push("/sign-in")}
            >
              <Mail /> Return to Sign In
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Change Password</h1>
                <p className="text-muted-foreground">
                  Enter your new password below
                </p>
              </div>

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Update Password"
                )}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or return to home
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full flex gap-2 justify-center"
                onClick={() => router.push("/")}
              >
                <Home /> Home
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
