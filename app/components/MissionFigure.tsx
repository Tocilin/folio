import { BulletList, FigureBlock, Statement } from "@/app/components/PageBlocks";

// The mission, as a page block: the caped stick figure at the left, and to its right the mission statement (the
// same style as the investor quote, without quotation marks or a source) with the three things it should be as a bullet list underneath.
export function MissionFigure() {
  return (
    <FigureBlock figure="/images/superapp/stickman-hero.svg" above="md:mt-0" below="md:mb-4" figureTop="md:top-[82px]">
      <div className="flex flex-col gap-4">
        <Statement>Turn a chaotic proof of concept into a real product foundation.</Statement>
        <BulletList items={["Something investors could trust.", "Something users could understand.", "Something the company could actually grow."]} />
      </div>
    </FigureBlock>
  );
}
