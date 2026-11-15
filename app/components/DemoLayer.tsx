"use client";

import { useEffect, useRef } from "react";

// EXPERIMENT: a reusable "auto-play" layer. Put it inside a `position: relative` box. It covers the
// box (blocking the mouse), draws a fake cursor, and runs a script against the real page underneath:
// `play(d)` gets a small toolkit (find things, glide the cursor, click, type) and the layer repeats
// the script forever. It pauses while scrolled out of view, and calls `onReset` (so the page can be
// put back to its starting state) if the script ever fails to find something.

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type Demo = {
  wait: (ms: number) => Promise<void>;
  /** first visible element matching a selector (ignores the invisible height-reserving copies) */
  q: (sel: string) => HTMLElement;
  /** first visible element matching a selector whose text matches */
  byText: (sel: string, text: string, exact?: boolean) => HTMLElement;
  /** the input belonging to a <label> with this exact text */
  byLabel: (label: string) => HTMLInputElement;
  /** glide the cursor to an element, press, and click it */
  click: (el: HTMLElement) => Promise<void>;
  /** glide to an input, focus it and type into it character by character */
  type: (input: HTMLInputElement, text: string) => Promise<void>;
  /** is this element enabled and visible right now? */
  isLive: (el: HTMLElement | null | undefined) => boolean;
};

export function DemoLayer({
  play, onReset, scrollInside = false, typeMs = 55, moveMs = 800,
}: {
  play: (d: Demo) => Promise<void>;
  onReset?: () => void;
  /** the box's first child scrolls (a fixed-height page); the cursor scrolls it to reach things */
  scrollInside?: boolean;
  typeMs?: number;
  moveMs?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);
  // keep the latest callbacks without restarting the script
  const playRef = useRef(play);
  const resetRef = useRef(onReset);
  playRef.current = play;
  resetRef.current = onReset;

  useEffect(() => {
    const root = rootRef.current;
    const cursor = cursorRef.current;
    const ripple = rippleRef.current;
    if (!root || !cursor || !ripple) return;
    const box = root.parentElement as HTMLElement;
    const scroller = scrollInside ? (box.firstElementChild as HTMLElement) : null;
    let alive = true;
    let visible = true;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 });
    io.observe(box);

    // sleep, but hold still while out of view or while the browser tab is in the background
    const wait = async (ms: number) => {
      await sleep(ms);
      while (alive && (!visible || document.hidden)) await sleep(300);
      if (!alive) throw new Error("stopped");
    };

    const scale = () => box.getBoundingClientRect().width / box.offsetWidth || 1;
    const usable = (x: HTMLElement) => !!x.offsetParent && !x.closest("[inert]") && !x.closest("[data-demo-skip]");
    const live = (el: HTMLElement | null | undefined) => !!el && usable(el) && !(el as HTMLButtonElement).disabled;

    const find = (get: () => HTMLElement | null | undefined, what: string): HTMLElement => {
      const el = get();
      if (!el) throw new Error(`demo: ${what} not found`);
      return el;
    };
    const q = (sel: string) => find(() => [...box.querySelectorAll<HTMLElement>(sel)].find(usable), sel);
    const byText = (sel: string, text: string, exact = false) =>
      find(
        () =>
          [...box.querySelectorAll<HTMLElement>(sel)].find((x) => {
            const t = x.textContent?.trim() ?? "";
            return usable(x) && (exact ? t === text : t.includes(text));
          }),
        `${sel} "${text}"`,
      );
    // (labels can be `display: contents`, which has no layout box, so check the input, not the label)
    const byLabel = (label: string) =>
      find(() => {
        for (const l of box.querySelectorAll("label")) {
          if (l.textContent?.trim() !== label) continue;
          const input = document.getElementById(l.htmlFor);
          if (input && usable(input)) return input;
        }
        return null;
      }, `field "${label}"`) as HTMLInputElement;

    // keep the target comfortably inside the scrolling page
    const reveal = async (el: HTMLElement) => {
      if (!scroller) return;
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
      const cr = box.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const x = (er.left + (where === "left" ? Math.min(60, er.width / 3) * s : er.width / 2) - cr.left) / s;
      const y = (er.top + er.height / 2 - cr.top) / s;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      await wait(moveMs);
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

    const d: Demo = {
      wait,
      q,
      byText,
      byLabel,
      isLive: live,
      click: async (el) => {
        await moveTo(el);
        await press();
        el.click();
        await wait(450);
      },
      type: async (input, text) => {
        await moveTo(input, "left");
        await press();
        input.focus({ preventScroll: true });
        const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
        for (let i = 1; i <= text.length; i++) {
          set.call(input, text.slice(0, i));
          input.dispatchEvent(new Event("input", { bubbles: true }));
          await wait(typeMs);
        }
        await wait(200);
        input.blur();
      },
    };

    (async () => {
      while (alive) {
        try {
          // start near the bottom right
          cursor.style.transition = "none";
          cursor.style.transform = `translate(${box.offsetWidth * 0.85}px, ${box.offsetHeight * 0.9}px)`;
          void cursor.offsetWidth;
          cursor.style.transition = `transform ${moveMs}ms cubic-bezier(0.4, 0, 0.2, 1)`;
          await wait(1500);
          await playRef.current(d);
        } catch (e) {
          if (!alive) return;
          console.warn(e); // something moved (e.g. the layout was switched): reset the page and go again
          resetRef.current?.();
          await sleep(1500);
        }
      }
    })();

    return () => {
      alive = false;
      io.disconnect();
    };
  }, [scrollInside, typeMs, moveMs]);

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
