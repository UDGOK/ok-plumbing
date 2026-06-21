import { services } from "@/lib/content";
import { commercialServices } from "@/lib/commercial";

const PHONE = "(918) 851-8203";

const AREAS = [
  "tulsa",
  "broken arrow",
  "jenks",
  "owasso",
  "bixby",
  "sand springs",
  "sapulpa",
  "claremore",
  "catoosa",
  "coweta",
  "glenpool",
  "collinsville",
];

function has(q: string, ...words: string[]) {
  return words.some((w) => q.includes(w));
}

function svc(slug: string, label: string): string {
  const s = services.find((x) => x.slug === slug);
  const desc = s?.shortDescription ? ` ${s.shortDescription}` : "";
  return `Yes — ${label} is one of our core services.${desc} Call ${PHONE} or send the contact form and we'll get you scheduled.`;
}

function com(slug: string): string {
  const c = commercialServices.find((x) => x.slug === slug);
  return (
    c?.answer ??
    `We handle that as part of our commercial services. Call ${PHONE} or see our commercial page.`
  );
}

/**
 * Deterministic, API-free answerer grounded in the site's own data.
 * Used when no LLM key is set (or the LLM call fails) so the Ask AI widget
 * always returns something genuinely useful instead of a dead end.
 */
export function localAnswer(questionRaw: string): string {
  const q = questionRaw.toLowerCase();

  // Safety first — gas
  if (has(q, "gas smell", "smell gas", "smell of gas", "gas leak", "rotten egg")) {
    return `If you smell gas, leave the building right away and call 911 and your gas utility first. Once you're safe, call us at ${PHONE} and we'll handle the plumbing side.`;
  }

  // Emergencies
  if (
    has(q, "emergency", "burst", "flood", "flooding", "no water", "sewage", "sewer backup", "backed up", "backing up", "overflow", "gushing", "geyser") ||
    (has(q, "leak") && has(q, "everywhere", "fast", "ceiling", "flooding", "pouring", "bad"))
  ) {
    return `That sounds urgent — call us now at ${PHONE}. We dispatch 24/7 across the Tulsa metro and can talk you through shutting off the water while we head your way.`;
  }

  // Hours
  if (has(q, "hours", "open", "when are you", "what time", "today", "weekend", "sunday", "saturday", "24/7", "after hours", "late")) {
    return `We're available Mon–Fri 7a–6p, with 24/7 emergency service. For anything urgent, call ${PHONE} any time.`;
  }

  // Service area / location
  if (
    has(q, "service area", "areas", "do you serve", "near me", "location", "where are you", "do you cover", "come to", "do you work in") ||
    AREAS.some((a) => q.includes(a))
  ) {
    return `We serve the Tulsa metro — Tulsa, Broken Arrow, Jenks, Owasso, Bixby, Sand Springs, Sapulpa, and nearby cities. Call ${PHONE} and we'll confirm your address.`;
  }

  // Pricing / financing
  if (has(q, "cost", "price", "pricing", "how much", "quote", "estimate", "charge", "fee", "rate", "afford", "finance", "financing", "payment")) {
    return `Pricing depends on the job, so we give an upfront, flat-rate quote before any work starts — what we quote is what you pay. Financing is available on bigger jobs. Call ${PHONE} or send the contact form for a quote.`;
  }

  // Booking / contact
  if (has(q, "book", "schedule", "appointment", "come out", "set up", "contact", "reach you", "talk to", "get someone", "send someone")) {
    return `Easy — call or text ${PHONE}, or use the contact form on this page. We offer same-day dispatch across the Tulsa metro.`;
  }

  // Diagnostic: water pressure
  if (has(q, "water pressure", "low pressure", "pressure is low", "no pressure", "weak pressure")) {
    return `Low water pressure usually comes down to a clogged aerator, a failing pressure-regulating valve, a hidden leak, or old galvanized pipes. We can diagnose it quickly — call ${PHONE} and we'll pin down the cause.`;
  }

  // Residential services
  if (has(q, "drain", "clog", "clogged", "slow drain", "won't drain")) return svc("drain-cleaning", "Drain cleaning & hydro-jetting");
  if (has(q, "water heater", "hot water", "tankless", "no hot water", "water's cold", "water is cold")) return svc("water-heaters", "Water heater repair & replacement");
  if (has(q, "leak", "slab leak", "dripping", "wet spot", "water bill", "puddle")) return svc("leak-detection", "Leak detection & slab leaks");
  if (has(q, "sewer", "main line", "septic", "sewer line")) return svc("sewer-line", "Sewer line repair");
  if (has(q, "repipe", "repiping", "old pipes", "galvanized", "polybutylene", "pipe replacement", "rusty water")) return svc("repiping", "Whole-home repiping");
  if (has(q, "faucet", "toilet", "running toilet", "sink", "fixture", "garbage disposal", "shower", "tub", "spigot")) return svc("fixtures", "Fixture installation & repair");

  // Commercial services
  if (has(q, "grease trap", "grease interceptor")) return com("grease-traps");
  if (has(q, "backflow", "rpz", "cross connection")) return com("backflow-testing");
  if (has(q, "restaurant", "commercial kitchen")) return com("restaurants-commercial-kitchens");
  if (has(q, "build-out", "buildout", "build out", "tenant improvement")) return com("tenant-improvement-build-outs");
  if (has(q, "medical", "dental", "clinic", "operatory")) return com("medical-dental-offices");
  if (has(q, "property management", "landlord", "multi-tenant", "multiple units", "multiple properties")) return com("property-management");
  if (has(q, "hydro", "jetting", "jet the")) return com("commercial-drain-hydro-jetting");
  if (has(q, "new construction", "ground up", "new build")) return com("new-construction");
  if (has(q, "commercial", "business", "office", "retail", "warehouse")) {
    return `Yes — we do commercial plumbing across the Tulsa metro: tenant build-outs, restaurants and kitchens, medical/dental, property management, grease traps, backflow, and more. Call ${PHONE} or visit our commercial page.`;
  }

  // Catch-all
  return `I can help with plumbing — drains, water heaters, leaks, sewer lines, repipes, fixtures, and commercial work across the Tulsa metro. Tell me a bit more about the issue, or call ${PHONE} and a real person will help right away.`;
}
