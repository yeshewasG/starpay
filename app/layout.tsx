import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryClientProvider from "../lib/providers/QueryClientProvider";
import { Suspense } from "react";
import { SpinnerCustom } from "@/components/Loading";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Tolosend",
  description:
    "Tolosend Ethiopian is a platform for sending money to Ethiopia quickly and safely.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
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
