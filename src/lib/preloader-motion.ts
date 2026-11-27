/** Shared timing for site Preloader + styleguide demo (section 0). */
export const PRELOADER = {
  /** 0→100% counter + bar (soft ease) */
  progress: 1.45,
  /** Letter y-rise duration */
  letterReveal: 0.9,
  /** Stagger between letters */
  letterStagger: 0.038,
  /** When letter reveal starts relative to progress */
  letterStart: 0.12,
  /** Quiet beat after 100% before wipe */
  hold: 0.22,
  /** Upward wipe exit */
  wipe: 0.8,
  /** Soft page settle under the wipe (site only) */
  pageEnter: 0.5,
} as const;

/** Approximate wall-clock when reduced-motion is off (~2.5s). */
export const PRELOADER_TOTAL_S =
  PRELOADER.progress + PRELOADER.hold + PRELOADER.wipe;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function markPageReady() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.pageReady = "1";
  document.documentElement.removeAttribute("data-preloader");
}

export function markPreloaderActive() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.pageReady = "0";
  document.documentElement.dataset.preloader = "active";
}
