/** Shared timing for site Preloader + styleguide demo (section 0). */
export const PRELOADER = {
  /** Brand fade-in (opacity + blur clear) */
  enter: 0.32,
  /** Quiet hold on wordmark */
  hold: 0.28,
  /** Brand blur/fade out */
  brandExit: 0.38,
  /** Overlay fade revealing the page */
  overlayExit: 0.42,
  /** Soft page reveal under the overlay */
  pageEnter: 0.45,
} as const;

/** Approximate wall-clock when reduced-motion is off (~1.1s). */
export const PRELOADER_TOTAL_S =
  PRELOADER.enter + PRELOADER.hold + PRELOADER.overlayExit;

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
