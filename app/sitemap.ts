import type { MetadataRoute } from "next";
import { siteConfig, services, serviceAreas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    "",
    "/services",
    "/service-areas",
    "/emergency",
    "/offers",
    "/about",
    "/reviews",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const servicePaths = services.map((s) => `/services/${s.slug}`);
  const areaPaths = serviceAreas.map((a) => `/service-areas/${a.slug}`);

  return [...staticPaths, ...servicePaths, ...areaPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
