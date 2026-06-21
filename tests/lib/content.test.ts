import { expect, test } from "vitest";
import {
  services,
  serviceAreas,
  getFaqForContext,
  siteConfig,
  formatPhone,
} from "@/lib/content";

test("siteConfig has required NAP fields", () => {
  expect(siteConfig.name).toBe("OKPlumb");
  expect(siteConfig.phone).toBe("9188518203");
  expect(siteConfig.url).toBe("https://okplumb.com");
  expect(siteConfig.serviceAreaRegion).toBe("Tulsa Metro, OK");
});

test("siteConfig intentionally has no public email field", () => {
  // Leads route to projects@udgok.com via env (LEAD_EMAIL_TO) — never surfaced.
  expect((siteConfig as Record<string, unknown>).email).toBeUndefined();
});

test("formatPhone pretty-prints 10-digit US numbers", () => {
  expect(formatPhone("9188518203")).toBe("(918) 851-8203");
  expect(formatPhone("+1 (918) 851-8203")).toBe("(918) 851-8203");
  // Non-matching input passes through unchanged
  expect(formatPhone("12345")).toBe("12345");
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
    "tulsa",
    "broken-arrow",
    "jenks",
    "owasso",
    "bixby",
    "sand-springs",
    "sapulpa",
    "claremore",
    "catoosa",
    "coweta",
    "glenpool",
    "collinsville",
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
  expect(faqs.some((f) => f.question.toLowerCase().includes("water heater"))).toBe(
    true,
  );
});

test("getFaqForContext returns area-specific FAQs", () => {
  const faqs = getFaqForContext({ type: "area", slug: "jenks" });
  expect(faqs.length).toBeGreaterThanOrEqual(4);
  expect(faqs.some((f) => f.question.toLowerCase().includes("jenks"))).toBe(true);
});
