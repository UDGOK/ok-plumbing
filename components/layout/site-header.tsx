"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Container } from "./container";
import { cn } from "@/lib/utils";
import { services, serviceAreas, siteConfig } from "@/lib/content";

const navLinks = [
  { href: "/emergency", label: "Emergency" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
];

const mobileLink =
  "rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-surface-muted";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-2xl font-medium tracking-tight"
        >
          OK Plumbing
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[480px] gap-2 p-4 md:grid-cols-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <NavigationMenuLink
                          asChild
                          className="block rounded-md p-3 hover:bg-surface-muted"
                        >
                          <Link href={`/services/${s.slug}`}>
                            <div className="font-medium text-foreground">
                              {s.name}
                            </div>
                            <p className="line-clamp-2 text-sm text-foreground-muted">
                              {s.shortDescription}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Areas</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-1 p-4 md:grid-cols-2">
                    {serviceAreas.map((a) => (
                      <li key={a.slug}>
                        <NavigationMenuLink
                          asChild
                          className="block rounded-md p-2 text-sm hover:bg-surface-muted"
                        >
                          <Link href={`/service-areas/${a.slug}`}>
                            {a.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navLinks.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <Link href={l.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {l.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" />
              <span className="ml-1">{siteConfig.phone}</span>
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/contact">Book Service</Link>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96">
            <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className={mobileLink}
              >
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
              <Link
                href="/service-areas"
                onClick={() => setOpen(false)}
                className={mobileLink}
              >
                Service Areas
              </Link>
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={mobileLink}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-2">
              <Button asChild>
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  <span className="ml-2">Call {siteConfig.phone}</span>
                </a>
              </Button>
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link href="/contact">Book Service</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
