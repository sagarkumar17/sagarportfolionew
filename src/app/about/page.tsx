import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button, Container, Section, TextLink } from "@/components/ui";
import { beliefs, experience, stats } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sagar Kumar — independent product designer and founder of Plux Studio.",
};

export default function AboutPage() {
  return (
    <div data-page="about" data-scroll-mode="vertical">
      <Container className="py-16 tablet:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-primary">
            <Image
              src="/assets/about/about-section.png"
              alt=""
              fill
              priority
              className="object-cover object-[15%_center] grayscale"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div>
            <p className="type-label text-text-secondary">About</p>
            <h1 className="type-display mt-3 text-text-primary">
              Hi, I&apos;m {site.name}
            </h1>
            <p className="type-small mt-3 text-text-secondary">
              Senior / Lead product designer
            </p>
            <p className="type-body-lg mt-8 max-w-xl text-text-secondary">
              I design products by connecting user needs, business goals, and how
              the product works as a whole. Features never live alone — they
              shape entry, value, return, and what the team can build next.
            </p>
            <p className="type-body mt-5 max-w-xl text-text-secondary">
              I prefer short iterations, learning from real use, and partnering
              with engineers from the start. Unpopular opinion: product designers
              should know how to code — it clarifies constraints earlier and
              ships better decisions.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-border-default pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="type-h2 text-text-primary">{stat.value}</p>
              <p className="type-label mt-2 text-text-primary">{stat.label}</p>
              <p className="type-small mt-1 text-text-secondary">{stat.note}</p>
            </div>
          ))}
        </div>
      </Container>

      <Section label="Experience">
        <h2 className="type-h2 text-text-primary">Experience</h2>
        <p className="type-body mt-4 max-w-2xl text-text-secondary">
          Independent since 2026 through Plux Studio. Prior product work across
          Jio, PayU, Infosys, and earlier studios.
        </p>

        <ol className="mt-12 divide-y divide-border-default border-y border-border-default">
          {experience.map((job) => {
            const inner = (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="type-label text-accent">
                    {job.period}
                    {job.location ? ` · ${job.location}` : null}
                  </p>
                  {job.href ? (
                    <span className="inline-flex items-center gap-1 type-small text-text-secondary group-hover:text-accent">
                      pluxstudio.in
                      <ArrowUpRight size={14} strokeWidth={1.5} />
                    </span>
                  ) : null}
                </div>
                <h3 className="type-h3 mt-3 text-text-primary transition-colors group-hover:text-accent">
                  {job.org}
                </h3>
                <p className="type-small mt-1 text-text-secondary">{job.role}</p>
                <p className="type-body mt-4 max-w-2xl text-text-secondary">
                  {job.body}
                </p>
              </>
            );

            return (
              <li key={`${job.org}-${job.period}`} className="py-10">
                {job.href ? (
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div>{inner}</div>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      <Section soft>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="type-h2 text-text-primary">What I believe</h2>
            <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-surface-secondary">
              <Image
                src="/assets/about/plux-home.png"
                alt="Plux Studio reference"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className="divide-y divide-border-default border-y border-border-default">
            {beliefs.map((item) => (
              <div key={item.title} className="py-7">
                <h3 className="type-h3 text-text-primary">{item.title}</h3>
                <p className="type-body mt-2 text-text-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="type-h3 max-w-xl text-text-primary">
            Available for select collaborations through Plux.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact">
              Contact
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </Button>
            <Button href={site.pluxUrl} variant="outline" external>
              Visit Plux
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
        <TextLink href={site.pluxUrl} external className="mt-6 inline-flex">
          pluxstudio.in →
        </TextLink>
      </Section>
    </div>
  );
}
