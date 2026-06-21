import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-medium tracking-tight">
          Terms of Service
        </h1>
        <div className="mt-6 space-y-4 text-foreground-muted">
          <p>
            By using this website you agree that all content is provided for
            general information about OKPlumb&apos;s plumbing services. Pricing,
            availability, and scope are confirmed in writing before any work
            begins.
          </p>
          <p>
            Estimates are based on the information available at the time and may
            change once a technician assesses the job on site. Warranties apply
            as described in your written work order.
          </p>
          <p className="text-sm">
            This is a starting template — have it reviewed by counsel before you
            rely on it.
          </p>
        </div>
      </div>
    </Container>
  );
}
