import { NextResponse } from "next/server";

const TO = process.env.LEAD_EMAIL_TO ?? "projects@udgok.com";
// Resend requires a verified sender domain for a custom "from". Until
// ok-plumbing.com is verified, onboarding@resend.dev works (test mode).
const FROM = process.env.LEAD_EMAIL_FROM ?? "OKPlumb Website <onboarding@resend.dev>";

function clean(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill the hidden "company" field. Silently accept & drop.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const service = clean(body.service, 80);
  const message = clean(body.message, 4000);

  if (!name || !phone || !message) {
    return NextResponse.json(
      { ok: false, error: "Please add your name, phone, and a short message." },
      { status: 400 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  const when = new Date().toISOString();

  const text = [
    `New lead from ok-plumbing.com`,
    ``,
    `Name:    ${name}`,
    `Phone:   ${phone}`,
    `Email:   ${email || "—"}`,
    `Service: ${service || "—"}`,
    ``,
    `Message:`,
    message,
    ``,
    `—`,
    `Sent: ${when}`,
    `IP:   ${ip}`,
    `UA:   ${ua}`,
  ].join("\n");

  // Backstop: always log so the lead is recoverable from Vercel logs even
  // if email delivery fails or isn't configured yet.
  console.log("[lead]", JSON.stringify({ name, phone, email, service, when, ip }));

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        ...(email ? { reply_to: email } : {}),
        subject: `New website lead — ${name}${service ? ` (${service})` : ""}`,
        text,
      }),
    });

    if (!res.ok) {
      console.error("[lead] resend failed", res.status, await res.text());
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] resend error", err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
