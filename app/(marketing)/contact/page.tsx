import type { Metadata } from "next";
import { Phone, MessageSquare, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageScene } from "@/components/motion/page-scene";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { GeoFaq } from "@/components/sections/geo-faq";
import { siteConfig, formatPhone } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, text, or book a Tulsa plumber. Same-day dispatch across the Tulsa metro, 24/7 emergency service.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const phone = formatPhone(siteConfig.phone);
  const address = [
    siteConfig.address.street,
    siteConfig.address.city,
    siteConfig.address.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <PageScene variant="water" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Get in touch
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              Book a service call.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              Call or text for the fastest response — a real person answers.
              Same-day dispatch across the Tulsa metro, 24/7 for emergencies.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg">
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  <span className="ml-2">Call {phone}</span>
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`sms:${siteConfig.phone}`}>
                  <MessageSquare className="h-4 w-4" />
                  <span className="ml-2">Text us a photo</span>
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal index={1}>
            <ul className="space-y-4 text-foreground-muted">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-brass" />
                <span>{siteConfig.hours}</span>
              </li>
              {address && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-brass" />
                  <span>{address}</span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-brass" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-accent">
                  {phone}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-foreground-muted">
              When you call or text, share your address, the service you need,
              and a one-line description of the problem — photos help us arrive
              ready.
            </p>
          </Reveal>
        </div>
      </Container>

      <GeoFaq
        context={{ type: "contact" }}
        eyebrow="Before you call"
        title="Contact questions"
      />
    </>
  );
}
