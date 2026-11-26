import type { Metadata } from "next";
import { Container, ProjectShowcase, TextLink } from "@/components/ui";
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
    <div data-page="work" data-scroll-mode="vertical">
      <Container className="py-16 tablet:py-24">
        <p className="type-label text-text-secondary">Selected projects</p>
        <h1 className="type-display mt-3 text-text-primary">
          Work <span className="text-accent">({studies.length})</span>
        </h1>
        <p className="type-body-lg mt-5 max-w-2xl text-text-secondary">
          Case studies from consumer platforms and partner systems. Editorial
          showcase — not a plain card grid.
        </p>

        <div
          className="mt-16"
          data-scroll-hook="work-index"
          data-horizontal-ready="true"
        >
          <ProjectShowcase studies={studies} />
        </div>

        {related ? (
          <div className="mt-16 border-t border-border-default pt-10">
            <p className="type-label text-text-secondary">
              Related research framing
            </p>
            <p className="type-body mt-3 max-w-2xl text-text-secondary">
              {related.title} is an alternate framing of AI Chat — kept as
              related MDX rather than a separate featured card.
            </p>
            <TextLink href={`/work/${related.slug}`} className="mt-4 inline-flex">
              Read {related.title}
            </TextLink>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
