export interface VoicePreset {
  id: string;
  name: string;
  gender: "male" | "female";
  locale: string;
  preview?: string;
}

export const VOICE_PRESETS: VoicePreset[] = [
  { id: "voice_jp_female_01", name: "Sakura", gender: "female", locale: "ja" },
  { id: "voice_jp_female_02", name: "Yuki", gender: "female", locale: "ja" },
  { id: "voice_jp_male_01", name: "Haruto", gender: "male", locale: "ja" },
  { id: "voice_jp_male_02", name: "Ren", gender: "male", locale: "ja" },
  { id: "voice_en_female_01", name: "Emma", gender: "female", locale: "en" },
  { id: "voice_en_female_02", name: "Olivia", gender: "female", locale: "en" },
  { id: "voice_en_male_01", name: "James", gender: "male", locale: "en" },
  { id: "voice_en_male_02", name: "William", gender: "male", locale: "en" },
  { id: "voice_zh_female_01", name: "Mei", gender: "female", locale: "zh" },
  { id: "voice_zh_male_01", name: "Wei", gender: "male", locale: "zh" },
  { id: "voice_ko_female_01", name: "Soo-yeon", gender: "female", locale: "ko" },
  { id: "voice_ko_male_01", name: "Min-jun", gender: "male", locale: "ko" },
];

export const LANGUAGES = [
  { label: "Japanese", value: "ja" },
  { label: "English", value: "en" },
  { label: "Chinese", value: "zh" },
  { label: "Korean", value: "ko" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Italian", value: "it" },
];
