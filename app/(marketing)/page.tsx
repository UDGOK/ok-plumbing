import * as React from "react";
import { SpotlightHero } from "@/components/sections/spotlight-hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyBand } from "@/components/sections/why-band";
import { Process } from "@/components/sections/process";
import { WorkStrip } from "@/components/sections/work-strip";
import { AreasTeaser } from "@/components/sections/areas-teaser";
import { ReviewsPreview } from "@/components/sections/reviews-preview";
import { GeoFaq } from "@/components/sections/geo-faq";
import { CtaBand } from "@/components/sections/cta-band";
import { localBusinessJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <SpotlightHero
        problemImage="/photos/rough-in-framing.jpg"
        fixedImage="/photos/commercial-restroom-marble.jpg"
      />
      <TrustBar />
      <ServicesGrid />
      <WhyBand />
      <Process />
      <WorkStrip />
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
