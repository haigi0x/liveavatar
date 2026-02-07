"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-xl text-red-400">Something went wrong</h2>
      <button
        className="bg-violet-600 text-white px-6 py-2 rounded-xl cursor-pointer"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
