import "@/styles/globals.css";
import { Metadata } from "next";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: {
    default: "Live Avatar",
    template: `%s - Live Avatar`,
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
      <body className="min-h-screen bg-zinc-950 text-white font-sans">
        <main className="relative flex flex-col h-screen w-screen">
          <NavBar />
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
