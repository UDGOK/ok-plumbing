import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Signature element (spec §1) — thin rule with a centered patina-brass
 * pipe-valve SVG. Used sparingly between major sections.
 */
export function BrassDivider({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      className={cn(
        "flex items-center justify-center gap-4 py-12",
        className,
      )}
    >
      <span className="h-px flex-1 bg-border" />
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-brass"
        aria-hidden="true"
      >
        {/* Pipe valve motif */}
        <circle cx="22" cy="22" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="22" r="2" fill="currentColor" />
        <line
          x1="22"
          y1="4"
          x2="22"
          y2="16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="22"
          y1="28"
          x2="22"
          y2="40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="4"
          y1="22"
          x2="16"
          y2="22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="22"
          x2="40"
          y2="22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="13"
          y1="9"
          x2="17"
          y2="13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="27"
          y1="31"
          x2="31"
          y2="35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
