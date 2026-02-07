"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";

export default function App() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[900px]">
        <InteractiveAvatar />
      </div>
    </div>
  );
}
