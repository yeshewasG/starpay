import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryClientProvider from "./providers";
import { Suspense } from "react";
import { SpinnerCustom } from "@/components/Loading";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gift Ethiopia",
  description:
    "Gift Ethiopian is a platform for sending money, gift cards, and different items to Ethiopia quickly and safely.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <Suspense fallback={<SpinnerCustom />}>
          <QueryClientProvider>
            {children}
            <Toaster richColors closeButton={true} />
          </QueryClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
