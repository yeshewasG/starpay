"use client";
import HeroSection from "@/components/landing/sections/hero";
import Features from "@/components/landing/sections/features";
import HowItWorks from "@/components/landing/sections/how-it-works";
import TrustSection from "@/components/landing/sections/trust";
import DownloadApp from "@/components/landing/sections/download";
import Footer from "@/components/landing/sections/footer";
import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import { useEffect } from "react";
import Image from "next/image";
import FeaturesAnywhere from "@/components/landing/sections/featuresAnywhere";

export default function HomePage() {
  useEffect(() => {
    useRemittanceStore.getState().reset();
  }, []);
  return (
    <main className="flex flex-col">
      <section className="container grid grid-cols-1 lg:grid-cols-2 gap-12 ">
        <div className="relative w-30 h-30 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Users"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>
      <HeroSection />
      <Features />
      <FeaturesAnywhere />
      <HowItWorks />
      <TrustSection />
      <DownloadApp />
      <Footer />
    </main>
  );
}
