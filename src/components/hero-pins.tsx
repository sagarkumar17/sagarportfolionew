"use client";

import { HERO_LOCATIONS, type HeroLocation } from "@/lib/hero-locations";
import { cn } from "@/lib/cn";

type HeroPinsProps = {
  className?: string;
  activeId?: string | null;
  onSelect?: (location: HeroLocation) => void;
  onHoverChange?: (hovering: boolean) => void;
};

function MarkerFace({ location }: { location: HeroLocation }) {
  return (
    <>
      <span
        className={cn(
          "relative inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full",
          location.accent ? "bg-accent" : "bg-white",
        )}
      >
        {location.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={location.logoSrc}
            alt=""
            className="h-[18px] w-[18px] object-contain"
            draggable={false}
          />
        ) : (
          <span className="text-[10px] font-semibold text-accent-foreground">
            {location.initial ?? location.label.slice(0, 1)}
          </span>
        )}
      </span>
      <span className="min-w-0 pr-0.5 text-left">
        <span className="block truncate text-[12px] font-semibold leading-tight text-white">
          {location.label}
        </span>
        <span className="block truncate text-[10px] leading-tight text-white/70">
          {location.years}
        </span>
      </span>
    </>
  );
}

function MarkerBody({
  location,
  active,
}: {
  location: HeroLocation;
  active: boolean;
}) {
  return (
    <span className="hero-pin group/pin flex flex-col items-center">
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border bg-black/45 py-1.5 pl-1.5 pr-3 shadow-[0_10px_30px_rgb(0_0_0_/0.35)] backdrop-blur-md transition-[opacity,transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
          active
            ? "border-white/55 bg-black/70 shadow-[0_14px_40px_rgb(0_0_0_/0.5)] -translate-y-1"
            : "border-white/25 group-hover/pin:border-white/45 group-hover/pin:bg-black/60 group-hover/pin:-translate-y-1",
        )}
      >
        <MarkerFace location={location} />
      </span>
      <span
        className={cn(
          "mt-0 w-px bg-white/55 transition-[height,opacity] duration-300",
          active ? "h-8" : "h-5 group-hover/pin:h-8",
        )}
        aria-hidden
      />
      <span
        className={cn(
          "hero-pin-pulse relative h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_3px_rgb(220_22_24_/0.55)]",
          active && "shadow-[0_0_0_5px_rgb(220_22_24_/0.45)]",
        )}
        aria-hidden
      />
    </span>
  );
}

/**
 * Floating company markers — logo + name + years, pulsing pin, Open cursor hotspot.
 */
export function HeroPins({
  className,
  activeId = null,
  onSelect,
  onHoverChange,
}: HeroPinsProps) {
  return (
    <div className={cn("absolute inset-0 z-40", className)}>
      {HERO_LOCATIONS.map((location) => {
        const style = {
          left: `${location.x}%`,
          top: `${location.y}%`,
        } as React.CSSProperties;
        const active = activeId === location.id;

        return (
          <button
            key={location.id}
            type="button"
            data-hero-pin
            data-hero-pin-id={location.id}
            data-depth={location.depth}
            style={style}
            className="absolute -translate-x-1/2 -translate-y-full cursor-none appearance-none border-0 bg-transparent p-0 text-left"
            aria-label={`Open ${location.label}`}
            aria-pressed={active}
            onMouseEnter={() => onHoverChange?.(true)}
            onMouseLeave={() => onHoverChange?.(false)}
            onFocus={() => onHoverChange?.(true)}
            onBlur={() => onHoverChange?.(false)}
            onClick={() => onSelect?.(location)}
          >
            <MarkerBody location={location} active={active} />
          </button>
        );
      })}
    </div>
  );
}
