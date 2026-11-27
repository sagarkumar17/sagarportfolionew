"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ModuleAiStrip,
  ModuleDsTokens,
  ModuleProductFrame,
  ModuleWorkflow,
} from "@/components/home-hero-modules";
import { site } from "@/lib/site";
import {
  HERO,
  prefersReducedMotion,
  waitForPageReady,
} from "@/lib/hero-motion";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

type HomeHeroProps = {
  /** Styleguide framed demo — no page pin / no document scroll coupling. */
  demo?: boolean;
  className?: string;
  /** Bump to remount + replay enter (demo). */
  replayKey?: number;
};

/**
 * Section 2 — Interactive home hero.
 * Kinetic type + modular product UI; enter after preloader;
 * pointer parallax + Maël hover; ScrollTrigger handoff into Featured work.
 */
export function HomeHero({
  demo = false,
  className,
  replayKey = 0,
}: HomeHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const typeEl = typeRef.current;
    const metaEl = metaRef.current;
    const bridgeEl = bridgeRef.current;
    const modulesEl = modulesRef.current;
    if (!root || !typeEl || !metaEl || !modulesEl) return;

    const chars = Array.from(
      typeEl.querySelectorAll<HTMLElement>("[data-hero-char]"),
    );
    const modules = Array.from(
      modulesEl.querySelectorAll<HTMLElement>("[data-hero-module]"),
    );

    let cancelled = false;
    let enterTl: gsap.core.Timeline | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    let pointerRaf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const reduced = prefersReducedMotion();

    const setCssMotion = (
      el: HTMLElement,
      vars: Record<string, string | number>,
    ) => {
      Object.entries(vars).forEach(([k, v]) => {
        el.style.setProperty(k, String(v));
      });
    };

    const setReadyState = () => {
      gsap.set(chars, { yPercent: 0, opacity: 1 });
      modules.forEach((el, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        setCssMotion(el, {
          "--sx": "0px",
          "--sy": "0px",
          "--sop": "0.92",
          "--sblur": "0px",
          "--side": String(side),
        });
      });
      gsap.set(metaEl, { opacity: 1, y: 0 });
      if (bridgeEl) gsap.set(bridgeEl, { opacity: 1, y: 0 });
      setCssMotion(typeEl, {
        "--sx": "0px",
        "--sy": "0px",
        "--sop": "1",
        "--sblur": "0px",
      });
      root.dataset.heroState = "ready";
    };

    const runEnter = () => {
      if (cancelled) return;

      if (reduced) {
        setReadyState();
        return;
      }

      // Release boot CSS hide so CSS-var / GSAP opacity can drive the enter
      root.dataset.heroState = "animating";

      gsap.set(chars, { yPercent: 110, opacity: 0 });
      modules.forEach((el, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        setCssMotion(el, {
          "--sx": "0px",
          "--sy": "48px",
          "--sop": "0",
          "--sblur": "10px",
          "--px": "0px",
          "--py": "0px",
          "--side": String(side),
        });
      });
      gsap.set(metaEl, { opacity: 0, y: 12 });
      if (bridgeEl) gsap.set(bridgeEl, { opacity: 0, y: 10 });
      setCssMotion(typeEl, {
        "--sx": "0px",
        "--sy": "0px",
        "--sop": "1",
        "--sblur": "0px",
        "--px": "0px",
        "--py": "0px",
      });

      const progress = modules.map(() => ({ y: 48, o: 0, b: 10 }));

      enterTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (!cancelled) root.dataset.heroState = "ready";
        },
      });

      enterTl.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: HERO.letterReveal,
        stagger: HERO.letterStagger,
      });

      modules.forEach((el, i) => {
        enterTl!.to(
          progress[i],
          {
            y: 0,
            o: 0.92,
            b: 0,
            duration: HERO.moduleReveal,
            onUpdate: () => {
              setCssMotion(el, {
                "--sy": `${progress[i].y}px`,
                "--sop": String(progress[i].o),
                "--sblur": `${progress[i].b}px`,
              });
            },
          },
          0.2 + i * HERO.moduleStagger,
        );
      });

      enterTl.to(
        metaEl,
        { opacity: 1, y: 0, duration: HERO.metaReveal },
        HERO.metaDelay,
      );

      if (bridgeEl) {
        enterTl.to(
          bridgeEl,
          { opacity: 1, y: 0, duration: HERO.metaReveal },
          HERO.metaDelay + 0.1,
        );
      }
    };

    const setupScroll = () => {
      if (demo || reduced || cancelled) return;

      const work = document.querySelector<HTMLElement>("#work");
      if (work) {
        gsap.set(work, { opacity: 0, y: 40 });
      }

      scrollTrigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: HERO.scrollEnd,
        scrub: 0.65,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          modules.forEach((el, i) => {
            const depth = Number(el.dataset.depth ?? 1);
            const side = i % 2 === 0 ? -1 : 1;
            setCssMotion(el, {
              "--sx": `${side * depth * 28 * p}px`,
              "--sy": `${-40 * p}px`,
              "--sop": String(Math.max(0, 0.92 * (1 - p * 1.15))),
              "--sblur": `${p * 8}px`,
            });
          });
          setCssMotion(typeEl, {
            "--sy": `${-30 * p}px`,
            "--sop": String(Math.max(0, 1 - p * 0.85)),
            "--sblur": `${p * 4}px`,
          });
          gsap.set(metaEl, { opacity: Math.max(0, 1 - p * 1.2), y: -16 * p });
          if (bridgeEl) {
            gsap.set(bridgeEl, {
              opacity: Math.max(0, 1 - p * 1.4),
              y: 20 * p,
            });
          }
          if (work) {
            gsap.set(work, {
              opacity: Math.min(1, p * 1.4),
              y: (1 - p) * 40,
            });
          }
        },
      });
    };

    const tickPointer = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;

      modules.forEach((el) => {
        const depth = Number(el.dataset.depth ?? 1) as 1 | 2 | 3;
        const strength = HERO.parallax[depth] ?? 12;
        el.style.setProperty("--px", `${curX * strength}px`);
        el.style.setProperty("--py", `${curY * strength}px`);
      });

      typeEl.style.setProperty("--px", `${curX * -6}px`);
      typeEl.style.setProperty("--py", `${curY * -4}px`);

      pointerRaf = requestAnimationFrame(tickPointer);
    };

    const onPointer = (e: PointerEvent) => {
      if (reduced || root.dataset.heroState !== "ready") return;
      const rect = root.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = nx;
      targetY = ny;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const start = async () => {
      if (!demo) await waitForPageReady();
      if (cancelled) return;
      runEnter();
      if (!reduced) {
        setupScroll();
        root.addEventListener("pointermove", onPointer);
        root.addEventListener("pointerleave", onLeave);
        pointerRaf = requestAnimationFrame(tickPointer);
      }
    };

    void start();

    return () => {
      cancelled = true;
      enterTl?.kill();
      scrollTrigger?.kill();
      cancelAnimationFrame(pointerRaf);
      root.removeEventListener("pointermove", onPointer);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [demo, replayKey]);

  const brand = `${site.shortName.toUpperCase()}.`;
  const letters = brand.split("").map((ch, i) => (
    <span key={`${ch}-${i}`} className="inline-block overflow-hidden">
      <span
        data-hero-char
        className={cn(
          "inline-block will-change-transform",
          ch === "." && "text-accent",
        )}
      >
        {ch}
      </span>
    </span>
  ));

  return (
    <section
      ref={rootRef}
      data-home-hero
      data-hero-state="enter"
      aria-label="Introduction"
      className={cn(
        "hero-stage relative isolate flex flex-col justify-between overflow-hidden",
        demo
          ? "h-full min-h-[420px] rounded-sm border border-border-default"
          : "-mt-14 min-h-svh pt-14 tablet:-mt-16 tablet:pt-16",
        className,
      )}
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-surface-secondary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_55%),radial-gradient(ellipse_at_80%_70%,color-mix(in_srgb,var(--text-primary)_8%,transparent),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Kinetic brand type */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 tablet:px-8">
        <p
          ref={metaRef}
          data-hero-meta
          className="type-label mb-5 text-text-secondary will-change-[opacity,transform]"
        >
          Lead product designer · Plux
        </p>
        <h1
          ref={typeRef}
          className="hero-type type-display max-w-[14ch] text-[clamp(3.5rem,16vw,9.5rem)] leading-[0.9] tracking-[-0.07em] text-text-primary will-change-transform"
        >
          {letters}
        </h1>
        <p className="sr-only">
          {site.name} — Lead product designer and founder of Plux Studio.
        </p>
      </div>

      {/* Desktop modular constellation */}
      <div
        ref={modulesRef}
        className="absolute inset-0 z-20 hidden tablet:block"
        aria-hidden
      >
        <ModuleDsTokens />
        <ModuleProductFrame />
        <ModuleAiStrip />
        <ModuleWorkflow />
      </div>

      {/* Mobile strip */}
      <div
        className="relative z-20 grid grid-cols-2 gap-3 px-5 pb-6 tablet:hidden"
        aria-hidden
      >
        <ModuleDsTokens className="!static !inset-auto !w-full opacity-90" />
        <ModuleProductFrame className="!static !inset-auto !w-full opacity-90" />
      </div>

      {/* Scroll bridge */}
      <div
        ref={bridgeRef}
        data-hero-bridge
        className="relative z-30 mb-8 self-start px-5 tablet:mb-10 tablet:px-8"
      >
        {demo ? (
          <p className="type-label text-text-secondary">Selected work ↓</p>
        ) : (
          <a
            href="#work"
            className="type-label inline-flex items-center gap-3 text-text-secondary transition-colors duration-300 hover:text-accent"
          >
            Selected work
            <span
              aria-hidden
              className="inline-block h-8 w-px bg-border-strong/40"
            />
          </a>
        )}
      </div>
    </section>
  );
}
