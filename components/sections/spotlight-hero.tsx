"use client";

import * as React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { siteConfig, formatPhone } from "@/lib/content";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

interface SpotlightHeroProps {
  /**
   * The "problem" image — the base layer on desktop, revealed-from on hover.
   * Swap these for your own local photos in /public/hero/ when you have them.
   */
  problemImage?: string;
  /** The "fixed / clean" image — revealed under the spotlight, and the default on touch. */
  fixedImage?: string;
}

// Defaults: royalty-free placeholders. Replace with real OKPlumb job photos.
const DEFAULT_PROBLEM =
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1600&q=80";
const DEFAULT_FIXED =
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80";

export function SpotlightHero({
  problemImage = DEFAULT_PROBLEM,
  fixedImage = DEFAULT_FIXED,
}: SpotlightHeroProps) {
  const reduced = useReducedMotion();
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const revealRef = React.useRef<HTMLDivElement>(null);
  // Interactive spotlight only when there's a fine pointer and motion is allowed.
  // Starts false so SSR/touch/reduced-motion all render the reassuring clean image.
  const [interactive, setInteractive] = React.useState(false);

  React.useEffect(() => {
    if (reduced) {
      setInteractive(false);
      return;
    }
    const fine =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: fine)").matches;
    setInteractive(Boolean(fine));
  }, [reduced]);

  // Pointer-tracked spotlight via CSS custom properties (no per-frame canvas).
  React.useEffect(() => {
    if (!interactive) return;
    const el = sectionRef.current;
    const reveal = revealRef.current;
    if (!el || !reveal) return;

    const target = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };
    let raf = 0;
    let entered = false;

    const setVars = (x: number, y: number) => {
      reveal.style.setProperty("--mx", `${x}px`);
      reveal.style.setProperty("--my", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (!entered) {
        smooth.x = target.x;
        smooth.y = target.y;
        entered = true;
      }
    };
    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
    };

    const loop = () => {
      smooth.x += (target.x - smooth.x) * 0.15;
      smooth.y += (target.y - smooth.y) * 0.15;
      setVars(smooth.x, smooth.y);
      raf = requestAnimationFrame(loop);
    };

    // Auto-sweep once on mount so the reveal is discoverable before any hover.
    const rect = el.getBoundingClientRect();
    const sweepY = rect.height * 0.45;
    let t = 0;
    const sweep = () => {
      t += 0.02;
      const x = (0.12 + 0.76 * t) * rect.width;
      setVars(x, sweepY);
      if (t < 1 && !entered) {
        raf = requestAnimationFrame(sweep);
      } else {
        smooth.x = x;
        smooth.y = sweepY;
        raf = requestAnimationFrame(loop);
      }
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    raf = requestAnimationFrame(sweep);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-neutral-950 text-white"
      aria-label="OKPlumb — Tulsa plumbing"
    >
      {/* Base layer. Touch / reduced-motion show the clean (fixed) image; desktop shows the problem. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${interactive ? problemImage : fixedImage}")`,
        }}
      />

      {/* Reveal layer — the clean image, shown only through the soft spotlight mask. */}
      {interactive && (
        <div
          ref={revealRef}
          aria-hidden="true"
          className="spotlight-mask absolute inset-0 z-10 bg-cover bg-center"
          style={{ backgroundImage: `url("${fixedImage}")` }}
        />
      )}

      {/* Legibility scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 bg-gradient-to-b from-black/70 via-black/40 to-black/75"
      />

      <Container className="relative z-30 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            Tulsa&apos;s Trusted Plumber
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,5rem)] font-medium leading-[1.0] tracking-tight">
            Pipes run deep in{" "}
            <span className="italic text-accent">Oklahoma soil.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            From frozen burst pipes in January to slab leaks under red Oklahoma
            clay — licensed Tulsa plumbers who diagnose it, fix it, and clean up
            after. Flat-rate pricing, no surprises.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a Service Call</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4" />
                <span className="ml-2">{formatPhone(siteConfig.phone)}</span>
              </a>
            </Button>
          </div>
          {interactive && (
            <p className="mt-7 text-xs uppercase tracking-[0.18em] text-white/45">
              Move your cursor — see the fix
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
