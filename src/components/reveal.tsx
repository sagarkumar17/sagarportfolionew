"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds for child `[data-reveal-item]` nodes */
  stagger?: number;
  y?: number;
  once?: boolean;
};

/**
 * Scroll-triggered fade/rise. Prefer wrapping sections; mark children with
 * `data-reveal-item` when staggered reveals are needed.
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 36,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const targets = items.length > 0 ? Array.from(items) : [root];

    gsap.set(targets, { autoAlpha: 0, y });

    const tween = gsap.to(targets, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: items.length > 0 ? stagger : 0,
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger, y, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
