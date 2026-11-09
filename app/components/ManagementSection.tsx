import Link from "next/link";
import type { Project } from "@/lib/projects";
import { CaseTitle } from "@/app/components/CaseTitle";
import { ProjectMetrics } from "@/app/components/ProjectMetrics";

export function ManagementSection({ projects }: { projects: Project[] }) {
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
              <CaseTitle name={p.name} slug={p.slug} locked={Boolean(p.password)} />
              <p className="text-sm text-fg-tertiary mt-1 leading-relaxed">{p.description}</p>
              {p.metrics && <ProjectMetrics metrics={p.metrics} />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
