"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSound } from "@/components/sound-provider";
import { useTheme } from "@/components/theme-provider";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/** James dock IA: Home · Journey · Work · About · Contact + Resume */
const dockItems = [
  { href: "/", label: "Home", id: "home" },
  { href: "/#journey", label: "Journey", id: "journey" },
  { href: "/work", label: "Work", id: "work" },
  { href: "/about", label: "About", id: "about" },
  { href: "/contact", label: "Contact", id: "contact" },
] as const;

/**
 * James-system chrome: top-right Plux + theme · bottom dock · SFX.
 * Theme button label = destination theme (Night when day active), matching reference.
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
        (i.href !== "/" &&
          !i.href.includes("#") &&
          pathname.startsWith(i.href)),
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
      <div
        className="pointer-events-none fixed right-3 top-3 z-[60] flex max-w-[min(100%-1.5rem,32rem)] flex-wrap items-center justify-end gap-2 tablet:right-5 tablet:top-5"
        data-chrome="top-cluster"
      >
        <a
          href={site.pluxUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={go}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgb(0_0_0_/0.25)] backdrop-blur-xl transition-[opacity,background-color] duration-300 hover:bg-black/50"
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
          className={cn(
            "pointer-events-auto inline-flex items-center gap-2 rounded-full border px-3.5 py-2 type-small font-medium shadow-[0_8px_24px_rgb(0_0_0_/0.25)] backdrop-blur-xl transition-[opacity,background-color,border-color] duration-300",
            isDark
              ? "border-amber-300/40 bg-amber-300 text-static-black hover:bg-amber-200"
              : "border-white/20 bg-black/35 text-white hover:bg-black/50",
          )}
          aria-label={
            isDark
              ? "Switch to day landscape"
              : "Switch to night landscape"
          }
          title={
            isDark
              ? "Label shows destination: Day"
              : "Label shows destination: Night"
          }
        >
          {isDark ? (
            <Sun size={14} strokeWidth={1.75} />
          ) : (
            <Moon size={14} strokeWidth={1.75} />
          )}
          <span className="hidden sm:inline">{isDark ? "Day" : "Night"}</span>
        </button>
      </div>

      <button
        type="button"
        data-chrome="sfx"
        onClick={toggle}
        className="fixed bottom-5 left-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-[0_8px_24px_rgb(0_0_0_/0.3)] backdrop-blur-xl transition-[opacity,background-color] duration-300 hover:bg-black/55 tablet:bottom-6 tablet:left-6"
        aria-pressed={enabled}
        aria-label={enabled ? "Mute sound" : "Enable sound"}
      >
        {enabled ? (
          <Volume2 size={18} strokeWidth={1.5} />
        ) : (
          <VolumeX size={18} strokeWidth={1.5} />
        )}
      </button>

      <div
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-3 tablet:bottom-5"
        data-chrome="dock"
      >
        <nav
          ref={navRef}
          aria-label="Primary"
          className="pointer-events-auto relative flex items-center gap-0.5 rounded-full border border-white/15 bg-black/45 p-1.5 shadow-[0_12px_40px_rgb(0_0_0_/0.4)] backdrop-blur-2xl"
        >
          <span
            ref={indRef}
            aria-hidden
            className="absolute bottom-1.5 left-0 top-1.5 rounded-full bg-white transition-[transform,width] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]"
            style={{ width: 0 }}
          />
          {dockItems.map((item) => {
            const isActive = active === item.id;
            const hideOnPhone =
              item.id === "home" || item.id === "journey" || item.id === "about";
            return (
              <Link
                key={item.id}
                href={item.href}
                data-dock={item.id}
                onClick={go}
                className={cn(
                  "relative z-10 inline-flex items-center gap-2 rounded-full px-3 py-2 type-small font-medium transition-colors duration-300 tablet:px-3.5",
                  isActive
                    ? "text-static-black"
                    : "text-white/88 hover:text-white",
                  item.id === "home" && "pl-1.5 tablet:pl-2",
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
                  className={cn(
                    hideOnPhone && item.id !== "home" && "hidden tablet:inline",
                    item.id === "home" && "hidden tablet:inline",
                  )}
                >
                  {item.label}
                </span>
                {item.id === "home" ? (
                  <span className="sr-only tablet:hidden">Home</span>
                ) : null}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={go}
            className="relative z-10 ml-0.5 inline-flex items-center gap-1.5 rounded-full bg-[#13233A] px-3.5 py-2 type-small font-semibold text-white transition-[opacity,background-color] duration-300 hover:opacity-90 dark:bg-amber-300 dark:text-static-black"
          >
            Resume
            <ArrowUpRight size={14} strokeWidth={2} />
          </Link>
        </nav>
      </div>
    </>
  );
}
