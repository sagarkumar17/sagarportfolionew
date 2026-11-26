import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { contactDetails } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sagar Kumar for product design collaborations.",
};

export default function ContactPage() {
  return (
    <div className="relative" data-page="contact" data-scroll-mode="vertical">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_10%,#f5f5f5_0%,transparent_50%)]"
      />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <p
              className="text-xs uppercase tracking-[0.18em] text-muted"
              data-reveal-item
            >
              Contact
            </p>
            <h1
              className="mt-3 max-w-xl font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] tracking-[-0.03em] text-ink"
              data-reveal-item
            >
              Let&apos;s connect
            </h1>
            <p
              className="mt-6 max-w-lg text-lg text-muted md:text-xl"
              data-reveal-item
            >
              Have a brand, website, or product idea in mind? Share a few details
              — {contactDetails.response}
            </p>

            <ul className="mt-12 space-y-8" data-reveal-item>
              <li>
                <p className="text-xs uppercase tracking-[0.14em] text-soft">
                  Email
                </p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="mt-2 inline-flex items-center gap-3 font-display text-2xl text-ink transition-colors hover:text-accent md:text-3xl"
                >
                  <Mail size={20} strokeWidth={1.5} className="text-accent" />
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <p className="text-xs uppercase tracking-[0.14em] text-soft">
                  Phone
                </p>
                <a
                  href={`tel:${contactDetails.phoneTel}`}
                  className="mt-2 inline-flex items-center gap-3 font-display text-2xl text-ink transition-colors hover:text-accent md:text-3xl"
                >
                  <Phone size={20} strokeWidth={1.5} className="text-accent" />
                  {contactDetails.phoneDisplay}
                </a>
              </li>
              <li>
                <p className="text-xs uppercase tracking-[0.14em] text-soft">
                  Location
                </p>
                <p className="mt-2 inline-flex items-center gap-3 font-display text-2xl text-ink md:text-3xl">
                  <MapPin size={20} strokeWidth={1.5} className="text-accent" />
                  {contactDetails.location}
                </p>
              </li>
            </ul>

            <p
              className="mt-12 max-w-md text-muted"
              data-reveal-item
            >
              I work with brands to define who they are, design how they show up,
              and create experiences that matter.{" "}
              <span className="font-medium text-ink">
                Less noise, more intention.
              </span>
            </p>

            <a
              href={site.pluxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-ink hover:text-accent"
              data-reveal-item
            >
              Studio · Plux
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>

            <div
              className="relative mt-14 hidden aspect-square max-w-md overflow-hidden bg-ground lg:block"
              data-reveal-item
            >
              <Image
                src="/assets/contact/contact-cap.png"
                alt=""
                fill
                className="object-contain object-center p-6"
                sizes="400px"
              />
              <span className="absolute bottom-3 left-3 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Placeholder · Figma contact frame
              </span>
            </div>
          </Reveal>

          <Reveal className="border border-ground-strong bg-background/80 p-6 md:p-10">
            <h2
              className="font-display text-3xl tracking-tight text-ink"
              data-reveal-item
            >
              Your next project
            </h2>
            <p className="mt-3 text-muted" data-reveal-item>
              Form posts to Formspree when{" "}
              <code className="font-mono text-sm text-ink">
                NEXT_PUBLIC_FORMSPREE_ID
              </code>{" "}
              is set; otherwise it opens a mailto draft to{" "}
              {contactDetails.email}.
            </p>
            <div className="mt-8" data-reveal-item>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
