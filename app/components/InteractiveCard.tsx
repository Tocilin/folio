"use client";

import type { PointerEvent, ReactNode } from "react";

// Shared card shell for the case study card grids (process steps, objectives,
// results). Pointer devices only, and off with reduced motion: the card lifts
// a couple of pixels, its border firms up, and a soft spotlight follows the
// cursor. Children can react to hover with `group-hover:` classes.
function trackPointer(e: PointerEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function InteractiveCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      onPointerMove={trackPointer}
      className={`group relative overflow-hidden rounded-lg border border-stroke bg-fill-frame p-6 flex flex-col transition-[transform,border-color] duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-stroke-strong motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--fg-primary) / 0.06), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
