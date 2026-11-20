import type { ReactNode } from "react";

// The page's building blocks, like blocks in Notion. Everything that sits on the PAGE (not inside a canvas) is made
// from these, so text, colours, sizes and spacing are the same across the whole site and come from the design
// system (the type scale and the fg-* / stroke tokens in globals.css). Inside a canvas anything goes; on the page,
// use a block, and if a block is missing, add it here (from the existing scale) instead of styling it inline.
//
// The scale, from the design system:
//   Label     12px  uppercase, tracked    fg-tertiary   section labels, meta, card numbers
//   Caption   12px                        fg-tertiary   under canvases and images
//   Body      18px  relaxed, 560px wide   fg-secondary  paragraphs under a section label (BulletList: same style)
//   Heading   24px  semibold, tight       fg-primary    block titles
//   Card title 18px semibold, tight       fg-primary    titles inside cards
//   Card text 14px  relaxed               fg-tertiary   text inside cards
//   Quote     H2 style (24px, semibold, tight)    fg-primary    pull quotes
//
// (Headings that are already in CaseStudyView, the page title and the closing line, use their own steps of the
// same scale and are not repeated here.)

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs text-fg-tertiary uppercase tracking-widest ${className}`}>{children}</p>;
}

export function Caption({ children }: { children: ReactNode }) {
  return <p className="text-xs text-fg-tertiary">{children}</p>;
}

export function Body({ children }: { children: ReactNode }) {
  return <p className="text-fg-secondary text-lg leading-relaxed max-w-[560px]">{children}</p>;
}

// a bullet list, in the body text style
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 list-disc pl-5 text-fg-secondary text-lg leading-relaxed max-w-[560px] marker:text-fg-tertiary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return <h3 className="m-0 text-2xl font-semibold tracking-tight text-fg-primary">{children}</h3>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <p className="relative text-lg font-semibold tracking-tight text-fg-primary">{children}</p>;
}

export function CardText({ children }: { children: ReactNode }) {
  return <p className="relative text-sm text-fg-tertiary leading-relaxed">{children}</p>;
}

// a line drawing (an SVG) shown in the page's text colour, so it follows light and dark mode
export function LineFigure({ src, className = "" }: { src: string; className?: string }) {
  return (
    <span
      role="img"
      aria-label=""
      className={`block bg-fg-primary ${className}`}
      style={{
        maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`,
        maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center",
      }}
    />
  );
}

// A statement with a figure at the bottom left and the text to its right (on narrow screens the figure goes
// above). Used for the quote and for the "fun part": same spacing, same figure size, same text column.
export function FigureBlock({ figure, children, below = "md:mb-20", above = "md:mt-24", figureTop = "md:top-[52px]" }: { figure: string; children: ReactNode; below?: string; above?: string; figureTop?: string }) {
  return (
    <div className={`relative my-12 flex flex-col-reverse md:block md:min-h-[220px] ${above} ${below}`}>
      <div className="md:ml-[27%] md:pt-16">{children}</div>
      <LineFigure src={figure} className={`mb-8 h-[112px] w-[112px] md:absolute md:left-0 md:mb-0 md:h-[168px] md:w-[168px] ${figureTop}`} />
    </div>
  );
}

// the quote's text style (the H2 style at a narrow width), also used for statements without a source
export function Statement({ children }: { children: ReactNode }) {
  return <p className="m-0 max-w-[420px] text-2xl font-semibold tracking-tight text-fg-primary">{children}</p>;
}

export function Quote({ quote, source, figure }: { quote: string; source: string; figure: string }) {
  return (
    // the quote's lowest line is its source (the callout's is the figure's feet), so it gets 56px more below
    // to leave the same space above and below on the page
    <FigureBlock figure={figure} below="md:mb-[136px]">
      <figure className="m-0">
        <blockquote className="m-0">
          <Statement>{quote}</Statement>
        </blockquote>
        <figcaption className="mt-5"><Label>{source}</Label></figcaption>
      </figure>
    </FigureBlock>
  );
}

export function Callout({ title, children, figure }: { title: string; children: ReactNode; figure: string }) {
  return (
    <FigureBlock figure={figure}>
      <div className="flex flex-col gap-3">
        <Heading>{title}</Heading>
        <p className="text-fg-secondary text-lg leading-relaxed max-w-[560px]">{children}</p>
      </div>
    </FigureBlock>
  );
}
