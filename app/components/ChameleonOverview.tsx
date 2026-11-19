"use client";

import { Cap, ChamBtn } from "@/app/components/ChameleonButton";
import { CK } from "@/app/components/checkoutTokens";
import { DeviceCanvas } from "@/app/components/DeviceCanvas";

// The design system at a glance: a card with a sample of each part (colour, buttons, type, spacing), over a
// block of the brand blue, and the ingredients as pills on the left. Straight on the dotted canvas.

const W = 900;
const H = 500;

const SWATCHES = [CK.ink, CK.accent, CK.muted, CK.line, CK.page];
const PILLS = ["Tokens", "Components", "Themes", "Accessibility", "Auto layout", "Documentation"];
const SPACING = [2, 4, 6, 8, 12, 16, 24, 32]; // a 4px grid, growing

// The little chameleon drawing (a 140 x 100 line drawing) sits on the canvas. Move it by changing
// these: x and y are its top-left corner on the canvas, w its width (it keeps its proportions).
const CHAMELEON = { x: 144, y: 235, w: 98 }; // by the "Components" pill (x 118 to 267, top edge at y 277), at 0.7 of its first size

export function ChameleonOverview() {
  return (
    <DeviceCanvas background="transparent" color={CK.body} border="transparent" devices={false} fixedWidth={W} fixedHeight={H}>
      <div className="relative h-full w-full select-none">
        {/* the title: "Chameleon" big, "Design System" smaller under it (the page's text colour, as it sits on the canvas) */}
        <div className="absolute" style={{ left: 0, top: 90 }}>
          <div className="font-semibold leading-none text-fg-primary" style={{ fontSize: 78, letterSpacing: "-0.045em" }}>Chameleon</div>
          <div className="mt-3 font-normal leading-none text-fg-secondary" style={{ fontSize: 23, letterSpacing: "-0.015em" }}>White-label design system</div>
        </div>

        {/* the chameleon, drawn in the page's text colour */}
        <span
          aria-hidden
          className="pointer-events-none absolute bg-fg-primary"
          style={{
            left: CHAMELEON.x, top: CHAMELEON.y, width: CHAMELEON.w, aspectRatio: "140 / 100",
            maskImage: "url(/images/checkout/chameleon.svg)", WebkitMaskImage: "url(/images/checkout/chameleon.svg)",
            maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskSize: "contain", WebkitMaskSize: "contain",
          }}
        />

        {/* the ingredients (straight on the canvas, so they take the page's text colour) */}
        <div className="absolute flex flex-wrap" style={{ left: 0, top: 276, width: 420, gap: 12 }}>
          {PILLS.map((p) => (
            <span key={p} className="inline-flex items-center text-[16px] font-medium" style={{ height: 46, padding: "0 24px", borderRadius: 999, border: "1.5px solid rgb(var(--fg-primary))", color: "rgb(var(--fg-primary))", background: "transparent" }}>
              {p}
            </span>
          ))}
        </div>

        {/* the brand block behind the card */}
        <div className="absolute" style={{ left: 640, top: 250, right: 0, bottom: 0, background: CK.accent }} />

        {/* the sample card */}
        <div className="absolute" style={{ left: 430, top: 18, width: 400, height: 464, background: "#fff", border: `1px solid ${CK.line}`, borderRadius: 24, boxShadow: "0 22px 50px -24px rgba(20,40,80,0.35)", padding: "28px 30px" }}>
          <Cap>Color · Light</Cap>
          <div className="mt-3 flex" style={{ gap: 12 }}>
            {SWATCHES.map((c) => (
              <span key={c} style={{ width: 54, height: 54, borderRadius: 14, background: c, border: `1px solid ${CK.line}` }} />
            ))}
          </div>

          <div className="mt-6"><Cap>Button</Cap></div>
          <div className="mt-3 flex" style={{ gap: 12 }}>
            <ChamBtn type="primary" />
            <ChamBtn type="secondary" icon={false} />
          </div>

          <div className="mt-6"><Cap>Type</Cap></div>
          <div className="mt-2 flex items-center" style={{ gap: 18 }}>
            <span className="font-semibold leading-none" style={{ fontSize: 68, letterSpacing: "-0.03em", color: CK.ink }}>Aa</span>
            <div className="leading-snug">
              <div className="text-[14.5px] font-semibold" style={{ color: CK.ink }}>Inter · Interface</div>
              <div className="text-[13px]" style={{ color: CK.muted }}>Source Serif · Heritage</div>
              <div className="text-[13px]" style={{ color: CK.muted }}>JetBrains Mono · Mono</div>
            </div>
          </div>

          <div className="mt-6"><Cap>Spacing · 4px grid</Cap></div>
          <div className="mt-3 flex items-end" style={{ gap: 7, height: 34 }}>
            {SPACING.map((n, i) => (
              <span key={n} style={{ width: n, height: n, borderRadius: Math.max(1, n / 5), background: i === 5 ? CK.accent : CK.ink }} />
            ))}
          </div>
        </div>
      </div>
    </DeviceCanvas>
  );
}
