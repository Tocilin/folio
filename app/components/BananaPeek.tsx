"use client";

import { useState } from "react";

// Natural Figma sizes — rendered 2× for sharpness
const BW = 92;  // banana: 46px × 2
const BH = 92;
const DW = 106; // dude+banana: 53px × 2
const DH = 126; // dude+banana: 63px × 2

// How many px the images sit below the footer border line
const OVERLAP = 12;

export function BananaPeek() {
  const [peeking, setPeeking] = useState(false);

  function handleClick() {
    if (peeking) return;
    setPeeking(true);
    setTimeout(() => setPeeking(false), 1200);
  }

  const anchor: React.CSSProperties = {
    position: "absolute",
    bottom: `calc(100% - ${OVERLAP}px)`,
    left: "50%",
    zIndex: 20,
    cursor: "pointer",
    userSelect: "none",
  };

  return (
    <>
      {/* Banana only — default */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/banana.png"
        alt=""
        onClick={handleClick}
        style={{
          ...anchor,
          transform: "translateX(-50%)",
          width: BW,
          height: BH,
          opacity: peeking ? 0 : 1,
          transition: peeking ? "opacity 0.1s" : "opacity 0.15s 0.3s",
          pointerEvents: peeking ? "none" : "auto",
        }}
      />

      {/* Dude + banana — slides up on click, back down after ~1s */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dude-and-banana.png"
        alt=""
        onClick={handleClick}
        style={{
          ...anchor,
          transform: `translateX(-50%) translateY(${peeking ? 0 : DH}px)`,
          width: DW,
          height: DH,
          opacity: peeking ? 1 : 0,
          transition: peeking
            ? "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.15s"
            : "transform 0.35s ease-in, opacity 0.1s 0.28s",
          pointerEvents: peeking ? "auto" : "none",
        }}
      />
    </>
  );
}
