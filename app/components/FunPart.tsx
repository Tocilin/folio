import { Callout } from "@/app/components/PageBlocks";

// The 'The "fun" part' slide, as a page block (see PageBlocks): a title, a short paragraph, and the stick figure.
export function FunPart() {
  return (
    <Callout title="The “fun” part" figure="/images/superapp/stickman-stress.svg">
      The biggest constraint was time: I had only 3 months to deliver meaningful change.
    </Callout>
  );
}
