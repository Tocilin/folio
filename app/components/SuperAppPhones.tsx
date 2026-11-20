"use client";

import type { CSSProperties, ReactNode } from "react";
import { DeviceCanvas } from "@/app/components/DeviceCanvas";

// The Bolt SuperApp dashboard, rebuilt in code: two full phones side by side with a plain black bezel (no
// buttons or reflections), the dashboard on the left and the lower part of it on the right. Static for now;
// the screens are taller than the phones, so they can get an internal scroll later.
//
// Photos and brand logos (avatars, products, Spotify, Amazon, the Bolt wordmark) are placeholders until the
// real assets are in. The rest is built from the real design: dark navy cards, Inter.

const W = 900;
const H = 740;
const SCREEN_W = 330;
const SCREEN_H = 690;
const BEZEL = 9;
const PHONE_W = SCREEN_W + 2 * BEZEL;
const PHONE_H = SCREEN_H + 2 * BEZEL;
const GAP = 78;
const LEFT_X = (W - (2 * PHONE_W + GAP)) / 2;

const NAVY = "#0a0e27"; // the screen
const CARD = "#151a3e"; // the cards on it
const PILL = "#222a5c"; // the wide navy buttons and the round header buttons
const MUTED = "#9ba4c4";
const WHITE = "#ffffff";

const MARGIN = 12;
const CARD_W = SCREEN_W - 2 * MARGIN;

// ---------- small pieces ----------

function Abs({ x, y, w, h, style, children }: { x: number; y: number; w?: number; h?: number; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: w, height: h, ...style }}>
      {children}
    </div>
  );
}

function Card({ y, h, children }: { y: number; h: number; children: ReactNode }) {
  return (
    <Abs x={MARGIN} y={y} w={CARD_W} h={h} style={{ background: CARD, borderRadius: 18 }}>
      {children}
    </Abs>
  );
}

function Kebab({ x, y }: { x: number; y: number }) {
  return (
    <Abs x={x} y={y} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 3.4, height: 3.4, borderRadius: 2, background: MUTED }} />
      ))}
    </Abs>
  );
}

function Chevron({ size = 9 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m3.5 1.5 3.5 3.5-3.5 3.5" />
    </svg>
  );
}

// "Banking >" over a title: the header of every module
function ModuleHead({ kicker, title, arrow }: { kicker: string; title: string; arrow?: "kicker" | "title" }) {
  return (
    <div style={{ padding: "16px 16px 0" }}>
      <div className="flex items-center gap-1" style={{ fontSize: 12, color: MUTED, lineHeight: "14px" }}>
        {kicker}
        {arrow === "kicker" && <Chevron size={8} />}
      </div>
      <div className="flex items-center gap-1.5" style={{ fontSize: 18, fontWeight: 600, lineHeight: "22px", marginTop: 3, color: WHITE }}>
        {title}
        {arrow === "title" && <Chevron size={11} />}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <Abs x={0} y={0} w={SCREEN_W} h={54} style={{ background: NAVY, zIndex: 5 }}>
      <span className="absolute text-[15px] font-semibold" style={{ left: 38, top: 19, color: WHITE, lineHeight: "18px" }}>9:41</span>
      {/* the island */}
      <span className="absolute rounded-full" style={{ left: (SCREEN_W - 98) / 2, top: 11, width: 98, height: 29, background: "#000" }} />
      {/* signal, wifi, battery */}
      <svg className="absolute" style={{ right: 26, top: 21 }} width="66" height="14" viewBox="0 0 66 14" fill={WHITE} aria-hidden>
        <rect x="0" y="9" width="3" height="4" rx="0.8" />
        <rect x="5" y="6.5" width="3" height="6.5" rx="0.8" />
        <rect x="10" y="4" width="3" height="9" rx="0.8" />
        <rect x="15" y="1" width="3" height="12" rx="0.8" />
        <path d="M30 3.2a8.4 8.4 0 0 1 11.6 0l-1.4 1.5a6.4 6.4 0 0 0-8.8 0L30 3.2Zm2.9 3a4.2 4.2 0 0 1 5.8 0l-1.4 1.5a2.2 2.2 0 0 0-3 0l-1.4-1.5ZM35.8 9.6l1.5 1.7-1.5 1.7-1.5-1.7 1.5-1.7Z" />
        <rect x="46.5" y="1.5" width="17" height="10.5" rx="3" fill="none" stroke={WHITE} strokeOpacity="0.45" />
        <rect x="48" y="3" width="14" height="7.5" rx="1.8" />
        <rect x="64.2" y="5" width="1.6" height="3.5" rx="0.8" fillOpacity="0.45" />
      </svg>
    </Abs>
  );
}

function HomeBar() {
  return <span className="absolute rounded-full" style={{ left: (SCREEN_W - 120) / 2, bottom: 8, width: 120, height: 4.5, background: "rgba(255,255,255,0.85)", zIndex: 6 }} />;
}

// a round placeholder for a photo (a head and shoulders on a soft gradient)
function Avatar({ size, tone, ring }: { size: number; tone: [string, string]; ring?: boolean }) {
  return (
    <span className="relative block overflow-hidden rounded-full" style={{ width: size, height: size, background: `linear-gradient(160deg, ${tone[0]}, ${tone[1]})`, boxShadow: ring ? "0 0 0 1.5px rgba(255,255,255,0.14)" : undefined }}>
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
        <circle cx="20" cy="15.5" r="7" fill="rgba(255,255,255,0.55)" />
        <path d="M5.5 40c1-9 7-14 14.5-14s13.5 5 14.5 14Z" fill="rgba(255,255,255,0.45)" />
      </svg>
    </span>
  );
}

function Initials({ size, bg, children }: { size: number; bg: string; children: string }) {
  return (
    <span className="grid place-items-center rounded-full font-medium" style={{ width: size, height: size, background: bg, color: WHITE, fontSize: size * 0.34 }}>
      {children}
    </span>
  );
}

// a tiny trend line with a soft fill under it
function Spark({ color, pts, id }: { color: string; pts: number[]; id: string }) {
  const w = 96;
  const h = 36;
  const step = w / (pts.length - 1);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(h - p * h).toFixed(1)}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L ${w} ${h} L 0 ${h} Z`} fill={`url(#${id})`} />
      <path d={line} stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Phone({ x, children }: { x: number; children: ReactNode }) {
  return (
    <Abs x={x} y={(H - PHONE_H) / 2} w={PHONE_W} h={PHONE_H} style={{ background: "#0b0b0d", borderRadius: 52, boxShadow: "0 0 0 1.5px #2b2e3b, 0 18px 40px rgba(10,20,50,0.25)" }}>
      <Abs x={BEZEL} y={BEZEL} w={SCREEN_W} h={SCREEN_H} style={{ background: NAVY, borderRadius: 43, overflow: "hidden", color: WHITE }}>
        {children}
      </Abs>
    </Abs>
  );
}

// ---------- the left screen: the dashboard ----------

const BALANCE_BAR: [string, number][] = [["#0f9d93", 46], ["#3a84c9", 24], ["#f08a24", 15], ["#e5484d", 15]];
const LEGEND: [string, string, string][] = [
  ["#0f9d93", "Cash", "$12,431.56"],
  ["#3a84c9", "Stock", "$23,231.56"],
  ["#f08a24", "Crypto", "$87,175.66"],
  ["#e5484d", "Points", "$5,231.56"],
];

function LeftScreen() {
  return (
    <>
      <StatusBar />
      {/* header */}
      <Abs x={MARGIN + 4} y={60} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar size={40} tone={["#d9a58a", "#7b4a3a"]} ring />
        <span className="flex items-baseline gap-1.5">
          {/* placeholder for the Bolt wordmark */}
          <span style={{ fontSize: 21, fontWeight: 900, letterSpacing: "-0.03em", fontStyle: "italic" }}>BOLT</span>
          <span style={{ fontSize: 15, color: "#c9cfe6" }}>SuperApp</span>
        </span>
      </Abs>
      <Abs x={SCREEN_W - MARGIN - 4 - 40 - 8 - 40} y={60} w={40} h={40} style={{ background: PILL, borderRadius: 20, display: "grid", placeItems: "center" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={WHITE} aria-hidden><path d="M12 22a2.4 2.4 0 0 0 2.4-2.4H9.6A2.4 2.4 0 0 0 12 22Zm7-6.2V11a7 7 0 0 0-5-6.7V3.6a2 2 0 0 0-4 0v.7A7 7 0 0 0 5 11v4.8l-2 2v1h18v-1l-2-2Z" /></svg>
        <span className="absolute rounded-full" style={{ right: 2, top: 1, width: 8, height: 8, background: "#25b6f2" }} />
      </Abs>
      <Abs x={SCREEN_W - MARGIN - 4 - 40} y={60} w={40} h={40} style={{ background: PILL, borderRadius: 20, display: "grid", placeItems: "center" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden>
          <circle cx="6.5" cy="6.5" r="3.2" fill={WHITE} /><circle cx="17.5" cy="6.5" r="3.2" fill={WHITE} /><circle cx="6.5" cy="17.5" r="3.2" fill={WHITE} />
          <path d="m18.4 13.4-3.2 4.6h2.3l-1 4 3.7-5.1h-2.4l.9-3.5h-.3Z" fill="#25b6f2" />
        </svg>
      </Abs>

      {/* total balance */}
      <Card y={114} h={164}>
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ fontSize: 13, color: MUTED, lineHeight: "16px" }}>Total balance</div>
          <div style={{ fontSize: 32, fontWeight: 700, lineHeight: "38px", marginTop: 3, letterSpacing: "-0.01em" }}>$387,886.66</div>
        </div>
        <Kebab x={CARD_W - 24} y={20} />
        <Abs x={16} y={80} w={CARD_W - 32} h={9} style={{ display: "flex", gap: 0, borderRadius: 5, overflow: "hidden" }}>
          {BALANCE_BAR.map(([c, pct]) => (
            <span key={c} style={{ width: `${pct}%`, background: c }} />
          ))}
        </Abs>
        <Abs x={16} y={102} w={CARD_W - 32} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 9 }}>
          {LEGEND.map(([c, name, val]) => (
            <span key={name} className="flex items-center gap-2" style={{ fontSize: 12.5, color: "#c9cfe6", lineHeight: "16px" }}>
              <span className="shrink-0 rounded-full" style={{ width: 7, height: 7, background: c }} />
              <span className="whitespace-nowrap">{name}: {val}</span>
            </span>
          ))}
        </Abs>
      </Card>

      {/* send again */}
      <Card y={290} h={176}>
        <ModuleHead kicker="Banking" title="Send again" arrow="kicker" />
        <Kebab x={CARD_W - 24} y={22} />
        <Abs x={16} y={84} w={CARD_W - 16} style={{ display: "flex", gap: 9, overflow: "hidden" }}>
          {[
            { n: "Sara", el: <Avatar size={42} tone={["#d8d4d0", "#8b8580"]} /> },
            { n: "Alex", el: <Avatar size={42} tone={["#e0a587", "#8a4b3a"]} /> },
            { n: "Fahid", el: <Initials size={42} bg="#a1107e">FD</Initials> },
            { n: "Jennifer", el: <Avatar size={42} tone={["#f1c548", "#c9821a"]} /> },
            { n: "Anna", el: <Avatar size={42} tone={["#e9c9a4", "#9b7352"]} /> },
            { n: "Ryan", el: <Initials size={42} bg="#5b0fd1">RT</Initials> },
          ].map((p) => (
            <span key={p.n} className="flex shrink-0 flex-col items-center" style={{ gap: 7, width: 42 }}>
              {p.el}
              <span style={{ fontSize: 11.5, color: "#c9cfe6" }}>{p.n}</span>
            </span>
          ))}
        </Abs>
      </Card>

      {/* watchlist (runs off the bottom of the screen) */}
      <Card y={478} h={230}>
        <ModuleHead kicker="Crypto" title="Watchlist" arrow="kicker" />
        <Kebab x={CARD_W - 24} y={22} />
        {[
          { sym: "BTC", chg: "+1.6%", price: "$29,850.15", sub: "2.73 BTC", color: "#ff5a36", tile: "#3a1a30", pts: [0.2, 0.32, 0.18, 0.3, 0.5, 0.44, 0.7, 0.62, 0.85, 0.78] },
          { sym: "ETH", chg: "+0.8%", price: "$10,561.24", sub: "47.61 ETH", color: "#6f73f2", tile: "#1f2257", pts: [0.35, 0.22, 0.4, 0.3, 0.55, 0.42, 0.6, 0.5, 0.72, 0.66] },
        ].map((r, i) => (
          <Abs key={r.sym} x={16} y={86 + i * 62} w={CARD_W - 32} h={48} style={{ display: "flex", alignItems: "center" }}>
            <span className="grid shrink-0 place-items-center" style={{ width: 46, height: 46, borderRadius: 13, background: r.tile }}>
              {r.sym === "BTC" ? (
                <svg width="20" height="22" viewBox="0 0 20 22" fill={r.color} aria-hidden><path d="M6 1v2.6H3.6v1.8H5V16.6H3.6v1.8H6V21h2.2v-2.6h1.5V21h2.2v-2.7c2.4-.1 4.1-1.4 4.1-3.6 0-1.7-1.1-2.9-2.8-3.3 1.2-.4 2-1.4 2-2.8 0-2-1.5-3.1-3.8-3.2V1H9.7v2.6H8.2V1H6Zm2.2 4.4h2.6c1.2 0 1.9.6 1.9 1.6s-.7 1.7-1.9 1.7H8.2V5.4Zm0 5.4h3c1.4 0 2.2.7 2.2 1.9s-.8 1.9-2.2 1.9h-3v-3.8Z" /></svg>
              ) : (
                <svg width="16" height="24" viewBox="0 0 16 24" aria-hidden><path d="M8 0 .4 12.2 8 16.8l7.6-4.6L8 0Z" fill={r.color} /><path d="M8 18.2.4 13.6 8 24l7.6-10.4L8 18.2Z" fill={r.color} fillOpacity="0.7" /></svg>
              )}
            </span>
            <span style={{ marginLeft: 12, width: 54 }}>
              <span className="block" style={{ fontSize: 15, fontWeight: 600, lineHeight: "18px" }}>{r.sym}</span>
              <span className="block" style={{ fontSize: 11.5, color: MUTED, lineHeight: "14px", marginTop: 2 }}>{r.chg}</span>
            </span>
            <span style={{ marginLeft: 6 }}><Spark color={r.color} pts={r.pts} id={`spark-${r.sym}`} /></span>
            <span className="ml-auto text-right">
              <span className="block" style={{ fontSize: 15, fontWeight: 600, lineHeight: "18px" }}>{r.price}</span>
              <span className="block" style={{ fontSize: 11.5, color: MUTED, lineHeight: "14px", marginTop: 2 }}>{r.sub}</span>
            </span>
          </Abs>
        ))}
      </Card>
      <HomeBar />
    </>
  );
}

// ---------- the right screen: the lower part of the dashboard ----------

const TXNS: { name: string; when: string; amount: string; plus?: boolean; icon: ReactNode }[] = [
  { name: "Received from Alex", when: "Sep 18, 01:53PM", amount: "+$100.00", plus: true, icon: <Avatar size={44} tone={["#e0a587", "#8a4b3a"]} /> },
  {
    name: "Spotify", when: "Sep 18, 03:42PM", amount: "-$9.99",
    icon: (
      <span className="grid place-items-center rounded-full" style={{ width: 44, height: 44, background: "#1ed760" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a0e27" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M4.5 9c5-1.4 10-1 15 1.4M5.5 12.8c4.2-1 8.2-.7 12.2 1.2M6.4 16.3c3.3-.7 6.2-.5 9.2.9" /></svg>
      </span>
    ),
  },
  {
    name: "Amazon", when: "Sep 18, 02:15PM", amount: "-$23.15",
    icon: (
      <span className="grid place-items-center rounded-full bg-white" style={{ width: 44, height: 44, color: "#111", fontSize: 24, fontWeight: 700 }}>a</span>
    ),
  },
];

const ORDERS: { name: string; price: string; status: "Shipped" | "Delivered"; art: ReactNode }[] = [
  {
    name: "Polaroid Snap Touch", price: "$123.00", status: "Shipped",
    art: (
      <svg width="62" height="52" viewBox="0 0 62 52" aria-hidden>
        <rect x="2" y="8" width="58" height="42" rx="7" fill="#e8283b" />
        <rect x="18" y="2" width="26" height="9" rx="3" fill="#b81c2d" />
        <circle cx="31" cy="30" r="13" fill="#2a2a30" /><circle cx="31" cy="30" r="8" fill="#4a4a54" />
      </svg>
    ),
  },
  {
    name: "Xbox Matt One Controller", price: "$349.99", status: "Shipped",
    art: (
      <svg width="68" height="48" viewBox="0 0 68 48" aria-hidden>
        <path d="M14 8c8-5 32-5 40 0 8 3 13 16 12 26-1 8-8 10-13 5L45 33H23l-8 6c-5 5-12 3-13-5-1-10 4-23 12-26Z" fill="#f2d21b" />
        <circle cx="21" cy="19" r="4" fill="#b99a0a" /><circle cx="47" cy="25" r="3" fill="#b99a0a" />
      </svg>
    ),
  },
  {
    name: "JBL Wireless Headphones", price: "$999.00", status: "Delivered",
    art: (
      <svg width="62" height="56" viewBox="0 0 62 56" fill="none" aria-hidden>
        <path d="M8 38V28C8 14 18 5 31 5s23 9 23 23v10" stroke="#1d5fd1" strokeWidth="6" strokeLinecap="round" />
        <rect x="3" y="30" width="13" height="22" rx="6" fill="#1d5fd1" /><rect x="46" y="30" width="13" height="22" rx="6" fill="#1d5fd1" />
      </svg>
    ),
  },
];

function RightScreen() {
  return (
    <>
      {/* the transactions card, scrolled so its top is under the status bar */}
      <Card y={8} h={232}>
        {TXNS.map((t, i) => (
          <Abs key={t.name} x={16} y={14 + i * 54} w={CARD_W - 32} h={44} style={{ display: "flex", alignItems: "center" }}>
            {t.icon}
            <span style={{ marginLeft: 12 }}>
              <span className="block" style={{ fontSize: 15, fontWeight: 600, lineHeight: "18px" }}>{t.name}</span>
              <span className="block" style={{ fontSize: 11.5, color: MUTED, lineHeight: "14px", marginTop: 2 }}>{t.when}</span>
            </span>
            <span className="ml-auto" style={{ fontSize: 16, fontWeight: 600, color: t.plus ? "#54e0b0" : "#dfe3f3" }}>{t.amount}</span>
          </Abs>
        ))}
        <Abs x={16} y={176} w={CARD_W - 32} h={42} style={{ background: PILL, borderRadius: 21, display: "grid", placeItems: "center", fontSize: 15, fontWeight: 600 }}>View all</Abs>
      </Card>

      {/* recent orders: the carousel runs off the right edge */}
      <Card y={252} h={244}>
        <ModuleHead kicker="Shopping" title="Recent Orders" arrow="title" />
        <Kebab x={CARD_W - 24} y={22} />
        <Abs x={16} y={80} w={CARD_W - 16} h={160} style={{ display: "flex", gap: 10, overflow: "hidden" }}>
          {ORDERS.map((o) => (
            <span key={o.name} className="flex shrink-0 flex-col" style={{ width: 102 }}>
              <span className="relative grid place-items-center" style={{ width: 102, height: 102, background: "#fff", borderRadius: 14 }}>
                {o.art}
                <span className="absolute left-1.5 top-1.5 rounded-md px-1.5 py-0.5 text-[10.5px] font-medium" style={{ background: o.status === "Shipped" ? "#8a4a07" : "#176b57", color: o.status === "Shipped" ? "#ffd9a3" : "#c8f5e6" }}>{o.status}</span>
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: "16px", marginTop: 8, color: "#e8ebf7" }}>{o.name}</span>
              <span style={{ fontSize: 11.5, color: MUTED, marginTop: 4 }}>{o.price}</span>
            </span>
          ))}
        </Abs>
      </Card>

      {/* need help */}
      <Card y={508} h={104}>
        <div style={{ padding: "16px 16px 0", fontSize: 18, fontWeight: 600, lineHeight: "22px" }}>Need help?</div>
        <Kebab x={CARD_W - 24} y={22} />
        <Abs x={16} y={50} w={CARD_W - 32} h={44} style={{ display: "flex", alignItems: "center" }}>
          <span className="grid shrink-0 place-items-center rounded-full" style={{ width: 40, height: 40, background: PILL, color: "#c9cfe6", fontSize: 18, fontWeight: 600 }}>?</span>
          <span style={{ marginLeft: 12 }}>
            <span className="block" style={{ fontSize: 15, fontWeight: 600, lineHeight: "18px" }}>Bolt Assistant</span>
            <span className="block" style={{ fontSize: 11.5, color: MUTED, lineHeight: "14px", marginTop: 2 }}>Ask me anything</span>
          </span>
          <span className="ml-auto grid place-items-center rounded-full bg-white" style={{ height: 38, padding: "0 18px", color: "#0a0e27", fontSize: 14, fontWeight: 600 }}>Let’s chat</span>
        </Abs>
      </Card>

      <Abs x={MARGIN} y={624} w={CARD_W} h={44} style={{ background: PILL, borderRadius: 22, display: "grid", placeItems: "center", fontSize: 15, fontWeight: 600 }}>Customize my dashboard</Abs>

      <StatusBar />
      <HomeBar />
    </>
  );
}

export function SuperAppPhones() {
  return (
    <DeviceCanvas background="transparent" color="#101418" border="transparent" devices={false} fixedWidth={W} fixedHeight={H}>
      <div role="img" aria-label="The Bolt SuperApp dashboard on two phones" className="relative h-full w-full select-none">
        <Phone x={LEFT_X}><LeftScreen /></Phone>
        <Phone x={LEFT_X + PHONE_W + GAP}><RightScreen /></Phone>
      </div>
    </DeviceCanvas>
  );
}
