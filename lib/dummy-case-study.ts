import type { Project } from "@/lib/projects";

export const dummyCaseStudy: Project = {
  index: "00",
  slug: "template-preview",
  name: "Example case study title",
  responsibilities: "Research, Product Design, Prototyping",
  client: "Acme Corp",
  role: "Product Designer",
  description: "A short summary of the project used to preview this layout template.",
  subtitle: "A one- or two-line subtitle that frames the problem and the outcome, giving readers context before they dive into the details below.",
  hero: { from: "#1a1a2e", via: "#16213e", to: "#0f3460" },
  heroImage: "/images/placeholder.png",
  sections: [
    {
      group: "Background",
      label: "Overview",
      body: "This is placeholder body copy standing in for the project's background. It exists purely to show how a paragraph of this length wraps and spaces within the layout, so you can judge the template on real proportions rather than imagining them.",
      images: [{ src: "/images/placeholder.png", alt: "Placeholder image" }],
    },
    {
      group: "Background",
      label: "Context",
      body: "A second placeholder paragraph, still under the same group heading, to demonstrate how multiple sections stack beneath one anchor in the table of contents.",
    },
    {
      group: "Approach",
      label: "Research",
      body: "Dummy text describing a research phase: interviews, audits, competitive analysis, whatever fits the real project once this template is applied.",
      images: [
        { src: "/images/placeholder.png", alt: "Placeholder image" },
        { src: "/images/placeholder.png", alt: "Placeholder image" },
      ],
    },
    {
      group: "Approach",
      label: "Design",
      body: "More placeholder copy covering the design phase, so the template can be judged with a realistic amount of text and imagery in place.",
    },
    {
      group: "Outcomes",
      label: "Results",
      body: "Placeholder results copy: metrics, launch details, or qualitative impact would go here in a real case study.",
      images: [{ src: "/images/placeholder.png", alt: "Placeholder image" }],
    },
  ],
  track: "ic",
};
