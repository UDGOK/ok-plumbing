import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageScene, type SceneVariant } from "@/components/motion/page-scene";
import { Reveal } from "@/components/motion/reveal";
import { GeoFaq } from "@/components/sections/geo-faq";
import { CtaBand } from "@/components/sections/cta-band";
import { services, getServiceBySlug } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

const serviceScene: Record<string, SceneVariant> = {
  droplets: "water",
  flame: "flame",
  "git-branch": "pipes",
  search: "radar",
  waves: "flow",
  wrench: "pipes",
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <PageScene variant={serviceScene[service.iconName] ?? "water"} />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Service
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              {service.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              {service.shortDescription}
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
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
      </Container>

      <GeoFaq
        context={{ type: "service", slug: service.slug }}
        eyebrow={service.name}
        title="Questions about this service"
      />
      <CtaBand />
    </>
  );
}
