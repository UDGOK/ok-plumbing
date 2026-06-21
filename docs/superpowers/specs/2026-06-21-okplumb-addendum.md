# OKPlumb — Rebrand & Contact Privacy Addendum

**Date:** 2026-06-21
**Supersedes (in part):** `2026-06-21-ok-plumbing-design.md`
**Status:** Live in code

---

## Rebrand: "OK Plumbing" → "OKPlumb"

The brand name is **OKPlumb** (one word, capital OK + Plumb). All public-facing
strings (header wordmark, footer, metadata titles, OG image, JSON-LD `name`)
now use `OKPlumb`.

The domain in `siteConfig.url` is `https://okplumb.com`.

## Contact information

| Field | Value | Visible to visitors? |
|---|---|---|
| Brand name | OKPlumb | yes |
| Phone | (918) 851-8203 (`9188518203` raw) | yes — formatted for display, raw for `tel:` |
| Lead destination | projects@udgok.com | **no** — never rendered anywhere |
| Internal contact | Umair / umair@udgok.com | **no** — internal only |

### Public surface

- Header: Call button → `(918) 851-8203`
- Hero: Call button → `(918) 851-8203`
- CTA band: Call button → `(918) 851-8203`
- Footer Contact column: phone (formatted), "Send a message" link to `/contact`,
  hours, address. **No email address is shown anywhere on the site.**
- OG image: `okplumb.com · 24/7 Emergency · (918) 851-8203`
- JSON-LD `LocalBusiness`: telephone set, **email field omitted**.

### Lead routing (Phase 4 — `/api/leads`)

When the contact form ships, all submissions route to `projects@udgok.com` via
Resend. The destination is read from `LEAD_EMAIL_TO` in the environment —
**never** from `siteConfig`, never rendered in any UI, never included in
JSON-LD. The submitter sees a generic "We'll be in touch within one business
hour" confirmation; no destination address is revealed.

### `lib/content.ts` shape

`siteConfig` intentionally has **no `email` field**. This is enforced by a unit
test (`siteConfig intentionally has no public email field`) and by the
`localBusinessJsonLd` test (`email must never appear in JSON-LD`). If a future
change tries to add `email` back, these tests fail.

A `formatPhone(raw)` helper handles display formatting (10 or 11 digits →
`(XXX) XXX-XXXX`); raw digits are used only for `tel:` links.

## Env (`/api/leads` destination)

```env
LEAD_EMAIL_TO=projects@udgok.com
LEAD_EMAIL_FROM=website@okplumb.com   # Resend verified sender
NEXT_PUBLIC_PHONE=9188518203
```

`LEAD_EMAIL_FROM` will need okplumb.com verified as a sending domain in Resend
before Phase 4 ships (see main spec §8 Open Items).
