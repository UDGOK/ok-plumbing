"use client";

import * as React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background layer — parallax */}
      <Parallax
        speed={0.3}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-surface-muted/40 via-background to-background" />
        <div className="absolute -right-32 top-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-brass/10 blur-3xl" />
      </Parallax>

      <Container className="relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <Reveal index={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Tulsa&apos;s Trusted Plumber · Est. {siteConfig.yearsInBusiness}
            </p>
          </Reveal>

          <Reveal index={1} className="mt-4">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-tight">
              Quiet pipes,{" "}
              <span className="italic text-accent">honest work.</span>
            </h1>
          </Reveal>

          <Reveal index={2} className="mt-6">
            <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
              Family-owned plumbing for the Tulsa metro — drain cleaning, water
              heaters, repipes, leak detection, and 24/7 emergency service. No
              surprises, no upsell, just clean work that lasts.
            </p>
          </Reveal>

          <Reveal index={3} className="mt-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Book a Service Call</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  <span className="ml-2">Call {siteConfig.phone}</span>
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
