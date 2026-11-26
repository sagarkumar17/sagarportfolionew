"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Skewed mega brand mark with light parallax — vertical-first, horizontal-ready. */
export function MegaBrand() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-scroll-hook="mega-brand"
      className="pointer-events-none select-none whitespace-nowrap font-sans text-[clamp(6rem,28vw,22rem)] font-semibold leading-none tracking-[-0.06em] text-ink/[0.06] will-change-transform"
      style={{ transform: "rotate(-6deg)" }}
    >
      SAGAR
    </div>
  );
}
