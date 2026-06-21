import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageScene } from "@/components/motion/page-scene";
import { Reveal } from "@/components/motion/reveal";
import { GeoFaq } from "@/components/sections/geo-faq";
import { CtaBand } from "@/components/sections/cta-band";
import { serviceAreas, services, getAreaBySlug } from "@/lib/content";

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return {
    title: `Plumber in ${area.name}, OK`,
    description: `Licensed plumbing service in ${area.name}, ${area.county}. ${area.blurb}`,
    alternates: { canonical: `/service-areas/${area.slug}` },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <PageScene variant="pipes" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              {area.county}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight">
              Plumber in {area.name}, OK
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              {area.blurb}
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <Reveal>
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium">
            Services in {area.name}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} index={i % 2}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border p-5 transition-colors hover:bg-surface-muted"
              >
                <span className="font-medium">{s.name}</span>
                <ArrowRight className="h-4 w-4 text-brass transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      <GeoFaq
        context={{ type: "area", slug: area.slug }}
        eyebrow={area.name}
        title={`Plumbing in ${area.name}`}
      />
      <CtaBand />
    </>
  );
}
