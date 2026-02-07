import "@/styles/globals.css";
import { Metadata } from "next";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: {
    default: "HeyGen Live Avatar Service",
    template: `%s - HeyGen Live Avatar Service`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ja">
      <head />
      <body className="min-h-screen bg-black text-white font-sans">
        <main className="relative flex flex-col gap-6 h-screen w-screen">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
