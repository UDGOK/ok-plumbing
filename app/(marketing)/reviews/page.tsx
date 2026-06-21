import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageScene } from "@/components/motion/page-scene";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What Tulsa homeowners say about OKPlumb. Read verified reviews on our Google Business profile.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <PageScene variant="pipes" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Reviews
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              Quietly recommended.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              We let the work speak. Read verified feedback from Tulsa
              homeowners.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <Reveal>
          <div className="rounded-lg border border-border bg-surface p-10 text-center">
            <div className="flex justify-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-6 w-6 fill-brass text-brass" />
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-md text-foreground-muted">
              Our verified reviews live on our Google Business profile.
            </p>
            {siteConfig.social.google && (
              <a
                href={siteConfig.social.google}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block border-b-2 border-brass pb-1 font-medium hover:text-accent"
              >
                Read reviews on Google →
              </a>
            )}
          </div>
        </Reveal>
      </Container>
      <CtaBand />
    </>
  );
}
