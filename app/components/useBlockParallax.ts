"use client";

import { useEffect, type RefObject } from "react";

// Mouse parallax for the overview blocks. While the mouse moves over the surrounding block (the closest
// ancestor marked data-parallax-block), it writes --mx / --my (-1 to 1, from the block's centre) on `ref`'s
// element. Pieces inside read them: transform: translate(calc(var(--mx, 0) * depth), ...). On leave the
// values go back to 0 and the pieces ease home. Does nothing for touch, or with reduced motion.
export function useBlockParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const block = (el.closest("[data-parallax-block]") as HTMLElement | null) ?? el.parentElement;
    if (!block) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = block.getBoundingClientRect();
      el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
      el.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const leave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    block.addEventListener("pointermove", move);
    block.addEventListener("pointerleave", leave);
    return () => {
      block.removeEventListener("pointermove", move);
      block.removeEventListener("pointerleave", leave);
    };
  }, [ref]);
}
