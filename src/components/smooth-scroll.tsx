"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/hero-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Vertical Lenis + GSAP ScrollTrigger sync.
 * Disabled when prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.dataset.scrollReady = "1";

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      document.documentElement.removeAttribute("data-scroll-ready");
    };
  }, []);

  return <>{children}</>;
}
