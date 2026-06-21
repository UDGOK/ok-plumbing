import { siteConfig, type Faq } from "@/lib/content";

interface RatingInput {
  ratingValue: string;
  reviewCount: number;
}

interface LocalBusinessLd {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  image: string;
  priceRange: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: { "@type": string; latitude: number; longitude: number };
  areaServed: string[];
  openingHours: string;
  sameAs: string[];
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: number;
  };
}

export function localBusinessJsonLd(rating?: RatingInput): LocalBusinessLd {
  const base: LocalBusinessLd = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: siteConfig.name,
    description: `${siteConfig.tagline} Family-owned plumbing serving the ${siteConfig.serviceAreaRegion}.`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    // No email in JSON-LD — public email is intentionally not surfaced.
    // Leads route to projects@udgok.com via the contact form + /api/leads.
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
      "Tulsa",
      "Broken Arrow",
      "Jenks",
      "Owasso",
      "Bixby",
      "Sand Springs",
      "Sapulpa",
      "Claremore",
      "Catoosa",
      "Coweta",
      "Glenpool",
      "Collinsville",
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
