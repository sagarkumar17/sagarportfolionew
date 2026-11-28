"use client";

import Link from "next/link";
import { HERO_PINS } from "@/lib/hero-pins";
import type { HeroPin } from "@/lib/hero-pins";
import { cn } from "@/lib/cn";

function PinFace({ pin }: { pin: HeroPin }) {
  return (
    <>
      <span
        className={cn(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
          pin.accent
            ? "bg-accent text-accent-foreground"
            : "bg-white/18 text-white ring-1 ring-white/25",
        )}
      >
        {pin.initial ?? pin.label.slice(0, 1)}
      </span>
      <span className="min-w-0 pr-0.5 text-left">
        <span className="block truncate text-[12px] font-semibold leading-tight text-white">
          {pin.label}
        </span>
        <span className="block truncate text-[10px] leading-tight text-white/70">
          {pin.meta}
        </span>
      </span>
    </>
  );
}

function PinBody({ pin }: { pin: HeroPin }) {
  return (
    <span className="hero-pin group/pin flex flex-col items-center">
      <span
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 bg-black/45 py-1.5 pl-1.5 pr-3 shadow-[0_10px_30px_rgb(0_0_0_/0.35)] backdrop-blur-md transition-[opacity,transform,background-color,border-color] duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
          "hover:border-white/45 hover:bg-black/60",
        )}
      >
        <PinFace pin={pin} />
      </span>
      <span
        className="mt-0 h-5 w-px bg-white/55 transition-[height,opacity] duration-300 group-hover/pin:h-8"
        aria-hidden
      />
      <span
        className="relative h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_3px_rgb(220_22_24_/0.55)] transition-[box-shadow] duration-300 group-hover/pin:shadow-[0_0_0_5px_rgb(220_22_24_/0.4)]"
        aria-hidden
      />
    </span>
  );
}

/**
 * Glass pins over the illustrated plate — James-system markers, Sagar content.
 * Hover: translateY + opacity/fill only (no scale).
 */
export function HeroPins({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 z-40", className)}>
      {HERO_PINS.map((pin) => {
        const style = {
          left: `${pin.x}%`,
          top: `${pin.y}%`,
        } as React.CSSProperties;

        const classNamePin =
          "absolute -translate-x-1/2 -translate-y-full cursor-pointer";

        if (!pin.href) {
          return (
            <span
              key={pin.id}
              data-hero-pin
              data-depth={pin.depth}
              style={style}
              className={classNamePin}
            >
              <PinBody pin={pin} />
            </span>
          );
        }

        const external = pin.href.startsWith("http");
        if (external) {
          return (
            <a
              key={pin.id}
              href={pin.href}
              data-hero-pin
              data-depth={pin.depth}
              style={style}
              className={classNamePin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PinBody pin={pin} />
            </a>
          );
        }

        return (
          <Link
            key={pin.id}
            href={pin.href}
            data-hero-pin
            data-depth={pin.depth}
            style={style}
            className={classNamePin}
          >
            <PinBody pin={pin} />
          </Link>
        );
      })}

      <p
        className="pointer-events-none absolute bottom-[20%] right-[10%] hidden rotate-[-8deg] text-[13px] font-medium text-white/80 drop-shadow tablet:block"
        data-hero-hint
      >
        click a place →
      </p>
    </div>
  );
}
