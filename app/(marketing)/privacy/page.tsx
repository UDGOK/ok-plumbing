import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-medium tracking-tight">
          Privacy Policy
        </h1>
        <div className="mt-6 space-y-4 text-foreground-muted">
          <p>
            OKPlumb collects only the information you provide when you contact
            us — your name, phone number, address, and a description of the work
            you need — and uses it solely to respond to your request and provide
            service.
          </p>
          <p>
            We do not sell your personal information. We may use basic,
            privacy-respecting analytics to understand site traffic. Call and
            message details are shared only with the team dispatching your
            service.
          </p>
          <p>
            To request deletion of your information, call the number on our
            contact page.
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
