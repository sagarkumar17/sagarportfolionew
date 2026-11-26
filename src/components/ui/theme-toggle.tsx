"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemeMode } from "@/components/theme-provider";
import { cn } from "@/lib/cn";

const icons: Record<ThemeMode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const labels: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export function ThemeToggle({ className }: { className?: string }) {
  const { mode, cycle } = useTheme();
  const Icon = icons[mode];

  return (
    <button
      type="button"
      onClick={cycle}
      className={cn(
        "inline-flex h-9 items-center gap-2 px-2 type-label text-text-secondary transition-colors hover:text-text-primary",
        className,
      )}
      aria-label={`Theme: ${labels[mode]}. Click to cycle.`}
      title={`Theme: ${labels[mode]}`}
    >
      <Icon size={16} strokeWidth={1.5} />
      <span className="hidden sm:inline">{labels[mode]}</span>
    </button>
  );
}
