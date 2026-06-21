import * as React from "react";
import { SpotlightHero } from "@/components/sections/spotlight-hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { AreasTeaser } from "@/components/sections/areas-teaser";
import { ReviewsPreview } from "@/components/sections/reviews-preview";
import { GeoFaq } from "@/components/sections/geo-faq";
import { CtaBand } from "@/components/sections/cta-band";
import { BrassDivider } from "@/components/layout/brass-divider";
import { localBusinessJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <SpotlightHero />
      <TrustBar />
      <ServicesGrid />
      <BrassDivider />
      <Process />
      <AreasTeaser />
      <ReviewsPreview />
      <GeoFaq context={{ type: "home" }} />
      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd()),
        }}
      />
    </>
  );
}
