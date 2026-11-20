import { InteractiveCard } from "@/app/components/InteractiveCard";
import { CardText, CardTitle, Label } from "@/app/components/PageBlocks";

// The "Main design challenges" slide as individual cards, in the same card style as the objectives and results.
// The number is small, in the same style as the section labels ("Core issues").

const ITEMS = [
  { n: "01", title: "Weak information architecture", body: "Features had been added rapidly without a clear structure, making the product feel fragmented and difficult to understand." },
  { n: "02", title: "Poor onboarding", body: "Early data showed that users were installing the app but often did not know what to do once inside, leading to low engagement and weak retention." },
  { n: "03", title: "Confusing navigation", body: "Users struggled to understand where to tap, where to go, or how to move through the app." },
  { n: "04", title: "Inconsistent visual design", body: "Because the product was built entirely by engineers, the interface lacked polish, consistency, and any supporting design system." },
  { n: "05", title: "Lack of user trust", body: "The visual design felt unpolished and inconsistent, making the product appear unreliable and reducing user confidence in a fintech experience." },
  { n: "06", title: "Accessibility risks", body: "The product lacked proper accessibility standards and inclusive design practices, creating usability barriers and potential legal and compliance risks." },
];

export function DesignChallenges() {
  return (
    <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ITEMS.map((c) => (
        <InteractiveCard key={c.n} className="gap-3">
          <Label className="relative">{c.n}</Label>
          <CardTitle>{c.title}</CardTitle>
          <CardText>{c.body}</CardText>
        </InteractiveCard>
      ))}
    </div>
  );
}
