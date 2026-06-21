import { Clock, ShieldCheck, Receipt, Truck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const pillars = [
  {
    icon: Clock,
    title: "24/7 Emergency",
    body: "A real plumber answers day or night — no machines, no waiting until morning.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    body: "Fully licensed and insured for both home and commercial work in Oklahoma.",
  },
  {
    icon: Receipt,
    title: "Upfront Flat-Rate",
    body: "A written price before we touch anything. What we quote is what you pay.",
  },
  {
    icon: Truck,
    title: "Same-Day Service",
    body: "Fast dispatch across the Tulsa metro, with honest arrival windows.",
  },
];

export function WhyBand() {
  return (
    <section className="bg-foreground py-20 text-background md:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            Why OKPlumb
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight text-background">
            The plumber Tulsa actually wants to call back.
          </h2>
          <p className="mt-4 max-w-2xl text-background/70">
            No upsells, no mystery invoices, no &ldquo;we&apos;ll get to you
            next week.&rdquo; Just clean, code-compliant work and a straight
            answer every time.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} index={i}>
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/25">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#5baa97]/15 text-[#5baa97]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium text-background">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-background/65">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
