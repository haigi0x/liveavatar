"use client";

import React, { useCallback, useRef, useState } from "react";
import { ImageIcon, LoadingIcon } from "./Icons";

interface ImageUploadProps {
  onImageUploaded: (imageId: string) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  previewUrl,
  setPreviewUrl,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;

      setPreviewUrl(URL.createObjectURL(file));
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.data?.image_id || data.data?.id || data.image_id || data.id) {
          onImageUploaded(
            data.data?.image_id || data.data?.id || data.image_id || data.id,
          );
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [onImageUploaded, setPreviewUrl],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div
      className={`relative w-full aspect-square max-w-[280px] rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
        isDragging
          ? "border-violet-400 bg-violet-500/10"
          : previewUrl
            ? "border-transparent"
            : "border-zinc-600 hover:border-zinc-400 bg-zinc-800/50"
      }`}
      onClick={() => inputRef.current?.click()}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <>
          <img
            alt="Avatar preview"
            className="w-full h-full object-cover"
            src={previewUrl}
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <LoadingIcon size={32} className="text-white" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p className="text-xs text-zinc-300 text-center">
              Tap to change
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3 p-6">
          <div className="w-16 h-16 rounded-full bg-zinc-700/50 flex items-center justify-center">
            <ImageIcon size={28} className="text-zinc-400" />
          </div>
          <div className="text-center">
            <p className="text-sm text-zinc-300 font-medium">
              Upload a photo
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Drag & drop or tap to select
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        accept="image/*"
        className="hidden"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
};
