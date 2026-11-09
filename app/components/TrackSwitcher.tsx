"use client";

import { useEffect, useRef, useState } from "react";
import { FunText } from "@/app/components/FunText";
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
        className={`absolute left-0 top-full mt-3 w-64 rounded-xl border border-stroke bg-surface-base py-2 shadow-2xl z-50 transition-all duration-200 ease-out ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <p className="px-4 pt-1 pb-2 text-xs text-fg-tertiary uppercase tracking-widest">Explore by role</p>
        {order.map((t, i) => {
          const cfg = siteConfigs[t];
          const isCurrent = t === current;
          return (
            <a
              key={t}
              href={mounted ? trackHref(t, cfg.domain) : cfg.domain}
              className={`group flex items-center px-4 py-2 text-sm transition-colors ${
                isCurrent ? "text-fg-primary font-medium" : "text-fg-secondary hover:text-fg-primary"
              }`}
            >
              <span className="text-xs text-fg-tertiary font-mono font-normal w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <FunText seed={t} className="whitespace-nowrap">{cfg.label}</FunText>
              {isCurrent && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-label="Current view"
                  className="ml-auto shrink-0 text-fg-primary"
                >
                  <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
