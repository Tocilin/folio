"use client";

import { useState } from "react";

const HEIGHT = 48;

const doodles = [
  { src: "/images/doodle-1.svg", w: 74, h: 49, right: -6 },
  { src: "/images/doodle-2.svg", w: 51, h: 47, right:  8 },
  { src: "/images/doodle-3.svg", w: 53, h: 39, right:  0 },
];

export function AvailableTag() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const doodle = doodles[index];
  const width = Math.round((doodle.w / doodle.h) * HEIGHT);

  function handleMouseEnter() {
    setIndex((i) => (i + 1) % doodles.length);
    setVisible(true);
  }

  return (
    <div
      className="relative inline-flex items-center shrink-0 cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Doodle — sits behind text, peeks up from below */}
      <img
        src={doodle.src}
        alt=""
        aria-hidden="true"
        width={width}
        height={HEIGHT}
        style={{
          position: "absolute",
          bottom: 0,
          right: doodle.right,
          zIndex: 0,
          transform: visible ? "translateY(-52%)" : "translateY(20%)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.15s ease",
          pointerEvents: "none",
        }}
      />
      {/* Text — sits in front, background hides doodle's lower body */}
      <span
        className="text-sm text-fg-tertiary relative"
        style={{
          zIndex: 1,
          backgroundColor: "rgb(var(--surface-base))",
          paddingInline: "2px",
        }}
      >
        Available for work
      </span>
    </div>
  );
}
