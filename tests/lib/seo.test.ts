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
  expect(json.aggregateRating).toBeDefined();
  expect(json.aggregateRating!.ratingValue).toBe("4.9");
  expect(json.aggregateRating!.reviewCount).toBe(127);
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
