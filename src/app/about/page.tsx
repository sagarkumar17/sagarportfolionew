import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sagar Kumar — independent product designer and founder of Plux Studio.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">About</p>
      <h1 className="mt-3 max-w-4xl font-display text-5xl tracking-tight text-ink md:text-7xl">
        Designer building clarity into complex products.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
        I&apos;m {site.name}, an independent product designer focused on
        high-craft digital experiences. Since 2026 I&apos;ve been building as
        the founder of Plux Studio — pairing editorial taste with systems that
        scale.
      </p>

      <section className="mt-20 border-t border-ground-strong pt-16">
        <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
          Experience
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Current practice lives at Plux Studio — product design, systems, and
          brand-adjacent craft for ambitious teams.
        </p>

        <a
          href={site.pluxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 flex max-w-3xl flex-col gap-3 border border-ground-strong bg-ground/40 p-6 transition-colors hover:border-accent/40 md:flex-row md:items-center md:justify-between md:p-8"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-accent">
              Current · Studio
            </p>
            <h3 className="mt-2 font-display text-3xl tracking-tight text-ink">
              Plux Studio
            </h3>
            <p className="mt-2 text-muted">
              Founder · Independent designer since 2026
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm text-ink transition-colors group-hover:text-accent">
            pluxstudio.in
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </span>
        </a>
      </section>

      <section className="mt-20 max-w-2xl">
        <h2 className="font-display text-3xl tracking-tight text-ink">
          Approach
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          Bold editorial typography, black-and-white structure, and one decisive
          accent. Motion is craft — not decoration. Case studies lean on clear
          problem framing, research evidence, and product outcomes.
        </p>
      </section>
    </div>
  );
}
