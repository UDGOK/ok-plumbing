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

---

## Page-specific themed motion + photo slots

New component `components/motion/page-scene.tsx` — a server-rendered, pure SVG/CSS decorative
"scene" anchored to the right of each page hero. **No WebGL, no Three.js, no per-frame JS**, so it
adds ~nothing to load time and is auto-disabled by the existing `prefers-reduced-motion` backstop in
`globals.css`. Eight variants, mapped to page type:

- `water` (drains, contact, services hub) · `flame` (water heaters) · `gauge` (backflow)
- `blueprint` (build-outs, new construction, about) · `radar` (leak detection, medical/dental)
- `flow` (sewer, hydro-jetting, grease, restaurants) · `pulse` (emergency) · `pipes` (brand default)

Dynamic routes pick a variant from the service icon (`serviceScene` / `commercialScene` maps in the
`[slug]` pages). Keyframes live in `globals.css` under "Page scene motifs".

**Adding real photos (recommended for trust + ranking).** Each scene accepts an optional `photo`
prop. Drop a real OKPlumb job photo in `public/hero/` and pass it, e.g.:

    <PageScene variant="flow" photo="/hero/restaurant-kitchen.jpg" />

The photo layers behind the motif with the same right-side fade. Real job photos are the single
biggest E-E-A-T lever you control — far better than stock. Until you add them, the themed motion
stands on its own so no page looks empty.

To dial the motion up/down, adjust opacity/size in `page-scene.tsx` or the `scene-*` keyframes.

`offers` page fleshed out with a "what you can finance" + "how it works" block.

---

## Real job photos + med-gas video (first-party E-E-A-T)

Added 9 optimized photos to `public/photos/` and a med-gas clip to `public/video/`
(`med-gas-rough-in.mp4` + `med-gas-poster.jpg`). All resized to ≤1400px / progressive JPEG
(~55–315KB each, ~2MB total) so they're web-fast.

**Where they're used**
- **Homepage spotlight hero** — real before/after: `rough-in-framing.jpg` (problem) →
  `commercial-restroom-marble.jpg` (revealed on hover).
- **Hero photo accents** (right-side, replaces the animation on these pages):
  backflow → `backflow-preventer.jpg`; tenant-improvement → `commercial-build-out.jpg`;
  new-construction & sewer-line & hydro-jetting → `commercial-dwv-rough-in.jpg`;
  medical-dental → `ada-restroom-shower.jpg`; property-management →
  `commercial-restroom-marble.jpg`; repiping → `copper-water-rough-in.jpg`;
  fixtures → `brass-console-sink.jpg`.
- **Commercial hub "Recent work" gallery** — 8-photo grid.
- **Medical/dental page** — autoplay/muted/looped med-gas video block (tiny, 309KB).

Pages without a matching photo keep the themed animation.

**Add or swap photos:** drop a file in `public/photos/`, then either pass it via a hero
(`<PageScene variant="..." photo="/photos/your.jpg" />` or add to the `servicePhoto` /
`commercialPhoto` maps in the `[slug]` pages) or add it to the `work` array in
`app/(marketing)/commercial/page.tsx` for the gallery. More real job photos = more ranking/trust.

**NOTE:** this patch is a **binary** patch — it includes the actual image/video files, so a single
`git apply` recreates everything. Apply only the latest patch on a clean checkout.

---

## Homepage: color + rhythm pass

To break the long single-background scroll, added two sections and reordered:
- `components/sections/why-band.tsx` — a bold **dark charcoal** "Why OKPlumb" band (4 value
  pillars, green icon tiles, brass eyebrow) placed after the services grid for strong mid-scroll
  contrast.
- `components/sections/work-strip.tsx` — a homepage **"Recent work"** photo strip (4 real job
  photos) on a faint green-tinted background (`bg-accent/5`), linking to /commercial.
- Removed the brass divider; new order: hero → trust bar → services → **dark band** → process →
  **photo strip** → areas → reviews → FAQ → green CTA. Cadence now alternates light / dark / light /
  tinted / green instead of one flat cream run. No new dependencies; SSR + lazy images keep it fast.
