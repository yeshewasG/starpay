"use client";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="flex flex-col lg:flex-row gap-5 w-full max-w-[1600px] h-[90vh]">
        {/* Left Card - Gradient */}
        <div
          className="flex flex-col justify-center items-center p-12 text-center rounded-3xl flex-1 "
          style={{
            background:
              "linear-gradient(180deg, #EDFFEC 0%, #FDFFFD 23.13%, #FFFFFF 50.89%)",
          }}
        >
          {/* Logo */}
          <div className="mb-6">
            <Image src="/logo.webp" alt={`Logo`} width={200} height={200} />
          </div>

          {/* Tagline */}
          <p className="text-gray-700 text-lg max-w-md">
            Explore and purchase a variety of special gifts through{" "}
            <span className="font-bold">STAR Gifts</span>, with easy and secure
            payment options.
          </p>
        </div>

        <div className="flex flex-col p-12 bg-white rounded-3xl flex-1 ">
          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center items-center">
            {children}
          </div>

          {/* Bottom-mounted footer */}
          <div className="pt-6 text-center text-sm text-gray-400">
            <p>Copyright © 2025 STAR Gifts</p>
            <p>Version 1.0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
