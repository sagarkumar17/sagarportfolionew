"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSound } from "@/components/sound-provider";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import {
  PRELOADER,
  markPageReady,
  markPreloaderActive,
  prefersReducedMotion,
} from "@/lib/preloader-motion";

const SESSION_KEY = "sagar-preloader";

/** Brand shown on the loader — name only, no tagline. */
const BRAND = `${site.shortName.toUpperCase()}.`;

export type PreloaderProps = {
  /**
   * Styleguide / isolated preview — relative frame, no session skip,
   * does not touch document page-ready flags.
   */
  demo?: boolean;
  className?: string;
  onComplete?: () => void;
  /** Bump to remount + replay (demo). */
  replayKey?: number;
};

/**
 * Section 0 — Preloader + page enter (Bezel-style).
 * Name letter-rise + corner % + thin bar → upward wipe.
 * Maël calm: no scale. Sound-gated whoosh on exit.
 * Reduced-motion → skip straight to ready. Site total ~2.5s.
 */
export function Preloader({
  demo = false,
  className,
  onComplete,
  replayKey = 0,
}: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const { play } = useSound();
  const playRef = useRef(play);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    playRef.current = play;
  }, [onComplete, play]);

  useEffect(() => {
    let cancelled = false;
    let tl: gsap.core.Timeline | null = null;

    const hide = () => {
      startTransition(() => {
        if (!cancelled) setVisible(false);
      });
    };

    const finish = () => {
      if (cancelled) return;
      if (!demo) markPageReady();
      if (!demo) {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* private mode */
        }
      }
      hide();
      onCompleteRef.current?.();
    };

    if (!demo) {
      try {
        if (sessionStorage.getItem(SESSION_KEY) === "1") {
          markPageReady();
          hide();
          onCompleteRef.current?.();
          return;
        }
      } catch {
        /* continue */
      }
    }

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    const root = rootRef.current;
    const nameEl = nameRef.current;
    const counterEl = counterRef.current;
    const barEl = barRef.current;
    if (!root || !nameEl || !counterEl || !barEl) return;

    if (!demo) markPreloaderActive();

    const chars = Array.from(
      nameEl.querySelectorAll<HTMLElement>("[data-pl-char]"),
    );
    const progress = { value: 0 };

    gsap.set(root, { yPercent: 0, opacity: 1 });
    gsap.set(chars, { yPercent: 110 });
    gsap.set(barEl, { clipPath: "inset(0 100% 0 0)" });
    counterEl.textContent = "0%";

    if (!demo) {
      const main = document.querySelector("main");
      if (main) gsap.set(main, { opacity: 0.88 });
    }

    tl = gsap.timeline({
      onComplete: finish,
    });

    // Progress 0 → 100 (counter + bar via clip — no scale)
    tl.to(progress, {
      value: 100,
      duration: PRELOADER.progress,
      ease: "power2.inOut",
      onUpdate: () => {
        const n = Math.round(progress.value);
        counterEl.textContent = `${n}%`;
        const remaining = 100 - progress.value;
        gsap.set(barEl, {
          clipPath: `inset(0 ${remaining}% 0 0)`,
        });
      },
    });

    // Letter rise (mask via overflow-hidden parent)
    tl.to(
      chars,
      {
        yPercent: 0,
        duration: PRELOADER.letterReveal,
        stagger: PRELOADER.letterStagger,
        ease: "power3.out",
      },
      PRELOADER.letterStart,
    );

    // Beat at 100%, then whoosh + upward wipe
    tl.to({}, { duration: PRELOADER.hold });
    tl.add(() => {
      playRef.current("whoosh");
    });
    tl.to(
      root,
      {
        yPercent: -100,
        duration: PRELOADER.wipe,
        ease: "power3.inOut",
      },
      "exit",
    );

    if (!demo) {
      const main = document.querySelector("main");
      if (main) {
        tl.to(
          main,
          {
            opacity: 1,
            duration: PRELOADER.pageEnter,
            ease: "power2.out",
          },
          "exit+=0.12",
        );
      }
    }

    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, [demo, replayKey]);

  if (!visible) return null;

  const letters = BRAND.split("").map((ch, i) => {
    const isAccent = ch === ".";
    return (
      <span key={`${ch}-${i}`} className="inline-block overflow-hidden">
        <span
          data-pl-char
          className={cn(
            "inline-block will-change-transform",
            isAccent && "text-accent",
          )}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      </span>
    );
  });

  return (
    <div
      ref={rootRef}
      className={cn(
        "z-[100] bg-surface-secondary text-text-primary",
        demo ? "absolute inset-0" : "fixed inset-0",
        className,
      )}
      aria-hidden
      data-preloader-shell={demo ? "demo" : "site"}
    >
      {/* Centered brand — letter reveal only */}
      <div className="flex h-full w-full items-center justify-center px-6">
        <div
          ref={nameRef}
          className="type-display flex select-none tracking-tight"
        >
          {letters}
        </div>
      </div>

      {/* Bezel-style corner counter */}
      <div
        className={cn(
          "pointer-events-none absolute font-sans font-semibold tabular-nums tracking-tight text-text-primary",
          demo
            ? "bottom-4 right-4 text-3xl tablet:text-4xl"
            : "bottom-8 right-6 text-5xl tablet:bottom-10 tablet:right-10 tablet:text-7xl desktop:text-8xl",
        )}
      >
        <span ref={counterRef}>0%</span>
      </div>

      {/* Thin progress bar — clip reveal (Maël: no scale) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 bg-border-default",
          demo ? "h-px" : "h-[2px]",
        )}
      >
        <div
          ref={barRef}
          className="h-full w-full bg-text-primary will-change-[clip-path]"
        />
      </div>
    </div>
  );
}
