"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/components/sound-provider";
import { cn } from "@/lib/cn";

export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex h-9 items-center gap-2 px-2 type-label text-text-secondary transition-colors hover:text-text-primary",
        className,
      )}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      title={enabled ? "Sound on" : "Sound off"}
    >
      {enabled ? (
        <Volume2 size={16} strokeWidth={1.5} />
      ) : (
        <VolumeX size={16} strokeWidth={1.5} />
      )}
      <span className="hidden sm:inline">{enabled ? "Sound" : "Muted"}</span>
    </button>
  );
}
