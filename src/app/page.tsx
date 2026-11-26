import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { MegaBrand } from "@/components/mega-brand";
import {
  Button,
  Container,
  ProjectShowcase,
  Section,
  TextLink,
} from "@/components/ui";
import { services, stats } from "@/lib/content";
import { getAllCaseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = getAllCaseStudies()
    .filter((c) => c.slug !== "jio-ai-chat-zolo-approach")
    .slice(0, 5);

  return (
    <div data-page="home" data-scroll-mode="vertical">
      {/* Hero — brand first, one composition */}
      <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-between tablet:min-h-[calc(100svh-4rem)]">
        <Container className="flex flex-1 flex-col justify-center pb-8 pt-16 tablet:pb-10 tablet:pt-24">
          <p className="type-label text-accent">Product design</p>
          <h1 className="type-display mt-5 max-w-5xl text-text-primary">
            Let&apos;s create{" "}
            <span className="text-accent">ideas</span> together.
          </h1>
          <p className="type-body-lg mt-8 max-w-xl text-text-secondary">
            I help businesses find their voice, shape their identity, and connect
            with their audience. Less talk. More craft.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/work">
              View work
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </Button>
            <Button href="/contact" variant="outline">
              Start a project
            </Button>
          </div>
        </Container>
        <div className="relative overflow-hidden pb-6">
          <MegaBrand />
        </div>
      </section>

      {/* Featured work — editorial showcase, not plain cards */}
      <Section
        id="work"
        label="Featured work"
        count={featured.length}
        action={<TextLink href="/work">See all work →</TextLink>}
      >
        <div data-scroll-hook="work-strip">
          <ProjectShowcase studies={featured} />
        </div>
      </Section>

      {/* About teaser — midpoint split */}
      <Section soft>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-primary">
            <Image
              src="/assets/about/about-section.png"
              alt=""
              fill
              className="object-cover object-[18%_center] grayscale"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <div>
            <p className="type-label text-text-secondary">About</p>
            <h2 className="type-h2 mt-3 text-text-primary">
              Hi, I&apos;m {site.name}
            </h2>
            <p className="type-small mt-3 text-text-secondary">
              Lead product designer · Founder, Plux Studio
            </p>
            <blockquote className="type-body-lg mt-8 border-l-2 border-accent pl-5 text-text-primary">
              Good design is never just decoration — it&apos;s how people
              understand, remember, and trust your brand.{" "}
              <span className="text-accent">
                I make sure every detail tells the right story.
              </span>
            </blockquote>
            <p className="type-body mt-8 max-w-lg text-text-secondary">
              My journey started in graphic design long before product. Years of
              branding, freelance, and college web work built the foundation —
              now applied to platforms at national scale, and through{" "}
              <a
                href={site.pluxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary underline decoration-accent/50 underline-offset-4 hover:text-accent"
              >
                Plux Studio
              </a>
              .
            </p>
            <TextLink href="/about" className="mt-8 inline-flex items-center gap-2">
              About me
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </TextLink>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section>
        <p className="type-body max-w-xl text-text-secondary">
          Some numbers I&apos;m proud of — reflective of partnerships and shipped
          work.
        </p>
        <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="type-h2 text-text-primary">{stat.value}</dd>
              <p className="type-label mt-3 text-text-primary">{stat.label}</p>
              <p className="type-small mt-1 text-text-secondary">{stat.note}</p>
            </div>
          ))}
        </dl>
      </Section>

      {/* Services */}
      <Section label="Services" count={services.length} soft>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="type-h2 text-text-primary">
              A focused practice spanning product, identity and craft.
            </h2>
            <p className="type-body mt-5 text-text-secondary">
              Help brands move people, spark action, and stand out — digital,
              identity, and production under one craft standard.
            </p>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-surface-primary">
              <Image
                src="/assets/services/services.png"
                alt=""
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className="flex flex-col divide-y divide-border-default border-y border-border-default">
            {services.map((service, i) => (
              <div key={service.title} className="py-8">
                <p className="type-label text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="type-h3 mt-2 text-text-primary">{service.title}</h3>
                <p className="type-body mt-3 max-w-xl text-text-secondary">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section label="FAQs">
        <h2 className="type-h2 mb-12 max-w-2xl text-text-primary">
          Quick answers
        </h2>
        <FaqAccordion />
      </Section>

      {/* Contact band */}
      <Section inverse>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-label text-accent">Let&apos;s work together</p>
            <h2 className="type-h2 mt-3 max-w-xl text-text-inverse">
              Turn concepts into precise product experiences.
            </h2>
          </div>
          <Button href="/contact" variant="accent">
            Get in touch
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </Section>
    </div>
  );
}
