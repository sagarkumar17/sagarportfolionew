import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container, TextLink } from "@/components/ui";
import { contactDetails } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sagar Kumar for product design collaborations.",
};

export default function ContactPage() {
  return (
    <div data-page="contact" data-scroll-mode="vertical">
      <Container className="py-16 tablet:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="type-label text-text-secondary">Contact</p>
            <h1 className="type-display mt-3 max-w-xl text-text-primary">
              Let&apos;s connect
            </h1>
            <p className="type-body-lg mt-6 max-w-lg text-text-secondary">
              Have a brand, website, or product idea in mind? Share a few details
              — {contactDetails.response}
            </p>

            <ul className="mt-12 space-y-8">
              <li>
                <p className="type-label text-text-secondary">Email</p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="mt-2 inline-flex items-center gap-3 type-h3 text-text-primary transition-colors hover:text-accent"
                >
                  <Mail size={20} strokeWidth={1.5} className="text-accent" />
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <p className="type-label text-text-secondary">Phone</p>
                <a
                  href={`tel:${contactDetails.phoneTel}`}
                  className="mt-2 inline-flex items-center gap-3 type-h3 text-text-primary transition-colors hover:text-accent"
                >
                  <Phone size={20} strokeWidth={1.5} className="text-accent" />
                  {contactDetails.phoneDisplay}
                </a>
              </li>
              <li>
                <p className="type-label text-text-secondary">Location</p>
                <p className="mt-2 inline-flex items-center gap-3 type-h3 text-text-primary">
                  <MapPin size={20} strokeWidth={1.5} className="text-accent" />
                  {contactDetails.location}
                </p>
              </li>
            </ul>

            <p className="type-body mt-12 max-w-md text-text-secondary">
              I work with brands to define who they are, design how they show up,
              and create experiences that matter.{" "}
              <span className="font-medium text-text-primary">
                Less noise, more intention.
              </span>
            </p>

            <TextLink
              href={site.pluxUrl}
              external
              className="mt-8 inline-flex items-center gap-2"
            >
              Studio · Plux
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </TextLink>

            <div className="relative mt-14 hidden aspect-square max-w-md overflow-hidden bg-surface-primary lg:block">
              <Image
                src="/assets/contact/contact-cap.png"
                alt=""
                fill
                className="object-contain object-center p-6"
                sizes="400px"
              />
            </div>
          </div>

          <div className="border border-border-default bg-surface-primary p-6 tablet:p-10">
            <h2 className="type-h3 text-text-primary">Your next project</h2>
            <p className="type-body mt-3 text-text-secondary">
              Form posts to Formspree when{" "}
              <code className="type-small text-text-primary">
                NEXT_PUBLIC_FORMSPREE_ID
              </code>{" "}
              is set; otherwise it opens a mailto draft to {contactDetails.email}.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
