"use client";

import React from "react";
import { VOICE_PRESETS, type VoicePreset } from "@/app/lib/constants";
import { CheckIcon, UserIcon } from "./Icons";

interface VoiceSelectorProps {
  selectedVoiceId: string | null;
  onSelectVoice: (voice: VoicePreset) => void;
  filterLocale?: string;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoiceId,
  onSelectVoice,
  filterLocale,
}) => {
  const voices = filterLocale
    ? VOICE_PRESETS.filter((v) => v.locale === filterLocale)
    : VOICE_PRESETS;

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {voices.map((voice) => {
          const isSelected = selectedVoiceId === voice.id;

          return (
            <button
              key={voice.id}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? "bg-violet-600/20 border-2 border-violet-500 shadow-lg shadow-violet-500/10"
                  : "bg-zinc-800/60 border-2 border-transparent hover:bg-zinc-700/60 hover:border-zinc-600"
              }`}
              onClick={() => onSelectVoice(voice)}
            >
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
                  <CheckIcon size={12} className="text-white" />
                </div>
              )}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isSelected ? "bg-violet-500/30" : "bg-zinc-700"
                }`}
              >
                <UserIcon
                  size={18}
                  className={isSelected ? "text-violet-300" : "text-zinc-400"}
                />
              </div>

              <div className="text-center">
                <p
                  className={`text-xs font-medium ${isSelected ? "text-violet-200" : "text-zinc-300"}`}
                >
                  {voice.name}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  {voice.gender === "female" ? "Female" : "Male"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
