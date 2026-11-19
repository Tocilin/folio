import type { CSSProperties, ReactNode } from "react";
import { CheckoutCardsLayout } from "@/app/components/CheckoutCardsLayout";
import { CK } from "@/app/components/checkoutTokens";

// A static, code-built recreation of the Commerce Center "Checkout Settings" screenshot (a merchant
// tool with a settings column and a live checkout preview). Nothing here is interactive.
//
// Everything is placed with absolute coordinates measured from the screenshot, so the numbers below are
// screenshot pixels; `Abs` / `T` subtract the app's top-left corner (OX, OY). Inter for all text, except
// the logo, which is the real JPMorganChase SVG.
// The finished mock is COMMERCE_W x COMMERCE_H.

export const COMMERCE_W = 1338;
export const COMMERCE_H = 842;
const OX = 120;
const OY = 255;

const INK = "#161616";
const MUTED = "#6a6a6a";
const LINE = "#dcdcdc";

// the embedded page: the mobile version of the checkout (laid out at 375px wide, like the Mobile view in the
// first canvas), shown in a phone-shaped frame and shrunk a little. Only the top of the page is visible.
const PAGE_W = 375;
// The whole phone is drawn at PHONE_K of its first size (290 x 582 screen, 10px frame, 32px status strip),
// centred where it was: on x = 1092.5 and y = 770 (the middle of the preview area).
const PHONE_K = 0.92; // was 0.77; the phone is 602 x PHONE_K tall and the preview area is 656 tall
const SCREEN_W = Math.round(290 * PHONE_K); // the visible screen, in app px
const SCREEN_H = Math.round(582 * PHONE_K);
const BEZEL = Math.round(10 * PHONE_K); // black frame thickness
const STATUS_H = Math.round(32 * PHONE_K); // strip at the top of the screen that holds the notch; the page starts below it
const PAGE_SCALE = SCREEN_W / PAGE_W;
// how far the checkout page is scrolled in the phone, in the page's own px: far enough that the Place Order button
// (its bottom is at about 1266) shows near the bottom of the screen, with the cards above it.
const PAGE_SCROLL = 575;
const PHONE_X = 1092.5 - (SCREEN_W + 2 * BEZEL) / 2;
const PHONE_Y = 770 - (SCREEN_H + 2 * BEZEL) / 2;

// ---------- placement helpers ----------

function Abs({ x, y, w, h, className = "", style, children }: { x: number; y: number; w?: number; h?: number; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={`absolute ${className}`} style={{ left: x - OX, top: y - OY, width: w, height: h, ...style }}>
      {children}
    </div>
  );
}

// Text placed by its left edge (or right edge / centre) and the y of its vertical centre.
function T({
  x, cy, s = 12, w = 400, c = INK, align = "left", ls, style, children,
}: {
  x: number; cy: number; s?: number; w?: number; c?: string; align?: "left" | "right" | "center"; ls?: string; style?: CSSProperties; children: ReactNode;
}) {
  const lh = Math.round(s * 1.4);
  return (
    <div
      className="absolute whitespace-nowrap"
      style={{
        left: x - OX, top: cy - OY - lh / 2, fontSize: s, lineHeight: `${lh}px`, fontWeight: w, color: c, letterSpacing: ls,
        transform: align === "right" ? "translateX(-100%)" : align === "center" ? "translateX(-50%)" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ---------- icons (simple outlines) ----------

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Icon({ cx, cy, size = 14, color = INK, children }: { cx: number; cy: number; size?: number; color?: string; children: ReactNode }) {
  return (
    <Abs x={cx - size / 2} y={cy - size / 2} w={size} h={size} style={{ color }}>
      <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
        {children}
      </svg>
    </Abs>
  );
}

const Chevron = ({ cx, cy, size = 10, dir = "down", color = INK }: { cx: number; cy: number; size?: number; dir?: "down" | "right" | "left"; color?: string }) => (
  <Icon cx={cx} cy={cy} size={size} color={color}>
    {dir === "down" ? <path d="m3 6 5 5 5-5" /> : dir === "right" ? <path d="m6 3 5 5-5 5" /> : <path d="m10 3-5 5 5 5" />}
  </Icon>
);

const CopyIcon = ({ cx, cy }: { cx: number; cy: number }) => (
  <Icon cx={cx} cy={cy} size={11}>
    <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
    <path d="M10.5 3.5v-.5a1 1 0 0 0-1-1H3.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" />
  </Icon>
);

// ---------- pieces ----------

function NavItem({ cy, label, chevron, icon }: { cy: number; label: string; chevron?: boolean; icon: ReactNode }) {
  return (
    <>
      <Icon cx={150} cy={cy} size={14}>{icon}</Icon>
      <T x={172} cy={cy} s={11.5} w={500}>{label}</T>
      {chevron && <Chevron cx={359} cy={cy} size={11} />}
    </>
  );
}

function SelectLine({ x, w, cy, label, chevronX }: { x: number; w: number; cy: number; label: string; chevronX: number }) {
  return (
    <>
      <T x={x + 2} cy={cy} s={10}>{label}</T>
      <Chevron cx={chevronX} cy={cy} size={9} />
      <Abs x={x} y={cy + 7} w={w} h={1} style={{ background: "#555" }} />
    </>
  );
}

export function CommerceCenterMock() {
  return (
    <div
      role="img"
      aria-label="Commerce Center, Checkout Settings: segment settings on the left and a live checkout page preview on the right"
      className="relative select-none overflow-hidden"
      style={{ width: COMMERCE_W, height: COMMERCE_H, background: "#f8f8f8", color: INK }}
    >
      {/* ---------- top bar ---------- */}
      <Icon cx={150} cy={281} size={14}><path d="M2 4h12M2 8h12M2 12h12" /></Icon>
      {/* the real JPMorganChase logo, from jpmorganchase.com (1000 x 141.83 SVG) */}
      <Abs x={184} y={272} w={127} h={18}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/checkout/jpmorganchase-logo.svg" alt="" width={127} height={18} style={{ width: 127, height: 18, display: "block" }} />
      </Abs>
      <T x={733} cy={281} s={12} w={600}>Commerce Center</T>
      <Chevron cx={837} cy={282} size={7} />

      <Icon cx={1307} cy={281} size={14}><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3.5 3.5" /></Icon>
      <Icon cx={1341} cy={281} size={14}><rect x="2" y="2" width="12" height="12" rx="1.5" /><path d="M6.3 6.2a1.8 1.8 0 1 1 2.6 1.6c-.6.3-.9.7-.9 1.3M8 11.3v.2" /></Icon>
      <Icon cx={1375} cy={281} size={14}><path d="M3.5 11.5h9l-1.2-1.6V7a3.3 3.3 0 0 0-6.6 0v2.9L3.5 11.5ZM6.6 13.5a1.5 1.5 0 0 0 2.8 0" /></Icon>
      <Abs x={1377} y={267} w={13} h={13} style={{ borderRadius: 999, background: "#2f6fb4", color: "#fff", fontSize: 8, fontWeight: 600, display: "grid", placeItems: "center" }}>3</Abs>
      <Abs x={1409} y={268} w={26} h={26} style={{ borderRadius: 999, background: "#2f6fb4", color: "#fff", fontSize: 8, fontWeight: 600, display: "grid", placeItems: "center" }}>AK</Abs>

      {/* ---------- left navigation ---------- */}
      <NavItem cy={324} label="Home" icon={<path d="M2.5 7.5 8 2.5l5.5 5M4 6.8V13h8V6.8" />} />
      <NavItem cy={357} label="Virtual Terminal" chevron icon={<><rect x="2" y="4" width="12" height="8" rx="1.2" /><path d="M2 7h12M4.5 10h2" /></>} />
      <NavItem cy={391} label="Transactions" icon={<><rect x="3" y="2" width="10" height="12" rx="1" /><path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" /></>} />
      <NavItem cy={424} label="Insights" chevron icon={<><path d="M2.5 11.5a5.5 5.5 0 1 1 11 0" /><path d="m8 11 2.4-3.6" /></>} />
      <NavItem cy={457} label="Reports" chevron icon={<><rect x="3" y="2" width="10" height="12" rx="1" /><path d="m7 6 3 2-3 2Z" /></>} />
      <NavItem cy={491} label="Fraud Intelligence" chevron icon={<><path d="M8 2 2 4.6 8 7l6-2.4L8 2ZM4.5 6.6v3c0 1 1.6 2 3.5 2s3.5-1 3.5-2v-3" /></>} />

      <Abs x={129} y={934} w={244} h={1} style={{ background: "#dedede" }} />
      <Abs x={129} y={949} w={244} h={33} style={{ background: "#ebebeb" }} />
      <Abs x={129} y={949} w={3} h={33} style={{ background: "#d9541e" }} />
      <NavItem cy={965} label="Settings" icon={<><circle cx="8" cy="8" r="2.2" /><path d="M8 1.8v2M8 12.2v2M1.8 8h2M12.2 8h2M3.6 3.6 5 5M11 11l1.4 1.4M12.4 3.6 11 5M5 11l-1.4 1.4" /></>} />
      <NavItem cy={999} label="Activity Log" icon={<><rect x="2.5" y="3" width="11" height="10" rx="1" /><path d="M2.5 6.5h11M6.5 6.5V13" /></>} />
      <NavItem cy={1032} label="Learning Center" icon={<><rect x="2.5" y="3" width="11" height="10" rx="1" /><path d="M2.5 6.5h11M6.5 6.5V13" /></>} />
      <NavItem cy={1065} label="Users (If Admin)" icon={<><circle cx="8" cy="5.5" r="2.5" /><path d="M3 13.5c.4-2.6 2.3-4 5-4s4.6 1.4 5 4" /></>} />

      {/* ---------- content panel ---------- */}
      <Abs x={394} y={308} w={1049} h={789} style={{ background: "#fff", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />

      <Chevron cx={423} cy={345} size={8} dir="left" />
      <T x={431} cy={345} s={9.5} w={600} ls="0.08em">BACK</T>
      <T x={417} cy={377} s={20} w={500} ls="-0.01em">Checkout Settings</T>

      <T x={1135} cy={378} s={9.5} c={MUTED}>Merchant ID</T>
      <SelectLine x={1198} w={218} cy={378} label="United States Merchant - 1234567890" chevronX={1408} />

      {/* segment */}
      <T x={421} cy={424} s={12} w={600}>Default Segment</T>
      <Chevron cx={529} cy={424} size={10} />
      <Icon cx={727} cy={424} size={12}><circle cx="8" cy="3" r="1" fill="currentColor" /><circle cx="8" cy="8" r="1" fill="currentColor" /><circle cx="8" cy="13" r="1" fill="currentColor" /></Icon>
      <T x={421} cy={447} s={9.5} c={MUTED}>This segment is used for carts over $5,000</T>
      <T x={421} cy={467} s={9} c={MUTED}>Last Saved</T>
      <T x={421} cy={482} s={10}>05/17/2024 at 12:00pm</T>
      <CopyIcon cx={542} cy={482} />
      <T x={586} cy={467} s={9} c={MUTED}>Segment ID</T>
      <T x={586} cy={482} s={10}>1234567890</T>
      <CopyIcon cx={654} cy={482} />
      <Abs x={421} y={503} w={316} h={1} style={{ background: LINE }} />

      {[
        ["Integration", 527], ["Design", 568], ["Payment info", 609], ["Widgets", 650], ["Notifications", 691], ["Security and controls", 732],
      ].map(([label, cy]) => (
        <span key={label as string}>
          <Chevron cx={432} cy={cy as number} size={10} dir="right" />
          <T x={447} cy={cy as number} s={11.5} w={500}>{label as string}</T>
        </span>
      ))}

      <Abs x={432} y={1023} w={290} h={19} style={{ background: "#3f7b9c", color: "#fff", fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", display: "grid", placeItems: "center" }}>SAVE</Abs>
      <Abs x={432} y={1046} w={290} h={18} style={{ background: "#6c6f73", color: "#fff", fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", display: "grid", placeItems: "center" }}>DISCARD CHANGES</Abs>


      {/* ---------- preview panel ---------- */}
      <Abs x={760} y={407} w={665} h={690} style={{ background: "#f4f5f6", border: "1px solid #bdbdbd" }} />
      <Abs x={761} y={408} w={663} h={33} style={{ background: "#f1f2f3", borderBottom: "1px solid #d6d6d6" }} />
      <T x={775} cy={425} s={9} c={MUTED}>Preview</T>
      <SelectLine x={817} w={86} cy={425} label="Checkout Page" chevronX={897} />
      <Abs x={911} y={417} w={33} h={17} style={{ background: "#efe3c6", color: "#6a5a2e", fontSize: 9, display: "grid", placeItems: "center" }}>Edited</Abs>

      {/* device buttons */}
      <Abs x={1037} y={417} w={83} h={17} style={{ border: "1px solid #8a8a8a", background: "#fff" }} />
      <Abs x={1038} y={418} w={19} h={15} style={{ background: "#333" }} />
      <Icon cx={1047} cy={425} size={10} color="#fff"><rect x="4.5" y="1.5" width="7" height="13" rx="1.2" /></Icon>
      <Icon cx={1068} cy={425} size={10}><rect x="3" y="1.5" width="10" height="13" rx="1.2" /></Icon>
      <Icon cx={1088} cy={425} size={11}><rect x="1.5" y="3" width="13" height="9" rx="1" /></Icon>
      <Icon cx={1109} cy={425} size={10}><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" /></Icon>

      <SelectLine x={1137} w={56} cy={425} label="USD" chevronX={1185} />
      <SelectLine x={1211} w={93} cy={425} label="Guest User" chevronX={1296} />
      <SelectLine x={1321} w={88} cy={425} label="English US" chevronX={1401} />

      {/* the preview, as a phone: a black rounded frame around the real checkout page (the Member page from the
          first canvas) at its mobile width. Not interactive. */}
      <Abs x={PHONE_X} y={PHONE_Y} w={SCREEN_W + 2 * BEZEL} h={SCREEN_H + 2 * BEZEL} style={{ background: "#0b0b0d", borderRadius: 40 * PHONE_K, boxShadow: "0 8px 24px rgba(20,30,60,0.22)" }} />
      <Abs x={PHONE_X + BEZEL} y={PHONE_Y + BEZEL} w={SCREEN_W} h={SCREEN_H} className="overflow-hidden" style={{ background: CK.page, borderRadius: 30 * PHONE_K }}>
        {/* status strip with the notch (a pill, like a dynamic island) */}
        <div className="absolute inset-x-0 top-0 bg-white" style={{ height: STATUS_H }}>
          <span className="absolute left-1/2 -translate-x-1/2 rounded-full" style={{ top: 9 * PHONE_K, width: 78 * PHONE_K, height: 21 * PHONE_K, background: "#0b0b0d" }} />
        </div>
        <div className="absolute inset-x-0 overflow-hidden" style={{ top: STATUS_H, height: SCREEN_H - STATUS_H }}>
          <div
            aria-hidden
            // inert + pointer-events: none: it is a picture of the page, not a working one
            inert
            className="pointer-events-none origin-top-left [container-type:inline-size]"
            style={{ width: PAGE_W, height: (SCREEN_H - STATUS_H) / PAGE_SCALE, transform: `scale(${PAGE_SCALE}) translateY(${-PAGE_SCROLL}px)`, background: CK.page, color: CK.body }}
          >
            <CheckoutCardsLayout />
          </div>
        </div>
      </Abs>
    </div>
  );
}
