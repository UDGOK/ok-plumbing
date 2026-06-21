import * as React from "react";

export type SceneVariant =
  | "water"
  | "flame"
  | "gauge"
  | "blueprint"
  | "radar"
  | "flow"
  | "pulse"
  | "pipes";

function Motif({ variant }: { variant: SceneVariant }) {
  switch (variant) {
    case "water":
      return (
        <>
          <g fill="var(--accent)">
            <circle className="scene-drop" cx="150" cy="20" r="6" />
            <circle className="scene-drop d2" cx="225" cy="20" r="5" />
            <circle className="scene-drop d4" cx="295" cy="20" r="7" />
          </g>
          <g fill="none" stroke="var(--accent)" strokeWidth="2">
            <ellipse className="scene-ripple" cx="225" cy="320" rx="34" ry="11" />
            <ellipse className="scene-ripple d3" cx="225" cy="320" rx="34" ry="11" />
          </g>
        </>
      );
    case "flame":
      return (
        <g fill="var(--brass)">
          <circle className="scene-rise" cx="205" cy="270" r="9" />
          <circle className="scene-rise d2" cx="235" cy="270" r="6" />
          <circle className="scene-rise d3" cx="178" cy="270" r="7" />
          <circle className="scene-rise d4" cx="215" cy="270" r="5" />
        </g>
      );
    case "gauge":
      return (
        <>
          <path
            d="M118 252 A 92 92 0 0 1 282 252"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
          <g stroke="var(--brass)" strokeWidth="3" strokeLinecap="round" opacity="0.5">
            <line x1="128" y1="232" x2="138" y2="226" />
            <line x1="200" y1="160" x2="200" y2="172" />
            <line x1="272" y1="232" x2="262" y2="226" />
          </g>
          <line
            className="scene-needle"
            x1="200"
            y1="240"
            x2="200"
            y2="168"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="200" cy="240" r="6" fill="var(--accent)" />
        </>
      );
    case "blueprint":
      return (
        <>
          <g stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="1">
            {[80, 130, 180, 230, 280, 330].map((y) => (
              <line key={y} x1="40" y1={y} x2="360" y2={y} />
            ))}
            {[80, 140, 200, 260, 320].map((x) => (
              <line key={x} x1={x} y1="60" x2={x} y2="350" />
            ))}
          </g>
          <g fill="none" stroke="var(--brass)" strokeWidth="2.5" strokeLinecap="round">
            <path className="scene-draw" d="M110 320 L110 150 L240 150 L240 100 L330 100" />
            <path className="scene-draw d2" d="M150 320 L150 220 L300 220 L300 150" />
          </g>
        </>
      );
    case "radar":
      return (
        <>
          <g fill="none" stroke="var(--accent)" strokeWidth="2">
            <circle className="scene-pulse" cx="210" cy="205" r="42" />
            <circle className="scene-pulse d2" cx="210" cy="205" r="42" />
            <circle className="scene-pulse d4" cx="210" cy="205" r="42" />
          </g>
          <circle cx="210" cy="205" r="5" fill="var(--accent)" />
        </>
      );
    case "flow":
      return (
        <g fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round">
          <path className="scene-flow" d="M40 150 H360" />
          <path className="scene-flow d2" d="M40 205 H360" />
          <path className="scene-flow d4" d="M40 260 H360" />
        </g>
      );
    case "pulse":
      return (
        <>
          <g fill="none" stroke="var(--accent)" strokeWidth="2.5">
            <circle className="scene-pulse" cx="210" cy="210" r="46" />
            <circle className="scene-pulse d2" cx="210" cy="210" r="46" />
          </g>
          <path
            d="M210 176 L238 226 L182 226 Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <line
            x1="210"
            y1="194"
            x2="210"
            y2="210"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="210" cy="218" r="2.6" fill="var(--accent)" />
        </>
      );
    case "pipes":
    default:
      return (
        <>
          <g
            className="scene-float"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeOpacity="0.45"
          >
            <path d="M110 130 H250 a32 32 0 0 1 32 32 V300" />
            <path d="M110 215 H200" />
          </g>
          <path
            className="scene-flow"
            d="M110 130 H250 a32 32 0 0 1 32 32 V300"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      );
  }
}

/**
 * Decorative, right-anchored themed motion for page heroes.
 * Pure SSR SVG/CSS — no client JS, no WebGL. The global
 * prefers-reduced-motion backstop disables the animation automatically.
 *
 * Optional `photo` layers a real image behind the motif. Drop real
 * OKPlumb job photos at e.g. /public/hero/<page>.jpg and pass the path.
 */
export function PageScene({
  variant = "pipes",
  photo,
}: {
  variant?: SceneVariant;
  photo?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[58%] overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_44%)] [mask-image:linear-gradient(to_right,transparent,black_44%)] md:block"
    >
      {photo ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url("${photo}")` }}
        />
      ) : null}
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute right-0 top-1/2 h-[125%] w-auto -translate-y-1/2"
      >
        <defs>
          <radialGradient id="scene-glow-grad" cx="62%" cy="42%" r="62%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect
          className="scene-glow"
          x="0"
          y="0"
          width="400"
          height="400"
          fill="url(#scene-glow-grad)"
        />
        <Motif variant={variant} />
      </svg>
    </div>
  );
}
