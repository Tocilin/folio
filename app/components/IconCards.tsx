import type { IconCard } from "@/lib/projects";
import { InteractiveCard } from "@/app/components/InteractiveCard";

// Grid of cards, each with an illustration slot, a title, and a short
// description. The icon is painted with CSS mask-image so a single-colour SVG
// takes the site's text colour and follows light and dark mode. Cards without
// an icon keep an empty slot of the same size so the layout doesn't shift
// when artwork is added later. On hover the drawing tilts slightly, on top of
// the shared card hover from InteractiveCard.
export function IconCards({ cards }: { cards: IconCard[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      {cards.map((card) => (
        <InteractiveCard key={card.title} className="gap-5">
          <div aria-hidden className="relative h-28 w-full -mt-3 -ml-5">
            {card.icon && (
              <div
                className="h-full w-28 bg-fg-primary origin-bottom-left transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] [@media(hover:hover)]:group-hover:-rotate-3 [@media(hover:hover)]:group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                style={{
                  WebkitMaskImage: `url(${card.icon})`,
                  maskImage: `url(${card.icon})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            )}
          </div>
          <div className="relative flex flex-col gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-fg-primary">{card.title}</h3>
            <p className="text-sm text-fg-secondary leading-relaxed">{card.body}</p>
          </div>
        </InteractiveCard>
      ))}
    </div>
  );
}
