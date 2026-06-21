import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const shots = [
  { src: "/photos/commercial-build-out.jpg", alt: "Commercial build-out" },
  { src: "/photos/copper-water-rough-in.jpg", alt: "Copper water rough-in" },
  { src: "/photos/backflow-preventer.jpg", alt: "Backflow install" },
  { src: "/photos/commercial-restroom-marble.jpg", alt: "Finished restroom" },
];

export function WorkStrip() {
  return (
    <section className="bg-accent/5 py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Our work
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
              From rough-in to finished.
            </h2>
            <p className="mt-4 max-w-xl text-foreground-muted">
              Real OKPlumb jobs across the Tulsa metro — copper and DWV
              rough-ins, backflow, and finished build-outs.
            </p>
          </Reveal>
          <Reveal index={1}>
            <Link
              href="/commercial"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              View all work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {shots.map((s, i) => (
            <Reveal key={s.src} index={i % 4}>
              <figure className="group overflow-hidden rounded-lg border border-border bg-surface">
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-3 py-2 text-xs text-foreground-muted">
                  {s.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
