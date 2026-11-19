"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { DeviceCanvas } from "@/app/components/DeviceCanvas";
import { monoFont, serifFont } from "@/app/components/demoFonts";

// "Chameleon" is a white-label design system, so this canvas shows what white-label means: one set of
// components (color tokens, type, buttons, form controls, a product snippet) that re-skins itself for each
// merchant's brand. It cycles through five brands on its own (it pauses while the mouse is over it); click a
// brand to jump to it; the checkboxes, radios and the product card all work.
//
// Everything reads a handful of CSS variables set on the wrapper (--accent, --soft, --ink, --muted, --line,
// --page, --r for the corner radius, plus the font), and colors / corners ease between brands.

type Brand = {
  id: string;
  name: string;
  accent: string;
  soft: string; // a pale tint of the accent
  ink: string;
  muted: string;
  line: string;
  page: string; // the backdrop behind the cards
  radius: number; // component corner radius, px
  font: string;
  fontName: string;
};

const INTER = "var(--font-inter), Inter, system-ui, sans-serif";
const BRANDS: Brand[] = [
  { id: "ocean", name: "Ocean", accent: "#3370e5", soft: "#e6eefc", ink: "#162033", muted: "#6b7689", line: "#dfe5ee", page: "#f3f6fb", radius: 8, font: INTER, fontName: "Inter" },
  { id: "sunrise", name: "Sunrise", accent: "#ef5d2a", soft: "#fdece4", ink: "#2d1a12", muted: "#8a6e60", line: "#f0dccf", page: "#fff6f0", radius: 18, font: INTER, fontName: "Inter" },
  { id: "forest", name: "Forest", accent: "#0f9d78", soft: "#e0f4ed", ink: "#0e2a22", muted: "#5d8076", line: "#d0e9de", page: "#f1f9f5", radius: 4, font: INTER, fontName: "Inter" },
  { id: "heritage", name: "Heritage", accent: "#1e354e", soft: "#e6eaef", ink: "#0f1a26", muted: "#5c6b7a", line: "#d8dde4", page: "#f4f5f7", radius: 2, font: "var(--font-demo-serif), Georgia, serif", fontName: "Source Serif" },
  { id: "mono", name: "Mono", accent: "#111111", soft: "#ececec", ink: "#000000", muted: "#666666", line: "#d2d2d2", page: "#f6f6f6", radius: 0, font: "var(--font-demo-mono), ui-monospace, Menlo, monospace", fontName: "JetBrains Mono" },
];

// ---------- small helpers ----------

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}
const contrastOnWhite = (hex: string) => 1.05 / (luminance(hex) + 0.05);

const EASE = "background-color 450ms ease, color 450ms ease, border-color 450ms ease, border-radius 450ms ease, box-shadow 450ms ease";
const R = "calc(var(--r) * 1px)"; // a component's corner radius

function Card({ title, children, style }: { title: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <section
      className="flex min-h-0 flex-col"
      style={{
        background: "#fff", border: "1px solid var(--line)", borderRadius: "calc(var(--r) * 1px + 8px)", padding: 20,
        boxShadow: "0 1px 2px rgba(20,30,50,0.04)", transition: EASE, ...style,
      }}
    >
      <h4 className="m-0 mb-3.5 text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.14em", color: "var(--muted)", transition: EASE }}>
        {title}
      </h4>
      {children}
    </section>
  );
}

function Check({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="checkbox" aria-checked={on} onClick={() => onChange(!on)} className="flex cursor-pointer items-center gap-2.5 text-left outline-none">
      <span
        className="grid shrink-0 place-items-center"
        style={{
          width: 18, height: 18, borderRadius: "calc(var(--r) * 0.35px + 1px)", transition: EASE,
          background: on ? "var(--accent)" : "#fff", border: `1.5px solid ${on ? "var(--accent)" : "#aab1bd"}`,
        }}
      >
        {on && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m2.5 6.3 2.4 2.4L9.5 3.6" />
          </svg>
        )}
      </span>
      <span className="whitespace-nowrap text-[13px]" style={{ color: "var(--ink)", transition: EASE }}>{label}</span>
    </button>
  );
}

function Radio({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" role="radio" aria-checked={on} onClick={onChange} className="flex cursor-pointer items-center gap-2.5 text-left outline-none">
      <span className="grid shrink-0 place-items-center rounded-full" style={{ width: 18, height: 18, background: "#fff", transition: EASE, border: `${on ? 5.5 : 1.5}px solid ${on ? "var(--accent)" : "#aab1bd"}` }} />
      <span className="whitespace-nowrap text-[13px]" style={{ color: "var(--ink)", transition: EASE }}>{label}</span>
    </button>
  );
}

function Btn({ kind, children, disabled }: { kind: "primary" | "secondary" | "ghost"; children: ReactNode; disabled?: boolean }) {
  const base: CSSProperties = { height: 38, borderRadius: R, fontSize: 13, fontWeight: 500, transition: EASE, padding: "0 16px", whiteSpace: "nowrap" };
  const look: CSSProperties = disabled
    ? { background: "#eceef2", color: "#a2a9b4", border: "1px solid transparent", cursor: "not-allowed" }
    : kind === "primary"
      ? { background: "var(--accent)", color: "#fff", border: "1px solid var(--accent)" }
      : kind === "secondary"
        ? { background: "#fff", color: "var(--accent)", border: "1.5px solid var(--accent)" }
        : { background: "var(--soft)", color: "var(--accent)", border: "1px solid transparent" };
  return (
    <button type="button" disabled={disabled} className="flex items-center justify-center outline-none hover:brightness-95" style={{ ...base, ...look }}>
      {children}
    </button>
  );
}

// ---------- the canvas ----------

export function ChameleonShowcase() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const b = BRANDS[idx];

  // controls
  const [remember, setRemember] = useState(true);
  const [news, setNews] = useState(false);
  const [ship, setShip] = useState<"std" | "exp">("std");
  const [qty, setQty] = useState(1);
  const [swatch, setSwatch] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % BRANDS.length), 3600);
    return () => window.clearInterval(t);
  }, [paused]);

  const ratio = contrastOnWhite(b.accent);
  const vars = {
    "--accent": b.accent, "--soft": b.soft, "--ink": b.ink, "--muted": b.muted, "--line": b.line, "--page": b.page, "--r": b.radius,
    fontFamily: b.font, color: b.ink, background: b.page, transition: EASE,
  } as CSSProperties;

  return (
    <DeviceCanvas background="#fff" color="#101418" border="#e3e6ec" devices={false} fixedWidth={1000} fixedHeight={620}>
      <div
        data-parallax-block
        className={`${serifFont.variable} ${monoFont.variable} relative flex h-full w-full flex-col`}
        style={{ ...vars, padding: "26px 32px 28px" }}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {/* header: the name, and the brands to switch between */}
        <header className="flex items-center justify-between" style={{ height: 40, marginBottom: 20 }}>
          {/* the chameleon drawing (the same line art as the overview), tinted with the brand colour; it is a little taller than
              the header row, so it is pulled up and left a touch to line up with the card edges below */}
          <span
            role="img"
            aria-label="Chameleon"
            style={{
              display: "block", position: "relative", top: 33, width: 84, height: 60, marginLeft: -6, marginTop: -10, marginBottom: -10, background: "var(--accent)", transition: EASE,
              maskImage: "url(/images/checkout/chameleon.svg)", WebkitMaskImage: "url(/images/checkout/chameleon.svg)",
              maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "left center", WebkitMaskPosition: "left center",
            }}
          />
          <div role="group" aria-label="Brand" className="flex items-center gap-2" style={{ fontFamily: INTER }}>
            {BRANDS.map((x, i) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={i === idx}
                onClick={() => setIdx(i)}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-white outline-none transition-colors"
                style={{ height: 30, padding: "0 13px 0 9px", fontSize: 12, color: "#26303f", border: `1.5px solid ${i === idx ? x.accent : "#dde1e8"}`, fontWeight: i === idx ? 600 : 400 }}
              >
                <span className="rounded-full" style={{ width: 12, height: 12, background: x.accent }} />
                {x.name}
              </button>
            ))}
          </div>
        </header>

        {/* the board */}
        <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2" style={{ gap: 18 }}>
          {/* colour tokens */}
          <Card title="Color">
            <div className="grid flex-1 grid-cols-2" style={{ gap: 10 }}>
              {[
                ["action/primary", b.accent, "var(--accent)", "#fff"],
                ["action/subtle", b.soft, "var(--soft)", "var(--accent)"],
                ["text/primary", b.ink, "var(--ink)", "#fff"],
                ["bg/canvas", b.page, "var(--page)", "var(--muted)"],
              ].map(([name, hex, bg, fg]) => (
                <div key={name} className="flex min-h-0 flex-col justify-end" style={{ background: bg, color: fg, borderRadius: R, padding: "8px 11px", border: "1px solid var(--line)", transition: EASE }}>
                  <div className="text-[12px] font-semibold leading-tight">{name}</div>
                  <div className="text-[10.5px] leading-tight opacity-80" style={{ fontFamily: "var(--font-demo-mono), ui-monospace, monospace" }}>{hex.toUpperCase()}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11.5px]" style={{ color: "var(--muted)", transition: EASE }}>
              <span className="rounded-full px-2 py-0.5 font-semibold" style={{ background: ratio >= 4.5 ? "#e1f5ea" : "#fdecc8", color: ratio >= 4.5 ? "#17744b" : "#8a5a00" }}>
                {ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "AA large"}
              </span>
              White on brand, {ratio.toFixed(1)} : 1
            </div>
          </Card>

          {/* typography */}
          <Card title="Typography">
            <div className="flex items-end gap-4">
              <div className="leading-none" style={{ fontSize: 50, fontWeight: 500, color: "var(--accent)", transition: EASE }}>Aa</div>
              <div className="pb-1.5">
                <div className="text-[14px] font-semibold leading-tight" style={{ color: "var(--ink)", transition: EASE }}>{b.fontName}</div>
                <div className="mt-0.5 text-[11px] leading-tight" style={{ color: "var(--muted)", transition: EASE }}>Regular · Medium · Semibold</div>
              </div>
            </div>
            <div className="mt-3 flex flex-col" style={{ gap: 7 }}>
              {[
                ["Heading 1", "24 / 32 / Medium", 24, 500],
                ["Heading 2", "20 / 24 / Medium", 19, 500],
                ["Body copy", "14 / 20 / Regular", 14, 400],
              ].map(([t, spec, size, weight]) => (
                <div key={t as string} className="flex items-baseline justify-between gap-3" style={{ borderTop: "1px solid var(--line)", paddingTop: 6, transition: EASE }}>
                  <span className="leading-tight" style={{ fontSize: size as number, fontWeight: weight as number, color: "var(--ink)", transition: EASE }}>{t}</span>
                  <span className="shrink-0 text-[10.5px]" style={{ color: "var(--muted)", transition: EASE }}>{spec}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* the product snippet (spans both rows) */}
          <Card title="In the product" style={{ gridRow: "span 2" }}>
            <div className="relative grid place-items-center" style={{ height: 196, background: "var(--soft)", borderRadius: R, transition: EASE }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/checkout/product-airpods.png" alt="" style={{ height: 150, width: "auto", mixBlendMode: "multiply" }} />
              <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10.5px] font-semibold" style={{ background: "var(--accent)", color: "#fff", transition: EASE }}>New</span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <div className="text-[17px] font-semibold leading-tight" style={{ color: "var(--ink)", transition: EASE }}>Apple AirPods</div>
                <div className="mt-1 text-[12px] leading-snug" style={{ color: "var(--muted)", transition: EASE }}>Wireless charging case, up to 24 hours of listening.</div>
              </div>
              <div className="text-[17px] font-semibold" style={{ color: "var(--ink)", transition: EASE }}>$185</div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div role="radiogroup" aria-label="Color" className="flex gap-2.5">
                {["#f3f4f6", "#4b5563", "var(--accent)"].map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={swatch === i}
                    aria-label={`Color ${i + 1}`}
                    onClick={() => setSwatch(i)}
                    className="cursor-pointer rounded-full outline-none"
                    style={{ width: 22, height: 22, background: c, border: "1px solid rgba(0,0,0,0.12)", boxShadow: swatch === i ? "0 0 0 2px #fff, 0 0 0 4px var(--accent)" : "none", transition: EASE }}
                  />
                ))}
              </div>
              <div className="flex items-center" style={{ border: "1px solid var(--line)", borderRadius: R, height: 34, transition: EASE }}>
                <button type="button" aria-label="Fewer" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-full w-8 cursor-pointer place-items-center text-[16px] outline-none" style={{ color: "var(--muted)" }}>−</button>
                <span className="w-6 text-center text-[13px] font-medium tabular-nums" style={{ color: "var(--ink)" }}>{qty}</span>
                <button type="button" aria-label="More" onClick={() => setQty(Math.min(9, qty + 1))} className="grid h-full w-8 cursor-pointer place-items-center text-[16px] outline-none" style={{ color: "var(--muted)" }}>+</button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1400);
              }}
              className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 outline-none hover:brightness-95"
              style={{ height: 46, borderRadius: R, background: "var(--accent)", color: "#fff", fontSize: 14, fontWeight: 600, transition: EASE }}
            >
              {added ? "Added to cart ✓" : `Add to cart · $${185 * qty}`}
            </button>
            <div className="mt-3 flex items-center justify-center gap-4 text-[11px]" style={{ color: "var(--muted)", transition: EASE }}>
              <span>✓ Free delivery</span>
              <span>✓ 30-day returns</span>
            </div>
          </Card>

          {/* buttons */}
          <Card title="Buttons">
            <div className="grid grid-cols-2" style={{ gap: 10 }}>
              <Btn kind="primary">Primary</Btn>
              <Btn kind="secondary">Secondary</Btn>
              <Btn kind="ghost">Soft</Btn>
              <Btn kind="primary" disabled>Disabled</Btn>
            </div>
            <div className="mt-3.5 flex items-center gap-2.5">
              <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: "var(--soft)", color: "var(--accent)", transition: EASE }}>Tag</span>
              <span className="px-2.5 py-1 text-[11px] font-semibold" style={{ background: "var(--accent)", color: "#fff", borderRadius: R, transition: EASE }}>Badge</span>
              <span className="text-[12px] underline underline-offset-2" style={{ color: "var(--accent)", transition: EASE }}>Link</span>
            </div>
          </Card>

          {/* form controls */}
          <Card title="Controls">
            <div className="flex flex-1 flex-col justify-between">
              <div className="grid grid-cols-2" style={{ gap: 16 }}>
                <div className="flex flex-col" style={{ gap: 22 }}>
                  <Check on={remember} onChange={setRemember} label="Checkbox" />
                  <Check on={news} onChange={setNews} label="Checkbox" />
                </div>
                <div className="flex flex-col" style={{ gap: 22 }}>
                  <Radio on={ship === "std"} onChange={() => setShip("std")} label="Radio button" />
                  <Radio on={ship === "exp"} onChange={() => setShip("exp")} label="Radio button" />
                </div>
              </div>
              <div>
                <div className="mb-1.5 text-[11px] font-medium" style={{ color: "var(--muted)", transition: EASE }}>Email</div>
                <div className="flex w-full items-center px-3 text-[12.5px]" style={{ height: 36, borderRadius: R, border: "1.5px solid var(--accent)", boxShadow: "0 0 0 3px var(--soft)", color: "var(--ink)", background: "#fff", transition: EASE }}>
                  you@store.com
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DeviceCanvas>
  );
}
