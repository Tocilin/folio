"use client";

import { useState } from "react";

const doodles = [
  { src: "/images/doodle-1.svg", w: 74, h: 49 },
  { src: "/images/doodle-2.svg", w: 51, h: 47 },
  { src: "/images/doodle-3.svg", w: 53, h: 39 },
];

const HEIGHT = 48;

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
      <img
        key={doodle.src}
        src={doodle.src}
        alt=""
        aria-hidden="true"
        width={width}
        height={HEIGHT}
        className={`
          absolute -top-16 right-0
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          pointer-events-none
          ${visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-90"}
        `}
      />
      <span className="text-sm text-fg-tertiary">Available for work</span>
    </div>
  );
}
