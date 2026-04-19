export type Section = {
  group?: string;
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
    slug: "superapp",
    name: "Bolt SuperApp",
    category: "Product Design",
    year: "2026",
    client: "Bolt",
    role: "Product Design, UX Research",
    description: "Full product redesign for a fintech SuperApp, from information architecture to design system.",
    hero: { from: "#1a1a2e", via: "#16213e", to: "#0f3460" },
    heroImage: "/images/forma/hero.jpg",
    sections: [
      {
        group: "Background",
        label: "About Bolt",
        body: "Bolt is a fintech company that built its reputation on a single, successful product: Checkout. It was focused, effective, and it worked. But at some point, the CEO set his sights on something much bigger.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Background",
        label: "CEO's New Toy: SuperApp",
        body: "The vision was bold. One app for everything. Banking, crypto, shopping, investing, insurance, games, all living under one roof. The strategy was simple and unapologetically aggressive: pack the app with as many features as possible, launch fast, and see what sticks. The goal wasn't just to build a product people loved. It was to show investors that the team could execute at scale.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Background",
        label: "Business Context",
        body: "The engineering team had pulled it off, technically. A working app existed. But it had been assembled quickly and without much structure, with features added through multiple integrations, scattered across the product in a chaotic way. When the company began preparing to present to investors, it became clear the app wasn't ready. Not even close.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "The Problem",
        label: "Core Issues",
        body: "Several things were actively holding the product back. Navigation was confusing and users didn't know where to tap, where to go, or how to move through the app. The information architecture was fragmented, with features piled on without a clear structure. Onboarding was broken and people installed the app only to immediately feel lost, leading to low engagement and poor retention. The visual design, built entirely by engineers, lacked consistency, polish, and any kind of system behind it.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "The Problem",
        label: "My Role",
        body: "That's when the company brought in a seasoned UX designer, me. My job was to bring order to the product, improve usability and visual quality, and transform a scattered collection of features into a coherent app experience. The biggest constraint: I had three months to make it happen.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Goals",
        label: "Design Goals",
        body: "The work had to serve both the product and the business at the same time. On the product side: rebuild the information architecture, introduce a proper design system, fix onboarding, and raise the overall quality across usability, accessibility, and trust. On the business side: help the company reach 2M+ registrations, grow to 1,000+ monthly active users, launch three new features, hit 60% feature parity with competitors like PayPal, Revolut, and Wise, and achieve a 4.5+ app store rating.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Goals",
        label: "Mission",
        body: "Turn a chaotic proof of concept into a real product foundation. Something investors could trust. Something users could understand. Something the company could actually grow.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Discovery",
        label: "Customer Support Insights",
        body: "I started with the people closest to the users: customer support. I booked time with support reps and asked them to walk me through the most common complaints, repeated questions, and confusing moments they heard every day. It gave me a fast, unfiltered view of where the product was genuinely failing real customers, before I had ever opened the app myself.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Discovery",
        label: "Product Audit",
        body: "Next, I became the user. I installed the app, went through every flow, tested every feature one by one, and documented every usability issue I could find. This gave me a first-time user's perspective and helped me see exactly where the friction was, not just in theory, but in practice.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Discovery",
        label: "Data Insights",
        body: "To balance what people were saying with what was actually happening, I set up access to product analytics through DataDog. I looked at total users and registrations, iOS vs Android split, registration and KYC completion rates, the most used features, and where users were dropping off. Facts, not assumptions.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Discovery",
        label: "Competitive Review",
        body: "Finally, I looked outside the company. I signed up for PayPal, Revolut, Wise, Robinhood, and Coinbase and studied how each of them handled onboarding, navigation, transfers, investing, crypto, and trust building. This helped me understand what users already expected from products like this, and where our most obvious gaps were.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Design",
        label: "Rebuilding the Information Architecture",
        body: "After reviewing all the research, one thing was clear: the app needed a completely new structure. Everything had been built around a single home screen, a grid of feature buttons sitting under a balance total. There were no quick actions, no personalization, no clear next step. Every new feature just added more clutter. Users landed there and immediately felt lost. And as a model, it wasn't scalable. It would only get worse over time.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Design",
        label: "Early Concept Prototype",
        body: "I moved quickly. Based on the research, I designed an early concept built around a modular system: a customizable dashboard supported by independent mini-apps. The dashboard gave each user a personalized home screen with shortcuts to what they used most. The mini-apps, banking, crypto, transfers, shopping, order tracking, each lived as their own self-contained product area. One shared account identity tied everything together across the ecosystem.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Design",
        label: "Fixing the Onboarding Funnel",
        body: "The data told a brutal story. Of everyone who registered, only 7% started or completed KYC. Only 2% were approved. Just 0.3% created a bank account. The biggest drop-off was happening before users ever experienced anything. The app had started as a banking product, so everyone had to complete full identity verification before they could do anything at all, even browse. That made sense for a bank. It made no sense for a SuperApp.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Design",
        label: "Rebuilding Onboarding for Growth",
        body: "I redesigned the onboarding so users could enter the app immediately and start using features that didn't require any identity verification, like shopping, order tracking, and browsing the ecosystem. KYC was moved to the moment of need, triggered only when a user wanted to do something that genuinely required it: crypto, investing, P2P transfers, banking. This reduced friction, improved the first-time experience, and gave users a reason to stay before asking them to trust us with sensitive information.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Design",
        label: "Creating the Core Components",
        body: "One of the biggest underlying problems was visual inconsistency. The app had been built without any design system, with styles hard-coded, components duplicated, and theming nearly impossible. I started by building the foundation layer from scratch: color tokens, typography, spacing, corner radius rules, and an icon library. This became the shared language for everything that followed.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Design",
        label: "Scaling the System in Parallel",
        body: "With the foundation in place, I built out the most commonly used UI components: buttons, inputs, checkboxes, toggles, avatars, loaders and states. I focused on the high-frequency building blocks that appeared across the most screens, and raised the visual quality of each one to make the product feel more premium and trustworthy. These reusable components brought consistency to the experience while reducing both design and engineering effort across the board.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Design",
        label: "Using AI to Scale as a Team of One",
        body: "I was the only designer on a workload that would normally require a full team. To keep up, I built a tight workflow around AI tools. I used Cursor and Claude Code to generate concepts and interfaces, Figma to refine and polish the details, and Google Flow with Gemini for image generation. The loop was continuous: generate, refine, feed improvements back in, and keep evolving. Instead of delivering static mockups, I produced interactive coded prototypes that engineers and stakeholders could actually experience, which cut alignment time and kept the team moving fast.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Delivery",
        label: "The Work I Delivered",
        body: "In three months, as a team of one, I completed a full product redesign. I rebuilt the entire app around a new modular architecture. I created a completely new onboarding flow. I built the product's first design system from scratch. I refreshed the visual design to feel more premium and polished. I designed and launched three new product features. And I delivered interactive coded prototypes that helped engineering move faster and align on execution with far less back-and-forth.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Delivery",
        label: "Gamified User Testing",
        body: "Once the redesign was ready, I needed real user feedback, but there was no time or budget for traditional research. So I turned testing into a game. I hid coins throughout the app, placed across different screens and features. To find them, users had to naturally explore the product, move through flows, and interact with the new experience. Each coin earned points redeemable for cashback or partner rewards. Users had fun and earned something real. We got genuine behavioral data from real users. And we quickly spotted the flows that still caused confusion, without ever asking anyone to participate in a test.",
        images: ["/images/placeholder.png"],
      },
      {
        group: "Results",
        label: "Results",
        body: "The redesigned SuperApp launched publicly, a real market-ready product live on iOS and Android. 2M+ total registrations. Around 1,000 daily active users. A 4.6 star rating in the Apple App Store. Three or more new integrations launched after the redesign. A full design system in place. Clearer onboarding. And a stronger, more credible investor story backed by real product momentum.",
        images: ["/images/placeholder.png"],
      },
    ],
    credits: [
      { label: "Client", value: "Bolt" },
      { label: "Role", value: "Product Design, UX Research" },
      { label: "Category", value: "Product Design" },
      { label: "Year", value: "2026" },
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
