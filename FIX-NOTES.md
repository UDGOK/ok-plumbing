# OKPlumb — fix bundle

Validated with a real `next build` (Next 16.2.9 / React 19.2.4): TypeScript clean,
all 33 pages prerender. **Nothing here is pushed — you review, commit, and push.**

## How to apply
From your repo root, on a clean branch:

```bash
git apply okplumb-fixes.patch     # or: copy the files from okplumb-fixes.zip over your tree
git status                        # confirm the changed/new files
git add -A && git commit -m "Fix canonical domain, 404 routes, placeholders, sitemap, llms.txt"
git push                          # Vercel redeploys
```

## What changed (the audit items)

1. **Canonical domain.** `siteConfig.url` and `metadataBase` now point to
   `https://www.ok-plumbing.com` instead of the dead `okplumb.com`. This one change
   fixes the sitemap `<loc>`s, robots `Sitemap:`, OG image URL, and all JSON-LD URLs.
   Added `alternates.canonical` so every page emits a canonical tag.
2. **All missing routes built** (no more 404s): `/services`, `/services/[slug]` (×6),
   `/service-areas`, `/service-areas/[slug]` (×12), `/emergency`, `/offers`, `/about`,
   `/reviews`, `/contact`, `/privacy`, `/terms`. They reuse your existing components
   (`Container`, `Reveal`, `GeoFaq`, `CtaBand`, `Button`) and content data, so they
   match the homepage. **Your "Book Service" / "Book a Service Call" buttons now land
   on a real `/contact` page** instead of a dead link.
3. **No more literal `{{...}}`.** License, years, street, zip, and social URLs now read
   from env vars (below) and degrade gracefully when empty — the eyebrow, trust bar,
   footer, and FAQ all read cleanly with or without the data.
4. **Sitemap** now enumerates every page (static + service + area slugs) on the correct domain.
5. **`public/llms.txt`** added for AI-engine discoverability.
6. **Reviews:** placeholder testimonials removed. See the TODO below — I did **not**
   invent reviews. Until you add real ones the section shows a tasteful "read on Google" state.

## You must fill these in (Vercel → Project → Settings → Environment Variables)

All are `NEXT_PUBLIC_` so they're available at build time. All are optional — empty just hides that bit.

| Variable | Example | Shows up in |
|---|---|---|
| `NEXT_PUBLIC_LICENSE_NUMBER` | `OK-12345` | footer, "licensed & insured" FAQ, schema |
| `NEXT_PUBLIC_YEARS` | `Serving Tulsa since 2009` | hero eyebrow, trust bar, footer |
| `NEXT_PUBLIC_STREET` | `123 S Main St` | footer, contact page, schema address |
| `NEXT_PUBLIC_ZIP` | `74103` | schema address |
| `NEXT_PUBLIC_GOOGLE_BIZ_URL` | `https://g.page/...` | reviews links |
| `NEXT_PUBLIC_FACEBOOK_URL` | `https://facebook.com/...` | schema `sameAs` |

Do **not** put a made-up license number or address here — leave blank until you have the real value.

## Remaining TODOs (only you can do these)

- **Real reviews:** paste verbatim Google reviews into the `rawReviews` array in
  `components/sections/reviews-preview.tsx`. Never invent testimonials.
- **Verify license #/address** before publishing those.

## Not touched (your call — separate from these fixes)

- **Photography.** The site is still all-SVG/color, zero `<img>`. Wiring real photos
  (your image kit) into the hero/service cards is the biggest visual upgrade left.
- **Palette.** You went forest-green vs. the brass/copper brief — that's a design choice, left as-is.
- **Contact form backend.** `/contact` leads with call/text CTAs (which work immediately).
  A submitting form needs an API route (`/api/leads`) — add later if you want one.

## After deploy, sanity-check

- Visit `/contact`, `/services`, `/emergency` → should be 200, not 404.
- View-source the homepage → no `{{...}}`, canonical + OG point to `www.ok-plumbing.com`.
- `/sitemap.xml` lists all pages; `/llms.txt` returns 200.

---

## Spotlight hero (adapted from your prompt)

New file `components/sections/spotlight-hero.tsx`, wired into the homepage in place of
the old `<Hero />` (the old `components/sections/hero.tsx` is left intact — revert by
swapping the import/usage back in `app/(marketing)/page.tsx`).

What it does differently from the original prompt:
- **Next.js client component** in your app (not a separate Vite project).
- Your **Fraunces + brass/accent tokens**, **OKPlumb** brand, real **918** number — no "Sooner Flow", no 405 placeholder, no Inter/Playfair.
- **CSS-mask spotlight** driven by CSS variables + a smoothed RAF loop — no `canvas.toDataURL()` per frame, so it stays smooth.
- **Auto-sweep on load** so the reveal is discoverable without hovering.
- **Touch / reduced-motion fallback:** no cursor → it shows the *clean* image (reassuring), never stranding mobile users on the "problem" frame.

### Image TODO
The two images default to royalty-free Unsplash placeholders. Replace them with real
OKPlumb job photos — drop files in `public/hero/` and pass them as props:

```tsx
<SpotlightHero problemImage="/hero/problem.jpg" fixedImage="/hero/fixed.jpg" />
```

---

## New navigation menu (Commure-style)

`components/layout/site-header.tsx` rewritten into a centered **pill-capsule nav**
with uppercase tracked labels + chevrons, a slim dark announcement bar, and rich
**mega-menu panels** (underlined section headings, dark icon-tiles, title + 2-line
description rows) — modeled on commure.com but in your Fraunces + brass/green tokens
with OKPlumb content. Top-level: **Services / Areas / Company / Emergency**, plus a
phone link and a green **Book Service** pill. Mobile collapses to a matching sheet.
No new dependencies; reuses your existing Radix `NavigationMenu` primitives.

---

## Commercial cluster (GEO/SEO build)

New: `lib/commercial.ts` (data), `/commercial` hub + `/commercial/[slug]` (9 sub-pages), a
**Commercial** mega-menu, and `serviceJsonLd` / `howToJsonLd` helpers in `lib/seo.ts`. Sitemap and
llms.txt updated. Built the GEO way from the strategy + your slides:
- **Answer-first** "The short answer" executive summary (40–60 words) at the top of every page.
- **Structured data**: Service + FAQPage on every page; HowTo on the hub.
- **Verifiable facts** (EPA 25% grease-trap rule, annual backflow testing) and your real
  **tenant-improvement / medical-dental build-out** credibility as E-E-A-T.
- Internal linking via the Commercial mega-menu + hub for topical authority.

Pages: /commercial (hub) + restaurants-commercial-kitchens, tenant-improvement-build-outs,
medical-dental-offices, property-management, grease-traps, backflow-testing, commercial-water-heaters,
commercial-drain-hydro-jetting, new-construction.

**Off-page (not code — do these to actually rank):** claim/optimize GBP with a Commercial category +
real job photos; Bing Places + Apple; review-request + reply habit (4.5★ threshold); list on
Yelp/Angi/Thumbtack/Downtobid with identical NAP; get mentioned in r/tulsa & a local blog. See
OKPlumb-Commercial-Ranking-Strategy.md.
