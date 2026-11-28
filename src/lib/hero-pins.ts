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

export const HERO_PINS: HeroPin[] = [
  {
    id: "plux",
    label: "Plux",
    meta: "Studio",
    href: "https://pluxstudio.in/",
    x: 18,
    y: 42,
    depth: 2,
    accent: true,
  },
  {
    id: "jio",
    label: "Jio",
    meta: "AI Chat",
    href: "/work/jio-ai-chat",
    x: 62,
    y: 28,
    depth: 3,
  },
  {
    id: "payu",
    label: "PayU",
    meta: "Super App",
    href: "/work/payu-super-app",
    x: 74,
    y: 48,
    depth: 2,
  },
  {
    id: "cn",
    label: "CN",
    meta: "Express",
    href: "/work/cn-express-pass",
    x: 48,
    y: 58,
    depth: 1,
  },
  {
    id: "me",
    label: "Me",
    meta: "Bangalore",
    href: "/about",
    x: 28,
    y: 68,
    depth: 1,
    initial: "SK",
  },
];
