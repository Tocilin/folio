import type { WorkTrack } from "@/lib/projects";

export type SiteConfig = {
  track: WorkTrack;
  label: string;
  abbr: string;
  domain: string;
  heroWords: [string, string, string];
  subtitle: string;
  resumeHref: string;
};

export const DEFAULT_TRACK: WorkTrack = "management";

export const siteConfigs: Record<WorkTrack, SiteConfig> = {
  management: {
    track: "management",
    label: "Management",
    abbr: "MD",
    domain: "https://tochilin.me",
    heroWords: ["Product.", "Design.", "Strategy."],
    subtitle: "Solving real business problems through design strategy, planning, and tactical execution.",
    resumeHref: "/resume",
  },
  ic: {
    track: "ic",
    label: "Individual contributor",
    abbr: "IC",
    domain: "https://ic.tochilin.me",
    heroWords: ["Craft.", "Depth.", "Impact."],
    subtitle: "Practicing product design at the staff level: deep craft, sharp systems thinking, and work that ships.",
    resumeHref: "/resume",
  },
  "design-systems": {
    track: "design-systems",
    label: "Design systems",
    abbr: "DS",
    domain: "https://ds.tochilin.me",
    heroWords: ["Systems.", "Scale.", "Consistency."],
    subtitle: "Building design systems that keep fast-growing teams consistent, efficient, and shipping with confidence.",
    resumeHref: "/resume",
  },
  "side-projects": {
    track: "side-projects",
    label: "Side projects",
    abbr: "LAB",
    domain: "https://labs.tochilin.me",
    heroWords: ["Ideas.", "Prototypes.", "Play."],
    subtitle: "A running list of personal projects: things I designed and built just to see if I could.",
    resumeHref: "/resume",
  },
};
