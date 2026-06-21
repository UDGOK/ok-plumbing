import * as React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { serviceAreas } from "@/lib/content";

export function AreasTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Where We Work
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
              The whole Tulsa metro.
            </h2>
            <p className="mt-4 text-foreground-muted">
              Twelve cities, one flat-rate diagnostic. If you&apos;re in the
              Tulsa area, we&apos;re close.
            </p>
            <Link
              href="/service-areas"
              className="mt-6 inline-block border-b-2 border-brass pb-1 font-medium text-foreground hover:text-accent"
            >
              See all service areas →
            </Link>
          </Reveal>

          <Reveal index={1}>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="group flex items-center gap-2 text-foreground hover:text-accent"
                  >
                    <MapPin className="h-4 w-4 text-brass transition-transform group-hover:scale-110" />
                    <span>{area.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
