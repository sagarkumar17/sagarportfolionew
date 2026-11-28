"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/hero-motion";
import { cn } from "@/lib/cn";

/**
 * Circular “Open” cursor while hovering hero markers (James-system).
 */
export function HeroOpenCursor({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      setVisible(true);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      data-hero-open-cursor
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[80] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/55 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_28px_rgb(0_0_0_/0.45)] backdrop-blur-md transition-[opacity,transform] duration-200",
        active && visible ? "opacity-100 scale-100" : "opacity-0 scale-75",
      )}
    >
      Open
    </div>
  );
}
