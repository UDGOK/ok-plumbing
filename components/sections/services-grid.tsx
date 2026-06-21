import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Droplets,
  Flame,
  GitBranch,
  Search,
  Waves,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { services, type IconName } from "@/lib/content";

const iconMap: Record<IconName, React.ElementType> = {
  droplets: Droplets,
  flame: Flame,
  "git-branch": GitBranch,
  search: Search,
  waves: Waves,
  wrench: Wrench,
};

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            What We Do
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
            Six services, done right.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.iconName];
            return (
              <Reveal key={service.slug} index={i} direction="up">
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:shadow-[var(--shadow)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-surface-muted text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {service.shortDescription}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
