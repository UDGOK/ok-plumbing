import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Phone, ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";
import { PageScene, type SceneVariant } from "@/components/motion/page-scene";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/sections/cta-band";
import { commercialServices, getCommercialBySlug } from "@/lib/commercial";
import { siteConfig, formatPhone } from "@/lib/content";
import { faqPageJsonLd, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return commercialServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getCommercialBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/commercial/${service.slug}` },
  };
}

const commercialScene: Record<string, SceneVariant> = {
  utensils: "flow",
  build: "blueprint",
  medical: "radar",
  manage: "pipes",
  grease: "flow",
  backflow: "gauge",
  heater: "flame",
  jetting: "water",
  construction: "blueprint",
};

export default async function CommercialServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getCommercialBySlug(slug);
  if (!service) notFound();

  const phone = formatPhone(siteConfig.phone);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <PageScene variant={commercialScene[service.icon] ?? "pipes"} />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal>
            <Link
              href="/commercial"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Commercial
            </Link>
            <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              {service.name}
            </h1>
          </Reveal>
          <Reveal index={1} className="mt-6">
            <div className="max-w-3xl rounded-xl border border-border border-l-4 border-l-accent bg-background p-5 md:p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                The short answer
              </p>
              <p className="mt-2 text-lg leading-relaxed text-foreground">
                {service.answer}
              </p>
            </div>
          </Reveal>
          <Reveal index={2} className="mt-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Request a quote</Link>
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

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          {/* What's included */}
          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium">
                What&apos;s included
              </h2>
            </Reveal>
            <Reveal index={1} className="mt-8">
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-brass text-brass">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Trust card */}
          <Reveal index={2}>
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                Why OKPlumb
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
                <li>Licensed &amp; insured for commercial work</li>
                <li>Code-compliant to Oklahoma plumbing code &amp; local AHJ</li>
                <li>Flat-rate pricing with clean documentation</li>
                <li>Same-day &amp; 24/7 emergency response</li>
                <li>Tenant-improvement &amp; build-out experience</li>
              </ul>
              <Button asChild className="mt-6 w-full" size="lg">
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  <span className="ml-2">{phone}</span>
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* FAQ */}
      <section className="border-t border-border py-16 md:py-24">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Questions
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
              {service.name} FAQs.
            </h2>
          </Reveal>
          <Reveal index={1} className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, i) => (
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
              name: service.name,
              description: service.metaDescription,
              path: `/commercial/${service.slug}`,
            }),
            faqPageJsonLd(service.faqs),
          ]),
        }}
      />
    </>
  );
}
