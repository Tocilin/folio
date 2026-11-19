"use client";

import type { ReactNode } from "react";
import { CK } from "@/app/components/checkoutTokens";
import { DeviceCanvas } from "@/app/components/DeviceCanvas";
import { PaymentBadge } from "@/app/components/PaymentBadge";

// Accessibility, as a before and after on one card number field. Left: the field as it often ships, failing WCAG 2.2 AA.
// Right: the same field done properly. Under each field a short checklist says exactly what was measured or checked,
// with the numbered markers on the field pointing at the matching row. Both fields are shown with keyboard focus
// already on them (not interactive), so the focus indicator can be compared.
//
// The contrast ratios are computed from the real colours below (WCAG relative luminance), not typed in.

const W = 900;
const H = 470;
const CARD_W = 436;
const PAD = 32;
const FIELD_W = CARD_W - PAD * 2;

const FAIL = "#cf3030";
const PASS = "#3a9a3a";

// ---------- contrast, straight from the WCAG formula ----------

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
const fmt = (n: number) => `${n.toFixed(1)} : 1`;

// ---------- the two versions of the field ----------

type Version = {
  ok: boolean;
  badge: string;
  summary: string;
  label: string; // label colour
  value: string; // value colour
  border: string;
  borderW: number;
  ring: boolean; // a visible focus ring
  rows: { name: string; sc: string; result: string; need: string }[];
};

const BG = "#ffffff";

function build(ok: boolean): Version {
  const label = ok ? "#10151c" : "#9aa1ad";
  const value = ok ? "#10151c" : "#8d95a4";
  const border = ok ? "#767b84" : "#d3d7de";
  const text = Math.min(ratio(label, BG), ratio(value, BG));
  return {
    ok,
    badge: ok ? "Passes WCAG 2.2 AA" : "Fails WCAG 2.2 AA",
    summary: ok ? "5 of 5 checks" : "0 of 5 checks",
    label, value, border, borderW: ok ? 1.5 : 1, ring: ok,
    rows: [
      { name: "Text contrast", sc: "1.4.3", result: fmt(text), need: "needs 4.5 : 1" },
      { name: "Border contrast", sc: "1.4.11", result: fmt(ratio(border, BG)), need: "needs 3 : 1" },
      { name: "Accessible name", sc: "4.1.2", result: ok ? "Card Number" : "None", need: ok ? "label for field" : "screen reader says “edit text”" },
      { name: "Visible focus", sc: "2.4.7", result: ok ? "2 px ring" : "None", need: ok ? "keyboard focus" : "outline removed" },
      { name: "Input purpose", sc: "1.3.5", result: ok ? "cc-number" : "None", need: ok ? "autofill works" : "no autocomplete" },
    ],
  };
}
const VERSIONS = [build(false), build(true)];

// ---------- small pieces ----------

function Badge({ v }: { v: Version }) {
  return (
    <span className="inline-flex items-center text-[16px] font-semibold leading-none text-white" style={{ height: 34, padding: "0 13px 0 11px", gap: 8, background: v.ok ? PASS : FAIL }}>
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {v.ok ? <path d="m3.5 10.5 4.2 4.2L16.5 5.5" /> : <path d="m4.5 4.5 11 11M15.5 4.5l-11 11" />}
      </svg>
      {v.badge}
    </span>
  );
}

// the numbered marker: on the field, and again in front of its row
function Dot({ n, ok, style }: { n: number; ok: boolean; style?: React.CSSProperties }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full text-[10.5px] font-semibold leading-none text-white" style={{ width: 18, height: 18, background: ok ? PASS : FAIL, ...style }}>
      {n}
    </span>
  );
}

function Key({ children }: { children: ReactNode }) {
  return (
    <span className="inline-grid place-items-center text-[11px] font-medium leading-none" style={{ height: 20, padding: "0 7px", borderRadius: 5, background: "#f0f3f7", border: `1px solid ${CK.line}`, borderBottomWidth: 2, color: CK.ink }}>
      {children}
    </span>
  );
}

function Panel({ v }: { v: Version }) {
  return (
    <div className="absolute top-0" style={{ left: v.ok ? W - CARD_W : 0, width: CARD_W, height: H, background: "#fff", border: `1px solid ${CK.line}`, borderRadius: 20, boxShadow: "0 1px 2px rgba(20,40,80,0.04)" }}>
      {/* verdict */}
      <div className="absolute flex items-center justify-between" style={{ left: PAD, right: PAD, top: 28 }}>
        <Badge v={v} />
        <span className="text-[12.5px]" style={{ color: CK.muted }}>{v.summary}</span>
      </div>

      {/* the field, with keyboard focus already on it */}
      <span className="absolute text-[16px] font-medium leading-5" style={{ left: PAD, top: 86, color: v.label }}>Card Number</span>
      <Dot n={3} ok={v.ok} style={{ position: "absolute", left: PAD + 102, top: 80 }} />
      <div
        className="absolute flex items-center justify-between"
        style={{
          left: PAD, top: 116, width: FIELD_W, height: 55, padding: "0 12px 0 15px", background: BG, border: `${v.borderW}px solid ${v.border}`, borderRadius: 2,
          boxShadow: v.ring ? `0 0 0 2px #fff, 0 0 0 4px ${CK.accent}` : "none",
        }}
      >
        <span className="flex items-center text-[19px] tabular-nums" style={{ color: v.value }}>
          4242 1244 5567 8769
          {/* the caret: focus is here, whether or not anything else shows it */}
          <span style={{ width: 1.5, height: 24, marginLeft: 2, background: v.value }} />
        </span>
        <PaymentBadge name="visa" h={28} />
      </div>
      <Dot n={1} ok={v.ok} style={{ position: "absolute", left: PAD + 206, top: 107 }} />
      <Dot n={2} ok={v.ok} style={{ position: "absolute", left: PAD + FIELD_W - 9, top: 107 }} />
      <Dot n={4} ok={v.ok} style={{ position: "absolute", left: PAD - 9, top: 116 + 55 - 9 }} />

      {/* the keyboard cue */}
      <div className="absolute flex items-center text-[12px]" style={{ left: PAD, top: 188, gap: 9, color: CK.muted }}>
        <Key>Tab</Key>
        <span>Focused with the keyboard</span>
      </div>

      {/* the checklist */}
      <div className="absolute" style={{ left: PAD, right: PAD, top: 232 }}>
        {v.rows.map((r, i) => (
          <div key={r.name} className="flex items-center justify-between" style={{ height: 40, borderTop: `1px solid ${CK.line}` }}>
            <span className="flex items-center" style={{ gap: 10 }}>
              <Dot n={i + 1} ok={v.ok} />
              <span className="text-[14px] font-medium" style={{ color: CK.ink }}>{r.name}</span>
              <span className="text-[11.5px]" style={{ color: CK.muted }}>{r.sc}</span>
            </span>
            <span className="flex flex-col items-end leading-none" style={{ gap: 3 }}>
              <span className="text-[13px] font-semibold" style={{ color: v.ok ? "#2b7a2b" : FAIL }}>{r.result}</span>
              <span className="text-[10.5px]" style={{ color: CK.muted }}>{r.need}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChameleonAccessibility() {
  return (
    <DeviceCanvas background="transparent" color={CK.body} border="transparent" devices={false} fixedWidth={W} fixedHeight={H}>
      <div className="relative h-full w-full select-none">
        {VERSIONS.map((v) => (
          <Panel key={v.badge} v={v} />
        ))}
      </div>
    </DeviceCanvas>
  );
}
