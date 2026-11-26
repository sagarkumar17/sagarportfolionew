"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSound } from "@/components/sound-provider";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (fn?: () => void) => () => {
    play("click");
    fn?.();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border-default bg-surface-secondary/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 items-center justify-between px-5 tablet:h-16 tablet:px-8">
          <Link
            href="/"
            className="type-h3 text-[20px] tracking-[-0.035em] text-text-primary tablet:text-[22px]"
            onClick={go(() => setOpen(false))}
          >
            {site.shortName}
            <span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="type-small text-text-secondary transition-colors hover:text-text-primary"
                onClick={go()}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/styleguide"
              className="type-small text-text-secondary transition-colors hover:text-text-primary"
              onClick={go()}
            >
              Styleguide
            </Link>
            <div className="ml-2 flex items-center gap-1 border-l border-border-default pl-4">
              <SoundToggle />
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <SoundToggle />
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-text-primary"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => {
                play("click");
                setOpen((v) => !v);
              }}
            >
              {open ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col bg-surface-inverse text-text-inverse md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex h-14 items-center justify-between px-5">
          <span className="type-h3 text-[20px] tracking-[-0.035em]">
            {site.shortName}
            <span className="text-accent">.</span>
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center"
            aria-label="Close menu"
            onClick={() => {
              play("click");
              setOpen(false);
            }}
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col justify-center gap-6 px-8"
          aria-label="Mobile"
        >
          <Link
            href="/"
            className="type-h2 text-text-inverse"
            onClick={go(() => setOpen(false))}
          >
            Home
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-h2 text-text-inverse"
              onClick={go(() => setOpen(false))}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/styleguide"
            className="type-h2 text-text-inverse"
            onClick={go(() => setOpen(false))}
          >
            Styleguide
          </Link>
        </nav>
        <p className="type-small px-8 pb-10 text-text-secondary">{site.email}</p>
      </div>
    </>
  );
}
