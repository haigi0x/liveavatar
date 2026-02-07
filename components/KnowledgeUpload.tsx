"use client";

import React, { useCallback, useState } from "react";
import { Button } from "./Button";
import { LoadingIcon } from "./Icons";

interface KnowledgeUploadProps {
  knowledgeId: string | null;
  onKnowledgeCreated: (id: string) => void;
}

export const KnowledgeUpload: React.FC<KnowledgeUploadProps> = ({
  knowledgeId,
  onKnowledgeCreated,
}) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = useCallback(async () => {
    if (!name.trim() || !content.trim()) return;

    setIsCreating(true);
    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });
      const data = await res.json();
      const id =
        data.data?.knowledge_id || data.data?.id || data.knowledge_id || data.id;
      if (id) {
        onKnowledgeCreated(id);
        setName("");
        setContent("");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to create knowledge:", error);
    } finally {
      setIsCreating(false);
    }
  }, [name, content, onKnowledgeCreated]);

  return (
    <div className="w-full">
      <button
        className="w-full text-left text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer flex items-center gap-2 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{isOpen ? "▼" : "▶"}</span>
        <span>Knowledge Base (optional)</span>
        {knowledgeId && (
          <span className="ml-auto text-violet-400 text-[10px]">
            ID: {knowledgeId.slice(0, 12)}...
          </span>
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col gap-2 mt-1 p-3 bg-zinc-800/50 rounded-xl">
          <input
            className="w-full text-white text-xs bg-zinc-700 py-2 px-3 rounded-lg outline-none focus:ring-1 focus:ring-violet-500"
            placeholder="Knowledge name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full text-white text-xs bg-zinc-700 py-2 px-3 rounded-lg outline-none resize-none h-20 focus:ring-1 focus:ring-violet-500"
            placeholder="Enter knowledge content (FAQ, product info, etc.)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            className="!text-xs !py-1.5"
            disabled={isCreating || !name.trim() || !content.trim()}
            onClick={handleCreate}
          >
            {isCreating ? (
              <span className="flex items-center justify-center gap-1">
                <LoadingIcon size={12} /> Creating...
              </span>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
