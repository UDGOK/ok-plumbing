"use client";

import * as React from "react";
import { ArrowUp, Sparkles } from "lucide-react";

const EXAMPLES = [
  "Why is my water pressure low?",
  "Do you do commercial build-outs?",
  "My drain keeps clogging — what now?",
];

export function AskAi() {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function ask(q: string) {
    const text = q.trim();
    if (!text || loading) return;
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      if (data?.answer) setAnswer(data.answer);
      else setError(data?.error || "Something went wrong. Try calling us.");
    } catch {
      setError("Couldn't reach the assistant. Please call (918) 851-8203.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] p-1.5 pl-5 focus-within:border-[#5baa97]/60"
      >
        <Sparkles className="h-4 w-4 flex-none text-[#5baa97]" />
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about a leak, water heater, build-out…"
          maxLength={500}
          aria-label="Ask OKPlumb AI a question"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-background placeholder:text-background/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          aria-label="Send question"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#5baa97] text-[#0f1517] transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {loading ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0f1517]/30 border-t-[#0f1517]" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </button>
      </form>

      {!answer && !loading && !error ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setQuestion(ex);
                ask(ex);
              }}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-background/60 transition-colors hover:border-white/25 hover:text-background"
            >
              {ex}
            </button>
          ))}
        </div>
      ) : null}

      {(answer || loading || error) && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-background/85">
          {loading ? (
            <span className="text-background/50">Thinking…</span>
          ) : error ? (
            <span className="text-background/70">{error}</span>
          ) : (
            <p className="whitespace-pre-line">{answer}</p>
          )}
        </div>
      )}

      <p className="mt-3 text-[0.7rem] text-background/40">
        AI answers — for emergencies, call (918) 851-8203.
      </p>
    </div>
  );
}
