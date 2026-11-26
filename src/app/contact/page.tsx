import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sagar Kumar for product design collaborations.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Contact</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink md:text-7xl">
        Let&apos;s build something precise.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">
        Available for select product design collaborations and studio
        partnerships through Plux.
      </p>

      <div className="mt-16 flex flex-col gap-6">
        <a
          href={`mailto:${site.email}`}
          className="group inline-flex max-w-xl items-center justify-between gap-6 border-b border-ground-strong py-6 transition-colors hover:border-accent"
        >
          <span className="inline-flex items-center gap-3 text-lg text-ink md:text-2xl">
            <Mail size={20} strokeWidth={1.5} className="text-accent" />
            {site.email}
          </span>
          <ArrowUpRight
            className="text-soft transition-colors group-hover:text-accent"
            size={20}
            strokeWidth={1.25}
          />
        </a>

        <a
          href={site.pluxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex max-w-xl items-center justify-between gap-6 border-b border-ground-strong py-6 transition-colors hover:border-accent"
        >
          <span className="text-lg text-ink md:text-2xl">Plux Studio</span>
          <ArrowUpRight
            className="text-soft transition-colors group-hover:text-accent"
            size={20}
            strokeWidth={1.25}
          />
        </a>
      </div>
    </div>
  );
}
