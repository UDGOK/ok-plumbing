import * as React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { AskAi } from "@/components/footer/ask-ai";
import { services, serviceAreas, siteConfig, formatPhone } from "@/lib/content";

type Item = { label: string; href: string };

const commercial: Item[] = [
  { label: "All commercial", href: "/commercial" },
  { label: "Restaurants & kitchens", href: "/commercial/restaurants-commercial-kitchens" },
  { label: "Tenant build-outs", href: "/commercial/tenant-improvement-build-outs" },
  { label: "Medical & dental", href: "/commercial/medical-dental-offices" },
  { label: "Grease traps", href: "/commercial/grease-traps" },
  { label: "Backflow testing", href: "/commercial/backflow-testing" },
];
const company: Item[] = [
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Offers & financing", href: "/offers" },
  { label: "Emergency", href: "/emergency" },
  { label: "Contact", href: "/contact" },
];
const legal: Item[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function FooterNav({
  title,
  items,
  more,
}: {
  title: string;
  items: Item[];
  more?: Item;
}) {
  return (
    <nav aria-label={`Footer ${title}`}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-background/45">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="text-sm text-background/75 transition-colors hover:text-[#5baa97]"
            >
              {it.label}
            </Link>
          </li>
        ))}
        {more ? (
          <li>
            <Link
              href={more.href}
              className="text-sm font-medium text-[#5baa97] underline-offset-4 hover:underline"
            >
              {more.label} →
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs text-background/70 transition-colors hover:border-white/30 hover:text-background";

export function SiteFooter() {
  const phone = formatPhone(siteConfig.phone);
  const year = new Date().getFullYear();
  const license = siteConfig.licenseNumber
    ? `License ${siteConfig.licenseNumber}`
    : "Licensed & insured";

  return (
    <footer className="relative overflow-hidden bg-[#14191c] text-background">
      <Container className="relative z-10 py-16 md:py-20">
        {/* Ask AI + emergency CTA */}
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-stretch">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Ask OKPlumb AI
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium text-background">
              Got a plumbing question?
            </h2>
            <p className="mt-3 max-w-md text-background/60">
              Describe your issue — our assistant gives you a straight answer and
              points you to the fix, any time of day.
            </p>
            <AskAi />
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/50">
              Need it fixed now?
            </p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="mt-2 block font-display text-[clamp(1.8rem,4vw,2.6rem)] font-medium text-background transition-colors hover:text-[#5baa97]"
            >
              {phone}
            </a>
            <p className="mt-2 text-sm text-background/60">
              24/7 emergency · same-day across the Tulsa metro.
            </p>
            <Button asChild className="mt-5 w-fit">
              <Link href="/contact">Book a service</Link>
            </Button>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-2xl font-medium text-background">
              OKPlumb
            </div>
            <p className="mt-2 text-sm text-background/55">{siteConfig.tagline}</p>
            <p className="mt-4 text-xs text-background/45">
              {[license, siteConfig.yearsInBusiness].filter(Boolean).join(" · ")}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {siteConfig.social.google ? (
                <a
                  href={siteConfig.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pill}
                >
                  <Star className="h-3.5 w-3.5 text-brass" />
                  Google
                </a>
              ) : null}
              {siteConfig.social.facebook ? (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pill}
                >
                  Facebook
                </a>
              ) : null}
              <Link href="/reviews" className={pill}>
                Reviews
              </Link>
            </div>
          </div>

          <FooterNav
            title="Services"
            items={services.map((s) => ({
              label: s.name,
              href: `/services/${s.slug}`,
            }))}
          />
          <FooterNav title="Commercial" items={commercial} />
          <FooterNav
            title="Service Areas"
            items={serviceAreas
              .slice(0, 8)
              .map((a) => ({ label: a.name, href: `/service-areas/${a.slug}` }))}
            more={{ label: "All areas", href: "/service-areas" }}
          />
          <div className="space-y-8">
            <FooterNav title="Company" items={company} />
            <FooterNav title="Legal" items={legal} />
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-background/45 sm:flex-row sm:items-center">
          <p>
            © {year} OKPlumb · {license} · Serving the Tulsa metro
          </p>
          <p className="text-brass">Built in Tulsa, Oklahoma</p>
        </div>
      </Container>

      {/* Oversized brand wordmark (bleeds off the bottom) */}
      <div aria-hidden className="pointer-events-none select-none px-4">
        <span className="block translate-y-[20%] text-center font-display font-medium leading-none tracking-tight text-white/[0.04] text-[24vw]">
          OKPlumb
        </span>
      </div>
    </footer>
  );
}
