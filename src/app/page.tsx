import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { MegaBrand } from "@/components/mega-brand";
import { ProjectLink } from "@/components/project-link";
import { Reveal } from "@/components/reveal";
import { services, stats } from "@/lib/content";
import { getAllCaseStudies, isDeepCaseStudy } from "@/lib/case-studies";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = getAllCaseStudies().filter((c) => isDeepCaseStudy(c.slug));
  const more = getAllCaseStudies()
    .filter((c) => !isDeepCaseStudy(c.slug) && c.slug !== "jio-ai-chat-zolo-approach")
    .slice(0, 3);

  return (
    <div className="relative overflow-hidden" data-page="home" data-scroll-mode="vertical">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_-10%,#f5f5f5_0%,transparent_50%),radial-gradient(ellipse_at_90%_20%,color-mix(in_srgb,var(--accent)_6%,transparent)_0%,transparent_45%),linear-gradient(180deg,#fff_0%,#f5f5f5_42%,#fff_100%)]"
      />

      {/* Hero — brand-first editorial */}
      <section className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-7xl flex-col justify-between px-5 pb-8 pt-16 md:min-h-[calc(100svh-4rem)] md:px-8 md:pb-10 md:pt-24">
        <Reveal className="max-w-3xl">
          <p className="font-script text-3xl text-accent md:text-4xl" data-reveal-item>
            Product design
          </p>
          <h1
            className="mt-4 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] tracking-[-0.03em] text-ink"
            data-reveal-item
          >
            Let&apos;s create{" "}
            <span className="text-accent">ideas</span>
            <br />
            <span className="font-script text-[clamp(2.75rem,8vw,5.5rem)] text-ink">
              together.
            </span>
          </h1>
          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
            data-reveal-item
          >
            I help businesses find their voice, shape their identity, and connect
            with their audience.{" "}
            <span className="font-medium text-ink">Less talk. More craft.</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-4" data-reveal-item>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm tracking-wide text-background transition-colors hover:bg-accent"
            >
              View work
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-sm tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Start a project
            </Link>
          </div>
        </Reveal>

        <div className="relative mt-16 overflow-hidden md:mt-20">
          <MegaBrand />
        </div>
      </section>

      {/* Featured work */}
      <section
        id="work"
        className="border-t border-ground-strong bg-background"
        data-scroll-hook="work-strip"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div data-reveal-item>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Selected
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-tight text-ink md:text-6xl">
                My works{" "}
                <span className="text-accent">({featured.length + more.length}+)</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
              data-reveal-item
            >
              All projects
            </Link>
          </Reveal>

          <Reveal className="mt-6 border-t border-ground-strong">
            {featured.map((study, i) => (
              <ProjectLink key={study.slug} study={study} index={i} featured />
            ))}
            {more.map((study, i) => (
              <ProjectLink
                key={study.slug}
                study={study}
                index={featured.length + i}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-ground-strong bg-ground/50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:py-28">
          <Reveal>
            <div
              className="relative aspect-[4/5] overflow-hidden bg-ground-strong"
              data-reveal-item
            >
              <Image
                src="/assets/about/about-section.png"
                alt=""
                fill
                className="object-cover object-[18%_center] grayscale"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <span className="absolute bottom-3 left-3 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Placeholder · Figma export
              </span>
            </div>
          </Reveal>
          <Reveal>
            <p
              className="text-xs uppercase tracking-[0.18em] text-muted"
              data-reveal-item
            >
              About
            </p>
            <h2
              className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl"
              data-reveal-item
            >
              Hi, I&apos;m {site.name}
            </h2>
            <p
              className="mt-2 text-sm uppercase tracking-[0.14em] text-soft"
              data-reveal-item
            >
              Lead product designer · Founder, Plux Studio
            </p>
            <blockquote
              className="mt-8 border-l-2 border-accent pl-5 font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl"
              data-reveal-item
            >
              Good design is never just decoration — it&apos;s how people
              understand, remember, and trust your brand.{" "}
              <span className="text-accent">
                I make sure every detail tells the right story.
              </span>
            </blockquote>
            <p
              className="mt-8 max-w-lg text-lg leading-relaxed text-muted"
              data-reveal-item
            >
              My journey started in graphic design long before product. Years of
              branding, freelance, and college web work built the foundation —
              now applied to platforms at national scale, and through{" "}
              <a
                href={site.pluxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-accent/50 underline-offset-4 hover:text-accent"
              >
                Plux Studio
              </a>
              .
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm text-ink hover:text-accent"
              data-reveal-item
            >
              About me
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-ground-strong bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <p
              className="max-w-xl text-sm text-muted md:text-base"
              data-reveal-item
            >
              Some numbers I&apos;m proud of — reflective of partnerships and
              shipped work. Figures refined from the live site&apos;s empty
              counters; confirm before launch.
            </p>
            <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} data-reveal-item>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-script text-6xl leading-none text-ink md:text-7xl">
                    {stat.value}
                  </dd>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-ink">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm text-soft">{stat.note}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-ground-strong">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-8 md:py-28">
          <Reveal>
            <p
              className="text-xs uppercase tracking-[0.18em] text-muted"
              data-reveal-item
            >
              Services
            </p>
            <h2
              className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl"
              data-reveal-item
            >
              From strategy to execution
            </h2>
            <p className="mt-5 text-lg text-muted" data-reveal-item>
              Help brands move people, spark action, and stand out — digital,
              identity, and production under one craft standard.
            </p>
            <div
              className="relative mt-10 aspect-[4/3] overflow-hidden bg-ground"
              data-reveal-item
            >
              <Image
                src="/assets/services/services.png"
                alt=""
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <span className="absolute bottom-3 left-3 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Placeholder
              </span>
            </div>
          </Reveal>
          <Reveal className="flex flex-col divide-y divide-ground-strong border-y border-ground-strong">
            {services.map((service, i) => (
              <div key={service.title} className="py-8" data-reveal-item>
                <p className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-3xl tracking-tight text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-xl text-muted">{service.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ground-strong bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal className="mb-12 max-w-2xl">
            <p
              className="text-xs uppercase tracking-[0.18em] text-muted"
              data-reveal-item
            >
              FAQs
            </p>
            <h2
              className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl"
              data-reveal-item
            >
              Quick answers
            </h2>
          </Reveal>
          <FaqAccordion />
        </div>
      </section>

      {/* Contact band */}
      <section className="border-t border-ground-strong bg-ink text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-8 md:py-28">
          <div>
            <p className="font-script text-3xl text-accent">Let&apos;s work together</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl tracking-tight md:text-6xl">
              Turn concepts into precise product experiences.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
          >
            Get in touch
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}
