import * as React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

// Phase 1: static curated fallback. Phase 4 swaps in live Google reviews
// via lib/reviews.ts (Places API). Component shape stays the same.
const fallbackReviews = [
  { name: "Sarah M.", city: "Tulsa", rating: 5, body: "{{REVIEW_1}}" },
  { name: "David R.", city: "Broken Arrow", rating: 5, body: "{{REVIEW_2}}" },
  { name: "Jenni P.", city: "Jenks", rating: 5, body: "{{REVIEW_3}}" },
];

export function ReviewsPreview() {
  return (
    <section className="border-y border-border bg-surface py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            What Tulsa Says
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium tracking-tight">
            Quietly recommended.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {fallbackReviews.map((review, i) => (
            <Reveal key={i} index={i}>
              <figure className="flex h-full flex-col rounded-lg border border-border bg-background p-6">
                <div
                  className="flex gap-0.5"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brass text-brass" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-foreground-muted">
                  &ldquo;{review.body}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-medium text-foreground">
                    {review.name}
                  </span>
                  <span className="text-foreground-muted">
                    {" "}
                    · {review.city}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/reviews"
            className="inline-block border-b-2 border-brass pb-1 font-medium hover:text-accent"
          >
            Read all reviews →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
