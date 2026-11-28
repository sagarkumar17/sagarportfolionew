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
 * James-system hero fidelity: full-bleed plate + top-left type + pins + fly-in.
 * Sagar branding only — original plate, Plux accent, his project pins.
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
      gsap.set(lines, { y: 0, opacity: 1 });
      if (accent) gsap.set(accent, { scaleX: 1, opacity: 1 });
      gsap.set(pins, { opacity: 1, y: 0 });
      if (hint) gsap.set(hint, { opacity: 0.7 });
      if (cueEl) gsap.set(cueEl, { opacity: 1 });
      root.dataset.heroState = "ready";
    };

    const runEnter = () => {
      if (cancelled) return;
      if (reduced) {
        setReady();
        return;
      }

      root.dataset.heroState = "animating";
      gsap.set(lines, { y: 28, opacity: 0 });
      if (accent) gsap.set(accent, { scaleX: 0, opacity: 1, transformOrigin: "left center" });
      gsap.set(pins, { opacity: 0, y: 16 });
      if (hint) gsap.set(hint, { opacity: 0 });
      if (cueEl) gsap.set(cueEl, { opacity: 0, y: 8 });

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
        0.45,
      );

      if (hint) {
        enterTl.to(hint, { opacity: 0.7, duration: 0.5 }, 1.1);
      }
      if (cueEl) {
        enterTl.to(cueEl, { opacity: 1, y: 0, duration: HERO.metaReveal }, 1.0);
      }
    };

    const setupFlyIn = () => {
      if (demo || reduced || cancelled) return;

      scrollTrigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: HERO.scrollEnd,
        scrub: 0.7,
        pin: stage,
        anticipatePin: 1,
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
            opacity: Math.max(0, 1 - p * 1.35),
            y: -40 * p,
          });
          gsap.set(pins, {
            opacity: Math.max(0, 1 - p * 1.5),
            y: -20 * p,
          });
          if (cueEl) gsap.set(cueEl, { opacity: Math.max(0, 1 - p * 2) });
          if (hint) gsap.set(hint, { opacity: Math.max(0, 0.7 - p * 1.4) });
          root.classList.toggle("is-flying", p > 0.08 && p < 0.92);
        },
      });
    };

    const start = async () => {
      if (!demo) await waitForPageReady();
      if (cancelled) return;
      runEnter();
      setupFlyIn();
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
        "hero-stage relative",
        demo ? "h-full min-h-[480px] overflow-hidden rounded-sm" : "min-h-[220vh]",
        className,
      )}
    >
      <div
        ref={stageRef}
        className={cn(
          "relative flex h-svh w-full flex-col overflow-hidden",
          demo && "h-full min-h-[480px]",
        )}
      >
        {/* Camera / plate */}
        <div
          ref={camRef}
          className="absolute inset-0 origin-center will-change-transform"
          data-hero-cam
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero/plate.svg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/35"
          />
          <HeroPins />
        </div>

        {/* Top-left type stack */}
        <div
          ref={typeRef}
          className={cn(
            "relative z-30 flex flex-1 flex-col justify-start px-5 pt-20 text-white tablet:px-10 tablet:pt-24 desktop:max-w-[40rem]",
            demo && "pt-10",
          )}
        >
          <p
            data-hero-line
            className="type-small mb-4 font-medium text-white/80"
          >
            hey, I&apos;m {site.shortName}
          </p>
          <h1 className="font-sans text-[clamp(2.4rem,6.5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
            <span data-hero-line className="block">
              Designing products
            </span>
            <span data-hero-line className="relative mt-1 inline-block">
              people{" "}
              <span className="relative inline-block">
                trust
                <span
                  data-hero-accent
                  aria-hidden
                  className="absolute inset-x-0 bottom-[0.08em] h-[0.18em] origin-left bg-accent"
                />
              </span>
              .
            </span>
          </h1>
          <p
            data-hero-line
            className="type-body mt-5 max-w-md text-white/75"
          >
            Lead product designer. Founder of Plux Studio.
          </p>
          <div
            data-hero-line
            className="mt-5 flex flex-wrap gap-2"
          >
            {["Bangalore", "Plux", "Product systems"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-sm"
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
        {!demo ? (
          <p
            ref={cueRef}
            className="absolute bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 type-label text-white/80 backdrop-blur-md tablet:bottom-28"
          >
            scroll to fly in
          </p>
        ) : (
          <p
            ref={cueRef}
            className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 type-label text-white/70"
          >
            scroll to fly in
          </p>
        )}
      </div>
    </section>
  );
}
