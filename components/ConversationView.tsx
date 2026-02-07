"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { SendIcon, MicIcon, MicOffIcon, CloseIcon, LoadingIcon } from "./Icons";

interface Message {
  id: string;
  role: "user" | "avatar";
  text: string;
}

interface ConversationViewProps {
  sessionId: string;
  previewUrl: string | null;
  onEndSession: () => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  sessionId,
  previewUrl,
  onEndSession,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isSending) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, text }),
      });
      const data = await res.json();

      if (data.data?.response || data.response) {
        const avatarMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "avatar",
          text: data.data?.response || data.response,
        };
        setMessages((prev) => [...prev, avatarMsg]);
      }
    } catch (error) {
      console.error("Speak failed:", error);
    } finally {
      setIsSending(false);
    }
  }, [input, isSending, sessionId]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col h-full">
      {/* Avatar display area */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 mb-4">
        {previewUrl ? (
          <img
            alt="Avatar"
            className="w-full h-full object-cover"
            src={previewUrl}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600">
            Connecting...
          </div>
        )}

        {/* End session button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          onClick={onEndSession}
        >
          <CloseIcon size={16} className="text-white" />
        </button>

        {/* Mic button overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isMicActive
                ? "bg-violet-500 shadow-lg shadow-violet-500/40 animate-pulse"
                : "bg-zinc-700/80 hover:bg-zinc-600/80"
            }`}
            onClick={() => setIsMicActive(!isMicActive)}
          >
            {isMicActive ? (
              <MicIcon size={22} className="text-white" />
            ) : (
              <MicOffIcon size={22} className="text-zinc-300" />
            )}
          </button>
        </div>
      </div>

      {/* Message history */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[200px] px-1">
        {messages.length === 0 && (
          <p className="text-zinc-600 text-sm text-center py-8">
            Start a conversation!
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-violet-600/20 text-violet-100 rounded-br-md"
                  : "bg-zinc-800 text-zinc-200 rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Text input */}
      <div className="flex gap-2 items-end">
        <input
          className="flex-1 bg-zinc-800 text-white text-sm py-3 px-4 rounded-xl outline-none focus:ring-1 focus:ring-violet-500 placeholder-zinc-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-11 h-11 bg-violet-600 hover:bg-violet-500 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer flex-shrink-0"
          disabled={!input.trim() || isSending}
          onClick={handleSend}
        >
          {isSending ? (
            <LoadingIcon size={18} className="text-white" />
          ) : (
            <SendIcon size={18} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};
