import type { Metadata } from "next";
import Link from "next/link";
import { ProjectLink } from "@/components/project-link";
import { Reveal } from "@/components/reveal";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product design case studies by Sagar Kumar.",
};

export default function WorkPage() {
  const studies = getAllCaseStudies().filter(
    (s) => s.slug !== "jio-ai-chat-zolo-approach",
  );
  const related = getAllCaseStudies().find(
    (s) => s.slug === "jio-ai-chat-zolo-approach",
  );

  return (
    <div className="relative" data-page="work" data-scroll-mode="vertical">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fff_0%,#f5f5f5_35%,#fff_100%)]"
      />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p
            className="text-xs uppercase tracking-[0.18em] text-muted"
            data-reveal-item
          >
            Selected projects
          </p>
          <h1
            className="mt-3 font-display text-[clamp(3rem,8vw,6rem)] tracking-tight text-ink"
            data-reveal-item
          >
            Work{" "}
            <span className="text-accent">({studies.length})</span>
          </h1>
          <p
            className="mt-5 max-w-2xl text-lg text-muted md:text-xl"
            data-reveal-item
          >
            Case studies from consumer platforms and partner systems. Deep pages
            first for Jio AI Chat and PayU Partners — covers below are
            typographic placeholders until final mockups ship.
          </p>
        </Reveal>

        {/* Hook for a future horizontal desktop work strip */}
        <div
          className="mt-16 border-t border-ground-strong"
          data-scroll-hook="work-index"
          data-horizontal-ready="true"
        >
          <Reveal>
            {studies.map((study, index) => (
              <ProjectLink key={study.slug} study={study} index={index} featured={index < 2} />
            ))}
          </Reveal>
        </div>

        {related ? (
          <Reveal className="mt-16 border-t border-ground-strong pt-10">
            <p
              className="text-xs uppercase tracking-[0.16em] text-soft"
              data-reveal-item
            >
              Related research framing
            </p>
            <p className="mt-3 max-w-2xl text-muted" data-reveal-item>
              {related.title} is an alternate / deeper framing of AI Chat — kept
              as related MDX rather than a separate featured card.
            </p>
            <Link
              href={`/work/${related.slug}`}
              className="mt-4 inline-flex text-sm text-ink underline decoration-accent/50 underline-offset-4 hover:text-accent"
              data-reveal-item
            >
              Read {related.title}
            </Link>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
