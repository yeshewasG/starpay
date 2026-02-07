import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryClientProvider from "../lib/providers/QueryClientProvider";
import { Suspense } from "react";
import { SpinnerCustom } from "@/components/Loading";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tollosend - Send Money to Ethiopia",
  description: "Fast, secure, and affordable money transfers to Ethiopia",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <ThemeProvider >
          <Suspense fallback={<SpinnerCustom />}>
            <QueryClientProvider>
              {children}
              <Toaster richColors closeButton={true} />
            </QueryClientProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
