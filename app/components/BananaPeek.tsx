"use client";

import { useState } from "react";

const BW = 56; // banana width & height (square)
const DW = 56; // dude width
const DH = 34; // dude height (preserves 52.6 : 31.96 aspect ratio)
const CONTAINER_H = BW + DH; // 90px — upper zone for dude, lower zone for banana

export function BananaPeek() {
  const [peeking, setPeeking] = useState(false);

  function handleClick() {
    if (peeking) return;
    setPeeking(true);
    setTimeout(() => setPeeking(false), 1100);
  }

  return (
    <div className="flex justify-center">
      {/* overflow-hidden clips dude when it's below; banana sits at bottom = on footer border */}
      <div
        className="relative overflow-hidden cursor-pointer select-none"
        style={{ width: BW, height: CONTAINER_H }}
        onClick={handleClick}
        role="button"
        aria-label="Click the banana"
      >
        {/* Dude — rises from below, sits behind banana */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: DW,
            height: DH,
            transform: peeking ? "translateY(-90%)" : "translateY(110%)",
            transition: peeking
              ? "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 0.35s ease-in",
            zIndex: 5,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dude.svg" alt="" width={DW} height={DH} style={{ width: DW, height: DH }} />
        </div>

        {/* Banana — fixed at bottom of container = rests on footer border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: 10,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/banana.svg" alt="" width={BW} height={BW} style={{ width: BW, height: BW }} />
        </div>
      </div>
    </div>
  );
}
