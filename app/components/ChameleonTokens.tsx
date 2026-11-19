"use client";

import { useState } from "react";
import { DeviceCanvas } from "@/app/components/DeviceCanvas";
import { CK } from "@/app/components/checkoutTokens";

// Chameleon's tokens in three tiers, drawn as a wiring diagram right on the canvas (no slide behind it):
// primitives (raw values) feed semantic tokens (meaning, which switch with the theme), which feed component
// tokens (what the UI actually uses). The Light / Dark switch re-points the semantic tokens, the colours
// downstream follow, and the cards themselves switch to a dark surface too (the swatch inside each card is
// the token's real colour and never changes). Hover any token to light up everything it is connected to.
//
// Styled like the checkout canvases: Inter, the same palette (checkoutTokens), blue as the accent.

type Mode = "light" | "dark";

const PRIMS = [
  { id: "ink/900", hex: CK.ink },
  { id: "grey/600", hex: CK.muted },
  { id: "slate/50", hex: CK.page },
  { id: "slate/200", hex: CK.line },
  { id: "blue/500", hex: CK.accent },
  { id: "green/500", hex: CK.green },
] as const;

const SEMS = ["text/primary", "text/muted", "bg/canvas", "bg/subtle", "action/primary", "feedback/success"] as const;

// which primitive each semantic token points at, per theme
const POINTS: Record<Mode, Record<(typeof SEMS)[number], string>> = {
  light: { "text/primary": "ink/900", "text/muted": "grey/600", "bg/canvas": "slate/50", "bg/subtle": "slate/200", "action/primary": "blue/500", "feedback/success": "green/500" },
  dark: { "text/primary": "slate/50", "text/muted": "slate/200", "bg/canvas": "ink/900", "bg/subtle": "grey/600", "action/primary": "blue/500", "feedback/success": "green/500" },
};

const COMPS = [
  { id: "button/primary/bg", from: "action/primary" },
  { id: "heading/text", from: "text/primary" },
  { id: "page/bg", from: "bg/canvas" },
  { id: "card/border", from: "bg/subtle" },
  { id: "input/placeholder", from: "text/muted" },
  { id: "discount/text", from: "feedback/success" },
] as const;

// geometry (px): three columns of six cards, with a little air around them
const COL_X = [4, 329, 654];
const CARD_W = 260;
const CARD_H = 47;
const LABEL_Y = 8; // the "01 PRIMITIVES" row above the cards
const ROW0 = 40;
const W = COL_X[2] + CARD_W + 4; // 918
const H = ROW0 + 5 * 56.2 + CARD_H + 4; // about 372
const PITCH = 56.2;
const rowY = (i: number) => ROW0 + i * PITCH;
const cy = (i: number) => rowY(i) + CARD_H / 2;

const ACCENT = CK.accent; // the blue of the checkout's buttons and links

// the cards' own look, per theme (the swatch colours inside them are the tokens' real values and stay as they are)
const SURFACE: Record<Mode, { bg: string; border: string; borderHot: string; name: string; sub: string; swatchBorder: string; shadow: string }> = {
  light: { bg: "#ffffff", border: CK.line, borderHot: "#c9d2df", name: CK.ink, sub: CK.muted, swatchBorder: CK.line, shadow: "0 1px 2px rgba(20,40,80,0.04)" },
  dark: { bg: "#222b3b", border: "#313c50", borderHot: "#4a5870", name: "#f3f6fb", sub: "#9aa6ba", swatchBorder: "#47546b", shadow: "0 1px 2px rgba(0,0,0,0.3)" },
};

const hexOf = (prim: string) => PRIMS.find((p) => p.id === prim)?.hex ?? "#000";

type Edge = { from: string; to: string; x1: number; y1: number; x2: number; y2: number };

function curve(e: Edge) {
  if (e.y1 === e.y2) return `M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}`;
  const xm = (e.x1 + e.x2) / 2;
  return `M ${e.x1} ${e.y1} C ${xm} ${e.y1}, ${xm} ${e.y2}, ${e.x2} ${e.y2}`;
}

function Swatch({ hex, border }: { hex: string; border: string }) {
  return (
    <span
      className="shrink-0"
      style={{ width: 27, height: 27, borderRadius: 7, background: hex, border: `1px solid ${border}`, transition: "background-color 450ms ease, border-color 450ms ease" }}
    />
  );
}

export function ChameleonTokens() {
  const [mode, setMode] = useState<Mode>("light");
  const [hot, setHot] = useState<string | null>(null);

  const semHex = (s: (typeof SEMS)[number]) => hexOf(POINTS[mode][s]);

  // the wires: primitive -> semantic (depends on the theme), semantic -> component (fixed)
  const edges: Edge[] = [
    ...SEMS.map((s, si) => {
      const pi = PRIMS.findIndex((p) => p.id === POINTS[mode][s]);
      return { from: `p:${POINTS[mode][s]}`, to: `s:${s}`, x1: COL_X[0] + CARD_W, y1: cy(pi), x2: COL_X[1], y2: cy(si) };
    }),
    ...COMPS.map((c, ci) => ({ from: `s:${c.from}`, to: `c:${c.id}`, x1: COL_X[1] + CARD_W, y1: cy(SEMS.indexOf(c.from)), x2: COL_X[2], y2: cy(ci) })),
  ];

  // everything connected to the hovered token, up and down the tiers
  const chain = new Set<string>();
  if (hot) {
    chain.add(hot);
    for (let pass = 0; pass < 3; pass++) {
      for (const e of edges) {
        if (chain.has(e.from) && !chain.has(e.to)) chain.add(e.to);
        if (chain.has(e.to) && !chain.has(e.from)) chain.add(e.from);
      }
    }
  }
  const dim = (key: string) => (hot && !chain.has(key) ? 0.28 : 1);

  // called as a function (not used as <Card />), so hovering does not remount the cards
  const surface = SURFACE[mode];
  const card = ({ k, i, col, name, sub, hex }: { k: string; i: number; col: number; name: string; sub: string; hex: string }) => (
    <div
      key={k}
      onPointerEnter={() => setHot(k)}
      onPointerLeave={() => setHot(null)}
      className="absolute flex items-center"
      style={{
        left: COL_X[col], top: rowY(i), width: CARD_W, height: CARD_H, gap: 11, padding: "0 11px", background: surface.bg,
        border: `1px solid ${hot && chain.has(k) ? surface.borderHot : surface.border}`, borderRadius: 12, opacity: dim(k),
        transition: "opacity 220ms ease, border-color 450ms ease, background-color 450ms ease", boxShadow: surface.shadow, cursor: "default",
      }}
    >
      <Swatch hex={hex} border={surface.swatchBorder} />
      <div className="min-w-0">
        <div className="whitespace-nowrap text-[14px] font-medium leading-[17px]" style={{ color: surface.name, transition: "color 450ms ease" }}>{name}</div>
        <div className="mt-[3px] whitespace-nowrap text-[10.5px] leading-[12px]" style={{ color: surface.sub, transition: "color 450ms ease" }}>{sub}</div>
      </div>
    </div>
  );

  return (
    <DeviceCanvas
      // no page behind the diagram: the blocks sit straight on the dotted canvas
      background="transparent"
      color={CK.body}
      border="transparent"
      devices={false}
      fixedWidth={W}
      fixedHeight={H}
      controls={
        // a segmented switch: one pill with a thumb that slides to the chosen side, and an icon + label on each side.
        // It is the same height and text size as the scale pill in the corner (h-8, text-xs), and -top-3 lifts it
        // so it sits on the same line as that pill and the expand button (they are 12px from the top).
        <div role="group" aria-label="Theme" className="relative -top-3 flex h-8 rounded-full border border-stroke bg-fill-surface p-0.5">
          <span
            aria-hidden
            className="absolute rounded-full bg-fg-primary"
            style={{ left: 2, top: 2, width: 72, height: 26, transform: `translateX(${mode === "dark" ? 72 : 0}px)`, transition: "transform 320ms cubic-bezier(0.3, 0.8, 0.3, 1)" }}
          />
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`relative z-10 flex h-[26px] cursor-pointer items-center justify-center gap-1.5 rounded-full text-xs outline-none transition-colors duration-300 ${
                mode === m ? "text-fill-surface" : "text-fg-secondary hover:text-fg-primary"
              }`}
              style={{ width: 72 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {m === "light" ? (
                  <>
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
                  </>
                ) : (
                  <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
                )}
              </svg>
              {m === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      }
    >
      <div className="relative h-full w-full select-none">
        {/* tier labels */}
        {["PRIMITIVES", "SEMANTIC", "COMPONENT"].map((t, c) => (
          <div key={t} className="absolute flex items-center text-[11px] font-medium" style={{ left: COL_X[c] + 2, top: LABEL_Y, height: 22, letterSpacing: "0.14em" }}>
            <span className="text-fg-primary">0{c + 1}</span>
            <span className="ml-3.5 text-fg-secondary">{t}</span>
          </div>
        ))}

        {/* wires (drawn in the page's own text colour, so they show on the light and the dark canvas) */}
        <svg className="pointer-events-none absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden>
          {edges.map((e) => {
            const on = hot ? chain.has(e.from) && chain.has(e.to) : false;
            const op = hot ? (on ? 1 : 0.15) : 1;
            return (
              <g key={`${e.from}>${e.to}`} style={{ opacity: op, transition: "opacity 220ms ease" }}>
                <path d={curve(e)} style={{ stroke: on ? ACCENT : "rgb(var(--fg-primary) / 0.6)" }} strokeWidth={on ? 1.6 : 1} />
                <circle cx={e.x1} cy={e.y1} r="2.4" fill={ACCENT} />
                <circle cx={e.x2} cy={e.y2} r="2.4" fill={ACCENT} />
              </g>
            );
          })}
        </svg>

        {/* tier 1: primitives */}
        {PRIMS.map((p, i) => card({ k: `p:${p.id}`, i, col: 0, name: p.id, sub: p.hex.toUpperCase(), hex: p.hex }))}
        {/* tier 2: semantic */}
        {SEMS.map((s, i) => card({ k: `s:${s}`, i, col: 1, name: s, sub: `→ ${POINTS[mode][s]}`, hex: semHex(s) }))}
        {/* tier 3: component */}
        {COMPS.map((c, i) => card({ k: `c:${c.id}`, i, col: 2, name: c.id, sub: `→ ${c.from}`, hex: semHex(c.from) }))}
      </div>
    </DeviceCanvas>
  );
}
