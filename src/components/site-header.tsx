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
      <header className="fixed inset-x-0 top-0 z-40 bg-surface-secondary/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 items-center justify-between px-5 tablet:h-16 tablet:px-8">
          <Link
            href="/"
            className="type-small font-medium tracking-[-0.02em] text-text-primary"
            onClick={go(() => setOpen(false))}
          >
            {site.name}
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
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
            <div className="ml-1 flex items-center gap-0.5">
              <SoundToggle className="px-1.5 [&_span]:hidden" />
              <ThemeToggle className="px-1.5 [&_span]:hidden" />
            </div>
          </nav>

          <div className="flex items-center gap-0.5 md:hidden">
            <SoundToggle className="px-1.5 [&_span]:hidden" />
            <ThemeToggle className="px-1.5 [&_span]:hidden" />
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
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
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
          <span className="type-small font-medium">{site.name}</span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center"
            aria-label="Close menu"
            onClick={() => {
              play("click");
              setOpen(false);
            }}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col justify-center gap-5 px-8"
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
