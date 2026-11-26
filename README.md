# Sagar Kumar — Portfolio

Next.js App Router portfolio for [sagarkumar.site](https://sagarkumar.site/).

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS v4
- **GSAP** + ScrollTrigger + **Lenis** (vertical smooth scroll; horizontal-ready shell)
- **lucide-react** icons
- **MDX** case studies via `next-mdx-remote` + `content/case-studies/`
- Fonts: Geist, Playfair Display, Caveat (`next/font`)
- Accent: Plux red `#dc1618`

## Routes

| Path | Notes |
|------|--------|
| `/` | Editorial hero + featured deep case studies |
| `/work` | Case study index |
| `/work/[slug]` | MDX case study pages |
| `/about` | Bio + experience → [pluxstudio.in](https://pluxstudio.in/) |
| `/contact` | Contact stubs |

Deep v1 case studies: **jio-ai-chat**, **payu-partners**.

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
