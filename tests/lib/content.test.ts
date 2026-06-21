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
