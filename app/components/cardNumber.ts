// Card number helpers shared by the checkout forms: which network a number belongs to, and the
// grouping of its digits.
import type { PaymentBadgeName } from "@/app/components/PaymentBadge";

export type Brand = "visa" | "mc" | "jcb" | "amex" | "diners";

// Which badge file each detected card network uses.
export const BRAND_BADGE: Record<Brand, PaymentBadgeName> = { visa: "visa", mc: "mastercard", jcb: "jcb", amex: "amex", diners: "diners" };

export function detectBrand(digits: string): Brand | null {
  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mc";
  if (/^35/.test(digits)) return "jcb";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^3(0|6|8)/.test(digits)) return "diners";
  return null;
}

export function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (/^3[47]/.test(digits)) {
    const d = digits.slice(0, 15);
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)].filter(Boolean).join(" ");
  }
  return (digits.slice(0, 16).match(/.{1,4}/g) ?? []).join(" ");
}

export function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
