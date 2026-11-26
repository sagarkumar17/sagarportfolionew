"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-ground-strong/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:h-16 md:px-8">
          <Link
            href="/"
            className="font-display text-xl tracking-tight text-ink md:text-2xl"
            onClick={() => setOpen(false)}
          >
            {site.shortName}
            <span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-dark transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col bg-ink text-background md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex h-14 items-center justify-between px-5">
          <span className="font-display text-xl tracking-tight">
            {site.shortName}
            <span className="text-accent">.</span>
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-6 px-8" aria-label="Mobile">
          <Link
            href="/"
            className="font-display text-5xl tracking-tight"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-5xl tracking-tight"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="px-8 pb-10 text-sm text-soft">{site.email}</p>
      </div>
    </>
  );
}
