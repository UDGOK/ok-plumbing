"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger index for sequential reveals. 0 = no delay. */
  index?: number;
  /** Direction the element slides in from. */
  direction?: "up" | "down" | "left" | "right" | "none";
}

const OFFSET = 24; // px
const directionOffset: Record<NonNullable<RevealProps["direction"]>, string> = {
  up: `translateY(${OFFSET}px)`,
  down: `translateY(-${OFFSET}px)`,
  left: `translateX(${OFFSET}px)`,
  right: `translateX(-${OFFSET}px)`,
  none: "none",
};

export function Reveal({
  children,
  index = 0,
  direction = "up",
  className,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-40px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const style: React.CSSProperties = visible
    ? { opacity: 1, transform: "none", transitionDelay: `${index * 80}ms` }
    : {
        opacity: 0,
        transform: directionOffset[direction],
        transitionDelay: `${index * 80}ms`,
      };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform]",
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
