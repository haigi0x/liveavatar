import React, { useEffect, useRef } from "react";

import { useMessageHistory, MessageSender } from "../logic";

export const MessageHistory: React.FC = () => {
  const { messages } = useMessageHistory();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || messages.length === 0) return;

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[600px] overflow-y-auto flex flex-col gap-2 px-2 py-2 text-white self-center max-h-[200px]"
    >
      {messages.length === 0 && (
        <p className="text-zinc-500 text-sm text-center py-4">
          No messages yet. Start chatting!
        </p>
      )}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col gap-1 max-w-[350px] ${
            message.sender === MessageSender.CLIENT
              ? "self-end items-end"
              : "self-start items-start"
          }`}
        >
          <p className="text-xs text-zinc-400">
            {message.sender === MessageSender.AVATAR ? "Avatar" : "You"}
          </p>
          <p
            className={`text-sm rounded-lg px-3 py-2 ${
              message.sender === MessageSender.CLIENT
                ? "bg-[#7559FF] bg-opacity-20"
                : "bg-zinc-700"
            }`}
          >
            {message.content}
          </p>
        </div>
      ))}
    </div>
  );
};
