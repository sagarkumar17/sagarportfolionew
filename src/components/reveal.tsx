"use client";

import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Unused while motion is paused — kept for API compatibility */
  stagger?: number;
  y?: number;
  once?: boolean;
};

/**
 * Motion paused: pass-through wrapper. Re-wire GSAP ScrollTrigger later.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={cn(className)}>{children}</div>;
}
