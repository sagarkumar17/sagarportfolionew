import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MdxContent } from "@/components/mdx-content";
import {
  getCaseStudy,
  getCaseStudySlugs,
  isDeepCaseStudy,
} from "@/lib/case-studies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study" };
  return {
    title: study.meta.title,
    description: study.meta.summary ?? study.meta.dek,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { meta, content } = study;
  const deep = isDeepCaseStudy(slug);

  return (
    <article className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        All work
      </Link>

      <header className="mt-10 max-w-4xl border-b border-ground-strong pb-12">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            {meta.client} · {meta.type}
          </p>
          {deep ? (
            <span className="rounded-sm bg-accent/10 px-2 py-0.5 text-[11px] uppercase tracking-wider text-accent">
              Deep case study
            </span>
          ) : null}
        </div>
        <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] tracking-[-0.03em] text-ink">
          {meta.title}
        </h1>
        {meta.dek ? (
          <p className="mt-6 max-w-2xl font-script text-2xl text-accent md:text-3xl">
            {meta.dek}
          </p>
        ) : null}
        {meta.summary ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {meta.summary}
          </p>
        ) : null}

        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Role", value: meta.role },
            { label: "Platform", value: meta.platform },
            { label: "Timeline", value: meta.timeline },
            { label: "Scope", value: meta.scope },
          ]
            .filter((item) => item.value)
            .map((item) => (
              <div key={item.label}>
                <dt className="text-xs uppercase tracking-[0.14em] text-soft">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-dark">
                  {item.value}
                </dd>
              </div>
            ))}
        </dl>
      </header>

      <div className="mt-14">
        <MdxContent source={content} />
      </div>

      <aside className="mt-20 border-t border-ground-strong pt-10">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
        >
          More work
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </Link>
      </aside>
    </article>
  );
}
