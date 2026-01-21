import { Navbar } from "@/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
