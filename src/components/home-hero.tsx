"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroPins } from "@/components/hero-pins";
import { useTheme } from "@/components/theme-provider";
import { site } from "@/lib/site";
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
 * James-system hero: dual day/night illustrated plates + pins + fly-in.
 * Artwork is original Sagar (character + dog + landmarks) — not James assets.
 * Theme swaps real plates (no brightness filter).
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
    const accent = typeEl.querySelector<HTMLElement>("[data-hero-accent]");
    const pins = Array.from(
      root.querySelectorAll<HTMLElement>("[data-hero-pin]"),
    );
    const hint = root.querySelector<HTMLElement>("[data-hero-hint]");

    let cancelled = false;
    let enterTl: gsap.core.Timeline | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    const reduced = prefersReducedMotion();

    const setReady = () => {
      gsap.set(lines, { y: 0, opacity: 1, clearProps: "filter" });
      if (accent) gsap.set(accent, { scaleX: 1, opacity: 1 });
      gsap.set(pins, { opacity: 1, y: 0 });
      if (hint) gsap.set(hint, { opacity: 0.85 });
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
        gsap.set(accent, {
          scaleX: 0,
          opacity: 1,
          transformOrigin: "left center",
        });
      }
      gsap.set(pins, { opacity: 0, y: 18 });
      if (hint) gsap.set(hint, { opacity: 0 });
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
          { scaleX: 1, duration: HERO.accentPaint, ease: "power2.out" },
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

      if (hint) enterTl.to(hint, { opacity: 0.85, duration: 0.5 }, 1.05);
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

      scrollTrigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.75,
        onUpdate: (self) => {
          const p = self.progress;
          const s = 1 + (HERO.flyScale - 1) * p;
          gsap.set(cam, {
            scale: s,
            xPercent: HERO.flyX * p,
            yPercent: HERO.flyY * p,
            force3D: true,
          });
          gsap.set(typeEl, {
            opacity: Math.max(0, 1 - p * 1.45),
            y: -48 * p,
          });
          gsap.set(pins, {
            opacity: Math.max(0, 1 - p * 1.6),
            y: -24 * p,
          });
          if (cueEl) gsap.set(cueEl, { opacity: Math.max(0, 1 - p * 2.2) });
          if (hint) gsap.set(hint, { opacity: Math.max(0, 0.85 - p * 1.5) });
          root.classList.toggle("is-flying", p > 0.06 && p < 0.94);
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
      scrollTrigger?.kill();
    };
  }, [demo, replayKey]);

  /* Cover framing: bias slightly low so landmarks + character stay in-viewport */
  const plateClass =
    "pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_62%] transition-opacity duration-700 ease-[cubic-bezier(.22,1,.36,1)]";

  return (
    <section
      ref={rootRef}
      id="top"
      data-home-hero
      data-hero-state="enter"
      data-hero-theme={isNight ? "night" : "day"}
      aria-label="Introduction"
      className={cn(
        "hero-stage relative isolate",
        demo ? "h-full min-h-[480px] overflow-hidden" : "h-[240vh]",
        className,
      )}
    >
      <div
        ref={stageRef}
        className={cn(
          "relative overflow-hidden bg-[#0b1220]",
          demo ? "h-full min-h-[480px]" : "sticky top-0 h-svh w-full",
        )}
      >
        <div
          ref={camRef}
          className="absolute inset-0 origin-[50%_62%] will-change-transform"
          data-hero-cam
        >
          {/* Dual plates — real day/night artwork crossfade */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero/plate-day.jpg"
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
            className={cn(plateClass, isNight ? "opacity-0" : "opacity-100")}
            draggable={false}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero/plate-night.jpg"
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
            className={cn(plateClass, isNight ? "opacity-100" : "opacity-0")}
            draggable={false}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20"
          />
          <HeroPins />
        </div>

        {/* Heavy rounded display type */}
        <div
          ref={typeRef}
          className={cn(
            "pointer-events-none relative z-30 flex h-full max-w-[40rem] flex-col justify-start px-5 pt-[max(5rem,11vh)] text-white tablet:px-10 tablet:pt-[max(5.5rem,12vh)]",
            demo && "pt-12",
          )}
        >
          <p
            data-hero-line
            className="mb-4 text-[15px] font-medium tracking-[-0.01em] text-white/92"
          >
            hey, I&apos;m {site.shortName}
          </p>
          <h1
            className="font-sans text-[clamp(2.75rem,6.8vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] drop-shadow-[0_4px_28px_rgb(0_0_0_/0.45)]"
            style={{ fontVariationSettings: '"wght" 650' }}
          >
            <span data-hero-line className="block">
              Designing products
            </span>
            <span data-hero-line className="relative mt-1.5 inline-block">
              people{" "}
              <span className="relative inline-block pb-[0.08em]">
                trust
                <span
                  data-hero-accent
                  aria-hidden
                  className="absolute inset-x-[-4%] bottom-[0.04em] h-[0.22em] origin-left rounded-sm bg-accent"
                />
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
            Explore pinned landmarks on the scene: Plux, Jio, PayU, Infosys,
            SADAD.
          </p>
        </div>

        <p
          ref={cueRef}
          className={cn(
            "absolute left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85 backdrop-blur-md",
            demo ? "bottom-4" : "bottom-[5.75rem] tablet:bottom-[6.25rem]",
          )}
        >
          scroll to fly in
        </p>
      </div>
    </section>
  );
}
