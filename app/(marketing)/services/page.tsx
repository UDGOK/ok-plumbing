import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Plumbing Services",
  description:
    "Drain cleaning, water heaters, repiping, leak detection, sewer line, and fixtures — full-service plumbing across the Tulsa metro.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              What we do
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              Plumbing services, done right.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              One honest crew for everything from a slow drain to a whole-home
              repipe. Flat-rate diagnostics, warranted work.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} index={i % 2}>
              <Link
                href={`/services/${s.slug}`}
                className="group block h-full rounded-lg border border-border p-7 transition-colors hover:bg-surface-muted"
              >
                <h2 className="font-display text-2xl font-medium">{s.name}</h2>
                <p className="mt-3 text-foreground-muted">
                  {s.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Learn more{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
