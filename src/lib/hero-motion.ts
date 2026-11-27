/** Shared timing for Home Hero + styleguide demo (section 2). */

export const HERO = {
  /** Soft settle after page-ready */
  letterReveal: 0.85,
  letterStagger: 0.045,
  moduleReveal: 0.75,
  moduleStagger: 0.09,
  metaDelay: 0.55,
  metaReveal: 0.5,
  /** Pointer parallax strength (px) by depth 1–3 */
  parallax: [0, 10, 18, 28] as const,
  /** Scroll scrub distance (viewport fraction) */
  scrollEnd: "+=85%",
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Resolves when preloader finishes, session-skips, or reduced-motion marks ready. */
export function waitForPageReady(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();

  return new Promise((resolve) => {
    if (document.documentElement.dataset.pageReady === "1") {
      resolve();
      return;
    }

    const obs = new MutationObserver(() => {
      if (document.documentElement.dataset.pageReady === "1") {
        obs.disconnect();
        resolve();
      }
    });

    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-page-ready"],
    });

    // Safety: never hang if flags were skipped
    window.setTimeout(() => {
      obs.disconnect();
      resolve();
    }, 5000);
  });
}
