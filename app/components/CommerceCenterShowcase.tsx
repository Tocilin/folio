"use client";

import { COMMERCE_H, COMMERCE_W, CommerceCenterMock } from "@/app/components/CommerceCenterMock";
import { DeviceCanvas } from "@/app/components/DeviceCanvas";

// The Commerce Center screenshot, rebuilt in code, on a dot-grid canvas like the other demos.
// Desktop only (it is a fixed-size recreation, so there is no Desktop / Tablet / Mobile switch): it is
// drawn at its real size and shrunk to fit the canvas, and the expand button shows it at full size.
export function CommerceCenterShowcase() {
  return (
    <DeviceCanvas
      background="#f8f8f8"
      color="#161616"
      border="#e3e3e3"
      devices={false}
      fixedWidth={COMMERCE_W}
      fixedHeight={COMMERCE_H}
    >
      <CommerceCenterMock />
    </DeviceCanvas>
  );
}
