"use client";

import * as React from "react";

const prefersReducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(prefersReducedMotionQuery);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(prefersReducedMotionQuery).matches;
}

function getServerSnapshot(): boolean {
  // Default to non-reduced on the server; effect-driven rehydration handles real value.
  return false;
}

/**
 * Returns true when the user has requested reduced motion.
 * Spec §5 — every motion primitive must check this and short-circuit to static.
 * Uses useSyncExternalStore for SSR-safe subscription without setState-in-effect.
 */
export function useReducedMotion(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}
