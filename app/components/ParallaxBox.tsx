"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useBlockParallax } from "@/app/components/useBlockParallax";

// Moves its contents as ONE object with the mouse (see useBlockParallax), with a soft shadow behind it so it
// reads as floating. `depth` is how far it travels at the block's edge, in cqw (a percentage of the block's
// width, e.g. 1.7 is about 10px on a 578px block).
export function ParallaxBox({ depth, shadow, style, children }: { depth: number; shadow: string; style?: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useBlockParallax(ref);
  return (
    <div
      ref={ref}
      className="absolute"
      style={{
        ...style,
        boxShadow: shadow,
        transform: `translate3d(calc(var(--mx, 0) * ${depth}cqw), calc(var(--my, 0) * ${depth}cqw), 0)`,
        transition: "transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
