import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllCaseStudies, isDeepCaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product design case studies by Sagar Kumar.",
};

export default function WorkPage() {
  const studies = getAllCaseStudies();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Selected projects</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight text-ink md:text-7xl">
        Work
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Case studies from product work across consumer platforms and partner
        systems. Deep pages first for Jio AI Chat and PayU Partners.
      </p>

      <ul className="mt-16 divide-y divide-ground-strong border-y border-ground-strong">
        {studies.map((study) => {
          const deep = isDeepCaseStudy(study.slug);
          return (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="group grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {String(study.v1_priority ?? "—").padStart(2, "0")} ·{" "}
                      {study.client}
                    </p>
                    {deep ? (
                      <span className="rounded-sm bg-accent/10 px-2 py-0.5 text-[11px] uppercase tracking-wider text-accent">
                        Deep
                      </span>
                    ) : null}
                    {study.mockup_scroll ? (
                      <span className="text-[11px] uppercase tracking-wider text-soft">
                        Mockup scroll
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-2 font-display text-3xl tracking-tight text-ink transition-colors group-hover:text-accent md:text-4xl">
                    {study.title}
                  </h2>
                  {study.dek ? (
                    <p className="mt-2 max-w-2xl text-muted">{study.dek}</p>
                  ) : null}
                </div>
                <ArrowUpRight
                  className="text-soft transition-colors group-hover:text-accent"
                  size={22}
                  strokeWidth={1.25}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
