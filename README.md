# Sagar Kumar — Portfolio

Next.js App Router portfolio for [sagarkumar.site](https://sagarkumar.site/).

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS v4
- **GSAP** + ScrollTrigger + **Lenis** (vertical smooth scroll; horizontal hooks via `data-scroll-axis` / `data-horizontal-ready`)
- **lucide-react** icons
- **MDX** case studies via `next-mdx-remote` + `gray-matter`
- Fonts: Geist, Playfair Display, Caveat (`next/font`)
- Accent: Plux red `#dc1618`

## Routes

| Path | Notes |
|------|--------|
| `/` | Editorial hero, featured work, about teaser, stats, services, FAQ, contact CTA |
| `/work` | Case study index from `content/case-studies/` |
| `/work/[slug]` | MDX case study pages |
| `/about` | Bio, stats, experience (Plux → [pluxstudio.in](https://pluxstudio.in/)), beliefs |
| `/contact` | Details + contact form (Formspree or mailto) |

Deep v1 case studies: **jio-ai-chat**, **payu-partners**.

## Assets

Placeholders live in [`public/assets/`](./public/assets/) — see [`public/assets/README.md`](./public/assets/README.md). Figma / Plux captures are marked on-page; work covers are generated SVG stand-ins.

## Contact form env

Copy [`.env.example`](./.env.example):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form id — when set, Contact POSTs there |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional mailto override (default `hello@sagarkumar.site`) |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` | Documented stubs for a future server route (not wired yet) |

Without Formspree, submit opens a **mailto** draft with the form fields.

## Develop

```bash
pnpm install
pnpm dev
```

```bash
pnpm build
pnpm start
```

Node 20+ or 22 LTS. Package manager: **pnpm**.
