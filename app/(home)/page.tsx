"use client";
import HeroSection from "@/components/HeroSection";
import { useKey } from "../hooks/useAppService";

export default function Home() {
  const { data } = useKey();
  console.info(data);
  return (
    <div className="max-w-[1728px] mx-auto px-6 pt-32 pb-20">
      <HeroSection />
    </div>
  );
}
