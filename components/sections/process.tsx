import * as React from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    n: "01",
    title: "Call or book online",
    body: "Tell us what's wrong. We'll dispatch same-day for most calls, priority for emergencies.",
  },
  {
    n: "02",
    title: "Flat-rate diagnostic",
    body: "Tech arrives, diagnoses, and tells you the price before any work starts. No hourly clock.",
  },
  {
    n: "03",
    title: "Clean work, warranted",
    body: "We do the work right, clean up after ourselves, and stand behind it. Done.",
  },
];

export function Process() {
  return (
    <section className="border-y border-border bg-surface py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
            Three steps. No surprises.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} index={i}>
              <div className="border-l-2 border-brass pl-6">
                <span className="font-display text-4xl font-medium text-brass">
                  {step.n}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium">
                  {step.title}
                </h3>
                <p className="mt-2 text-foreground-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
