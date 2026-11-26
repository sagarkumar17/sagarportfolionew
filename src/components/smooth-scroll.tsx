"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: React.ReactNode;
};

/**
 * Vertical Lenis + ScrollTrigger bridge (go-live default).
 *
 * Horizontal later: set `html[data-scroll-axis="horizontal"]`, pass
 * `{ orientation: "horizontal" }` to Lenis, and drive sections marked
 * `data-horizontal-ready="true"` / `data-scroll-hook="work-strip"`.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const axis =
      document.documentElement.getAttribute("data-scroll-axis") || "vertical";

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      // orientation reserved when axis flips — Lenis types accept string
      ...(axis === "horizontal" ? { orientation: "horizontal" as const } : null),
    });

    // Expose for future horizontal section controllers
    (
      window as Window & { __lenis?: Lenis; __scrollAxis?: string }
    ).__lenis = lenis;
    (
      window as Window & { __lenis?: Lenis; __scrollAxis?: string }
    ).__scrollAxis = axis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
