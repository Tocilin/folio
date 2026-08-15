"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfigs } from "@/lib/siteConfig";
import type { WorkTrack } from "@/lib/projects";

const order: WorkTrack[] = ["management", "ic", "design-systems", "side-projects"];

// On localhost there's no real DNS for the subdomains, so fall back to the
// ?track= override middleware already understands. Anywhere else (the real
// deployment) link straight to the proper subdomain.
function trackHref(track: WorkTrack, domain: string): string {
  if (typeof window === "undefined") return domain;
  const { hostname } = window.location;
  const isLocalDev = hostname === "localhost" || hostname === "127.0.0.1";
  return isLocalDev ? `/?track=${track}` : domain;
}

export function TrackSwitcher({ current }: { current: WorkTrack }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-1.5">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch portfolio view"
        className="flex items-center gap-1 border border-stroke rounded pl-1.5 pr-1 py-0.5 text-fg-tertiary hover:text-fg-primary hover:border-button-secondary-stroke-hover transition-colors"
      >
        <span className="text-[10px] font-mono font-medium uppercase tracking-wider">
          {siteConfigs[current].abbr}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className={`absolute left-0 top-full mt-3 w-56 rounded-xl border border-stroke bg-surface-base py-2 shadow-2xl z-50 transition-all duration-200 ease-out ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {order.map((t) => {
          const cfg = siteConfigs[t];
          const isCurrent = t === current;
          return (
            <a
              key={t}
              href={mounted ? trackHref(t, cfg.domain) : cfg.domain}
              className={`block px-4 py-2 text-sm transition-colors ${
                isCurrent ? "text-fg-primary font-medium" : "text-fg-secondary hover:text-fg-primary"
              }`}
            >
              {cfg.label}
              {isCurrent && <span className="ml-2 text-xs text-fg-tertiary">(current)</span>}
            </a>
          );
        })}
      </div>
    </div>
  );
}
