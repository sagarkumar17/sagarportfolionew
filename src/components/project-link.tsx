import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isDeepCaseStudy, type CaseStudyMeta } from "@/lib/case-studies";
import { projectCoverPath } from "@/lib/content";

type ProjectLinkProps = {
  study: CaseStudyMeta;
  index?: number;
  featured?: boolean;
};

export function ProjectLink({ study, index, featured }: ProjectLinkProps) {
  const deep = isDeepCaseStudy(study.slug);
  const cover = projectCoverPath(study.slug);

  return (
    <Link
      href={`/work/${study.slug}`}
      className="group grid gap-6 border-b border-ground-strong py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-10 md:py-14"
      data-reveal-item
    >
      <div
        className={`relative overflow-hidden bg-ground ${
          featured ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        {/* SVG placeholders — swap to next/image when raster mockups land */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          Placeholder cover
        </span>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {typeof index === "number"
              ? `${String(index + 1).padStart(2, "0")} · `
              : null}
            {study.client} · {study.type}
          </p>
          {deep ? (
            <span className="bg-accent/10 px-2 py-0.5 text-[11px] uppercase tracking-wider text-accent">
              Deep
            </span>
          ) : null}
        </div>
        <h3
          className={`mt-3 font-display tracking-tight text-ink transition-colors group-hover:text-accent ${
            featured
              ? "text-3xl md:text-5xl"
              : "text-3xl md:text-4xl"
          }`}
        >
          {study.title}
        </h3>
        {study.dek ? (
          <p className="mt-3 max-w-xl text-muted md:text-lg">{study.dek}</p>
        ) : null}
        <span className="mt-6 inline-flex items-center gap-2 text-sm text-ink transition-colors group-hover:text-accent">
          View study
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
