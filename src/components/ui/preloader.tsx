"use client";

import { useEffect, useRef, useState } from "react";
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
 * Section 0 — Preloader + page enter.
 * Maël calm: opacity + blur only (no scale). Sound-gated whoosh on exit.
 * Reduced-motion → skip straight to ready. Site total ~1.1s.
 */
export function Preloader({
  demo = false,
  className,
  onComplete,
  replayKey = 0,
}: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const onCompleteRef = useRef(onComplete);
  const { play } = useSound();
  const playRef = useRef(play);
  const [visible, setVisible] = useState(true);

  onCompleteRef.current = onComplete;
  playRef.current = play;

  useEffect(() => {
    let cancelled = false;
    let tl: gsap.core.Timeline | null = null;

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
      setVisible(false);
      onCompleteRef.current?.();
    };

    if (!demo) {
      try {
        if (sessionStorage.getItem(SESSION_KEY) === "1") {
          markPageReady();
          setVisible(false);
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
    const brand = brandRef.current;
    if (!root || !brand) return;

    if (!demo) markPreloaderActive();

    gsap.set(brand, { opacity: 0, filter: "blur(12px)" });
    gsap.set(root, { opacity: 1 });

    if (!demo) {
      const main = document.querySelector("main");
      if (main) {
        gsap.set(main, { opacity: 0.72, filter: "blur(6px)" });
      }
    }

    tl = gsap.timeline({
      onComplete: finish,
    });

    tl.to(brand, {
      opacity: 1,
      filter: "blur(0px)",
      duration: PRELOADER.enter,
      ease: "power2.out",
    })
      .to({}, { duration: PRELOADER.hold })
      .add(() => {
        playRef.current("whoosh");
      })
      .to(
        brand,
        {
          opacity: 0,
          filter: "blur(10px)",
          duration: PRELOADER.brandExit,
          ease: "power2.in",
        },
        "exit",
      )
      .to(
        root,
        {
          opacity: 0,
          duration: PRELOADER.overlayExit,
          ease: "power2.inOut",
        },
        "exit+=0.04",
      );

    if (!demo) {
      const main = document.querySelector("main");
      if (main) {
        tl.to(
          main,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: PRELOADER.pageEnter,
            ease: "power2.out",
          },
          "exit+=0.08",
        );
      }
    }

    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, [demo, replayKey]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className={cn(
        "z-[100] flex items-center justify-center bg-surface-secondary",
        demo ? "absolute inset-0" : "fixed inset-0",
        className,
      )}
      aria-hidden
      data-preloader-shell={demo ? "demo" : "site"}
    >
      <p
        ref={brandRef}
        className="type-display text-text-primary will-change-[opacity,filter]"
      >
        {site.shortName.toUpperCase()}
        <span className="text-accent">.</span>
      </p>
    </div>
  );
}
