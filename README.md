# OK Plumbing

Marketing site for ok-plumbing.com. Built with Next.js 16, React 19, Tailwind v4,
shadcn/ui, Framer Motion. Deploys to Vercel from GitHub main.

## Develop

```bash
pnpm install
pnpm dev
```

## Test

```bash
pnpm test         # unit (Vitest)
pnpm test:e2e     # Playwright (requires pnpm exec playwright install)
```

## Build

```bash
pnpm build
```

## Project structure

- `app/` — Next.js App Router routes
- `components/` — UI primitives (shadcn), layout, sections, motion
- `lib/` — content single-source-of-truth, SEO helpers, utils
- `docs/superpowers/specs/` — full design spec
- `docs/superpowers/plans/` — phased implementation plans

## Content

All copy lives in `lib/content.ts`. Replace `{{PLACEHOLDER}}` tokens with
real values before launch (see spec §8 Open Items).
