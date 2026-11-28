/** Sagar landmark pins — tied to distinct buildings on the hero plate. */

export type HeroPin = {
  id: string;
  label: string;
  meta: string;
  href?: string;
  /** Percent positions on the plate */
  x: number;
  y: number;
  /** Depth layer for parallax (1–3) */
  depth: 1 | 2 | 3;
  accent?: boolean;
  initial?: string;
};

/**
 * Positions tuned to plate-day/night v3 architecture (tight camera):
 * Plux loft (left) · Jio tower · PayU cylinder · Infosys campus · SADAD bank · Me.
 */
export const HERO_PINS: HeroPin[] = [
  {
    id: "plux",
    label: "Plux",
    meta: "Studio",
    href: "https://pluxstudio.in/",
    x: 20,
    y: 50,
    depth: 2,
    accent: true,
  },
  {
    id: "jio",
    label: "Jio",
    meta: "Campus",
    href: "/work/jio-ai-chat",
    x: 38,
    y: 28,
    depth: 3,
  },
  {
    id: "payu",
    label: "PayU",
    meta: "Fintech",
    href: "/work/payu-super-app",
    x: 52,
    y: 36,
    depth: 2,
  },
  {
    id: "infosys",
    label: "Infosys",
    meta: "Campus",
    href: "/work",
    x: 66,
    y: 38,
    depth: 2,
  },
  {
    id: "sadad",
    label: "SADAD",
    meta: "Finance",
    href: "/work",
    x: 88,
    y: 46,
    depth: 1,
  },
  {
    id: "me",
    label: "Me",
    meta: "Bangalore",
    href: "/about",
    x: 14,
    y: 76,
    depth: 1,
    initial: "SK",
  },
];
