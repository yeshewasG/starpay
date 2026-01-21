"use client";

import { useForm } from "react-hook-form";
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
import { requestPasswordReset } from "@/lib/config/auth-client";
import { useState } from "react";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ResetSchema } from "@/lib/validation-schema";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type ResetFormValues = yup.InferType<typeof ResetSchema>;

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const form = useForm<ResetFormValues>({
    resolver: yupResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ResetFormValues) => {
    await requestPasswordReset(
      {
        email: data.email,
        redirectTo: "/change-password",
      },
      {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onSuccess() {
          setEmailSent(true);
        },
        onError(ctx) {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <Card className="overflow-hidden p-0 rounded-l-xl rounded-r-none w-full max-w-md">
        <CardContent className="p-6 md:p-8">
          {emailSent ? (
            <div className="flex flex-col items-center text-center gap-4">
              <CheckCircle size={48} className="text-green-500" />
              <h2 className="text-2xl font-semibold">Check your inbox</h2>
              <p className="text-muted-foreground max-w-sm">
                If this email exists in our system, you’ll receive a link to
                reset your password. Please check your inbox.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/sign-in")}
              >
                <Mail className="mr-2" /> Return to sign in
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Reset your password</h1>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Forgot your password? Enter your email to receive a reset
                    link.
                  </p>
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or return to sign in
                  </span>
                </div>
                {/* Back to sign in */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.back()}
                >
                  <Mail className="mr-2" /> Return to sign in
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
