"use client";

import { useCallback, useState } from "react";

import { ImageUpload } from "@/components/ImageUpload";
import { VoiceSelector } from "@/components/VoiceSelector";
import { KnowledgeUpload } from "@/components/KnowledgeUpload";
import { ConversationView } from "@/components/ConversationView";
import { Button } from "@/components/Button";
import { LoadingIcon } from "@/components/Icons";
import { LANGUAGES, type VoicePreset } from "@/app/lib/constants";

type AppState = "setup" | "connecting" | "conversation";

export default function App() {
  const [appState, setAppState] = useState<AppState>("setup");
  const [imageId, setImageId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<VoicePreset | null>(null);
  const [knowledgeId, setKnowledgeId] = useState<string | null>(null);
  const [language, setLanguage] = useState("ja");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canStart = imageId && selectedVoice;

  const handleStart = useCallback(async () => {
    if (!imageId || !selectedVoice) return;

    setAppState("connecting");
    setError(null);

    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_id: imageId,
          voice_id: selectedVoice.id,
          knowledge_id: knowledgeId || undefined,
          language,
        }),
      });

      const data = await res.json();
      const id =
        data.data?.session_id || data.data?.id || data.session_id || data.id;

      if (id) {
        setSessionId(id);
        setAppState("conversation");
      } else {
        setError("Failed to start session. Please check your API key.");
        setAppState("setup");
      }
    } catch (err) {
      console.error("Session creation failed:", err);
      setError("Connection error. Please try again.");
      setAppState("setup");
    }
  }, [imageId, selectedVoice, knowledgeId, language]);

  const handleEndSession = useCallback(async () => {
    if (sessionId) {
      try {
        await fetch(`/api/session?id=${sessionId}`, { method: "DELETE" });
      } catch (err) {
        console.error("End session failed:", err);
      }
    }
    setSessionId(null);
    setAppState("setup");
  }, [sessionId]);

  if (appState === "conversation" && sessionId) {
    return (
      <div className="w-full flex-1 flex flex-col px-4 py-4">
        <ConversationView
          sessionId={sessionId}
          previewUrl={previewUrl}
          onEndSession={handleEndSession}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-lg flex flex-col items-center gap-8">
        {/* Step 1: Image Upload */}
        <div className="w-full flex flex-col items-center gap-2">
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Step 1
          </h2>
          <p className="text-lg font-semibold text-zinc-100 mb-3">
            Upload your avatar photo
          </p>
          <ImageUpload
            onImageUploaded={setImageId}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
          />
        </div>

        {/* Step 2: Voice Selection */}
        <div className="w-full flex flex-col items-center gap-2">
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Step 2
          </h2>
          <p className="text-lg font-semibold text-zinc-100 mb-1">
            Choose a voice
          </p>

          {/* Language filter */}
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                  language === lang.value
                    ? "bg-violet-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
                onClick={() => setLanguage(lang.value)}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <VoiceSelector
            selectedVoiceId={selectedVoice?.id ?? null}
            onSelectVoice={setSelectedVoice}
            filterLocale={language}
          />
        </div>

        {/* Knowledge (optional) */}
        <div className="w-full">
          <KnowledgeUpload
            knowledgeId={knowledgeId}
            onKnowledgeCreated={setKnowledgeId}
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        {/* Start button */}
        <Button
          className="w-full max-w-xs !py-3 !text-base !rounded-2xl"
          disabled={!canStart || appState === "connecting"}
          onClick={handleStart}
        >
          {appState === "connecting" ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingIcon size={18} /> Connecting...
            </span>
          ) : (
            "Start Conversation"
          )}
        </Button>

        {!canStart && (
          <p className="text-xs text-zinc-500 text-center -mt-4">
            {!imageId && !selectedVoice
              ? "Upload a photo and select a voice to get started"
              : !imageId
                ? "Upload a photo to continue"
                : "Select a voice to continue"}
          </p>
        )}
      </div>
    </div>
  );
}
