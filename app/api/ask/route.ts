import { NextResponse } from "next/server";
import { localAnswer } from "@/lib/ask-knowledge";

// Cheap, fast model for a public widget. Override with ASK_AI_MODEL if needed.
const MODEL = process.env.ASK_AI_MODEL ?? "claude-haiku-4-5-20251001";
const PHONE_DISPLAY = "(918) 851-8203";

const SYSTEM_PROMPT = `You are the AI assistant for OKPlumb, a licensed and insured plumbing company serving the Tulsa, Oklahoma metro (both residential and commercial).

Answer the visitor's plumbing question helpfully and concisely — 2 to 4 sentences, friendly and plain-spoken.

Facts you can use:
- Phone (24/7 for emergencies): ${PHONE_DISPLAY}
- Service area: Tulsa, Broken Arrow, Jenks, Owasso, Bixby, Sand Springs, Sapulpa, and nearby cities.
- Residential services: drain cleaning & hydro-jetting, water heaters (tank & tankless), whole-home repiping, leak detection & slab leaks, sewer line repair, fixture installation.
- Commercial services: restaurants & commercial kitchens, tenant-improvement build-outs, medical & dental offices, property management, grease traps, backflow testing, commercial water heaters, hydro-jetting, and new construction.

Rules:
- For any emergency (burst pipe, major active leak, no water, sewage backup), tell them to call ${PHONE_DISPLAY} right away.
- If they mention a gas smell, tell them to leave the building and call 911 and their gas utility first, then a plumber.
- Do NOT give step-by-step DIY instructions for gas lines, water-heater gas/venting, or anything that could be unsafe — recommend a licensed pro instead.
- Light, safe general guidance is fine, but nudge toward booking OKPlumb (call ${PHONE_DISPLAY} or the contact page) when actual work is needed.
- Never invent prices, license numbers, warranties, or guarantees. If you don't know, say so and suggest calling.
- Keep it short.`;

// Best-effort in-memory rate limit (per serverless instance). For production,
// back this with a shared store (e.g. Upstash) — see FIX-NOTES.
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let question = "";
  try {
    const body = await req.json();
    question = typeof body?.question === "string" ? body.question.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!question) {
    return NextResponse.json({ error: "Ask a question first." }, { status: 400 });
  }
  if (question.length > 500) question = question.slice(0, 500);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      {
        answer: `You're asking quickly! Give it a moment — or just call us at ${PHONE_DISPLAY} and a real person will help right away.`,
      },
      { status: 200 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No LLM configured — answer from the site's own knowledge base.
    return NextResponse.json({ answer: localAnswer(question), source: "local" });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ answer: localAnswer(question), source: "local" });
    }

    const data = await res.json();
    const answer = Array.isArray(data?.content)
      ? data.content
          .filter((b: { type?: string }) => b?.type === "text")
          .map((b: { text?: string }) => b?.text ?? "")
          .join("\n")
          .trim()
      : "";

    return NextResponse.json({
      answer: answer || localAnswer(question),
      source: answer ? "ai" : "local",
    });
  } catch {
    return NextResponse.json({ answer: localAnswer(question), source: "local" });
  }
}
