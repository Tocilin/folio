"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export function CaseStudyTOC({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const updateActive = () => {
      const line = 120;
      let current = elements[0]?.id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      if (current) setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [items]);

  return (
    <nav className="hidden lg:flex flex-col gap-3 sticky top-32 self-start shrink-0 w-40">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`text-sm transition-colors duration-200 ${
            activeId === item.id
              ? "text-fg-primary font-medium"
              : "text-fg-tertiary hover:text-fg-secondary"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
