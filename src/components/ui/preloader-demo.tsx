"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Preloader } from "@/components/ui/preloader";
import { PRELOADER_TOTAL_S } from "@/lib/preloader-motion";
import { site } from "@/lib/site";

/**
 * Living styleguide demo — Motion · Preloader.
 * Replayable framed preview of section 0 (letter rise + % + wipe).
 */
export function PreloaderMotionDemo() {
  const [replayKey, setReplayKey] = useState(0);
  const [running, setRunning] = useState(true);

  const replay = useCallback(() => {
    setRunning(true);
    setReplayKey((k) => k + 1);
  }, []);

  return (
    <div>
      <p className="type-body-lg max-w-2xl text-text-secondary">
        Name-only letter rise → corner 0→100% + thin bar → upward wipe. Maël calm
        (no scale). Whoosh when Sound is on.{" "}
        <code className="type-small text-text-primary">prefers-reduced-motion</code>{" "}
        skips straight to ready. Wall-clock ≈ {PRELOADER_TOTAL_S.toFixed(1)}s.
      </p>

      <dl className="mt-10 grid gap-6 sm:grid-cols-2 desktop:grid-cols-4">
        {[
          ["Name", "SAGAR. letter mask / y-rise"],
          ["Progress", "Corner % + thin bar 0→100"],
          ["Exit", "Upward wipe → page"],
          ["Sound", "Whoosh if unmuted"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="type-label text-text-secondary">{k}</dt>
            <dd className="type-small mt-2 text-text-primary">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <Button type="button" onClick={replay} variant="outline">
          Replay preloader
        </Button>
        <p className="type-small text-text-secondary">
          Enable Sound in the nav to hear the exit whoosh. Site skips after first
          view (clear session or hard-refresh in a new tab to re-trigger).
        </p>
      </div>

      <div className="relative mt-8 h-[280px] overflow-hidden bg-surface-primary tablet:h-[320px]">
        {/* Simulated page under the shell */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="type-label text-text-secondary">Page revealed</p>
          <p className="type-h3 text-text-primary">
            {site.shortName}
            <span className="text-accent">.</span>
          </p>
          <p className="type-body max-w-sm text-text-secondary">
            Content sits under the overlay — wipe exits upward, not a bounce.
          </p>
        </div>

        {running ? (
          <Preloader
            demo
            replayKey={replayKey}
            onComplete={() => setRunning(false)}
          />
        ) : null}
      </div>
    </div>
  );
}
