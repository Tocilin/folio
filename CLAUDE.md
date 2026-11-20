# Portfolio site: working rules

## Page vs canvas (important)
- **Inside a canvas** (the dotted `DeviceCanvas` demos): anything goes. Custom fonts, colours, sizes, spacing.
- **On the page** (everything outside a canvas): text, colours, sizes and spacing must be consistent across the whole
  site and come from the design system. Think Notion blocks: build from the blocks in `app/components/PageBlocks.tsx`
  (Label, Caption, Body, Heading, CardTitle, CardText, Quote, Callout) and the existing cards (`InteractiveCard`,
  `ResultsCards`, `IconCards`). No inline sizes, no one-off colours (`text-[33px]`, hex values) on the page.
- Colours come from the tokens (`fg-primary`, `fg-secondary`, `fg-tertiary`, `stroke`, `fill-*`), so light and dark
  mode both work. If a block is missing, add it to `PageBlocks.tsx` using the existing type scale, then use it.
- No em dashes in site content.
