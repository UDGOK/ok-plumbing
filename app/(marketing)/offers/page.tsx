import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageScene } from "@/components/motion/page-scene";
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
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <PageScene variant="pipes" />
        <Container className="relative z-10 py-16 md:py-20">
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

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              What you can finance
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium">
              Big repairs, manageable payments.
            </h2>
            <p className="mt-4 text-foreground-muted">
              When a major system fails, you shouldn&apos;t have to choose
              between doing it right and doing it now. Financing lets you fix it
              properly today and pay over time.
            </p>
            <ul className="mt-6 grid gap-2 text-foreground">
              <li>Whole-home repipes</li>
              <li>Water heater &amp; tankless replacement</li>
              <li>Sewer line repair &amp; replacement</li>
              <li>Slab leak repair</li>
              <li>Commercial build-outs &amp; tenant improvements</li>
            </ul>
          </Reveal>
          <Reveal index={1}>
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                How it works
              </p>
              <ol className="mt-5 space-y-5">
                <li>
                  <span className="font-display text-sm text-brass">01</span>
                  <p className="mt-1 font-medium">Apply online in minutes</p>
                  <p className="text-sm text-foreground-muted">
                    See your options and rates quickly, before the work starts.
                  </p>
                </li>
                <li>
                  <span className="font-display text-sm text-brass">02</span>
                  <p className="mt-1 font-medium">Pick a plan that fits</p>
                  <p className="text-sm text-foreground-muted">
                    Choose the term and monthly payment that work for your
                    budget.
                  </p>
                </li>
                <li>
                  <span className="font-display text-sm text-brass">03</span>
                  <p className="mt-1 font-medium">We get to work</p>
                  <p className="text-sm text-foreground-muted">
                    No waiting on paperwork — we schedule your repair right away.
                  </p>
                </li>
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>

      <GeoFaq
        context={{ type: "financing" }}
        eyebrow="Financing"
        title="Financing questions"
      />
      <CtaBand />
    </>
  );
}
