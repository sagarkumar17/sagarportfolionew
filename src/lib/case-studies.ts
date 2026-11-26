import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/case-studies");

export type CaseStudyMeta = {
  title: string;
  slug: string;
  client: string;
  type: "B2C" | "B2B" | string;
  mockup_scroll?: boolean;
  dek?: string;
  summary?: string;
  role?: string;
  platform?: string;
  timeline?: string;
  scope?: string;
  v1_priority?: number;
  format?: string;
  source?: string;
  status?: string;
  team?: string;
  related?: string | string[];
  note?: string;
};

export type CaseStudy = {
  meta: CaseStudyMeta;
  content: string;
};

function isMdxFile(name: string) {
  return name.endsWith(".mdx") || name.endsWith(".md");
}

export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(isMdxFile)
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  return getCaseStudySlugs()
    .map((slug) => getCaseStudy(slug)?.meta)
    .filter((meta): meta is CaseStudyMeta => Boolean(meta))
    .sort((a, b) => (a.v1_priority ?? 99) - (b.v1_priority ?? 99));
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      title: String(data.title ?? slug),
      slug: String(data.slug ?? slug),
      client: String(data.client ?? ""),
      type: String(data.type ?? ""),
      mockup_scroll: Boolean(data.mockup_scroll),
      dek: data.dek ? String(data.dek) : undefined,
      summary: data.summary ? String(data.summary) : undefined,
      role: data.role ? String(data.role) : undefined,
      platform: data.platform ? String(data.platform) : undefined,
      timeline: data.timeline ? String(data.timeline) : undefined,
      scope: data.scope ? String(data.scope) : undefined,
      v1_priority:
        typeof data.v1_priority === "number" ? data.v1_priority : undefined,
      format: data.format ? String(data.format) : undefined,
      source: data.source ? String(data.source) : undefined,
      status: data.status ? String(data.status) : undefined,
      team: data.team ? String(data.team) : undefined,
      related: data.related,
      note: data.note ? String(data.note) : undefined,
    },
    content,
  };
}

/** Deep v1 case studies shipped with full MDX pages first. */
export const DEEP_CASE_STUDY_SLUGS = ["jio-ai-chat", "payu-partners"] as const;

export function isDeepCaseStudy(slug: string) {
  return (DEEP_CASE_STUDY_SLUGS as readonly string[]).includes(slug);
}
