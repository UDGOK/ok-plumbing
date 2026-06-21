"use client";

import * as React from "react";
import { Phone, Check } from "lucide-react";

const SERVICES = [
  "General inquiry",
  "Drain or sewer",
  "Water heater",
  "Repipe",
  "Leak / slab leak",
  "Fixture install",
  "Commercial / build-out",
  "Emergency",
  "Other",
];

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

type Status = "idle" | "submitting" | "ok" | "ok-call" | "error";

export function LeadForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.phone || !data.message) {
      setError("Please add your name, phone, and a short message.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        setError(json?.error || "Something went wrong. Please call us.");
        setStatus("error");
        return;
      }
      setStatus(json.delivered ? "ok" : "ok-call");
      form.reset();
    } catch {
      setError("Couldn't send. Please call (918) 851-8203.");
      setStatus("error");
    }
  }

  if (status === "ok" || status === "ok-call") {
    return (
      <div className="rounded-xl border border-border bg-background p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-xl font-medium">
          Thanks — we&apos;ve got it.
        </h3>
        <p className="mt-2 text-sm text-foreground-muted">
          {status === "ok"
            ? "We'll be in touch shortly. Need it sooner? Call us any time."
            : "For the fastest response, please also call us — we answer 24/7 for emergencies."}
        </p>
        <a
          href="tel:9188518203"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          <Phone className="h-4 w-4" /> (918) 851-8203
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-border bg-surface p-6">
      <h3 className="font-display text-xl font-medium">Send us a message</h3>
      <p className="mt-1 text-sm text-foreground-muted">
        Tell us what you need — we&apos;ll get right back to you.
      </p>

      {/* Honeypot (hidden from people, bots fill it) */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lf-name" className="text-xs font-medium text-foreground-muted">
              Name *
            </label>
            <input id="lf-name" name="name" required maxLength={120} className={`mt-1 ${inputCls}`} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="lf-phone" className="text-xs font-medium text-foreground-muted">
              Phone *
            </label>
            <input id="lf-phone" name="phone" required type="tel" maxLength={40} className={`mt-1 ${inputCls}`} placeholder="(918) 555-0123" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lf-email" className="text-xs font-medium text-foreground-muted">
              Email <span className="font-normal">(optional)</span>
            </label>
            <input id="lf-email" name="email" type="email" maxLength={160} className={`mt-1 ${inputCls}`} placeholder="you@email.com" />
          </div>
          <div>
            <label htmlFor="lf-service" className="text-xs font-medium text-foreground-muted">
              Service
            </label>
            <select id="lf-service" name="service" defaultValue="General inquiry" className={`mt-1 ${inputCls}`}>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="lf-message" className="text-xs font-medium text-foreground-muted">
            How can we help? *
          </label>
          <textarea
            id="lf-message"
            name="message"
            required
            rows={4}
            maxLength={4000}
            className={`mt-1 resize-y ${inputCls}`}
            placeholder="Your address, the issue, and anything else that helps us arrive ready."
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-[#b3261e]">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-foreground-muted">
          Prefer to talk? Call or text{" "}
          <a href="tel:9188518203" className="font-medium text-accent hover:underline">
            (918) 851-8203
          </a>
          .
        </p>
      </div>
    </form>
  );
}
