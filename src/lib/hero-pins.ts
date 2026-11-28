/** Sagar project pins for the hero plate — never James employers. */

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

/** Positions tuned to plate.jpg midground terraces / hills. */
export const HERO_PINS: HeroPin[] = [
  {
    id: "plux",
    label: "Plux",
    meta: "Studio",
    href: "https://pluxstudio.in/",
    x: 22,
    y: 46,
    depth: 2,
    accent: true,
  },
  {
    id: "jio",
    label: "Jio",
    meta: "AI Chat",
    href: "/work/jio-ai-chat",
    x: 58,
    y: 32,
    depth: 3,
  },
  {
    id: "payu",
    label: "PayU",
    meta: "Super App",
    href: "/work/payu-super-app",
    x: 72,
    y: 44,
    depth: 2,
  },
  {
    id: "cn",
    label: "CN",
    meta: "Express",
    href: "/work/cn-express-pass",
    x: 46,
    y: 52,
    depth: 1,
  },
  {
    id: "me",
    label: "Me",
    meta: "Bangalore",
    href: "/about",
    x: 34,
    y: 66,
    depth: 1,
    initial: "SK",
  },
];
