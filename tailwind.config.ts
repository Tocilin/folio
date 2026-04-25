import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xs:  "var(--radius-xs)",   /* 4px  — chips, badges          */
        sm:  "var(--radius-sm)",   /* 8px  — buttons, tags, inputs  */
        md:  "var(--radius-md)",   /* 12px — cards, gallery images  */
        lg:  "var(--radius-lg)",   /* 16px — hero images            */
        xl:  "var(--radius-xl)",   /* 24px — featured cards         */
      },
      lineHeight: {
        relaxed: "1.7",
      },
      colors: {
        // ── Tier 1: Primitives ─────────────────────────────────────
        // Exposed for one-off use; prefer semantic tokens in components.
        neutral: {
          0:   "rgb(var(--neutral-0)   / <alpha-value>)",
          50:  "rgb(var(--neutral-50)  / <alpha-value>)",
          100: "rgb(var(--neutral-100) / <alpha-value>)",
          200: "rgb(var(--neutral-200) / <alpha-value>)",
          300: "rgb(var(--neutral-300) / <alpha-value>)",
          400: "rgb(var(--neutral-400) / <alpha-value>)",
          500: "rgb(var(--neutral-500) / <alpha-value>)",
          600: "rgb(var(--neutral-600) / <alpha-value>)",
          700: "rgb(var(--neutral-700) / <alpha-value>)",
          800: "rgb(var(--neutral-800) / <alpha-value>)",
          900: "rgb(var(--neutral-900) / <alpha-value>)",
          950: "rgb(var(--neutral-950) / <alpha-value>)",
        },

        // ── Tier 2: Semantic ───────────────────────────────────────
        // Use these in components — they respond to theme switching.
        text: {
          strong:      "rgb(var(--text-neutral-strong)  / <alpha-value>)",
          base:        "rgb(var(--text-neutral-base)    / <alpha-value>)",
          subtle:      "rgb(var(--text-neutral-subtle)  / <alpha-value>)",
          faint:       "rgb(var(--text-neutral-faint)   / <alpha-value>)",
          interactive: "rgb(var(--text-interactive)     / <alpha-value>)",
        },
        fill: {
          darkest: "rgb(var(--fill-neutral-darkest)  / <alpha-value>)",
          surface: "rgb(var(--fill-surface)          / <alpha-value>)",
          overlay: "rgb(var(--fill-surface-overlay)  / <alpha-value>)",
        },
        border: {
          bold:        "rgb(var(--stroke-neutral-bold)   / <alpha-value>)",
          subtle:      "rgb(var(--stroke-neutral-subtle) / 0.06)",
          faint:       "rgb(var(--stroke-neutral-faint)  / 0.08)",
          interactive: "rgb(var(--stroke-interactive)    / <alpha-value>)",
        },

        // ── Tier 3: Aliases ────────────────────────────────────────
        // Legacy shorthand — kept so existing classes don't break.
        fg: {
          primary:   "rgb(var(--fg-primary)   / <alpha-value>)",
          secondary: "rgb(var(--fg-secondary) / <alpha-value>)",
          tertiary:  "rgb(var(--fg-tertiary)  / <alpha-value>)",
        },
        surface: {
          base: "rgb(var(--surface-base) / <alpha-value>)",
        },
        stroke: {
          DEFAULT: "rgb(var(--stroke) / var(--stroke-opacity))",
          subtle:  "rgb(var(--stroke-subtle) / 0.08)",
        },
        status: {
          available: "rgb(var(--status-available) / <alpha-value>)",
        },
        button: {
          "primary-fill":     "rgb(var(--button-primary-fill)     / <alpha-value>)",
          "primary-label":    "rgb(var(--button-primary-label)    / <alpha-value>)",
          "secondary-stroke": "rgb(var(--button-secondary-stroke) / <alpha-value>)",
          "secondary-label":  "rgb(var(--button-secondary-label)  / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
