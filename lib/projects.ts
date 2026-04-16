export type Section = {
  label: string;
  body: string;
  images?: string[];
};

export type Project = {
  index: string;
  slug: string;
  name: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  hero: { from: string; via: string; to: string };
  heroImage?: string;
  sections: Section[];
  credits: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "forma",
    name: "Bolt SuperApp",
    category: "Brand Identity",
    year: "2024",
    client: "Forma Labs",
    role: "Brand Design, Art Direction",
    description: "Visual system and identity for a B2B infrastructure startup.",
    hero: { from: "#1a1a2e", via: "#16213e", to: "#0f3460" },
    heroImage: "/images/forma/hero.jpg",
    sections: [
      {
        label: "Context",
        body: "Forma Labs needed an identity that felt authoritative without being corporate — something that could hold its own alongside enterprise software while still communicating forward momentum. The solution centres on a geometric wordmark and a disciplined two-colour palette that scales from CLI docs to conference booths.",
        images: ["/images/forma/gallery-1.jpg"],
      },
      {
        label: "Problem",
        body: "Forma Labs needed an identity that felt authoritative without being corporate — something that could hold its own alongside enterprise software while still communicating forward momentum. The solution centres on a geometric wordmark and a disciplined two-colour palette that scales from CLI docs to conference booths.",
        images: [
          "/images/forma/gallery-1.jpg",
          "/images/forma/gallery-2.jpg",
          "/images/forma/gallery-3.jpg",
        ],
      },
      {
        label: "Approach",
        body: "We started with a type audit across forty infrastructure brands to map the space. Most leaned on either sterile sans-serifs or over-engineered custom marks. The opportunity was restraint: a single strong typeface, tight tracking, and a mark built entirely from the letterforms themselves. Colour came last — deep navy as the anchor, electric indigo for interaction states.",
        images: [
          "/images/forma/gallery-2.jpg",
          "/images/forma/gallery-3.jpg",
        ],
      },
      {
        label: "Outcomes",
        body: "The new identity launched with Forma's Series A announcement. Brand recognition in pipeline surveys increased by 34% quarter-over-quarter. The system has since extended to three product lines, a developer documentation site, and a merch line sold out at launch.",
      },
    ],
    credits: [
      { label: "Client", value: "Forma Labs" },
      { label: "Design", value: "Studio Portfolio" },
      { label: "Typography", value: "Söhne by Klim Type" },
      { label: "Year", value: "2024" },
    ],
  },
  {
    index: "02",
    slug: "slate-ds",
    name: "Slate DS",
    category: "Design System",
    year: "2024",
    client: "Slate (YC W23)",
    role: "Systems Design, Component Architecture",
    description: "Component library and token architecture for a SaaS product.",
    hero: { from: "#0d1117", via: "#161b22", to: "#21262d" },
    sections: [
      {
        label: "Overview",
        body: "Slate's product had grown fast — four designers, two squads, and a component library that had never been formally documented. Every new feature spawned new one-off patterns. Slate DS is the foundation that replaced 200+ bespoke components with a coherent, token-driven system used by the full product team.",
      },
      {
        label: "Approach",
        body: "The audit phase catalogued every component in production. We grouped by function, not appearance, which surfaced the real duplication — seventeen different button variants, nine modal patterns. From there we defined a semantic token layer: not just colour values but intent (surface-default, interactive-primary, feedback-error). Components were rebuilt in Figma and React simultaneously.",
      },
      {
        label: "Outcomes",
        body: "Design-to-dev handoff time dropped from an average of 4.5 days to under 1 day. QA defect rate on UI components fell by 61% in the first quarter post-launch. The system is now maintained by an internal guild with monthly versioning.",
      },
    ],
    credits: [
      { label: "Client", value: "Slate" },
      { label: "Systems Design", value: "Studio Portfolio" },
      { label: "Engineering", value: "Slate Platform Team" },
      { label: "Year", value: "2024" },
    ],
  },
  {
    index: "03",
    slug: "drift",
    name: "Drift",
    category: "Motion & UI",
    year: "2023",
    client: "Drift Finance",
    role: "Product Design, Motion Design",
    description: "Interaction and animation concepts for a mobile finance app.",
    hero: { from: "#0a0a0a", via: "#1a0533", to: "#2d1b69" },
    sections: [
      {
        label: "Overview",
        body: "Drift is a personal finance app built around the idea that money should feel less stressful. The design challenge was to make complex account data feel light and readable — not clinical. Motion was the primary tool: everything from balance updates to category breakdowns uses physics-based transitions that give the interface a sense of weight and honesty.",
      },
      {
        label: "Approach",
        body: "We prototyped twelve different approaches to the core spending chart before landing on the arc metaphor — a radial fill that grows as you approach your monthly limit. The colour shift (cool to warm) communicates budget state without a single number. All transitions were spec'd in Lottie-compatible JSON for direct handoff to the iOS team.",
      },
      {
        label: "Outcomes",
        body: "Drift's App Store rating moved from 3.6 to 4.8 stars in the two months following the redesign launch. Session length increased by 2.3×. The motion system has been presented at three fintech design conferences as a reference implementation for accessible animation.",
      },
    ],
    credits: [
      { label: "Client", value: "Drift Finance" },
      { label: "Design & Motion", value: "Studio Portfolio" },
      { label: "iOS Engineering", value: "Drift Mobile Team" },
      { label: "Year", value: "2023" },
    ],
  },
  {
    index: "04",
    slug: "outline",
    name: "Outline",
    category: "Web Design",
    year: "2023",
    client: "Outline Studio",
    role: "Web Design, Creative Direction",
    description: "Marketing site for a boutique creative studio.",
    hero: { from: "#0c0c0c", via: "#1a1a1a", to: "#2a2a2a" },
    sections: [
      {
        label: "Overview",
        body: "Outline came to us needing a site that matched the quality of their work — they were producing some of the best editorial photography in London but presenting it on a template that hadn't been touched since 2019. The brief was simple: make it feel as intentional as the work itself.",
      },
      {
        label: "Approach",
        body: "The design is built around one principle: images lead, everything else follows. Type is set in a single weight — no bold, no headings in the traditional sense. The grid breaks deliberately on the project pages, letting photography bleed past the margin at specific breakpoints. Scroll transitions are slow, almost reluctant, which forces the viewer to pause.",
      },
      {
        label: "Outcomes",
        body: "New business enquiries increased by 85% in the three months post-launch. The site was featured in Awwwards SOTD and collected four CSS Design Awards. Outline has since expanded their team from three to seven people.",
      },
    ],
    credits: [
      { label: "Client", value: "Outline Studio" },
      { label: "Design", value: "Studio Portfolio" },
      { label: "Development", value: "Studio Portfolio" },
      { label: "Year", value: "2023" },
    ],
  },
  {
    index: "05",
    slug: "thread",
    name: "Thread",
    category: "Product Design",
    year: "2022",
    client: "Thread (Seed)",
    role: "Product Design, UX Research",
    description: "End-to-end design for a collaborative writing tool.",
    hero: { from: "#0c1a0c", via: "#0f2a0f", to: "#1a3d1a" },
    sections: [
      {
        label: "Overview",
        body: "Thread is a writing tool for teams who draft, edit, and publish in one place. The core tension in the product was between individual focus mode and collaborative review — two experiences that feel fundamentally different but had to live in the same interface without constant context-switching.",
      },
      {
        label: "Approach",
        body: "Eight weeks of research with writing teams at two media companies and a consultancy surfaced the key insight: the biggest friction wasn't the tools, it was knowing when something was ready for feedback. We designed around that — introducing a soft state model (Draft, In Review, Final) that shifts the UI's visual weight and available actions depending on where a document sits in the workflow.",
      },
      {
        label: "Outcomes",
        body: "Thread closed a $2.1M seed round six months after launching with the redesigned product. Time-to-publish for editorial teams dropped by 40%. The state model has since become the most-cited feature in user interviews and sales demos.",
      },
    ],
    credits: [
      { label: "Client", value: "Thread" },
      { label: "Design & Research", value: "Studio Portfolio" },
      { label: "Founder", value: "James Park" },
      { label: "Year", value: "2022" },
    ],
  },
];
