"use client";

import { useState } from "react";
import { HomeHero } from "@/components/home-hero";
import { Button } from "@/components/ui/button";

/**
 * Living styleguide demo — Motion · Hero (James-system fidelity).
 */
export function HeroMotionDemo() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="type-body-lg text-text-secondary">
            Pixel-close to the jameschugh.com hero system: full-bleed plate,
            top-left type stack, glass project pins, load line-rise + Plux accent
            paint, and scroll fly-in. Site chrome (top-right cluster, bottom
            dock, SFX) lives globally — see the live page frame.
          </p>
          <ul className="mt-4 space-y-1 type-small text-text-secondary">
            <li>
              <span className="text-text-primary">Load</span> — line rise +
              accent underline paint + pin stagger (after preloader)
            </li>
            <li>
              <span className="text-text-primary">Pins</span> — glass pills;
              hover = opacity / stem grow / fill (no scale)
            </li>
            <li>
              <span className="text-text-primary">Scroll</span> — camera fly-in
              scrub (home page; demo is enter-only)
            </li>
            <li>
              <span className="text-text-primary">Chrome</span> — top-right Plux
              + theme · bottom dock · bottom-left SFX
            </li>
            <li>
              <span className="text-text-primary">Reduced motion</span> — instant
              composed state; no fly-in
            </li>
          </ul>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setReplayKey((k) => k + 1)}
        >
          Replay enter
        </Button>
      </div>

      <div className="relative h-[min(72vh,580px)] overflow-hidden bg-static-black">
        <HomeHero demo replayKey={replayKey} className="min-h-0" />
      </div>
    </div>
  );
}
