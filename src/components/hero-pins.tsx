"use client";

import Link from "next/link";
import { HERO_PINS, type HeroPin } from "@/lib/hero-pins";
import { cn } from "@/lib/cn";

function PinFace({ pin }: { pin: HeroPin }) {
  return (
    <>
      <span
        className={cn(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
          pin.accent
            ? "bg-accent text-accent-foreground"
            : "bg-white/20 text-white",
        )}
      >
        {pin.initial ?? pin.label.slice(0, 1)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-semibold leading-tight text-white">
          {pin.label}
        </span>
        <span className="block truncate text-[10px] leading-tight text-white/65">
          {pin.meta}
        </span>
      </span>
    </>
  );
}

/**
 * Glass pins over the hero plate — James-system interaction, Sagar content.
 * Hover: opacity / translate only (Maël — no scale).
 */
export function HeroPins({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 z-20", className)} aria-hidden={false}>
      {HERO_PINS.map((pin) => {
        const body = (
          <span className="hero-pin group/pin absolute flex flex-col items-center">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 py-1.5 pl-1.5 pr-3 shadow-[0_8px_30px_rgb(0_0_0_/0.25)] backdrop-blur-md transition-[opacity,transform,background-color,border-color] duration-300 ease-out",
                "hover:border-white/35 hover:bg-black/55",
              )}
            >
              <PinFace pin={pin} />
            </span>
            <span
              className="mt-0 h-5 w-px bg-white/45 transition-[height,opacity] duration-300 group-hover/pin:h-7 group-hover/pin:opacity-100"
              aria-hidden
            />
            <span
              className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_3px_rgb(255_255_255_/0.2)]"
              aria-hidden
            />
          </span>
        );

        const style = {
          left: `${pin.x}%`,
          top: `${pin.y}%`,
          transform: "translate(-50%, -100%) translate3d(var(--px,0px), var(--py,0px), 0)",
        } as React.CSSProperties;

        if (!pin.href) {
          return (
            <span
              key={pin.id}
              data-hero-pin
              data-depth={pin.depth}
              style={style}
              className="absolute"
            >
              {body}
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
              className="absolute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {body}
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
            className="absolute"
          >
            {body}
          </Link>
        );
      })}

      <p
        className="pointer-events-none absolute bottom-[18%] right-[12%] hidden rotate-[-8deg] text-[13px] font-medium text-white/70 tablet:block"
        data-hero-hint
      >
        click a place →
      </p>
    </div>
  );
}
