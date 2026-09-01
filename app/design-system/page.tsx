import Link from "next/link";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Button } from "@/app/components/Button";
import { FadeImage } from "@/app/components/FadeImage";
import { Footer } from "@/app/components/Footer";

export const metadata = {
  title: "Design system - Portfolio",
};

const primitiveRamps: { name: string; key: string; steps: number[] }[] = [
  { name: "Neutral", key: "neutral", steps: [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: "Green", key: "green", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Amber", key: "amber", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Red", key: "red", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Violet", key: "violet", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Peach", key: "peach", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
];

type ThemeValue = { dark: string; light: string; debug: string; violet: string };

const semanticTokens: { group: string; rows: { name: string; mapsTo: ThemeValue; description: string }[] }[] = [
  {
    group: "Status",
    rows: [{
      name: "--status-available",
      mapsTo: { dark: "green-400", light: "green-600", debug: "green-600", violet: "green-600" },
      description: "Color of the pulse dot in the “Available for work” indicator on the homepage. Stays green in every theme: it's a semantic status signal, not a themeable accent.",
    }],
  },
  {
    group: "Button",
    rows: [
      {
        name: "--button-primary-fill",
        mapsTo: { dark: "neutral-50", light: "neutral-950", debug: "peach-600", violet: "violet-600" },
        description: "Background of the primary (solid) button, e.g. the Resume button.",
      },
      {
        name: "--button-primary-label",
        mapsTo: { dark: "neutral-950", light: "neutral-50", debug: "neutral-50", violet: "neutral-50" },
        description: "Label color on top of the primary button fill.",
      },
      {
        name: "--button-secondary-stroke",
        mapsTo: { dark: "neutral-700", light: "neutral-300", debug: "peach-300", violet: "violet-300" },
        description: "Border color of the secondary (outlined) button, e.g. the LinkedIn button.",
      },
      {
        name: "--button-secondary-label",
        mapsTo: { dark: "neutral-400", light: "neutral-600", debug: "peach-700", violet: "violet-700" },
        description: "Label color of the secondary button.",
      },
    ],
  },
  {
    group: "Text",
    rows: [
      {
        name: "--text-neutral-strong",
        mapsTo: { dark: "neutral-50", light: "neutral-900", debug: "neutral-900", violet: "neutral-900" },
        description: "Headings and primary content. Flows through the --fg-primary alias, used on h1/h2/h3 and the nav brand name.",
      },
      {
        name: "--text-neutral-base",
        mapsTo: { dark: "neutral-300", light: "neutral-500", debug: "neutral-500", violet: "neutral-500" },
        description: "Body copy. Flows through --fg-secondary: paragraph and description text.",
      },
      {
        name: "--text-neutral-subtle",
        mapsTo: { dark: "neutral-400", light: "neutral-400", debug: "neutral-400", violet: "neutral-400" },
        description: "Secondary/meta text. Flows through --fg-tertiary, the most-used text color: labels, project descriptions, footer links, timestamps.",
      },
      {
        name: "--text-neutral-faint",
        mapsTo: { dark: "neutral-700", light: "neutral-300", debug: "neutral-300", violet: "neutral-300" },
        description: "Lowest-emphasis text (placeholders, disabled states). Defined but not consumed by any component yet; reserved for future use.",
      },
      {
        name: "--text-interactive",
        mapsTo: { dark: "neutral-0", light: "neutral-950", debug: "neutral-950", violet: "neutral-950" },
        description: "Label color for text drawn directly on an accent-colored surface. Defined but not consumed yet; reserved for future use.",
      },
    ],
  },
  {
    group: "Fill",
    rows: [
      {
        name: "--fill-neutral-darkest",
        mapsTo: { dark: "neutral-0", light: "neutral-0", debug: "neutral-0", violet: "neutral-0" },
        description: "Constant near-white fill. Defined but not consumed by any component yet; reserved for future use.",
      },
      {
        name: "--fill-surface",
        mapsTo: { dark: "neutral-950", light: "neutral-50", debug: "peach-50", violet: "violet-50" },
        description: "Page background. Flows through --surface-base, applied to <body> and the blurred nav/footer bars.",
      },
      {
        name: "--fill-frame",
        mapsTo: { dark: "neutral-900", light: "neutral-100", debug: "peach-100", violet: "violet-100" },
        description: "One step up from --fill-surface. Flows through --surface-frame, the backdrop behind transparent product-shot images (FramedImage). Same color for every case study, only the theme changes it.",
      },
    ],
  },
  {
    group: "Stroke",
    rows: [
      {
        name: "--stroke-neutral-default",
        mapsTo: { dark: "neutral-0, 8% opacity", light: "neutral-950, 6% opacity", debug: "neutral-950, 6% opacity", violet: "neutral-950, 6% opacity" },
        description: "Default hairline border. Flows through --stroke: nav bottom border, footer top border, section dividers, card and list-row borders.",
      },
      {
        name: "--stroke-neutral-strong",
        mapsTo: { dark: "neutral-600", light: "neutral-400", debug: "neutral-400", violet: "neutral-400" },
        description: "Opaque, higher-contrast border for elements that need to stand out on their own rather than blend into a surface, e.g. the theme toggle circles. Flows through --stroke-strong.",
      },
    ],
  },
];

const aliasTokens: { name: string; mapsTo: string; description: string; value?: ThemeValue }[] = [
  {
    name: "--fg-primary",
    mapsTo: "--text-neutral-strong",
    description: "Primary text shorthand (text-fg-primary): headings and emphasized content.",
  },
  {
    name: "--fg-secondary",
    mapsTo: "--text-neutral-base",
    description: "Secondary text shorthand (text-fg-secondary): body copy.",
  },
  {
    name: "--fg-tertiary",
    mapsTo: "--text-neutral-subtle",
    description: "Tertiary text shorthand (text-fg-tertiary), the most common text color: labels, descriptions, meta.",
  },
  {
    name: "--surface-base",
    mapsTo: "--fill-surface",
    description: "Background shorthand (bg-surface-base): applied to <body> and translucent nav/footer bars.",
  },
  {
    name: "--surface-frame",
    mapsTo: "--fill-frame",
    description: "Background shorthand for FramedImage: the themed backdrop behind transparent product-shot images in case studies.",
  },
  {
    name: "--stroke",
    mapsTo: "--stroke-neutral-default",
    description: "Border shorthand (border-stroke), the hairline border used almost everywhere: nav, footer, dividers, cards.",
  },
  {
    name: "--stroke-opacity",
    mapsTo: "--stroke-neutral-default-opacity",
    value: { dark: "8%", light: "6%", debug: "6%", violet: "6%" },
    description: "Opacity paired with --stroke to produce the hairline effect.",
  },
  {
    name: "--stroke-strong",
    mapsTo: "--stroke-neutral-strong",
    description: "Higher-contrast border shorthand (border-stroke-strong): used on the theme toggle circles.",
  },
];

const radii = [
  { name: "xs", value: "4px", usage: "chips, badges" },
  { name: "sm", value: "8px", usage: "buttons, tags, inputs" },
  { name: "md", value: "12px", usage: "cards, gallery images" },
  { name: "lg", value: "16px", usage: "hero images, large containers" },
  { name: "xl", value: "24px", usage: "featured / oversized cards" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-6">{children}</p>;
}

function Swatch({ style, name }: { style: React.CSSProperties; name: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full h-14 rounded-sm border border-stroke"
        style={style}
      />
      <span className="text-xs text-fg-tertiary font-mono">{name}</span>
    </div>
  );
}

function TokenSwatch({ cssVar }: { cssVar: string }) {
  return (
    <div
      className="w-8 h-8 rounded-sm border border-stroke shrink-0"
      style={{ backgroundColor: `rgb(var(${cssVar}))` }}
    />
  );
}

/** Shows only the mapping for whichever theme is currently active, via CSS (no JS state). */
function ThemeMap({ dark, light, debug, violet }: ThemeValue) {
  return (
    <>
      <span className="theme-only-dark">{dark}</span>
      <span className="theme-only-light">{light}</span>
      <span className="theme-only-debug">{debug}</span>
      <span className="theme-only-violet">{violet}</span>
    </>
  );
}

export default function DesignSystem() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <Link href="/" className="text-sm text-fg-secondary underline-dots hover:text-fg-primary transition-colors">
          ← Home
        </Link>
        <span className="text-sm font-medium tracking-tight">Design system</span>
        <ThemeToggle />
      </nav>

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 md:px-12 pt-44 pb-32 flex flex-col gap-32">

        {/* Intro */}
        <section>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-1.44px] leading-[1.05] mb-6">
            Design system
          </h1>
          <p className="text-fg-secondary text-lg leading-relaxed max-w-sm">
            The tokens and components this portfolio is built from:
            a living reference, not a separate library.
          </p>
        </section>

        {/* Color primitives */}
        <section>
          <SectionLabel>Color Primitives</SectionLabel>
          <div className="flex flex-col gap-10">
            {primitiveRamps.map((ramp) => (
              <div key={ramp.key}>
                <p className="text-sm text-fg-secondary mb-3">{ramp.name}</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-3">
                  {ramp.steps.map((step) => (
                    <Swatch
                      key={step}
                      name={`${ramp.key}-${step}`}
                      style={{ backgroundColor: `rgb(var(--${ramp.key}-${step}))` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Semantic tokens */}
        <section>
          <SectionLabel>Semantic Tokens</SectionLabel>
          <p className="text-fg-secondary text-lg leading-relaxed max-w-[560px] mb-10">
            Intent-based tokens that map to primitives. Both the swatch and the mapping below it
            reflect whichever theme is active; switch themes above to see them update.
          </p>
          <div className="flex flex-col gap-10">
            {semanticTokens.map((group) => (
              <div key={group.group}>
                <p className="text-sm text-fg-secondary mb-3">{group.group}</p>
                <div className="border-t border-stroke">
                  {group.rows.map((row) => (
                    <div
                      key={row.name}
                      className="flex items-start gap-4 py-4 border-b border-stroke"
                    >
                      <TokenSwatch cssVar={row.name} />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-mono text-fg-primary">{row.name}</span>
                        <span className="text-sm text-fg-tertiary font-mono">
                          <ThemeMap {...row.mapsTo} />
                        </span>
                        <span className="text-xs text-fg-tertiary/70 leading-relaxed">{row.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alias tokens */}
        <section>
          <SectionLabel>Component Aliases</SectionLabel>
          <p className="text-fg-secondary text-lg leading-relaxed max-w-[560px] mb-10">
            Shorthand tokens used directly in Tailwind classes throughout the site
            (<code className="font-mono text-fg-primary">text-fg-primary</code>,{" "}
            <code className="font-mono text-fg-primary">border-stroke</code>, etc.).
          </p>
          <div className="border-t border-stroke">
            {aliasTokens.map((row) => (
              <div
                key={row.name}
                className="flex items-start gap-4 py-4 border-b border-stroke"
              >
                {row.value ? <div className="w-8 shrink-0" /> : <TokenSwatch cssVar={row.name} />}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-mono text-fg-primary">{row.name}</span>
                  <span className="text-sm text-fg-tertiary font-mono">
                    {row.mapsTo}
                    {row.value && (
                      <>
                        {" · "}
                        <ThemeMap {...row.value} />
                      </>
                    )}
                  </span>
                  <span className="text-xs text-fg-tertiary/70 leading-relaxed">{row.description}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Radius scale */}
        <section>
          <SectionLabel>Radius Scale</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {radii.map((r) => (
              <div key={r.name} className="flex flex-col gap-3">
                <div
                  className="w-full h-20 border border-stroke"
                  style={{ borderRadius: r.value, backgroundColor: "rgb(var(--fg-primary) / 0.06)" }}
                />
                <div>
                  <p className="text-sm text-fg-primary font-mono">{r.name} · {r.value}</p>
                  <p className="text-xs text-fg-tertiary mt-1">{r.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <SectionLabel>Typography</SectionLabel>
          <p className="text-fg-secondary text-lg leading-relaxed max-w-[560px] mb-10">
            Inter, via <code className="font-mono text-fg-primary">next/font/google</code>. Headings use tight,
            slightly negative letter-tracking; body copy stays relaxed.
          </p>
          <div className="flex flex-col gap-8 border-t border-stroke pt-10">
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">H1 · Hero · text-5xl/7xl, tracking -1.44px</p>
              <h1 className="text-5xl font-semibold tracking-[-1.44px] leading-[1.05]">Design & management</h1>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">H1 · Case study · text-5xl/6xl, tracking -1.28px</p>
              <h1 className="text-4xl font-semibold tracking-[-1.28px] leading-[1.05]">Case study title</h1>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">H2 · Section group · text-2xl, tracking tight</p>
              <h2 className="text-2xl font-semibold tracking-tight">Section group</h2>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">H3 · Card title · text-xl, tracking tight</p>
              <h3 className="text-xl font-semibold leading-snug tracking-tight">Card title</h3>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">Body · large · text-lg, fg-secondary</p>
              <p className="text-fg-secondary text-lg leading-relaxed max-w-[560px]">
                Making digital products that are simple, considered, and built to last.
              </p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">Body · small · text-sm, fg-tertiary</p>
              <p className="text-sm text-fg-tertiary leading-relaxed max-w-[560px]">
                Supporting copy, descriptions, and secondary detail.
              </p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">Label · text-xs, uppercase, tracking-widest</p>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest">Selected Work</p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">Mono · font-mono</p>
              <p className="text-sm font-mono text-fg-tertiary">01 · 2024</p>
            </div>
          </div>
        </section>

        {/* Components */}
        <section>
          <SectionLabel>Components</SectionLabel>

          <div className="flex flex-col gap-14">

            {/* Buttons */}
            <div>
              <p className="text-sm text-fg-secondary mb-4">Button</p>
              <div className="flex items-center gap-3">
                <Button variant="primary" href="#">Primary</Button>
                <Button variant="secondary" href="#">Secondary</Button>
              </div>
            </div>

            {/* Theme toggle */}
            <div>
              <p className="text-sm text-fg-secondary mb-4">ThemeToggle</p>
              <ThemeToggle />
            </div>

            {/* Dotted underline link */}
            <div>
              <p className="text-sm text-fg-secondary mb-4">Dotted underline link (.underline-dots)</p>
              <a href="#" className="text-sm text-fg-tertiary underline-dots hover:text-fg-primary transition-colors">
                View project →
              </a>
            </div>

            {/* Work list row */}
            <div>
              <p className="text-sm text-fg-secondary mb-4">Work list row</p>
              <div className="border-t border-stroke">
                <div className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-0 py-5 border-b border-stroke">
                  <span className="text-xs text-fg-tertiary font-mono w-8 shrink-0">01</span>
                  <div className="flex-1 min-w-0">
                    <span className="relative inline-block text-xl font-medium tracking-tight">
                      Project Name
                    </span>
                    <p className="text-sm text-fg-tertiary mt-1 leading-relaxed">Short project description.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FadeImage */}
            <div>
              <p className="text-sm text-fg-secondary mb-4">FadeImage · fades in on load, used for hero &amp; gallery images</p>
              <FadeImage
                src="/images/superapp/01-hero.webp"
                alt="FadeImage example"
                className="w-full aspect-[16/10] rounded-lg"
              />
            </div>

            {/* Nav bar pattern */}
            <div>
              <p className="text-sm text-fg-secondary mb-4">Nav bar · fixed, blurred, bottom border</p>
              <div className="border border-stroke rounded-md overflow-hidden">
                <div className="flex items-center justify-between px-6 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
                  <span className="text-sm font-medium tracking-tight">Eugene Tochilin</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-stroke" style={{ backgroundColor: "rgb(var(--neutral-950))" }} />
                    <div className="w-4 h-4 rounded-full border border-stroke opacity-50" style={{ backgroundColor: "rgb(var(--neutral-50))" }} />
                    <div className="w-4 h-4 rounded-full border border-stroke opacity-50" style={{ backgroundColor: "rgb(var(--peach-500))" }} />
                    <div className="w-4 h-4 rounded-full border border-stroke opacity-50" style={{ backgroundColor: "rgb(var(--violet-500))" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div>
              <p className="text-sm text-fg-secondary mb-4">Footer · used identically on every page</p>
              <div className="border border-stroke rounded-md overflow-hidden">
                <Footer />
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
