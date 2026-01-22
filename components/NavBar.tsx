"use client";
import Image from "next/image";
import { ChevronRight, LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-full px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Image
              src="/logo.webp" // Path to your logo in the public folder
              alt="Gift Ethiopia Logo"
              width={48}
              height={48}
              className="object-contain"
              priority // Ensures the logo loads immediately as it is above the fold
            />
          </div>
        </div>

        {/* Action Icons & Cart */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full  border-[#004D3D] text-[#004D3D] hover:bg-gray-50 h-12 w-12"
            onClick={() => router.push("/sign-in")}
          >
            <LogInIcon />
          </Button>

          {/* Help Icon */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full  border-[#004D3D] text-[#004D3D] hover:bg-gray-50 h-12 w-12"
          >
            <Image
              src="/images/contact-support.webp"
              alt="Contact Support"
              width={33}
              height={33}
              className="object-fit"
              priority
            />
          </Button>

          {/* Tracking Icon */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-2 border-[#004D3D] text-[#004D3D] hover:bg-gray-50 h-12 w-12"
          >
            <Image
              src="/images/order-truck.webp"
              alt="Contact Support"
              width={33}
              height={33}
              className="object-fit"
              priority
            />
          </Button>

          {/* Cart Button */}
          <button className="flex items-center gap-4 bg-primary-gradient text-white rounded-full pl-3 pr-2 py-2 shadow-lg hover:opacity-90 transition-all">
            <div className="bg-white rounded-full p-2 text-[#004D3D]">
              <Image
                src="/images/solar_cart-bold.webp"
                alt="Contact Support"
                width={33}
                height={33}
                className="object-fit"
                priority
              />
            </div>
            <div className="flex flex-col items-start pr-4">
              <span className="text-sm font-bold leading-none">View Cart</span>
              <span className="text-[10px] opacity-80 uppercase tracking-wider">
                Cart Detail
              </span>
            </div>
            <div className="bg-black/20 rounded-full p-1">
              <ChevronRight size={18} />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
