import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllCaseStudies, isDeepCaseStudy } from "@/lib/case-studies";

export default function HomePage() {
  const featured = getAllCaseStudies().filter((c) => isDeepCaseStudy(c.slug));

  return (
    <div className="relative overflow-hidden">
      {/* Soft ground atmosphere — not flat white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_0%,#f5f5f5_0%,transparent_55%),linear-gradient(180deg,#fff_0%,#f5f5f5_100%)]"
      />

      <section className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-7xl flex-col justify-end px-5 pb-16 pt-20 md:min-h-[calc(100svh-4rem)] md:px-8 md:pb-24 md:pt-28">
        <p className="font-script text-2xl text-accent md:text-3xl">Product design</p>
        <h1 className="mt-3 max-w-5xl font-display text-[clamp(3.25rem,12vw,8.5rem)] leading-[0.9] tracking-[-0.04em] text-ink">
          Sagar
          <span className="text-accent">.</span>
          <br />
          Kumar
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          Independent designer crafting product experiences for scale. Founder of
          Plux Studio.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm tracking-wide text-background transition-colors hover:bg-accent"
          >
            View work
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-sm tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
          >
            About
          </Link>
        </div>
      </section>

      <section className="border-t border-ground-strong bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl tracking-tight text-ink md:text-5xl">
              Featured work
            </h2>
            <Link
              href="/work"
              className="hidden text-sm text-muted underline-offset-4 hover:text-accent hover:underline md:inline"
            >
              All projects
            </Link>
          </div>
          <ul className="mt-12 divide-y divide-ground-strong border-y border-ground-strong">
            {featured.map((study) => (
              <li key={study.slug}>
                <Link
                  href={`/work/${study.slug}`}
                  className="group flex flex-col gap-2 py-8 transition-colors md:flex-row md:items-baseline md:justify-between md:gap-8"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {study.client} · {study.type}
                    </p>
                    <h3 className="mt-2 font-display text-3xl tracking-tight text-ink transition-colors group-hover:text-accent md:text-4xl">
                      {study.title}
                    </h3>
                    {study.dek ? (
                      <p className="mt-2 max-w-2xl text-muted">{study.dek}</p>
                    ) : null}
                  </div>
                  <ArrowUpRight
                    className="shrink-0 text-soft transition-colors group-hover:text-accent"
                    size={22}
                    strokeWidth={1.25}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
