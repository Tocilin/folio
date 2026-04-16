"use client";

export function AvailableTag() {
  return (
    <div className="relative group inline-flex items-center shrink-0 cursor-default select-none">
      {/* Doodle — hidden by default, pops up on hover */}
      <img
        src="/images/doodle.svg"
        alt=""
        aria-hidden="true"
        className="
          absolute -top-14 right-0
          w-12 h-12 object-contain
          opacity-0 translate-y-2 scale-90
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          pointer-events-none
        "
      />
      <span className="text-sm text-fg-tertiary">Available for work</span>
    </div>
  );
}
