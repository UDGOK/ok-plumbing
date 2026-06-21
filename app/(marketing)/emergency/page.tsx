import type { Metadata } from "next";
import { Phone, Clock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { GeoFaq } from "@/components/sections/geo-faq";
import { CtaBand } from "@/components/sections/cta-band";
import { siteConfig, formatPhone } from "@/lib/content";

export const metadata: Metadata = {
  title: "24/7 Emergency Plumber",
  description:
    "Burst pipe, sewer backup, or no water in Tulsa? Call our 24/7 emergency plumbers. Honest ETA, price before we dispatch.",
  alternates: { canonical: "/emergency" },
};

const steps = [
  {
    n: "01",
    t: "Shut off the main",
    d: "Find your main water valve and turn it clockwise to stop the flow to the house.",
  },
  {
    n: "02",
    t: "Relieve the pressure",
    d: "Open a low faucet — a tub spout or outdoor spigot — to drain the lines.",
  },
  {
    n: "03",
    t: "Call us",
    d: `One call and a licensed plumber is on the way with a real ETA.`,
  },
];

export default function EmergencyPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              24/7 Emergency Line
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              Burst pipe? We&apos;re already moving.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              Day, night, holiday — a licensed Tulsa plumber answers and gives
              you an honest arrival window, then a written price before we touch
              anything.
            </p>
          </Reveal>
          <Reveal index={1} className="mt-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <a href={`tel:${siteConfig.emergencyPhone}`}>
                  <Phone className="h-4 w-4" />
                  <span className="ml-2">
                    Call {formatPhone(siteConfig.emergencyPhone)} now
                  </span>
                </a>
              </Button>
              <span className="flex items-center gap-2 text-sm text-foreground-muted">
                <Clock className="h-4 w-4 text-brass" />
                Same-day dispatch
              </span>
              <span className="flex items-center gap-2 text-sm text-foreground-muted">
                <ShieldCheck className="h-4 w-4 text-brass" />
                Licensed &amp; insured
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <Reveal>
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium">
            While you wait
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} index={i}>
              <div className="rounded-lg border border-border p-6">
                <div className="font-display text-sm text-brass">{s.n}</div>
                <h3 className="mt-3 font-display text-xl font-medium">{s.t}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <GeoFaq
        context={{ type: "emergency" }}
        eyebrow="Emergencies"
        title="Emergency questions"
      />
      <CtaBand />
    </>
  );
}
