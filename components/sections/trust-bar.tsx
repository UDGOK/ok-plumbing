import * as React from "react";
import { ShieldCheck, Star, Clock, Wrench } from "lucide-react";
import { Marquee } from "@/components/motion/marquee";
import { siteConfig } from "@/lib/content";

const items = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Star, label: "5-Star Google Rated" },
  { icon: Clock, label: "24/7 Emergency Service" },
  { icon: Wrench, label: `${siteConfig.yearsInBusiness} Serving Tulsa` },
  { icon: ShieldCheck, label: "Flat-Rate Pricing" },
  { icon: Star, label: "Family Owned" },
];

export function TrustBar() {
  return (
    <section
      className="border-y border-border bg-surface py-4"
      aria-label="Trust signals"
    >
      <Marquee durationSeconds={32}>
        <div className="flex items-center gap-10 px-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-sm text-foreground-muted"
            >
              <item.icon className="h-4 w-4 text-brass" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
