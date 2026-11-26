import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MdxContent } from "@/components/mdx-content";
import { Container, Tag } from "@/components/ui";
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
    <article>
      <Container className="py-12 tablet:py-20">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 type-small text-text-secondary transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          All work
        </Link>

        <header className="mt-10 max-w-4xl border-b border-border-default pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <p className="type-label text-text-secondary">
              {meta.client} · {meta.type}
            </p>
            {deep ? <Tag tone="accent">Deep case study</Tag> : null}
          </div>
          <h1 className="type-display mt-4 text-text-primary">{meta.title}</h1>
          {meta.dek ? (
            <p className="type-body-lg mt-6 text-accent">{meta.dek}</p>
          ) : null}
          {meta.summary ? (
            <p className="type-body mt-6 max-w-2xl text-text-secondary">
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
                  <dt className="type-label text-text-secondary">{item.label}</dt>
                  <dd className="type-small mt-2 text-text-primary">
                    {item.value}
                  </dd>
                </div>
              ))}
          </dl>
        </header>

        <div className="mt-14">
          <MdxContent source={content} />
        </div>

        <aside className="mt-20 border-t border-border-default pt-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 type-small text-text-primary transition-colors hover:text-accent"
          >
            More work
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </aside>
      </Container>
    </article>
  );
}
