"use client";

import { useState } from "react";
import { DeviceCanvas } from "@/app/components/DeviceCanvas";
import { CheckoutDemoOverlay } from "@/app/components/CheckoutDemoOverlay";
import { CheckoutCardsLayout } from "@/app/components/CheckoutCardsLayout";
import { CheckoutWizardLayout } from "@/app/components/CheckoutWizardLayout";
import { CK } from "@/app/components/checkoutTokens";

// One canvas, three pages. The Desktop / Tablet / Mobile switch (DeviceCanvas) works with any of them;
// the Demo / Guest / Member switch swaps the page inside the same card. All use the same palette
// (checkoutTokens), so the only difference is structure.
//   Demo   = the Guest checkout playing itself (a cursor fills the forms; the mouse is blocked)
//   Guest  = the checkout split into separate pages you click through (tab bar + Back/Continue)
//   Member = the signed-in review page (saved contact, address, shipping and payment blocks)

type LayoutId = "demo" | "guest" | "member";

const LAYOUTS: { id: LayoutId; label: string }[] = [
  { id: "demo", label: "Demo" },
  { id: "guest", label: "Guest" },
  { id: "member", label: "Member" },
];

export function CheckoutShowcase() {
  const [layout, setLayout] = useState<LayoutId>("demo");
  const [run, setRun] = useState(0); // bumping this remounts the page (the demo uses it to start clean)

  return (
    <DeviceCanvas
      background={CK.page}
      color={CK.body}
      border={CK.line}
      resetKey={layout}
      overlay={layout === "demo" ? <CheckoutDemoOverlay onReset={() => setRun((r) => r + 1)} /> : undefined}
      controls={
        <div role="group" aria-label="Checkout layout" className="flex rounded-full border border-stroke bg-fill-surface p-0.5 text-xs">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={layout === l.id}
              onClick={() => setLayout(l.id)}
              className={`h-8 rounded-full px-3.5 transition-colors ${
                layout === l.id ? "bg-fg-primary text-fill-surface" : "text-fg-secondary hover:text-fg-primary"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      }
    >
      {layout === "member" ? <CheckoutCardsLayout /> : <CheckoutWizardLayout key={`${layout}-${run}`} />}
    </DeviceCanvas>
  );
}
