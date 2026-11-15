"use client";

import { useState, type CSSProperties, type InputHTMLAttributes, type ReactNode } from "react";
import { JetBrains_Mono, Source_Serif_4 } from "next/font/google";

const serifFont = Source_Serif_4({ subsets: ["latin"], variable: "--font-demo-serif", display: "swap" });
const monoFont = JetBrains_Mono({ subsets: ["latin"], variable: "--font-demo-mono", display: "swap" });

// A from-scratch HTML/CSS checkout card, shown on a dot-grid canvas with three
// switches: layout (tabs or stacked list), label style (above, floating, or on
// the left), font and colour theme. Everything is live HTML:
// selectable text, real inputs, and a card form that formats as you type.

type Method = "card" | "bank" | "apple" | "google" | "paypal" | "affirm";
type Layout = "tabs" | "stacked";
type Labels = "top" | "left" | "inside";
type FontId = "inter" | "serif" | "mono";
type Corners = "soft" | "sharp" | "round";
type ThemeId = "paper" | "midnight" | "mono" | "sunrise" | "mint";
type Brand = "visa" | "mc" | "jcb" | "amex" | "diners";

type Theme = ThemeColors & { radius: number };

type ThemeColors = {
  id: ThemeId;
  name: string;
  bg: string;
  ink: string;
  body: string;
  muted: string;
  line: string;
  field: string;
  tint: string;
  accent: string;
  ring: string;
  btnBg: string;
  btnFg: string;
  shadow: string;
};

const FONTS: { id: FontId; name: string; family: string }[] = [
  { id: "inter", name: "Inter", family: "var(--font-inter), Inter, system-ui, sans-serif" },
  { id: "serif", name: "Serif", family: "var(--font-demo-serif), Georgia, serif" },
  { id: "mono", name: "Mono", family: "var(--font-demo-mono), ui-monospace, Menlo, monospace" },
];

const THEMES: (ThemeColors & { id: ThemeId; name: string })[] = [
  {
    // Default palette, taken from the storelogo checkout mockup: white surface, near-black
    // slate text, hairline borders, and the vivid azure used for its primary button.
    id: "paper", name: "Paper", bg: "#ffffff", ink: "#1c2432", body: "#3f4856", muted: "#6c7686", line: "#e6eaf0",
    field: "#ffffff", tint: "#f3f6fb", accent: "#0b74ea", ring: "rgba(11,116,234,0.2)", btnBg: "#0b74ea", btnFg: "#ffffff",
    shadow: "0 24px 60px rgba(20,40,80,0.16)",
  },
  {
    id: "midnight", name: "Midnight", bg: "#12161e", ink: "#e9edf5", body: "#a9b2c2", muted: "#7b8598", line: "#2a3342",
    field: "#181d27", tint: "#1c2230", accent: "#8b9cff", ring: "rgba(139,156,255,0.25)", btnBg: "#8b9cff", btnFg: "#0b0f17",
    shadow: "0 24px 70px rgba(0,0,0,0.55)",
  },
  {
    id: "mono", name: "Mono", bg: "#ffffff", ink: "#000000", body: "#333333", muted: "#666666", line: "#cfcfcf",
    field: "#ffffff", tint: "#f2f2f2", accent: "#000000", ring: "rgba(0,0,0,0.14)", btnBg: "#000000", btnFg: "#ffffff",
    shadow: "0 24px 60px rgba(0,0,0,0.3)",
  },
  {
    id: "sunrise", name: "Sunrise", bg: "#fffaf4", ink: "#3b2417", body: "#7b5a47", muted: "#a08470", line: "#f1dcc9",
    field: "#ffffff", tint: "#fff1e3", accent: "#f0622f", ring: "rgba(240,98,47,0.22)", btnBg: "#f0622f", btnFg: "#ffffff",
    shadow: "0 24px 60px rgba(120,60,20,0.22)",
  },
  {
    id: "mint", name: "Mint", bg: "#f4fbf8", ink: "#0f2b23", body: "#3f6357", muted: "#6b8f83", line: "#d3ebe1",
    field: "#ffffff", tint: "#e8f6f0", accent: "#0f9d78", ring: "rgba(15,157,120,0.22)", btnBg: "#0f9d78", btnFg: "#ffffff",
    shadow: "0 24px 60px rgba(10,80,60,0.2)",
  },
];

// ---------- card number helpers ----------

function detectBrand(digits: string): Brand | null {
  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mc";
  if (/^35/.test(digits)) return "jcb";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^3(0|6|8)/.test(digits)) return "diners";
  return null;
}

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (/^3[47]/.test(digits)) {
    const d = digits.slice(0, 15);
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)].filter(Boolean).join(" ");
  }
  return (digits.slice(0, 16).match(/.{1,4}/g) ?? []).join(" ");
}

function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

// ---------- small marks and icons ----------

function Tile({ children, w = 28 }: { children: ReactNode; w?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center bg-white"
      style={{ width: w, height: 19, border: "1px solid #d8dde6", borderRadius: 3 }}
    >
      {children}
    </span>
  );
}

const BRAND_TILES: Record<Brand, ReactNode> = {
  visa: (
    <Tile>
      <span style={{ color: "#1a3a9c", fontWeight: 800, fontStyle: "italic", fontSize: 9, letterSpacing: -0.2 }}>VISA</span>
    </Tile>
  ),
  mc: (
    <Tile>
      <svg width="18" height="11" viewBox="0 0 16 10" aria-hidden>
        <circle cx="5.5" cy="5" r="4.5" fill="#eb001b" />
        <circle cx="10.5" cy="5" r="4.5" fill="#f79e1b" fillOpacity="0.95" />
      </svg>
    </Tile>
  ),
  jcb: (
    <Tile>
      <span
        style={{
          fontWeight: 800, fontSize: 8.5, color: "#fff", padding: "0 3px", borderRadius: 2,
          background: "linear-gradient(90deg,#0b6fb5,#1f9a47,#d1262d)",
        }}
      >
        JCB
      </span>
    </Tile>
  ),
  amex: (
    <Tile>
      <span style={{ color: "#2a7ac0", fontWeight: 800, fontSize: 7, lineHeight: 0.9, textAlign: "center" }}>
        AM
        <br />
        EX
      </span>
    </Tile>
  ),
  diners: (
    <Tile>
      <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden>
        <circle cx="6" cy="6" r="5.2" fill="none" stroke="#1a6bb8" strokeWidth="1.1" />
        <rect x="5.2" y="3" width="1.6" height="6" rx="0.4" fill="#1a6bb8" />
      </svg>
    </Tile>
  ),
};

function CardLogos({ brand }: { brand: Brand | null }) {
  return (
    <span className="flex items-center gap-[3px]">
      {(Object.keys(BRAND_TILES) as Brand[]).map((b) => (
        <span key={b} style={{ opacity: brand && brand !== b ? 0.3 : 1, transition: "opacity 200ms", display: "inline-flex" }}>
          {BRAND_TILES[b]}
        </span>
      ))}
    </span>
  );
}

function CardIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="1.5" y="4" width="17" height="12" rx="2.2" fill="currentColor" />
      <rect x="1.5" y="7" width="17" height="2.2" fill="#fff" fillOpacity="0.85" />
      <rect x="3.6" y="11.6" width="4" height="1.6" rx="0.8" fill="#fff" fillOpacity="0.85" />
    </svg>
  );
}

function BankIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 1.8 1.8 6v1.6h16.4V6L10 1.8Z" />
      <rect x="3.6" y="8.8" width="2.2" height="6" />
      <rect x="8.9" y="8.8" width="2.2" height="6" />
      <rect x="14.2" y="8.8" width="2.2" height="6" />
      <rect x="1.8" y="16" width="16.4" height="2" />
    </svg>
  );
}

function AppleGlyph({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size * 0.75} height={size} viewBox="0 0 384 512" fill={color} aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

const GoogleG = ({ size = 18 }: { size?: number }) => (
  <span style={{ color: "#4285f4", fontWeight: 700, fontSize: size, lineHeight: 1 }}>G</span>
);
const PayPalP = ({ size = 18 }: { size?: number }) => (
  <span style={{ color: "#2a6fd6", fontWeight: 800, fontStyle: "italic", fontSize: size, lineHeight: 1 }}>P</span>
);
const AffirmMark = ({ size = 12 }: { size?: number }) => (
  <span style={{ fontWeight: 700, fontSize: size, letterSpacing: -0.4, lineHeight: 1 }}>affirm</span>
);

// ---------- payment methods ----------

const METHODS: {
  id: Method;
  label: string;
  icon: ReactNode;
  text?: string;
  button?: ReactNode;
  btnBg?: string;
  btnFg?: string;
}[] = [
  { id: "card", label: "Card", icon: <CardIcon /> },
  {
    id: "bank", label: "Bank", icon: <BankIcon />,
    text: "You will be asked to securely link your bank account to complete this payment.",
    button: "Continue with bank",
  },
  {
    id: "apple", label: "Apple Pay", icon: <AppleGlyph size={19} />,
    text: "You will be redirected to Apple Pay to complete this payment. Clicking Check Out with Apple Pay will finalize your transaction.",
    button: (
      <span className="inline-flex items-center gap-1">
        <AppleGlyph size={16} color="#fff" />
        Pay
      </span>
    ),
    btnBg: "#000", btnFg: "#fff",
  },
  {
    id: "google", label: "Google Pay", icon: <GoogleG />,
    text: "You will be redirected to Google Pay to complete this payment. Clicking Check Out with Google Pay will finalize your transaction.",
    button: (
      <span className="inline-flex items-center gap-1">
        <span style={{ color: "#8ab4f8", fontWeight: 700 }}>G</span>
        Pay
      </span>
    ),
    btnBg: "#000", btnFg: "#fff",
  },
  {
    id: "paypal", label: "PayPal", icon: <PayPalP />,
    text: "You will be redirected to PayPal to log in and complete this payment.",
    button: <span style={{ fontWeight: 700, fontStyle: "italic" }}>PayPal</span>,
    btnBg: "#ffc439", btnFg: "#003087",
  },
  {
    id: "affirm", label: "Affirm", icon: <AffirmMark />,
    text: "You will be redirected to Affirm to choose a monthly payment plan and complete this purchase.",
    button: "Continue with Affirm",
    btnBg: "#4a4af4", btnFg: "#fff",
  },
];

// ---------- inputs ----------

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[color:var(--muted)]"
      style={{ fontSize: 14, color: "inherit" }}
    />
  );
}

type FieldDef = { label: string; short: string; placeholder: string; props: InputProps };

type CardState = { name: string; number: string; expiry: string; cvc: string };

const EMPTY_CARD: CardState = { name: "", number: "", expiry: "", cvc: "" };

type CardErrors = Partial<Record<keyof CardState, string>>;

const FIELD_ORDER: (keyof CardState)[] = ["name", "number", "expiry", "cvc"];

function validateCard(c: CardState, cvcLen: number): CardErrors {
  const e: CardErrors = {};
  if (!c.name.trim()) e.name = "Enter the name on your card";

  const digits = c.number.replace(/\D/g, "");
  if (!digits) e.number = "Enter your card number";
  else if (digits.length < 13) e.number = "Your card number is incomplete";

  const ex = c.expiry.replace(/\D/g, "");
  if (!ex) e.expiry = "Enter the expiry date";
  else if (ex.length < 4) e.expiry = "Your expiry date is incomplete";
  else {
    const mm = Number(ex.slice(0, 2));
    const yy = 2000 + Number(ex.slice(2));
    const now = new Date();
    if (mm < 1 || mm > 12) e.expiry = "Your expiry month is invalid";
    else if (yy < now.getFullYear() || (yy === now.getFullYear() && mm < now.getMonth() + 1)) e.expiry = "Your card has expired";
  }

  if (!c.cvc) e.cvc = "Enter the security code";
  else if (c.cvc.length < cvcLen) e.cvc = "Your security code is incomplete";
  return e;
}

function CardForm({
  t, labels, v, set, brand, cvcLen, errors, showErrors, paid, onPay,
}: {
  t: Theme;
  labels: Labels;
  v: CardState;
  set: { name: (s: string) => void; number: (s: string) => void; expiry: (s: string) => void; cvc: (s: string) => void };
  brand: Brand | null;
  cvcLen: number;
  errors: CardErrors;
  showErrors: boolean;
  paid: boolean;
  onPay: () => void;
}) {
  const dark = luminance(t.bg) < 0.4;
  const danger = dark ? "#ff7a7a" : "#d92d3a";
  const dangerBg = rgba(danger, 0.07);
  const errOf = (k: keyof CardState) => (showErrors ? errors[k] : undefined);

  const fields: Record<keyof CardState, FieldDef> = {
    name: {
      label: "Name on card", short: "Name", placeholder: "Jenny Rosen",
      props: { value: v.name, onChange: (e) => set.name(e.target.value), autoComplete: "cc-name", "aria-label": "Name on card", "aria-invalid": !!errOf("name") },
    },
    number: {
      label: "Card number", short: "Card", placeholder: "1234 1234 1234 1234",
      props: {
        value: v.number, onChange: (e) => set.number(e.target.value), inputMode: "numeric",
        autoComplete: "cc-number", maxLength: 19, "aria-label": "Card number", "aria-invalid": !!errOf("number"),
      },
    },
    expiry: {
      label: "Expiry date", short: "Expiry", placeholder: "MM/YY",
      props: {
        value: v.expiry, onChange: (e) => set.expiry(e.target.value), inputMode: "numeric",
        autoComplete: "cc-exp", maxLength: 5, "aria-label": "Expiry date", "aria-invalid": !!errOf("expiry"),
      },
    },
    cvc: {
      label: "Security code", short: "CVC", placeholder: cvcLen === 4 ? "1234" : "123",
      props: {
        value: v.cvc, onChange: (e) => set.cvc(e.target.value), inputMode: "numeric",
        autoComplete: "cc-csc", maxLength: cvcLen, "aria-label": "Security code", "aria-invalid": !!errOf("cvc"),
      },
    },
  };

  const brandMark = (
    <span className="shrink-0">
      {brand ? BRAND_TILES[brand] : <span style={{ color: t.muted, display: "inline-flex" }}><CardIcon size={18} /></span>}
    </span>
  );

  const frame: CSSProperties = { borderWidth: 1, borderStyle: "solid", borderColor: t.line, borderRadius: t.radius, background: t.field };

  let body: ReactNode;

  if (labels === "top") {
    const top = ({ k, trailing }: { k: keyof CardState; trailing?: ReactNode }) => (
      <label className="flex min-w-0 flex-col gap-1.5">
        <span style={{ fontSize: 12, color: errOf(k) ? danger : t.muted }}>{fields[k].label}</span>
        <span
          className="flex items-center gap-2 px-3 transition-[border-color,box-shadow] focus-within:border-[color:var(--accent)] focus-within:shadow-[0_0_0_3px_var(--ring)]"
          style={{ ...frame, height: 42, borderColor: errOf(k) ? danger : t.line }}
        >
          <Input placeholder={fields[k].placeholder} {...fields[k].props} />
          {trailing}
        </span>
        {errOf(k) && (
          <span role="alert" style={{ fontSize: 12, color: danger }}>
            {errOf(k)}
          </span>
        )}
      </label>
    );
    body = (
      <div className="flex flex-col gap-3">
        {top({ k: "name" })}
        {top({ k: "number", trailing: brandMark })}
        <div className="grid grid-cols-2 gap-3">
          {top({ k: "expiry" })}
          {top({ k: "cvc" })}
        </div>
      </div>
    );
  } else if (labels === "left") {
    const row = ({ k, trailing, narrow, divider }: { k: keyof CardState; trailing?: ReactNode; narrow?: boolean; divider?: "top" | "left" }) => (
      <label
        className="flex min-w-0 flex-1 cursor-text items-center transition-colors focus-within:bg-[color:var(--tint)]"
        style={{
          height: 46,
          borderTop: divider === "top" ? `1px solid ${t.line}` : undefined,
          borderLeft: divider === "left" ? `1px solid ${t.line}` : undefined,
          background: errOf(k) ? dangerBg : undefined,
        }}
      >
        <span className="shrink-0 text-right" style={{ width: narrow ? 58 : 80, paddingRight: 14, fontSize: 14, color: errOf(k) ? danger : t.muted }}>
          {fields[k].short}
        </span>
        <Input placeholder={fields[k].placeholder} {...fields[k].props} />
        {trailing && <span className="pr-3">{trailing}</span>}
      </label>
    );
    body = (
      <div className="overflow-hidden" style={frame}>
        <div className="flex">{row({ k: "name" })}</div>
        <div className="flex">{row({ k: "number", divider: "top", trailing: brandMark })}</div>
        <div className="flex" style={{ borderTop: `1px solid ${t.line}` }}>
          {row({ k: "expiry" })}
          {row({ k: "cvc", narrow: true, divider: "left" })}
        </div>
      </div>
    );
  } else {
    const cell = ({ k, trailing, divider }: { k: keyof CardState; trailing?: ReactNode; divider?: "top" | "left" }) => (
      <label
        className="group relative flex min-w-0 flex-1 cursor-text items-end transition-colors focus-within:bg-[color:var(--tint)]"
        data-filled={v[k] !== ""}
        style={{
          height: 54,
          borderTop: divider === "top" ? `1px solid ${t.line}` : undefined,
          borderLeft: divider === "left" ? `1px solid ${t.line}` : undefined,
          background: errOf(k) ? dangerBg : undefined,
        }}
      >
        <span
          className="pointer-events-none absolute left-3 top-[18px] text-[14px] transition-all duration-150 group-focus-within:top-[8px] group-focus-within:text-[10.5px] group-data-[filled=true]:top-[8px] group-data-[filled=true]:text-[10.5px]"
          style={{ color: errOf(k) ? danger : t.muted }}
        >
          {fields[k].label}
        </span>
        <input
          {...fields[k].props}
          className="h-full w-full min-w-0 bg-transparent px-3 pb-[7px] pt-[22px] outline-none"
          style={{ fontSize: 14, color: "inherit" }}
        />
        {trailing && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">{trailing}</span>}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-200 group-focus-within:scale-x-100"
          style={{ background: errOf(k) ? danger : t.accent }}
        />
      </label>
    );
    body = (
      <div className="overflow-hidden" style={frame}>
        <div className="flex">{cell({ k: "name" })}</div>
        <div className="flex">{cell({ k: "number", divider: "top", trailing: brandMark })}</div>
        <div className="flex" style={{ borderTop: `1px solid ${t.line}` }}>
          {cell({ k: "expiry" })}
          {cell({ k: "cvc", divider: "left" })}
        </div>
      </div>
    );
  }

  const messages = showErrors && labels !== "top" ? FIELD_ORDER.filter((k) => errors[k]).map((k) => errors[k] as string) : [];

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        onPay();
        // After the errors render, move focus to the first invalid field.
        requestAnimationFrame(() => form.querySelector<HTMLInputElement>('input[aria-invalid="true"]')?.focus());
      }}
    >
      <div className="flex flex-col gap-2.5">
        {body}
        {messages.length > 0 && (
          <ul role="alert" className="m-0 flex list-none flex-col gap-0.5 p-0" style={{ fontSize: 12, color: danger }}>
            {messages.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        disabled={paid}
        className="flex items-center justify-center"
        style={{
          height: 44, borderRadius: t.radius, border: 0, fontSize: 14, fontWeight: 600,
          background: paid ? "#17a06b" : t.btnBg, color: paid ? "#fff" : t.btnFg,
          cursor: paid ? "default" : "pointer", transition: "filter 150ms, background-color 200ms",
        }}
        onMouseEnter={(e) => { if (!paid) e.currentTarget.style.filter = "brightness(1.06)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
      >
        {paid ? "Payment successful (demo)" : "Pay with credit card"}
      </button>
    </form>
  );
}

function RedirectBody({ t, m }: { t: Theme; m: (typeof METHODS)[number] }) {
  return (
    <div className="flex flex-col gap-4">
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: t.body }}>{m.text}</p>
      <div
        className="flex items-center justify-center"
        style={{
          height: 44, borderRadius: t.radius, fontSize: 14, fontWeight: 600,
          background: m.btnBg ?? t.btnBg, color: m.btnFg ?? t.btnFg,
          border: m.btnBg === "#000" ? `1px solid ${t.line}` : 0,
        }}
      >
        {m.button}
      </div>
    </div>
  );
}

function Radio({ t, on }: { t: Theme; on: boolean }) {
  return (
    <span
      aria-hidden
      className="shrink-0 rounded-full"
      style={{
        width: 16, height: 16, display: "grid", placeItems: "center",
        border: `1.5px solid ${on ? t.accent : t.muted}`, transition: "border-color 150ms",
      }}
    >
      <span
        className="rounded-full"
        style={{
          width: 8, height: 8, background: t.accent, transform: on ? "scale(1)" : "scale(0)",
          transition: "transform 180ms cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
    </span>
  );
}

// ---------- colour helpers ----------

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const rgba = (hex: string, a: number) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
};

// Corner radius in px for each corner style. Themes only change colour.
const CORNER_RADIUS: Record<Corners, number> = { soft: 8, sharp: 2, round: 14 };

// ---------- settings panel pieces (use the site's own theme) ----------

function Segmented<T extends string>({
  label, value, options, onChange,
}: {
  label: string;
  value: T;
  options: readonly (readonly [T, string])[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-lg border border-stroke bg-fill-frame p-0.5 text-xs">
      {options.map(([id, text]) => (
        <button
          key={id}
          type="button"
          aria-pressed={value === id}
          onClick={() => onChange(id)}
          className={`flex-1 rounded-md px-2 py-1.5 transition-colors ${
            value === id ? "bg-fg-primary text-fill-surface" : "text-fg-secondary hover:text-fg-primary"
          }`}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h5 className="m-0 text-sm font-semibold text-fg-primary">{title}</h5>
      {children}
    </div>
  );
}

// ---------- the demo ----------

export function PaymentMethodDemo() {
  const [layout, setLayout] = useState<Layout>("tabs");
  const [labels, setLabels] = useState<Labels>("inside");
  const [fontId, setFontId] = useState<FontId>("inter");
  const [themeId, setThemeId] = useState<ThemeId>("paper");
  const [corners, setCorners] = useState<Corners>("soft");
  const [selected, setSelected] = useState<Method>("card");
  const [card, setCard] = useState<CardState>(EMPTY_CARD);
  const [paid, setPaid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const isDefault =
    layout === "tabs" && labels === "inside" && fontId === "inter" && themeId === "paper" && corners === "soft" &&
    selected === "card" &&
    !paid && !showErrors && Object.values(card).every((x) => x === "");

  function reset() {
    setLayout("tabs");
    setLabels("inside");
    setFontId("inter");
    setThemeId("paper");
    setCorners("soft");
    setSelected("card");
    setCard(EMPTY_CARD);
    setPaid(false);
    setShowErrors(false);
  }

  const baseTheme = THEMES.find((x) => x.id === themeId) ?? THEMES[0];
  const t: Theme = { ...baseTheme, radius: CORNER_RADIUS[corners] };
  const digits = card.number.replace(/\D/g, "");
  const brand = detectBrand(digits);
  const cvcLen = brand === "amex" ? 4 : 3;
  const errors = validateCard(card, cvcLen);
  const valid = Object.keys(errors).length === 0;

  const set = {
    name: (s: string) => setCard((c) => ({ ...c, name: s })),
    number: (s: string) => setCard((c) => ({ ...c, number: formatCardNumber(s) })),
    expiry: (s: string) => setCard((c) => ({ ...c, expiry: formatExpiry(s) })),
    cvc: (s: string) => setCard((c) => ({ ...c, cvc: s.replace(/\D/g, "").slice(0, 4) })),
  };

  function pay() {
    if (paid) return;
    if (!valid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setPaid(true);
    setCard(EMPTY_CARD);
    window.setTimeout(() => setPaid(false), 2200);
  }

  const bodyFor = (m: (typeof METHODS)[number]) =>
    m.id === "card" ? (
      <CardForm t={t} labels={labels} v={card} set={set} brand={brand} cvcLen={cvcLen} errors={errors} showErrors={showErrors} paid={paid} onPay={pay} />
    ) : (
      <RedirectBody t={t} m={m} />
    );



  const cardVars = {
    "--accent": t.accent, "--ring": t.ring, "--tint": t.tint, "--muted": t.muted,
  } as CSSProperties;

  const renderCard = (sel: Method) => {
    const current = METHODS.find((m) => m.id === sel) ?? METHODS[0];
    return (
        <div
          className={`${serifFont.variable} ${monoFont.variable} w-full max-w-[460px] p-6 transition-colors duration-300 sm:p-7`}
          style={{
            ...cardVars,
            background: t.bg,
            color: t.ink,
            fontFamily: (FONTS.find((f) => f.id === fontId) ?? FONTS[0]).family,
            border: `1px solid ${t.line}`,
            borderRadius: Math.round(t.radius * 1.6),
            boxShadow: t.shadow,
          }}
        >
          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: -0.1 }}>Payment method</h4>

          {layout === "tabs" ? (
            <>
              <div
                role="radiogroup"
                aria-label="Payment method"
                className="-mx-6 mt-3 flex gap-2 overflow-x-auto px-6 py-1.5 [scrollbar-width:none] sm:-mx-7 sm:px-7 [&::-webkit-scrollbar]:hidden"
              >
                {METHODS.map((m) => {
                  const on = sel === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={(e) => {
                        setSelected(m.id);
                        e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
                      }}
                      className="flex w-[104px] shrink-0 flex-col items-start gap-2.5 text-left outline-none transition-[border-color,box-shadow,color] focus-visible:shadow-[0_0_0_3px_var(--ring)]"
                      style={{
                        padding: "12px 12px 10px",
                        border: `${on ? 1.5 : 1}px solid ${on ? t.accent : t.line}`,
                        margin: on ? -0.5 : 0,
                        borderRadius: t.radius,
                        background: t.field,
                        color: on ? t.ink : t.muted,
                        boxShadow: on ? `0 0 0 3px ${t.ring}` : "none",
                      }}
                    >
                      <span className="flex h-5 items-center" style={{ color: on ? t.ink : t.muted }}>{m.icon}</span>
                      <span className="truncate" style={{ fontSize: 13, fontWeight: on ? 600 : 500 }}>{m.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">{bodyFor(current)}</div>
            </>
          ) : (
            <div role="radiogroup" aria-label="Payment method" className="mt-4 flex flex-col gap-2.5">
              {METHODS.map((m) => {
                const on = sel === m.id;
                return (
                  <div
                    key={m.id}
                    style={{
                      border: `${on ? 1.5 : 1}px solid ${on ? t.accent : t.line}`,
                      margin: on ? -0.5 : 0,
                      borderRadius: t.radius,
                      background: t.field,
                      boxShadow: on ? `0 0 0 3px ${t.ring}` : "none",
                      transition: "border-color 150ms, box-shadow 150ms",
                    }}
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setSelected(m.id)}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 text-left outline-none"
                      style={{ height: 48, color: t.ink }}
                    >
                      <Radio t={t} on={on} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>
                        {m.id === "card" ? "Credit card" : m.label === "Bank" ? "Bank account" : m.label}
                      </span>
                      <span className="ml-auto flex items-center" style={{ color: t.muted }}>
                        {m.id === "card" ? <CardLogos brand={brand} /> : m.icon}
                      </span>
                    </button>
                    {on && <div className="px-4 pb-4 pt-1">{bodyFor(m)}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
    );
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-stroke bg-fill-frame lg:flex-row">
      {/* settings panel */}
      <aside className="flex w-full shrink-0 flex-col border-b border-stroke bg-fill-surface lg:w-[264px] lg:border-b-0 lg:border-r">
        <div className="flex flex-1 flex-col gap-6 p-4">
          <Section title="Layout">
            <Segmented label="Layout" value={layout} onChange={setLayout} options={[["tabs", "Tabs"], ["stacked", "Stacked"]] as const} />
          </Section>

          <Section title="Labels">
            <Segmented
              label="Labels"
              value={labels}
              onChange={setLabels}
              options={[["top", "Above"], ["inside", "Floating"], ["left", "Left"]] as const}
            />
          </Section>

          <Section title="Theme">
            <div role="group" aria-label="Theme" className="grid grid-cols-2 gap-2">
              {THEMES.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  aria-pressed={themeId === th.id}
                  onClick={() => setThemeId(th.id)}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs transition-colors ${
                    themeId === th.id
                      ? "border-fg-primary bg-fill-frame text-fg-primary"
                      : "border-stroke text-fg-secondary hover:text-fg-primary"
                  }`}
                >
                  <span
                    aria-hidden
                    className="h-4 w-4 shrink-0 rounded-full border border-stroke"
                    style={{ background: `linear-gradient(135deg, ${th.bg} 50%, ${th.accent} 50%)` }}
                  />
                  {th.name}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Font">
            <Segmented label="Font" value={fontId} onChange={setFontId} options={FONTS.map((f) => [f.id, f.name] as const)} />
          </Section>

          <Section title="Corners">
            <Segmented
              label="Corners"
              value={corners}
              onChange={setCorners}
              options={[["soft", "Soft"], ["sharp", "Sharp"], ["round", "Round"]] as const}
            />
          </Section>
        </div>

        <div className="p-4 pt-0">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-fill-frame px-3 py-2.5">
            <span className="text-xs text-fg-tertiary">Back to defaults</span>
            <button
              type="button"
              onClick={reset}
              disabled={isDefault}
              className="flex items-center gap-1.5 text-xs text-fg-secondary transition-[color,opacity] hover:text-fg-primary disabled:cursor-default disabled:opacity-40 disabled:hover:text-fg-secondary"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.07" />
                <path d="M2.5 2.5v3h3" />
              </svg>
              Reset
            </button>
          </div>
        </div>
      </aside>

      {/* demo canvas */}
      <div
        className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:pb-10 sm:pt-8"
        style={{
          // FigJam-style dot grid in the page's own text colour, so it follows the site theme.
          backgroundImage: "radial-gradient(rgb(var(--fg-primary) / 0.16) 1px, transparent 1.2px)",
          backgroundSize: "20px 20px",
        }}
      >
      <div className="grid w-full grid-cols-1">
        <div className="col-start-1 row-start-1 flex justify-center self-start">{renderCard(selected)}</div>
        {/* Invisible copy of the tallest state (card form open). It reserves the canvas
            height, so switching methods never makes the canvas grow or shrink. */}
        <div aria-hidden inert className="pointer-events-none invisible col-start-1 row-start-1 flex justify-center">
          {renderCard("card")}
        </div>
      </div>
      </div>
    </div>
  );
}
