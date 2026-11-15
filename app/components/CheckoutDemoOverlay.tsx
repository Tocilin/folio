"use client";

import { useEffect, useRef } from "react";

// EXPERIMENT: an auto-playing walkthrough of the Guest checkout. This layer sits on top of the
// card, blocks the mouse, and drives the real page underneath: a fake cursor glides to each field,
// types into it and clicks Continue, until the confirmation page, then starts over. To remove the
// experiment: delete this file, the "Demo" entry in CheckoutShowcase, and the `overlay` prop.

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const TYPE_MS = 55; // per character
const MOVE_MS = 800; // cursor glide

export function CheckoutDemoOverlay({ onReset }: { onReset?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const cursor = cursorRef.current;
    const ripple = rippleRef.current;
    if (!root || !cursor || !ripple) return;
    const card = root.parentElement as HTMLElement; // the scaled card
    const scroller = card.firstElementChild as HTMLElement; // its scrolling page
    let alive = true;
    let visible = true;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 });
    io.observe(card);

    // sleep, but hold still while the demo is scrolled out of view or the tab is in the background
    const wait = async (ms: number) => {
      await sleep(ms);
      while (alive && (!visible || document.hidden)) await sleep(300);
      if (!alive) throw new Error("stopped");
    };

    const scale = () => card.getBoundingClientRect().width / card.offsetWidth || 1;

    const find = <T extends HTMLElement>(get: () => T | null | undefined, what: string): T => {
      const el = get();
      if (!el) throw new Error(`demo: ${what} not found`);
      return el;
    };
    const byLabel = (label: string) =>
      find(() => {
        const l = [...card.querySelectorAll("label")].find((x) => x.textContent?.trim() === label);
        return l ? (document.getElementById(l.htmlFor) as HTMLInputElement | null) : null;
      }, `field "${label}"`) as HTMLInputElement;
    const byText = (sel: string, text: string, exact = false) =>
      find(
        () =>
          [...card.querySelectorAll<HTMLElement>(sel)].find((x) => {
            const t = x.textContent?.trim() ?? "";
            return x.offsetParent && (exact ? t === text : t.includes(text));
          }),
        `"${text}"`,
      );

    // keep the target comfortably inside the page's scroll window
    const reveal = async (el: HTMLElement) => {
      const s = scale();
      const er = el.getBoundingClientRect();
      const sr = scroller.getBoundingClientRect();
      const top = (er.top - sr.top) / s;
      const bottom = (er.bottom - sr.top) / s;
      if (top < 24 || bottom > scroller.clientHeight - 24) {
        scroller.scrollTo({ top: scroller.scrollTop + top - scroller.clientHeight / 2 + er.height / (2 * s), behavior: "smooth" });
        await wait(550);
      }
    };

    const moveTo = async (el: HTMLElement, where: "center" | "left" = "center") => {
      await reveal(el);
      const s = scale();
      const cr = card.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const x = (er.left + (where === "left" ? Math.min(60, er.width / 3) * s : er.width / 2) - cr.left) / s;
      const y = (er.top + er.height / 2 - cr.top) / s;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      await wait(MOVE_MS);
    };

    const press = async () => {
      ripple.animate(
        [
          { opacity: 0.55, transform: "translate(-50%, -50%) scale(0.3)" },
          { opacity: 0, transform: "translate(-50%, -50%) scale(1.6)" },
        ],
        { duration: 480, easing: "ease-out" },
      );
      await wait(180);
    };

    const click = async (el: HTMLElement) => {
      await moveTo(el);
      await press();
      el.click();
      await wait(450);
    };

    const type = async (label: string, text: string) => {
      const input = byLabel(label);
      await moveTo(input, "left");
      await press();
      input.focus({ preventScroll: true });
      const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
      for (let i = 1; i <= text.length; i++) {
        set.call(input, text.slice(0, i));
        input.dispatchEvent(new Event("input", { bubbles: true }));
        await wait(TYPE_MS);
      }
      await wait(200);
      input.blur();
    };

    const button = (label: string) => byText("button", label, true);

    const play = async () => {
      // start off-screen at the bottom right
      cursor.style.transition = "none";
      cursor.style.transform = `translate(${card.offsetWidth * 0.85}px, ${card.offsetHeight * 0.9}px)`;
      void cursor.offsetWidth;
      cursor.style.transition = `transform ${MOVE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      await wait(1500);

      // 1. personal details
      await type("First Name", "Alex");
      await type("Last Name", "Morgan");
      await type("Email Address", "alex.morgan@example.com");
      await type("Phone Number", "+1 415 555 0134");
      await click(button("Continue"));

      // 2. shipping details
      await type("Street Address", "21 Market Street");
      await type("ZIP Code", "94105");
      await type("City", "San Francisco");
      await click(button("Continue"));

      // 3. shipping method
      await click(byText('[role="radio"]', "Express"));
      await wait(500);
      await click(button("Continue"));

      // 4. payment: add a new card
      await click(byText('[role="radio"]', "Add New Card"));
      await wait(300);
      await type("Card Number", "4242 4242 4242 4242");
      await type("Card Holder Name", "Alex Morgan");
      await type("Expiry Date", "08/28");
      await type("CVC/CVV", "123");
      await click(button("Place Order"));

      // 5. confirmation, then start over
      await wait(4500);
      await click(button("Continue shopping"));
      await wait(1200);
    };

    (async () => {
      while (alive) {
        try {
          await play();
        } catch (e) {
          if (!alive) return;
          console.warn(e); // something moved (e.g. the layout was switched): reset the page and go again
          onReset?.();
          await sleep(1500);
        }
      }
    })();

    return () => {
      alive = false;
      io.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // blocks every mouse event; the cursor below is only a drawing
    <div ref={rootRef} className="absolute inset-0 z-30 cursor-default select-none overflow-hidden" aria-hidden onWheel={(e) => e.stopPropagation()}>
      <div ref={cursorRef} className="pointer-events-none absolute left-0 top-0 will-change-transform">
        <span
          ref={rippleRef}
          className="absolute left-0 top-0 h-10 w-10 rounded-full opacity-0"
          style={{ background: "rgba(11,116,234,0.45)", transform: "translate(-50%, -50%)" }}
        />
        <svg width="26" height="26" viewBox="0 0 24 24" className="relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
          <path d="M5 3.2 19.2 11l-6.3 1.6L10 19 5 3.2Z" fill="#111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
