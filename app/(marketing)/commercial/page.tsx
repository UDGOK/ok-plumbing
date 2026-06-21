import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  UtensilsCrossed,
  Building2,
  Stethoscope,
  ClipboardCheck,
  Trash2,
  ShieldCheck,
  Flame,
  Droplets,
  HardHat,
  Phone,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";
import { PageScene } from "@/components/motion/page-scene";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/sections/cta-band";
import { commercialHub, commercialServices } from "@/lib/commercial";
import { siteConfig, formatPhone } from "@/lib/content";
import { faqPageJsonLd, serviceJsonLd, howToJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Commercial Plumber Tulsa | Commercial Plumbing Contractor",
  description:
    "OKPlumb is a commercial plumbing contractor in Tulsa — restaurants, offices, medical/dental, retail, and multi-tenant properties. Build-outs, drains, grease traps, backflow, 24/7. Call (918) 851-8203.",
  alternates: { canonical: "/commercial" },
};

const icons = {
  utensils: UtensilsCrossed,
  build: Building2,
  medical: Stethoscope,
  manage: ClipboardCheck,
  grease: Trash2,
  backflow: ShieldCheck,
  heater: Flame,
  jetting: Droplets,
  construction: HardHat,
} as const;

const trust = [
  "Licensed & insured commercial plumbing",
  "Tenant-improvement & medical/dental build-out experience",
  "Code-compliant to Oklahoma plumbing code & local AHJ",
  "Flat-rate pricing with documentation for your books",
  "24/7 emergency response across the Tulsa metro",
];

export default function CommercialHubPage() {
  const phone = formatPhone(siteConfig.phone);
  const howtoSteps = [
    { name: "Call or request a quote", text: "Tell us the property and the scope. We respond fast and, for emergencies, dispatch same-day." },
    { name: "On-site assessment & flat-rate quote", text: "We scope the work and give you a written, flat-rate price before anything starts." },
    { name: "Scheduled, code-compliant work", text: "We complete the work around your hours, inspection-gated where required." },
    { name: "Documented closeout", text: "You get itemized invoicing and service records — inspection-ready for your files." },
  ];

  const work = [
    { src: "/photos/commercial-build-out.jpg", alt: "Commercial tenant build-out framing" },
    { src: "/photos/copper-water-rough-in.jpg", alt: "Copper domestic water rough-in" },
    { src: "/photos/commercial-dwv-rough-in.jpg", alt: "Cast-iron DWV rough-in" },
    { src: "/photos/backflow-preventer.jpg", alt: "Backflow preventer installation" },
    { src: "/photos/ada-restroom-shower.jpg", alt: "ADA restroom build-out" },
    { src: "/photos/commercial-restroom-marble.jpg", alt: "Finished commercial restroom" },
    { src: "/photos/commercial-restroom-grey.jpg", alt: "Finished ADA restroom" },
    { src: "/photos/brass-console-sink.jpg", alt: "Brass console sink & P-trap" },
  ];

  return (
    <>
      {/* Hero + answer-first executive summary */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <PageScene variant="pipes" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Commercial Plumbing · Tulsa Metro
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              The commercial plumber Tulsa businesses keep on speed dial.
            </h1>
          </Reveal>
          <Reveal index={1} className="mt-6">
            <div className="max-w-3xl rounded-xl border border-border border-l-4 border-l-accent bg-background p-5 md:p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                The short answer
              </p>
              <p className="mt-2 text-lg leading-relaxed text-foreground">
                {commercialHub.answer}
              </p>
            </div>
          </Reveal>
          <Reveal index={2} className="mt-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Request commercial service</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  <span className="ml-2">Call {phone}</span>
                </a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Verticals grid */}
      <Container className="py-16 md:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            What we do
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
            Commercial plumbing services.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {commercialServices.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.slug} index={i % 3}>
                <Link
                  href={`/commercial/${s.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:shadow-[var(--shadow)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-surface-muted text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium leading-tight">
                    {s.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground-muted">
                    {s.answer}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>

      {/* E-E-A-T / why us */}
      <section className="border-y border-border bg-surface py-16 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
                Why OKPlumb
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3.5vw,2.5rem)] font-medium tracking-tight">
                Built for commercial work, not just houses.
              </h2>
              <p className="mt-4 text-foreground-muted">
                We come from the commercial and tenant-improvement side of the
                trade — coordinating with general contractors, architects, and
                inspectors on build-outs for restaurants, offices, and medical
                and dental suites. That means fewer surprises, cleaner
                documentation, and work that passes inspection the first time.
              </p>
            </Reveal>
            <Reveal index={1}>
              <ul className="grid gap-3">
                {trust.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-accent" />
                    <span className="text-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How it works (HowTo) */}
      <Container className="py-16 md:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            How it works
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,3.5vw,2.5rem)] font-medium tracking-tight">
            From call to documented closeout.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howtoSteps.map((s, i) => (
            <Reveal key={s.name} index={i}>
              <div className="rounded-lg border border-border p-6">
                <div className="font-display text-sm text-brass">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-display text-lg font-medium leading-tight">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-foreground-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Recent work */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Recent work
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
              Real commercial jobs, real results.
            </h2>
            <p className="mt-4 max-w-2xl text-foreground-muted">
              From rough-in to finished space — a look at recent OKPlumb
              commercial and tenant-improvement work across the Tulsa metro.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {work.map((w, i) => (
              <Reveal key={w.src} index={i % 4}>
                <figure className="group overflow-hidden rounded-lg border border-border">
                  <div className="aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.src}
                      alt={w.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="px-3 py-2 text-xs text-foreground-muted">
                    {w.alt}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16 md:py-24">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Questions
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
              Commercial plumbing FAQs.
            </h2>
          </Reveal>
          <Reveal index={1} className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {commercialHub.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-display text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground-muted">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Container>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: "Commercial Plumbing",
              description: commercialHub.answer,
              path: "/commercial",
            }),
            faqPageJsonLd(commercialHub.faqs),
            howToJsonLd({
              name: "How to get commercial plumbing service from OKPlumb",
              steps: howtoSteps,
            }),
          ]),
        }}
      />
    </>
  );
}
