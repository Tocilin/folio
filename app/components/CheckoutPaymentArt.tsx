import type { CSSProperties, ReactNode } from "react";
import { PaymentBadge } from "@/app/components/PaymentBadge";

// The payment method list from the Checkout block's picture, rebuilt in code (static, nothing to click).
// The block grows the whole picture a little on hover (see ThreeProductsBlocks).
// Drawn on the picture's own 430 x 509 grid; `q()` turns grid px into cqw (a percentage of the root's
// width), so it scales with its box. Same badges as the payment methods demo.

const IW = 430;
const IH = 509;
const q = (n: number) => `${((n / IW) * 100).toFixed(3)}cqw`;

const INK = "#2a2f37";
const ROW_LINE = "#d3d7dd";
const BLUE = "#2f6fd0";

function Box({ x, y, w, h, style, children }: { x: number; y: number; w: number; h: number; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className="absolute" style={{ left: q(x), top: q(y), width: q(w), height: q(h), ...style }}>
      {children}
    </div>
  );
}

function Label({ x, cy, s = 12.5, c = INK, w = 400, children }: { x: number; cy: number; s?: number; c?: string; w?: number; children: ReactNode }) {
  const lh = s * 1.35;
  return (
    <span className="absolute whitespace-nowrap" style={{ left: q(x), top: q(cy - lh / 2), fontSize: q(s), lineHeight: q(lh), color: c, fontWeight: w }}>
      {children}
    </span>
  );
}

function Radio({ x, cy, on }: { x: number; cy: number; on?: boolean }) {
  return (
    <span
      className="absolute grid place-items-center rounded-full"
      style={{ left: q(x - 7.5), top: q(cy - 7.5), width: q(15), height: q(15), border: `${q(on ? 1.8 : 1.5)} solid ${on ? BLUE : "#9aa0a8"}` }}
    >
      {on && <span className="rounded-full" style={{ width: q(6.5), height: q(6.5), background: BLUE }} />}
    </span>
  );
}

// a badge pinned to the right end of a row, vertically centred on `cy`
function RightBadge({ cy, right, children }: { cy: number; right: number; children: ReactNode }) {
  return (
    <span className="absolute flex items-center" style={{ right: q(right), top: q(cy - 9), height: q(18) }}>
      {children}
    </span>
  );
}

function Row({ y, h = 40, children }: { y: number; h?: number; children: ReactNode }) {
  return (
    <Box x={28} y={y} w={372} h={h} style={{ background: "#fff", border: `${q(1)} solid ${ROW_LINE}`, borderRadius: q(3) }}>
      {children}
    </Box>
  );
}

const Bank = () => (
  <svg style={{ width: q(14), height: q(14) }} viewBox="0 0 20 20" fill="#7a8190" aria-hidden>
    <path d="M10 1.8 1.8 6v1.6h16.4V6L10 1.8Z" />
    <rect x="3.6" y="8.8" width="2.2" height="6" />
    <rect x="8.9" y="8.8" width="2.2" height="6" />
    <rect x="14.2" y="8.8" width="2.2" height="6" />
    <rect x="1.8" y="16" width="16.4" height="2" />
  </svg>
);

export function CheckoutPaymentArt() {
  return (
    <div
      aria-hidden
      className="relative w-full select-none [container-type:inline-size]"
      style={{ aspectRatio: `${IW} / ${IH}`, background: "#fcfcfd", border: "1px solid #eceff3" }}
    >
      <Label x={28} cy={28} s={18} c="#262b33">Payment Method</Label>

      {/* credit card (collapsed) */}
      <Row y={57} h={50}>
        <Radio x={26} cy={25} />
        <Label x={46} cy={25}>Credit Card</Label>
        <RightBadge cy={25} right={17}>
          <span className="flex" style={{ gap: q(3) }}>
            {(["visa", "mastercard", "amex", "discover"] as const).map((b) => (
              <PaymentBadge key={b} name={b} h={q(17)} />
            ))}
          </span>
        </RightBadge>
      </Row>

      {/* Apple Pay (selected, open) */}
      <Box x={28} y={120} w={372} h={164} style={{ background: "#fff", border: `${q(2)} solid ${BLUE}`, borderRadius: q(3) }}>
        <Radio x={24} cy={24} on />
        <Label x={44} cy={24}>Apple Pay</Label>
        <RightBadge cy={24} right={15}>
          <PaymentBadge name="apple-pay" h={q(17)} />
        </RightBadge>
        {[
          "You will be redirected to Apple Pay to complete this payment.",
          "Clicking Check Out with Apple Pay will finalize your",
          "transaction.",
        ].map((line, i) => (
          <Label key={line} x={15} cy={52 + i * 17} s={11.5} c="#555b64">{line}</Label>
        ))}
        <Box x={15} y={107} w={338} h={39} style={{ background: "#000", borderRadius: q(2), display: "grid", placeItems: "center" }}>
          <PaymentBadgeButton />
        </Box>
      </Box>

      {/* the other methods */}
      <Row y={297}>
        <Radio x={20} cy={20} />
        <Label x={40} cy={20}>Google Pay</Label>
        <RightBadge cy={20} right={17}><PaymentBadge name="google-pay" h={q(17)} /></RightBadge>
      </Row>
      <Row y={348}>
        <Radio x={20} cy={20} />
        <Label x={40} cy={20}>Paypal</Label>
        <RightBadge cy={20} right={17}><PaymentBadge name="paypal" h={q(17)} /></RightBadge>
      </Row>
      <Row y={400}>
        <Radio x={20} cy={20} />
        <Label x={40} cy={20}>Affirm</Label>
        <RightBadge cy={20} right={17}><PaymentBadge name="affirm" h={q(17)} /></RightBadge>
      </Row>
      <Row y={451}>
        <Radio x={20} cy={20} />
        <Label x={40} cy={20}>Bank Account</Label>
        <RightBadge cy={20} right={17}><Bank /></RightBadge>
      </Row>
    </div>
  );
}

// the white Apple Pay mark on the black button (cut from the badge artwork)
function PaymentBadgeButton() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/payment/button-apple-pay.svg" alt="" style={{ height: q(22), width: "auto", display: "block" }} />;
}
