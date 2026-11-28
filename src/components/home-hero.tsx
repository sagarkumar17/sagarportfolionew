"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroPins } from "@/components/hero-pins";
import { HeroOpenCursor } from "@/components/hero-open-cursor";
import { HeroLocationPanel } from "@/components/hero-location-panel";
import { useTheme } from "@/components/theme-provider";
import { site } from "@/lib/site";
import type { HeroLocation } from "@/lib/hero-locations";
import {
  HERO,
  prefersReducedMotion,
  waitForPageReady,
} from "@/lib/hero-motion";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

type HomeHeroProps = {
  demo?: boolean;
  className?: string;
  replayKey?: number;
};

/**
 * James-system hero: dual day/night plates, markers, focus zoom + left panel.
 * Artwork is original Sagar + Whisky — not James assets.
 */
export function HomeHero({
  demo = false,
  className,
  replayKey = 0,
}: HomeHeroProps) {
  const { resolved } = useTheme();
  const isNight = resolved === "dark";
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLParagraphElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const focusTweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollProgressRef = useRef(0);
  const focusedRef = useRef(false);

  const [focused, setFocused] = useState<HeroLocation | null>(null);
  const [cursorHot, setCursorHot] = useState(false);

  const applyCamFromScroll = useCallback((p: number) => {
    const cam = camRef.current;
    const typeEl = typeRef.current;
    const cueEl = cueRef.current;
    const root = rootRef.current;
    if (!cam || !typeEl || focusedRef.current) return;
    const pins = Array.from(
      root?.querySelectorAll<HTMLElement>("[data-hero-pin]") ?? [],
    );
    const s = 1 + (HERO.flyScale - 1) * p;
    gsap.set(cam, {
      scale: s,
      xPercent: HERO.flyX * p,
      yPercent: HERO.flyY * p,
      force3D: true,
    });
    gsap.set(typeEl, { opacity: Math.max(0, 1 - p * 1.45), y: -48 * p });
    gsap.set(pins, { opacity: Math.max(0, 1 - p * 1.6), y: -24 * p });
    if (cueEl) gsap.set(cueEl, { opacity: Math.max(0, 1 - p * 2.2) });
    root?.classList.toggle("is-flying", p > 0.06 && p < 0.94);
  }, []);

  const closeFocus = useCallback(() => {
    const cam = camRef.current;
    const typeEl = typeRef.current;
    const cueEl = cueRef.current;
    const root = rootRef.current;
    if (!cam) return;

    focusedRef.current = false;
    setFocused(null);
    focusTweenRef.current?.kill();

    const reduced = prefersReducedMotion();
    const p = scrollProgressRef.current;
    const pins = Array.from(
      root?.querySelectorAll<HTMLElement>("[data-hero-pin]") ?? [],
    );

    if (reduced) {
      applyCamFromScroll(p);
      gsap.set(typeEl, { opacity: Math.max(0, 1 - p * 1.45), y: -48 * p });
      gsap.set(pins, { clearProps: "opacity,y" });
      if (cueEl) gsap.set(cueEl, { opacity: Math.max(0, 1 - p * 2.2) });
      return;
    }

    focusTweenRef.current = gsap.to(cam, {
      scale: 1 + (HERO.flyScale - 1) * p,
      xPercent: HERO.flyX * p,
      yPercent: HERO.flyY * p,
      duration: 0.85,
      ease: "power3.inOut",
      onComplete: () => {
        applyCamFromScroll(p);
        gsap.to(typeEl, {
          opacity: Math.max(0, 1 - p * 1.45),
          y: -48 * p,
          duration: 0.35,
        });
        gsap.to(pins, { opacity: Math.max(0, 1 - p * 1.6), y: 0, duration: 0.35 });
        if (cueEl) {
          gsap.to(cueEl, {
            opacity: Math.max(0, 1 - p * 2.2),
            duration: 0.35,
          });
        }
      },
    });
  }, [applyCamFromScroll]);

  const openFocus = useCallback(
    (location: HeroLocation) => {
      const cam = camRef.current;
      const typeEl = typeRef.current;
      const cueEl = cueRef.current;
      const root = rootRef.current;
      if (!cam || !typeEl) return;

      focusedRef.current = true;
      setFocused(location);
      focusTweenRef.current?.kill();

      const pins = Array.from(
        root?.querySelectorAll<HTMLElement>("[data-hero-pin]") ?? [],
      );
      const reduced = prefersReducedMotion();

      gsap.to(typeEl, { opacity: 0, y: -24, duration: reduced ? 0 : 0.35 });
      if (cueEl) gsap.to(cueEl, { opacity: 0, duration: reduced ? 0 : 0.25 });
      gsap.to(pins, {
        opacity: (i, el) =>
          (el as HTMLElement).dataset.heroPinId === location.id ? 1 : 0.2,
        duration: reduced ? 0 : 0.35,
      });

      focusTweenRef.current = gsap.to(cam, {
        scale: location.focus.scale,
        xPercent: location.focus.x,
        yPercent: location.focus.y,
        duration: reduced ? 0 : 0.95,
        ease: "power3.inOut",
        force3D: true,
      });
    },
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && focusedRef.current) closeFocus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeFocus]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const cam = camRef.current;
    const typeEl = typeRef.current;
    const cueEl = cueRef.current;
    if (!root || !stage || !cam || !typeEl) return;

    const lines = Array.from(
      typeEl.querySelectorAll<HTMLElement>("[data-hero-line]"),
    );
    const accent = typeEl.querySelector<SVGPathElement>("[data-hero-accent]");
    const pins = Array.from(
      root.querySelectorAll<HTMLElement>("[data-hero-pin]"),
    );

    let cancelled = false;
    let enterTl: gsap.core.Timeline | null = null;
    const reduced = prefersReducedMotion();

    const setReady = () => {
      gsap.set(lines, { y: 0, opacity: 1 });
      if (accent) {
        const len = accent.getTotalLength?.() ?? 120;
        gsap.set(accent, { strokeDasharray: len, strokeDashoffset: 0 });
      }
      gsap.set(pins, { opacity: 1, y: 0 });
      if (cueEl) gsap.set(cueEl, { opacity: 1, y: 0 });
      root.dataset.heroState = "ready";
    };

    const runEnter = () => {
      if (cancelled) return;
      if (reduced) {
        setReady();
        return;
      }

      root.dataset.heroState = "animating";
      gsap.set(lines, { y: 40, opacity: 0 });
      if (accent) {
        const len = accent.getTotalLength?.() ?? 120;
        gsap.set(accent, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1,
        });
      }
      gsap.set(pins, { opacity: 0, y: 18 });
      if (cueEl) gsap.set(cueEl, { opacity: 0, y: 10 });

      enterTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (!cancelled) root.dataset.heroState = "ready";
        },
      });

      enterTl.to(lines, {
        y: 0,
        opacity: 1,
        duration: HERO.lineReveal,
        stagger: HERO.lineStagger,
      });

      if (accent) {
        enterTl.to(
          accent,
          { strokeDashoffset: 0, duration: HERO.accentPaint, ease: "power2.out" },
          0.55,
        );
      }

      enterTl.to(
        pins,
        {
          opacity: 1,
          y: 0,
          duration: HERO.pinReveal,
          stagger: HERO.pinStagger,
        },
        0.4,
      );

      if (cueEl) {
        enterTl.to(
          cueEl,
          { opacity: 1, y: 0, duration: HERO.metaReveal },
          0.95,
        );
      }
    };

    const setupFlyIn = () => {
      if (demo || reduced || cancelled) return;

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.75,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          if (!focusedRef.current) applyCamFromScroll(self.progress);
        },
      });
    };

    const start = async () => {
      try {
        if (!demo) await waitForPageReady();
        if (cancelled) return;
        runEnter();
        setupFlyIn();
      } catch (err) {
        console.error("[HomeHero]", err);
        if (!cancelled) setReady();
      }
    };

    void start();

    return () => {
      cancelled = true;
      enterTl?.kill();
      scrollTriggerRef.current?.kill();
      focusTweenRef.current?.kill();
    };
  }, [demo, replayKey, applyCamFromScroll]);

  const plateClass =
    "pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_58%] transition-opacity duration-700 ease-[cubic-bezier(.22,1,.36,1)]";

  return (
    <section
      ref={rootRef}
      id="top"
      data-home-hero
      data-hero-state="enter"
      data-hero-theme={isNight ? "night" : "day"}
      data-hero-focused={focused ? "1" : "0"}
      aria-label="Introduction"
      className={cn(
        "hero-stage relative isolate",
        demo ? "h-full min-h-[480px] overflow-hidden" : "h-[240vh]",
        className,
      )}
    >
      <HeroOpenCursor active={cursorHot && !focused} />

      <div
        ref={stageRef}
        className={cn(
          "relative overflow-hidden bg-[#0b1220]",
          demo ? "h-full min-h-[480px]" : "sticky top-0 h-svh w-full",
        )}
      >
        <div
          ref={camRef}
          className={cn(
            "absolute inset-0 z-10 origin-[50%_58%] will-change-transform",
            focused && "pointer-events-none",
          )}
          data-hero-cam
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero/plate-day.jpg"
            alt=""
            width={3840}
            height={2160}
            decoding="async"
            fetchPriority="high"
            className={cn(plateClass, isNight ? "opacity-0" : "opacity-100")}
            draggable={false}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero/plate-night.jpg"
            alt=""
            width={3840}
            height={2160}
            decoding="async"
            fetchPriority="high"
            className={cn(plateClass, isNight ? "opacity-100" : "opacity-0")}
            draggable={false}
          />

          {/* Subtle env layers — birds / ambient shimmer */}
          <div
            aria-hidden
            className="hero-birds pointer-events-none absolute inset-0 opacity-70"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/12 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15"
          />

          <HeroPins
            activeId={focused?.id ?? null}
            onSelect={openFocus}
            onHoverChange={setCursorHot}
          />
        </div>

        {/* Pins stay interactive via cam until focused; panel sits above */}

        <div
          ref={typeRef}
          className={cn(
            "pointer-events-none relative z-30 flex h-full max-w-[42rem] flex-col justify-start px-5 pt-[max(5rem,11vh)] text-white tablet:px-10 tablet:pt-[max(5.5rem,12vh)]",
            demo && "pt-12",
          )}
        >
          <p
            data-hero-line
            className="mb-4 text-[15px] font-medium tracking-[-0.01em] text-white/92"
          >
            hey, I&apos;m {site.shortName}
          </p>
          <h1 className="font-display text-[clamp(2.85rem,7vw,5.25rem)] font-extrabold leading-[0.96] tracking-[-0.045em] drop-shadow-[0_4px_28px_rgb(0_0_0_/0.45)]">
            <span data-hero-line className="block">
              Designing products
            </span>
            <span data-hero-line className="relative mt-1.5 inline-block">
              people{" "}
              <span className="relative inline-block pb-[0.12em]">
                trust
                <svg
                  className="pointer-events-none absolute inset-x-[-6%] bottom-[0.02em] h-[0.34em] w-[112%]"
                  viewBox="0 0 120 18"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    data-hero-accent
                    d="M2 12 C 28 4, 52 16, 78 8 S 112 14, 118 7"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              .
            </span>
          </h1>
          <p
            data-hero-line
            className="mt-6 max-w-md text-[18px] font-medium leading-snug tracking-[-0.02em] text-white/82"
          >
            Lead product designer. Founder of Plux Studio.
          </p>
          <p className="sr-only">
            {site.name} — Lead product designer and founder of Plux Studio.
            Explore landmarks: Plux, Jio, PayU, Infosys, SADAD. Companion dog
            Whisky appears in the scene.
          </p>
        </div>

        <p
          ref={cueRef}
          className={cn(
            "absolute left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85 backdrop-blur-md",
            demo ? "bottom-4" : "bottom-[5.75rem] tablet:bottom-[6.25rem]",
            focused && "opacity-0",
          )}
        >
          scroll to fly in
        </p>

        <HeroLocationPanel
          location={focused}
          open={!!focused}
          onClose={closeFocus}
        />
      </div>
    </section>
  );
}
