"use client";

import { useEffect, useRef, useState } from "react";
import { COMMERCE_H, COMMERCE_W, CommerceCenterMock } from "@/app/components/CommerceCenterMock";

// The Commerce Center block's picture: the same recreated screen as the canvas below, shown at about 65%
// of its real size and cropped by the block (top-left corner in view, the rest runs off the right and
// bottom edges), like the original image. The scale follows the block's width.
//
// In the 578 px wide block the screen is shown at 0.653; the scale follows the block's width.
const BLOCK_W = 578;
const SCALE = 0.653;

export function CommerceArt() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const block = (el.closest("[data-parallax-block]") as HTMLElement | null) ?? el;
    const measure = () => setScale((block.clientWidth / BLOCK_W) * SCALE);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(block);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="relative h-full w-full overflow-hidden">
      <div style={{ width: COMMERCE_W, height: COMMERCE_H, transform: `scale(${scale})`, transformOrigin: "top left", visibility: scale ? "visible" : "hidden" }}>
        <CommerceCenterMock />
      </div>
    </div>
  );
}
