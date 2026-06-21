import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { GeoFaq } from "@/components/sections/geo-faq";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Offers & Financing",
  description:
    "Financing on repipes, water heaters, and sewer work — plus current offers for Tulsa homeowners.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Offers &amp; Financing
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              Big job? Spread the cost.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              Financing on repipes, water heater replacements, and sewer line
              work — apply online in minutes with no score impact to shop rates.
            </p>
          </Reveal>
        </Container>
      </section>

      <GeoFaq
        context={{ type: "financing" }}
        eyebrow="Financing"
        title="Financing questions"
      />
      <CtaBand />
    </>
  );
}
