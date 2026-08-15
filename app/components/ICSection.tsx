"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/app/components/ProjectVisual";

const FLOAT_W = 240;
const FLOAT_H = 160;

type Corner = { cx: 0 | 1; cy: 0 | 1; rot: number };

// Picks which corner of the image sits at the cursor — top-left, top-right,
// bottom-left, or bottom-right — fresh on every project entered.
function randomCorner(): Corner {
  return {
    cx: Math.random() < 0.5 ? 0 : 1,
    cy: Math.random() < 0.5 ? 0 : 1,
    rot: (Math.random() - 0.5) * 16,
  };
}

export function ICSection({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<Corner | null>(null);

  function place(x: number, y: number, scale: number, opacity: number) {
    const el = floatRef.current;
    const corner = cornerRef.current;
    if (!el || !corner) return;
    const offsetX = corner.cx === 0 ? 0 : -FLOAT_W;
    const offsetY = corner.cy === 0 ? 0 : -FLOAT_H;
    el.style.opacity = String(opacity);
    el.style.transform = `translate(${x + offsetX}px, ${y + offsetY}px) scale(${scale}) rotate(${corner.rot}deg)`;
  }

  function handleEnter(project: Project, e: React.MouseEvent) {
    setActiveProject(project);
    cornerRef.current = randomCorner();
    const el = floatRef.current;
    if (!el) return;
    const { clientX: x, clientY: y } = e;

    el.style.transition = "none";
    place(x, y, 0.3, 0);
    void el.offsetWidth; // commit the instant jump before re-enabling transitions
    requestAnimationFrame(() => {
      if (!floatRef.current) return;
      floatRef.current.style.transition =
        "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease-out";
      place(x, y, 1, 1);
    });
  }

  function handleMove(e: React.MouseEvent) {
    if (!cornerRef.current) return;
    place(e.clientX, e.clientY, 1, 1);
  }

  function handleLeave() {
    const el = floatRef.current;
    if (!el) return;
    el.style.transition = "transform 0.3s ease-in, opacity 0.2s ease-in";
    el.style.opacity = "0";
    cornerRef.current = null;
    setTimeout(() => setActiveProject(null), 300);
  }

  return (
    <div onMouseLeave={handleLeave}>
      <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-6">Selected Work</p>
      <div className="border-t border-stroke">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-0 py-5 border-b border-stroke"
            onMouseEnter={(e) => handleEnter(p, e)}
            onMouseMove={handleMove}
          >
            <span className="text-xs text-fg-tertiary font-mono w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1 min-w-0">
              <span className="relative inline-block text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-fg-primary">
                {p.name}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-fg-primary group-hover:w-full transition-all duration-500 ease-out" />
              </span>
              <p className="text-sm text-fg-tertiary mt-1 leading-relaxed">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div
        ref={floatRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-50 hidden overflow-hidden rounded-lg shadow-2xl md:block"
        style={{ width: FLOAT_W, height: FLOAT_H, opacity: 0 }}
      >
        {activeProject && <ProjectVisual project={activeProject} sizes="240px" />}
      </div>
    </div>
  );
}
