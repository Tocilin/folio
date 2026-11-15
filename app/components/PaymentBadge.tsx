// One place for payment logos, so the whole case study uses the same ones. They are 38x24 SVG badges
// from the open-source Shopify payment_icons set (MIT), stored in /public/images/payment. They are
// not official brand kits.

export type PaymentBadgeName =
  | "visa" | "mastercard" | "jcb" | "amex" | "diners"
  | "apple-pay" | "google-pay" | "paypal" | "affirm";

export function PaymentBadge({ name, h = 20, alt = "" }: { name: PaymentBadgeName; h?: number; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/images/payment/${name}.svg`} alt={alt} width={38} height={24} style={{ height: h, width: "auto", display: "block" }} />;
}
