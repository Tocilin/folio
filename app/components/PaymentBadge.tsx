// One place for payment logos, so the whole case study uses the same ones. They are SVG badges stored in
// /public/images/payment, each in a light and a dark version (`-light.svg` / `-dark.svg`).
//
// Light is the default. Put `data-pay-mode="dark"` on any ancestor (the payment demo does this for its dark
// themes) and every badge inside switches to its dark version, with no props to pass down.

export type PaymentBadgeName = "visa" | "mastercard" | "amex" | "discover" | "apple-pay" | "google-pay" | "paypal" | "affirm";

// `h` is the badge height: a number is px, a string is any CSS length (e.g. "3.9cqw" to scale with a box).
export function PaymentBadge({ name, h = 20, alt = "" }: { name: PaymentBadgeName; h?: number | string; alt?: string }) {
  const size = { height: h, width: "auto" } as const;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/payment/${name}-light.svg`} alt={alt} width={210} height={136} style={size} className="block [[data-pay-mode=dark]_&]:hidden" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/payment/${name}-dark.svg`} alt="" aria-hidden width={210} height={136} style={size} className="hidden [[data-pay-mode=dark]_&]:block" />
    </>
  );
}
