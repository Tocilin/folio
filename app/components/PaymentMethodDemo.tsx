"use client";

import { DemoLayer, type Demo } from "@/app/components/DemoLayer";
import { FullscreenButton, useFullscreen } from "@/app/components/Fullscreen";
import { PaymentBadge } from "@/app/components/PaymentBadge";
import { BRAND_BADGE, detectBrand, formatCardNumber, formatExpiry, type Brand } from "@/app/components/cardNumber";
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




// ---------- small marks and icons ----------


function CardLogos({ brand }: { brand: Brand | null }) {
  return (
    <span className="flex items-center gap-[3px]">
      {(Object.keys(BRAND_BADGE) as Brand[]).map((b) => (
        <span key={b} style={{ opacity: brand && brand !== b ? 0.3 : 1, transition: "opacity 200ms", display: "inline-flex" }}>
          <PaymentBadge name={BRAND_BADGE[b]} h={19} />
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


// The logo on a wallet's pay button: just the mark, no tile (cut from the badge SVGs), so it reads like the
// real button: white Apple Pay on black, G Pay on black, blue PayPal on yellow.
function ButtonLogo({ name, alt, h }: { name: "apple-pay" | "google-pay" | "paypal"; alt: string; h: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/images/payment/button-${name}.svg`} alt={alt} style={{ height: h, width: "auto", display: "block" }} />;
}

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
    id: "apple", label: "Apple Pay", icon: <PaymentBadge name="apple-pay" />,
    text: "You will be redirected to Apple Pay to complete this payment. Clicking Check Out with Apple Pay will finalize your transaction.",
    button: <ButtonLogo name="apple-pay" alt="Apple Pay" h={26} />,
    btnBg: "#000", btnFg: "#fff",
  },
  {
    id: "google", label: "Google Pay", icon: <PaymentBadge name="google-pay" />,
    text: "You will be redirected to Google Pay to complete this payment. Clicking Check Out with Google Pay will finalize your transaction.",
    button: <ButtonLogo name="google-pay" alt="Google Pay" h={26} />,
    btnBg: "#000", btnFg: "#fff",
  },
  {
    id: "paypal", label: "PayPal", icon: <PaymentBadge name="paypal" />,
    text: "You will be redirected to PayPal to log in and complete this payment.",
    button: <ButtonLogo name="paypal" alt="PayPal" h={22} />,
    btnBg: "#ffc439", btnFg: "#003087",
  },
  {
    id: "affirm", label: "Affirm", icon: <PaymentBadge name="affirm" />,
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

// Small "!" in a circle, in front of an error message; takes the message's colour and sits on its first line.
function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden className="mt-px shrink-0">
      <circle cx="8" cy="8" r="6.4" />
      <path d="M8 4.8v3.8" />
      <circle cx="8" cy="11.1" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
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
      {brand ? <PaymentBadge name={BRAND_BADGE[brand]} h={19} /> : <span style={{ color: t.muted, display: "inline-flex" }}><CardIcon size={18} /></span>}
    </span>
  );

  const frame: CSSProperties = { borderWidth: 1, borderStyle: "solid", borderColor: t.line, borderRadius: t.radius, background: t.field };

  let body: ReactNode;

  if (labels === "top") {
    const top = ({ k, trailing }: { k: keyof CardState; trailing?: ReactNode }) => (
      <label className="flex min-w-0 flex-col gap-1.5">
        <span style={{ fontSize: 12, color: t.muted }}>{fields[k].label}</span>
        <span
          className="flex items-center gap-2 px-3 transition-[border-color,box-shadow] focus-within:border-[color:var(--accent)] focus-within:shadow-[0_0_0_3px_var(--ring)]"
          style={{ ...frame, height: 42, borderColor: errOf(k) ? danger : t.line }}
        >
          <Input placeholder={fields[k].placeholder} {...fields[k].props} />
          {trailing}
        </span>
        {errOf(k) && (
          <span role="alert" className="flex items-start gap-1.5" style={{ fontSize: 12, color: danger }}>
            <ErrorIcon />
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
              <li key={m} className="flex items-start gap-1.5">
                <ErrorIcon />
                {m}
              </li>
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

// ---------- auto-play script (the "Demo" mode) ----------

// Clicks around the settings panel (labels, theme, font, corners, layout), fills the card in, then pays.
// Everything it presses is a real control. (No error scenario on purpose.)
async function playTour(d: Demo) {
  const pick = (group: string, text: string) => d.click(d.byText(`[role="group"][aria-label="${group}"] button`, text, true));
  const pause = () => d.wait(900);

  // 1. label styles
  await pick("Labels", "Floating"); // Above is the default
  await pause();
  await pick("Labels", "Left");
  await pause();

  // 2. fill the card in
  await d.type(d.q('input[aria-label="Name on card"]') as HTMLInputElement, "Jenny Rosen");
  await d.type(d.q('input[aria-label="Card number"]') as HTMLInputElement, "4242 4242 4242 4242");
  await d.type(d.q('input[aria-label="Expiry date"]') as HTMLInputElement, "08/28");
  await d.type(d.q('input[aria-label="Security code"]') as HTMLInputElement, "123");
  await d.wait(600);

  // 3. themes, fonts, corners
  for (const name of ["Midnight", "Mono", "Sunrise", "Mint", "Paper"]) {
    await pick("Theme", name);
    await d.wait(700);
  }
  await pick("Font", "Serif");
  await d.wait(700);
  await pick("Font", "Mono");
  await d.wait(700);
  await pick("Font", "Inter");
  await pick("Corners", "Sharp");
  await d.wait(700);
  await pick("Corners", "Round");
  await d.wait(700);
  await pick("Corners", "Soft");
  await pause();

  // 4. layout, and the other payment methods (Stacked is the default)
  const method = (name: string) => d.byText('[role="radiogroup"][aria-label="Payment method"] [role="radio"]', name);
  await pick("Layout", "Tabs");
  await pause();
  await d.click(method("Apple Pay"));
  await d.wait(900);
  await d.click(method("Bank"));
  await d.wait(900);
  await d.click(method("Card"));
  await pause();
  await pick("Layout", "Stacked");
  await d.click(method("Bank"));
  await d.wait(900);
  await d.click(method("Credit card")); // named "Card" in Tabs
  await pause();

  // 5. pay
  await d.click(d.byText('button[type="submit"]', "Pay with credit card"));
  await d.wait(3200);

  // 6. back to the defaults, then loop
  const reset = d.byText("button", "Reset", true);
  if (d.isLive(reset)) await d.click(reset);
  await d.wait(1200);
}

// ---------- the demo ----------

export function PaymentMethodDemo() {
  const [layout, setLayout] = useState<Layout>("stacked");
  const [labels, setLabels] = useState<Labels>("top");
  const [fontId, setFontId] = useState<FontId>("inter");
  const [themeId, setThemeId] = useState<ThemeId>("paper");
  const [corners, setCorners] = useState<Corners>("soft");
  const [selected, setSelected] = useState<Method>("card");
  const [card, setCard] = useState<CardState>(EMPTY_CARD);
  const [paid, setPaid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  // Demo: the page plays itself and the mouse is blocked. Try it: you drive.
  const [mode, setMode] = useState<"demo" | "try">("demo");
  // Full screen: the whole demo (settings panel + canvas) fills the window. Esc or the button exits.
  const fs = useFullscreen();

  const isDefault =
    layout === "stacked" && labels === "top" && fontId === "inter" && themeId === "paper" && corners === "soft" &&
    selected === "card" &&
    !paid && !showErrors && Object.values(card).every((x) => x === "");

  function reset() {
    setLayout("stacked");
    setLabels("top");
    setFontId("inter");
    setThemeId("paper");
    setCorners("soft");
    setSelected("card");
    setCard(EMPTY_CARD);
    setPaid(false);
    setShowErrors(false);
  }

  const changeMode = (m: "demo" | "try") => {
    if (m === mode) return;
    reset(); // either way, start from the defaults
    setMode(m);
  };

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
          data-pay-mode={luminance(t.bg) < 0.4 ? "dark" : "light"}
          className={`${serifFont.variable} ${monoFont.variable} relative w-full max-w-[460px] p-6 transition-colors duration-300 sm:p-7`}
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
          {/* a little stickman with a laptop, sitting on the card's top edge (drawn at half size) and
              drawn on top of it, never cut off. The box's bottom is 45px below the card's top edge
              (25px is empty space in the SVG, 20px is the figure overlapping the card). It is painted
              as two halves with a mask: above the edge in the site's text colour (white on the dark
              theme), over the card in the card's own text colour, so it stays visible on any theme. */}
          {[
            { clip: "inset(0 0 45px 0)", color: "rgb(var(--fg-primary))" },
            { clip: "inset(75px 0 0 0)", color: t.ink },
          ].map((half) => (
            <span
              key={half.clip}
              aria-hidden
              className="pointer-events-none absolute hidden sm:block"
              style={{
                width: 120, height: 120, left: -14, bottom: "calc(100% - 45px)", clipPath: half.clip,
                background: half.color,
                maskImage: "url(/images/checkout/stickman-laptop.svg)", WebkitMaskImage: "url(/images/checkout/stickman-laptop.svg)",
                maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
                maskSize: "contain", WebkitMaskSize: "contain",
              }}
            />
          ))}
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
    <>
    {fs.spacer}
    <div
      ref={fs.ref}
      className={`flex w-full flex-col border-stroke bg-fill-frame lg:flex-row ${
        fs.expanded ? "fixed inset-0 z-50 overflow-y-auto overflow-x-hidden" : "relative overflow-hidden rounded-lg border"
      }`}
    >
      {mode === "demo" && <DemoLayer play={playTour} onReset={reset} />}
      <FullscreenButton expanded={fs.expanded} onClick={fs.toggle} className="absolute right-3 top-3 z-40" />
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
                    // clip to the padding box and don't tile: otherwise the gradient repeats under the
                    // 1px border and leaves slivers of the other colour around the circle
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${th.bg} 50%, ${th.accent} 50%)`,
                      backgroundRepeat: "no-repeat",
                      backgroundClip: "padding-box",
                    }}
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
      <div className="relative z-40 mb-6 flex justify-center">
        <div role="group" aria-label="Mode" className="flex rounded-full border border-stroke bg-fill-surface p-0.5 text-xs">
          {([["demo", "Demo"], ["try", "Try it"]] as const).map(([id, text]) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => changeMode(id)}
              className={`h-8 rounded-full px-3.5 transition-colors ${
                mode === id ? "bg-fg-primary text-fill-surface" : "text-fg-secondary hover:text-fg-primary"
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
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
    </>
  );
}
