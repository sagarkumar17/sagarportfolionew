import type { Metadata } from "next";
import {
  Button,
  Container,
  HeroMotionDemo,
  Placeholder,
  PreloaderMotionDemo,
  ProjectCard,
  Section,
  Tag,
  TextLink,
} from "@/components/ui";
import { getAllCaseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Styleguide",
  description:
    "Design system for Sagar Kumar portfolio — colour, type, components, spacing, motion.",
};

const principles = [
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
    b: "Opacity, blur, and fill only — nothing scales on hover. Motion lands one section at a time.",
  },
] as const;

const colourTokens = [
  {
    name: "Surface / Primary",
    note: "Soft panels",
    swatch: "bg-surface-primary",
    values: "Light #EFEFEF / Dark #0F0F0E",
  },
  {
    name: "Surface / Secondary",
    note: "Page background and inputs",
    swatch: "bg-surface-secondary border border-border-default",
    values: "Light #FFFFFF / Dark #1A1917",
  },
  {
    name: "Surface / Inverse",
    note: "Dark fills",
    swatch: "bg-surface-inverse text-text-inverse",
    values: "Light #111111 / Dark #F0EDE6",
  },
  {
    name: "Text / Primary",
    note: "Headings and main text",
    swatch: "bg-surface-secondary border border-border-default text-text-primary",
    values: "Light #111111 / Dark #F0EDE6",
  },
  {
    name: "Text / Secondary",
    note: "Paragraphs and meta",
    swatch: "bg-surface-secondary border border-border-default text-text-secondary",
    values: "Light #8A8A8A / Dark #8F8A82",
  },
  {
    name: "Accent / Primary",
    note: "Plux red — used sparingly",
    swatch: "bg-accent text-accent-foreground",
    values: "#dc1618 both modes",
  },
] as const;

const typeRows = [
  {
    name: "Display",
    meta: "120 / 72 / 48 · weight 600 · tracking −6%",
    className: "type-display",
    sample: "Brands you can hold",
  },
  {
    name: "Heading 2",
    meta: "64 / 42 / 34 · weight 600 · tracking −4.5%",
    className: "type-h2",
    sample: "Brands you can hold",
  },
  {
    name: "Heading 3",
    meta: "40 / 22 / 20 · weight 600 · tracking −3.5%",
    className: "type-h3",
    sample: "Brands you can hold",
  },
  {
    name: "Body Large",
    meta: "26 / 19 / 18 · weight 500 · tracking −2%",
    className: "type-body-lg",
    sample: "I design products and systems for ambitious teams.",
  },
  {
    name: "Body",
    meta: "17 / 15 / 15 · weight 400 · tracking −1%",
    className: "type-body",
    sample: "Most projects start with one conversation and end up in production.",
  },
  {
    name: "Small",
    meta: "14 · weight 500 · tracking −1%",
    className: "type-small",
    sample: "Featured work",
  },
  {
    name: "Label",
    meta: "11 · weight 500 · tracking +2% · uppercase",
    className: "type-label",
    sample: "Project details",
  },
] as const;

export default function StyleguidePage() {
  const samples = getAllCaseStudies()
    .filter((s) => s.slug !== "jio-ai-chat-zolo-approach")
    .slice(0, 3);

  return (
    <div data-page="styleguide">
      {/* Hero — Maël composition: huge title, blurb, meta row */}
      <Container className="pb-0 pt-16 tablet:pt-20 desktop:pt-24">
        <h1 className="type-display text-text-primary">Styleguide</h1>
        <p className="type-body-lg mt-8 max-w-3xl text-text-secondary desktop:mt-10">
          The system behind this portfolio: principles, colour, type, components,
          spacing, motion and sound. Adapted from Maël Blanc with Plux accent{" "}
          <span className="text-accent">#dc1618</span>. Use it as a reference,
          then keep shipping pages on these tokens.
        </p>

        <div className="mt-14 flex items-baseline justify-between gap-4 border-t border-border-default pt-5 tablet:mt-16">
          <p className="type-small text-text-primary">{site.name}</p>
          <p className="type-small text-text-secondary">(Version 1.0)</p>
        </div>
      </Container>

      {/* Principles — 4 columns, soft panel cards */}
      <Section label="Principles" count={4}>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 desktop:grid-cols-4 desktop:gap-5">
          {principles.map((item, i) => (
            <li
              key={item.t}
              className="flex min-h-[240px] flex-col bg-surface-primary p-6 tablet:min-h-[280px] tablet:p-7"
            >
              <p className="type-small text-text-secondary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="type-h3 mt-6 text-text-primary">{item.t}</h2>
              <p className="type-body mt-auto pt-8 text-text-secondary">
                {item.b}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Colour */}
      <Section label="Colour" count={12} soft>
        <div className="grid gap-5 sm:grid-cols-2 desktop:grid-cols-3">
          {colourTokens.map((token) => (
            <div key={token.name}>
              <div
                className={`flex h-36 flex-col justify-end p-5 ${token.swatch}`}
              >
                <span className="type-small">{token.note}</span>
              </div>
              <p className="type-small mt-4 text-text-primary">{token.name}</p>
              <p className="type-small mt-1 text-text-secondary">{token.values}</p>
            </div>
          ))}
        </div>
        <p className="type-body mt-12 max-w-2xl text-text-secondary">
          The site follows the visitor’s light or dark setting (ThemeToggle).
          Static white / black keep text readable on photos in both modes. Accent
          is Plux red only — sparingly.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 desktop:grid-cols-3">
          <Placeholder kind="wide" className="aspect-[16/9] object-cover" />
          <Placeholder kind="square" className="aspect-square object-cover" />
          <Placeholder kind="portrait" className="aspect-[3/4] object-cover" />
        </div>
      </Section>

      {/* Typography */}
      <Section label="Typography" count={7}>
        <p className="type-body mb-12 max-w-2xl text-text-secondary">
          Inter is the only typeface (Maël Blanc). Sizes below are desktop /
          tablet / phone. Variable Inter with optical sizing for large display
          lines.
        </p>
        <ul className="divide-y divide-border-default border-y border-border-default">
          {typeRows.map((row) => (
            <li key={row.name} className="grid gap-4 py-10 desktop:grid-cols-[12rem_1fr]">
              <div>
                <p className="type-small text-text-primary">{row.name}</p>
                <p className="type-small mt-2 text-text-secondary">{row.meta}</p>
              </div>
              <p className={`${row.className} text-text-primary`}>{row.sample}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Components */}
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
          <TextLink href={`mailto:${site.email}`} external>
            Email {site.shortName}
          </TextLink>
          <Tag>Product</Tag>
          <Tag tone="accent">Deep</Tag>
        </div>

        <div className="mt-16">
          <p className="type-small mb-6 text-text-secondary">
            Project cards · placeholder covers
          </p>
          <div className="grid gap-8 desktop:grid-cols-12 desktop:gap-6">
            {samples[0] ? (
              <div className="desktop:col-span-7">
                <ProjectCard study={samples[0]} index={0} size="large" />
              </div>
            ) : null}
            {samples[1] ? (
              <div className="desktop:col-span-5">
                <ProjectCard study={samples[1]} index={1} size="small" />
              </div>
            ) : null}
          </div>
          {samples[2] ? (
            <div className="mt-10">
              <ProjectCard study={samples[2]} index={2} size="wide" />
            </div>
          ) : null}
        </div>
      </Section>

      {/* Layout */}
      <Section label="Layout" count={4} soft>
        <dl className="grid gap-8 sm:grid-cols-2">
          {[
            ["Breakpoints", "Desktop ≥1200 · Tablet 810–1199 · Phone ≤809"],
            ["Side margins", "32px desktop/tablet · 20px phone"],
            ["Section padding", "120 / 96 / 80"],
            ["Work grid", "Full → 7+5 → Full → 5+7"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="type-small text-text-secondary">{k}</dt>
              <dd className="type-body mt-2 text-text-primary">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Placeholder kind="wide" />
          </div>
          <div className="col-span-12 tablet:col-span-7">
            <Placeholder kind="large" />
          </div>
          <div className="col-span-12 tablet:col-span-5">
            <Placeholder kind="square" />
          </div>
        </div>
      </Section>

      {/* Motion · Preloader (section 0) */}
      <Section label="Motion · Preloader" count={1}>
        <PreloaderMotionDemo />
      </Section>

      {/* Motion · Hero (section 2) */}
      <Section label="Motion · Hero" count={1} soft>
        <HeroMotionDemo />
      </Section>

      <Section label="Sound" count={1}>
        <p className="type-body-lg max-w-2xl text-text-secondary">
          Inspired by gowthamganesan.com. Default muted. Toggle lives in the nav
          next to theme — soft click / whoosh cues and a quiet ambient pad when
          enabled. Preloader exit whoosh respects this mute.
        </p>
      </Section>
    </div>
  );
}
