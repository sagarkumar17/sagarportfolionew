"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { HeroLocation } from "@/lib/hero-locations";
import { cn } from "@/lib/cn";

type HeroLocationPanelProps = {
  location: HeroLocation | null;
  open: boolean;
  onClose: () => void;
};

/**
 * Left-edge editorial panel for a focused company landmark.
 */
export function HeroLocationPanel({
  location,
  open,
  onClose,
}: HeroLocationPanelProps) {
  return (
    <aside
      data-hero-panel
      aria-hidden={!open}
      className={cn(
        "absolute inset-y-0 left-0 z-[70] flex w-full max-w-[min(100%,28rem)] items-stretch p-3 tablet:p-5",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={location ? `${location.label} details` : "Location details"}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#0c1118]/92 text-white shadow-[0_24px_80px_rgb(0_0_0_/0.55)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "translate-x-0 opacity-100" : "-translate-x-[108%] opacity-0",
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            {location?.logoSrc ? (
              <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={location.logoSrc}
                  alt=""
                  className="h-7 w-7 object-contain"
                />
              </span>
            ) : (
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {location?.initial ?? "SK"}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold tracking-[-0.02em]">
                {location?.label ?? ""}
              </p>
              <p className="truncate text-[12px] text-white/65">
                {location?.years}
                {location?.role ? ` · ${location.role}` : ""}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/12"
            aria-label="Close location panel"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <div>
            <p className="type-label text-white/50">Chapter</p>
            <h2 className="mt-2 text-[1.55rem] font-semibold leading-[1.15] tracking-[-0.035em]">
              {location?.headline}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/75">
              {location?.summary}
            </p>
          </div>

          {location?.metrics && location.metrics.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {location.metrics.map((m) => (
                <div
                  key={`${m.label}-${m.value}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-3"
                >
                  <p className="text-[1.15rem] font-semibold tracking-[-0.03em]">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/55">{m.label}</p>
                </div>
              ))}
            </div>
          ) : null}

          {location?.gallery && location.gallery.length > 0 ? (
            <div className="space-y-2">
              <p className="type-label text-white/50">Visuals</p>
              <div className="grid grid-cols-2 gap-2">
                {location.gallery.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          {location?.href ? (
            location.href.startsWith("http") ? (
              <a
                href={location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-3 text-[13px] font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                View case study →
              </a>
            ) : (
              <Link
                href={location.href}
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-3 text-[13px] font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                View case study →
              </Link>
            )
          ) : null}
        </div>
      </div>
    </aside>
  );
}
