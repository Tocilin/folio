"use client";

import type { ReactNode } from "react";
import { Cap, ChamBtn } from "@/app/components/ChameleonButton";
import { CK } from "@/app/components/checkoutTokens";
import { DeviceCanvas } from "@/app/components/DeviceCanvas";

// "Documented, not just drawn": a component's anatomy and specs on the left, and its documentation page (what
// the properties are, and a do and a don't) on the right. Two white cards straight on the dotted canvas.

const W = 910;
const H = 404;
const DANGER = "#d92d3a";

const SPECS: [string, string][] = [
  ["Height", "52 · size/lg"],
  ["Padding", "0 24 · space/6"],
  ["Gap", "10 · space/2.5"],
  ["Radius", "12 · radius/button"],
  ["Label", "Inter Semi Bold 18"],
  ["Focus ring", "4 · action/primary"],
];

const TABLE: [string, string, string][] = [
  ["Type", "primary · secondary · tertiary · ghost", "primary"],
  ["State", "default · hover · focused · disabled", "default"],
  ["Label", "text", "Button"],
  ["Show icon", "true · false", "true"],
];

const cardStyle = { background: "#fff", border: `1px solid ${CK.line}`, borderRadius: 20, boxShadow: "0 1px 2px rgba(20,40,80,0.04)" } as const;

// an orange-style callout, here in the action blue
function Tag({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <span className="absolute grid place-items-center text-[11px] font-semibold text-white" style={{ left: x, top: y, height: 22, padding: "0 7px", minWidth: 22, borderRadius: 5, background: CK.accent }}>
      {children}
    </span>
  );
}

function Line({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <span className="absolute" style={{ left: x, top: y, width: w, height: h, background: CK.accent }} />;
}

export function ChameleonDocs() {
  // the anatomy button: where it sits inside the left card
  const BX = 76;
  const BY = 92;
  const BH = 64;
  return (
    <DeviceCanvas background="transparent" color={CK.body} border="transparent" devices={false} fixedWidth={W} fixedHeight={H}>
      <div className="relative h-full w-full select-none">
        {/* anatomy */}
        <div className="absolute left-0 top-0" style={{ ...cardStyle, width: 400, height: H }}>
          <span className="absolute" style={{ left: 24, top: 24 }}>
            <Cap style={{ color: CK.ink }}>Anatomy · Button</Cap>
          </span>

          <span className="absolute" style={{ left: BX, top: BY }}>
            <ChamBtn type="primary" size="lg" />
          </span>
          {/* height: 52 */}
          <Line x={BX - 30} y={BY} w={11} h={1.5} />
          <Line x={BX - 25} y={BY} w={1.5} h={BH} />
          <Line x={BX - 30} y={BY + BH - 1.5} w={11} h={1.5} />
          <Tag x={BX - 64} y={BY + BH / 2 - 11}>52</Tag>
          {/* padding: 24 */}
          <Line x={BX} y={BY + BH + 14} w={1.5} h={12} />
          <Line x={BX} y={BY + BH + 19} w={26} h={1.5} />
          <Line x={BX + 25} y={BY + BH + 14} w={1.5} h={12} />
          <Tag x={BX + 3} y={BY + BH + 31}>24</Tag>
          {/* gap between label and icon: 10 (the label "Button" ends at BX + 100, the arrow starts at BX + 110) */}
          <Line x={BX + 100} y={BY - 22} w={1.5} h={12} />
          <Line x={BX + 100} y={BY - 17} w={11} h={1.5} />
          <Line x={BX + 110} y={BY - 22} w={1.5} h={12} />
          <Tag x={BX + 92} y={BY - 52}>10</Tag>
          {/* radius: r 12 (points at the button's top right corner, which is at BX + 160) */}
          <Line x={BX + 164} y={BY + 6} w={14} h={1.5} />
          <Tag x={BX + 178} y={BY - 5}>r 12</Tag>

          {/* the spec list */}
          <div className="absolute" style={{ left: 24, right: 24, top: 216 }}>
            {SPECS.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between" style={{ height: 28, borderTop: `1px solid ${CK.line}` }}>
                <span className="text-[14px] font-medium" style={{ color: CK.ink }}>{k}</span>
                <span className="text-[12.5px]" style={{ color: CK.muted }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* the documentation page */}
        <div className="absolute top-0" style={{ ...cardStyle, left: 420, width: 490, height: H }}>
          <h4 className="absolute m-0 text-[28px] font-semibold" style={{ left: 25, top: 20, letterSpacing: "-0.025em", color: CK.ink }}>Button</h4>
          <p className="absolute m-0 text-[13.5px] leading-[18px]" style={{ left: 25, top: 66, width: 440, color: CK.muted }}>
            Triggers an action. Use one primary button per view; pair it with secondary or ghost buttons for the rest.
          </p>

          <div className="absolute" style={{ left: 25, right: 25, top: 112 }}>
            <div className="flex items-center" style={{ height: 22, background: "#f0f3f7", borderRadius: 7, paddingLeft: 15 }}>
              <span style={{ width: 86 }}><Cap style={{ fontSize: 10 }}>Property</Cap></span>
              <span style={{ width: 265 }}><Cap style={{ fontSize: 10 }}>Values</Cap></span>
              <Cap style={{ fontSize: 10 }}>Default</Cap>
            </div>
            {TABLE.map(([name, values, def]) => (
              <div key={name} className="flex items-center" style={{ height: 26, paddingLeft: 15, borderBottom: `1px solid ${CK.line}` }}>
                <span className="text-[13.5px] font-semibold" style={{ width: 86, color: CK.ink }}>{name}</span>
                <span className="text-[11.5px]" style={{ width: 265, color: CK.muted }}>{values}</span>
                <span className="text-[11.5px]" style={{ color: CK.ink }}>{def}</span>
              </div>
            ))}
          </div>

          <span className="absolute" style={{ left: 25, top: 252 }}>
            <Cap style={{ color: CK.ink }}>Usage</Cap>
          </span>
          {[
            { good: true, note: "Do · One primary per view", items: [<ChamBtn key="a" />, <ChamBtn key="b" type="ghost" icon={false} />] },
            { good: false, note: "Don’t · Two primaries compete", items: [<ChamBtn key="a" icon={false} />, <ChamBtn key="b" icon={false} />] },
          ].map((box, i) => (
            <div key={box.note} className="absolute overflow-hidden" style={{ left: 25 + i * 227, top: 276, width: 218, height: 100, border: `1px solid ${CK.line}`, borderRadius: 12 }}>
              <div className="flex items-center justify-center" style={{ height: 70, gap: 10, background: "#fbfcfe" }}>
                {box.items}
              </div>
              <div className="flex items-center text-[11.5px] font-medium text-white" style={{ height: 30, padding: "0 12px", gap: 7, background: box.good ? CK.ink : DANGER }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {box.good ? <path d="m3 8.5 3.2 3.2L13 4.8" /> : <path d="m4 4 8 8M12 4l-8 8" />}
                </svg>
                {box.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeviceCanvas>
  );
}
