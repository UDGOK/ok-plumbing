import * as React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/content";

export function CtaBand() {
  return (
    <section className="bg-accent py-16 text-accent-foreground md:py-20">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-tight">
              Got a plumbing problem?
            </h2>
            <p className="mt-2 text-accent-foreground/80">
              Same-day dispatch across the Tulsa metro. Call or book now.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Book a Service Call</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent-foreground/30 bg-transparent text-accent-foreground hover:bg-accent-foreground/10 hover:text-accent-foreground"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4" />
                <span className="ml-2">{siteConfig.phone}</span>
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
