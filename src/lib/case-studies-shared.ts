/** Client-safe case study types + helpers (no node:fs). */

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

/** Deep v1 case studies shipped with full MDX pages first. */
export const DEEP_CASE_STUDY_SLUGS = ["jio-ai-chat", "payu-partners"] as const;

export function isDeepCaseStudy(slug: string) {
  return (DEEP_CASE_STUDY_SLUGS as readonly string[]).includes(slug);
}
