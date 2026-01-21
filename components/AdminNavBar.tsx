"use client";

import Image from "next/image";
import { Bell, ChevronDown, Menu, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { signOut, useSession } from "@/lib/config/auth-client";

export function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#003B31] via-[#006D5B] to-[#2E8B57] text-white">
      <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-5 md:py-6">
        <div className="flex items-center gap-4 max-w-xl">
          <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
            <Image
              src="/white-logo.webp" // Path to your logo in the public folder
              alt="Gift Ethiopia Logo"
              width={48}
              height={48}
              className="object-contain"
              priority // Ensures the logo loads immediately as it is above the fold
            />
          </div>

          {/* Hide description on small screens */}
          <p className="hidden md:block text-sm opacity-90 leading-relaxed">
            Gift Ethiopia helps you easily showcase, manage, and sell your
            products while offering seamless and secure payment options.
          </p>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* PROFILE DROPDOWN (Desktop) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hidden md:flex items-center gap-2 text-white hover:bg-white/10 rounded-full px-2"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    <User2 className="text-emerald-600" />
                  </AvatarFallback>
                </Avatar>

                <div className="text-left">
                  <p className="text-sm font-semibold leading-tight">
                    {session?.user?.name}
                  </p>
                  <p className="text-[11px] opacity-70">Gift Ethiopia Admin</p>
                </div>

                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => signOut()}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <User2 className="text-emerald-600" />
                  </Avatar>
                  <div>
                    <p className="font-semibold">{session?.user?.name}</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                </div>

                <Button variant="outline">Profile</Button>
                <Button variant="outline">Settings</Button>
                <Button variant="destructive">Logout</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator />
    </nav>
  );
}
