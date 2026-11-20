import { Quote } from "@/app/components/PageBlocks";

// The investor quote, as a page block (see PageBlocks): the quote, its source, and the stick figure.
export function InvestorQuote() {
  return <Quote quote="“The app looks like something high school students threw together over a weekend.”" source="~ Potential investor" figure="/images/superapp/stickman-push.svg" />;
}
