import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { beliefs, experience, stats } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sagar Kumar — independent product designer and founder of Plux Studio.",
};

export default function AboutPage() {
  return (
    <div className="relative" data-page="about" data-scroll-mode="vertical">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,#f5f5f5_0%,transparent_55%)]"
      />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div
            className="relative aspect-[4/5] overflow-hidden bg-ground"
            data-reveal-item
          >
            <Image
              src="/assets/about/about-section.png"
              alt=""
              fill
              priority
              className="object-cover object-[15%_center] grayscale"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <span className="absolute bottom-3 left-3 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Placeholder portrait · Figma
            </span>
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-[0.18em] text-muted"
              data-reveal-item
            >
              About
            </p>
            <h1
              className="mt-3 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] tracking-[-0.03em] text-ink"
              data-reveal-item
            >
              Hi, I&apos;m {site.name}
            </h1>
            <p
              className="mt-3 text-sm uppercase tracking-[0.14em] text-soft"
              data-reveal-item
            >
              Senior / Lead product designer
            </p>
            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
              data-reveal-item
            >
              I design products by connecting user needs, business goals, and how
              the product works as a whole. Features never live alone — they
              shape entry, value, return, and what the team can build next.
            </p>
            <p
              className="mt-5 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
              data-reveal-item
            >
              I prefer short iterations, learning from real use, and partnering
              with engineers from the start. Unpopular opinion: product designers
              should know how to code — it clarifies constraints earlier and
              ships better decisions.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-20 grid gap-8 border-t border-ground-strong pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-reveal-item>
              <p className="font-script text-5xl text-ink md:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-ink">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-soft">{stat.note}</p>
            </div>
          ))}
        </Reveal>

        <section className="mt-24 border-t border-ground-strong pt-16">
          <Reveal>
            <h2
              className="font-display text-4xl tracking-tight text-ink md:text-5xl"
              data-reveal-item
            >
              Experience
            </h2>
            <p className="mt-4 max-w-2xl text-muted md:text-lg" data-reveal-item>
              Independent since 2026 through Plux Studio. Prior product work
              across Jio, PayU, Infosys, and earlier studios.
            </p>
          </Reveal>

          <ol className="mt-12 divide-y divide-ground-strong border-y border-ground-strong">
            {experience.map((job) => {
              const inner = (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-accent">
                      {job.period}
                      {job.location ? ` · ${job.location}` : null}
                    </p>
                    {job.href ? (
                      <span className="inline-flex items-center gap-1 text-sm text-muted group-hover:text-accent">
                        pluxstudio.in
                        <ArrowUpRight size={14} strokeWidth={1.5} />
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 font-display text-3xl tracking-tight text-ink transition-colors group-hover:text-accent md:text-4xl">
                    {job.org}
                  </h3>
                  <p className="mt-1 text-sm text-soft">{job.role}</p>
                  <p className="mt-4 max-w-2xl text-muted">{job.body}</p>
                </>
              );

              return (
                <li key={`${job.org}-${job.period}`} className="py-10">
                  <Reveal>
                    {job.href ? (
                      <a
                        href={job.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                        data-reveal-item
                      >
                        {inner}
                      </a>
                    ) : (
                      <div data-reveal-item>{inner}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-24 grid gap-12 border-t border-ground-strong pt-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2
              className="font-display text-4xl tracking-tight text-ink md:text-5xl"
              data-reveal-item
            >
              What I believe
            </h2>
            <div
              className="relative mt-10 aspect-[16/10] overflow-hidden bg-ground"
              data-reveal-item
            >
              <Image
                src="/assets/about/plux-home.png"
                alt="Plux Studio reference"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <span className="absolute bottom-3 left-3 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Plux reference capture
              </span>
            </div>
          </Reveal>
          <Reveal className="divide-y divide-ground-strong border-y border-ground-strong">
            {beliefs.map((item) => (
              <div key={item.title} className="py-7" data-reveal-item>
                <h3 className="font-display text-2xl tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </section>

        <Reveal className="mt-24 flex flex-col gap-6 border-t border-ground-strong pt-16 md:flex-row md:items-center md:justify-between">
          <p
            className="max-w-xl font-display text-3xl tracking-tight text-ink md:text-4xl"
            data-reveal-item
          >
            Available for select collaborations through Plux.
          </p>
          <div className="flex flex-wrap gap-4" data-reveal-item>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm text-background hover:bg-accent"
            >
              Contact
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
            <a
              href={site.pluxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-sm hover:border-accent hover:text-accent"
            >
              Visit Plux
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
