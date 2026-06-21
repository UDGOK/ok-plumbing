import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Family-owned, licensed, and insured plumbing for the Tulsa metro. Flat-rate pricing, no upsell, warranted work.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    t: "Upfront, written pricing",
    d: "You approve the number before any work begins. No hourly clock, no surprises on the invoice.",
  },
  {
    t: "Licensed, permitted, warranted",
    d: "Real plumbers, real permits, real guarantees on every job.",
  },
  {
    t: "No upsell",
    d: "We size the fix to your home and your budget, and tell you honestly what can wait.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              About OKPlumb
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              The neighbor you call, not the company you dread.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              {siteConfig.tagline} We&apos;re a family-owned, licensed and
              insured plumbing company serving the Tulsa metro with honest work
              that lasts.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.t} index={i}>
              <div className="rounded-lg border border-border p-6">
                <h2 className="font-display text-xl font-medium">{v.t}</h2>
                <p className="mt-2 text-sm text-foreground-muted">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
