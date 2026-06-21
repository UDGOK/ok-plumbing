# OK Plumbing — Phase 1: Foundation + Design System + Home

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Next.js 15 project, establish the design system (tokens, fonts, motion primitives, layout shell), and ship a fully-animated, accessible Home page that proves the system end-to-end. Subsequent phases replicate this pattern across the other 15 routes.

**Architecture:** Next.js 15 App Router + React 19 Server Components, Tailwind CSS v4 (CSS-first config) with theme tokens as CSS variables, shadcn/ui on Radix, Framer Motion for animation, next/font for self-hosted Fraunces + Inter. Single source of truth for content/SEO in `lib/content.ts` and `lib/seo.ts`.

**Tech Stack:** Next.js 15, React 19, Tailwind v4, shadcn/ui, Radix, Framer Motion, next/font, next-themes, Lucide, TypeScript 5, pnpm, Vitest + Testing Library + Playwright.

**Reference spec:** `docs/superpowers/specs/2026-06-21-ok-plumbing-design.md`

---

## File Structure (this phase)

Files created/modified in Phase 1:

```
ok-plumbing/
├─ package.json                         ← deps + scripts
├─ pnpm-workspace.yaml                  ← pnpm config
├─ tsconfig.json                        ← path alias @/*
├─ next.config.ts                       ← image config, strict mode
├─ postcss.config.mjs                   ← tailwindcss + autoprefixer
├─ app/globals.css                      ← tokens (light/dark), base, motion-reduce
├─ app/layout.tsx                       ← root: fonts, theme provider, analytics, skip link
├─ app/(marketing)/layout.tsx           ← shared header + footer
├─ app/(marketing)/page.tsx             ← home (composes sections)
├─ app/sitemap.ts                       ← stub (home only this phase)
├─ app/robots.ts
├─ app/opengraph-image.tsx              ← default OG via @vercel/og
├─ components/
│  ├─ ui/                               ← shadcn primitives (button, sheet, accordion, navigation-menu)
│  ├─ layout/
│  │  ├─ site-header.tsx                ← sticky nav + mega-menus + mobile sheet + CTAs
│  │  ├─ site-footer.tsx
│  │  ├─ container.tsx                  ← max-width wrapper
│  │  └─ brass-divider.tsx              ← signature SVG divider
│  ├─ sections/
│  │  ├─ hero.tsx                       ← home hero w/ parallax
│  │  ├─ trust-bar.tsx                  ← marquee ticker
│  │  ├─ services-grid.tsx              ← 6 services (data-driven)
│  │  ├─ process.tsx                    ← 3-step
│  │  ├─ areas-teaser.tsx
│  │  ├─ reviews-preview.tsx            ← static fallback this phase
│  │  ├─ geo-faq.tsx                    ← accordion + JSON-LD
│  │  └─ cta-band.tsx
│  └─ motion/
│     ├─ reveal.tsx                     ← IntersectionObserver fade/reveal
│     ├─ parallax.tsx                   ← scroll parallax
│     ├─ marquee.tsx                    ← CSS marquee
│     └─ use-reduced-motion.ts          ← hook
├─ lib/
│  ├─ content.ts                        ← services, areas, faqs, site config (single source)
│  ├─ seo.ts                            ← JSON-LD helpers (LocalBusiness, FAQPage, Breadcrumb)
│  └─ utils.ts                          ← cn() class merge
├─ tests/
│  ├─ lib/content.test.ts
│  ├─ lib/seo.test.ts
│  ├─ components/motion/reveal.test.tsx
│  ├─ components/sections/geo-faq.test.tsx
│  └─ e2e/home.spec.ts                  ← Playwright smoke
├─ public/
│  ├─ fonts/                            ← (next/font handles; dir reserved)
│  └─ images/                           ← placeholders
└─ .env.example
```

Each motion component is isolated and unit-tested independently. Each section is a self-contained Server Component (or Client only when it needs interactivity). `lib/content.ts` and `lib/seo.ts` are pure functions — fast to test.

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: entire project via `create-next-app`
- Modify: `package.json`, `tsconfig.json`, `next.config.ts`

- [ ] **Step 1: Scaffold into a temp dir, then merge into existing repo**

The `ok-plumbing/` dir already has a git history (spec commit). We scaffold into a sibling temp dir and move files in.

Run:
```bash
cd C:/Users/Yasir/ZCodeProject
pnpm create next-app@latest ok-plumbing-tmp --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-pnpm --no-turbopack
```

Answer any interactive prompt with defaults. If pnpm warns about peer deps, accept.

- [ ] **Step 2: Move scaffolded files into ok-plumbing (preserve docs/ and .gitignore)**

Run (Windows bash):
```bash
cd C:/Users/Yasir/ZCodeProject
# Move everything except .git, docs, .gitignore, .skills, .superpowers
for item in ok-plumbing-tmp/* ok-plumbing-tmp/.*; do
  name=$(basename "$item")
  case "$name" in
    .|..) continue;;
  esac
  mv "$item" "ok-plumbing/$name" 2>/dev/null || true
done
rm -rf ok-plumbing-tmp
```

- [ ] **Step 3: Verify the move**

Run:
```bash
cd C:/Users/Yasir/ZCodeProject/ok-plumbing
ls -la
cat package.json | head -20
```

Expected: `package.json` exists with `next` 15.x, `react` 19.x; `docs/` still present; `.git` intact.

- [ ] **Step 4: Add additional dependencies**

Run:
```bash
cd C:/Users/Yasir/ZCodeProject/ok-plumbing
pnpm add framer-motion next-themes lucide-react clsx tailwind-merge class-variance-authority @vercel/analytics @vercel/speed-insights
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test
```

- [ ] **Step 5: Add dev/test scripts to package.json**

Modify `package.json` `scripts`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

- [ ] **Step 6: Verify dev server boots**

Run:
```bash
cd C:/Users/Yasir/ZCodeProject/ok-plumbing
pnpm dev
```

Expected: server starts at http://localhost:3000, default Next.js page renders. Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
cd C:/Users/Yasir/ZCodeProject/ok-plumbing
git add -A
git commit -m "chore: scaffold Next.js 15 + Tailwind v4 project"
```

---

## Task 2: shadcn/ui initialization + base components

**Files:**
- Create: `components/ui/*`, `lib/utils.ts`
- Modify: `app/globals.css` (shadcn vars merge)

- [ ] **Step 1: Initialize shadcn**

Run:
```bash
cd C:/Users/Yasir/ZCodeProject/ok-plumbing
pnpm dlx shadcn@latest init -d
```

Accept the defaults. This creates `components.json` and `lib/utils.ts` with `cn()`.

- [ ] **Step 2: Install the primitives Phase 1 needs**

Run:
```bash
cd C:/Users/Yasir/ZCodeProject/ok-plumbing
pnpm dlx shadcn@latest add button sheet accordion navigation-menu
```

- [ ] **Step 3: Verify utils.ts has cn()**

Run:
```bash
cd C:/Users/Yasir/ZCodeProject/ok-plumbing
cat lib/utils.ts
```

Expected: exports `cn(...inputs: ClassValue[])` using `clsx` + `tailwind-merge`. If shadcn named it differently, rename to `cn`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: init shadcn/ui + base primitives"
```

---

## Task 3: Design tokens (Palette B, both themes)

**Files:**
- Modify: `app/globals.css` (replace shadcn defaults with our tokens)

- [ ] **Step 1: Write the failing test for token presence**

Create `tests/lib/tokens.test.ts`:

```typescript
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from 'vitest';

const css = readFileSync(join(process.cwd(), 'app', 'globals.css'), 'utf8');

test('light theme defines all tokens from spec §3', () => {
  const lightBlock = css.match(/:root\s*{([\s\S]*?)}/)?.[1] ?? '';
  const expected = [
    '--background', '--surface', '--surface-muted', '--foreground',
    '--foreground-muted', '--accent', '--accent-foreground',
    '--brass', '--brass-foreground', '--border', '--ring',
    '--radius', '--radius-lg', '--radius-sm',
  ];
  for (const token of expected) {
    expect(lightBlock, `missing ${token} in :root`).toContain(token);
  }
});

test('dark theme mirrors tokens under [data-theme="dark"] or .dark', () => {
  const darkBlock = css.match(/(?:\[data-theme="dark"\]|\.dark)\s*{([\s\S]*?)}/)?.[1] ?? '';
  expect(darkBlock.length, 'dark theme block not found').toBeGreaterThan(100);
  expect(darkBlock).toContain('--background');
  expect(darkBlock).toContain('--accent');
});

test('palette B hex values are present', () => {
  expect(css).toContain('#EFEEEA'); // linen
  expect(css).toContain('#3F7A6B'); // verdigris
  expect(css).toContain('#B08D43'); // patina brass
  expect(css).toContain('#222B2F'); // charcoal
});
```

- [ ] **Step 2: Run the test, verify it fails**

Run:
```bash
cd C:/Users/Yasir/ZCodeProject/ok-plumbing
pnpm test tests/lib/tokens.test.ts
```

Expected: FAIL — shadcn's default globals.css doesn't contain Palette B hex values.

- [ ] **Step 3: Replace globals.css tokens with our spec**

Overwrite `app/globals.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

:root {
  /* Palette B — Light (per spec §3) */
  --background: #EFEEEA;            /* linen */
  --surface: #FFFFFF;
  --surface-muted: #D9D6CE;         /* stone */
  --foreground: #222B2F;            /* charcoal — 13.8:1 on linen */
  --foreground-muted: #4A575C;      /* gunmetal */
  --accent: #3F7A6B;                /* verdigris — 5.6:1 on linen */
  --accent-foreground: #FFFFFF;
  --brass: #B08D43;                 /* patina brass */
  --brass-foreground: #1A1A1A;      /* 6.9:1 on brass */
  --border: #D9D6CE;
  --ring: #3F7A6B;

  --radius-sm: 4px;
  --radius: 8px;
  --radius-lg: 14px;

  --shadow-sm: 0 1px 2px rgba(34, 43, 47, 0.05);
  --shadow: 0 4px 24px rgba(34, 43, 47, 0.06);
}

[data-theme="dark"] {
  --background: #222B2F;            /* charcoal */
  --surface: #2C363B;
  --surface-muted: #37424A;
  --foreground: #EFEEEA;            /* linen — 13.4:1 on charcoal */
  --foreground-muted: #B8C0C4;
  --accent: #5BAA97;                /* verdigris light — 5.9:1 on charcoal */
  --accent-foreground: #0F1517;
  --brass: #C9A55C;                 /* antique brass */
  --brass-foreground: #1A1A1A;      /* 8.2:1 */
  --border: #3A454C;
  --ring: #5BAA97;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
}

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-surface-muted: var(--surface-muted);
  --color-foreground: var(--foreground);
  --color-foreground-muted: var(--foreground-muted);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-brass: var(--brass);
  --color-brass-foreground: var(--brass-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);

  --radius-sm: var(--radius-sm);
  --radius: var(--radius);
  --radius-lg: var(--radius-lg);

  --font-display: var(--font-fraunces);
  --font-sans: var(--font-inter);
}

@layer base {
  * {
    border-color: var(--border);
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  :focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
  /* prefers-reduced-motion backstop (spec §5) */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

/* Marquee keyframes (spec §5 #3) */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

- [ ] **Step 4: Run the test, verify it passes**

Run:
```bash
pnpm test tests/lib/tokens.test.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tests/lib/tokens.test.ts
git commit -m "feat(tokens): Palette B light/dark tokens with AA-verified contrast"
```

---

## Task 4: Self-hosted fonts via next/font

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add font loaders to root layout**

Modify `app/layout.tsx`. Replace the existing imports/font setup with:

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ok-plumbing.com"),
  title: {
    default: "OK Plumbing — Tulsa's Trusted Plumber",
    template: "%s · OK Plumbing",
  },
  description:
    "Family-owned plumbing for the Tulsa metro. Drain cleaning, water heaters, repipes, leak detection, sewer line, and 24/7 emergency service. Honest work, flat-rate diagnostics.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fraunces.variable, inter.variable)}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create the ThemeProvider wrapper**

Create `components/theme-provider.tsx`:

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 3: Verify build still works**

Run:
```bash
pnpm build
```

Expected: build succeeds, no font/variable errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/theme-provider.tsx
git commit -m "feat(fonts): self-host Fraunces + Inter via next/font"
```

---

## Task 5: Content single-source-of-truth (`lib/content.ts`)

**Files:**
- Create: `lib/content.ts`
- Test: `tests/lib/content.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/lib/content.test.ts`:

```typescript
import { expect, test } from "vitest";
import {
  services,
  serviceAreas,
  getFaqForContext,
  siteConfig,
} from "@/lib/content";

test("siteConfig has required NAP fields (token defaults)", () => {
  expect(siteConfig.name).toBe("OK Plumbing");
  expect(siteConfig.phone).toMatch(/^{{PHONE}}$/); // token until intake
  expect(siteConfig.email).toMatch(/@/);
  expect(siteConfig.url).toBe("https://ok-plumbing.com");
  expect(siteConfig.serviceAreaRegion).toBe("Tulsa Metro, OK");
});

test("services has exactly 6 entries matching spec §4", () => {
  expect(services).toHaveLength(6);
  const slugs = services.map((s) => s.slug);
  expect(slugs).toEqual([
    "drain-cleaning",
    "water-heaters",
    "repiping",
    "leak-detection",
    "sewer-line",
    "fixtures",
  ]);
});

test("every service has slug, name, shortDescription, icon, included items", () => {
  for (const s of services) {
    expect(s.slug).toBeTruthy();
    expect(s.name).toBeTruthy();
    expect(s.shortDescription.length).toBeGreaterThan(20);
    expect(s.iconName).toBeTruthy();
    expect(s.included.length).toBeGreaterThan(0);
  }
});

test("serviceAreas has exactly 12 cities matching spec §4", () => {
  expect(serviceAreas).toHaveLength(12);
  const expected = [
    "tulsa", "broken-arrow", "jenks", "owasso", "bixby",
    "sand-springs", "sapulpa", "claremore", "catoosa",
    "coweta", "glenpool", "collinsville",
  ];
  expect(serviceAreas.map((a) => a.slug)).toEqual(expected);
});

test("getFaqForContext returns home FAQs for home context", () => {
  const faqs = getFaqForContext({ type: "home" });
  expect(faqs.length).toBeGreaterThanOrEqual(4);
  for (const f of faqs) {
    expect(f.question.endsWith("?")).toBe(true);
    expect(f.answer.length).toBeGreaterThan(20);
  }
});

test("getFaqForContext returns service-specific FAQs", () => {
  const faqs = getFaqForContext({ type: "service", slug: "water-heaters" });
  expect(faqs.length).toBeGreaterThanOrEqual(4);
  expect(faqs.some((f) => f.question.toLowerCase().includes("water heater"))).toBe(true);
});

test("getFaqForContext returns area-specific FAQs", () => {
  const faqs = getFaqForContext({ type: "area", slug: "jenks" });
  expect(faqs.length).toBeGreaterThanOrEqual(4);
  expect(faqs.some((f) => f.question.toLowerCase().includes("jenks"))).toBe(true);
});
```

- [ ] **Step 2: Run, verify failure**

Run:
```bash
pnpm test tests/lib/content.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement lib/content.ts**

Create `lib/content.ts`:

```typescript
export type IconName =
  | "droplets"
  | "flame"
  | "git-branch"
  | "search"
  | "waves"
  | "wrench";

export interface Service {
  slug: "drain-cleaning" | "water-heaters" | "repiping" | "leak-detection" | "sewer-line" | "fixtures";
  name: string;
  shortDescription: string;
  iconName: IconName;
  included: string[];
}

export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  blurb: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export type FaqContext =
  | { type: "home" }
  | { type: "service"; slug: Service["slug"] }
  | { type: "area"; slug: string }
  | { type: "emergency" }
  | { type: "financing" }
  | { type: "contact" };

export const siteConfig = {
  name: "OK Plumbing",
  tagline: "Quiet pipes, honest work.",
  phone: "{{PHONE}}",
  emergencyPhone: "{{PHONE}}",
  email: "hello@ok-plumbing.com",
  url: "https://ok-plumbing.com",
  licenseNumber: "{{LICENSE}}",
  yearsInBusiness: "{{YEARS}}",
  serviceAreaRegion: "Tulsa Metro, OK",
  hours: "Mon–Fri 7a–6p · Emergency 24/7",
  address: {
    street: "{{STREET}}",
    city: "Tulsa",
    state: "OK",
    zip: "{{ZIP}}",
  },
  geo: { latitude: 36.154, longitude: -95.9928 },
  social: {
    google: "{{GOOGLE_BIZ_URL}}",
    facebook: "{{FACEBOOK_URL}}",
  },
} as const;

export const services: Service[] = [
  {
    slug: "drain-cleaning",
    name: "Drain Cleaning & Hydro-Jetting",
    shortDescription:
      "Cleared the right way — camera inspection first, then high-pressure hydro-jet to cut through grease, scale, and roots. No recurring clogs.",
    iconName: "droplets",
    included: ["Camera inspection", "Hydro-jetting", "Snaking", "Root removal", "Preventive maintenance plan"],
  },
  {
    slug: "water-heaters",
    name: "Water Heater Repair & Installation",
    shortDescription:
      "Tank and tankless water heater service, repair, and full replacement. We size the unit to your home, not the upsell.",
    iconName: "flame",
    included: ["Tank repair & replacement", "Tankless install", "Flush & maintenance", "Gas line to unit", "Emergency repair"],
  },
  {
    slug: "repiping",
    name: "Whole-Home Repiping",
    shortDescription:
      "Replace failing galvanized or polybutylene with PEX or copper. Clean work, minimal wall cuts, full patch-out after.",
    iconName: "git-branch",
    included: ["PEX repipe", "Copper repipe", "Slab reroute", "Wall patch-out", "Permitting"],
  },
  {
    slug: "leak-detection",
    name: "Leak Detection & Slab Leaks",
    shortDescription:
      "Electronic leak detection pinpoints the source without tearing up floors. Slab leaks, hidden pipe leaks, pressure tests.",
    iconName: "search",
    included: ["Electronic detection", "Slab leak repair", "Pressure testing", "Moisture mapping", "Insurance documentation"],
  },
  {
    slug: "sewer-line",
    name: "Sewer Line Repair & Replacement",
    shortDescription:
      "Trenchless and traditional sewer line repair. Camera scope to diagnose, then options — not a one-quote shove.",
    iconName: "waves",
    included: ["Camera scope", "Trenchless repair", "Traditional excavation", "Line replacement", "Root barrier"],
  },
  {
    slug: "fixtures",
    name: "Fixture Installation & Repair",
    shortDescription:
      "Faucets, toilets, garbage disposals, shower valves. Installed plumb, sealed clean, warranted.",
    iconName: "wrench",
    included: ["Faucet install & repair", "Toilet install", "Garbage disposal", "Shower valve", "Outdoor hose bib"],
  },
];

export const serviceAreas: ServiceArea[] = [
  { slug: "tulsa", name: "Tulsa", county: "Tulsa County", blurb: "Our home base — every Tulsa neighborhood, from Brookside to Midtown to South Tulsa." },
  { slug: "broken-arrow", name: "Broken Arrow", county: "Tulsa County", blurb: "Serving Broken Arrow homeowners and new builds across the 74012 and 74014 corridors." },
  { slug: "jenks", name: "Jenks", county: "Tulsa County", blurb: "Plumbing for Jenks families along the Arkansas River and the River District." },
  { slug: "owasso", name: "Owasso", county: "Tulsa County", blurb: "Fast dispatch to Owasso — 74055 and the surrounding growth corridor." },
  { slug: "bixby", name: "Bixby", county: "Tulsa County", blurb: "Bixby homes from the Arkansas riverbottom to the south Tulsa edges." },
  { slug: "sand-springs", name: "Sand Springs", county: "Tulsa County", blurb: "Plumbing service across Sand Springs and the 74063 area." },
  { slug: "sapulpa", name: "Sapulpa", county: "Creek County", blurb: "Serving Sapulpa — 74066 and the Route 66 corridor." },
  { slug: "claremore", name: "Claremore", county: "Rogers County", blurb: "Claremore homes and the surrounding Rogers County communities." },
  { slug: "catoosa", name: "Catoosa", county: "Rogers County", blurb: "Plumbing service for Catoosa — port district and residential alike." },
  { slug: "coweta", name: "Coweta", county: "Wagoner County", blurb: "Coweta homeowners across the 74429 area." },
  { slug: "glenpool", name: "Glenpool", county: "Tulsa County", blurb: "Plumbing for Glenpool homes and the southern Tulsa metro." },
  { slug: "collinsville", name: "Collinsville", county: "Tulsa County", blurb: "Serving Collinsville and the northern edges of the Tulsa metro." },
];

const homeFaqs: Faq[] = [
  { question: "What areas of Tulsa does OK Plumbing serve?", answer: `We serve the entire Tulsa metro — Tulsa, Broken Arrow, Jenks, Owasso, Bixby, Sand Springs, Sapulpa, Claremore, Catoosa, Coweta, Glenpool, and Collinsville. If you're in the ${siteConfig.serviceAreaRegion} and unsure, call ${siteConfig.phone} and we'll confirm.` },
  { question: "Do you offer emergency plumbing in Tulsa?", answer: `Yes. Call ${siteConfig.emergencyPhone} any time — nights, weekends, holidays. Burst pipes, sewer backups, and no-water situations take priority.` },
  { question: "How much does a service call cost?", answer: "We charge a flat-rate diagnostic fee, credited toward any repair you approve. No hourly clock, no surprise add-ons. The tech tells you the price before any work starts." },
  { question: "Are you licensed and insured in Oklahoma?", answer: `Yes — Oklahoma plumbing license ${siteConfig.licenseNumber}, fully insured, and ${siteConfig.yearsInBusiness} serving the Tulsa area.` },
  { question: "Do you work on tankless water heaters?", answer: "Yes — repair, install, and annual flush for tankless, plus traditional tank water heaters of every brand." },
  { question: "Can I finance a larger plumbing project?", answer: "Yes — we offer financing on repipes, water heater replacements, and sewer line work. See our financing page for options and how to apply." },
];

const serviceFaqs: Record<Service["slug"], Faq[]> = {
  "drain-cleaning": [
    { question: "How much does drain cleaning cost in Tulsa?", answer: "Most standard drain clears run a flat rate we quote before starting. Hydro-jetting is priced by the line and quoted after a camera scope — call for current pricing." },
    { question: "Hydro-jetting vs. snaking — what's the difference?", answer: "A snake punches through a clog. Hydro-jetting cleans the pipe walls — grease, scale, roots — so the clog doesn't come back in three months. We recommend jetting for recurring clogs and kitchen lines." },
    { question: "Can you fix tree roots in my sewer line?", answer: "Yes. We camera-scope first to see the extent, then hydro-jet to cut roots, and can install a root barrier or recommend repair if the line is cracked." },
    { question: "Will drain cleaning damage my pipes?", answer: "No — hydro-jetting uses regulated pressure appropriate to your pipe material. Older or already-broken lines get inspected first so we don't run water where it shouldn't go." },
  ],
  "water-heaters": [
    { question: "How much does a water heater cost in Tulsa?", answer: "Tank replacements typically run lower than tankless installs, but the real cost depends on the unit, gas vs. electric, and any code upgrades needed. We quote flat-rate after assessing your setup." },
    { question: "Tankless vs. tank water heater — which is right for me?", answer: "Tankless saves on energy bills and never runs out, but has a higher upfront cost. Tanks are cheaper up-front and simpler. We size to your home's actual hot water demand and tell you honestly which makes sense." },
    { question: "How long does a water heater last in Oklahoma?", answer: "Tank heaters average 8–12 years; tankless 20+. Oklahoma hard water shortens tank life — annual flushes add years." },
    { question: "My water heater is leaking — is it an emergency?", answer: "Yes — shut off power/gas and the cold-water supply, then call. A leaking tank usually means it's failed and will get worse fast." },
  ],
  repiping: [
    { question: "How much does whole-home repiping cost in Tulsa?", answer: "Repipe cost depends on home size, number of fixtures, and PEX vs. copper. We quote flat-rate after an on-site walk-through — no hourly clock." },
    { question: "PEX vs. copper — which is better?", answer: "PEX is flexible, faster to install, freeze-resistant, and less expensive. Copper is rigid, longest-lived, and traditional. We install both and recommend based on your home and budget." },
    { question: "How long does a repipe take?", answer: "Most whole-home repipes take 2–4 days for the plumbing, with water restored each evening. Wall patch-out follows as a separate phase." },
    { question: "Do you handle the drywall patch-out?", answer: "Yes — full patch, texture, and paint match are part of the job. You shouldn't need a separate contractor." },
  ],
  "leak-detection": [
    { question: "How does electronic leak detection work?", answer: "We use acoustic listening equipment and pressure testing to pinpoint a leak within inches — without tearing up floors or walls to find it." },
    { question: "What are signs of a slab leak?", answer: "Hot spots on the floor, unexplained water bill spikes, the sound of running water when nothing's on, or damp carpet/hardwood. Any of these — call us." },
    { question: "How much does slab leak repair cost in Tulsa?", answer: "Depends on whether we reroute the line, tunnel under the slab, or do a spot repair. We camera-scope and pressure-test first, then quote options." },
    { question: "Will my homeowners insurance cover a slab leak?", answer: "Often, yes — for the resulting water damage, sometimes for the repair itself. We document thoroughly so you can file your claim." },
  ],
  "sewer-line": [
    { question: "How do I know if my sewer line is broken?", answer: "Recurring backups, gurgling drains, sewage smell, or lush/soggy patches in the yard. A camera scope confirms it definitively." },
    { question: "What is trenchless sewer repair?", answer: "Trenchless lets us replace or reline a sewer line with two small access pits instead of digging up your whole yard. Faster, cleaner, less landscape damage — when the line qualifies." },
    { question: "How much does sewer line replacement cost in Tulsa?", answer: "Wide range depending on length, depth, method (trenchless vs. traditional), and what's above the line. We camera-scope and quote options before any digging." },
    { question: "Do tree roots really break sewer lines?", answer: "Yes — roots seek moisture and invade joints. Older clay or Orangeburg pipe is most vulnerable. Hydro-jetting + root barrier buys time; replacement is the permanent fix." },
  ],
  fixtures: [
    { question: "Do you install faucets and toilets I bought myself?", answer: "Yes — we'll install customer-supplied fixtures. We'll tell you up front if a unit has a known problem or doesn't meet code." },
    { question: "How much does faucet installation cost in Tulsa?", answer: "Flat-rate per fixture, quoted before we start. Includes supply lines, valves, and a leak check." },
    { question: "Can you fix a running toilet?", answer: "Yes — usually a flapper, fill valve, or flush valve. Quick repair, parts warranted." },
    { question: "Do you install garbage disposals?", answer: "Yes — including the electrical connection if a dedicated outlet is already present. If not, we'll coordinate with an electrician." },
  ],
};

const areaFaqTemplate = (area: ServiceArea): Faq[] => [
  { question: `Do you offer plumbing service in ${area.name}, OK?`, answer: `Yes — ${siteConfig.name} serves ${area.name} and the surrounding ${area.county} area. ${area.blurb}` },
  { question: `How fast can a plumber get to ${area.name}?`, answer: `Most ${area.name} calls are dispatched same-day. For emergencies call ${siteConfig.emergencyPhone} — we prioritize no-water and active-leak situations.` },
  { question: `What does a plumber cost in ${area.name}?`, answer: "Same flat-rate diagnostic as the rest of the Tulsa metro, credited toward any repair you approve. No travel surcharge within our service area." },
  { question: `Do you work on water heaters in ${area.name}?`, answer: `Yes — tank and tankless water heater repair, install, and replacement throughout ${area.name}.` },
];

export function getFaqForContext(ctx: FaqContext): Faq[] {
  switch (ctx.type) {
    case "home":
      return homeFaqs;
    case "service":
      return serviceFaqs[ctx.slug] ?? homeFaqs;
    case "area": {
      const area = serviceAreas.find((a) => a.slug === ctx.slug);
      return area ? areaFaqTemplate(area) : homeFaqs;
    }
    case "emergency":
      return [
        { question: "What counts as a plumbing emergency?", answer: "Burst or leaking pipes, sewer backup, no water, gas leak smell, or water heater failure flooding a space. If it's actively damaging your home, call now." },
        { question: "How fast can you get here?", answer: `We dispatch same-day for emergencies across the Tulsa metro. Call ${siteConfig.emergencyPhone} — we'll give you an honest ETA.` },
        { question: "Do you charge more for after-hours?", answer: "Emergency rates apply outside business hours. We tell you the rate on the phone before we come out — no surprises on the invoice." },
        { question: "What should I do while I wait?", answer: "Shut off the water at the main, kill power to any affected outlets/appliances, and move valuables out of the water path. We'll walk you through it on the call." },
      ];
    case "financing":
      return [
        { question: "What can I finance?", answer: "Repipes, water heater replacements, sewer line work, and any project over our financing minimum." },
        { question: "How do I apply?", answer: "Online in under five minutes. Soft credit pull — no score impact to shop rates. See the financing page for the application link." },
        { question: "Do you offer payment plans?", answer: "Yes — multiple term lengths and promotional periods. The tech can walk you through options after quoting the job." },
        { question: "Is there a penalty for early payoff?", answer: "No — pay off early with no fee on any of our financing plans." },
      ];
    case "contact":
      return [
        { question: "How quickly will you respond to my form?", answer: "We return contact-form submissions within one business hour during business hours. For anything urgent, call us directly." },
        { question: "What information should I include?", answer: "Your address, the service you need, and a one-line description of the problem. Photos help — text them to the number on the contact page." },
        { question: "Do you charge for an estimate?", answer: "We charge a flat-rate diagnostic that's credited to any repair you approve. Straight estimates on large projects are free." },
        { question: "What are your service hours?", answer: siteConfig.hours },
      ];
  }
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}
```

- [ ] **Step 4: Run, verify pass**

Run:
```bash
pnpm test tests/lib/content.test.ts
```

Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts tests/lib/content.test.ts
git commit -m "feat(content): single source of truth for services, areas, FAQs"
```

---

## Task 6: SEO helpers (`lib/seo.ts`)

**Files:**
- Create: `lib/seo.ts`
- Test: `tests/lib/seo.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/lib/seo.test.ts`:

```typescript
import { expect, test } from "vitest";
import {
  localBusinessJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { siteConfig, getFaqForContext } from "@/lib/content";

test("localBusinessJsonLd contains NAP and geo", () => {
  const json = localBusinessJsonLd();
  expect(json["@type"]).toBe("Plumber");
  expect(json.name).toBe(siteConfig.name);
  expect(json.telephone).toBe(siteConfig.phone);
  expect(json.areaServed).toContain("Tulsa");
  expect(json.geo.latitude).toBe(siteConfig.geo.latitude);
  expect(json.geo.longitude).toBe(siteConfig.geo.longitude);
  expect(json.url).toBe(siteConfig.url);
});

test("localBusinessJsonLd includes aggregateRating when provided", () => {
  const json = localBusinessJsonLd({ ratingValue: "4.9", reviewCount: 127 });
  expect(json.aggregateRating.ratingValue).toBe("4.9");
  expect(json.aggregateRating.reviewCount).toBe(127);
});

test("faqPageJsonLd maps FAQ array correctly", () => {
  const faqs = getFaqForContext({ type: "home" });
  const json = faqPageJsonLd(faqs);
  expect(json["@type"]).toBe("FAQPage");
  expect(json.mainEntity).toHaveLength(faqs.length);
  expect(json.mainEntity[0]["@type"]).toBe("Question");
  expect(json.mainEntity[0].name).toBe(faqs[0].question);
  expect(json.mainEntity[0].acceptedAnswer.text).toBe(faqs[0].answer);
});

test("breadcrumbJsonLd builds from path array", () => {
  const json = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Water Heaters", path: "/services/water-heaters" },
  ]);
  expect(json["@type"]).toBe("BreadcrumbList");
  expect(json.itemListElement).toHaveLength(3);
  expect(json.itemListElement[2].name).toBe("Water Heaters");
  expect(json.itemListElement[2].item).toContain("/services/water-heaters");
});
```

- [ ] **Step 2: Run, verify fail**

Run:
```bash
pnpm test tests/lib/seo.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement lib/seo.ts**

Create `lib/seo.ts`:

```typescript
import { siteConfig, type Faq } from "@/lib/content";

interface RatingInput {
  ratingValue: string;
  reviewCount: number;
}

export function localBusinessJsonLd(rating?: RatingInput) {
  const base = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: siteConfig.name,
    description: `${siteConfig.tagline} Family-owned plumbing serving the ${siteConfig.serviceAreaRegion}.`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/og-default.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      "Tulsa", "Broken Arrow", "Jenks", "Owasso", "Bixby",
      "Sand Springs", "Sapulpa", "Claremore", "Catoosa",
      "Coweta", "Glenpool", "Collinsville",
    ],
    openingHours: siteConfig.hours,
    sameAs: [siteConfig.social.google, siteConfig.social.facebook],
  };

  if (rating) {
    return {
      ...base,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.ratingValue,
        reviewCount: rating.reviewCount,
      },
    };
  }
  return base;
}

export function faqPageJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteConfig.url}${c.path}`,
    })),
  };
}
```

- [ ] **Step 4: Run, verify pass**

Run:
```bash
pnpm test tests/lib/seo.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/seo.ts tests/lib/seo.test.ts
git commit -m "feat(seo): JSON-LD helpers for LocalBusiness, FAQ, Breadcrumb"
```

---

## Task 7: Motion primitives (`components/motion/*`)

**Files:**
- Create: `components/motion/use-reduced-motion.ts`
- Create: `components/motion/reveal.tsx`
- Create: `components/motion/parallax.tsx`
- Create: `components/motion/marquee.tsx`
- Test: `tests/components/motion/reveal.test.tsx`

- [ ] **Step 1: Write failing test for Reveal**

Create `tests/setup.ts`:

```typescript
import "@testing-library/jest-dom/vitest";
```

Create `vitest.config.ts` at repo root:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
```

Create `tests/components/motion/reveal.test.tsx`:

```tsx
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/motion/reveal";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds = [];
}

describe("Reveal", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  it("renders children", () => {
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("starts hidden (opacity 0) until observed", () => {
    const { container } = render(<Reveal>content</Reveal>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.opacity).toBe("0");
  });

  it("respects prefers-reduced-motion by showing immediately", () => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const { container } = render(<Reveal>no motion</Reveal>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.opacity).toBe("1");
  });
});
```

- [ ] **Step 2: Run, verify fail**

Run:
```bash
pnpm test tests/components/motion/reveal.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement use-reduced-motion.ts**

Create `components/motion/use-reduced-motion.ts`:

```typescript
"use client";

import * as React from "react";

/**
 * Returns true when the user has requested reduced motion.
 * Spec §5 — every motion primitive must check this and short-circuit to static.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 4: Implement reveal.tsx**

Create `components/motion/reveal.tsx`:

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger index for sequential reveals. 0 = no delay. */
  index?: number;
  /** Direction the element slides in from. */
  direction?: "up" | "down" | "left" | "right" | "none";
  as?: keyof React.JSX.IntrinsicElements;
}

const OFFSET = 24; // px
const directionOffset: Record<NonNullable<RevealProps["direction"]>, string> = {
  up: `translateY(${OFFSET}px)`,
  down: `translateY(-${OFFSET}px)`,
  left: `translateX(${OFFSET}px)`,
  right: `translateX(-${OFFSET}px)`,
  none: "none",
};

export function Reveal({
  children,
  index = 0,
  direction = "up",
  className,
  as: Tag = "div",
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-40px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const style: React.CSSProperties = visible
    ? { opacity: 1, transform: "none", transitionDelay: `${index * 80}ms` }
    : {
        opacity: 0,
        transform: directionOffset[direction],
        transitionDelay: `${index * 80}ms`,
      };

  return (
    // @ts-expect-error — dynamic tag with ref
    <Tag
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform]",
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 5: Implement parallax.tsx**

Create `components/motion/parallax.tsx`:

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Scroll speed multiplier. 0.3 = background drifts slower than scroll. */
  speed?: number;
}

export function Parallax({ children, speed = 0.3, className, ...props }: ParallaxProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + window.innerHeight) * speed;
        el.style.transform = `translate3d(0, ${-offset * 0.1}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced, speed]);

  return (
    <div
      ref={ref}
      className={cn(reduced ? undefined : "will-change-transform", className)}
      {...props}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Implement marquee.tsx**

Create `components/motion/marquee.tsx`:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Duration of one full loop in seconds. */
  durationSeconds?: number;
}

/**
 * CSS-driven marquee (spec §5 #3). Decorative — caller should mark
 * the surrounding context aria-hidden if content is duplicated elsewhere.
 */
export function Marquee({
  children,
  durationSeconds = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      aria-hidden="true"
      {...props}
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `marquee-scroll ${durationSeconds}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Run tests, verify pass**

Run:
```bash
pnpm test tests/components/motion/reveal.test.tsx
```

Expected: PASS (3 tests).

- [ ] **Step 8: Commit**

```bash
git add components/motion/ tests/components/motion/ tests/setup.ts vitest.config.ts
git commit -m "feat(motion): Reveal, Parallax, Marquee primitives (reduced-motion aware)"
```

---

## Task 8: Layout shell (header, footer, container, divider)

**Files:**
- Create: `components/layout/container.tsx`
- Create: `components/layout/brass-divider.tsx`
- Create: `components/layout/site-header.tsx`
- Create: `components/layout/site-footer.tsx`
- Create: `app/(marketing)/layout.tsx`

- [ ] **Step 1: Implement container.tsx**

Create `components/layout/container.tsx`:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)}
      {...props}
    />
  );
}
```

- [ ] **Step 2: Implement brass-divider.tsx (signature element)**

Create `components/layout/brass-divider.tsx`:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Signature element (spec §1) — thin rule with a centered patina-brass
 * pipe-valve SVG. Used sparingly between major sections.
 */
export function BrassDivider({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      className={cn(
        "flex items-center justify-center gap-4 py-12",
        className,
      )}
    >
      <span className="h-px flex-1 bg-border" />
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-brass"
        aria-hidden="true"
      >
        {/* Pipe valve motif */}
        <circle cx="22" cy="22" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="22" r="2" fill="currentColor" />
        <line x1="22" y1="4" x2="22" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="28" x2="22" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="9" x2="17" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="31" x2="31" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
```

- [ ] **Step 3: Implement site-header.tsx**

Create `components/layout/site-header.tsx`:

```tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Container } from "./container";
import { cn } from "@/lib/utils";
import { services, serviceAreas, siteConfig } from "@/lib/content";

const navLinks = [
  { href: "/emergency", label: "Emergency" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-2xl font-medium tracking-tight">
          OK Plumbing
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[480px] gap-2 p-4 md:grid-cols-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <NavigationMenuLink
                          asChild
                          className="block rounded-md p-3 hover:bg-surface-muted"
                        >
                          <Link href={`/services/${s.slug}`}>
                            <div className="font-medium text-foreground">{s.name}</div>
                            <p className="line-clamp-2 text-sm text-foreground-muted">
                              {s.shortDescription}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Areas</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-1 p-4 md:grid-cols-2">
                    {serviceAreas.map((a) => (
                      <li key={a.slug}>
                        <NavigationMenuLink
                          asChild
                          className="block rounded-md p-2 text-sm hover:bg-surface-muted"
                        >
                          <Link href={`/service-areas/${a.slug}`}>{a.name}</Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navLinks.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <Link href={l.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {l.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" />
              <span className="ml-1">{siteConfig.phone}</span>
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/contact">Book Service</Link>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96">
            <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
              <Link href="/services" onClick={() => setOpen(false)} className={mobileLink}>All Services</Link>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className={cn(mobileLink, "pl-4 text-foreground-muted")}
                >
                  {s.name}
                </Link>
              ))}
              <Link href="/service-areas" onClick={() => setOpen(false)} className={mobileLink}>Service Areas</Link>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={mobileLink}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-2">
              <Button asChild>
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  <span className="ml-2">Call {siteConfig.phone}</span>
                </a>
              </Button>
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link href="/contact">Book Service</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}

const mobileLink =
  "rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-surface-muted";
```

- [ ] **Step 4: Implement site-footer.tsx**

Create `components/layout/site-footer.tsx`:

```tsx
import * as React from "react";
import Link from "next/link";
import { Container } from "./container";
import { services, serviceAreas, siteConfig } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-medium">OK Plumbing</div>
            <p className="mt-2 text-sm text-foreground-muted">{siteConfig.tagline}</p>
            <p className="mt-4 text-xs text-foreground-muted">
              License {siteConfig.licenseNumber} · {siteConfig.yearsInBusiness}
            </p>
          </div>

          <nav aria-label="Footer services">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Services
            </h2>
            <ul className="mt-3 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-foreground hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer service areas">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Service Areas
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {serviceAreas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}`}
                    className="text-sm text-foreground hover:text-accent"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Contact
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-accent">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-foreground-muted">{siteConfig.hours}</li>
              <li className="text-foreground-muted">
                {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-foreground-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-accent">Privacy</Link>
            <Link href="/terms" className="hover:text-accent">Terms</Link>
            <span className="text-brass">Built in Tulsa</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 5: Wire marketing layout**

Create `app/(marketing)/layout.tsx`:

```tsx
import * as React from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 6: Verify typecheck**

Run:
```bash
pnpm typecheck
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/layout/ "app/(marketing)/layout.tsx"
git commit -m "feat(layout): header with mega-menus, footer, container, brass divider"
```

---

## Task 9: Home page sections

**Files:**
- Create: `components/sections/hero.tsx`
- Create: `components/sections/trust-bar.tsx`
- Create: `components/sections/services-grid.tsx`
- Create: `components/sections/process.tsx`
- Create: `components/sections/areas-teaser.tsx`
- Create: `components/sections/reviews-preview.tsx`
- Create: `components/sections/geo-faq.tsx`
- Create: `components/sections/cta-band.tsx`
- Modify: `app/(marketing)/page.tsx`

- [ ] **Step 1: Implement hero.tsx**

Create `components/sections/hero.tsx`:

```tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background layer — parallax */}
      <Parallax
        speed={0.3}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-surface-muted/40 via-background to-background" />
        <div className="absolute -right-32 top-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-brass/10 blur-3xl" />
      </Parallax>

      <Container className="relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <Reveal index={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Tulsa&apos;s Trusted Plumber · Est. {siteConfig.yearsInBusiness}
            </p>
          </Reveal>

          <Reveal index={1} className="mt-4">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-tight">
              Quiet pipes, <span className="italic text-accent">honest work.</span>
            </h1>
          </Reveal>

          <Reveal index={2} className="mt-6">
            <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
              Family-owned plumbing for the Tulsa metro — drain cleaning, water
              heaters, repipes, leak detection, and 24/7 emergency service. No
              surprises, no upsell, just clean work that lasts.
            </p>
          </Reveal>

          <Reveal index={3} className="mt-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Book a Service Call</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  <span className="ml-2">Call {siteConfig.phone}</span>
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Implement trust-bar.tsx (marquee)**

Create `components/sections/trust-bar.tsx`:

```tsx
import * as React from "react";
import { ShieldCheck, Star, Clock, Wrench } from "lucide-react";
import { Marquee } from "@/components/motion/marquee";
import { siteConfig } from "@/lib/content";

const items = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Star, label: "5-Star Google Rated" },
  { icon: Clock, label: "24/7 Emergency Service" },
  { icon: Wrench, label: `${siteConfig.yearsInBusiness} Serving Tulsa` },
  { icon: ShieldCheck, label: "Flat-Rate Pricing" },
  { icon: Star, label: "Family Owned" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-surface py-4" aria-label="Trust signals">
      <Marquee durationSeconds={32}>
        <div className="flex items-center gap-10 px-5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-sm text-foreground-muted">
              <item.icon className="h-4 w-4 text-brass" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
```

- [ ] **Step 3: Implement services-grid.tsx**

Create `components/sections/services-grid.tsx`:

```tsx
import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Droplets, Flame, GitBranch, Search, Waves, Wrench } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { services, type IconName } from "@/lib/content";

const iconMap: Record<IconName, React.ElementType> = {
  droplets: Droplets,
  flame: Flame,
  "git-branch": GitBranch,
  search: Search,
  waves: Waves,
  wrench: Wrench,
};

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            What We Do
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
            Six services, done right.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.iconName];
            return (
              <Reveal key={service.slug} index={i} direction="up">
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:shadow-[var(--shadow)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-surface-muted text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {service.shortDescription}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Implement process.tsx**

Create `components/sections/process.tsx`:

```tsx
import * as React from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    n: "01",
    title: "Call or book online",
    body: "Tell us what's wrong. We'll dispatch same-day for most calls, priority for emergencies.",
  },
  {
    n: "02",
    title: "Flat-rate diagnostic",
    body: "Tech arrives, diagnoses, and tells you the price before any work starts. No hourly clock.",
  },
  {
    n: "03",
    title: "Clean work, warranted",
    body: "We do the work right, clean up after ourselves, and stand behind it. Done.",
  },
];

export function Process() {
  return (
    <section className="border-y border-border bg-surface py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
            Three steps. No surprises.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} index={i}>
              <div className="border-l-2 border-brass pl-6">
                <span className="font-display text-4xl font-medium text-brass">{step.n}</span>
                <h3 className="mt-3 font-display text-xl font-medium">{step.title}</h3>
                <p className="mt-2 text-foreground-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Implement areas-teaser.tsx**

Create `components/sections/areas-teaser.tsx`:

```tsx
import * as React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { serviceAreas } from "@/lib/content";

export function AreasTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Where We Work
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
              The whole Tulsa metro.
            </h2>
            <p className="mt-4 text-foreground-muted">
              Twelve cities, one flat-rate diagnostic. If you&apos;re in the
              Tulsa area, we&apos;re close.
            </p>
            <Link
              href="/service-areas"
              className="mt-6 inline-block border-b-2 border-brass pb-1 font-medium text-foreground hover:text-accent"
            >
              See all service areas →
            </Link>
          </Reveal>

          <Reveal index={1}>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="group flex items-center gap-2 text-foreground hover:text-accent"
                  >
                    <MapPin className="h-4 w-4 text-brass transition-transform group-hover:scale-110" />
                    <span>{area.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Implement reviews-preview.tsx**

Create `components/sections/reviews-preview.tsx`:

```tsx
import * as React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

// Phase 1: static curated fallback. Phase 4 swaps in live Google reviews
// via lib/reviews.ts (Places API). Component shape stays the same.
const fallbackReviews = [
  {
    name: "Sarah M.",
    city: "Tulsa",
    rating: 5,
    body: "{{REVIEW_1}}",
  },
  {
    name: "David R.",
    city: "Broken Arrow",
    rating: 5,
    body: "{{REVIEW_2}}",
  },
  {
    name: "Jenni P.",
    city: "Jenks",
    rating: 5,
    body: "{{REVIEW_3}}",
  },
];

export function ReviewsPreview() {
  return (
    <section className="border-y border-border bg-surface py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            What Tulsa Says
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
            Quietly recommended.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {fallbackReviews.map((review, i) => (
            <Reveal key={i} index={i}>
              <figure className="flex h-full flex-col rounded-lg border border-border bg-background p-6">
                <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brass text-brass" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-foreground-muted">
                  &ldquo;{review.body}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-medium text-foreground">{review.name}</span>
                  <span className="text-foreground-muted"> · {review.city}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/reviews"
            className="inline-block border-b-2 border-brass pb-1 font-medium hover:text-accent"
          >
            Read all reviews →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Implement geo-faq.tsx**

Create `components/sections/geo-faq.tsx`:

```tsx
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { getFaqForContext, type FaqContext } from "@/lib/content";
import { faqPageJsonLd } from "@/lib/seo";

interface GeoFaqProps {
  context: FaqContext;
  title?: string;
  eyebrow?: string;
}

export function GeoFaq({ context, title, eyebrow }: GeoFaqProps) {
  const faqs = getFaqForContext(context);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            {eyebrow ?? "Questions"}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
            {title ?? "Things people ask us."}
          </h2>
        </Reveal>

        <Reveal index={1} className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground-muted">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>

      {/* JSON-LD: render server-side for crawlers (spec §6) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqs)) }}
      />
    </section>
  );
}
```

- [ ] **Step 8: Implement cta-band.tsx**

Create `components/sections/cta-band.tsx`:

```tsx
import * as React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/content";

export function CtaBand() {
  return (
    <section className="bg-accent py-16 text-accent-foreground md:py-20">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-tight">
              Got a plumbing problem?
            </h2>
            <p className="mt-2 text-accent-foreground/80">
              Same-day dispatch across the Tulsa metro. Call or book now.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Book a Service Call</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent-foreground/30 bg-transparent text-accent-foreground hover:bg-accent-foreground/10 hover:text-accent-foreground">
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4" />
                <span className="ml-2">{siteConfig.phone}</span>
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 9: Compose home page**

Replace `app/(marketing)/page.tsx`:

```tsx
import * as React from "react";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { AreasTeaser } from "@/components/sections/areas-teaser";
import { ReviewsPreview } from "@/components/sections/reviews-preview";
import { GeoFaq } from "@/components/sections/geo-faq";
import { CtaBand } from "@/components/sections/cta-band";
import { BrassDivider } from "@/components/layout/brass-divider";
import { localBusinessJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <BrassDivider />
      <Process />
      <AreasTeaser />
      <ReviewsPreview />
      <GeoFaq context={{ type: "home" }} />
      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd()),
        }}
      />
    </>
  );
}
```

- [ ] **Step 10: Commit**

```bash
git add components/sections/ "app/(marketing)/page.tsx"
git commit -m "feat(home): all sections composed — hero, trust, services, process, areas, reviews, FAQ, CTA"
```

---

## Task 10: sitemap, robots, OG image

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Implement sitemap.ts (home only this phase)**

Create `app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 2: Implement robots.ts**

Create `app/robots.ts`:

```typescript
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Implement opengraph-image.tsx**

Create `app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OK Plumbing — Tulsa's Trusted Plumber";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#EFEEEA",
          color: "#222B2F",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#B08D43", letterSpacing: 6, textTransform: "uppercase", marginBottom: 20 }}>
          Tulsa&apos;s Trusted Plumber
        </div>
        <div style={{ fontSize: 96, fontWeight: 500, lineHeight: 1.05 }}>
          Quiet pipes,<br />honest work.
        </div>
        <div style={{ marginTop: 32, fontSize: 28, color: "#4A575C" }}>
          ok-plumbing.com · 24/7 Emergency
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts app/opengraph-image.tsx
git commit -m "feat(seo): sitemap, robots, dynamic OG image"
```

---

## Task 11: .env.example + README

**Files:**
- Create: `.env.example`
- Create: `README.md`

- [ ] **Step 1: Create .env.example**

Create `.env.example`:

```bash
# Resend (transactional email — /api/leads)
RESEND_API_KEY=
LEAD_EMAIL_TO=dispatch@ok-plumbing.com
LEAD_EMAIL_FROM=website@ok-plumbing.com

# Google Business Profile (live reviews — Phase 4)
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=

# Public site config
NEXT_PUBLIC_PHONE=+19185551234

# Vercel KV (rate-limiting — /api/leads)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

- [ ] **Step 2: Create README**

Create `README.md`:

```markdown
# OK Plumbing

Marketing site for ok-plumbing.com. Built with Next.js 15, Tailwind v4,
shadcn/ui, Framer Motion. Deploys to Vercel from GitHub main.

## Develop

pnpm install
pnpm dev

## Test

pnpm test         # unit (Vitest)
pnpm test:e2e     # Playwright (requires pnpm exec playwright install)

## Build

pnpm build

## Project structure

See `docs/superpowers/specs/2026-06-21-ok-plumbing-design.md` for the full
design spec and `docs/superpowers/plans/` for phased implementation plans.

## Content

All copy lives in `lib/content.ts`. Replace `{{PLACEHOLDER}}` tokens with
real values before launch (see spec §8 Open Items).
```

- [ ] **Step 3: Commit**

```bash
git add .env.example README.md
git commit -m "docs: env example + project README"
```

---

## Task 12: Playwright smoke test

**Files:**
- Create: `tests/e2e/home.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Create playwright config**

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

- [ ] **Step 2: Install browsers**

Run:
```bash
pnpm exec playwright install chromium
```

- [ ] **Step 3: Write smoke test**

Create `tests/e2e/home.spec.ts`:

```typescript
import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows hero headline", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /quiet pipes/i,
    );
  });

  test("renders all 6 services", async ({ page }) => {
    await page.goto("/");
    const serviceLinks = page.getByRole("link", { name: /drain cleaning|water heater|repiping|leak detection|sewer line|fixture/i });
    await expect(serviceLinks).toHaveCount(6);
  });

  test("renders GEO FAQ with at least 4 questions", async ({ page }) => {
    await page.goto("/");
    const faqButtons = page.getByRole("button", { name: /\?$/ });
    await expect(faqButtons.first()).toBeVisible();
    const count = await faqButtons.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("header nav is sticky and shows call CTA", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header.getByRole("link", { name: /book/i })).toBeVisible();
  });

  test("skip-to-content link appears on focus", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeVisible();
  });

  test("LocalBusiness JSON-LD is present", async ({ page }) => {
    await page.goto("/");
    const ldScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasLocalBusiness = ldScripts.some((s) => s.includes('"Plumber"'));
    expect(hasLocalBusiness).toBe(true);
  });
});
```

- [ ] **Step 4: Run e2e tests**

Run:
```bash
pnpm test:e2e
```

Expected: 6 passing.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts tests/e2e/
git commit -m "test(e2e): Playwright smoke tests for home page"
```

---

## Task 13: Final verification & polish

- [ ] **Step 1: Full test suite**

Run:
```bash
pnpm test && pnpm test:e2e
```

Expected: all unit + e2e pass.

- [ ] **Step 2: Typecheck + lint**

Run:
```bash
pnpm typecheck && pnpm lint
```

Expected: zero errors. Fix any that surface before continuing.

- [ ] **Step 3: Production build**

Run:
```bash
pnpm build
```

Expected: build succeeds, no font/SSR errors.

- [ ] **Step 4: Manual a11y check**

Run `pnpm start`, open http://localhost:3000. Verify in browser:
- Tab through nav — focus ring visible on every interactive element
- Skip link appears on first Tab
- Mega-menu opens on hover and is keyboard-navigable
- Mobile menu opens via hamburger, closes on link tap
- Dark mode toggle works (next-themes) if you expose one; otherwise verify CSS variables swap under `[data-theme="dark"]` via devtools
- Run Lighthouse audit — target Accessibility ≥ 95

- [ ] **Step 5: Reduced-motion check**

In devtools → Rendering → toggle "Emulate CSS prefers-reduced-motion: reduce". Reload. Verify:
- Hero parallax: static, no transform
- Marquee: not animating
- Reveal: all content immediately visible (no opacity 0)
- FAQ accordion still works (it's a transition, backstop zeros it but functionality intact)

- [ ] **Step 6: Final commit + push readiness**

```bash
git add -A
git commit --allow-empty -m "chore: Phase 1 complete — foundation + design system + home" 
```

---

## Phase 1 Done — Definition of Done

- [ ] Next.js 15 + Tailwind v4 + shadcn scaffolded, builds clean
- [ ] Palette B tokens live in `app/globals.css`, both themes, AA-verified
- [ ] Fraunces + Inter self-hosted via `next/font`
- [ ] `lib/content.ts` is single source of truth for services/areas/FAQs
- [ ] `lib/seo.ts` emits LocalBusiness, FAQ, Breadcrumb JSON-LD
- [ ] Motion primitives (Reveal, Parallax, Marquee) all respect `prefers-reduced-motion`
- [ ] Layout shell: sticky header w/ mega-menus, mobile sheet, footer w/ brass divider signature
- [ ] Home page fully composed: hero, trust bar, services grid, process, areas teaser, reviews preview, GEO FAQ, CTA
- [ ] sitemap.ts, robots.ts, dynamic OG image
- [ ] Vitest unit tests + Playwright smoke tests pass
- [ ] Typecheck + lint clean
- [ ] All commits atomic, on `main` branch

**Next:** User reviews live Home page at http://localhost:3000, then I write Phase 2 (remaining static pages: About, Financing, FAQ, Offers, Emergency) using the established patterns.
