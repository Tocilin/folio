"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Dot-grid canvas with a Desktop / Tablet / Mobile switch and a card inside it.
//
// The card is a CSS size container, so the page inside lays itself out with
// `[@container(min-width:...)]:` variants based on the card's width, not the browser's.
//
// Every device is a full-size page shrunk by one shared scale, TARGET_SCALE (0.7). Desktop is laid
// out at (canvas width / 0.7) px wide, so it always fills the canvas exactly. Tablet (600px) and
// mobile (375px) keep their true widths and use the same 0.7, so all three stay proportional.
// Desktop never lays out wider than DESIGN_WIDTH (the Figma frame); on a very wide canvas the scale
// grows toward 1 instead. On very narrow screens (a phone browser) scaling would be unreadably
// small, so the card just fills the width at full size.
export const TARGET_SCALE = 0.7;
export const DESIGN_WIDTH = 1780;

type Device = "desktop" | "tablet" | "mobile";

const ICON = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// Each device is a fixed-height "window" (in layout px, before scaling). If the page inside is
// taller, it scrolls inside the card, like a real browser or phone screen.
const DESKTOP_ASPECT = 0.59; // desktop page height as a share of its layout width (1050 on 1780)
const PAGE_HEIGHT: Record<Device, number> = { desktop: 0, tablet: 760, mobile: 667 };
const PHONE_BROWSER_HEIGHT = 640; // desktop card on a narrow screen (no scaling)
const EXPANDED_CHROME = 130; // space the toggles/padding take when expanded

const DEVICES: { id: Device; label: string; width: number | null; icon: ReactNode }[] = [
  {
    id: "desktop", label: "Desktop", width: null,
    icon: (
      <svg {...ICON}>
        <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
        <path d="M8.5 20.5h7M12 16.5v4" />
      </svg>
    ),
  },
  {
    id: "tablet", label: "Tablet", width: 600,
    icon: (
      <svg {...ICON}>
        <rect x="4.5" y="2.5" width="15" height="19" rx="2.2" />
        <path d="M11 18.2h2" />
      </svg>
    ),
  },
  {
    id: "mobile", label: "Mobile", width: 375,
    icon: (
      <svg {...ICON}>
        <rect x="7" y="2.5" width="10" height="19" rx="2.4" />
        <path d="M11 18.5h2" />
      </svg>
    ),
  },
];

export function DeviceCanvas({
  children,
  background,
  color,
  fontFamily = "var(--font-inter), Inter, system-ui, sans-serif",
  border,
  controls,
  resetKey,
  overlay,
}: {
  children: ReactNode;
  background: string;
  color: string;
  fontFamily?: string;
  border: string;
  // Extra controls shown on the canvas, to the left of the device icons.
  controls?: ReactNode;
  // When this changes (e.g. the page inside was swapped), the page scrolls back to the top.
  resetKey?: string;
  // Drawn on top of the page, inside the card (so it scales with it). It can block the mouse.
  overlay?: ReactNode;
}) {
  const [device, setDevice] = useState<Device>("desktop");
  const areaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [avail, setAvail] = useState(0);
  const [vh, setVh] = useState(800);
  // Expanded: the canvas fills the whole window at 1x scale (the page lays itself out at the window
  // width, keeping the same margin and column proportions). Esc or the button closes it.
  const [expanded, setExpanded] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [collapsedH, setCollapsedH] = useState(0);

  const toggle = () => {
    if (!expanded) setCollapsedH(wrapRef.current?.offsetHeight ?? 0);
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

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const measure = () => {
      setAvail(area.clientWidth);
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(area);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [device, resetKey]);

  const def = DEVICES.find((d) => d.id === device) ?? DEVICES[0];
  const isDesktop = def.width === null;
  const proportional = avail >= 700 && !expanded;
  const desktopW = proportional ? Math.min(DESIGN_WIDTH, avail / TARGET_SCALE) : avail;
  const scale = proportional ? avail / desktopW : 1;
  // Layout width of the card in CSS px (before scaling). It never exceeds what fits the canvas.
  const baseH = isDesktop ? (proportional ? Math.round(desktopW * DESKTOP_ASPECT) : PHONE_BROWSER_HEIGHT) : PAGE_HEIGHT[def.id];
  // Expanded: the desktop page fills the window's height; tablet and phone keep their own height
  // unless the window is shorter than that.
  const maxH = Math.max(420, vh - EXPANDED_CHROME);
  const pageH = expanded ? (isDesktop ? maxH : Math.min(baseH, maxH)) : baseH;
  const cardWidth = isDesktop ? desktopW : Math.min(def.width as number, avail / scale);

  return (
    <>
    {expanded && <div aria-hidden style={{ height: collapsedH }} />}
    <div
      ref={wrapRef}
      className={`flex w-full flex-col items-center gap-6 border border-stroke bg-fill-frame px-4 py-6 sm:px-8 sm:pb-10 sm:pt-6 ${
        expanded ? "fixed inset-0 z-50 overflow-y-auto overflow-x-hidden" : "relative overflow-hidden rounded-lg"
      }`}
      style={{
        // FigJam-style dot grid in the page's own text colour, so it follows the site theme.
        backgroundImage: "radial-gradient(rgb(var(--fg-primary) / 0.16) 1px, transparent 1.2px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* the scale the page is shown at (it is drawn at full size, then shrunk) */}
      {avail > 0 && (
        <span
          title={`Shown at ${Math.round(scale * 100)}% of the page's real size`}
          className="absolute left-3 top-3 z-10 hidden h-8 items-center rounded-full border border-stroke bg-fill-surface px-3 text-xs tabular-nums text-fg-secondary sm:flex"
        >
          {Math.round(scale * 100)}%
        </span>
      )}

      <button
        type="button"
        onClick={toggle}
        title={expanded ? "Exit full width (Esc)" : "Expand to full width"}
        aria-label={expanded ? "Exit full width" : "Expand to full width"}
        aria-pressed={expanded}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-stroke bg-fill-surface text-fg-secondary transition-colors hover:text-fg-primary"
      >
        <svg {...ICON} width={16} height={16}>
          {expanded ? <path d="M10 4v6H4M14 20v-6h6M10 10 3.5 3.5M14 14l6.5 6.5" /> : <path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5" />}
        </svg>
      </button>

      <div className="flex flex-wrap items-center justify-center gap-3">
      {controls}
      <div role="group" aria-label="Preview size" className="flex rounded-full border border-stroke bg-fill-surface p-0.5">
        {DEVICES.map((d) => (
          <button
            key={d.id}
            type="button"
            title={d.label}
            aria-label={d.label}
            aria-pressed={device === d.id}
            onClick={() => setDevice(d.id)}
            className={`flex h-8 w-10 items-center justify-center rounded-full transition-colors ${
              device === d.id ? "bg-fg-primary text-fill-surface" : "text-fg-secondary hover:text-fg-primary"
            }`}
          >
            {d.icon}
          </button>
        ))}
      </div>
      </div>

      {/* area: measures the space available; its height follows the scaled card */}
      <div ref={areaRef} className="relative w-full" style={{ height: pageH * scale }}>
        <div
          className="absolute left-1/2 top-0 overflow-hidden rounded-xl transition-[width,height,transform] duration-300 ease-out [container-type:inline-size]"
          style={{
            width: avail ? cardWidth : "100%",
            height: pageH,
            visibility: avail ? "visible" : "hidden",
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
            background,
            color,
            fontFamily,
            border: `1px solid ${border}`,
          }}
        >
          <div ref={scrollRef} className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:thin]">
            {children}
          </div>
          {overlay}
        </div>
      </div>
    </div>
    </>
  );
}
