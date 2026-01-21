"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutList,
  Package,
  ShoppingBag,
  HandCoins,
  Gift,
  UserCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import ComingSoonModal from "@/components/ComingSoonModal";
type MenuItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
};

const menuItems: MenuItem[] = [
  {
    title: "Transactions",
    description:
      "View a complete list of all transfer transactions from senders to recipients.",
    icon: <LayoutList className="h-10 w-10" />,
    bgColor: "bg-blue-950/40",
    iconColor: "text-blue-600",
  },
  {
    title: "Products",
    description:
      "Create and manage product packages to be listed and displayed for customers.",
    icon: <Package className="h-10 w-10" />,
    bgColor: "bg-emerald-950/35",
    iconColor: "text-emerald-600",
  },
  {
    title: "Orders",
    description:
      "View, and manage customer orders, including details and status updates.",
    icon: <ShoppingBag className="h-10 w-10" />,
    bgColor: "bg-amber-950/30",
    iconColor: "text-amber-600",
  },
  {
    title: "Donations",
    description:
      "Add and manage all donation lists, and view contributions in one place.",
    icon: <HandCoins className="h-10 w-10" />,
    bgColor: "bg-pink-950/35",
    iconColor: "text-pink-600",
  },
  {
    title: "Bundles",
    description:
      "Manage and oversee customer orders for Bundles, including their details and status updates.",
    icon: <Gift className="h-10 w-10" />,
    bgColor: "bg-cyan-950/35",
    iconColor: "text-cyan-600",
  },
  {
    title: "Gift Profiles",
    description:
      "View the list of created gift profiles and their customers to receive gifts.",
    icon: <UserCircle2 className="h-10 w-10" />,
    bgColor: "bg-indigo-950/35",
    iconColor: "text-indigo-600",
  },
];

export default function AdminDashboard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleClick = (item: MenuItem) => {
    setSelected(item.title);

    if (item.title === "Transactions") {
      router.push("/dashboard/transactions");
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-[#003B31] via-[#006D5B] to-[#2E8B57] text-white rounded-b-[32px] py-5 md:py-6">
        <div className="mt-6 md:mt-8 px-4 md:px-8">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            👋 Welcome to Gift Ethiopia Admin Portal
          </h1>
          <p className="text-sm opacity-80 mt-1 max-w-2xl">
            Streamline your event management, track performance, and keep
            everything running smoothly.
          </p>
        </div>
      </div>
      <div className="min-h-screen p-6 md:p-8 lg:p-10">
        {/* Dashboard Content */}
        <div className="mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold">Action Menus</h1>
            <p className="mt-2 text-slate-400">
              Choose from the listed menus and take action according to your
              preference.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {menuItems.map((item) => (
              <Card
                key={item.title}
                onClick={() => handleClick(item)}
                className={cn(
                  "cursor-pointer overflow-hidden border-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 backdrop-blur-sm",
                  item.bgColor,
                  selected === item.title ? "border-green-500" : "border-white",
                )}
              >
                <CardContent className="flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "mb-6 flex h-24 w-24 items-center justify-center rounded-full",
                      "bg-white shadow-md shadow-black/10",
                    )}
                  >
                    <div className={item.iconColor}>{item.icon}</div>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-300/90">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <ComingSoonModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
