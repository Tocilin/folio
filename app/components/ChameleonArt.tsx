"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useBlockParallax } from "@/app/components/useBlockParallax";

// The Chameleon illustration, rebuilt in code from the image: a product card with a few design-system
// pieces floating around it (type styles, Brand / Primary colour cards, a button, checkbox and radio
// samples). It is drawn on a 448 x 450 grid; `q()` turns a position or size on that grid into cqw (a
// percentage of the illustration's own width), so the whole thing scales with its box.
//
// Parallax: each piece has a depth. When the mouse moves anywhere over the surrounding block, the pieces
// shift a few pixels, the nearer ones more (and the product card slightly the other way). On leave they
// ease back. Skipped for touch and for people who prefer reduced motion.

const IW = 448;
const IH = 450;
const q = (n: number) => `${((n / IW) * 100).toFixed(3)}cqw`;

const SHADOW = "0 7px 20px rgba(60,40,0,0.13), 0 1px 3px rgba(60,40,0,0.08)";
const BLUE = "#3370e5";
const PURPLE = "#b36fd6";

// A piece of the illustration: placed on the grid, and moved by the parallax variables (--mx, --my are
// the mouse position over the block, from -1 to 1; `depth` is how far it travels, in grid px).
function Layer({ x, y, w, h, depth, z = 1, style, children }: { x: number; y: number; w: number; h: number; depth: number; z?: number; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div
      className="absolute"
      style={{
        left: q(x), top: q(y), width: q(w), height: q(h), zIndex: z,
        transform: `translate3d(calc(var(--mx, 0) * ${((depth / IW) * 100).toFixed(3)}cqw), calc(var(--my, 0) * ${((depth / IW) * 100).toFixed(3)}cqw), 0)`,
        transition: "transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Text / shape placed inside a layer, in grid px from the layer's top-left corner. `cy` = vertical centre.
function Text({ x, cy, s, w = 400, c = "#101418", children, align = "left" }: { x: number; cy: number; s: number; w?: number; c?: string; children: ReactNode; align?: "left" | "right" }) {
  const lh = s * 1.3;
  return (
    <span
      className="absolute whitespace-nowrap"
      style={{
        [align === "left" ? "left" : "right"]: q(x), top: q(cy - lh / 2), fontSize: q(s), lineHeight: q(lh), fontWeight: w, color: c,
      }}
    >
      {children}
    </span>
  );
}

function Watch() {
  return (
    <svg className="absolute" style={{ left: q(7), top: q(17), width: q(36), height: q(48) }} viewBox="0 0 36 48" aria-hidden>
      <rect x="9" y="0" width="18" height="48" rx="5" fill="#2a2e35" />
      <circle cx="18" cy="24" r="16" fill="#16181d" />
      <circle cx="18" cy="24" r="12.5" fill="#222833" />
      <circle cx="18" cy="24" r="10" fill="none" stroke="#62708a" strokeWidth="0.8" strokeDasharray="1.4 2" />
      <path d="M18 24v-7M18 24l5 3" stroke="#e8edf6" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ColourCard({ x, y, h, depth, z, dot, name, hex }: { x: number; y: number; h: number; depth: number; z: number; dot: string; name: string; hex: string }) {
  return (
    <Layer x={x} y={y} w={87} h={h} depth={depth} z={z} style={{ background: "#fff", borderRadius: q(6), boxShadow: SHADOW }}>
      <span className="absolute" style={{ left: q(8), top: q(8), width: q(71), height: q(72), background: "#f2f4f8", borderRadius: q(3) }} />
      <span className="absolute rounded-full" style={{ left: q(25), top: q(25), width: q(38), height: q(38), background: dot }} />
      <Text x={7} cy={93} s={14.5} w={400}>{name}</Text>
      <Text x={7} cy={113} s={9} c="#7d8590">{hex}</Text>
    </Layer>
  );
}

function Check({ on, cy }: { on?: boolean; cy: number }) {
  return (
    <span
      className="absolute grid place-items-center"
      style={{
        left: q(23), top: q(cy - 8), width: q(16), height: q(16), borderRadius: q(3),
        background: on ? BLUE : "transparent", border: on ? "none" : `${q(1.6)} solid #9aa2ad`,
      }}
    >
      {on && (
        <svg style={{ width: q(10), height: q(10) }} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m2.5 6.3 2.4 2.4L9.5 3.6" />
        </svg>
      )}
    </span>
  );
}

function Radio({ on, cy }: { on?: boolean; cy: number }) {
  return (
    <span
      className="absolute grid place-items-center rounded-full"
      style={{ left: q(20), top: q(cy - 9), width: q(18), height: q(18), border: `${q(on ? 2 : 1.6)} solid ${on ? BLUE : "#9aa2ad"}` }}
    >
      {on && <span className="rounded-full" style={{ width: q(9), height: q(9), background: BLUE }} />}
    </span>
  );
}

export function ChameleonArt() {
  const root = useRef<HTMLDivElement>(null);

  useBlockParallax(root);

  return (
    <div ref={root} aria-hidden className="relative w-full select-none [container-type:inline-size]" style={{ aspectRatio: `${IW} / ${IH}` }}>
      {/* product card (the back layer, moves a touch the other way) */}
      <Layer x={76} y={172} w={311} h={96} depth={-4} z={1} style={{ background: "#fff", borderRadius: q(20), boxShadow: SHADOW }}>
        <Watch />
        <Text x={89} cy={30} s={15} w={500}>Google Pixel Watch</Text>
        <Text x={89} cy={48} s={13.5}>Case Size : 45 mm, Material: Steel</Text>
        <Text x={89} cy={66} s={12.5} c="#7d8590">Qty: 1</Text>
        <Text x={40} cy={65} s={14.5} w={500} align="right">$185.00</Text>
      </Layer>

      {/* type styles */}
      <Layer x={32} y={138} w={80} h={110} depth={6} z={2} style={{ background: "#fff", borderRadius: q(5), boxShadow: SHADOW }}>
        {[
          ["Heading 1", "24 / 32 / Medium", 16, 28],
          ["Heading 2", "20 / 24 / Medium", 47, 62],
          ["Heading 3", "16 / 20 / Medium", 78, 93],
        ].map(([h, s, a, b]) => (
          <span key={h as string}>
            <Text x={8} cy={a as number} s={12.5} w={500}>{h as string}</Text>
            <Text x={8} cy={b as number} s={8} c="#8a929c">{s as string}</Text>
          </span>
        ))}
      </Layer>

      {/* colour cards */}
      <ColourCard x={240} y={95} h={131} depth={10} z={3} dot="#3974fd" name="Brand" hex="#3974FD" />
      <ColourCard x={331} y={70} h={131} depth={14} z={4} dot="#1e354e" name="Primary" hex="#1E354E" />

      {/* button */}
      <Layer x={32} y={260} w={143} h={52} depth={5} z={2} style={{ background: BLUE, borderRadius: q(5), boxShadow: "0 5px 14px rgba(51,112,229,0.28)", display: "grid", placeItems: "center" }}>
        <span style={{ color: "#fff", fontSize: q(16), fontWeight: 400 }}>Button</span>
      </Layer>

      {/* checkbox + radio samples (dashed frames) */}
      <Layer x={190} y={273} w={60} h={101} depth={8} z={2} style={{ border: `${q(1.6)} dashed ${PURPLE}`, borderRadius: q(4) }}>
        <Check on cy={30} />
        <Check cy={71} />
      </Layer>
      <Layer x={262} y={258} w={59} h={99} depth={11} z={2} style={{ border: `${q(1.6)} dashed ${PURPLE}`, borderRadius: q(4) }}>
        <Radio on cy={29} />
        <Radio cy={68} />
      </Layer>
    </div>
  );
}
