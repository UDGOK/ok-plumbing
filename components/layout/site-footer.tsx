import * as React from "react";
import Link from "next/link";
import { Container } from "./container";
import { services, serviceAreas, siteConfig, formatPhone } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-medium">OKPlumb</div>
            <p className="mt-2 text-sm text-foreground-muted">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-xs text-foreground-muted">
              License {siteConfig.licenseNumber} · {siteConfig.yearsInBusiness}
            </p>
          </div>

          <nav aria-label="Footer services">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Services
            </h2>
            <ul className="mt-3 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-foreground hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer service areas">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Service Areas
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {serviceAreas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}`}
                    className="text-sm text-foreground hover:text-accent"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Contact
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-accent"
                >
                  {formatPhone(siteConfig.phone)}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Send a message
                </Link>
              </li>
              <li className="text-foreground-muted">{siteConfig.hours}</li>
              <li className="text-foreground-muted">
                {siteConfig.address.street}, {siteConfig.address.city},{" "}
                {siteConfig.address.state}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-foreground-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} OKPlumb
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
            <span className="text-brass">Built in Tulsa</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
