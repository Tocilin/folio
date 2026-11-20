import { InteractiveCard } from "@/app/components/InteractiveCard";
import { CardText, CardTitle, Heading, Label } from "@/app/components/PageBlocks";

// The "Project goals" slide as blocks, in layers: Business on top, then Product, then Design. Each layer has its
// number and title, with its goals as a row of cards underneath (they wrap on narrow screens).

const COLUMNS: { n: string; title: string; goals: [string, string][] }[] = [
  {
    n: "01",
    title: "Business",
    goals: [["Raise funding", "Demonstrate strong market potential, product momentum, and the team’s ability to execute quickly."]],
  },
  {
    n: "02",
    title: "Product",
    goals: [
      ["User growth", "Reach 2M+ total signups."],
      ["Active users", "Grow to 1,000+ monthly active users."],
      ["New features", "Launch 3 additional features: P2P transfers, stock investing, and crypto."],
      ["App ratings", "Achieve a 4.5+ rating in the App Store and Google Play."],
    ],
  },
  {
    n: "03",
    title: "Design",
    goals: [
      ["Information architecture", "Create a clear, scalable product structure."],
      ["Visual design", "Introduce a consistent, mature design system."],
      ["Onboarding", "Help new users quickly understand the product and find value."],
      ["Product quality", "Raise usability, accessibility, clarity, and trust."],
    ],
  },
];

export function ProjectGoals() {
  return (
    <div className="mt-2 flex flex-col gap-12">
      {COLUMNS.map((layer) => (
        <section key={layer.n} className="flex flex-col gap-4">
          <header className="flex flex-col gap-2">
            <Label>{layer.n}</Label>
            <Heading>{layer.title}</Heading>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {layer.goals.map(([title, text]) => (
              <InteractiveCard key={title} className={`gap-2 ${layer.goals.length === 1 ? "sm:col-span-2 lg:col-span-4" : ""}`}>
                <CardTitle>{title}</CardTitle>
                <CardText>{text}</CardText>
              </InteractiveCard>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
