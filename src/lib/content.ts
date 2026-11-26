import { site } from "@/lib/site";

/** Improvised from live site zeros + Figma About stats — confirm before launch. */
export const stats = [
  {
    value: "10+",
    label: "Years crafting",
    note: "Graphic → product design",
  },
  {
    value: "24+",
    label: "Clients trusted",
    note: "Startups to platforms",
  },
  {
    value: "40+",
    label: "Products shipped",
    note: "Web, mobile, systems",
  },
  {
    value: "92%",
    label: "Repeat / referral",
    note: "Placeholder until verified",
  },
] as const;

export const services = [
  {
    title: "Digital product",
    body: "UX/UI for consumer apps, partner platforms, and dashboards — from early prototypes to production-ready systems that stay clear at scale.",
  },
  {
    title: "Brand systems",
    body: "Voice, identity, and visual language that hold together across product, marketing, and motion — thoughtful, distinctive, and durable.",
  },
  {
    title: "Craft & production",
    body: "Motion, illustration, and high-fidelity assets that carry the same editorial standard from concept through launch.",
  },
] as const;

export const faqs = [
  {
    q: "How long does a typical engagement take?",
    a: "Discovery and direction usually land in 1–2 weeks. A focused product or brand sprint runs 3–6 weeks. Larger platform work is scoped in phases so we can ship, learn, and keep momentum.",
  },
  {
    q: "Do you work custom or from templates?",
    a: "Custom by default. Templates are useful references, but shipping work is designed for your product, audience, and constraints — not a theme with swapped logos.",
  },
  {
    q: "Will the work hold up on mobile?",
    a: "Yes. Layouts and motion are designed mobile-first when the product needs it, and always tested across breakpoints before handoff.",
  },
  {
    q: "Can you partner through Plux Studio?",
    a: `Yes. Independent work and studio collaborations both run through Plux. See ${site.pluxUrl.replace(/\/$/, "")} for the studio practice.`,
  },
] as const;

export const beliefs = [
  {
    title: "Clarity above cleverness",
    body: "Every screen earns its place. Strip anything that doesn’t help someone decide, so the important actions feel obvious.",
  },
  {
    title: "Systems over one-offs",
    body: "Individual screens are cheap; systems compound. Reusable patterns from day one mean the next feature ships in days, not weeks.",
  },
  {
    title: "Design with real data",
    body: "Empty states and hero screenshots lie. Sketch with realistic content and edge cases so what ships holds up in production.",
  },
  {
    title: "Iterate in the open",
    body: "Share flows, prototypes, and rough thinking early so the team can steer before decisions harden.",
  },
] as const;

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location: string;
  body: string;
  href?: string;
};

/**
 * Experience timeline. Jio dates on the live Framer site looked corrupted
 * (overlapping 2013–2026); sequence below follows PayU → Jio → Plux.
 */
export const experience: ExperienceItem[] = [
  {
    role: "Founder · Independent designer",
    org: "Plux Studio",
    period: "2026 — Present",
    location: "Bangalore",
    href: site.pluxUrl,
    body: "Building Plux as a product-design studio: editorial taste, systems that scale, and high-craft experiences for ambitious teams.",
  },
  {
    role: "Senior / Lead Product Designer",
    org: "Jio Platforms",
    period: "Jan 2023 — 2026",
    location: "Bangalore",
    body: "Cross-functional product design across consumer platforms — conversational AI, consent, and operations tools used at national scale.",
  },
  {
    role: "Senior / Lead Product Designer",
    org: "PayU Payments",
    period: "Oct 2021 — Jan 2023",
    location: "Bangalore",
    body: "Seamless transactional platforms for enterprise and SMB merchants — onboarding, partner ecosystems, and money-management flows.",
  },
  {
    role: "Senior Lead Experience Designer",
    org: "Infosys Digital",
    period: "Jul 2019 — Oct 2021",
    location: "Pune",
    body: "Client digital experiences with measurable engagement lifts; led 150+ design pre-sales / RFPs and studio revenue management.",
  },
  {
    role: "Product Designer",
    org: "GRIT Innovations",
    period: "Jul 2018 — Jul 2019",
    location: "Hyderabad",
    body: "Internal products across security, people ops, maps, and data — research, IA, interaction, visual design, and testing on web and mobile.",
  },
  {
    role: "UX / UI Designer",
    org: "Insta9 Innovative",
    period: "Earlier",
    location: "India",
    body: "Analytics-informed website and iOS work — research statements, low-fidelity flows, and competitive visual analysis.",
  },
];

export const contactDetails = {
  email: site.email,
  phoneDisplay: "+91 70668 72321",
  phoneTel: "+917066872321",
  location: "Bangalore, India",
  response: "Usually replies within 24 hours.",
} as const;

export function projectCoverPath(slug: string) {
  return `/assets/work/covers/${slug}.svg`;
}
