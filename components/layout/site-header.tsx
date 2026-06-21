"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Phone,
  MapPin,
  Info,
  Star,
  Tag,
  Siren,
  Droplets,
  Flame,
  GitBranch,
  Search,
  Waves,
  Wrench,
  UtensilsCrossed,
  Building2,
  Stethoscope,
  ClipboardCheck,
  Trash2,
  ShieldCheck,
  HardHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Container } from "./container";
import { cn } from "@/lib/utils";
import {
  services,
  serviceAreas,
  siteConfig,
  formatPhone,
  type IconName,
} from "@/lib/content";
import { commercialServices, type CommercialService } from "@/lib/commercial";

const serviceIcon: Record<IconName, React.ElementType> = {
  droplets: Droplets,
  flame: Flame,
  "git-branch": GitBranch,
  search: Search,
  waves: Waves,
  wrench: Wrench,
};

const commercialIcon: Record<CommercialService["icon"], React.ElementType> = {
  utensils: UtensilsCrossed,
  build: Building2,
  medical: Stethoscope,
  manage: ClipboardCheck,
  grease: Trash2,
  backflow: ShieldCheck,
  heater: Flame,
  jetting: Droplets,
  construction: HardHat,
};

const companyItems = [
  { href: "/about", icon: Info, title: "About", desc: "Family-owned, licensed, insured." },
  { href: "/reviews", icon: Star, title: "Reviews", desc: "What Tulsa homeowners say." },
  { href: "/offers", icon: Tag, title: "Offers & Financing", desc: "Spread the cost of big jobs." },
  { href: "/emergency", icon: Siren, title: "24/7 Emergency", desc: "Burst-pipe response, any hour." },
];

const triggerCls =
  "h-8 rounded-full bg-transparent px-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted hover:bg-surface-muted hover:text-foreground data-open:bg-surface-muted data-open:text-accent data-popup-open:bg-surface-muted data-popup-open:text-accent";

function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border pb-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
      {children}
    </div>
  );
}

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-foreground text-background">
      {children}
    </span>
  );
}

const mobileLink =
  "rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-surface-muted";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const phone = formatPhone(siteConfig.phone);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      {/* Announcement bar */}
      <div className="bg-foreground text-background">
        <Container className="flex h-9 items-center justify-between gap-3 text-xs">
          <span className="truncate">
            <span className="font-semibold">24/7 emergency service</span>
            <span className="hidden sm:inline"> across the Tulsa metro — honest, flat-rate work.</span>
          </span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex-none rounded-full bg-background/15 px-3 py-1 font-medium transition-colors hover:bg-background/25"
          >
            Call {phone}
          </a>
        </Container>
      </div>

      <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Left: wordmark */}
        <Link
          href="/"
          className="justify-self-start font-display text-2xl font-medium tracking-tight"
        >
          OKPlumb
        </Link>

        {/* Center: pill nav (desktop) */}
        <nav
          className="hidden justify-self-center lg:block"
          aria-label="Primary"
        >
          <NavigationMenu>
            <NavigationMenuList className="gap-0.5 rounded-full border border-border bg-surface/70 px-1.5 py-1 backdrop-blur">
              {/* SERVICES */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[720px] p-6">
                    <div className="grid grid-cols-[1.45fr_1fr] gap-6">
                      <div>
                        <PanelHeading>Our Services</PanelHeading>
                        <ul className="mt-4 grid grid-cols-2 gap-1">
                          {services.map((s) => {
                            const Icon = serviceIcon[s.iconName];
                            return (
                              <li key={s.slug}>
                                <NavigationMenuLink asChild className="rounded-lg p-3 hover:bg-surface-muted">
                                  <Link
                                    href={`/services/${s.slug}`}
                                    className="flex items-start gap-3"
                                  >
                                    <IconTile>
                                      <Icon className="h-4 w-4" />
                                    </IconTile>
                                    <span className="min-w-0">
                                      <span className="block font-medium text-foreground">
                                        {s.name}
                                      </span>
                                      <span className="mt-0.5 line-clamp-2 text-xs text-foreground-muted">
                                        {s.shortDescription}
                                      </span>
                                    </span>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Featured emergency tile */}
                      <div className="flex flex-col justify-between rounded-xl bg-accent p-5 text-accent-foreground">
                        <div>
                          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-foreground/70">
                            24/7
                          </p>
                          <p className="mt-2 font-display text-xl font-medium leading-tight">
                            Plumbing emergency?
                          </p>
                          <p className="mt-2 text-sm text-accent-foreground/80">
                            Same-day dispatch across the Tulsa metro. A real
                            plumber answers.
                          </p>
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                          <NavigationMenuLink asChild className="bg-transparent p-0 hover:bg-transparent">
                            <Link
                              href="/emergency"
                              className="text-sm font-medium underline-offset-4 hover:underline"
                            >
                              Emergency service →
                            </Link>
                          </NavigationMenuLink>
                          <a
                            href={`tel:${siteConfig.phone}`}
                            className="text-lg font-semibold"
                          >
                            {phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* COMMERCIAL */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>
                  Commercial
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[640px] p-6">
                    <PanelHeading>Commercial Plumbing</PanelHeading>
                    <ul className="mt-4 grid grid-cols-2 gap-1">
                      {commercialServices.map((s) => {
                        const Icon = commercialIcon[s.icon];
                        return (
                          <li key={s.slug}>
                            <NavigationMenuLink asChild className="rounded-lg p-2.5 hover:bg-surface-muted">
                              <Link href={`/commercial/${s.slug}`} className="flex items-center gap-2.5">
                                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md bg-foreground text-background">
                                  <Icon className="h-3.5 w-3.5" />
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                  {s.name}
                                </span>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-4 border-t border-border pt-3">
                      <NavigationMenuLink asChild className="bg-transparent p-0 hover:bg-transparent">
                        <Link
                          href="/commercial"
                          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                        >
                          All commercial services →
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* AREAS */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>
                  Areas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[620px] p-6">
                    <PanelHeading>Where We Work</PanelHeading>
                    <ul className="mt-4 grid grid-cols-3 gap-1">
                      {serviceAreas.map((a) => (
                        <li key={a.slug}>
                          <NavigationMenuLink asChild className="rounded-lg p-2.5 hover:bg-surface-muted">
                            <Link
                              href={`/service-areas/${a.slug}`}
                              className="flex items-center gap-2"
                            >
                              <MapPin className="h-4 w-4 flex-none text-brass" />
                              <span className="text-sm font-medium text-foreground">
                                {a.name}
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 border-t border-border pt-3">
                      <NavigationMenuLink asChild className="bg-transparent p-0 hover:bg-transparent">
                        <Link
                          href="/service-areas"
                          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                        >
                          See all service areas →
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* COMPANY */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[560px] p-6">
                    <PanelHeading>The Company</PanelHeading>
                    <ul className="mt-4 grid grid-cols-2 gap-1">
                      {companyItems.map((c) => (
                        <li key={c.href}>
                          <NavigationMenuLink asChild className="rounded-lg p-3 hover:bg-surface-muted">
                            <Link href={c.href} className="flex items-start gap-3">
                              <IconTile>
                                <c.icon className="h-4 w-4" />
                              </IconTile>
                              <span className="min-w-0">
                                <span className="block font-medium text-foreground">
                                  {c.title}
                                </span>
                                <span className="mt-0.5 block text-xs text-foreground-muted">
                                  {c.desc}
                                </span>
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* EMERGENCY (flat, accented) */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="inline-flex h-8 items-center rounded-full bg-transparent px-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent hover:bg-surface-muted hover:text-accent"
                >
                  <Link href="/emergency">Emergency</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right: actions (desktop) */}
        <div className="hidden items-center gap-2 justify-self-end lg:flex">
          <Button asChild variant="ghost" size="sm">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" />
              <span className="ml-1">{phone}</span>
            </a>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/contact">Book Service</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="col-start-3 justify-self-end lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-96">
              <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                <Link href="/services" onClick={() => setOpen(false)} className={mobileLink}>
                  All Services
                </Link>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className={cn(mobileLink, "pl-4 text-foreground-muted")}
                  >
                    {s.name}
                  </Link>
                ))}
                <Link href="/service-areas" onClick={() => setOpen(false)} className={mobileLink}>
                  Service Areas
                </Link>
                <Link href="/commercial" onClick={() => setOpen(false)} className={mobileLink}>
                  Commercial
                </Link>
                {commercialServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/commercial/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className={cn(mobileLink, "pl-4 text-foreground-muted")}
                  >
                    {s.name}
                  </Link>
                ))}
                {companyItems.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className={mobileLink}
                  >
                    {c.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-2">
                <Button asChild>
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="h-4 w-4" />
                    <span className="ml-2">Call {phone}</span>
                  </a>
                </Button>
                <Button asChild variant="outline" onClick={() => setOpen(false)}>
                  <Link href="/contact">Book Service</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
