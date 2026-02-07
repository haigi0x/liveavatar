"use client";

export default function NavBar() {
  return (
    <div className="flex flex-row justify-between items-center w-full max-w-[900px] mx-auto px-6 py-4">
      <div className="flex flex-row items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2a7 7 0 0 0-7 7v1a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H5V9a7 7 0 0 1 14 0v2h-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3V9a7 7 0 0 0-7-7Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="text-lg font-semibold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
          Live Avatar
        </p>
      </div>
    </div>
  );
}
