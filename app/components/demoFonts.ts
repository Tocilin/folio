import { JetBrains_Mono, Source_Serif_4 } from "next/font/google";

// The two extra typefaces the theming demos switch between (Inter is the site font). Each exposes a CSS
// variable: put `${serifFont.variable} ${monoFont.variable}` on an ancestor, then use
// `font-family: var(--font-demo-serif)` / `var(--font-demo-mono)`.
export const serifFont = Source_Serif_4({ subsets: ["latin"], variable: "--font-demo-serif", display: "swap" });
export const monoFont = JetBrains_Mono({ subsets: ["latin"], variable: "--font-demo-mono", display: "swap" });
