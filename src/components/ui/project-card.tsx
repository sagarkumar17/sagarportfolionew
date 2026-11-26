"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSound } from "@/components/sound-provider";
import {
  isDeepCaseStudy,
  type CaseStudyMeta,
} from "@/lib/case-studies-shared";
import { projectCoverPath } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Tag } from "./tag";

export type ProjectCardSize = "wide" | "large" | "small";

type ProjectCardProps = {
  study: CaseStudyMeta;
  index?: number;
  size?: ProjectCardSize;
  className?: string;
};

/**
 * Editorial project showcase — Wide / Large / Small.
 * Image-led; not a vanilla equal card grid. Hover darkens image + shows label
 * (no scale — motion paused).
 */
export function ProjectCard({
  study,
  index,
  size = "large",
  className,
}: ProjectCardProps) {
  const { play } = useSound();
  const deep = isDeepCaseStudy(study.slug);
  const cover = projectCoverPath(study.slug);

  const aspect =
    size === "wide"
      ? "aspect-[21/9] md:aspect-[24/10]"
      : size === "large"
        ? "aspect-[16/10]"
        : "aspect-[4/3]";

  const titleClass =
    size === "wide"
      ? "type-h2"
      : size === "large"
        ? "type-h3"
        : "type-h3 md:text-[22px]";

  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn("group block", className)}
      data-reveal-item
      onClick={() => play("whoosh")}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-surface-primary",
          aspect,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt=""
          className="h-full w-full object-cover transition-[filter,opacity] duration-300 group-hover:brightness-75"
        />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-between gap-4 bg-gradient-to-t from-static-black/50 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="type-label text-static-white">View case study</span>
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            className="text-static-white"
          />
        </div>
        {typeof index === "number" ? (
          <span className="absolute left-4 top-4 type-label text-static-white/80">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <p className="type-label text-text-secondary">
          {study.client} · {study.type}
        </p>
        {deep ? <Tag tone="accent">Deep</Tag> : null}
      </div>
      <h3
        className={cn(
          "mt-2 text-text-primary transition-colors group-hover:text-accent",
          titleClass,
        )}
      >
        {study.title}
      </h3>
      {study.dek && size !== "small" ? (
        <p className="type-body mt-3 max-w-xl text-text-secondary">{study.dek}</p>
      ) : null}
    </Link>
  );
}

type ProjectShowcaseProps = {
  studies: CaseStudyMeta[];
  className?: string;
};

type ShowcaseRow =
  | { kind: "full"; study: CaseStudyMeta; index: number }
  | {
      kind: "pair";
      layout: "7-5" | "5-7";
      left: { study: CaseStudyMeta; index: number };
      right?: { study: CaseStudyMeta; index: number };
    };

/** Maël Blanc work rhythm: full → 7+5 → full → 5+7. */
function buildShowcaseRows(studies: CaseStudyMeta[]): ShowcaseRow[] {
  const rows: ShowcaseRow[] = [];
  let i = 0;
  let cycle = 0;

  while (i < studies.length) {
    if (cycle % 2 === 0) {
      rows.push({ kind: "full", study: studies[i], index: i });
      i += 1;
    } else {
      const left = { study: studies[i], index: i };
      const right =
        i + 1 < studies.length
          ? { study: studies[i + 1], index: i + 1 }
          : undefined;
      rows.push({
        kind: "pair",
        layout: cycle % 4 === 1 ? "7-5" : "5-7",
        left,
        right,
      });
      i += right ? 2 : 1;
    }
    cycle += 1;
  }

  return rows;
}

/**
 * Maël Blanc work rhythm: full → 7+5 → full → 5+7.
 */
export function ProjectShowcase({ studies, className }: ProjectShowcaseProps) {
  const rows = buildShowcaseRows(studies);

  return (
    <div className={cn("flex flex-col gap-10 md:gap-12", className)}>
      {rows.map((row) => {
        if (row.kind === "full") {
          return (
            <ProjectCard
              key={row.study.slug}
              study={row.study}
              index={row.index}
              size="wide"
            />
          );
        }

        const leftSpan = row.layout === "7-5" ? "md:col-span-7" : "md:col-span-5";
        const rightSpan = row.layout === "7-5" ? "md:col-span-5" : "md:col-span-7";

        return (
          <div
            key={`pair-${row.left.study.slug}`}
            className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6"
          >
            <div className={leftSpan}>
              <ProjectCard
                study={row.left.study}
                index={row.left.index}
                size={row.layout === "7-5" ? "large" : "small"}
              />
            </div>
            {row.right ? (
              <div className={rightSpan}>
                <ProjectCard
                  study={row.right.study}
                  index={row.right.index}
                  size={row.layout === "7-5" ? "small" : "large"}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
