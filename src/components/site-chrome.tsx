"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSound } from "@/components/sound-provider";
import { useTheme } from "@/components/theme-provider";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const dockItems = [
  { href: "/", label: "Home", id: "home" },
  { href: "/work", label: "Work", id: "work" },
  { href: "/about", label: "About", id: "about" },
  { href: "/contact", label: "Contact", id: "contact" },
] as const;

/**
 * James-system chrome adapted for Sagar:
 * top-right pill cluster · bottom center dock · bottom-left SFX.
 * No tour / visitor count / WoP badge.
 */
export function SiteChrome() {
  const pathname = usePathname();
  const { enabled, toggle, play } = useSound();
  const { resolved, setMode } = useTheme();
  const isDark = resolved === "dark";
  const navRef = useRef<HTMLElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const match = dockItems.find(
      (i) =>
        i.href === pathname ||
        (i.href !== "/" && pathname.startsWith(i.href)),
    );
    setActive(match?.id ?? "home");
  }, [pathname]);

  useEffect(() => {
    const nav = navRef.current;
    const ind = indRef.current;
    if (!nav || !ind) return;
    const btn = nav.querySelector<HTMLElement>(`[data-dock="${active}"]`);
    if (!btn) return;
    const nr = nav.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    ind.style.width = `${br.width}px`;
    ind.style.transform = `translateX(${br.left - nr.left}px)`;
  }, [active]);

  const go = () => play("click");

  return (
    <>
      {/* Top-right cluster */}
      <div
        className="pointer-events-none fixed right-3 top-3 z-[60] flex max-w-[min(100%-1.5rem,28rem)] flex-wrap items-center justify-end gap-2 tablet:right-5 tablet:top-5"
        data-chrome="top-cluster"
      >
        <a
          href={site.pluxUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={go}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-md transition-[opacity,background-color] duration-300 hover:bg-white/18"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Plux Studio
        </a>
        <button
          type="button"
          onClick={() => {
            go();
            setMode(isDark ? "light" : "dark");
          }}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 type-small text-white backdrop-blur-md transition-[opacity,background-color] duration-300 hover:bg-white/18"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDark ? (
            <Sun size={14} strokeWidth={1.75} />
          ) : (
            <Moon size={14} strokeWidth={1.75} />
          )}
          <span className="hidden sm:inline">{isDark ? "Day" : "Night"}</span>
        </button>
      </div>

      {/* Bottom-left SFX */}
      <button
        type="button"
        data-chrome="sfx"
        onClick={toggle}
        className="fixed bottom-5 left-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-[opacity,background-color] duration-300 hover:bg-black/50 tablet:bottom-6 tablet:left-6"
        aria-pressed={enabled}
        aria-label={enabled ? "Mute sound" : "Enable sound"}
      >
        {enabled ? (
          <Volume2 size={18} strokeWidth={1.5} />
        ) : (
          <VolumeX size={18} strokeWidth={1.5} />
        )}
      </button>

      {/* Bottom dock */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-3 tablet:bottom-5"
        data-chrome="dock"
      >
        <nav
          ref={navRef}
          aria-label="Primary"
          className="pointer-events-auto relative flex items-center gap-0.5 rounded-full border border-white/12 bg-black/40 p-1.5 shadow-[0_8px_40px_rgb(0_0_0_/0.35)] backdrop-blur-xl"
        >
          <span
            ref={indRef}
            aria-hidden
            className="absolute bottom-1.5 left-0 top-1.5 rounded-full bg-white/95 transition-[transform,width] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]"
            style={{ width: 0 }}
          />
          {dockItems.map((item) => {
            const isActive = active === item.id;
            const hideHomeLabel = item.id === "home";
            return (
              <Link
                key={item.id}
                href={item.href}
                data-dock={item.id}
                onClick={go}
                className={cn(
                  "relative z-10 inline-flex items-center gap-2 rounded-full px-3.5 py-2 type-small font-medium transition-colors duration-300",
                  isActive ? "text-static-black" : "text-white/85 hover:text-white",
                  item.id === "home" && "pl-2",
                )}
              >
                {item.id === "home" ? (
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground"
                    aria-hidden
                  >
                    SK
                  </span>
                ) : null}
                <span
                  className={cn(hideHomeLabel && "hidden tablet:inline")}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={go}
            className="relative z-10 ml-0.5 inline-flex items-center gap-1.5 rounded-full bg-surface-inverse px-3.5 py-2 type-small font-semibold text-text-inverse transition-[opacity,background-color] duration-300 hover:opacity-90"
          >
            Resume
            <ArrowUpRight size={14} strokeWidth={2} />
          </Link>
        </nav>
      </div>
    </>
  );
}
