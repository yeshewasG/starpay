"use client";
import { Navbar } from "@/components/NavBar";
import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    useRemittanceStore.getState().reset();
  }, []);
  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #EDFFEC 0%, #FDFFFD 23.13%, #FFFFFF 50.89%)",
      }}
    >
      <Navbar />
      {children}
    </main>
  );
}
