"use client";

import Image from "next/image";
import { PaymentBadge } from "@/app/components/PaymentBadge";
import { BRAND_BADGE, detectBrand, formatCardNumber } from "@/app/components/cardNumber";
import { useId, useState, type ReactNode } from "react";
import { CK } from "@/app/components/checkoutTokens";

// Layout 2: a static recreation of the one-page "steps" checkout from Figma (header and footer
// left out), restyled with the shared checkout palette. It lays out by the card's width: summary beside the form on wide cards,
// stacked under the steps on narrow ones, and two-column fields collapse to one. Nothing here
// is interactive, it only mimics the design.

const INK = CK.ink;
const MUTED = CK.muted;
const LINE = CK.line;

// Hover for anything that looks clickable: the 1px border darkens (via a CSS variable, so children
// like the radio dot follow the card's border), and selectable cards also lift a little. Only for
// real pointers, so touch screens don't get stuck hover states.
const BORDER_VAR = "[--ck-bc:#e6eaf0]"; // = CK.line (written out so Tailwind can see the class)
const HOVER_BORDER = `${BORDER_VAR} transition-[border-color,box-shadow] [@media(hover:hover)]:hover:[--ck-bc:#aab6c8]`;
const HOVER_LIFT = `${HOVER_BORDER} [@media(hover:hover)]:hover:shadow-[0_2px_10px_rgba(28,36,50,0.07)]`;
const RAIL = CK.rail;
const STEPPER = CK.stepper;
const ACCENT = CK.accent;
const TILE = CK.tile;

// ---------- icons ----------

const svgBase = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Chevron = () => (
  <svg {...svgBase} width={14} height={14}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const Close = () => (
  <svg {...svgBase} width={13} height={13}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
const Kebab = () => (
  <svg {...svgBase} width={14} height={14} fill="currentColor" stroke="none">
    <circle cx="12" cy="5" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="12" cy="19" r="1.6" />
  </svg>
);
const CalendarIcon = () => (
  <svg {...svgBase}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
  </svg>
);
const HelpIcon = () => (
  <svg {...svgBase}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5M12 17h.01" />
  </svg>
);
const LockIcon = () => (
  <svg {...svgBase} width={14} height={14}>
    <rect x="5" y="11" width="14" height="9.5" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
const MailIcon = () => (
  <svg {...svgBase}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
    <path d="m3.5 7.5 8.5 6 8.5-6" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#6b7a90" />
    <path d="M13.4 21.5v-7h2.4l.4-2.8h-2.8V10c0-.8.3-1.4 1.4-1.4h1.5V6.2c-.3 0-1.1-.1-2.1-.1-2.2 0-3.6 1.3-3.6 3.7v2.1H8.2v2.8h2.4v7z" fill="#fff" />
  </svg>
);
const GoogleIcon = () => (
  <span style={{ color: "#6b7a90", fontWeight: 700, fontSize: 17, lineHeight: 1 }} aria-hidden>
    G
  </span>
);

// ---------- small building blocks ----------

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-[13px] font-semibold" style={{ color: INK }}>
      {children}
    </span>
  );
}

// A labelled input (or dropdown, with `options`). Uncontrolled by default; pass value + onChange to
// control it (the Member page does, so Save can read what you typed).
export function Field({
  label, placeholder, options, trailing, trailingFor, format, maxLength, value, onChange, autoFocus,
}: {
  label: string; placeholder?: string; options?: string[]; trailing?: ReactNode;
  // for uncontrolled inputs: reformat what is typed (e.g. group card digits), and/or pick the trailing
  // icon from what is typed (e.g. the card network)
  format?: (raw: string) => string; trailingFor?: (typed: string) => ReactNode; maxLength?: number;
  value?: string; onChange?: (v: string) => void; autoFocus?: boolean;
}) {
  const controlled = value !== undefined;
  const [typed, setTyped] = useState("");
  const id = useId();
  const inputCls = "h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-[#6c7686]";
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="contents">
        <Label>{label}</Label>
      </label>
      <div
        className={`relative flex h-11 items-center justify-between gap-2 rounded-sm bg-white px-3.5 text-sm focus-within:shadow-[0_0_0_3px_rgba(11,116,234,0.2)] focus-within:![--ck-bc:#0b74ea] ${HOVER_BORDER}`}
        style={{ border: "1px solid var(--ck-bc)", color: INK }}
      >
        {options ? (
          <>
            <select id={id} {...(controlled ? { value, onChange: (e) => onChange?.(e.target.value) } : { defaultValue: options[0] })} className={`${inputCls} cursor-pointer appearance-none pr-6`} style={{ color: INK }}>
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3.5" style={{ color: MUTED }}>
              <Chevron />
            </span>
          </>
        ) : (
          <>
            <input id={id} type="text" placeholder={placeholder} autoComplete="off" autoFocus={autoFocus} maxLength={maxLength}
              {...(controlled
                ? { value, onChange: (e) => onChange?.(e.target.value) }
                : {
                    onInput: (e) => {
                      const el = e.currentTarget;
                      if (format) el.value = format(el.value);
                      setTyped(el.value);
                    },
                  })} className={inputCls} style={{ color: INK }} />
            {(trailingFor?.(typed) ?? trailing) && <span className="shrink-0" style={{ color: MUTED }}>{trailingFor?.(typed) ?? trailing}</span>}
          </>
        )}
      </div>
    </div>
  );
}

function Radio({ on }: { on?: boolean }) {
  return (
    <span
      aria-hidden
      className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-white"
      style={{ border: `${on ? 2 : 1}px solid ${on ? ACCENT : `var(--ck-bc, ${LINE})`}` }}
    >
      {on && <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />}
    </span>
  );
}

function Step({ title, hollow, last, children }: { title: string; hollow?: boolean; last?: boolean; children: ReactNode }) {
  return (
    <section className="relative pl-8 [@container(min-width:480px)]:pl-12">
      <span
        aria-hidden
        className="absolute left-0 top-0 grid h-[18px] w-[18px] place-items-center rounded-full bg-white"
        style={{ border: `2px solid ${ACCENT}` }}
      >
        {!hollow && <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />}
      </span>
      {!last && <span aria-hidden className="absolute bottom-[-38px] left-[8px] top-[22px] w-[2px]" style={{ background: STEPPER }} />}
      <h5 className="m-0 text-base font-semibold leading-[18px]" style={{ color: INK }}>
        {title}
      </h5>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function SignInButton({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span
      className={`flex h-11 cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-5 text-sm font-medium ${HOVER_LIFT}`}
      style={{ border: "1px solid var(--ck-bc)", color: INK }}
    >
      {icon}
      {children}
    </span>
  );
}

function ShippingOption({ title, price, sub, on, onSelect }: { title: string; price: string; sub: string; on?: boolean; onSelect?: () => void }) {
  return (
    <div
      role={onSelect ? "radio" : undefined}
      aria-checked={onSelect ? !!on : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={onSelect ? (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); onSelect(); } } : undefined}
      className={`flex items-start gap-3 rounded-sm bg-white p-4 ${onSelect ? `cursor-pointer outline-none ${HOVER_LIFT}` : ""}`}
      style={{ border: `${on ? 1.5 : 1}px solid ${on ? ACCENT : `var(--ck-bc, ${LINE})`}`, margin: on ? -0.5 : 0 }}
    >
      <Radio on={on} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-3 text-sm font-semibold" style={{ color: INK }}>
          <span>{title}</span>
          <span>{price}</span>
        </div>
        <span className="text-xs" style={{ color: MUTED }}>
          {sub}
        </span>
      </div>
    </div>
  );
}

// Keyboard + click handling shared by the selectable cards (role="radio").
function selectable(onSelect?: () => void, on?: boolean) {
  if (!onSelect) return {};
  return {
    role: "radio" as const,
    "aria-checked": !!on,
    tabIndex: 0,
    onClick: onSelect,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onSelect();
      }
    },
  };
}

function SavedMethod({ on, name, mark, last4, onSelect }: { on?: boolean; name: string; mark: ReactNode; last4: string; onSelect?: () => void }) {
  return (
    <div
      {...selectable(onSelect, on)}
      className={`flex items-start gap-3 rounded-sm bg-white p-4 ${onSelect ? `cursor-pointer outline-none ${HOVER_LIFT}` : ""}`}
      style={{ border: `${on ? 1.5 : 1}px solid ${on ? ACCENT : `var(--ck-bc, ${LINE})`}`, margin: on ? -0.5 : 0 }}
    >
      <Radio on={on} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold" style={{ color: INK }}>
            {name}
          </span>
          <span className="flex items-center gap-2" style={{ color: MUTED }}>
            {mark}
            <Kebab />
          </span>
        </div>
        <span className="text-sm tracking-wide" style={{ color: INK }}>
          {last4}
        </span>
      </div>
    </div>
  );
}


function CartItem({ name, price, src }: { name: string; price: string; src: string }) {
  return (
    <div className="flex items-start gap-4">
      {/* multiply drops the picture's white background into the tile colour */}
      <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-md" style={{ background: TILE }}>
        <Image src={src} alt={name} width={64} height={64} className="h-16 w-16 object-contain mix-blend-multiply" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm" style={{ color: INK }}>{name}</span>
          <span style={{ color: MUTED }}><Close /></span>
        </div>
        <span className="text-sm font-semibold" style={{ color: INK }}>{price}</span>
        <span
          className="mt-1 flex h-8 w-14 items-center justify-between rounded-sm bg-white px-2 text-xs"
          style={{ border: `1px solid ${LINE}`, color: INK }}
        >
          1
          <svg width="7" height="11" viewBox="0 0 7 11" fill="#8793a6" aria-hidden>
            <path d="M3.5 0 7 4H0zM3.5 11 0 7h7z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, bold, color }: { label: string; value: string; bold?: boolean; color?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]" style={{ color: color ?? INK }}>
      <span className={bold ? "font-semibold" : ""}>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

// ---------- the page ----------

// ---------- sections shared by the Guest layouts ----------

// Two columns when the form has room: stacked page (480-639px) or a wide card (820px+).
// In between, the summary sits beside the form and the form column is too narrow.
const TWO = "[@container(min-width:480px)_and_(max-width:639px)]:grid-cols-2 [@container(min-width:820px)]:grid-cols-2";
const FIELDS2 = `grid gap-4 ${TWO}`;
const CARDS2 = `grid gap-3 ${TWO}`;

export const SHIPPING = [
  { title: "Free", price: "$0", sub: "5-7 Days delivery" },
  { title: "Standart", price: "$5.20", sub: "3-5 Days delivery" },
  { title: "Express", price: "$7.80", sub: "2-3 Days delivery" },
  { title: "Individual", price: "$10.00", sub: "Select delivery date" },
];

export function PersonalDetailsFields() {
  return (
      <div className="flex flex-col gap-4">
        <div className={FIELDS2}>
          <Field label="First Name" placeholder="First Name" />
          <Field label="Last Name" placeholder="Last Name" />
        </div>
        <div className={FIELDS2}>
          <Field label="Email Address" placeholder="Example@example.com" />
          <Field label="Phone Number" placeholder="+ 72 390 729 22" />
        </div>
        <div className="mt-1 flex items-center gap-3 text-[13px]" style={{ color: INK }}>
          <span aria-hidden className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded" style={{ background: ACCENT }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          I agree to the Privacy Policy and Terms and Conditions
        </div>
      </div>
  );
}

export function ShippingDetailsFields() {
  return (
      <div className="flex flex-col gap-4">
        <div className={FIELDS2}>
          <Field label="Street Address" placeholder="Street Address" />
          <Field label="ZIP Code" placeholder="ZIP Code" />
        </div>
        <div className={FIELDS2}>
          <Field label="City" placeholder="City" />
          <Field label="Country" options={["United States", "Canada", "United Kingdom", "Germany", "France", "Australia"]} />
        </div>
      </div>
  );
}

export function ShippingMethodOptions({ selected = "Free", onSelect }: { selected?: string; onSelect?: (title: string) => void }) {
  return (
    <div role={onSelect ? "radiogroup" : undefined} aria-label="Shipping method" className={CARDS2}>
      {SHIPPING.map((o) => (
        <ShippingOption key={o.title} {...o} on={selected === o.title} onSelect={onSelect ? () => onSelect(o.title) : undefined} />
      ))}
    </div>
  );
}

// Which payment method is chosen: a saved Visa (the default), a saved Mastercard, or "Add New Card",
// which reveals the card form.
export type PayChoice = "visa" | "mastercard" | "new";

export function PaymentMethodFields({ choice, onChoose }: { choice: PayChoice; onChoose: (c: PayChoice) => void }) {
  const newOn = choice === "new";
  return (
    <div role="radiogroup" aria-label="Payment method" className="flex flex-col gap-8">
      <div className={CARDS2}>
        <SavedMethod name="Visa" mark={<PaymentBadge name="visa" />} last4="**** 4242" on={choice === "visa"} onSelect={() => onChoose("visa")} />
        <SavedMethod name="Mastercard" mark={<PaymentBadge name="mastercard" />} last4="**** 9813" on={choice === "mastercard"} onSelect={() => onChoose("mastercard")} />
        <div
          {...selectable(() => onChoose("new"), newOn)}
          className={`flex min-h-[110px] cursor-pointer flex-col items-center justify-center gap-3 rounded-sm bg-white p-4 outline-none ${HOVER_LIFT}`}
          style={{ border: `${newOn ? 1.5 : 1}px solid ${newOn ? ACCENT : "var(--ck-bc)"}`, margin: newOn ? -0.5 : 0 }}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-full text-base transition-colors"
            style={{ background: newOn ? ACCENT : TILE, color: newOn ? "#fff" : MUTED }}
          >
            +
          </span>
          <span className="text-sm font-medium" style={{ color: INK }}>
            Add New Card
          </span>
        </div>
      </div>

      {newOn && (
        <div className="flex flex-col gap-4">
          <div className={FIELDS2}>
            <Field
              label="Card Number"
              placeholder="12345 6789 1011 1213"
              format={formatCardNumber}
              maxLength={19}
              trailingFor={(typed) => {
                const brand = detectBrand(typed.replace(/\D/g, ""));
                return brand ? <PaymentBadge name={BRAND_BADGE[brand]} h={20} /> : null;
              }}
            />
            <Field label="Card Holder Name" placeholder="Trevor Jensen" />
          </div>
          {/* expiry and CVC stay on one row at every width */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry Date" placeholder="MM/YY" trailing={<CalendarIcon />} />
            <Field label="CVC/CVV" placeholder="CVC/CVV" trailing={<HelpIcon />} />
          </div>
          {/* icon is pinned to the first line, so it stays put when the text wraps */}
          <p className="m-0 flex items-start gap-2 text-[13px] leading-5" style={{ color: MUTED }}>
            <span className="mt-[3px] shrink-0">
              <LockIcon />
            </span>
            <span>Your transaction is secured with SSL encryption</span>
          </p>
        </div>
      )}
    </div>
  );
}

// The primary action under the form: the blue button, labelled "Order Now" unless told otherwise.
export function orderStyle(_choice: PayChoice, label = "Order Now"): { background: string; color: string; content: ReactNode } {
  return { background: ACCENT, color: "#ffffff", content: label };
}

const ORDER_TOTAL = "$150.99";

// The order summary. `collapsible` is the narrow-screen version: a tappable header row with the
// title and the total, and the full list opening under it.
export function OrderSummaryCard({ className = "", collapsible = false }: { className?: string; collapsible?: boolean }) {
  const [open, setOpen] = useState(false);

  const details = (
    <>
      <div className="flex flex-col gap-5 py-5">
        <CartItem name="Apple AirPods" price="$185.00" src="/images/checkout/product-airpods.png" />
        <CartItem name="Apple iPhone 12" price="$890.00" src="/images/checkout/product-iphone.png" />
      </div>
      <div
        className="flex items-center justify-between py-4 text-[13px]"
        style={{ color: INK, borderTop: `1px solid ${RAIL}`, borderBottom: `1px solid ${RAIL}` }}
      >
        Apply Discount Code
        <span style={{ color: MUTED }}><Chevron /></span>
      </div>
      <div className="flex flex-col gap-2.5 py-4">
        <SummaryRow label="Subtotal" value="$171.99" />
        <SummaryRow label="Shipping Cost" value="$7.99" />
        <SummaryRow label="Discount (15%)" value="-$21.00" color={CK.green} />
        <SummaryRow label="Tax (7%)" value="$10.57" />
      </div>
      <div className="pt-4" style={{ borderTop: `1px solid ${RAIL}` }}>
        <SummaryRow label="Order total" value={ORDER_TOTAL} bold />
      </div>
    </>
  );

  if (collapsible) {
    return (
      <aside className={`rounded-lg bg-white px-5 ${className}`} style={{ border: `1px solid ${LINE}` }}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="ck-order-summary"
          onClick={() => setOpen(!open)}
          className="flex h-14 w-full cursor-pointer items-center gap-3 text-left outline-none"
        >
          <h4 className="m-0 text-base font-semibold tracking-tight" style={{ color: INK }}>
            Order Summary
          </h4>
          <span
            className="ml-auto text-[15px] font-semibold transition-opacity duration-200"
            style={{ color: INK, opacity: open ? 0 : 1 }}
          >
            {ORDER_TOTAL}
          </span>
          <span className="transition-transform duration-300" style={{ color: MUTED, transform: open ? "rotate(180deg)" : "none" }}>
            <Chevron />
          </span>
        </button>
        <div
          id="ck-order-summary"
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          inert={!open}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pb-5" style={{ borderTop: `1px solid ${RAIL}` }}>{details}</div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`self-start rounded-lg bg-white p-5 ${className}`} style={{ border: `1px solid ${LINE}` }}>
      <h4 className="m-0 pb-4 text-lg font-semibold tracking-tight" style={{ color: INK, borderBottom: `1px solid ${RAIL}` }}>
        Order Summary
      </h4>
      {details}
    </aside>
  );
}

export function CheckoutStepsLayout() {
  const [pay, setPay] = useState<PayChoice>("visa");
  const [ship, setShip] = useState("Free");
  const order = orderStyle(pay);

  return (
    <>
      <div className="px-4 py-6 [@container(min-width:640px)]:px-8 [@container(min-width:640px)]:py-8 [@container(min-width:900px)]:!px-[8%] [@container(min-width:900px)]:!py-10">
        {/* heading */}
        <div className="flex flex-col gap-3">
          <p className="m-0 text-[13px]" style={{ color: MUTED }}>
            Main <span className="px-1">/</span> <span style={{ color: INK }}>Checkout</span>
          </p>
          <h3 className="m-0 text-2xl font-semibold tracking-tight [@container(min-width:640px)]:text-[30px]" style={{ color: INK }}>
            Checkout
          </h3>
        </div>

        {/* sign in */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="mr-1 text-sm" style={{ color: INK }}>Sign in with</span>
          <SignInButton icon={<FacebookIcon />}>Facebook</SignInButton>
          <SignInButton icon={<GoogleIcon />}>Google</SignInButton>
          <SignInButton icon={<span style={{ color: "#6b7a90", display: "inline-flex" }}><MailIcon /></span>}>Continue with Email</SignInButton>
        </div>

        <div className="mt-10 grid gap-10 [@container(min-width:640px)]:grid-cols-[minmax(0,1fr)_minmax(0,260px)] [@container(min-width:640px)]:gap-x-10 [@container(min-width:900px)]:!grid-cols-[minmax(0,1fr)_32.3%]">
          {/* steps */}
          <div className="flex flex-col gap-10 [@container(min-width:640px)]:col-start-1">
            <Step title="1. Personal Details">
              <PersonalDetailsFields />
            </Step>

            <Step title="2. Shipping Details">
              <ShippingDetailsFields />
            </Step>

            <Step title="3. Shipping Method">
              <ShippingMethodOptions selected={ship} onSelect={setShip} />
            </Step>

            <Step title="4. Payment Method" hollow last>
              <PaymentMethodFields choice={pay} onChoose={setPay} />
            </Step>
          </div>

          {/* order summary */}
          <OrderSummaryCard className="[@container(min-width:640px)]:col-start-2 [@container(min-width:640px)]:row-span-2 [@container(min-width:640px)]:row-start-1" />

          {/* order button */}
          <div className="[@container(min-width:640px)]:col-start-1">
            <div
              className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-sm text-sm font-medium transition-[filter] [@media(hover:hover)]:hover:brightness-95"
              style={{ background: order.background, color: order.color }}
            >
              {order.content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
