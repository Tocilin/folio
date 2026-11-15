"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { CK } from "@/app/components/checkoutTokens";
import { Field, PaymentMethodFields, type PayChoice, SHIPPING, ShippingMethodOptions } from "@/app/components/CheckoutStepsLayout";

// A code-built recreation of the "storelogo" checkout page for a signed-in member. Two columns on
// wider screens; on narrow screens it folds into the single-column mobile order
// (order summary after the shipping/payment blocks, place-order block last).
// Each block has an Edit link that swaps it for a small form with Save / Cancel. Saving updates the
// summary text; shipping also updates the Shipping row and the Total.

const INK = CK.ink;
const BODY = CK.body;
const MUTED = CK.muted;
const LINE = CK.line;
const BLUE = CK.accent;
const GREEN = CK.green;

function Block({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-md bg-white p-5 ${className}`}
      style={{ border: `1px solid ${LINE}`, boxShadow: "0 1px 2px rgba(20,40,80,0.04)" }}
    >
      {children}
    </div>
  );
}

function BlockTitle({ children, onEdit }: { children: ReactNode; onEdit?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h4 className="m-0 text-base font-medium tracking-tight [@container(min-width:560px)]:text-[17px]" style={{ color: INK }}>
        {children}
      </h4>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${typeof children === "string" ? children : ""}`}
          className="cursor-pointer text-xs underline decoration-1 underline-offset-[3px] outline-none transition-opacity focus-visible:rounded-sm focus-visible:shadow-[0_0_0_3px_rgba(11,116,234,0.25)] [@media(hover:hover)]:hover:opacity-70"
          style={{ color: BLUE }}
        >
          Edit
        </button>
      )}
    </div>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <path d="M2 7.2 11 3v6.6L2 14Z" fill="#1f6fe0" />
        <path d="M13 3.2 22 6v6.8l-9 4.2Z" fill={BLUE} />
        <path d="M2 15.2 11 11v9.6L2 17.6Z" fill="#46a0ff" />
        <path d="m13 18.2 9-4.2v4.6L13 21.6Z" fill="#1f6fe0" />
      </svg>
      <span className="text-lg font-semibold tracking-tight [@container(min-width:560px)]:text-[22px]" style={{ color: INK }}>
        storelogo
      </span>
    </span>
  );
}

function VisaTile() {
  return (
    <span
      className="inline-flex items-center justify-center bg-white"
      style={{ width: 28, height: 19, border: "1px solid #d8dde6", borderRadius: 3 }}
    >
      <span style={{ color: "#1a3a9c", fontWeight: 800, fontStyle: "italic", fontSize: 9, letterSpacing: -0.2 }}>VISA</span>
    </span>
  );
}

function Lock() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="7" width="10" height="7" rx="1.6" />
      <path d="M5.2 7V5.4a2.8 2.8 0 0 1 5.6 0V7" />
    </svg>
  );
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm" style={{ color: color ?? BODY }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

// A summary block with an Edit link. Narrow: title and Edit on one row, values below. Desktop: three
// columns in one row (title | values | Edit). While editing, the form opens under the title row.
function InfoBlock({ title, open, onEdit, form, view }: { title: string; open: boolean; onEdit: () => void; form: ReactNode; view: ReactNode }) {
  return (
    <Block>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-4 [@container(min-width:900px)]:grid-cols-[170px_minmax(0,1fr)_auto] [@container(min-width:900px)]:gap-x-6">
        <h4 className="m-0 col-start-1 row-start-1 text-base font-medium tracking-tight [@container(min-width:560px)]:text-[17px]" style={{ color: INK }}>
          {title}
        </h4>
        {!open && (
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${title}`}
            className="col-start-2 row-start-1 cursor-pointer text-xs underline decoration-1 underline-offset-[3px] outline-none transition-opacity focus-visible:rounded-sm focus-visible:shadow-[0_0_0_3px_rgba(11,116,234,0.25)] [@container(min-width:900px)]:col-start-3 [@container(min-width:900px)]:pt-1 [@media(hover:hover)]:hover:opacity-70"
            style={{ color: BLUE }}
          >
            Edit
          </button>
        )}
        <div
          className={
            open
              ? "col-span-full row-start-2"
              : "col-span-2 row-start-2 [@container(min-width:900px)]:col-span-1 [@container(min-width:900px)]:col-start-2 [@container(min-width:900px)]:row-start-1 [@container(min-width:900px)]:pt-[3px]"
          }
        >
          {open ? form : view}
        </div>
      </div>
    </Block>
  );
}

const FORM_GRID = "grid gap-4 [@container(min-width:1000px)]:grid-cols-2";

function FormActions({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="mt-5 flex items-center gap-3">
      <button
        type="submit"
        className="h-10 cursor-pointer rounded-sm px-5 text-sm font-medium text-white outline-none transition-[filter,box-shadow] focus-visible:shadow-[0_0_0_3px_rgba(11,116,234,0.25)] [@media(hover:hover)]:hover:brightness-95"
        style={{ background: BLUE }}
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="h-10 cursor-pointer rounded-sm bg-white px-5 text-sm font-medium outline-none transition-[filter,box-shadow] focus-visible:shadow-[0_0_0_3px_rgba(11,116,234,0.25)] [@media(hover:hover)]:hover:brightness-95"
        style={{ border: `1px solid ${LINE}`, color: INK }}
      >
        Cancel
      </button>
    </div>
  );
}

// Each form keeps its own draft, so Cancel throws away what you typed and Save hands it back.
function EditForm<T>({
  initial, onSave, onCancel, children,
}: {
  initial: T; onSave: (v: T) => void; onCancel: () => void;
  children: (draft: T, set: (patch: Partial<T>) => void) => ReactNode;
}) {
  const [draft, setDraft] = useState(initial);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
    >
      {children(draft, (patch) => setDraft((d) => ({ ...d, ...patch })))}
      <FormActions onCancel={onCancel} />
    </form>
  );
}

type Contact = { email: string; phone: string };
type Address = { name: string; company: string; street: string; apt: string; city: string; state: string; zip: string; phone: string };
type Key = "contact" | "address" | "shipping" | "payment";

const ITEMS_TOTAL = 288.0; // everything in the Total except shipping
const money = (n: number) => `$${n.toFixed(2)}`;

export function CheckoutCardsLayout() {
  const [open, setOpen] = useState<Record<Key, boolean>>({ contact: false, address: false, shipping: false, payment: false });
  const edit = (k: Key) => setOpen((o) => ({ ...o, [k]: true }));
  const close = (k: Key) => setOpen((o) => ({ ...o, [k]: false }));

  const [contact, setContact] = useState<Contact>({ email: "john.smith@company.com", phone: "779-345-8877" });
  const [address, setAddress] = useState<Address>({
    name: "John Smith", company: "JP Morgan Chase", street: "10 S Dearborn St,", apt: "Floor 16",
    city: "Chicago", state: "IL", zip: "60603", phone: "779-236-9977",
  });
  const [ship, setShip] = useState("Free");
  const [pay, setPay] = useState<PayChoice>("visa");

  const method = SHIPPING.find((o) => o.title === ship) ?? SHIPPING[0];
  const shipCost = parseFloat(method.price.replace("$", ""));
  const total = money(ITEMS_TOTAL + shipCost);

  return (
    <>
      {/* top bar */}
      <header
        className="flex items-center gap-3 bg-white px-4 py-3 [@container(min-width:560px)]:gap-6 [@container(min-width:560px)]:px-8 [@container(min-width:560px)]:py-4 [@container(min-width:900px)]:!px-[8%]"
        style={{ borderBottom: `1px solid ${LINE}` }}
      >
        <Logo />
        <span className="hidden h-5 w-px [@container(min-width:560px)]:block" style={{ background: LINE }} aria-hidden />
        <h3 className="m-0 text-base font-medium tracking-tight [@container(min-width:560px)]:text-xl" style={{ color: INK }}>
          Checkout
        </h3>
        <span className="ml-auto shrink-0 whitespace-nowrap text-xs underline decoration-1 underline-offset-[3px]" style={{ color: BLUE }}>
          Return to Cart
        </span>
      </header>

      <div className="grid gap-4 p-4 [@container(min-width:560px)]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] [@container(min-width:560px)]:gap-x-6 [@container(min-width:560px)]:p-6 [@container(min-width:720px)]:p-8 [@container(min-width:900px)]:!grid-cols-[minmax(0,1fr)_32.3%] [@container(min-width:900px)]:!gap-x-10 [@container(min-width:900px)]:!px-[8%] [@container(min-width:900px)]:!py-10">
        {/* left column (flattened into one column on narrow screens) */}
        <div className="contents [@container(min-width:560px)]:flex [@container(min-width:560px)]:flex-col [@container(min-width:560px)]:gap-4">
          <InfoBlock title="Contact Information" open={open.contact} onEdit={() => edit("contact")}
            form={
                <EditForm initial={contact} onSave={(v) => { setContact(v); close("contact"); }} onCancel={() => close("contact")}>
                  {(d, set) => (
                    <div className={FORM_GRID}>
                      <Field label="Email Address" placeholder="Email Address" value={d.email} onChange={(v) => set({ email: v })} autoFocus />
                      <Field label="Phone Number" placeholder="Phone Number" value={d.phone} onChange={(v) => set({ phone: v })} />
                    </div>
                  )}
                </EditForm>
            }
            view={
                <div className="flex flex-col gap-0.5 text-[13px] leading-relaxed" style={{ color: BODY }}>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </div>
            }
          />

          <InfoBlock title="Shipping Address" open={open.address} onEdit={() => edit("address")}
            form={
                <EditForm initial={address} onSave={(v) => { setAddress(v); close("address"); }} onCancel={() => close("address")}>
                  {(d, set) => (
                    <div className={FORM_GRID}>
                      <Field label="Full Name" placeholder="Full Name" value={d.name} onChange={(v) => set({ name: v })} autoFocus />
                      <Field label="Company" placeholder="Company" value={d.company} onChange={(v) => set({ company: v })} />
                      <Field label="Street Address" placeholder="Street Address" value={d.street} onChange={(v) => set({ street: v })} />
                      <Field label="Apt / Floor" placeholder="Apt / Floor" value={d.apt} onChange={(v) => set({ apt: v })} />
                      <Field label="City" placeholder="City" value={d.city} onChange={(v) => set({ city: v })} />
                      <Field label="State" placeholder="State" value={d.state} onChange={(v) => set({ state: v })} />
                      <Field label="ZIP Code" placeholder="ZIP Code" value={d.zip} onChange={(v) => set({ zip: v })} />
                      <Field label="Phone Number" placeholder="Phone Number" value={d.phone} onChange={(v) => set({ phone: v })} />
                    </div>
                  )}
                </EditForm>
            }
            view={
                <div className="flex flex-col gap-0.5 text-[13px] leading-relaxed" style={{ color: BODY }}>
                  {[address.name, address.company, address.street, address.apt, [address.city, [address.state, address.zip].filter(Boolean).join(" ")].filter(Boolean).join(", "), address.phone]
                    .filter(Boolean)
                    .map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                </div>
            }
          />

          <InfoBlock title="Shipping Method" open={open.shipping} onEdit={() => edit("shipping")}
            form={
                <EditForm initial={{ ship }} onSave={(v) => { setShip(v.ship); close("shipping"); }} onCancel={() => close("shipping")}>
                  {(d, set) => <ShippingMethodOptions selected={d.ship} onSelect={(t) => set({ ship: t })} />}
                </EditForm>
            }
            view={
                <div className="flex flex-col gap-0.5 text-[13px] leading-relaxed" style={{ color: BODY }}>
                  <span>{method.title}</span>
                  <span>{method.sub}</span>
                  {shipCost > 0 && <span>{method.price}</span>}
                </div>
            }
          />

          <InfoBlock title="Payment Method" open={open.payment} onEdit={() => edit("payment")}
            form={
                <EditForm initial={{ pay }} onSave={(v) => { setPay(v.pay); close("payment"); }} onCancel={() => close("payment")}>
                  {(d, set) => <PaymentMethodFields choice={d.pay} onChoose={(c) => set({ pay: c })} />}
                </EditForm>
            }
            view={
                <div className="flex items-center gap-2 text-[13px]" style={{ color: BODY }}>
                  {pay === "visa" && (
                    <>
                      <VisaTile />
                      <span>Ending in 4242</span>
                    </>
                  )}
                  {pay === "mastercard" && <span>Mastercard ending in 9813</span>}
                  {pay === "new" && <span>New card</span>}
                </div>
            }
          />
        </div>

        {/* right column (cart + summary) */}
        <div className="contents [@container(min-width:560px)]:col-start-2 [@container(min-width:560px)]:row-span-2 [@container(min-width:560px)]:row-start-1 [@container(min-width:560px)]:flex [@container(min-width:560px)]:flex-col [@container(min-width:560px)]:gap-4 [@container(min-width:560px)]:self-start">
          <Block>
            <BlockTitle>Cart Items</BlockTitle>
            <div className="mt-4 flex items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-md" style={{ background: CK.tile }}>
                <Image src="/images/checkout/product-airpods.png" alt="Apple AirPods" width={64} height={64} className="h-16 w-16 object-contain mix-blend-multiply" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5 text-xs leading-relaxed" style={{ color: MUTED }}>
                <span className="text-[13px] font-medium" style={{ color: INK }}>
                  Apple AirPods
                </span>
                <span>Color: White</span>
                <span>Qty: 1</span>
              </div>
            </div>
          </Block>

          <Block>
            <BlockTitle>Order Summary</BlockTitle>
            <div className="mt-4 flex flex-col gap-2.5">
              <Row label="Subtotal" value="$275.99" />
              <Row label="Discount" value="-$6.99(20%)" color={GREEN} />
              <Row label="Shipping" value={shipCost > 0 ? money(shipCost) : "Free"} />
              <Row label="Tax" value="$13.10" />
            </div>
            {/* on narrow screens the total lives inside the summary card */}
            <div className="mt-4 flex items-center justify-between pt-4 text-sm font-medium [@container(min-width:560px)]:hidden" style={{ borderTop: `1px solid ${LINE}`, color: INK }}>
              <span>Total</span>
              <span>{total}</span>
            </div>
          </Block>

          {/* on wider screens it is its own card */}
          <Block className="hidden items-center justify-between [@container(min-width:560px)]:flex">
            <h4 className="m-0 text-[17px] font-medium tracking-tight" style={{ color: INK }}>
              Total
            </h4>
            <span className="text-lg font-medium" style={{ color: INK }}>
              {total}
            </span>
          </Block>
        </div>

        {/* place order */}
        <Block className="[@container(min-width:560px)]:col-start-1">
          <p className="m-0 text-xs leading-relaxed" style={{ color: MUTED }}>
            By placing your order, you agree to our{" "}
            <span className="underline underline-offset-2" style={{ color: BLUE }}>Privacy Policy</span> and{" "}
            <span className="underline underline-offset-2" style={{ color: BLUE }}>Terms of Use</span>
          </p>
          <button
            type="button"
            className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center gap-2 text-sm font-medium outline-none transition-[filter,box-shadow] focus-visible:shadow-[0_0_0_3px_rgba(11,116,234,0.25)] [@media(hover:hover)]:hover:brightness-95"
            style={{ background: BLUE, color: "#fff", borderRadius: 3 }}
          >
            <Lock />
            Place Order
          </button>
        </Block>
      </div>
    </>
  );
}
