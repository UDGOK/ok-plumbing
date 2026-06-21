export type IconName =
  | "droplets"
  | "flame"
  | "git-branch"
  | "search"
  | "waves"
  | "wrench";

export interface Service {
  slug:
    | "drain-cleaning"
    | "water-heaters"
    | "repiping"
    | "leak-detection"
    | "sewer-line"
    | "fixtures";
  name: string;
  shortDescription: string;
  iconName: IconName;
  included: string[];
}

export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  blurb: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export type FaqContext =
  | { type: "home" }
  | { type: "service"; slug: Service["slug"] }
  | { type: "area"; slug: string }
  | { type: "emergency" }
  | { type: "financing" }
  | { type: "contact" };

export const siteConfig = {
  name: "OK Plumbing",
  tagline: "Quiet pipes, honest work.",
  phone: "{{PHONE}}",
  emergencyPhone: "{{PHONE}}",
  email: "hello@ok-plumbing.com",
  url: "https://ok-plumbing.com",
  licenseNumber: "{{LICENSE}}",
  yearsInBusiness: "{{YEARS}}",
  serviceAreaRegion: "Tulsa Metro, OK",
  hours: "Mon–Fri 7a–6p · Emergency 24/7",
  address: {
    street: "{{STREET}}",
    city: "Tulsa",
    state: "OK",
    zip: "{{ZIP}}",
  },
  geo: { latitude: 36.154, longitude: -95.9928 },
  social: {
    google: "{{GOOGLE_BIZ_URL}}",
    facebook: "{{FACEBOOK_URL}}",
  },
} as const;

export const services: Service[] = [
  {
    slug: "drain-cleaning",
    name: "Drain Cleaning & Hydro-Jetting",
    shortDescription:
      "Cleared the right way — camera inspection first, then high-pressure hydro-jet to cut through grease, scale, and roots. No recurring clogs.",
    iconName: "droplets",
    included: [
      "Camera inspection",
      "Hydro-jetting",
      "Snaking",
      "Root removal",
      "Preventive maintenance plan",
    ],
  },
  {
    slug: "water-heaters",
    name: "Water Heater Repair & Installation",
    shortDescription:
      "Tank and tankless water heater service, repair, and full replacement. We size the unit to your home, not the upsell.",
    iconName: "flame",
    included: [
      "Tank repair & replacement",
      "Tankless install",
      "Flush & maintenance",
      "Gas line to unit",
      "Emergency repair",
    ],
  },
  {
    slug: "repiping",
    name: "Whole-Home Repiping",
    shortDescription:
      "Replace failing galvanized or polybutylene with PEX or copper. Clean work, minimal wall cuts, full patch-out after.",
    iconName: "git-branch",
    included: [
      "PEX repipe",
      "Copper repipe",
      "Slab reroute",
      "Wall patch-out",
      "Permitting",
    ],
  },
  {
    slug: "leak-detection",
    name: "Leak Detection & Slab Leaks",
    shortDescription:
      "Electronic leak detection pinpoints the source without tearing up floors. Slab leaks, hidden pipe leaks, pressure tests.",
    iconName: "search",
    included: [
      "Electronic detection",
      "Slab leak repair",
      "Pressure testing",
      "Moisture mapping",
      "Insurance documentation",
    ],
  },
  {
    slug: "sewer-line",
    name: "Sewer Line Repair & Replacement",
    shortDescription:
      "Trenchless and traditional sewer line repair. Camera scope to diagnose, then options — not a one-quote shove.",
    iconName: "waves",
    included: [
      "Camera scope",
      "Trenchless repair",
      "Traditional excavation",
      "Line replacement",
      "Root barrier",
    ],
  },
  {
    slug: "fixtures",
    name: "Fixture Installation & Repair",
    shortDescription:
      "Faucets, toilets, garbage disposals, shower valves. Installed plumb, sealed clean, warranted.",
    iconName: "wrench",
    included: [
      "Faucet install & repair",
      "Toilet install",
      "Garbage disposal",
      "Shower valve",
      "Outdoor hose bib",
    ],
  },
];

export const serviceAreas: ServiceArea[] = [
  {
    slug: "tulsa",
    name: "Tulsa",
    county: "Tulsa County",
    blurb:
      "Our home base — every Tulsa neighborhood, from Brookside to Midtown to South Tulsa.",
  },
  {
    slug: "broken-arrow",
    name: "Broken Arrow",
    county: "Tulsa County",
    blurb:
      "Serving Broken Arrow homeowners and new builds across the 74012 and 74014 corridors.",
  },
  {
    slug: "jenks",
    name: "Jenks",
    county: "Tulsa County",
    blurb: "Plumbing for Jenks families along the Arkansas River and the River District.",
  },
  {
    slug: "owasso",
    name: "Owasso",
    county: "Tulsa County",
    blurb: "Fast dispatch to Owasso — 74055 and the surrounding growth corridor.",
  },
  {
    slug: "bixby",
    name: "Bixby",
    county: "Tulsa County",
    blurb: "Bixby homes from the Arkansas riverbottom to the south Tulsa edges.",
  },
  {
    slug: "sand-springs",
    name: "Sand Springs",
    county: "Tulsa County",
    blurb: "Plumbing service across Sand Springs and the 74063 area.",
  },
  {
    slug: "sapulpa",
    name: "Sapulpa",
    county: "Creek County",
    blurb: "Serving Sapulpa — 74066 and the Route 66 corridor.",
  },
  {
    slug: "claremore",
    name: "Claremore",
    county: "Rogers County",
    blurb: "Claremore homes and the surrounding Rogers County communities.",
  },
  {
    slug: "catoosa",
    name: "Catoosa",
    county: "Rogers County",
    blurb: "Plumbing service for Catoosa — port district and residential alike.",
  },
  {
    slug: "coweta",
    name: "Coweta",
    county: "Wagoner County",
    blurb: "Coweta homeowners across the 74429 area.",
  },
  {
    slug: "glenpool",
    name: "Glenpool",
    county: "Tulsa County",
    blurb: "Plumbing for Glenpool homes and the southern Tulsa metro.",
  },
  {
    slug: "collinsville",
    name: "Collinsville",
    county: "Tulsa County",
    blurb: "Serving Collinsville and the northern edges of the Tulsa metro.",
  },
];

const homeFaqs: Faq[] = [
  {
    question: "What areas of Tulsa does OK Plumbing serve?",
    answer: `We serve the entire Tulsa metro — Tulsa, Broken Arrow, Jenks, Owasso, Bixby, Sand Springs, Sapulpa, Claremore, Catoosa, Coweta, Glenpool, and Collinsville. If you're in the ${siteConfig.serviceAreaRegion} and unsure, call ${siteConfig.phone} and we'll confirm.`,
  },
  {
    question: "Do you offer emergency plumbing in Tulsa?",
    answer: `Yes. Call ${siteConfig.emergencyPhone} any time — nights, weekends, holidays. Burst pipes, sewer backups, and no-water situations take priority.`,
  },
  {
    question: "How much does a service call cost?",
    answer:
      "We charge a flat-rate diagnostic fee, credited toward any repair you approve. No hourly clock, no surprise add-ons. The tech tells you the price before any work starts.",
  },
  {
    question: "Are you licensed and insured in Oklahoma?",
    answer: `Yes — Oklahoma plumbing license ${siteConfig.licenseNumber}, fully insured, and ${siteConfig.yearsInBusiness} serving the Tulsa area.`,
  },
  {
    question: "Do you work on tankless water heaters?",
    answer:
      "Yes — repair, install, and annual flush for tankless, plus traditional tank water heaters of every brand.",
  },
  {
    question: "Can I finance a larger plumbing project?",
    answer:
      "Yes — we offer financing on repipes, water heater replacements, and sewer line work. See our financing page for options and how to apply.",
  },
];

const serviceFaqs: Record<Service["slug"], Faq[]> = {
  "drain-cleaning": [
    {
      question: "How much does drain cleaning cost in Tulsa?",
      answer:
        "Most standard drain clears run a flat rate we quote before starting. Hydro-jetting is priced by the line and quoted after a camera scope — call for current pricing.",
    },
    {
      question: "Hydro-jetting vs. snaking — what's the difference?",
      answer:
        "A snake punches through a clog. Hydro-jetting cleans the pipe walls — grease, scale, roots — so the clog doesn't come back in three months. We recommend jetting for recurring clogs and kitchen lines.",
    },
    {
      question: "Can you fix tree roots in my sewer line?",
      answer:
        "Yes. We camera-scope first to see the extent, then hydro-jet to cut roots, and can install a root barrier or recommend repair if the line is cracked.",
    },
    {
      question: "Will drain cleaning damage my pipes?",
      answer:
        "No — hydro-jetting uses regulated pressure appropriate to your pipe material. Older or already-broken lines get inspected first so we don't run water where it shouldn't go.",
    },
  ],
  "water-heaters": [
    {
      question: "How much does a water heater cost in Tulsa?",
      answer:
        "Tank replacements typically run lower than tankless installs, but the real cost depends on the unit, gas vs. electric, and any code upgrades needed. We quote flat-rate after assessing your setup.",
    },
    {
      question: "Tankless vs. tank water heater — which is right for me?",
      answer:
        "Tankless saves on energy bills and never runs out, but has a higher upfront cost. Tanks are cheaper up-front and simpler. We size to your home's actual hot water demand and tell you honestly which makes sense.",
    },
    {
      question: "How long does a water heater last in Oklahoma?",
      answer:
        "Tank heaters average 8–12 years; tankless 20+. Oklahoma hard water shortens tank life — annual flushes add years.",
    },
    {
      question: "My water heater is leaking — is it an emergency?",
      answer:
        "Yes — shut off power/gas and the cold-water supply, then call. A leaking tank usually means it's failed and will get worse fast.",
    },
  ],
  repiping: [
    {
      question: "How much does whole-home repiping cost in Tulsa?",
      answer:
        "Repipe cost depends on home size, number of fixtures, and PEX vs. copper. We quote flat-rate after an on-site walk-through — no hourly clock.",
    },
    {
      question: "PEX vs. copper — which is better?",
      answer:
        "PEX is flexible, faster to install, freeze-resistant, and less expensive. Copper is rigid, longest-lived, and traditional. We install both and recommend based on your home and budget.",
    },
    {
      question: "How long does a repipe take?",
      answer:
        "Most whole-home repipes take 2–4 days for the plumbing, with water restored each evening. Wall patch-out follows as a separate phase.",
    },
    {
      question: "Do you handle the drywall patch-out?",
      answer:
        "Yes — full patch, texture, and paint match are part of the job. You shouldn't need a separate contractor.",
    },
  ],
  "leak-detection": [
    {
      question: "How does electronic leak detection work?",
      answer:
        "We use acoustic listening equipment and pressure testing to pinpoint a leak within inches — without tearing up floors or walls to find it.",
    },
    {
      question: "What are signs of a slab leak?",
      answer:
        "Hot spots on the floor, unexplained water bill spikes, the sound of running water when nothing's on, or damp carpet/hardwood. Any of these — call us.",
    },
    {
      question: "How much does slab leak repair cost in Tulsa?",
      answer:
        "Depends on whether we reroute the line, tunnel under the slab, or do a spot repair. We camera-scope and pressure-test first, then quote options.",
    },
    {
      question: "Will my homeowners insurance cover a slab leak?",
      answer:
        "Often, yes — for the resulting water damage, sometimes for the repair itself. We document thoroughly so you can file your claim.",
    },
  ],
  "sewer-line": [
    {
      question: "How do I know if my sewer line is broken?",
      answer:
        "Recurring backups, gurgling drains, sewage smell, or lush/soggy patches in the yard. A camera scope confirms it definitively.",
    },
    {
      question: "What is trenchless sewer repair?",
      answer:
        "Trenchless lets us replace or reline a sewer line with two small access pits instead of digging up your whole yard. Faster, cleaner, less landscape damage — when the line qualifies.",
    },
    {
      question: "How much does sewer line replacement cost in Tulsa?",
      answer:
        "Wide range depending on length, depth, method (trenchless vs. traditional), and what's above the line. We camera-scope and quote options before any digging.",
    },
    {
      question: "Do tree roots really break sewer lines?",
      answer:
        "Yes — roots seek moisture and invade joints. Older clay or Orangeburg pipe is most vulnerable. Hydro-jetting + root barrier buys time; replacement is the permanent fix.",
    },
  ],
  fixtures: [
    {
      question: "Do you install faucets and toilets I bought myself?",
      answer:
        "Yes — we'll install customer-supplied fixtures. We'll tell you up front if a unit has a known problem or doesn't meet code.",
    },
    {
      question: "How much does faucet installation cost in Tulsa?",
      answer:
        "Flat-rate per fixture, quoted before we start. Includes supply lines, valves, and a leak check.",
    },
    {
      question: "Can you fix a running toilet?",
      answer:
        "Yes — usually a flapper, fill valve, or flush valve. Quick repair, parts warranted.",
    },
    {
      question: "Do you install garbage disposals?",
      answer:
        "Yes — including the electrical connection if a dedicated outlet is already present. If not, we'll coordinate with an electrician.",
    },
  ],
};

const areaFaqTemplate = (area: ServiceArea): Faq[] => [
  {
    question: `Do you offer plumbing service in ${area.name}, OK?`,
    answer: `Yes — ${siteConfig.name} serves ${area.name} and the surrounding ${area.county} area. ${area.blurb}`,
  },
  {
    question: `How fast can a plumber get to ${area.name}?`,
    answer: `Most ${area.name} calls are dispatched same-day. For emergencies call ${siteConfig.emergencyPhone} — we prioritize no-water and active-leak situations.`,
  },
  {
    question: `What does a plumber cost in ${area.name}?`,
    answer:
      "Same flat-rate diagnostic as the rest of the Tulsa metro, credited toward any repair you approve. No travel surcharge within our service area.",
  },
  {
    question: `Do you work on water heaters in ${area.name}?`,
    answer: `Yes — tank and tankless water heater repair, install, and replacement throughout ${area.name}.`,
  },
];

export function getFaqForContext(ctx: FaqContext): Faq[] {
  switch (ctx.type) {
    case "home":
      return homeFaqs;
    case "service":
      return serviceFaqs[ctx.slug] ?? homeFaqs;
    case "area": {
      const area = serviceAreas.find((a) => a.slug === ctx.slug);
      return area ? areaFaqTemplate(area) : homeFaqs;
    }
    case "emergency":
      return [
        {
          question: "What counts as a plumbing emergency?",
          answer:
            "Burst or leaking pipes, sewer backup, no water, gas leak smell, or water heater failure flooding a space. If it's actively damaging your home, call now.",
        },
        {
          question: "How fast can you get here?",
          answer: `We dispatch same-day for emergencies across the Tulsa metro. Call ${siteConfig.emergencyPhone} — we'll give you an honest ETA.`,
        },
        {
          question: "Do you charge more for after-hours?",
          answer:
            "Emergency rates apply outside business hours. We tell you the rate on the phone before we come out — no surprises on the invoice.",
        },
        {
          question: "What should I do while I wait?",
          answer:
            "Shut off the water at the main, kill power to any affected outlets/appliances, and move valuables out of the water path. We'll walk you through it on the call.",
        },
      ];
    case "financing":
      return [
        {
          question: "What can I finance?",
          answer:
            "Repipes, water heater replacements, sewer line work, and any project over our financing minimum.",
        },
        {
          question: "How do I apply?",
          answer:
            "Online in under five minutes. Soft credit pull — no score impact to shop rates. See the financing page for the application link.",
        },
        {
          question: "Do you offer payment plans?",
          answer:
            "Yes — multiple term lengths and promotional periods. The tech can walk you through options after quoting the job.",
        },
        {
          question: "Is there a penalty for early payoff?",
          answer:
            "No — pay off early with no fee on any of our financing plans.",
        },
      ];
    case "contact":
      return [
        {
          question: "How quickly will you respond to my form?",
          answer:
            "We return contact-form submissions within one business hour during business hours. For anything urgent, call us directly.",
        },
        {
          question: "What information should I include?",
          answer:
            "Your address, the service you need, and a one-line description of the problem. Photos help — text them to the number on the contact page.",
        },
        {
          question: "Do you charge for an estimate?",
          answer:
            "We charge a flat-rate diagnostic that's credited to any repair you approve. Straight estimates on large projects are free.",
        },
        {
          question: "What are your service hours?",
          answer: siteConfig.hours,
        },
      ];
  }
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}
