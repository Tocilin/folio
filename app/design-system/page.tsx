import Link from "next/link";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Button } from "@/app/components/Button";
import { FadeImage } from "@/app/components/FadeImage";

export const metadata = {
  title: "Design System — Portfolio",
};

const primitiveRamps: { name: string; key: string; steps: number[] }[] = [
  { name: "Neutral", key: "neutral", steps: [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: "Green", key: "green", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Amber", key: "amber", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Red", key: "red", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Violet", key: "violet", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
];

const semanticTokens: { group: string; rows: { name: string; mapsTo: string }[] }[] = [
  {
    group: "Status",
    rows: [{ name: "--status-available", mapsTo: "green-400 (dark) / green-600 (light)" }],
  },
  {
    group: "Button",
    rows: [
      { name: "--button-primary-fill", mapsTo: "neutral-50 (dark) / neutral-950 (light)" },
      { name: "--button-primary-label", mapsTo: "neutral-950 (dark) / neutral-50 (light)" },
      { name: "--button-secondary-stroke", mapsTo: "neutral-700 (dark) / neutral-300 (light)" },
      { name: "--button-secondary-label", mapsTo: "neutral-400 (dark) / neutral-600 (light)" },
    ],
  },
  {
    group: "Text",
    rows: [
      { name: "--text-neutral-strong", mapsTo: "neutral-50 (dark) / neutral-900 (light) — headings" },
      { name: "--text-neutral-base", mapsTo: "neutral-300 (dark) / neutral-500 (light) — body" },
      { name: "--text-neutral-subtle", mapsTo: "neutral-400 — labels, meta" },
      { name: "--text-neutral-faint", mapsTo: "neutral-700 (dark) / neutral-300 (light) — placeholders" },
      { name: "--text-interactive", mapsTo: "neutral-0 (dark) / neutral-950 (light)" },
    ],
  },
  {
    group: "Fill",
    rows: [
      { name: "--fill-neutral-darkest", mapsTo: "neutral-0" },
      { name: "--fill-surface", mapsTo: "neutral-950 (dark) / neutral-50 (light) — page background" },
      { name: "--fill-surface-overlay", mapsTo: "neutral-950 (dark) / neutral-50 (light)" },
    ],
  },
  {
    group: "Stroke",
    rows: [
      { name: "--stroke-neutral-bold", mapsTo: "neutral-700 (dark) / neutral-300 (light)" },
      { name: "--stroke-neutral-default", mapsTo: "neutral-0 (dark) / neutral-950 (light), 8% / 6% opacity" },
      { name: "--stroke-neutral-subtle", mapsTo: "neutral-0 (dark) / neutral-950 (light), 6% opacity" },
      { name: "--stroke-neutral-faint", mapsTo: "neutral-0 (dark) / neutral-950 (light), 8% opacity" },
      { name: "--stroke-interactive", mapsTo: "neutral-0 (dark) / neutral-950 (light)" },
    ],
  },
];

const aliasTokens = [
  { name: "--fg-primary", mapsTo: "--text-neutral-strong" },
  { name: "--fg-secondary", mapsTo: "--text-neutral-base" },
  { name: "--fg-tertiary", mapsTo: "--text-neutral-subtle" },
  { name: "--surface-base", mapsTo: "--fill-surface" },
  { name: "--stroke", mapsTo: "--stroke-neutral-default" },
  { name: "--stroke-opacity", mapsTo: "--stroke-neutral-default-opacity" },
  { name: "--stroke-subtle", mapsTo: "--stroke-neutral-subtle" },
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

export default function DesignSystem() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <Link href="/" className="text-sm text-fg-secondary underline-dots hover:text-fg-primary transition-colors">
          ← Back
        </Link>
        <span className="text-sm font-medium tracking-tight">Design System</span>
        <ThemeToggle />
      </nav>

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 md:px-12 pt-44 pb-32 flex flex-col gap-32">

        {/* Intro */}
        <section>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-1.44px] leading-[1.05] mb-6">
            Design System
          </h1>
          <p className="text-fg-secondary text-lg leading-relaxed max-w-sm">
            The tokens and components this portfolio is built from —
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
            Intent-based tokens that map to primitives. These flip automatically between
            the dark and light themes — everything below reflects the theme currently active.
          </p>
          <div className="flex flex-col gap-10">
            {semanticTokens.map((group) => (
              <div key={group.group}>
                <p className="text-sm text-fg-secondary mb-3">{group.group}</p>
                <div className="border-t border-stroke">
                  {group.rows.map((row) => (
                    <div
                      key={row.name}
                      className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 py-3 border-b border-stroke"
                    >
                      <span className="text-sm font-mono text-fg-primary w-full md:w-72 shrink-0">{row.name}</span>
                      <span className="text-sm text-fg-tertiary">{row.mapsTo}</span>
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
                className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 py-3 border-b border-stroke"
              >
                <span className="text-sm font-mono text-fg-primary w-full md:w-72 shrink-0">{row.name}</span>
                <span className="text-sm text-fg-tertiary font-mono">{row.mapsTo}</span>
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
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">H1 — Hero · text-5xl/7xl, tracking -1.44px</p>
              <h1 className="text-5xl font-semibold tracking-[-1.44px] leading-[1.05]">Design & Development</h1>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">H1 — Case study · text-5xl/6xl, tracking -1.28px</p>
              <h1 className="text-4xl font-semibold tracking-[-1.28px] leading-[1.05]">Case Study Title</h1>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">H2 — Section group · text-2xl, tracking tight</p>
              <h2 className="text-2xl font-semibold tracking-tight">Section Group</h2>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">H3 — Card title · text-xl, tracking tight</p>
              <h3 className="text-xl font-semibold leading-snug tracking-tight">Card Title</h3>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">Body — large · text-lg, fg-secondary</p>
              <p className="text-fg-secondary text-lg leading-relaxed max-w-[560px]">
                Making digital products that are simple, considered, and built to last.
              </p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-3">Body — small · text-sm, fg-tertiary</p>
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
                  <span className="text-sm text-fg-tertiary underline-dots shrink-0">View →</span>
                </div>
              </div>
            </div>

            {/* FadeImage */}
            <div>
              <p className="text-sm text-fg-secondary mb-4">FadeImage — fades in on load, used for hero &amp; gallery images</p>
              <FadeImage
                src="/images/superapp/hero.jpg"
                alt="FadeImage example"
                className="w-full h-64 rounded-lg"
              />
            </div>

            {/* Nav / footer pattern */}
            <div>
              <p className="text-sm text-fg-secondary mb-4">Nav bar — fixed, blurred, bottom border</p>
              <div className="border border-stroke rounded-md overflow-hidden">
                <div className="flex items-center justify-between px-6 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
                  <span className="text-sm font-medium tracking-tight">Eugene Tochilin</span>
                  <span className="text-sm text-fg-tertiary">Light</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-stroke px-6 md:px-12 py-12 max-w-[900px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="text-sm text-fg-tertiary">Eugene Tochilin</span>
        <div className="flex items-center gap-6 text-sm text-fg-tertiary">
          <a href="/Eugene_Tochilin_Resume.pdf" target="_blank" rel="noopener noreferrer" className="underline-dots hover:text-fg-primary transition-colors">Resume</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="underline-dots hover:text-fg-primary transition-colors">LinkedIn</a>
          <Link href="/design-system" className="underline-dots hover:text-fg-primary transition-colors">Design System</Link>
        </div>
      </footer>
    </div>
  );
}
