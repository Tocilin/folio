import { seededRandom, hashSeed } from "@/lib/seededRandom";

// Bright solid colors, one picked per link.
export const FUN_COLORS = [
  "#ff2d95", // hot pink
  "#ff6a00", // orange
  "#ffc400", // amber
  "#00d26a", // green
  "#00b8ff", // sky
  "#8a5cff", // violet
  "#ff3b3b", // red
  "#00e0c0", // aqua
];

// Underline styles, defined in globals.css as `.fun-title--<name>`.
export const FUN_STYLES = ["wave", "zigzag", "dots", "dashes", "loops", "double", "bar"] as const;

// Every link gets its own stable color and underline style, seeded from a
// string (its slug or href), so the site looks random but never changes
// between renders or reloads.
export function funLook(seed: string) {
  const n = hashSeed(seed.replace(/-md$/, "")); // same project, same look on every role
  const color = FUN_COLORS[Math.floor(seededRandom(n * 1.7 + 3) * FUN_COLORS.length)];
  const style = FUN_STYLES[Math.floor(seededRandom(n * 4.1 + 9) * FUN_STYLES.length)];
  return { color, style };
}

// Text with the hover effect: solid color plus a scribble underline. The
// effect itself lives in globals.css (`.fun-title`) and fires when the nearest
// `.group` ancestor or `.fun-link` is hovered.
export function FunText({
  seed,
  className = "",
  children,
}: {
  seed: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { color, style } = funLook(seed);
  return (
    <span
      className={`fun-title fun-title--${style} relative inline-block ${className}`}
      style={{ "--fun-color": color } as React.CSSProperties}
    >
      <span className="fun-title__text">{children}</span>
      <span aria-hidden className="fun-title__scribble" />
    </span>
  );
}
