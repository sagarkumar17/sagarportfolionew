"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Minimal static brand shell — no GSAP choreography.
 * Brief hold then CSS opacity dismiss; skipped after first visit in session.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("sagar-preloader") === "1") {
      setVisible(false);
      return;
    }

    const hold = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("sagar-preloader", "1");
      }, 280);
    }, 700);

    return () => window.clearTimeout(hold);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-surface-secondary transition-opacity duration-300",
        exiting && "opacity-0",
      )}
      aria-hidden
    >
      <p className="type-h2 text-text-primary">
        {site.shortName}
        <span className="text-accent">.</span>
      </p>
    </div>
  );
}
