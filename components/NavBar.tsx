"use client";

import Link from "next/link";

import { HeyGenLogo } from "./Icons";

export default function NavBar() {
  return (
    <div className="flex flex-row justify-between items-center w-full max-w-[1000px] m-auto p-6">
      <div className="flex flex-row items-center gap-4">
        <Link href="https://app.heygen.com/" target="_blank">
          <HeyGenLogo />
        </Link>
        <div className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text">
          <p className="text-xl font-semibold text-transparent">
            Live Avatar Service
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-6 text-sm">
        <Link
          className="text-zinc-400 hover:text-white transition-colors"
          href="https://docs.heygen.com/docs/streaming-avatar-sdk"
          target="_blank"
        >
          SDK Docs
        </Link>
        <Link
          className="text-zinc-400 hover:text-white transition-colors"
          href="https://docs.heygen.com/docs/streaming-api"
          target="_blank"
        >
          API Docs
        </Link>
      </div>
    </div>
  );
}
