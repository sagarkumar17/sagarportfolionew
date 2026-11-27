"use client";

import { useState } from "react";
import { HomeHero } from "@/components/home-hero";
import { Button } from "@/components/ui/button";

/**
 * Living styleguide demo — Motion · Hero.
 * Replay enter timeline; hover modules; reduced-motion = instant ready.
 */
export function HeroMotionDemo() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="type-body-lg text-text-secondary">
            Full-viewport kinetic type + live HTML modules (design system,
            product UI, AI, workflow). Enter after preloader / session-skip.
            Pointer parallax + Maël hover (opacity / blur / fill — no scale).
            ScrollTrigger handoffs into Featured work on the home page.
          </p>
          <ul className="mt-4 space-y-1 type-small text-text-secondary">
            <li>
              <span className="text-text-primary">Load</span> — letter rise +
              module blur settle
            </li>
            <li>
              <span className="text-text-primary">Hover</span> — border/fill
              accent, clear blur
            </li>
            <li>
              <span className="text-text-primary">Scroll</span> — pin + scrub
              out into projects (home only)
            </li>
            <li>
              <span className="text-text-primary">Reduced motion</span> — calm
              instant composed state
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

      <div className="relative h-[min(70vh,560px)] overflow-hidden bg-surface-primary">
        <HomeHero demo replayKey={replayKey} className="border-0" />
      </div>
    </div>
  );
}
