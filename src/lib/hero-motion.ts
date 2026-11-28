/** Shared timing for Home Hero + styleguide demo (James-system fidelity). */

export const HERO = {
  /** Line rise after page-ready */
  lineReveal: 1.05,
  lineStagger: 0.12,
  accentPaint: 0.85,
  metaReveal: 0.55,
  pinReveal: 0.7,
  pinStagger: 0.08,
  /** Fly-in scroll track end */
  scrollEnd: "+=180%",
  /** Camera scale/translate at end of fly-in */
  flyScale: 1.35,
  flyY: 12,
  flyX: -4,
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

    window.setTimeout(() => {
      obs.disconnect();
      resolve();
    }, 5000);
  });
}
