"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (on: boolean) => void;
  toggle: () => void;
  play: (name: "click" | "whoosh") => void;
};

const STORAGE_KEY = "sagar-sound";

const SoundContext = createContext<SoundContextValue | null>(null);

const SOURCES = {
  click: "/assets/audio/click.mp3",
  whoosh: "/assets/audio/whoosh.mp3",
  ambient: "/assets/audio/ambient.mp3",
} as const;

/**
 * Tasteful UI sound — inspired by gowthamganesan.com.
 * Default OFF (a11y). Ambient only when enabled; UI cues on demand.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const buffers = useRef<Partial<Record<keyof typeof SOURCES, HTMLAudioElement>>>(
    {},
  );
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "1") {
      setEnabledState(true);
    }

    // Prefetch short cues
    (["click", "whoosh"] as const).forEach((key) => {
      const audio = new Audio(SOURCES[key]);
      audio.preload = "auto";
      audio.volume = key === "click" ? 0.28 : 0.22;
      buffers.current[key] = audio;
    });

    const ambient = new Audio(SOURCES.ambient);
    ambient.loop = true;
    ambient.preload = "auto";
    ambient.volume = 0.12;
    ambientRef.current = ambient;

    return () => {
      ambient.pause();
      ambientRef.current = null;
      buffers.current = {};
    };
  }, []);

  useEffect(() => {
    const ambient = ambientRef.current;
    if (!ambient) return;

    if (enabled) {
      ambient.currentTime = 0;
      void ambient.play().catch(() => {
        /* autoplay may block until gesture — toggle itself is a gesture */
      });
    } else {
      ambient.pause();
    }
  }, [enabled]);

  const setEnabled = useCallback((on: boolean) => {
    setEnabledState(on);
    window.localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
  }, []);

  const playCue = useCallback((name: "click" | "whoosh") => {
    const base = buffers.current[name];
    if (!base) return;
    const node = base.cloneNode(true) as HTMLAudioElement;
    node.volume = base.volume;
    void node.play().catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    setEnabledState((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      if (next) {
        // Enabling is itself a user gesture — soft whoosh confirmation
        window.setTimeout(() => playCue("whoosh"), 0);
      }
      return next;
    });
  }, [playCue]);

  const play = useCallback(
    (name: "click" | "whoosh") => {
      if (!enabled) return;
      playCue(name);
    },
    [enabled, playCue],
  );

  const value = useMemo(
    () => ({ enabled, setEnabled, toggle, play }),
    [enabled, setEnabled, toggle, play],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return ctx;
}
