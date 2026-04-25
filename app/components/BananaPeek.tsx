"use client";

import { useState } from "react";

const BW = 56; // banana size (square)
const DW = 56; // dude width
const DH = 34; // dude height (preserves 52.6 : 31.96 ratio)

export function BananaPeek() {
  const [peeking, setPeeking] = useState(false);

  function handleClick() {
    if (peeking) return;
    setPeeking(true);
    setTimeout(() => setPeeking(false), 1100);
  }

  return (
    <div className="flex justify-center">
      {/* Container: height = banana + dude. Overflow-hidden clips dude at rest. */}
      <div
        className="relative overflow-hidden cursor-pointer select-none"
        style={{ width: BW, height: BW + DH }}
        onClick={handleClick}
        role="button"
        aria-label="Click the banana"
      >
        {/*
          Assembly moves as one unit.
          At rest:   translateY(DH) — banana sits at container bottom (footer line), dude hidden below
          On peek:   translateY(0)  — banana at top, dude appears beneath it
        */}
        <div
          style={{
            position: "absolute",
            top: 0,
            width: BW,
            transform: peeking ? "translateY(0)" : `translateY(${DH}px)`,
            transition: peeking
              ? "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 0.35s ease-in",
          }}
        >
          {/* Banana — sits on dude's head */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/banana.svg" alt="" style={{ display: "block", width: BW, height: BW }} />
          {/* Dude — body below */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dude.svg" alt="" style={{ display: "block", width: DW, height: DH }} />
        </div>
      </div>
    </div>
  );
}
