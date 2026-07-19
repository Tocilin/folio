"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "debug" | "violet";

const THEME_CLASSES = ["light", "debug", "violet"];

const THEMES: { id: Theme; label: string; swatch: string }[] = [
  { id: "dark",   label: "Dark theme",   swatch: "rgb(var(--neutral-950))" },
  { id: "light",  label: "Light theme",  swatch: "rgb(var(--neutral-50))" },
  { id: "debug",  label: "Debug theme",  swatch: "rgb(var(--peach-500))" },
  { id: "violet", label: "Violet theme", swatch: "rgb(var(--violet-500))" },
];

function applyTheme(theme: Theme) {
  document.documentElement.classList.remove(...THEME_CLASSES);
  if (theme !== "dark") document.documentElement.classList.add(theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const fromDom = THEME_CLASSES.find((c) => document.documentElement.classList.contains(c)) as Theme | undefined;
    setTheme(saved ?? fromDom ?? "dark");
  }, []);

  function select(next: Theme) {
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
    setExpanded(false);
  }

  // Active theme always renders last (rightmost) so it's the fixed anchor the row expands from.
  const ordered = [...THEMES.filter((t) => t.id !== theme), THEMES.find((t) => t.id === theme)!];

  return (
    <div className="flex items-center" role="radiogroup" aria-label="Theme">
      {ordered.map((t, i) => {
        const isActive = t.id === theme;
        const visible = expanded || isActive;
        return (
          <div
            key={t.id}
            className="overflow-hidden transition-all duration-300 ease-out"
            style={{
              width: visible ? 16 : 0,
              marginRight: visible && i < ordered.length - 1 ? 8 : 0,
              opacity: visible ? 1 : 0,
            }}
          >
            <button
              onClick={() => (isActive && !expanded ? setExpanded(true) : select(t.id))}
              aria-label={t.label}
              aria-pressed={isActive}
              className={`w-4 h-4 rounded-full border border-stroke-strong shrink-0 transition-opacity ${
                isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
              }`}
              style={{ backgroundColor: t.swatch }}
            />
          </div>
        );
      })}
    </div>
  );
}
