import type { CSSProperties, ReactNode } from "react";
import { CK } from "@/app/components/checkoutTokens";

// The Chameleon button, drawn for the documentation canvases. All four types in all four states are shown
// statically (hover and focus are forced), using the checkout palette: blue as the action colour.

export type BtnType = "primary" | "secondary" | "tertiary" | "ghost";
export type BtnState = "default" | "hover" | "focused" | "disabled";

export const BTN_TYPES: BtnType[] = ["primary", "secondary", "tertiary", "ghost"];
export const BTN_STATES: BtnState[] = ["default", "hover", "focused", "disabled"];

const ACCENT_HOVER = "#0a62c9";
const OFF = "#9aa5b4"; // text on a disabled control
const RING = `0 0 0 2px #fff, 0 0 0 4px ${CK.accent}`; // focus: a white gap, then a blue ring

type Look = { bg: string; fg: string; border: string; ring?: boolean };
const LOOK: Record<BtnType, Record<BtnState, Look>> = {
  primary: {
    default: { bg: CK.accent, fg: "#fff", border: "transparent" },
    hover: { bg: ACCENT_HOVER, fg: "#fff", border: "transparent" },
    focused: { bg: CK.accent, fg: "#fff", border: "transparent", ring: true },
    disabled: { bg: CK.line, fg: OFF, border: "transparent" },
  },
  secondary: {
    default: { bg: "#fff", fg: CK.ink, border: CK.ink },
    hover: { bg: CK.line, fg: CK.ink, border: CK.ink },
    focused: { bg: "#fff", fg: CK.ink, border: CK.ink, ring: true },
    disabled: { bg: "#fff", fg: OFF, border: CK.line },
  },
  tertiary: {
    default: { bg: CK.line, fg: CK.ink, border: "transparent" },
    hover: { bg: "#d3dae6", fg: CK.ink, border: "transparent" },
    focused: { bg: CK.line, fg: CK.ink, border: "transparent", ring: true },
    disabled: { bg: "#eff2f6", fg: OFF, border: "transparent" },
  },
  ghost: {
    default: { bg: "transparent", fg: CK.ink, border: "transparent" },
    hover: { bg: CK.line, fg: CK.ink, border: "transparent" },
    focused: { bg: "transparent", fg: CK.ink, border: "transparent", ring: true },
    disabled: { bg: "transparent", fg: OFF, border: "transparent" },
  },
};

export function Arrow({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ChamBtn({
  type = "primary", state = "default", label = "Button", icon = true, size = "md", style,
}: { type?: BtnType; state?: BtnState; label?: ReactNode; icon?: boolean; size?: "md" | "lg"; style?: CSSProperties }) {
  const look = LOOK[type][state];
  const lg = size === "lg";
  return (
    <span
      className="inline-flex items-center whitespace-nowrap"
      style={{
        height: lg ? 64 : 36, padding: lg ? "0 26px" : "0 16px", gap: lg ? 12 : 8, borderRadius: lg ? 14 : 8, fontSize: lg ? 22 : 14, fontWeight: lg ? 600 : 500,
        background: look.bg, color: look.fg, border: `1.5px solid ${look.border}`, boxShadow: look.ring ? RING : "none", ...style,
      }}
    >
      {label}
      {icon && <Arrow size={lg ? 22 : 15} />}
    </span>
  );
}

// small spaced capitals, used for the labels on these canvases
export function Cap({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span className="text-[11px] font-medium uppercase" style={{ letterSpacing: "0.14em", color: CK.muted, ...style }}>
      {children}
    </span>
  );
}
