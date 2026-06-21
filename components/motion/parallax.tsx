"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Scroll speed multiplier. 0.3 = background drifts slower than scroll. */
  speed?: number;
}

export function Parallax({
  children,
  speed = 0.3,
  className,
  ...props
}: ParallaxProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + window.innerHeight) * speed;
        el.style.transform = `translate3d(0, ${-offset * 0.1}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced, speed]);

  return (
    <div
      ref={ref}
      className={cn(reduced ? undefined : "will-change-transform", className)}
      {...props}
    >
      {children}
    </div>
  );
}
