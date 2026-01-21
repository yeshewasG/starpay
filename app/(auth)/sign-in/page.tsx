"use client";
import Image from "next/image";
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
import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/config/auth-client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/lib/validation-schema";

type LoginFormValues = yup.InferType<typeof LoginSchema>;

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await signIn.email(data, {
      onRequest: () => setLoading(true),
      onResponse: () => setLoading(false),
      onError: async (ctx) => {
        toast.error(ctx.error.message);
      },
      onSuccess: async () => {
        router.push("/dashboard");
      },
    });
  };

  return (
    <Card className="overflow-hidden rounded-xl shadow-sm w-full max-w-md">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/logo.webp" // Path to your logo in the public folder
                alt="Gift Ethiopia Logo"
                width={48}
                height={48}
                className="object-contain"
                priority // Ensures the logo loads immediately as it is above the fold
              />
              <h2 className="text-2xl font-bold">Sign in to your Account</h2>
              <p className="text-muted-foreground">
                Please enter your phone number and Password to Login to your
                account.
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="/reset-password"
                      className="text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
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
                "Sign In"
              )}
            </Button>

            {/* Divider */}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Don&apos;t have an account?
              </span>
            </div>

            {/* Sign Up */}
            <Button
              type="button"
              variant="outline"
              className="w-full flex gap-2"
              onClick={() => router.push("/sign-up")}
            >
              <Mail className="h-4 w-4" /> Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
