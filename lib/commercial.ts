import { siteConfig, formatPhone, type Faq } from "@/lib/content";

const PHONE = formatPhone(siteConfig.phone);

export interface CommercialService {
  slug: string;
  /** Icon key, mapped to a lucide icon in the UI. */
  icon:
    | "utensils"
    | "build"
    | "medical"
    | "manage"
    | "grease"
    | "backflow"
    | "heater"
    | "jetting"
    | "construction";
  name: string;
  title: string;
  metaDescription: string;
  /** Answer-first summary (40–60 words) for the page intro AND AI extraction. */
  answer: string;
  included: string[];
  faqs: Faq[];
}

/** Hub-level answer-first summary + FAQs. */
export const commercialHub = {
  answer: `OKPlumb is a commercial plumbing contractor serving the Tulsa metro — restaurants, offices, retail, medical and dental suites, and multi-tenant properties. We handle drain and sewer, water heaters, grease traps, backflow, tenant-improvement build-outs, and 24/7 emergencies. Licensed, insured, flat-rate, and code-compliant. Call ${PHONE} for commercial service.`,
  faqs: [
    {
      question: "Do you serve commercial clients across the Tulsa metro?",
      answer: `Yes — Tulsa, Broken Arrow, Jenks, Owasso, Bixby, Sand Springs, Sapulpa, and the surrounding cities. Call ${PHONE} and we'll confirm your address.`,
    },
    {
      question: "What types of commercial properties do you work on?",
      answer:
        "Restaurants and commercial kitchens, offices, retail, medical and dental suites, and property-managed or multi-tenant buildings — from a single repair to a full build-out.",
    },
    {
      question: "Do you offer 24/7 commercial emergency service?",
      answer:
        "Yes. Same-day dispatch and round-the-clock response for active leaks, sewer backups, and no-water situations that threaten your operations.",
    },
    {
      question: "Are you licensed and insured for commercial work?",
      answer:
        "Yes — licensed, insured, and code-compliant to Oklahoma plumbing code and your local authority having jurisdiction (AHJ).",
    },
    {
      question: "Do you handle commercial build-outs and tenant improvements?",
      answer:
        "Yes — from permit-ready rough-in to final fixture and equipment connections, coordinated with your GC, architect, and inspectors through certificate of occupancy.",
    },
  ] satisfies Faq[],
};

export const commercialServices: CommercialService[] = [
  {
    slug: "restaurants-commercial-kitchens",
    icon: "utensils",
    name: "Restaurant & Commercial Kitchen Plumbing",
    title: "Restaurant & Commercial Kitchen Plumbing in Tulsa",
    metaDescription:
      "Tulsa restaurant and commercial kitchen plumbing — grease traps, floor drains, dishwasher and prep-sink lines, hot water, and 24/7 emergency service. Call (918) 851-8203.",
    answer: `OKPlumb keeps Tulsa restaurants and commercial kitchens running — grease traps, hot-water and booster systems, floor and trench drains, dishwasher and prep-sink lines, and fast emergency drain clearing. We work around your service hours to avoid downtime, and every job is licensed, insured, and code-compliant. Call ${PHONE} for same-day commercial service.`,
    included: [
      "Grease trap & interceptor install and service",
      "Floor drain & trench drain cleaning",
      "Dishwasher & three-compartment sink lines",
      "Commercial hot-water & booster heater service",
      "Backflow testing & certification",
      "After-hours emergency response",
    ],
    faqs: [
      {
        question: "How fast can you respond to a kitchen plumbing emergency?",
        answer: `Same-day across the Tulsa metro, 24/7. We prioritize no-water, active-leak, and health-code situations that can shut down service. Call ${PHONE}.`,
      },
      {
        question: "Can you work outside our service hours?",
        answer:
          "Yes. We schedule disruptive work after close or before open to protect your covers and revenue.",
      },
      {
        question: "Do you handle health-code plumbing requirements?",
        answer:
          "Yes — grease interceptors, backflow prevention, and indirect-waste air gaps to keep you inspection-ready.",
      },
      {
        question: "How often should a restaurant grease trap be cleaned?",
        answer:
          "Follow the EPA \u201c25% rule\u201d: clean when grease and solids reach about 25% of the trap's capacity. Most kitchens land on a 1–3 month cycle depending on volume.",
      },
    ],
  },
  {
    slug: "tenant-improvement-build-outs",
    icon: "build",
    name: "Tenant Improvement & Build-Out Plumbing",
    title: "Commercial Tenant Improvement & Build-Out Plumbing in Tulsa",
    metaDescription:
      "Tulsa commercial tenant improvement (TI) and build-out plumbing — permit-ready rough-in to final connections, coordinated with your GC and inspectors. Call (918) 851-8203.",
    answer: `OKPlumb handles commercial tenant-improvement (TI) and build-out plumbing across the Tulsa metro — from permit-ready rough-in to final connections. We coordinate with your GC, architect, and inspectors on offices, retail, restaurants, and medical/dental suites, keeping the job on schedule and to code. Call ${PHONE} to scope your build-out.`,
    included: [
      "Underground, rough-in & top-out",
      "Fixture & equipment final connections",
      "Permit & inspection coordination",
      "Restroom & break-room build-outs",
      "Medical / dental & specialty rough-in",
      "As-built closeout documentation",
    ],
    faqs: [
      {
        question: "Do you work as the plumbing sub on commercial build-outs?",
        answer:
          "Yes. We coordinate with the GC, architect, and authority having jurisdiction from rough-in through final inspection and closeout.",
      },
      {
        question: "Can you handle medical or dental TI plumbing?",
        answer:
          "Yes — we have tenant-improvement and medical/dental build-out experience, including specialty rough-in and code-compliant connections.",
      },
      {
        question: "Do you pull permits and handle inspections?",
        answer:
          "We coordinate permits and schedule every required inspection through certificate of occupancy.",
      },
      {
        question: "How do you keep TI projects on schedule?",
        answer:
          "Inspection-gated milestones, a clearly defined scope, and proactive coordination so the other trades aren't waiting on plumbing.",
      },
    ],
  },
  {
    slug: "medical-dental-offices",
    icon: "medical",
    name: "Medical & Dental Office Plumbing",
    title: "Medical & Dental Office Plumbing in Tulsa",
    metaDescription:
      "Tulsa medical and dental office plumbing — operatory and sterilization rough-in, vacuum/air lines, hand-wash stations, backflow, and build-outs. Call (918) 851-8203.",
    answer: `OKPlumb builds and maintains plumbing for Tulsa medical and dental offices — operatory and sterilization rough-in, vacuum and air lines, hand-wash and eyewash stations, and code-compliant waste and venting. We understand specialty fixtures and inspection requirements for clinical spaces. Call ${PHONE} for medical and dental plumbing.`,
    included: [
      "Operatory & sterile-area rough-in",
      "Vacuum / air & specialty utility lines",
      "ADA hand-wash & eyewash stations",
      "Backflow & potable-water protection",
      "Tenant-improvement build-outs",
      "Preventive maintenance",
    ],
    faqs: [
      {
        question: "Do you do dental operatory rough-in?",
        answer:
          "Yes — chair utilities, vacuum and air, plus water and waste rough-in coordinated with your equipment plan.",
      },
      {
        question: "Can you handle a full clinic build-out?",
        answer:
          "Yes — from underground rough-in to final fixture connections and inspection through certificate of occupancy.",
      },
      {
        question: "Do you protect potable water in clinical settings?",
        answer:
          "Yes — backflow prevention and air gaps keep the water supply code-compliant and safe.",
      },
      {
        question: "Are you licensed and insured for commercial medical work?",
        answer:
          "Yes — licensed and insured, working to Oklahoma plumbing code and local AHJ requirements.",
      },
    ],
  },
  {
    slug: "property-management",
    icon: "manage",
    name: "Property Management Plumbing",
    title: "Property Management & Commercial Landlord Plumbing in Tulsa",
    metaDescription:
      "Tulsa property management plumbing — multi-unit and multi-site repairs, preventive maintenance, jetting, and documented flat-rate invoicing. Call (918) 851-8203.",
    answer: `OKPlumb is the on-call plumber for Tulsa property managers and commercial landlords — fast repairs across multiple units and buildings, scheduled preventive maintenance, and flat-rate pricing with clean documentation for your books. One number for offices, retail, and multi-tenant properties. Call ${PHONE} to set up service.`,
    included: [
      "Multi-unit & multi-site repairs",
      "Preventive maintenance plans",
      "Drain & sewer hydro-jetting",
      "Water heater fleet service",
      "Backflow testing & tracking",
      "Documented flat-rate invoicing",
    ],
    faqs: [
      {
        question: "Can you service multiple properties under one account?",
        answer:
          "Yes — one point of contact, consistent flat-rate pricing, and per-property documentation.",
      },
      {
        question: "Do you offer preventive maintenance agreements?",
        answer:
          "Yes — scheduled jetting, backflow testing, and water-heater service to prevent emergency calls.",
      },
      {
        question: "How fast is emergency response for a tenant issue?",
        answer:
          "Same-day across the metro, 24/7 for active leaks and no-water situations.",
      },
      {
        question: "Do you provide documentation for accounting?",
        answer:
          "Yes — itemized, flat-rate invoices and service records per property.",
      },
    ],
  },
  {
    slug: "grease-traps",
    icon: "grease",
    name: "Grease Trap Installation & Cleaning",
    title: "Grease Trap Installation & Cleaning in Tulsa",
    metaDescription:
      "Tulsa grease trap installation, cleaning, and code compliance for restaurants and food service. Follow the 25% rule. Documentation included. Call (918) 851-8203.",
    answer: `OKPlumb installs, services, and cleans grease traps and interceptors for Tulsa restaurants and food-service facilities. We size and install to code, pump and clean on schedule, and keep you inspection-ready with documentation. Most kitchens need cleaning when the trap is about 25% full. Call ${PHONE} to schedule grease-trap service.`,
    included: [
      "Grease trap & interceptor sizing and install",
      "Scheduled pumping & cleaning",
      "Line jetting & deodorizing",
      "Code compliance & documentation",
      "Emergency overflow response",
      "Maintenance scheduling",
    ],
    faqs: [
      {
        question: "How often should a grease trap be cleaned?",
        answer:
          "Follow the \u201c25% rule\u201d: clean when grease and solids reach 25% of capacity. Most kitchens land on a 1–3 month cycle by volume.",
      },
      {
        question: "What happens if I skip grease-trap service?",
        answer:
          "Backups, foul odors, failed health inspections, and possible fines. Regular service is far cheaper than a shutdown.",
      },
      {
        question: "Can you install a larger interceptor if we're growing?",
        answer:
          "Yes — we size and install to your projected flow and local code.",
      },
      {
        question: "Do you provide cleaning documentation?",
        answer:
          "Yes — service records to keep you inspection-ready.",
      },
    ],
  },
  {
    slug: "backflow-testing",
    icon: "backflow",
    name: "Backflow Testing & Certification",
    title: "Commercial Backflow Testing & Certification in Tulsa",
    metaDescription:
      "Tulsa commercial backflow testing, certification, repair, and install. Annual testing filed with the water authority. Call (918) 851-8203.",
    answer: `OKPlumb tests, certifies, repairs, and installs backflow prevention assemblies for Tulsa commercial properties. Most jurisdictions require annual testing by a certified tester, with results filed to the water authority. We test, tag, document, and handle repairs or replacement in one visit. Call ${PHONE} to schedule backflow certification.`,
    included: [
      "Annual backflow testing & certification",
      "Assembly repair & rebuild",
      "New assembly installation",
      "Filing results with the water authority",
      "Reminder scheduling",
      "Cross-connection surveys",
    ],
    faqs: [
      {
        question: "How often is backflow testing required?",
        answer:
          "Most Oklahoma jurisdictions require certified testing annually. Some sites — medical, irrigation, and fire systems — may require more frequent testing.",
      },
      {
        question: "Do you file the results for us?",
        answer:
          "Yes — we test, tag, and submit certification to your local water authority.",
      },
      {
        question: "What if the assembly fails?",
        answer:
          "We repair or replace on the spot when possible, then re-test to pass.",
      },
      {
        question: "Why do commercial properties need backflow prevention?",
        answer:
          "It protects the public water supply from contamination and is required by code for most commercial connections.",
      },
    ],
  },
  {
    slug: "commercial-water-heaters",
    icon: "heater",
    name: "Commercial Water Heaters",
    title: "Commercial Water Heater Repair & Installation in Tulsa",
    metaDescription:
      "Tulsa commercial water heaters — tank and tankless install, repair, and fast replacement for restaurants, gyms, salons, and multi-tenant buildings. Call (918) 851-8203.",
    answer: `OKPlumb installs, repairs, and replaces commercial water heaters and tankless systems for Tulsa businesses — restaurants, salons, gyms, offices, and multi-tenant buildings. We size for real demand, handle gas and venting to code, and offer fast replacement to keep hot water flowing. Call ${PHONE} for commercial water-heater service.`,
    included: [
      "Tank & tankless install / replace",
      "High-demand & booster systems",
      "Gas line & venting to code",
      "Recirculation systems",
      "Preventive flushing & service",
      "Emergency replacement",
    ],
    faqs: [
      {
        question: "Tank or tankless for a commercial space?",
        answer:
          "It depends on simultaneous demand and available space. Tankless saves energy and never runs out; tanks are lower up-front. We size to your peak load.",
      },
      {
        question: "How fast can you replace a failed commercial heater?",
        answer:
          "Often same-day or next-day — we carry common commercial units and can expedite to limit downtime.",
      },
      {
        question: "Do you handle gas and venting?",
        answer:
          "Yes — gas line, combustion air, and venting brought to Oklahoma code.",
      },
      {
        question: "Can you service a multi-unit building's hot water?",
        answer:
          "Yes — central systems, recirculation loops, and fleet maintenance.",
      },
    ],
  },
  {
    slug: "commercial-drain-hydro-jetting",
    icon: "jetting",
    name: "Commercial Drain Cleaning & Hydro-Jetting",
    title: "Commercial Drain Cleaning & Hydro-Jetting in Tulsa",
    metaDescription:
      "Tulsa commercial drain cleaning and hydro-jetting — camera inspection, grease and root removal, and preventive maintenance for restaurants and retail. Call (918) 851-8203.",
    answer: `OKPlumb clears and maintains commercial drain and sewer lines with camera inspection and high-pressure hydro-jetting — cutting grease, scale, and roots so clogs don't come back. Ideal for restaurants, retail, and multi-tenant buildings. We scope first, then jet, and can set a preventive schedule. Call ${PHONE} for commercial drain service.`,
    included: [
      "Camera inspection & scoping",
      "High-pressure hydro-jetting",
      "Grease & root removal",
      "Recurring maintenance jetting",
      "Trench & floor drain service",
      "Emergency backup response",
    ],
    faqs: [
      {
        question: "Hydro-jetting vs snaking for commercial lines?",
        answer:
          "A snake punches a hole; jetting scours the pipe wall so grease and roots don't return in weeks. Jetting is the commercial standard for recurring clogs.",
      },
      {
        question: "How often should commercial lines be jetted?",
        answer:
          "High-grease kitchens often need quarterly service. We set a schedule from your camera scope and clog history.",
      },
      {
        question: "Will jetting damage older pipes?",
        answer:
          "We camera-scope first and regulate pressure to the pipe material; fragile lines are inspected before we run water.",
      },
      {
        question: "Can you handle a sewer backup emergency?",
        answer:
          "Yes — same-day, 24/7 response to clear backups and protect your space.",
      },
    ],
  },
  {
    slug: "new-construction",
    icon: "construction",
    name: "New Construction Commercial Plumbing",
    title: "New Construction Commercial Plumbing in Tulsa",
    metaDescription:
      "Tulsa new construction commercial plumbing — site utilities, rough-in, top-out, and final connections, coordinated with your GC and engineers. Call (918) 851-8203.",
    answer: `OKPlumb provides ground-up commercial plumbing for Tulsa new construction — underground and site utilities, rough-in, top-out, and final fixture and equipment connections, coordinated with your GC and engineers. We build to plan and code, inspection-gated through certificate of occupancy. Call ${PHONE} to bid your project.`,
    included: [
      "Underground & site utilities",
      "Rough-in & top-out",
      "Fixture & equipment connections",
      "Plan & spec coordination",
      "Permit & inspection management",
      "As-built closeout",
    ],
    faqs: [
      {
        question: "Do you bid new commercial construction?",
        answer:
          "Yes — we estimate from plans and specs and coordinate with the GC and engineers.",
      },
      {
        question: "Can you handle site utilities and underground?",
        answer:
          "Yes — from underground rough-in through final connections.",
      },
      {
        question: "Do you manage permits and inspections?",
        answer:
          "Yes — coordinated and inspection-gated through certificate of occupancy.",
      },
      {
        question: "Do you provide closeout documentation?",
        answer:
          "Yes — as-builts and the required closeout deliverables.",
      },
    ],
  },
];

export function getCommercialBySlug(
  slug: string,
): CommercialService | undefined {
  return commercialServices.find((s) => s.slug === slug);
}
