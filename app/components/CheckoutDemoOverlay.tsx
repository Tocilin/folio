"use client";

import { DemoLayer, type Demo } from "@/app/components/DemoLayer";

// EXPERIMENT: the auto-playing walkthrough of the Guest checkout. A fake cursor fills each step and
// clicks Continue until the confirmation page, then starts over. To remove the experiment: delete
// this file and DemoLayer.tsx, the "Demo" entry in CheckoutShowcase, and the `overlay` prop.

async function play(d: Demo) {
  const button = (label: string) => d.byText("button", label, true);

  // 1. personal details
  await d.type(d.byLabel("First Name"), "Alex");
  await d.type(d.byLabel("Last Name"), "Morgan");
  await d.type(d.byLabel("Email Address"), "alex.morgan@example.com");
  await d.type(d.byLabel("Phone Number"), "+1 415 555 0134");
  await d.click(button("Continue"));

  // 2. shipping details
  await d.type(d.byLabel("Street Address"), "21 Market Street");
  await d.type(d.byLabel("ZIP Code"), "94105");
  await d.type(d.byLabel("City"), "San Francisco");
  await d.click(button("Continue"));

  // 3. shipping method
  await d.click(d.byText('[role="radio"]', "Express"));
  await d.wait(500);
  await d.click(button("Continue"));

  // 4. payment: add a new card
  await d.click(d.byText('[role="radio"]', "Add New Card"));
  await d.wait(300);
  await d.type(d.byLabel("Card Number"), "4242 4242 4242 4242");
  await d.type(d.byLabel("Card Holder Name"), "Alex Morgan");
  await d.type(d.byLabel("Expiry Date"), "08/28");
  await d.type(d.byLabel("CVC/CVV"), "123");
  await d.click(button("Place Order"));

  // 5. confirmation, then start over
  await d.wait(4500);
  await d.click(button("Continue shopping"));
  await d.wait(1200);
}

export function CheckoutDemoOverlay({ onReset }: { onReset?: () => void }) {
  return <DemoLayer play={play} onReset={onReset} scrollInside />;
}
