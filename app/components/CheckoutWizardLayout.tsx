"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CK } from "@/app/components/checkoutTokens";
import {
  OrderSummaryCard,
  orderStyle,
  SHIPPING,
  PaymentMethodFields,
  type PayChoice,
  PersonalDetailsFields,
  ShippingDetailsFields,
  ShippingMethodOptions,
} from "@/app/components/CheckoutStepsLayout";

// Guest: the checkout forms, but each step is its own page. A tab bar shows
// where you are, Back / Continue buttons move between steps (the last step has Place Order), and
// the Order Summary stays beside (or below, on narrow cards). You can only move forward with
// Continue: tabs for steps you haven't reached yet are disabled. Going back is free, by the Back
// button or by clicking an earlier tab. The form fields themselves are static.

const INK = CK.ink;
const MUTED = CK.muted;
const LINE = CK.line;
const ACCENT = CK.accent;

const PANEL = "rounded-md bg-white p-5 [@container(min-width:640px)]:p-6";
const PANEL_STYLE = { border: `1px solid ${LINE}`, boxShadow: "0 1px 2px rgba(20,40,80,0.04)" };

const STEPS = ["Personal Details", "Shipping Details", "Shipping Method", "Payment Method"] as const;

const icon = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ChevronRight = () => (
  <svg {...icon}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
const ChevronLeft = () => (
  <svg {...icon}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);
function StepButton({ children, onClick, primary, bg, fg }: { children: ReactNode; onClick: () => void; primary?: boolean; bg?: string; fg?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-sm px-5 text-sm font-medium outline-none transition-[filter,box-shadow] hover:brightness-95 focus-visible:shadow-[0_0_0_3px_rgba(11,116,234,0.25)] ${primary ? "min-w-0 flex-1" : "shrink-0"}`}
      style={{
        background: primary ? (bg ?? ACCENT) : "#ffffff",
        color: primary ? (fg ?? "#ffffff") : INK,
        border: primary ? "1px solid transparent" : `1px solid ${LINE}`,
      }}
    >
      {children}
    </button>
  );
}

const CheckIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

// The page after Place Order. "Continue shopping" starts the flow over.
function Confirmation({ ship, onRestart }: { ship: string; onRestart: () => void }) {
  const method = SHIPPING.find((o) => o.title === ship) ?? SHIPPING[0];
  return (
    <div className="mx-auto flex max-w-[480px] flex-col items-center gap-5 py-6 text-center [@container(min-width:640px)]:py-14">
      <span aria-hidden className="grid h-16 w-16 place-items-center rounded-full" style={{ background: CK.green }}>
        <CheckIcon />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-2xl font-semibold tracking-tight [@container(min-width:640px)]:text-[30px]" style={{ color: INK }}>
          Congratulations, your order is placed!
        </h3>
        <p className="m-0 text-sm leading-relaxed" style={{ color: MUTED }}>
          Thank you for your purchase. A confirmation and receipt are on their way to your email.
        </p>
      </div>
      <div className="w-full rounded-md bg-white p-5 text-left text-sm" style={{ border: `1px solid ${LINE}`, boxShadow: "0 1px 2px rgba(20,40,80,0.04)" }}>
        {[
          ["Order number", "#48213"],
          ["Delivery", `${method.title}, ${method.sub.replace(" delivery", "")}`],
          ["Order total", "$150.99"],
        ].map(([k, v], i) => (
          <div key={k} className={`flex items-center justify-between gap-4 ${i ? "mt-3" : ""}`}>
            <span style={{ color: MUTED }}>{k}</span>
            <span className="font-semibold" style={{ color: INK }}>{v}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="flex h-12 w-full items-center justify-center rounded-sm text-sm font-medium text-white outline-none transition-[filter,box-shadow] hover:brightness-95 focus-visible:shadow-[0_0_0_3px_rgba(11,116,234,0.25)]"
        style={{ background: ACCENT }}
      >
        Continue shopping
      </button>
    </div>
  );
}

export function CheckoutWizardLayout() {
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const [ship, setShip] = useState("Free");
  const [pay, setPay] = useState<PayChoice>("visa");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // keep the active tab visible when the tab bar scrolls (narrow cards). Only the tab bar scrolls:
  // scrollIntoView would also move the page around the card.
  useEffect(() => {
    const bar = tabBarRef.current;
    const tab = tabRefs.current[step];
    if (!bar || !tab) return;
    const left = tab.offsetLeft - bar.offsetLeft;
    if (left < bar.scrollLeft) bar.scrollTo({ left: left - 8, behavior: "smooth" });
    else if (left + tab.offsetWidth > bar.scrollLeft + bar.clientWidth) bar.scrollTo({ left: left + tab.offsetWidth - bar.clientWidth + 8, behavior: "smooth" });
  }, [step]);

  // the page sits inside a scrolling card: start the confirmation (and the restart) from the top
  useEffect(() => {
    rootRef.current?.parentElement?.scrollTo({ top: 0 });
  }, [placed]);

  const restart = () => {
    setStep(0);
    setShip("Free");
    setPay("visa");
    setPlaced(false);
  };

  const last = step === STEPS.length - 1;

  return (
    <div ref={rootRef} className="px-4 py-6 [@container(min-width:640px)]:px-8 [@container(min-width:640px)]:py-8 [@container(min-width:900px)]:!px-[8%] [@container(min-width:900px)]:!py-10">
      {placed ? (
        <Confirmation ship={ship} onRestart={restart} />
      ) : (
      <>
      {/* heading */}
      <div className="flex flex-col gap-3">
        <p className="m-0 text-[13px]" style={{ color: MUTED }}>
          Main <span className="px-1">/</span> <span style={{ color: INK }}>Checkout</span>
        </p>
        <h3 className="m-0 text-2xl font-semibold tracking-tight [@container(min-width:640px)]:text-[30px]" style={{ color: INK }}>
          Checkout
        </h3>
      </div>

      <div className="mt-6 grid gap-8 [@container(min-width:640px)]:grid-cols-[minmax(0,1fr)_minmax(0,260px)] [@container(min-width:640px)]:gap-x-10 [@container(min-width:900px)]:!grid-cols-[minmax(0,1fr)_32.3%]">
        <div className="min-w-0 [@container(min-width:640px)]:col-start-1">
          {/* tab bar */}
          <div
            ref={tabBarRef}
            role="tablist"
            aria-label="Checkout steps"
            className="flex items-center gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ borderBottom: `1px solid ${LINE}` }}
          >
            {STEPS.map((name, i) => {
              const active = i === step;
              const done = i < step;
              const locked = i > step; // not reached yet: only Continue gets you there
              return (
                <div key={name} className="flex shrink-0 items-center gap-3">
                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`ck-tab-${i}`}
                    aria-selected={active}
                    aria-controls="ck-panel"
                    disabled={locked}
                    onClick={() => setStep(i)}
                    className={`relative whitespace-nowrap pb-3.5 text-[15px] font-medium outline-none transition-colors ${locked ? "cursor-default" : "[@media(hover:hover)]:hover:!text-[#1c2432]"}`}
                    style={{ color: active || done ? INK : MUTED }}
                  >
                    {name}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-[-1px] h-[2px] transition-opacity"
                      style={{ background: ACCENT, opacity: active ? 1 : 0 }}
                    />
                  </button>
                  {i < STEPS.length - 1 && (
                    <span className="pb-3.5" style={{ color: MUTED }}>
                      <ChevronRight />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* the current step's page */}
          <div id="ck-panel" role="tabpanel" aria-labelledby={`ck-tab-${step}`} className="mt-6">
            {/* every step stays mounted (just hidden) so what you typed is still there when you go back.
                Each step sits in a white card, like the blocks on the Member page. */}
            <div hidden={step !== 0} className={PANEL} style={PANEL_STYLE}><PersonalDetailsFields /></div>
            <div hidden={step !== 1} className={PANEL} style={PANEL_STYLE}><ShippingDetailsFields /></div>
            <div hidden={step !== 2} className={PANEL} style={PANEL_STYLE}><ShippingMethodOptions selected={ship} onSelect={setShip} /></div>
            <div hidden={step !== 3} className={PANEL} style={PANEL_STYLE}><PaymentMethodFields choice={pay} onChoose={setPay} /></div>
          </div>

          {/* back / continue */}
          <div className="mt-8 flex items-center gap-3">
            {step > 0 && (
              <StepButton onClick={() => setStep(step - 1)}>
                <ChevronLeft />
                Back
              </StepButton>
            )}
            {last ? (
              <StepButton primary bg={orderStyle(pay, "Place Order").background} fg={orderStyle(pay, "Place Order").color} onClick={() => setPlaced(true)}>
                {orderStyle(pay, "Place Order").content}
              </StepButton>
            ) : (
              <StepButton primary onClick={() => setStep(step + 1)}>
                Continue
              </StepButton>
            )}
          </div>
        </div>

        <OrderSummaryCard className="[@container(min-width:640px)]:col-start-2 [@container(min-width:640px)]:row-start-1" />
      </div>
      </>
      )}
    </div>
  );
}
