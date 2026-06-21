import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Duration of one full loop in seconds. */
  durationSeconds?: number;
}

/**
 * CSS-driven marquee (spec §5 #3). Decorative — caller marks surrounding
 * context aria-hidden if content is duplicated elsewhere.
 */
export function Marquee({
  children,
  durationSeconds = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      aria-hidden="true"
      {...props}
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `marquee-scroll ${durationSeconds}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
