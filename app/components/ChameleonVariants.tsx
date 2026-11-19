"use client";

import { BTN_STATES, BTN_TYPES, Cap, ChamBtn, type BtnState, type BtnType } from "@/app/components/ChameleonButton";
import { CK } from "@/app/components/checkoutTokens";
import { DeviceCanvas } from "@/app/components/DeviceCanvas";

// Every variant, every state: the button's four types against its four states. Sits on the dotted canvas like the other Chameleon canvases.

const W = 900;
const COL0 = 36; // where the row names start
const COLS = [170, 360, 550, 740]; // where each state column starts
const HEAD_Y = 34;
const ROW_Y = (i: number) => 66 + i * 62;
const CARD_H = 332;

export function ChameleonVariants() {
  return (
    <DeviceCanvas background="transparent" color={CK.body} border="transparent" devices={false} fixedWidth={W} fixedHeight={CARD_H}>
      <div className="relative h-full w-full select-none">
        {/* the matrix */}
        <div className="absolute left-0 top-0" style={{ width: W, height: CARD_H, background: "#fff", border: `1px solid ${CK.line}`, borderRadius: 20, boxShadow: "0 1px 2px rgba(20,40,80,0.04)" }}>
          {BTN_STATES.map((s, c) => (
            <span key={s} className="absolute" style={{ left: COLS[c], top: HEAD_Y }}>
              <Cap>{s}</Cap>
            </span>
          ))}
          {BTN_TYPES.map((t: BtnType, r) => (
            <div key={t}>
              {r > 0 && <span className="absolute" style={{ left: COL0, right: COL0, top: ROW_Y(r) - 13, height: 1, background: CK.line }} />}
              <span className="absolute text-[16px] font-medium capitalize" style={{ left: COL0, top: ROW_Y(r) + 6, color: CK.ink }}>{t}</span>
              {BTN_STATES.map((s: BtnState, c) => (
                <span key={s} className="absolute" style={{ left: COLS[c], top: ROW_Y(r) }}>
                  <ChamBtn type={t} state={s} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </DeviceCanvas>
  );
}
