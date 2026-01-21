"use client";
import { redirect } from "next/navigation";
import React from "react";
import { useSession } from "@/lib/config/auth-client";
import { Navbar } from "@/components/AdminNavBar";
import { SpinnerCustom } from "@/components/Loading";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <SpinnerCustom />;
  }

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
