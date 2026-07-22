"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export function CaseStudyTOC({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
