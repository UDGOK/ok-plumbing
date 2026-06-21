import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageScene } from "@/components/motion/page-scene";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { serviceAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Plumbing service across the Tulsa metro — Tulsa, Broken Arrow, Jenks, Owasso, Bixby, and more.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <PageScene variant="pipes" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Where we work
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              The whole Tulsa metro.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              One flat-rate diagnostic, no travel surcharge inside our service
              area. If you&apos;re nearby and unsure, just call.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((a, i) => (
            <Reveal key={a.slug} index={i % 3}>
              <Link
                href={`/service-areas/${a.slug}`}
                className="block h-full rounded-lg border border-border p-6 transition-colors hover:bg-surface-muted"
              >
                <h2 className="font-display text-xl font-medium">{a.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wide text-brass">
                  {a.county}
                </p>
                <p className="mt-3 text-sm text-foreground-muted">{a.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
