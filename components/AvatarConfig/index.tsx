import React, { useMemo, useState, useRef, useCallback } from "react";
import {
  AvatarQuality,
  ElevenLabsModel,
  STTProvider,
  VoiceEmotion,
  StartAvatarRequest,
  VoiceChatTransport,
} from "@heygen/streaming-avatar";

import { Input } from "../Input";
import { Select } from "../Select";
import { Button } from "../Button";
import { UploadIcon, KnowledgeIcon, LoadingIcon } from "../Icons";

import { Field } from "./Field";

import { AVATARS, STT_LANGUAGE_LIST } from "@/app/lib/constants";

interface AvatarConfigProps {
  onConfigChange: (config: StartAvatarRequest) => void;
  config: StartAvatarRequest;
}

export const AvatarConfig: React.FC<AvatarConfigProps> = ({
  onConfigChange,
  config,
}) => {
  const onChange = <T extends keyof StartAvatarRequest>(
    key: T,
    value: StartAvatarRequest[T],
  ) => {
    onConfigChange({ ...config, [key]: value });
  };

  const [showMore, setShowMore] = useState<boolean>(false);

  // Image upload state
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Knowledge upload state
  const [knowledgeContent, setKnowledgeContent] = useState("");
  const [knowledgeName, setKnowledgeName] = useState("");
  const [isCreatingKnowledge, setIsCreatingKnowledge] = useState(false);
  const [knowledgeStatus, setKnowledgeStatus] = useState<string | null>(null);

  const selectedAvatar = useMemo(() => {
    const avatar = AVATARS.find(
      (avatar) => avatar.avatar_id === config.avatarName,
    );

    if (!avatar) {
      return {
        isCustom: true,
        name: "Custom Avatar ID",
        avatarId: null,
      };
    } else {
      return {
        isCustom: false,
        name: avatar.name,
        avatarId: avatar.avatar_id,
      };
    }
  }, [config.avatarName]);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      setIsUploadingImage(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.data?.asset_id) {
          setUploadedImageUrl(URL.createObjectURL(file));
          onChange("avatarName", data.data.asset_id);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploadingImage(false);
      }
    },
    [onChange],
  );

  const handleCreateKnowledge = useCallback(async () => {
    if (!knowledgeName.trim() || !knowledgeContent.trim()) return;

    setIsCreatingKnowledge(true);
    setKnowledgeStatus(null);
    try {
      const response = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: knowledgeName,
          content: knowledgeContent,
        }),
      });

      const data = await response.json();

      if (data.data?.knowledge_base_id) {
        onChange("knowledgeId", data.data.knowledge_base_id);
        setKnowledgeStatus(
          `Knowledge base created: ${data.data.knowledge_base_id}`,
        );
        setKnowledgeName("");
        setKnowledgeContent("");
      } else {
        setKnowledgeStatus("Failed to create knowledge base");
      }
    } catch (error) {
      console.error("Error creating knowledge:", error);
      setKnowledgeStatus("Error creating knowledge base");
    } finally {
      setIsCreatingKnowledge(false);
    }
  }, [knowledgeName, knowledgeContent, onChange]);

  return (
    <div className="relative flex flex-col gap-4 w-[600px] py-8 max-h-full overflow-y-auto px-4">
      {/* Avatar Image Upload Section */}
      <div className="border border-zinc-600 rounded-xl p-4">
        <h2 className="text-zinc-100 text-sm font-medium mb-3">
          Avatar Image Upload
        </h2>
        <div className="flex flex-row gap-3 items-center">
          {uploadedImageUrl ? (
            <img
              alt="Uploaded avatar"
              className="w-16 h-16 rounded-lg object-cover border border-zinc-500"
              src={uploadedImageUrl}
            />
          ) : (
            <div className="w-16 h-16 rounded-lg border border-dashed border-zinc-500 flex items-center justify-center text-zinc-500">
              <UploadIcon size={24} />
            </div>
          )}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-zinc-400 text-xs">
              Upload an image to use as your custom avatar photo
            </p>
            <input
              ref={imageInputRef}
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleImageUpload}
            />
            <Button
              className="!text-xs !px-3 !py-1"
              disabled={isUploadingImage}
              onClick={() => imageInputRef.current?.click()}
            >
              {isUploadingImage ? (
                <span className="flex items-center gap-1">
                  <LoadingIcon size={14} /> Uploading...
                </span>
              ) : (
                "Select Image"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Avatar Selection */}
      <Field label="Avatar ID">
        <Select
          isSelected={(option) =>
            typeof option === "string"
              ? !!selectedAvatar?.isCustom
              : option.avatar_id === selectedAvatar?.avatarId
          }
          options={[...AVATARS, "CUSTOM"]}
          placeholder="Select Avatar"
          renderOption={(option) => {
            return typeof option === "string"
              ? "Custom Avatar ID"
              : option.name;
          }}
          value={
            selectedAvatar?.isCustom ? "Custom Avatar ID" : selectedAvatar?.name
          }
          onSelect={(option) => {
            if (typeof option === "string") {
              onChange("avatarName", "");
            } else {
              onChange("avatarName", option.avatar_id);
            }
          }}
        />
      </Field>
      {selectedAvatar?.isCustom && (
        <Field label="Custom Avatar ID">
          <Input
            placeholder="Enter custom avatar ID"
            value={config.avatarName}
            onChange={(value) => onChange("avatarName", value)}
          />
        </Field>
      )}

      {/* Knowledge Base Section */}
      <div className="border border-zinc-600 rounded-xl p-4">
        <h2 className="text-zinc-100 text-sm font-medium mb-3 flex items-center gap-2">
          <KnowledgeIcon size={16} />
          Knowledge Base
        </h2>
        <div className="flex flex-col gap-2">
          <Field label="Knowledge Base ID (existing)">
            <Input
              placeholder="Enter existing knowledge base ID"
              value={config.knowledgeId}
              onChange={(value) => onChange("knowledgeId", value)}
            />
          </Field>
          <div className="text-zinc-500 text-xs text-center my-1">
            -- or create new --
          </div>
          <Field label="Knowledge Name">
            <Input
              placeholder="e.g. Product FAQ"
              value={knowledgeName}
              onChange={setKnowledgeName}
            />
          </Field>
          <Field label="Knowledge Content">
            <textarea
              className="w-full text-white text-sm bg-zinc-700 py-2 px-4 rounded-lg outline-none resize-none h-24"
              placeholder="Enter knowledge content here (e.g. company info, FAQ, product details)..."
              value={knowledgeContent}
              onChange={(e) => setKnowledgeContent(e.target.value)}
            />
          </Field>
          <Button
            className="!text-xs"
            disabled={
              isCreatingKnowledge ||
              !knowledgeName.trim() ||
              !knowledgeContent.trim()
            }
            onClick={handleCreateKnowledge}
          >
            {isCreatingKnowledge ? (
              <span className="flex items-center justify-center gap-1">
                <LoadingIcon size={14} /> Creating...
              </span>
            ) : (
              "Create Knowledge Base"
            )}
          </Button>
          {knowledgeStatus && (
            <p className="text-xs text-emerald-400">{knowledgeStatus}</p>
          )}
        </div>
      </div>

      <Field label="Language">
        <Select
          isSelected={(option) => option.value === config.language}
          options={STT_LANGUAGE_LIST}
          renderOption={(option) => option.label}
          value={
            STT_LANGUAGE_LIST.find((option) => option.value === config.language)
              ?.label
          }
          onSelect={(option) => onChange("language", option.value)}
        />
      </Field>

      <Field label="Avatar Quality">
        <Select
          isSelected={(option) => option === config.quality}
          options={Object.values(AvatarQuality)}
          renderOption={(option) => option}
          value={config.quality}
          onSelect={(option) => onChange("quality", option)}
        />
      </Field>

      <Field label="Voice Chat Transport">
        <Select
          isSelected={(option) => option === config.voiceChatTransport}
          options={Object.values(VoiceChatTransport)}
          renderOption={(option) => option}
          value={config.voiceChatTransport}
          onSelect={(option) => onChange("voiceChatTransport", option)}
        />
      </Field>

      {showMore && (
        <>
          <h1 className="text-zinc-100 w-full text-center mt-5">
            Voice Settings
          </h1>
          <Field label="Custom Voice ID">
            <Input
              placeholder="Enter custom voice ID"
              value={config.voice?.voiceId}
              onChange={(value) =>
                onChange("voice", { ...config.voice, voiceId: value })
              }
            />
          </Field>
          <Field label="Emotion">
            <Select
              isSelected={(option) => option === config.voice?.emotion}
              options={Object.values(VoiceEmotion)}
              renderOption={(option) => option}
              value={config.voice?.emotion}
              onSelect={(option) =>
                onChange("voice", { ...config.voice, emotion: option })
              }
            />
          </Field>
          <Field label="ElevenLabs Model">
            <Select
              isSelected={(option) => option === config.voice?.model}
              options={Object.values(ElevenLabsModel)}
              renderOption={(option) => option}
              value={config.voice?.model}
              onSelect={(option) =>
                onChange("voice", { ...config.voice, model: option })
              }
            />
          </Field>
          <h1 className="text-zinc-100 w-full text-center mt-5">
            STT Settings
          </h1>
          <Field label="Provider">
            <Select
              isSelected={(option) => option === config.sttSettings?.provider}
              options={Object.values(STTProvider)}
              renderOption={(option) => option}
              value={config.sttSettings?.provider}
              onSelect={(option) =>
                onChange("sttSettings", {
                  ...config.sttSettings,
                  provider: option,
                })
              }
            />
          </Field>
        </>
      )}
      <button
        className="text-zinc-400 text-sm cursor-pointer w-full text-center bg-transparent"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show less" : "Show more..."}
      </button>
    </div>
  );
};
