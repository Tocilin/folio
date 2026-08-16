import Link from "next/link";
import type { Project } from "@/lib/projects";
import { LockIcon } from "@/app/components/LockIcon";

export function SideProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <div id="work">
      <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-6">Selected Work</p>
      <div className="border-t border-stroke">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-0 py-5 border-b border-stroke"
          >
            <span className="text-xs text-fg-tertiary font-mono w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-1.5">{p.client}</p>
              <span className="inline-flex items-center gap-2">
                <span className="relative inline-block text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-fg-primary">
                  {p.name}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-fg-primary group-hover:w-full transition-all duration-500 ease-out" />
                </span>
                {p.password && <LockIcon className="w-3.5 h-3.5 text-fg-tertiary shrink-0" />}
              </span>
              <p className="text-sm text-fg-tertiary mt-1 leading-relaxed">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
