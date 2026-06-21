import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { getFaqForContext, type FaqContext } from "@/lib/content";
import { faqPageJsonLd } from "@/lib/seo";

interface GeoFaqProps {
  context: FaqContext;
  title?: string;
  eyebrow?: string;
}

export function GeoFaq({ context, title, eyebrow }: GeoFaqProps) {
  const faqs = getFaqForContext(context);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            {eyebrow ?? "Questions"}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
            {title ?? "Things people ask us."}
          </h2>
        </Reveal>

        <Reveal index={1} className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
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

      {/* JSON-LD: rendered server-side for crawlers (spec §6) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(faqs)),
        }}
      />
    </section>
  );
}
