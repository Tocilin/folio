import type { WorkTrack } from "@/lib/projects";

export type SiteConfig = {
  track: WorkTrack;
  label: string;
  abbr: string;
  domain: string;
  heroWords: [string, string, string];
  subtitle: string;
  about: string[];
  resumeHref: string;
};

export const DEFAULT_TRACK: WorkTrack = "management";

const defaultAbout = [
  "Independent designer and developer focused on product, brand, design systems, and AI-driven experiences. Built for startups and larger companies across Europe and the US. I care about creating thoughtful work that drives impact, solves real problems, and delivers strong outcomes through a systematic approach to building products.",
];

export const siteConfigs: Record<WorkTrack, SiteConfig> = {
  management: {
    track: "management",
    label: "Management",
    abbr: "MD",
    domain: "https://tochilin.me",
    heroWords: ["Product.", "Design.", "Strategy."],
    subtitle: "Solving real business problems through design strategy, planning, and tactical execution.",
    about: [
      "I'm a design leader who likes messy problems, unclear paths, and figuring out what the hell we should actually build.",
      "I've led teams and helped shape product and design strategy, turning big business goals into something teams can understand, act on, and ship. A lot of my work happens before there's an obvious solution: asking the right questions, connecting the dots, challenging assumptions, setting direction, and getting product, design, and engineering moving toward the same goal.",
      "I care about building strong teams, giving designers enough context and ownership to do their best work, and keeping design connected to the business. Less design theater, more clarity, good decisions, and products that actually make a difference.",
    ],
    resumeHref: "/resume",
  },
  ic: {
    track: "ic",
    label: "Individual contributor",
    abbr: "IC",
    domain: "https://ic.tochilin.me",
    heroWords: ["Craft.", "Depth.", "Impact."],
    subtitle: "Practicing product design at the staff level: deep craft, sharp systems thinking, and work that ships.",
    about: [
      "I'm a product designer and builder. Basically, I like both figuring out what we should build and actually building the thing.",
      "I love taking messy, complex problems and turning them into products that feel simple and obvious. I obsess over pixels, interactions, flows, edge cases, and all those tiny details most people will never notice, but definitely feel when they're wrong.",
      "And I don't like stopping at design. I prototype, experiment, and build with code, which lets me push ideas further and get closer to the actual product. For me, great product design is equal parts thinking, making, testing, and obsessing over the details until everything clicks.",
    ],
    resumeHref: "/resume",
  },
  "design-systems": {
    track: "design-systems",
    label: "Design systems",
    abbr: "DS",
    domain: "https://ds.tochilin.me",
    heroWords: ["Systems.", "Scale.", "Consistency."],
    subtitle: "Building design systems that keep fast-growing teams consistent, efficient, and shipping with confidence.",
    about: [
      "I'm obsessed with design systems. I naturally think in systems, patterns, and reusable building blocks rather than one-off solutions.",
      "I build systems that help designers and engineers move faster, make products more consistent, and bake accessibility into the foundation instead of treating it as an afterthought. I care about everything from the big-picture architecture and governance to components, patterns, documentation, and the tiny details that make a system actually work.",
      "And I don't stop at designing the system. I build with code, collaborate closely with engineers, and ship. To me, a great design system isn't a library of components. It's infrastructure that helps teams build better products, faster.",
    ],
    resumeHref: "/resume",
  },
  "side-projects": {
    track: "side-projects",
    label: "Side projects",
    abbr: "LAB",
    domain: "https://labs.tochilin.me",
    heroWords: ["Ideas.", "Prototypes.", "Play."],
    subtitle: "A running list of personal projects: things I designed and built just to see if I could.",
    about: defaultAbout,
    resumeHref: "/resume",
  },
};
