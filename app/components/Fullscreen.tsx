"use client";

import { useEffect, useRef, useState } from "react";

// "Fill the screen" for a canvas: the box turns into a fixed, full-window layer (Esc or the button puts
// it back), the page behind stops scrolling, and a same-height spacer keeps the page from jumping.
//
//   const fs = useFullscreen();
//   <>{fs.spacer}<div ref={fs.ref} className={fs.expanded ? "fixed inset-0 z-50 ..." : "relative ..."}>
//     <FullscreenButton expanded={fs.expanded} onClick={fs.toggle} className="absolute right-3 top-3" /> ...
export function useFullscreen() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [collapsedH, setCollapsedH] = useState(0);

  const toggle = () => {
    if (!expanded) setCollapsedH(ref.current?.offsetHeight ?? 0);
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [expanded]);

  const spacer = expanded ? <div aria-hidden style={{ height: collapsedH }} /> : null;
  return { expanded, toggle, ref, spacer };
}

export function FullscreenButton({ expanded, onClick, className = "" }: { expanded: boolean; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={expanded ? "Exit full screen (Esc)" : "Expand to full screen"}
      aria-label={expanded ? "Exit full width" : "Expand to full width"}
      aria-pressed={expanded}
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-stroke bg-fill-surface text-fg-secondary transition-colors hover:text-fg-primary ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {expanded ? <path d="M10 4v6H4M14 20v-6h6M10 10 3.5 3.5M14 14l6.5 6.5" /> : <path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5" />}
      </svg>
    </button>
  );
}
