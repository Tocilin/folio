export type SectionImage = {
  src: string;
  alt: string;
  // When true, rendered as a transparent product shot on a themed gradient
  // backdrop (via FramedImage) instead of a plain full-bleed photo tile.
  // width/height must match the source file's actual pixel size — FramedImage
  // uses next/image (not `fill`), so these drive both the aspect ratio and
  // Next's automatic format/srcset optimization.
  framed?: boolean;
  width?: number;
  height?: number;
};

export type Section = {
  group?: string;
  label: string;
  body: string;
  images?: SectionImage[];
};

export type WorkTrack = "management" | "ic" | "design-systems" | "side-projects";

export type Metric = {
  value: string;
  label: string;
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
  // Headline impact stats shown below the description on the homepage
  // list row, e.g. { value: "+5.5x", label: "Flash sales/year" }.
  metrics?: Metric[];
  subtitle?: string;
  hero: { from: string; via: string; to: string };
  heroImage?: string;
  // When true, heroImage is rendered as a transparent product shot on a
  // themed gradient backdrop instead of a plain photo tile. Width/height
  // must match the source file — see SectionImage for why.
  heroFramed?: boolean;
  heroImageWidth?: number;
  heroImageHeight?: number;
  sections: Section[];
  credits: { label: string; value: string }[];
  track: WorkTrack;
  // When set, the case study page is hidden behind a simple client-side
  // password prompt. Not real security — just a casual gate.
  password?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "superapp",
    name: "Bolt SuperApp",
    category: "Product Design",
    year: "2026",
    client: "Bolt",
    role: "Lead UX Designer",
    description: "A complete redesign of Bolt's SuperApp, from information architecture to a scalable design system.",
    subtitle: "Turning a chaotic proof of concept into a real product foundation. Something investors could trust. Something users could understand. Something the company could actually grow.",
    hero: { from: "#1a1a2e", via: "#16213e", to: "#0f3460" },
    heroImage: "/images/superapp/00-hero-framed.png",
    heroFramed: true,
    heroImageWidth: 1800,
    heroImageHeight: 1012,
    sections: [
      {
        group: "Overview",
        label: "About Bolt",
        body: "Bolt is a fintech company that built its reputation on a single, successful product: Checkout. It was focused, effective, and it worked. But at some point, the CEO set his sights on something much bigger.",
        images: [
          {
            src: "/images/superapp/02-about-bolt-framed.png",
            alt: "Bolt's Checkout marketing website homepage, headlined 'The world's most intelligent checkout'",
            framed: true,
          },
        ],
      },
      {
        group: "Overview",
        label: "CEO's new toy: SuperApp",
        body: "The vision was bold. One app for everything. Banking, crypto, shopping, investing, insurance, games, all living under one roof. The strategy was simple and unapologetically aggressive: pack the app with as many features as possible, launch fast, and see what sticks. The goal wasn't just to build a product people loved. It was to show investors that the team could execute at scale.",
        images: [
          {
            src: "/images/superapp/03-superapp-vision.webp",
            alt: "Concept slide reading 'One SuperApp to rule them all', with icons for sending money, rewards, crypto, and investing orbiting a stick figure",
          },
        ],
      },
      {
        group: "Overview",
        label: "Business context",
        body: "The engineering team had pulled it off, technically. A working app existed. But it had been assembled quickly and without much structure, with features added through multiple integrations, scattered across the product in a chaotic way. When the company began preparing to present to investors, it became clear the app wasn't ready. Not even close.",
        images: [
          {
            src: "/images/superapp/04-business-context-framed.png",
            alt: "Four screens from the early app's rewards flow, captioned 'Built by engineers. No designers involved'",
            framed: true,
            width: 1800,
            height: 1012,
          },
        ],
      },
      {
        group: "The problem",
        label: "Core issues",
        body: "Several things were actively holding the product back. Navigation was confusing and users didn't know where to tap, where to go, or how to move through the app. The information architecture was fragmented, with features piled on without a clear structure. Onboarding was broken and people installed the app only to immediately feel lost, leading to low engagement and poor retention. The visual design, built entirely by engineers, lacked consistency, polish, and any kind of system behind it.",
        images: [
          {
            src: "/images/superapp/investor-quote-framed.png",
            alt: "Slide quoting a potential investor: 'The app looks like something high school students threw together over a weekend'",
            framed: true,
            width: 1800,
            height: 1012,
          },
          {
            src: "/images/superapp/05-core-issues-framed.png",
            alt: "Slide listing six main design challenges: weak information architecture, poor onboarding, confusing navigation, inconsistent visual design, lack of user trust, and accessibility risks",
            framed: true,
            width: 1800,
            height: 1012,
          },
        ],
      },
      {
        group: "The problem",
        label: "My role",
        body: "That's when the company brought in a seasoned UX designer, me. My job was to bring order to the product, improve usability and visual quality, and transform a scattered collection of features into a coherent app experience. The biggest constraint: I had three months to make it happen.",
        images: [
          {
            src: "/images/superapp/06-my-role-framed.png",
            alt: "Slide titled 'The \"fun\" part' noting the biggest constraint was time: only 3 months to deliver meaningful change, illustrated with a stressed stick figure beside a fast-moving stopwatch",
            framed: true,
            width: 1800,
            height: 1012,
          },
        ],
      },
      {
        group: "Goals",
        label: "Design goals",
        body: "The work had to serve both the product and the business at the same time. On the product side: rebuild the information architecture, introduce a proper design system, fix onboarding, and raise the overall quality across usability, accessibility, and trust. On the business side: help the company reach 2M+ registrations, grow to 1,000+ monthly active users, launch three new features, hit 60% feature parity with competitors like PayPal, Revolut, and Wise, and achieve a 4.5+ app store rating.",
        images: [
          {
            src: "/images/superapp/07-design-goals.webp",
            alt: "Project goals slide organized in three columns: Business (raise funding), Product (user growth, active users, new features, app ratings), and Design (information architecture, visual design, onboarding, product quality)",
          },
        ],
      },
      {
        group: "Goals",
        label: "Mission",
        body: "Turn a chaotic proof of concept into a real product foundation. Something investors could trust. Something users could understand. Something the company could actually grow.",
        images: [
          {
            src: "/images/superapp/08-mission.webp",
            alt: "Mission slide reading 'Turn a chaotic proof of concept into a real product,' next to an illustration of a caped stick figure surrounded by app feature icons",
          },
        ],
      },
      {
        group: "Discovery",
        label: "Customer support insights",
        body: "I started with the people closest to the users: customer support. I booked time with support reps and asked them to walk me through the most common complaints, repeated questions, and confusing moments they heard every day. It gave me a fast, unfiltered view of where the product was genuinely failing real customers, before I had ever opened the app myself.",
        images: [
          {
            src: "/images/superapp/09-customer-support-insights.webp",
            alt: "Illustration of a stick figure holding a magnifying glass among research icons (bar chart, pie chart, checklist, and chat bubble), symbolizing the discovery phase",
          },
        ],
      },
      {
        group: "Discovery",
        label: "Product audit",
        body: "Next, I became the user. I installed the app, went through every flow, tested every feature one by one, and documented every usability issue I could find. This gave me a first-time user's perspective and helped me see exactly where the friction was, not just in theory, but in practice.",
        images: [
          {
            src: "/images/superapp/10-product-audit-map.webp",
            alt: "Figma canvas mapping the full product audit, with dozens of connected app screens across finance and card categories, each flagged with red 'needs improvement' notes",
          },
          {
            src: "/images/superapp/11-product-audit-annotations.webp",
            alt: "Close-up of an audited withdrawal screen with red 'needs improvement' callouts on button placement and account labeling, next to a grid of additional flagged card and P2P screens",
          },
        ],
      },
      {
        group: "Discovery",
        label: "Data insights",
        body: "To balance what people were saying with what was actually happening, I set up access to product analytics through DataDog. I looked at total users and registrations, iOS vs Android split, registration and KYC completion rates, the most used features, and where users were dropping off. Facts, not assumptions.",
        images: [
          {
            src: "/images/superapp/12-data-insights.webp",
            alt: "Analytics dashboard showing SuperApp performance data: total sign-ups, KYC completion, debit card volume, crypto trading activity, and user engagement over time",
          },
        ],
      },
      {
        group: "Discovery",
        label: "Competitive review",
        body: "Finally, I looked outside the company. I signed up for PayPal, Revolut, Wise, Robinhood, and Coinbase and studied how each of them handled onboarding, navigation, transfers, investing, crypto, and trust building. This helped me understand what users already expected from products like this, and where our most obvious gaps were.",
        images: [
          {
            src: "/images/superapp/13-competitive-review.webp",
            alt: "Competitive review slide describing the analysis of PayPal, Revolut, Wise, Robinhood, and Coinbase, alongside real screenshots of crypto, transfer, wallet, and travel-booking screens studied during the review",
          },
        ],
      },
      {
        group: "Design",
        label: "Rebuilding the information architecture",
        body: "After reviewing all the research, one thing was clear: the app needed a completely new structure. Everything had been built around a single home screen, a grid of feature buttons sitting under a balance total. There were no quick actions, no personalization, no clear next step. Every new feature just added more clutter. Users landed there and immediately felt lost. And as a model, it wasn't scalable. It would only get worse over time.",
        images: [
          {
            src: "/images/superapp/15-rebuilding-ia.jpg",
            alt: "Old information architecture diagram showing every feature flattened into a single grid under the home screen's balance total",
          },
          {
            src: "/images/superapp/17-dashboard-ia.jpg",
            alt: "New dashboard information architecture with a customizable widget layout and an app-switcher for independent mini-apps",
          },
          {
            src: "/images/superapp/18-dashboard-modules.jpg",
            alt: "Dashboard module breakdown showing the mini-app tiles and banking module arranged in the new structure",
          },
        ],
      },
      {
        group: "Design",
        label: "Early concept prototype",
        body: "I moved quickly. Based on the research, I designed an early concept built around a modular system: a customizable dashboard supported by independent mini-apps. The dashboard gave each user a personalized home screen with shortcuts to what they used most. The mini-apps, banking, crypto, transfers, shopping, order tracking, each lived as their own self-contained product area. One shared account identity tied everything together across the ecosystem.",
        images: [
          {
            src: "/images/superapp/16-initial-draft-concept.jpg",
            alt: "Early concept mockup of the modular dashboard with customizable shortcuts and independent mini-apps for banking, crypto, and shopping",
          },
        ],
      },
      {
        group: "Design",
        label: "Fixing the onboarding funnel",
        body: "The data told a brutal story. Of everyone who registered, only 7% started or completed KYC. Only 2% were approved. Just 0.3% created a bank account. The biggest drop-off was happening before users ever experienced anything. The app had started as a banking product, so everyone had to complete full identity verification before they could do anything at all, even browse. That made sense for a bank. It made no sense for a SuperApp.",
        images: [
          {
            src: "/images/superapp/19-onboarding.jpg",
            alt: "Onboarding overview slide introducing the funnel problem",
          },
          {
            src: "/images/superapp/20-original-onboarding.jpg",
            alt: "Grid of the original onboarding screens users had to complete before accessing anything in the app",
          },
          {
            src: "/images/superapp/21-onboarding-funnel-data.jpg",
            alt: "Onboarding funnel chart showing the drop-off from registration through KYC start, approval, and bank account creation",
          },
        ],
      },
      {
        group: "Design",
        label: "Rebuilding onboarding for growth",
        body: "I redesigned the onboarding so users could enter the app immediately and start using features that didn't require any identity verification, like shopping, order tracking, and browsing the ecosystem. KYC was moved to the moment of need, triggered only when a user wanted to do something that genuinely required it: crypto, investing, P2P transfers, banking. This reduced friction, improved the first-time experience, and gave users a reason to stay before asking them to trust us with sensitive information.",
        images: [
          {
            src: "/images/superapp/22-simplified-onboarding.jpg",
            alt: "Redesigned onboarding flow showing simplified registration, OTP, and app-selection screens with KYC deferred until needed",
          },
        ],
      },
      {
        group: "Design",
        label: "Creating the core components",
        body: "One of the biggest underlying problems was visual inconsistency. The app had been built without any design system, with styles hard-coded, components duplicated, and theming nearly impossible. I started by building the foundation layer from scratch: color tokens, typography, spacing, corner radius rules, and an icon library. This became the shared language for everything that followed.",
        images: [
          {
            src: "/images/superapp/23-design-system.jpg",
            alt: "Design system overview slide",
          },
          {
            src: "/images/superapp/24-foundation.jpg",
            alt: "Design token foundation showing color, spacing, and text-size variable collections across dark, light, and debug themes",
          },
          {
            src: "/images/superapp/25-core-components-1.jpg",
            alt: "Button and icon-button component variants across filled, muted, and text styles",
          },
          {
            src: "/images/superapp/26-core-components-2.jpg",
            alt: "Avatar and avatar-stack components with their decision tree and size variants",
          },
          {
            src: "/images/superapp/27-core-components-3.jpg",
            alt: "List item component with single-select and multi-select variants",
          },
        ],
      },
      {
        group: "Design",
        label: "Scaling the system in parallel",
        body: "With the foundation in place, I built out the most commonly used UI components: buttons, inputs, checkboxes, toggles, avatars, loaders and states. I focused on the high-frequency building blocks that appeared across the most screens, and raised the visual quality of each one to make the product feel more premium and trustworthy. These reusable components brought consistency to the experience while reducing both design and engineering effort across the board.",
        images: [
          {
            src: "/images/superapp/28-core-components-4.jpg",
            alt: "Marketing and intro screen templates built from the shared component library",
          },
          {
            src: "/images/superapp/29-core-components-5.jpg",
            alt: "App bar component and its scroll-collapse interaction behavior",
          },
        ],
      },
      {
        group: "Design",
        label: "Using AI to scale as a team of one",
        body: "I was the only designer on a workload that would normally require a full team. To keep up, I built a tight workflow around AI tools. I used Cursor and Claude Code to generate concepts and interfaces, Figma to refine and polish the details, and Google Flow with Gemini for image generation. The loop was continuous: generate, refine, feed improvements back in, and keep evolving. Instead of delivering static mockups, I produced interactive coded prototypes that engineers and stakeholders could actually experience, which cut alignment time and kept the team moving fast.",
        images: [
          {
            src: "/images/superapp/30-ai.jpg",
            alt: "Building with AI title slide",
          },
          {
            src: "/images/superapp/31-design-process.jpg",
            alt: "Workflow diagram showing the generate-refine loop across OpenAI, Figma, GitHub, and Vercel used to produce coded prototypes",
          },
        ],
      },
      {
        group: "Delivery",
        label: "The work I delivered",
        body: "In three months, as a team of one, I completed a full product redesign. I rebuilt the entire app around a new modular architecture. I created a completely new onboarding flow. I built the product's first design system from scratch. I refreshed the visual design to feel more premium and polished. I designed and launched three new product features. And I delivered interactive coded prototypes that helped engineering move faster and align on execution with far less back-and-forth.",
        images: [
          {
            src: "/images/superapp/32-redesign.jpg",
            alt: "After the redesign title slide",
          },
          {
            src: "/images/superapp/33-design-1.jpg",
            alt: "Redesigned onboarding screens: splash, email entry, and verification code",
          },
          {
            src: "/images/superapp/34-design-2.jpg",
            alt: "Redesigned preference selection, SuperApp home, and Bolt apps modal screens",
          },
          {
            src: "/images/superapp/35-design-3.jpg",
            alt: "Redesigned wallet detail and wallet management screens",
          },
          {
            src: "/images/superapp/36-design-4.jpg",
            alt: "Redesigned dashboard grid showing balance, banking, games, and crypto watchlist modules",
          },
          {
            src: "/images/superapp/40-work-delivered.jpg",
            alt: "Summary board of shipped deliverables: modular architecture, new onboarding flow, design system, refreshed visuals, and new features",
          },
        ],
      },
      {
        group: "Delivery",
        label: "Gamified user testing",
        body: "Once the redesign was ready, I needed real user feedback, but there was no time or budget for traditional research. So I turned testing into a game. I hid coins throughout the app, placed across different screens and features. To find them, users had to naturally explore the product, move through flows, and interact with the new experience. Each coin earned points redeemable for cashback or partner rewards. Users had fun and earned something real. We got genuine behavioral data from real users. And we quickly spotted the flows that still caused confusion, without ever asking anyone to participate in a test.",
        images: [
          {
            src: "/images/superapp/37-Validation.jpg",
            alt: "Validation title slide",
          },
          {
            src: "/images/superapp/38-gamified-testing.jpg",
            alt: "Gamified app testing screen showing a hidden coin reward layered over the banking wallet screen",
          },
        ],
      },
      {
        group: "Results",
        label: "Results",
        body: "The redesigned SuperApp launched publicly, a real market-ready product live on iOS and Android. The numbers made the case, but the bigger win was a product the team could finally grow with confidence.",
        images: [
          {
            src: "/images/superapp/39-results-intro.jpg",
            alt: "Results title slide",
          },
          {
            src: "/images/superapp/41-key-product-outcomes.jpg",
            alt: "Key product outcomes: total registrations, daily active users, App Store rating, and integrations launched after the redesign",
          },
        ],
      },
    ],
    credits: [
      { label: "Client", value: "Bolt" },
      { label: "Role", value: "Lead UX Designer" },
      { label: "Timeline", value: "3 months" },
      { label: "Team", value: "Team of one" },
      { label: "Platform", value: "iOS & Android" },
    ],
    track: "ic",
  },
  {
    index: "02",
    slug: "chameleon",
    name: "JPMorgan Chameleon design system",
    category: "Design System",
    year: "2024",
    client: "JPMorgan",
    role: "Systems Design, Component Architecture",
    description: "Building a white-label design system that adapts to every brand while remaining virtually invisible to users.",
    hero: { from: "#0d1117", via: "#161b22", to: "#21262d" },
    sections: [
      {
        label: "Overview",
        body: "Slate's product had grown fast: four designers, two squads, and a component library that had never been formally documented. Every new feature spawned new one-off patterns. Slate DS is the foundation that replaced 200+ bespoke components with a coherent, token-driven system used by the full product team.",
      },
      {
        label: "Approach",
        body: "The audit phase catalogued every component in production. We grouped by function, not appearance, which surfaced the real duplication: seventeen different button variants, nine modal patterns. From there we defined a semantic token layer: not just colour values but intent (surface-default, interactive-primary, feedback-error). Components were rebuilt in Figma and React simultaneously.",
      },
      {
        label: "Outcomes",
        body: "Design-to-dev handoff time dropped from an average of 4.5 days to under 1 day. QA defect rate on UI components fell by 61% in the first quarter post-launch. The system is now maintained by an internal guild with monthly versioning.",
      },
    ],
    credits: [
      { label: "Client", value: "JPMorgan" },
      { label: "Systems Design", value: "Studio Portfolio" },
      { label: "Engineering", value: "Slate Platform Team" },
      { label: "Year", value: "2024" },
    ],
    track: "design-systems",
  },
  {
    index: "03",
    slug: "checkout",
    name: "J.P. Morgan Chase checkout",
    category: "Product Design",
    year: "2023",
    client: "J.P. Morgan Chase",
    role: "Design Lead",
    description: "Solo-designing and shipping J.P. Morgan Chase's Checkout, Commerce Center, and Chameleon design system during a company-wide hiring freeze.",
    subtitle: "When a hiring freeze hit right after I joined, the deadlines didn't move. So I became a team of one and shipped the MVP for three products in six months.",
    hero: { from: "#0a0a0a", via: "#1a0533", to: "#2d1b69" },
    sections: [
      {
        group: "Overview",
        label: "Mission: impossible (but actually possible)",
        body: "When I joined J.P. Morgan Chase as a Design Lead, the plan was to build a design team from scratch to create the Checkout Solution. Weeks after I joined, the company announced a hiring freeze, but the deadlines didn't move. So I became a team of one, single-handedly designing and shipping the MVP for three products over the next six months: Checkout, the consumer-facing payment flow; Commerce Center, the merchant admin tool; and Chameleon, the white-label design system tying them together.",
      },
      {
        group: "Overview",
        label: "What is checkout",
        body: "Checkout is J.P. Morgan Chase's solution for merchant clients: a smooth, secure, customizable online shopping experience. Customers enter payment info once, and it's processed through J.P. Morgan's Merchant Services. For merchants, the real benefit is reduced PCI compliance overhead: Checkout integrates directly with JPMC's payment processing, so businesses don't have to build and maintain that infrastructure themselves.",
      },
      {
        group: "Goals",
        label: "Business objectives",
        body: "The team's OKRs were set around driving adoption (targeting 25% adoption across Commerce Platform clients), scaling Checkout revenue and merchant engagement, strengthening flexibility and security (including integration with J.P. Morgan's in-house fraud detection), and improving usability, accessibility, and customization, with a target of WCAG 2.2 AA compliance and 60%+ payment-method parity with competitors. Exact transaction and revenue figures are confidential.",
      },
      {
        group: "Goals",
        label: "Design objectives",
        body: "On the design side, I set OKRs that mirrored the business goals: every design decision backed by research or data, 100% adherence to experience success criteria, full design-system adoption, features delivered at least a quarter ahead of engineering, and 100% of delivered designs meeting WCAG 2.2 AA, with every risk-sensitive deliverable reviewed and approved by compliance.",
      },
      {
        group: "Process",
        label: "How we worked",
        body: "Our process was structured but adaptable: define and stress-test requirements with product, validate assumptions through internal critique or client testing, choose the right research method for the problem, hand off fully annotated specs covering edge cases and accessibility, iterate with engineering through multiple feedback rounds, and stay involved through post-launch QA. But after 15 years in design, the rule I lean on most with my team is common sense: process is a tool, not a rulebook, and knowing when to skip a step is as important as knowing the framework.",
      },
      {
        group: "Delivery",
        label: "Consumer-facing checkout",
        body: "A best-in-class checkout built for speed and conversion: clear actions, effortless form-filling, and support for multiple payment methods, accessibility, and responsive layouts, adaptable to any merchant's brand.",
      },
      {
        group: "Delivery",
        label: "Drop-in UI: embedded checkout",
        body: "The consumer checkout is also available as Drop-in UI, an embeddable form that lets merchants host their own checkout page while our secure, PCI-compliant payment form handles the sensitive parts: full control over the flow, none of the compliance burden.",
      },
      {
        group: "Delivery",
        label: "Commerce Center: merchant tool",
        body: "Commerce Center puts checkout customization in merchants' hands: brand-matched design, flexible payment method selection, security and fraud settings, and transaction reporting, all without needing engineering support.",
      },
      {
        group: "Delivery",
        label: "Chameleon: the design system",
        body: "Chameleon is the lightweight, white-label system underneath all of it: flexible enough for merchants to fully customize their UI while staying consistent, scalable, and easy to build on.",
      },
      {
        group: "Delivery",
        label: "Accessibility: built-in compliance",
        body: "Every surface was built to be fully WCAG-compliant from the start: proper color contrast, keyboard navigation, screen reader support, and clear, accessible interaction patterns. Accessibility as a default, not a retrofit.",
      },
      {
        group: "Results",
        label: "Measured outcomes",
        body: "Checkout reached a meaningful share of Commerce Platform clients, hit 100% WCAG 2.2 AA compliance across every experience, closed to 60% payment-method parity with competitors, and held a 4.3 customer satisfaction score through the year. Commerce Center shipped enhanced fraud and security controls, and the platform drove measurable direct and acquiring revenue. Exact figures are confidential.",
      },
      {
        group: "Results",
        label: "The final look",
        body: "A picture is worth a thousand words. Here's the shipped product.",
        images: [
          { src: "/images/checkout/09-gallery-1.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/10-gallery-2.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/11-gallery-3.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/12-gallery-4.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/13-gallery-5.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/14-gallery-6.webp", alt: "Checkout email notification screen" },
          { src: "/images/checkout/15-gallery-7.webp", alt: "Checkout module screen" },
          { src: "/images/checkout/16-gallery-8.webp", alt: "Checkout module screen" },
          { src: "/images/checkout/17-gallery-9.webp", alt: "Checkout module screen" },
          { src: "/images/checkout/18-gallery-10.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/19-gallery-11.webp", alt: "Chameleon design system screen" },
          { src: "/images/checkout/20-gallery-12.webp", alt: "Chameleon design system screen" },
          { src: "/images/checkout/21-gallery-13.webp", alt: "Chameleon design system screen" },
          { src: "/images/checkout/22-gallery-14.webp", alt: "Chameleon design system screen" },
          { src: "/images/checkout/23-gallery-15.webp", alt: "Commerce Center screen" },
          { src: "/images/checkout/24-gallery-16.webp", alt: "Commerce Center screen" },
        ],
      },
      {
        group: "Results",
        label: "Recognition",
        body: "Six months in, the hiring freeze lifted and I built out a team of three designers and a researcher, moving back into design strategy and mentorship. That year I was promoted to Executive Director, and the team was recognized as PXD's Best Team of the Year.",
      },
    ],
    credits: [
      { label: "Client", value: "J.P. Morgan Chase" },
      { label: "Role", value: "Design Lead" },
      { label: "Team", value: "Team of one → 3 designers, 1 researcher" },
      { label: "Recognition", value: "PXD Best Team of the Year" },
    ],
    track: "ic",
  },
  {
    index: "04",
    slug: "colors",
    name: "The science behind the color tokens",
    category: "Design System",
    year: "2023",
    client: "Affirm",
    role: "Web Design, Creative Direction",
    description: "Building a semantic color system that scales with clarity, consistency, and logic.",
    hero: { from: "#0c0c0c", via: "#1a1a1a", to: "#2a2a2a" },
    sections: [
      {
        label: "Overview",
        body: "Outline came to us needing a site that matched the quality of their work: they were producing some of the best editorial photography in London but presenting it on a template that hadn't been touched since 2019. The brief was simple: make it feel as intentional as the work itself.",
      },
      {
        label: "Approach",
        body: "The design is built around one principle: images lead, everything else follows. Type is set in a single weight: no bold, no headings in the traditional sense. The grid breaks deliberately on the project pages, letting photography bleed past the margin at specific breakpoints. Scroll transitions are slow, almost reluctant, which forces the viewer to pause.",
      },
      {
        label: "Outcomes",
        body: "New business enquiries increased by 85% in the three months post-launch. The site was featured in Awwwards SOTD and collected four CSS Design Awards. Outline has since expanded their team from three to seven people.",
      },
    ],
    credits: [
      { label: "Client", value: "Affirm" },
      { label: "Design", value: "Studio Portfolio" },
      { label: "Development", value: "Studio Portfolio" },
      { label: "Year", value: "2023" },
    ],
    track: "design-systems",
  },
  {
    index: "05",
    slug: "a11y",
    name: "Accessibility by design",
    category: "Product Design",
    year: "2022",
    client: "JPMorgan",
    role: "Product Design, UX Research",
    description: "Embedding accessibility into the design process, increasing adoption from 12% to 84%.",
    hero: { from: "#0c1a0c", via: "#0f2a0f", to: "#1a3d1a" },
    sections: [
      {
        label: "Overview",
        body: "Thread is a writing tool for teams who draft, edit, and publish in one place. The core tension in the product was between individual focus mode and collaborative review, two experiences that feel fundamentally different but had to live in the same interface without constant context-switching.",
      },
      {
        label: "Approach",
        body: "Eight weeks of research with writing teams at two media companies and a consultancy surfaced the key insight: the biggest friction wasn't the tools, it was knowing when something was ready for feedback. We designed around that by introducing a soft state model (Draft, In Review, Final) that shifts the UI's visual weight and available actions depending on where a document sits in the workflow.",
      },
      {
        label: "Outcomes",
        body: "Thread closed a $2.1M seed round six months after launching with the redesigned product. Time-to-publish for editorial teams dropped by 40%. The state model has since become the most-cited feature in user interviews and sales demos.",
      },
    ],
    credits: [
      { label: "Client", value: "JPMorgan" },
      { label: "Design & Research", value: "Studio Portfolio" },
      { label: "Founder", value: "James Park" },
      { label: "Year", value: "2022" },
    ],
    track: "design-systems",
  },
  {
    index: "06",
    slug: "roi",
    name: "Proving design system ROI",
    category: "Design System",
    year: "2024",
    client: "Affirm",
    role: "Design Systems Lead",
    description: "How we measured design system impact to earn stakeholder trust and investment.",
    hero: { from: "#0d0d0d", via: "#1c1c1c", to: "#2e2e2e" },
    sections: [
      {
        label: "Overview",
        body: "Design systems are often justified on faith rather than data. This project set out to change that by building a measurement framework that connected design system investment to outcomes stakeholders could see and trust.",
      },
      {
        label: "Approach",
        body: "We worked with engineering and product leadership to define the metrics that actually mattered: adoption rate across teams, time saved on implementation, and consistency gains across the product surface. Rather than reporting activity, like components shipped, we reported impact, like hours saved and defects avoided.",
      },
      {
        label: "Outcomes",
        body: "The resulting framework gave leadership a recurring, credible view of design system value, and became the basis for continued investment in the system going forward.",
      },
    ],
    credits: [
      { label: "Client", value: "Affirm" },
      { label: "Role", value: "Design Systems Lead" },
      { label: "Team", value: "Design Systems Team" },
      { label: "Year", value: "2024" },
    ],
    track: "design-systems",
  },
  {
    index: "07",
    slug: "real-estate-roi",
    name: "Real estate ROI calculator",
    category: "Product Design",
    year: "2026",
    client: "Personal Project",
    role: "Product Design & Development",
    description: "A calculator that turns raw property numbers into a clear return-on-investment picture for real estate investors.",
    hero: { from: "#0a1f14", via: "#123322", to: "#1e4d33" },
    sections: [
      {
        label: "Overview",
        body: "Evaluating a rental property usually means juggling a spreadsheet: purchase price, down payment, mortgage terms, rent, vacancy, taxes, and maintenance, all before you know if the deal is even worth pursuing. This project set out to replace that spreadsheet with a focused tool that turns those inputs into a clear, instant answer.",
      },
      {
        label: "Approach",
        body: "The calculator takes the core variables of a real estate deal, purchase price, financing terms, rental income, and operating expenses, and translates them into the metrics investors actually decide on: cap rate, cash-on-cash return, and long-term ROI. The interface was designed to make trade-offs visible in real time, so changing a single assumption, like down payment size or rent, immediately shows its effect on returns.",
      },
      {
        label: "Outcomes",
        body: "The result is a tool that compresses a process that used to take a spreadsheet and a calculator into a few seconds of input, making it easy to compare multiple properties side by side and move faster on decisions.",
      },
    ],
    credits: [
      { label: "Client", value: "Personal Project" },
      { label: "Role", value: "Product Design & Development" },
      { label: "Platform", value: "Web" },
      { label: "Year", value: "2026" },
    ],
    track: "side-projects",
  },
  {
    index: "10",
    slug: "analytics-dashboard-redesign",
    name: "Redesigning a cluttered analytics dashboard",
    category: "Product Design",
    year: "2022",
    client: "Vantage Analytics",
    role: "Senior Product Designer",
    description: "Simplifying a data-dense dashboard so teams could find the one metric that mattered without digging.",
    hero: { from: "#12181c", via: "#1a2328", to: "#243036" },
    sections: [
      {
        label: "Overview",
        body: "Vantage's dashboard had accumulated a chart for every stakeholder request over three years, forty-plus widgets on a single scrollable page, with no clear hierarchy between what mattered daily and what mattered once a quarter. Most users reported using only two or three of the widgets regularly, but couldn't say which ones without checking.",
      },
      {
        label: "Approach",
        body: "I ran a card-sort with the top twenty customer accounts to surface which metrics actually drove decisions, then rebuilt the dashboard around a three-tier hierarchy: a fixed summary row, a customizable mid-section for team-specific metrics, and a collapsed archive for the long tail. Nothing was deleted, just re-prioritized and made optional.",
      },
      {
        label: "Outcomes",
        body: "Average time to find a key metric dropped from just under two minutes to under fifteen seconds in follow-up testing. Support tickets tagged 'can't find X' fell by more than half in the following quarter, and the customizable mid-section became the most-used feature in the redesigned product.",
      },
    ],
    credits: [
      { label: "Client", value: "Vantage Analytics" },
      { label: "Role", value: "Senior Product Designer" },
      { label: "Platform", value: "Web" },
      { label: "Year", value: "2022" },
    ],
    track: "ic",
  },
  {
    index: "11",
    slug: "adyen-reporting-reconciliation",
    password: "adyen",
    name: "Reporting and reconciliation",
    category: "Product Design",
    year: "TBD",
    client: "Adyen",
    role: "TBD",
    description: "Transforming one of the most problematic areas of the merchant experience into a reliable place merchants keep coming back to, trust, and rely on.",
    metrics: [
      { value: "-30%", label: "Time spent/sale" },
      { value: "+5.5x", label: "Flash sales/year" },
    ],
    subtitle: "A one- or two-line subtitle that frames the problem and the outcome, giving readers context before they dive into the details below.",
    hero: { from: "#1a1a2e", via: "#16213e", to: "#0f3460" },
    sections: [
      {
        label: "Overview",
        body: "Placeholder body copy standing in for this project's background, to be replaced with the real context once the details are available.",
      },
      {
        label: "Approach",
        body: "Placeholder copy describing the approach taken on this project, to be replaced with the real process, research, and design decisions.",
      },
      {
        label: "Outcomes",
        body: "Placeholder outcomes copy, metrics, launch details, or qualitative impact will go here once the real project details are added.",
      },
    ],
    credits: [
      { label: "Client", value: "Adyen" },
      { label: "Role", value: "TBD" },
      { label: "Year", value: "TBD" },
    ],
    track: "management",
  },
  {
    index: "12",
    slug: "superapp-md",
    name: "SuperApp",
    category: "Product Design",
    year: "2026",
    client: "Bolt",
    role: "Lead UX Designer",
    description: "A complete redesign of Bolt's SuperApp, from information architecture to a scalable design system.",
    subtitle: "Turning a chaotic proof of concept into a real product foundation. Something investors could trust. Something users could understand. Something the company could actually grow.",
    hero: { from: "#1a1a2e", via: "#16213e", to: "#0f3460" },
    heroImage: "/images/superapp/00-hero-framed.png",
    heroFramed: true,
    heroImageWidth: 1800,
    heroImageHeight: 1012,
    sections: [
      {
        group: "Overview",
        label: "About Bolt",
        body: "Bolt is a fintech company that built its reputation on a single, successful product: Checkout. It was focused, effective, and it worked. But at some point, the CEO set his sights on something much bigger.",
        images: [
          {
            src: "/images/superapp/02-about-bolt-framed.png",
            alt: "Bolt's Checkout marketing website homepage, headlined 'The world's most intelligent checkout'",
            framed: true,
          },
        ],
      },
      {
        group: "Overview",
        label: "CEO's new toy: SuperApp",
        body: "The vision was bold. One app for everything. Banking, crypto, shopping, investing, insurance, games, all living under one roof. The strategy was simple and unapologetically aggressive: pack the app with as many features as possible, launch fast, and see what sticks. The goal wasn't just to build a product people loved. It was to show investors that the team could execute at scale.",
        images: [
          {
            src: "/images/superapp/03-superapp-vision.webp",
            alt: "Concept slide reading 'One SuperApp to rule them all', with icons for sending money, rewards, crypto, and investing orbiting a stick figure",
          },
        ],
      },
      {
        group: "Overview",
        label: "Business context",
        body: "The engineering team had pulled it off, technically. A working app existed. But it had been assembled quickly and without much structure, with features added through multiple integrations, scattered across the product in a chaotic way. When the company began preparing to present to investors, it became clear the app wasn't ready. Not even close.",
        images: [
          {
            src: "/images/superapp/04-business-context-framed.png",
            alt: "Four screens from the early app's rewards flow, captioned 'Built by engineers. No designers involved'",
            framed: true,
            width: 1800,
            height: 1012,
          },
        ],
      },
      {
        group: "The problem",
        label: "Core issues",
        body: "Several things were actively holding the product back. Navigation was confusing and users didn't know where to tap, where to go, or how to move through the app. The information architecture was fragmented, with features piled on without a clear structure. Onboarding was broken and people installed the app only to immediately feel lost, leading to low engagement and poor retention. The visual design, built entirely by engineers, lacked consistency, polish, and any kind of system behind it.",
        images: [
          {
            src: "/images/superapp/investor-quote-framed.png",
            alt: "Slide quoting a potential investor: 'The app looks like something high school students threw together over a weekend'",
            framed: true,
            width: 1800,
            height: 1012,
          },
          {
            src: "/images/superapp/05-core-issues-framed.png",
            alt: "Slide listing six main design challenges: weak information architecture, poor onboarding, confusing navigation, inconsistent visual design, lack of user trust, and accessibility risks",
            framed: true,
            width: 1800,
            height: 1012,
          },
        ],
      },
      {
        group: "The problem",
        label: "My role",
        body: "That's when the company brought in a seasoned UX designer, me. My job was to bring order to the product, improve usability and visual quality, and transform a scattered collection of features into a coherent app experience. The biggest constraint: I had three months to make it happen.",
        images: [
          {
            src: "/images/superapp/06-my-role-framed.png",
            alt: "Slide titled 'The \"fun\" part' noting the biggest constraint was time: only 3 months to deliver meaningful change, illustrated with a stressed stick figure beside a fast-moving stopwatch",
            framed: true,
            width: 1800,
            height: 1012,
          },
        ],
      },
      {
        group: "Goals",
        label: "Design goals",
        body: "The work had to serve both the product and the business at the same time. On the product side: rebuild the information architecture, introduce a proper design system, fix onboarding, and raise the overall quality across usability, accessibility, and trust. On the business side: help the company reach 2M+ registrations, grow to 1,000+ monthly active users, launch three new features, hit 60% feature parity with competitors like PayPal, Revolut, and Wise, and achieve a 4.5+ app store rating.",
        images: [
          {
            src: "/images/superapp/07-design-goals.webp",
            alt: "Project goals slide organized in three columns: Business (raise funding), Product (user growth, active users, new features, app ratings), and Design (information architecture, visual design, onboarding, product quality)",
          },
        ],
      },
      {
        group: "Goals",
        label: "Mission",
        body: "Turn a chaotic proof of concept into a real product foundation. Something investors could trust. Something users could understand. Something the company could actually grow.",
        images: [
          {
            src: "/images/superapp/08-mission.webp",
            alt: "Mission slide reading 'Turn a chaotic proof of concept into a real product,' next to an illustration of a caped stick figure surrounded by app feature icons",
          },
        ],
      },
      {
        group: "Discovery",
        label: "Customer support insights",
        body: "I started with the people closest to the users: customer support. I booked time with support reps and asked them to walk me through the most common complaints, repeated questions, and confusing moments they heard every day. It gave me a fast, unfiltered view of where the product was genuinely failing real customers, before I had ever opened the app myself.",
        images: [
          {
            src: "/images/superapp/09-customer-support-insights.webp",
            alt: "Illustration of a stick figure holding a magnifying glass among research icons (bar chart, pie chart, checklist, and chat bubble), symbolizing the discovery phase",
          },
        ],
      },
      {
        group: "Discovery",
        label: "Product audit",
        body: "Next, I became the user. I installed the app, went through every flow, tested every feature one by one, and documented every usability issue I could find. This gave me a first-time user's perspective and helped me see exactly where the friction was, not just in theory, but in practice.",
        images: [
          {
            src: "/images/superapp/10-product-audit-map.webp",
            alt: "Figma canvas mapping the full product audit, with dozens of connected app screens across finance and card categories, each flagged with red 'needs improvement' notes",
          },
          {
            src: "/images/superapp/11-product-audit-annotations.webp",
            alt: "Close-up of an audited withdrawal screen with red 'needs improvement' callouts on button placement and account labeling, next to a grid of additional flagged card and P2P screens",
          },
        ],
      },
      {
        group: "Discovery",
        label: "Data insights",
        body: "To balance what people were saying with what was actually happening, I set up access to product analytics through DataDog. I looked at total users and registrations, iOS vs Android split, registration and KYC completion rates, the most used features, and where users were dropping off. Facts, not assumptions.",
        images: [
          {
            src: "/images/superapp/12-data-insights.webp",
            alt: "Analytics dashboard showing SuperApp performance data: total sign-ups, KYC completion, debit card volume, crypto trading activity, and user engagement over time",
          },
        ],
      },
      {
        group: "Discovery",
        label: "Competitive review",
        body: "Finally, I looked outside the company. I signed up for PayPal, Revolut, Wise, Robinhood, and Coinbase and studied how each of them handled onboarding, navigation, transfers, investing, crypto, and trust building. This helped me understand what users already expected from products like this, and where our most obvious gaps were.",
        images: [
          {
            src: "/images/superapp/13-competitive-review.webp",
            alt: "Competitive review slide describing the analysis of PayPal, Revolut, Wise, Robinhood, and Coinbase, alongside real screenshots of crypto, transfer, wallet, and travel-booking screens studied during the review",
          },
        ],
      },
      {
        group: "Design",
        label: "Rebuilding the information architecture",
        body: "After reviewing all the research, one thing was clear: the app needed a completely new structure. Everything had been built around a single home screen, a grid of feature buttons sitting under a balance total. There were no quick actions, no personalization, no clear next step. Every new feature just added more clutter. Users landed there and immediately felt lost. And as a model, it wasn't scalable. It would only get worse over time.",
        images: [
          {
            src: "/images/superapp/15-rebuilding-ia.jpg",
            alt: "Old information architecture diagram showing every feature flattened into a single grid under the home screen's balance total",
          },
          {
            src: "/images/superapp/17-dashboard-ia.jpg",
            alt: "New dashboard information architecture with a customizable widget layout and an app-switcher for independent mini-apps",
          },
          {
            src: "/images/superapp/18-dashboard-modules.jpg",
            alt: "Dashboard module breakdown showing the mini-app tiles and banking module arranged in the new structure",
          },
        ],
      },
      {
        group: "Design",
        label: "Early concept prototype",
        body: "I moved quickly. Based on the research, I designed an early concept built around a modular system: a customizable dashboard supported by independent mini-apps. The dashboard gave each user a personalized home screen with shortcuts to what they used most. The mini-apps, banking, crypto, transfers, shopping, order tracking, each lived as their own self-contained product area. One shared account identity tied everything together across the ecosystem.",
        images: [
          {
            src: "/images/superapp/16-initial-draft-concept.jpg",
            alt: "Early concept mockup of the modular dashboard with customizable shortcuts and independent mini-apps for banking, crypto, and shopping",
          },
        ],
      },
      {
        group: "Design",
        label: "Fixing the onboarding funnel",
        body: "The data told a brutal story. Of everyone who registered, only 7% started or completed KYC. Only 2% were approved. Just 0.3% created a bank account. The biggest drop-off was happening before users ever experienced anything. The app had started as a banking product, so everyone had to complete full identity verification before they could do anything at all, even browse. That made sense for a bank. It made no sense for a SuperApp.",
        images: [
          {
            src: "/images/superapp/19-onboarding.jpg",
            alt: "Onboarding overview slide introducing the funnel problem",
          },
          {
            src: "/images/superapp/20-original-onboarding.jpg",
            alt: "Grid of the original onboarding screens users had to complete before accessing anything in the app",
          },
          {
            src: "/images/superapp/21-onboarding-funnel-data.jpg",
            alt: "Onboarding funnel chart showing the drop-off from registration through KYC start, approval, and bank account creation",
          },
        ],
      },
      {
        group: "Design",
        label: "Rebuilding onboarding for growth",
        body: "I redesigned the onboarding so users could enter the app immediately and start using features that didn't require any identity verification, like shopping, order tracking, and browsing the ecosystem. KYC was moved to the moment of need, triggered only when a user wanted to do something that genuinely required it: crypto, investing, P2P transfers, banking. This reduced friction, improved the first-time experience, and gave users a reason to stay before asking them to trust us with sensitive information.",
        images: [
          {
            src: "/images/superapp/22-simplified-onboarding.jpg",
            alt: "Redesigned onboarding flow showing simplified registration, OTP, and app-selection screens with KYC deferred until needed",
          },
        ],
      },
      {
        group: "Design",
        label: "Creating the core components",
        body: "One of the biggest underlying problems was visual inconsistency. The app had been built without any design system, with styles hard-coded, components duplicated, and theming nearly impossible. I started by building the foundation layer from scratch: color tokens, typography, spacing, corner radius rules, and an icon library. This became the shared language for everything that followed.",
        images: [
          {
            src: "/images/superapp/23-design-system.jpg",
            alt: "Design system overview slide",
          },
          {
            src: "/images/superapp/24-foundation.jpg",
            alt: "Design token foundation showing color, spacing, and text-size variable collections across dark, light, and debug themes",
          },
          {
            src: "/images/superapp/25-core-components-1.jpg",
            alt: "Button and icon-button component variants across filled, muted, and text styles",
          },
          {
            src: "/images/superapp/26-core-components-2.jpg",
            alt: "Avatar and avatar-stack components with their decision tree and size variants",
          },
          {
            src: "/images/superapp/27-core-components-3.jpg",
            alt: "List item component with single-select and multi-select variants",
          },
        ],
      },
      {
        group: "Design",
        label: "Scaling the system in parallel",
        body: "With the foundation in place, I built out the most commonly used UI components: buttons, inputs, checkboxes, toggles, avatars, loaders and states. I focused on the high-frequency building blocks that appeared across the most screens, and raised the visual quality of each one to make the product feel more premium and trustworthy. These reusable components brought consistency to the experience while reducing both design and engineering effort across the board.",
        images: [
          {
            src: "/images/superapp/28-core-components-4.jpg",
            alt: "Marketing and intro screen templates built from the shared component library",
          },
          {
            src: "/images/superapp/29-core-components-5.jpg",
            alt: "App bar component and its scroll-collapse interaction behavior",
          },
        ],
      },
      {
        group: "Design",
        label: "Using AI to scale as a team of one",
        body: "I was the only designer on a workload that would normally require a full team. To keep up, I built a tight workflow around AI tools. I used Cursor and Claude Code to generate concepts and interfaces, Figma to refine and polish the details, and Google Flow with Gemini for image generation. The loop was continuous: generate, refine, feed improvements back in, and keep evolving. Instead of delivering static mockups, I produced interactive coded prototypes that engineers and stakeholders could actually experience, which cut alignment time and kept the team moving fast.",
        images: [
          {
            src: "/images/superapp/30-ai.jpg",
            alt: "Building with AI title slide",
          },
          {
            src: "/images/superapp/31-design-process.jpg",
            alt: "Workflow diagram showing the generate-refine loop across OpenAI, Figma, GitHub, and Vercel used to produce coded prototypes",
          },
        ],
      },
      {
        group: "Delivery",
        label: "The work I delivered",
        body: "In three months, as a team of one, I completed a full product redesign. I rebuilt the entire app around a new modular architecture. I created a completely new onboarding flow. I built the product's first design system from scratch. I refreshed the visual design to feel more premium and polished. I designed and launched three new product features. And I delivered interactive coded prototypes that helped engineering move faster and align on execution with far less back-and-forth.",
        images: [
          {
            src: "/images/superapp/32-redesign.jpg",
            alt: "After the redesign title slide",
          },
          {
            src: "/images/superapp/33-design-1.jpg",
            alt: "Redesigned onboarding screens: splash, email entry, and verification code",
          },
          {
            src: "/images/superapp/34-design-2.jpg",
            alt: "Redesigned preference selection, SuperApp home, and Bolt apps modal screens",
          },
          {
            src: "/images/superapp/35-design-3.jpg",
            alt: "Redesigned wallet detail and wallet management screens",
          },
          {
            src: "/images/superapp/36-design-4.jpg",
            alt: "Redesigned dashboard grid showing balance, banking, games, and crypto watchlist modules",
          },
          {
            src: "/images/superapp/40-work-delivered.jpg",
            alt: "Summary board of shipped deliverables: modular architecture, new onboarding flow, design system, refreshed visuals, and new features",
          },
        ],
      },
      {
        group: "Delivery",
        label: "Gamified user testing",
        body: "Once the redesign was ready, I needed real user feedback, but there was no time or budget for traditional research. So I turned testing into a game. I hid coins throughout the app, placed across different screens and features. To find them, users had to naturally explore the product, move through flows, and interact with the new experience. Each coin earned points redeemable for cashback or partner rewards. Users had fun and earned something real. We got genuine behavioral data from real users. And we quickly spotted the flows that still caused confusion, without ever asking anyone to participate in a test.",
        images: [
          {
            src: "/images/superapp/37-Validation.jpg",
            alt: "Validation title slide",
          },
          {
            src: "/images/superapp/38-gamified-testing.jpg",
            alt: "Gamified app testing screen showing a hidden coin reward layered over the banking wallet screen",
          },
        ],
      },
      {
        group: "Results",
        label: "Results",
        body: "The redesigned SuperApp launched publicly, a real market-ready product live on iOS and Android. The numbers made the case, but the bigger win was a product the team could finally grow with confidence.",
        images: [
          {
            src: "/images/superapp/39-results-intro.jpg",
            alt: "Results title slide",
          },
          {
            src: "/images/superapp/41-key-product-outcomes.jpg",
            alt: "Key product outcomes: total registrations, daily active users, App Store rating, and integrations launched after the redesign",
          },
        ],
      },
    ],
    credits: [
      { label: "Client", value: "Bolt" },
      { label: "Role", value: "Lead UX Designer" },
      { label: "Timeline", value: "3 months" },
      { label: "Team", value: "Team of one" },
      { label: "Platform", value: "iOS & Android" },
    ],
    track: "management",
  },
  {
    index: "13",
    slug: "checkout-md",
    name: "Checkout",
    category: "Product Design",
    year: "2023",
    client: "J.P. Morgan Chase",
    role: "Design Lead",
    description: "Solo-designing and shipping J.P. Morgan Chase's Checkout, Commerce Center, and Chameleon design system during a company-wide hiring freeze.",
    subtitle: "When a hiring freeze hit right after I joined, the deadlines didn't move. So I became a team of one and shipped the MVP for three products in six months.",
    hero: { from: "#0a0a0a", via: "#1a0533", to: "#2d1b69" },
    sections: [
      {
        group: "Overview",
        label: "Mission: impossible (but actually possible)",
        body: "When I joined J.P. Morgan Chase as a Design Lead, the plan was to build a design team from scratch to create the Checkout Solution. Weeks after I joined, the company announced a hiring freeze, but the deadlines didn't move. So I became a team of one, single-handedly designing and shipping the MVP for three products over the next six months: Checkout, the consumer-facing payment flow; Commerce Center, the merchant admin tool; and Chameleon, the white-label design system tying them together.",
      },
      {
        group: "Overview",
        label: "What is checkout",
        body: "Checkout is J.P. Morgan Chase's solution for merchant clients: a smooth, secure, customizable online shopping experience. Customers enter payment info once, and it's processed through J.P. Morgan's Merchant Services. For merchants, the real benefit is reduced PCI compliance overhead: Checkout integrates directly with JPMC's payment processing, so businesses don't have to build and maintain that infrastructure themselves.",
      },
      {
        group: "Goals",
        label: "Business objectives",
        body: "The team's OKRs were set around driving adoption (targeting 25% adoption across Commerce Platform clients), scaling Checkout revenue and merchant engagement, strengthening flexibility and security (including integration with J.P. Morgan's in-house fraud detection), and improving usability, accessibility, and customization, with a target of WCAG 2.2 AA compliance and 60%+ payment-method parity with competitors. Exact transaction and revenue figures are confidential.",
      },
      {
        group: "Goals",
        label: "Design objectives",
        body: "On the design side, I set OKRs that mirrored the business goals: every design decision backed by research or data, 100% adherence to experience success criteria, full design-system adoption, features delivered at least a quarter ahead of engineering, and 100% of delivered designs meeting WCAG 2.2 AA, with every risk-sensitive deliverable reviewed and approved by compliance.",
      },
      {
        group: "Process",
        label: "How we worked",
        body: "Our process was structured but adaptable: define and stress-test requirements with product, validate assumptions through internal critique or client testing, choose the right research method for the problem, hand off fully annotated specs covering edge cases and accessibility, iterate with engineering through multiple feedback rounds, and stay involved through post-launch QA. But after 15 years in design, the rule I lean on most with my team is common sense: process is a tool, not a rulebook, and knowing when to skip a step is as important as knowing the framework.",
      },
      {
        group: "Delivery",
        label: "Consumer-facing checkout",
        body: "A best-in-class checkout built for speed and conversion: clear actions, effortless form-filling, and support for multiple payment methods, accessibility, and responsive layouts, adaptable to any merchant's brand.",
      },
      {
        group: "Delivery",
        label: "Drop-in UI: embedded checkout",
        body: "The consumer checkout is also available as Drop-in UI, an embeddable form that lets merchants host their own checkout page while our secure, PCI-compliant payment form handles the sensitive parts: full control over the flow, none of the compliance burden.",
      },
      {
        group: "Delivery",
        label: "Commerce Center: merchant tool",
        body: "Commerce Center puts checkout customization in merchants' hands: brand-matched design, flexible payment method selection, security and fraud settings, and transaction reporting, all without needing engineering support.",
      },
      {
        group: "Delivery",
        label: "Chameleon: the design system",
        body: "Chameleon is the lightweight, white-label system underneath all of it: flexible enough for merchants to fully customize their UI while staying consistent, scalable, and easy to build on.",
      },
      {
        group: "Delivery",
        label: "Accessibility: built-in compliance",
        body: "Every surface was built to be fully WCAG-compliant from the start: proper color contrast, keyboard navigation, screen reader support, and clear, accessible interaction patterns. Accessibility as a default, not a retrofit.",
      },
      {
        group: "Results",
        label: "Measured outcomes",
        body: "Checkout reached a meaningful share of Commerce Platform clients, hit 100% WCAG 2.2 AA compliance across every experience, closed to 60% payment-method parity with competitors, and held a 4.3 customer satisfaction score through the year. Commerce Center shipped enhanced fraud and security controls, and the platform drove measurable direct and acquiring revenue. Exact figures are confidential.",
      },
      {
        group: "Results",
        label: "The final look",
        body: "A picture is worth a thousand words. Here's the shipped product.",
        images: [
          { src: "/images/checkout/09-gallery-1.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/10-gallery-2.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/11-gallery-3.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/12-gallery-4.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/13-gallery-5.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/14-gallery-6.webp", alt: "Checkout email notification screen" },
          { src: "/images/checkout/15-gallery-7.webp", alt: "Checkout module screen" },
          { src: "/images/checkout/16-gallery-8.webp", alt: "Checkout module screen" },
          { src: "/images/checkout/17-gallery-9.webp", alt: "Checkout module screen" },
          { src: "/images/checkout/18-gallery-10.webp", alt: "Checkout product screen" },
          { src: "/images/checkout/19-gallery-11.webp", alt: "Chameleon design system screen" },
          { src: "/images/checkout/20-gallery-12.webp", alt: "Chameleon design system screen" },
          { src: "/images/checkout/21-gallery-13.webp", alt: "Chameleon design system screen" },
          { src: "/images/checkout/22-gallery-14.webp", alt: "Chameleon design system screen" },
          { src: "/images/checkout/23-gallery-15.webp", alt: "Commerce Center screen" },
          { src: "/images/checkout/24-gallery-16.webp", alt: "Commerce Center screen" },
        ],
      },
      {
        group: "Results",
        label: "Recognition",
        body: "Six months in, the hiring freeze lifted and I built out a team of three designers and a researcher, moving back into design strategy and mentorship. That year I was promoted to Executive Director, and the team was recognized as PXD's Best Team of the Year.",
      },
    ],
    credits: [
      { label: "Client", value: "J.P. Morgan Chase" },
      { label: "Role", value: "Design Lead" },
      { label: "Team", value: "Team of one → 3 designers, 1 researcher" },
      { label: "Recognition", value: "PXD Best Team of the Year" },
    ],
    track: "management",
  },
];
