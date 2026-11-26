import type { Metadata } from "next";
import {
  Button,
  Container,
  ProjectCard,
  Section,
  Tag,
  TextLink,
} from "@/components/ui";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Styleguide",
  description:
    "Design system for Sagar Kumar portfolio — colour, type, components, spacing.",
};

const surfaces = [
  { name: "Surface / Primary", token: "bg-surface-primary", note: "Soft panels" },
  { name: "Surface / Secondary", token: "bg-surface-secondary border border-border-default", note: "Page / inputs" },
  { name: "Surface / Inverse", token: "bg-surface-inverse", note: "Dark fills", invert: true },
] as const;

const textSwatches = [
  { name: "Text / Primary", className: "text-text-primary" },
  { name: "Text / Secondary", className: "text-text-secondary" },
  { name: "Accent", className: "text-accent" },
] as const;

const typeRows = [
  { name: "Display", className: "type-display", sample: "Brands you can hold" },
  { name: "Heading 2", className: "type-h2", sample: "Brands you can hold" },
  { name: "Heading 3", className: "type-h3", sample: "Brands you can hold" },
  {
    name: "Body Large",
    className: "type-body-lg",
    sample: "I design products and systems for ambitious teams.",
  },
  {
    name: "Body",
    className: "type-body",
    sample: "Most projects start with one conversation and end up in production.",
  },
  { name: "Small", className: "type-small", sample: "Featured work" },
  { name: "Label", className: "type-label", sample: "Project details" },
] as const;

export default function StyleguidePage() {
  const sample = getAllCaseStudies().filter(
    (s) => s.slug !== "jio-ai-chat-zolo-approach",
  )[0];

  return (
    <div data-page="styleguide">
      <Container className="py-16 tablet:py-24">
        <p className="type-label text-text-secondary">Styleguide · Version 1.0</p>
        <h1 className="type-display mt-4 max-w-4xl text-text-primary">
          The system behind this portfolio
        </h1>
        <p className="type-body-lg mt-8 max-w-2xl text-text-secondary">
          Principles, colour, type, components and spacing — adapted from Maël
          Blanc, with Plux accent{" "}
          <span className="text-accent">#dc1618</span>. Light and dark. Motion
          paused.
        </p>
      </Container>

      <Section label="Principles" count={4}>
        <ol className="grid gap-10 md:grid-cols-2">
          {[
            {
              t: "Quiet and editorial",
              b: "Large type, large images and plenty of space. One idea per section.",
            },
            {
              t: "Colour comes from the work",
              b: "The interface stays near-monochrome so photography carries the colour.",
            },
            {
              t: "Two lines to align to",
              b: "Everything sits on the page margins or on the page midpoint.",
            },
            {
              t: "Calm UI",
              b: "Hover changes fill or opacity only. Motion libraries are stubbed for now.",
            },
          ].map((item, i) => (
            <li key={item.t} className="border-t border-border-default pt-6">
              <p className="type-label text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="type-h3 mt-3 text-text-primary">{item.t}</h2>
              <p className="type-body mt-3 text-text-secondary">{item.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Colour" count={12} soft>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {surfaces.map((s) => (
            <div key={s.name}>
              <div
                className={`flex h-28 items-end p-4 ${s.token} ${"invert" in s && s.invert ? "text-text-inverse" : "text-text-primary"}`}
              >
                <span className="type-small">{s.note}</span>
              </div>
              <p className="type-small mt-3 text-text-primary">{s.name}</p>
            </div>
          ))}
          <div>
            <div className="flex h-28 items-end bg-accent p-4 text-accent-foreground">
              <span className="type-small">Plux · #dc1618</span>
            </div>
            <p className="type-small mt-3 text-text-primary">Accent / Primary</p>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-8">
          {textSwatches.map((t) => (
            <p key={t.name} className={`type-body-lg ${t.className}`}>
              {t.name}
            </p>
          ))}
        </div>
        <p className="type-body mt-8 max-w-xl text-text-secondary">
          Mode follows system preference or ThemeToggle in the nav. Static white
          / black keep text readable on photos in both modes.
        </p>
      </Section>

      <Section label="Typography" count={7}>
        <p className="type-body mb-12 max-w-xl text-text-secondary">
          Inter is the only typeface (Maël Blanc). Sizes: desktop / tablet /
          phone.
        </p>
        <ul className="divide-y divide-border-default border-y border-border-default">
          {typeRows.map((row) => (
            <li key={row.name} className="grid gap-4 py-10 md:grid-cols-[10rem_1fr]">
              <p className="type-label text-text-secondary">{row.name}</p>
              <p className={`${row.className} text-text-primary`}>{row.sample}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Components" count={6}>
        <div className="flex flex-wrap gap-4">
          <Button href="/contact">Start a project</Button>
          <Button href="/work" variant="outline">
            See the work
          </Button>
          <Button href="/contact" variant="accent">
            Get in touch
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 bg-surface-inverse p-8">
          <Button href="/contact" variant="light">
            Start a project
          </Button>
          <Button href="/work" variant="outline-light">
            See the work
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <TextLink href="/work">View case study →</TextLink>
          <TextLink href="mailto:hello@sagarkumar.site" external>
            Email Sagar
          </TextLink>
          <Tag>Product</Tag>
          <Tag tone="accent">Deep</Tag>
        </div>
        {sample ? (
          <div className="mt-16 max-w-3xl">
            <p className="type-label mb-6 text-text-secondary">Project Card</p>
            <ProjectCard study={sample} index={0} size="large" />
          </div>
        ) : null}
      </Section>

      <Section label="Layout" count={4}>
        <dl className="grid gap-8 sm:grid-cols-2">
          {[
            ["Breakpoints", "Desktop ≥1200 · Tablet 810–1199 · Phone ≤809"],
            ["Side margins", "32px desktop/tablet · 20px phone"],
            ["Section padding", "120 / 96 / 80"],
            ["Work grid", "Full → 7+5 → Full → 5+7"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="type-label text-text-secondary">{k}</dt>
              <dd className="type-body mt-2 text-text-primary">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="Motion" count={1} soft>
        <p className="type-body-lg max-w-2xl text-text-secondary">
          Paused. GSAP, Lenis, and reveal choreography are stubbed. Prefer
          opacity and fill changes only until motion is re-enabled.
        </p>
      </Section>

      <Section label="Sound" count={1}>
        <p className="type-body-lg max-w-2xl text-text-secondary">
          Inspired by gowthamganesan.com. Default muted. Toggle lives in the nav
          next to theme — soft click / whoosh cues and a quiet ambient pad when
          enabled. Assets:{" "}
          <code className="type-small text-text-primary">
            public/assets/audio/
          </code>
          .
        </p>
      </Section>
    </div>
  );
}
