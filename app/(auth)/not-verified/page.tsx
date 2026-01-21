"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountNotVerifiedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Card className="overflow-hidden rounded-xl shadow-lg w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          <h1 className="text-2xl font-bold">Account Not Verified</h1>
          <p className="text-muted-foreground">
            Your account is not verified yet. Please check your email for an
            update and contact support if needed.
          </p>
          <p className="text-sm text-muted-foreground">
            For assistance, reach out to <strong>support@example.com</strong>.
          </p>

          {/* Return to Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push("/sign-in")}
          >
            <Mail /> Return to Sign In
          </Button>

          {/* Return to Home */}
          <Button
            type="button"
            variant="ghost"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push("/")}
          >
            <Home /> Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
