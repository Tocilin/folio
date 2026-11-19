import type { ReactNode } from "react";
import { ChameleonArt } from "@/app/components/ChameleonArt";
import { CheckoutPaymentArt } from "@/app/components/CheckoutPaymentArt";
import { CommerceArt } from "@/app/components/CommerceArt";
import { ParallaxBox } from "@/app/components/ParallaxBox";

// The three-product overview (Checkout / Commerce Center / Chameleon), rebuilt in code from the image.
// Three separate blocks with the image's backgrounds, tags, titles and text. Each block scales as a
// whole with its width (sizes are in cqw, a percentage of the block's own width), like the image does.
// The pictures inside each block are placeholders (solid colour) until the real ones are supplied.

// Image geometry, in px, taken from the 1800 x 813 original: each block is 578 x 813.
const W = 578;
const H = 813;
const cqw = (px: number) => `${((px / W) * 100).toFixed(3)}cqw`;
const pctX = (px: number) => `${((px / W) * 100).toFixed(3)}%`;
const pctY = (px: number) => `${((px / H) * 100).toFixed(3)}%`;

type Block = {
  tag: string;
  title: string;
  body: string;
  bg: string; // block background
  ink: string; // title + body colour
  bodyInk: string;
  pillBg: string;
  pillInk: string;
  bodyExtraTop?: number; // the middle block's text starts a little lower in the image
  // placeholder box for the picture, as fractions of the block (px in the original)
  art: { left: number; top: number; width?: number; height?: number; right?: number; bottom?: number; color: string; radius?: string; clip?: boolean; float?: { depth: number; shadow: string } };
  // a real picture / illustration to show instead of the placeholder box (same left/top/width as `art`)
  artNode?: ReactNode;
  // something drawn outside the block's clipped edge (so it can stick out past the block)
  outside?: ReactNode;
};

const BLOCKS: Block[] = [
  {
    tag: "Consumer",
    title: "Checkout",
    body: "A consumer-facing checkout, which is what shoppers see when they make a purchase.",
    bg: "#ffffff", ink: "#0b0b0f", bodyInk: "#0b0b0f", pillBg: "#2563eb", pillInk: "#ffffff",
    art: { left: 75, top: 286, width: 430, height: 509, color: "#eceff4", float: { depth: 1.7, shadow: "0 10px 30px rgba(15,25,50,0.14)" } },
    artNode: <CheckoutPaymentArt />,
  },
  {
    tag: "Merchant admin tool",
    title: "Commerce Center",
    body: "A merchant-facing admin tool, where businesses customize the checkout’s look, payment methods, security settings, and access reports—all without needing technical expertise.",
    bg: "#2563eb", ink: "#ffffff", bodyInk: "rgba(255,255,255,0.92)", pillBg: "rgba(255,255,255,0.35)", pillInk: "#ffffff",
    bodyExtraTop: 15,
    // runs 20px past the block's right and bottom edges (the block clips it) so it never shows a gap when it moves
    art: { left: 74, top: 390, right: -20, bottom: -20, color: "#f1f5ff", radius: `${cqw(12)} 0 0 0`, clip: true, float: { depth: 1.7, shadow: "0 14px 36px rgba(6,18,80,0.4)" } },
    artNode: <CommerceArt />,
  },
  {
    tag: "White-label design system",
    title: "Chameleon",
    body: "A flexible and scalable design system that helps merchants match their branding while staying compliant and easy to use.",
    bg: "#fec240", ink: "#0b0b0f", bodyInk: "#0b0b0f", pillBg: "#2563eb", pillInk: "#ffffff",
    // the illustration is rebuilt in code: a 517 x 519 square at (30, 269) in the 578 x 813 block
    art: { left: 30, top: 269, width: 517, height: 519, color: "#ffe29a" },
    artNode: <ChameleonArt />,
    // a stickman hanging on the block's right edge, head and arms sticking out past it. In the 240 x 240 SVG
    // the "pole" he holds is at x = 96, which sits on the block's right edge (578). Drawn at 0.7 of his first
    // size: 392 px wide in the 578 px block, so left = 578 - 96/240 * 392 = 421. His top stays where it was
    // (the pole starts about 172 px down), so top = 172 - 43.75/240 * 392 = 100.6.
    outside: (
      <span
        aria-hidden
        className="pointer-events-none absolute z-10 hidden lg:block"
        style={{
          left: pctX(421), top: pctY(100.6), width: pctX(392), aspectRatio: "1 / 1",
          background: "rgb(var(--fg-primary))",
          maskImage: "url(/images/checkout/stickman-peek.svg)", WebkitMaskImage: "url(/images/checkout/stickman-peek.svg)",
          maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskSize: "contain", WebkitMaskSize: "contain",
        }}
      />
    ),
  },
];

export function ThreeProductsBlocks() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-[1.78%]" style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
      {BLOCKS.map((b) => (
        <div key={b.title} data-parallax-block className="relative [container-type:inline-size]" style={{ aspectRatio: `${W} / ${H}` }}>
          <div className="absolute inset-0 overflow-hidden" style={{ background: b.bg, borderRadius: cqw(40), color: b.ink }}>
            <div style={{ padding: `${cqw(75)} ${cqw(75)} 0` }}>
              <span
                className="inline-block rounded-full font-medium uppercase"
                style={{
                  background: b.pillBg, color: b.pillInk, fontSize: cqw(15), letterSpacing: "0.1em",
                  lineHeight: cqw(30), height: cqw(30), padding: `0 ${cqw(15)}`, whiteSpace: "nowrap",
                }}
              >
                {b.tag}
              </span>
              <h3 className="m-0 font-semibold" style={{ marginTop: cqw(20), fontSize: cqw(34), lineHeight: 1.2, letterSpacing: "-0.01em", color: b.ink }}>
                {b.title}
              </h3>
              <p className="m-0" style={{ marginTop: cqw(11 + (b.bodyExtraTop ?? 0)), fontSize: cqw(19.8), letterSpacing: "-0.012em", lineHeight: cqw(31), color: b.bodyInk }}>
                {b.body}
              </p>
            </div>

            {/* the picture: a placeholder box, or a rebuilt illustration. If it has `float`, the whole picture
                moves as one object with the mouse (parallax) and has a soft shadow behind it. */}
            {(() => {
              const style = {
                left: pctX(b.art.left), top: pctY(b.art.top),
                width: b.art.width !== undefined ? pctX(b.art.width) : undefined,
                height: b.art.height !== undefined ? pctY(b.art.height) : undefined,
                right: b.art.right !== undefined ? pctX(b.art.right) : undefined,
                bottom: b.art.bottom !== undefined ? pctY(b.art.bottom) : undefined,
                background: b.artNode ? undefined : b.art.color, borderRadius: b.art.radius, overflow: b.art.clip ? ("hidden" as const) : undefined,
              };
              return b.art.float ? (
                <ParallaxBox depth={b.art.float.depth} shadow={b.art.float.shadow} style={style}>
                  {b.artNode}
                </ParallaxBox>
              ) : (
                <div aria-hidden={b.artNode ? undefined : true} className="absolute" style={style}>
                  {b.artNode}
                </div>
              );
            })()}
          </div>
          {b.outside}
        </div>
      ))}
    </div>
  );
}
