"use client";

import { useState } from "react";
import Image from "next/image";

const SIZE = 56;

export function BananaPeek() {
  const [peeking, setPeeking] = useState(false);

  function handleClick() {
    if (peeking) return;
    setPeeking(true);
    setTimeout(() => setPeeking(false), 1100);
  }

  return (
    <div className="flex justify-center py-12">
      {/* Container — overflow-hidden clips the dude below the banana line */}
      <div
        className="relative overflow-hidden cursor-pointer select-none"
        style={{ width: SIZE, height: SIZE * 2 }}
        onClick={handleClick}
        role="button"
        aria-label="Click the banana"
      >
        {/* Dude — rises from below, sits behind banana */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: SIZE,
            height: SIZE,
            transform: peeking ? "translateY(-85%)" : "translateY(110%)",
            transition: peeking
              ? "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 0.35s ease-in",
            zIndex: 5,
          }}
        >
          <Image src="/images/dude.png" alt="" width={SIZE} height={SIZE} />
        </div>

        {/* Banana — fixed at bottom, stays on top (banana on his head) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: 10,
          }}
        >
          <Image src="/images/banana.png" alt="🍌" width={SIZE} height={SIZE} />
        </div>
      </div>
    </div>
  );
}
