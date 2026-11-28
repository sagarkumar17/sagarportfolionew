"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroPins } from "@/components/hero-pins";
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
 * James-system hero: full-viewport illustrated plate + pins + fly-in.
 * Plate is an original Sagar asset (not James art). Never blank white.
 */
export function HomeHero({
  demo = false,
  className,
  replayKey = 0,
}: HomeHeroProps) {
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
      gsap.set(lines, { y: 36, opacity: 0 });
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

      // CSS sticky stage — scrub camera only (avoids pin height bugs)
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

  return (
    <section
      ref={rootRef}
      id="top"
      data-home-hero
      data-hero-state="enter"
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
          // Opaque fallback so we never flash white if plate lags
          "relative overflow-hidden bg-[#1c1814]",
          demo
            ? "h-full min-h-[480px]"
            : "sticky top-0 h-svh w-full",
        )}
      >
        {/* Camera */}
        <div
          ref={camRef}
          className="absolute inset-0 origin-[50%_58%] will-change-transform"
          data-hero-cam
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero/plate.jpg"
            alt=""
            width={1280}
            height={720}
            decoding="async"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_45%] dark:brightness-[0.72] dark:saturate-[0.92]"
            draggable={false}
          />
          {/* Depth veil — readable type without killing the plate */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25"
          />
          <HeroPins />
        </div>

        {/* Top-left type */}
        <div
          ref={typeRef}
          className={cn(
            // pointer-events-none so pins under/near the type column stay clickable
            "pointer-events-none relative z-30 flex h-full max-w-[38rem] flex-col justify-start px-5 pt-[max(5.5rem,12vh)] text-white tablet:px-10 tablet:pt-[max(6rem,14vh)]",
            demo && "pt-12",
          )}
        >
          <p data-hero-line className="mb-4 text-[15px] font-medium text-white/90">
            hey, I&apos;m {site.shortName}
          </p>
          <h1 className="font-sans text-[clamp(2.55rem,6.2vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.05em] drop-shadow-[0_2px_24px_rgb(0_0_0_/0.35)]">
            <span data-hero-line className="block">
              Designing products
            </span>
            <span data-hero-line className="relative mt-1 inline-block">
              people{" "}
              <span className="relative inline-block pb-[0.06em]">
                trust
                <span
                  data-hero-accent
                  aria-hidden
                  className="absolute inset-x-[-2%] bottom-[0.06em] h-[0.16em] origin-left bg-accent"
                />
              </span>
              .
            </span>
          </h1>
          <p data-hero-line className="mt-5 max-w-md text-[17px] leading-snug text-white/80">
            Lead product designer. Founder of Plux Studio.
          </p>
          <div data-hero-line className="mt-5 flex flex-wrap gap-2">
            {["Bangalore", "Plux", "Product systems"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="sr-only">
            {site.name} — Lead product designer and founder of Plux Studio.
            Explore pinned work on the scene.
          </p>
        </div>

        {/* Scroll cue */}
        <p
          ref={cueRef}
          className={cn(
            "absolute left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85 backdrop-blur-md",
            demo ? "bottom-4" : "bottom-[5.75rem] tablet:bottom-[6.25rem]",
          )}
        >
          scroll to fly in
        </p>
      </div>
    </section>
  );
}
