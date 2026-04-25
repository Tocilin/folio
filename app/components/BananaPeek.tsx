"use client";

import { useState } from "react";

const BW = 56;            // banana width & height
const DW = 56;            // dude width
const DH = 34;            // dude height
const CONTAINER_H = BW + DH; // 90px — banana on top, dude below
const REST_OFFSET = DH;   // 34px — at rest, banana bottom = container bottom = footer border

export function BananaPeek() {
  const [peeking, setPeeking] = useState(false);

  function handleClick() {
    if (peeking) return;
    setPeeking(true);
    setTimeout(() => setPeeking(false), 1100);
  }

  return (
    /*
     * Positioned absolutely inside the footer, bottom: 100% anchors the
     * container's bottom edge to the footer's top border line.
     * This keeps the banana in the footer's stacking context — no sibling
     * z-index fight — and overflow-hidden hides the dude below the border.
     */
    <div
      className="absolute overflow-hidden cursor-pointer select-none z-10"
      style={{
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: BW,
        height: CONTAINER_H,
      }}
      onClick={handleClick}
      role="button"
      aria-label="Click the banana"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          width: BW,
          transform: peeking ? "translateY(0)" : `translateY(${REST_OFFSET}px)`,
          transition: peeking
            ? "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            : "transform 0.35s ease-in",
        }}
      >
        {/* Banana */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/banana.svg" alt="" style={{ display: "block", width: BW, height: BW }} />

        {/* Dude — inlined so fg-primary token applies via currentColor */}
        <svg
          viewBox="0 0 52.6299 31.9603"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: DW, height: DH, color: "rgb(var(--fg-primary))" }}
        >
          <path
            d="M39.6247 0C41.1744 0.565172 42.4867 1.22567 43.5085 1.96582C44.7764 2.8841 47.5932 5.85769 48.9997 7.7627C50.4477 9.72319 51.8891 13.8257 52.4128 17.4795C52.9275 21.0692 52.4839 26.8411 51.5388 31.5801H48.3757C49.0666 28.7624 49.3144 25.6879 49.3249 21.4453C49.3367 16.7535 48.7835 14.0804 47.1198 10.7861C46.5805 9.7183 45.4156 8.275 44.1062 6.93262C45.4516 4.66671 42.9696 3.20863 37.0173 0.580078L39.6247 0ZM24.0056 19.4717C24.6429 18.7673 25.122 18.7677 25.9655 19.4717C26.5945 19.9969 26.6355 20.3551 26.6657 25.5908C26.6947 30.576 26.6396 31.1957 26.1315 31.5674C25.2803 32.1897 24.4831 32.0684 23.9362 31.2334C23.2108 30.1262 23.2687 20.2857 24.0056 19.4717ZM14.0173 4.08008C14.1593 4.10127 14.3005 4.12308 14.4411 4.14453C13.0425 5.03627 11.9384 5.97827 10.3669 7.50781C5.14427 12.5915 2.77929 18.6084 3.18917 25.7666C3.34358 28.4629 3.54821 29.975 4.12667 31.5801H0.984088C0.0520237 28.2021 -0.23784 24.4419 0.199908 20.8271C0.579494 17.6914 1.1687 15.6975 2.50753 13.0176C4.44906 9.13128 6.45274 6.61338 10.0827 3.58789L14.0173 4.08008ZM10.2253 21.9053C11.599 20.9007 12.5517 21.6726 12.82 24.0088C12.9351 25.0105 12.8292 25.2864 12.1618 25.7236C10.5794 26.7604 9.84624 26.1596 9.70186 23.708C9.64101 22.6771 9.76859 22.239 10.2253 21.9053ZM39.6608 20.4092C40.198 19.7907 41.5659 19.9089 42.0134 20.6123C42.4563 21.3093 42.2828 23.9455 41.7595 24.4688C41.484 24.7439 41.1882 24.9694 41.1013 24.9697C40.7711 24.9697 39.5409 24.221 39.32 23.8857C38.9181 23.2757 39.1404 21.0084 39.6608 20.4092Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
