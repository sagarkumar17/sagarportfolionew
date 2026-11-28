/**
 * Hero landmark locations — verified from sagarkumar.work / LinkedIn / content.ts.
 * SADAD is a client engagement (testimonial), not employment — no invented dates.
 */

export type HeroMetric = {
  value: string;
  label: string;
};

export type HeroLocation = {
  id: string;
  label: string;
  /** Year or year range shown on marker — verified only */
  years: string;
  role: string;
  headline: string;
  summary: string;
  logoSrc: string;
  logoAlt: string;
  href?: string;
  /** Percent coords on the plate (0–100) */
  x: number;
  y: number;
  depth: 1 | 2 | 3;
  accent?: boolean;
  /** Camera focus target (relative to plate center) */
  focus: { scale: number; x: number; y: number };
  metrics?: HeroMetric[];
  gallery?: string[];
  kind: "employment" | "studio" | "client" | "self";
  initial?: string;
};

export const HERO_LOCATIONS: HeroLocation[] = [
  {
    id: "plux",
    label: "Plux Studio",
    years: "2020 — Present",
    role: "Founder · Design Director",
    headline: "Boutique product design studio",
    summary:
      "Running Plux with a small team on product design, brand identity, and UX strategy — from zero-to-one products to design-system foundations for startups and mid-size companies.",
    logoSrc: "/assets/logos/plux.png",
    logoAlt: "Plux Studio",
    href: "https://pluxstudio.in/",
    x: 22,
    y: 48,
    depth: 2,
    accent: true,
    focus: { scale: 1.85, x: 18, y: 8 },
    kind: "studio",
    gallery: ["/assets/about/plux-home.png"],
  },
  {
    id: "jio",
    label: "Jio",
    years: "2023 — 2026",
    role: "Lead Product Designer",
    headline: "AI chat & advertising systems at national scale",
    summary:
      "Designed and scaled AI-powered conversational support across Jio/RIL platforms, plus a centralized advertising-component repository for multi-domain businesses.",
    logoSrc: "/assets/logos/jio.svg",
    logoAlt: "Jio",
    href: "/work/jio-ai-chat",
    x: 40,
    y: 30,
    depth: 3,
    focus: { scale: 2.05, x: -6, y: 10 },
    kind: "employment",
    metrics: [
      { value: "2.6 → 4.2", label: "CSAT" },
      { value: "55–60%", label: "Fewer support calls" },
      { value: "+80%", label: "Advertiser CX" },
    ],
    gallery: [
      "/assets/work/covers/jio-ai-chat.svg",
      "/assets/work/covers/jio-consent.svg",
    ],
  },
  {
    id: "payu",
    label: "PayU",
    years: "2021 — 2023",
    role: "Senior Product Designer",
    headline: "Payments platforms merchants actually keep using",
    summary:
      "Led UX for high-transaction merchant platforms — partner ecosystems, onboarding, and money-management flows for enterprise and SMB merchants.",
    logoSrc: "/assets/logos/payu.png",
    logoAlt: "PayU",
    href: "/work/payu-super-app",
    x: 52,
    y: 36,
    depth: 2,
    focus: { scale: 2.0, x: -14, y: 6 },
    kind: "employment",
    metrics: [{ value: "+25%", label: "Merchant retention" }],
    gallery: [
      "/assets/work/covers/payu-super-app.svg",
      "/assets/work/covers/payu-partners.svg",
    ],
  },
  {
    id: "infosys",
    label: "Infosys",
    years: "2019 — 2021",
    role: "Senior Lead Experience Designer",
    headline: "Client digital experiences with measurable lifts",
    summary:
      "Transformed client goals into digital experiences; led 150+ design pre-sales / RFPs and studio revenue management while lifting engagement and satisfaction.",
    logoSrc: "/assets/logos/infosys.svg",
    logoAlt: "Infosys",
    href: "/work",
    x: 66,
    y: 38,
    depth: 2,
    focus: { scale: 1.95, x: -26, y: 6 },
    kind: "employment",
    metrics: [
      { value: "+30%", label: "Engagement" },
      { value: "+40%", label: "Client satisfaction" },
      { value: "150+", label: "Design RFPs led" },
    ],
  },
  {
    id: "sadad",
    label: "SADAD",
    years: "Client",
    role: "Design collaboration · via Plux",
    headline: "Payments experience for SADAD Payments, Qatar",
    summary:
      "Client engagement through Plux Studio. Public testimonial from Osama Almaliki (SADAD Payments, Qatar) — exact project dates are not published, so years are not invented here.",
    logoSrc: "/assets/logos/sadad.png",
    logoAlt: "SADAD",
    href: "/contact",
    x: 86,
    y: 46,
    depth: 1,
    focus: { scale: 1.9, x: -38, y: 2 },
    kind: "client",
  },
  {
    id: "me",
    label: "Me",
    years: "Bangalore",
    role: "Lead product designer",
    headline: "hey, I'm Sagar — with Whisky",
    summary:
      "Independent product designer and founder of Plux Studio. Based in Bangalore. Exploring select collaborations after Jio Platforms (Jan 2023 — Jul 2026).",
    logoSrc: "",
    logoAlt: "Sagar Kumar",
    href: "/about",
    x: 14,
    y: 74,
    depth: 1,
    focus: { scale: 1.55, x: 22, y: -8 },
    kind: "self",
    initial: "SK",
  },
];

/** Back-compat alias used by older imports */
export type HeroPin = HeroLocation;
export const HERO_PINS = HERO_LOCATIONS;
