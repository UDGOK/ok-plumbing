# OK Plumbing — Website Design Spec

**Date:** 2026-06-21
**Domain:** ok-plumbing.com
**Status:** Approved (pending implementation plan)
**Primary business goal:** Lead generation — drive phone calls and form submissions.

---

## 1. Positioning & Voice

**Thesis.** Tulsa's plumber is sold online two ways: emergency 24/7 hotline (loud, urgent, red) or generic corporate franchise (flat, templated). OK Plumbing takes a third path — a quiet, confident editorial site treating plumbing as a craft. "Light luxury with Tulsa grounding."

**Voice.** Confident, plain, never salesy. Active verbs. Sentence case. No exclamation points. State what we do, where, and what it costs to call. Errors and empty states speak plainly. Words are design material, not decoration.

**Signature element.** A brass pipe-rim divider motif — a thin horizontal rule with a centered patina-brass valve/pipe-joint SVG. Used sparingly between major sections. Embodies the trade without being literal. Sourced from copper plumbing, not decoration.

**Anti-default check (per frontend-design skill).** Avoids (1) cream + serif + terracotta, (2) black + acid accent, (3) hairline broadsheet. Palette B (stone/linen + verdigris + patina brass) sidesteps all three.

---

## 2. Technology Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router, React 19, RSC, ISR) | Latest; matches brief |
| Deploy | Vercel | Auto-deploys from GitHub main |
| Package manager | pnpm | Matches sibling `tulsacrete` project |
| Styling | Tailwind CSS v4 + CSS variables | Light/dark via `next-themes` |
| UI primitives | shadcn/ui on Radix | Same pattern as `tulsacrete`; install only what's used |
| Icons | Lucide | — |
| Animation | Framer Motion | Matches `tulsacrete` |
| Fonts | Fraunces + Inter via `next/font` | Self-hosted, zero CLS, free, legal in public repo |
| Forms | react-hook-form + zod | Matches `tulsacrete` |
| Email | Resend via `/api/leads` serverless route | Transactional, free tier |
| Reviews | Google Business Profile API (Places API New) | Live reviews, ISR-cached |
| Analytics | Vercel Analytics + Speed Insights | Privacy-friendly |
| SEO | `metadata` API, JSON-LD, `sitemap.ts`, `robots.ts`, `@vercel/og` OG images | — |

**Skills available locally (already downloaded to `.skills/`):**
- `frontend-design` (anthropics/skills) — design guidance
- `ui-ux-pro-max` (nextlevelbuilder) — UX patterns

### Folder structure

```
ok-plumbing/
├─ app/
│  ├─ (marketing)/              ← route group, shared layout (nav + footer)
│  │  ├─ page.tsx               ← home
│  │  ├─ services/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/page.tsx     ← 6 services
│  │  ├─ service-areas/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/page.tsx     ← 12 cities
│  │  ├─ emergency/page.tsx
│  │  ├─ offers/page.tsx
│  │  ├─ about/page.tsx
│  │  ├─ reviews/page.tsx
│  │  ├─ financing/page.tsx
│  │  ├─ faq/page.tsx
│  │  ├─ contact/page.tsx
│  │  └─ (legal)/{privacy,terms}/page.tsx
│  ├─ api/
│  │  └─ leads/route.ts
│  ├─ layout.tsx                ← root: fonts, theme provider, analytics
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
│  ├─ ui/                       ← shadcn primitives
│  ├─ layout/                   ← site-header, site-footer, container
│  ├─ sections/                 ← hero, services-grid, areas-map, reviews, faq, cta
│  └─ motion/                   ← reveal, parallax, marquee (reduced-motion aware)
├─ lib/
│  ├─ content.ts                ← single source of truth (services, areas, FAQs)
│  ├─ reviews.ts                ← Google API client + cache
│  ├─ mailer.ts                 ← Resend wrapper
│  └─ seo.ts                    ← JSON-LD helpers
├─ content/                     ← MDX or TS data files for service detail copy
├─ public/                      ← images, og-default.png, favicon
└─ .skills/                     ← already populated
```

**Content approach.** Services and areas are data-driven from `lib/content.ts` — single source of truth driving pages, nav, FAQ, structured data, sitemap. One edit propagates everywhere. No CMS unless requested later.

---

## 3. Design Tokens & Theming

Palette B formalized as CSS variables in `app/globals.css` under `[data-theme="light"]` and `[data-theme="dark"]`. Both themes verified AA.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--background` | `#EFEEEA` linen | `#222B2F` charcoal | page bg |
| `--surface` | `#FFFFFF` | `#2C363B` | cards, sheets |
| `--surface-muted` | `#D9D6CE` stone | `#37424A` | subtle blocks |
| `--foreground` | `#222B2F` charcoal | `#EFEEEA` linen | body text (13.8:1 / 13.4:1) |
| `--foreground-muted` | `#4A575C` gunmetal | `#B8C0C4` | lede, secondary |
| `--accent` | `#3F7A6B` verdigris | `#5BAA97` | primary CTA, links (5.6:1 / 5.9:1) |
| `--accent-foreground` | `#FFFFFF` | `#0F1517` | text on accent |
| `--brass` | `#B08D43` patina brass | `#C9A55C` antique brass | hairlines, eyebrows, divider |
| `--brass-foreground` | `#1A1A1A` | `#1A1A1A` | text on brass (6.9:1 / 8.2:1) |
| `--border` | `#D9D6CE` | `#3A454C` | dividers |
| `--ring` | `#3F7A6B` | `#5BAA97` | focus ring |

**Typography scale** (fluid via `clamp()`):

| Role | Family | Weight | Size |
|---|---|---|---|
| Display (h1) | Fraunces | 500, opsz 144, wonky | `clamp(2.5rem, 6vw, 4.5rem)` |
| H2 | Fraunces | 500, opsz 96 | `clamp(1.9rem, 4vw, 3rem)` |
| H3 | Fraunces | 500 | `clamp(1.3rem, 2.4vw, 1.75rem)` |
| Lede | Inter | 400 | `clamp(1.05rem, 1.4vw, 1.2rem)` |
| Body | Inter | 400 | `1rem` / 1.6 line-height |
| Eyebrow | Inter | 600, `.2em` tracking, uppercase | `0.7rem` — patina brass |
| Caption | Inter | 500 | `0.875rem` |

**Spacing & radius.** 4px grid. `--radius: 8px` (cards, buttons), `--radius-lg: 14px` (hero, large surfaces), `--radius-sm: 4px` (pills, chips). Leans architectural over over-rounded.

**Shadows.** Subtle, single tier. `--shadow-sm: 0 1px 2px rgba(34,43,47,.05)`, `--shadow: 0 4px 24px rgba(34,43,47,.06)`. No glow effects.

**Focus & a11y.** `--ring` 2px offset 2px on every interactive element. `prefers-reduced-motion` disables every animation class centrally in `components/motion/*`. Skip-to-content link. ARIA labels on icon buttons.

---

## 4. Page Architecture & Navigation

### Navigation (sticky, blends with surface)

`OK Plumbing` wordmark (Fraunces) · Services ▾ · Areas ▾ · Emergency · Offers · About · Reviews · **[ Call {{PHONE}} ]** · **[ Book Service ]**

- Mobile collapses to hamburger → full-screen sheet with same items + tap-to-call.
- Services ▾ and Areas ▾ open **mega-menu dropdowns** (Radix NavigationMenu) — grouped, with small icon + one-line description per item.
- Active route: 2px patina-brass underline that grows on hover.
- Marquee ticker lives in the home trust bar (not the nav).

### Route map (16 routes)

| Route | Job | Sections |
|---|---|---|
| `/` Home | Convert | Hero → Trust bar (license, years, rating) → Services grid → Process (3 steps) → Service-area teaser → Reviews carousel → **GEO FAQ** → CTA band |
| `/services` | Browse | Compact hero → Services grid → CTA |
| `/services/[slug]` ×6 | Convert per service | Hero → What's included → Process → Pricing transparency → Related services → **GEO FAQ** → CTA |
| `/emergency` | Phone-first emergency | Minimal motion, sticky call button, no parallax |
| `/service-areas` | Local SEO hub | Hero → Area grid (Tulsa metro map) → How we serve → CTA |
| `/service-areas/[slug]` ×12 | Rank per town | Hero (town) → Services offered → Local context paragraph → Reviews from area → **GEO FAQ** → CTA |
| `/about` | Trust | Story → License & certs → Team (optional) → Values → CTA |
| `/reviews` | Proof | Hero → Live Google reviews feed → Filter by service → CTA |
| `/financing` | Remove price friction | Hero → Options cards → How it works → FAQ → CTA |
| `/offers` | Convert price-shoppers | Coupon cards with terms, expiry, exclusions |
| `/faq` | SEO + objections | Hero → Categorized accordion FAQ → CTA |
| `/contact` | Convert via form | Hero → Booking form → Alternates → Map + hours → **GEO FAQ** |
| `/privacy`, `/terms` | Legal | Prose, no nav |

### Services (final 6)

1. Drain Cleaning & Hydro-Jetting
2. Water Heater Repair & Installation (tank + tankless)
3. Whole-Home Repiping
4. Leak Detection & Slab Leaks
5. Sewer Line Repair & Replacement
6. Fixture Installation & Repair (faucets, toilets, garbage disposals)

### Service areas (final 12)

Tulsa, Broken Arrow, Jenks, Owasso, Bixby, Sand Springs, Sapulpa, Claremore, Catoosa, Coweta, Glenpool, Collinsville

### GEO FAQ requirement

Every primary page ends with a localized FAQ accordion (4–6 Q&As) rendered as both visible content **and** `FAQPage` JSON-LD. Questions double as long-tail SEO (e.g., "How much does a water heater cost in Tulsa?"). Data lives in `lib/content.ts`, tagged by page context.

### Footer (every page)

- Col 1: wordmark + tagline + license #
- Col 2: Services list
- Col 3: Service areas
- Col 4: Contact — phone, email, hours, address, social
- Bottom bar: © {{YEAR}} OK Plumbing · Privacy · Terms · Built in Tulsa

### Internal linking strategy

Every service page links to 2 nearest services + relevant service-area pages. Every area page links to all services. Mesh generated from `lib/content.ts`, not hand-wired.

### Competitive basis (research-backed)

- Roto-Rooter ranks with 20-city service-area block; we ship 12 (realistic distinct markets).
- Infinity converts on dollar-amount coupons; we add `/offers`.
- Only Infinity has LocalBusiness + FAQ schema; we ship LocalBusiness + FAQPage + Service + Review + Breadcrumb JSON-LD on every page — our genuine moat.
- No competitor owns a dedicated emergency landing page well; we add `/emergency` targeting "emergency plumber Tulsa."

---

## 5. Motion System

All animation centrally controlled from `components/motion/*`, every effect gated behind `prefers-reduced-motion: reduce` (renders final state instantly). GPU-friendly: only `transform` and `opacity`.

| # | Effect | Where | Implementation |
|---|---|---|---|
| 1 | Scroll-triggered fade/reveal | Every section entering viewport | `<Reveal>` wrapper on IntersectionObserver. Once-only. Stagger via `--i`. `threshold: 0.15`, rootMargin `-40px`. |
| 2 | Subtle hero parallax | Home hero only | Background 0.3×, foreground headline 0.05×, `translateY()` on scroll. Disabled under reduced motion. |
| 3 | Marquee ticker | Home trust bar + Services eyebrow | CSS keyframes, `animation: scroll 30s linear infinite`, pause on hover, `aria-hidden`. |
| 4 | Nav underline grow | All nav items | Active route: 2px patina-brass underline, width 0→100% on hover. CSS only. |
| 5 | Image hover treatments | Service cards, gallery, reviews avatars | Scale 1.03 + brass-tinted overlay fade. `transition: 300ms cubic-bezier(.4,0,.2,1)`. |
| 6 | Mega-menu dropdown | Services ▾ / Areas ▾ | Framer Motion `AnimatePresence`, fade + 4px downward slide. Hover-intent 200ms. |
| 7 | FAQ accordion | FAQ sections | Radix Accordion (arrow-key nav, focus mgmt). Height via `grid-template-rows: 0fr → 1fr`. |
| 8 | Form micro-interactions | Contact/booking form | Focus ring expands, submit shows spinner → check on success. |
| 9 | CTA button hover | All primary CTAs | Slight lift `translateY(-1px)` + brass shadow glow. |

**Motion principles.** Spend boldness in one place — hero parallax + ticker are the signature; everything else disciplined. One orchestrated homepage load sequence (eyebrow → headline → lede → CTA, staggered 80ms). No shimmer skeletons, no count-up stats (read as AI-generated).

**`prefers-reduced-motion` handling.** `useReducedMotion()` hook returns boolean; every motion component short-circuits to static. Global `@media (prefers-reduced-motion: reduce)` CSS backstop kills transitions/animations site-wide.

---

## 6. Lead Capture, Integrations, SEO & Metrics

### Lead capture (contact + booking form)

Fields (validated with zod): Name, Phone, Email, Service (select from 6), Address, Preferred time, Message.

- Honeypot field (anti-spam) + rate-limit by IP via Vercel KV (5 submissions/hour/IP)
- Submit → `/api/leads` → Resend transactional email to `LEAD_EMAIL_TO` + confirmation to submitter
- Success state: green check, "We'll call you within {{X}} business hours," inline replacement (no reload)
- Error state: plain-language "Something didn't go through — call us at {{PHONE}} or try again."

### Environment variables

```
RESEND_API_KEY=
LEAD_EMAIL_TO=
LEAD_EMAIL_FROM=
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_GA_ID=
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

### Reviews integration

Google Business Profile via Places API (New). Fetched server-side at build + ISR revalidation every 60 minutes (`revalidate = 3600`). Cached in-memory + Vercel KV fallback. Graceful degradation: curated fallback testimonials if API fails. Reviews schema rendered server-side from cached payload.

### SEO architecture

- Per-route `generateMetadata()` — title, description, OG image (dynamic via `@vercel/og`), canonical
- `app/sitemap.ts` — auto-generated from `lib/content.ts`
- `app/robots.ts` — allows all, points to sitemap
- JSON-LD on every page: `LocalBusiness`, `BreadcrumbList`, page-context `Service` or `FAQPage`
- Semantic HTML, single `<h1>` per page, logical heading hierarchy
- `next/image` (WebP/AVIF, responsive `srcset`, lazy below-fold)
- Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS = 0

### Analytics & monitoring

- Vercel Analytics (privacy-friendly, no cookies) + Speed Insights
- Form submissions tracked as events
- Google Search Console (user verifies post-deploy)

### Success metrics

| Metric | Target |
|---|---|
| Calls + form submissions / month | baseline → +30% in 90 days |
| Organic sessions from Tulsa metro | rank top-3 for "plumber [city]" in 6 of 12 cities within 6 months |
| Core Web Vitals | all green |
| Lighthouse SEO | 100 |
| Mobile form completion rate | >15% of mobile visitors who reach /contact |

### Deployment & GitHub

- Repo: `ok-plumbing` (user creates on GitHub, push to `main`)
- Vercel: auto-deploy on push to main, preview deploys on PRs
- Branches: `main` (production), feature branches per page/component
- `vercel.json` — cache headers for static assets + ISR configs

### Content intake (fill before launch)

- NAP, license #, years in business, service area confirmation
- 6 service descriptions (1 paragraph + bullets "what's included")
- 12 city pages: 1 short local-context paragraph each
- 6+ FAQ entries per page context
- Coupons/offers (if `/offers` ships live)
- 6–12 photos (truck, team, work samples, before/after)

---

## 7. Out of Scope (YAGNI)

To keep this focused and shippable:

- No CMS — content is data files in repo (revisit if non-devs need to edit)
- No blog (no current content cadence; revisit when ready to commit)
- No careers page (unless actively hiring)
- No water damage / flood / mold remediation (unless OK Plumbing offers it)
- No HVAC (plumbing-only per brand)
- No live chat widget (phone + form is enough; chat adds ops overhead)
- No e-commerce / online payment (financing page links out to provider)
- No user accounts / login
- No A/B testing tooling (Vercel Analytics is enough to start)

---

## 8. Open Items Before Launch

These do not block implementation start — they block **launch**:

1. **Content intake** — fill placeholders listed in §6 (NAP, license, services copy, city paragraphs, FAQs)
2. **Resend domain verification** — verify ok-plumbing.com as a sending domain
3. **Google Business Profile** — confirm Place ID, enable Places API, get API key
4. **Vercel KV** — provision free tier for rate-limiting
5. **Brand assets** — logo files, brand-quality photos (truck, team, work)
6. **GitHub repo creation** — user-owned, we push
