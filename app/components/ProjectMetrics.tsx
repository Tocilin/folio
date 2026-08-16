import type { Metric } from "@/lib/projects";

export function ProjectMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="flex items-center gap-6 mt-3">
      {metrics.map((m, i) => (
        <div key={i}>
          <p className="text-lg font-semibold tracking-tight text-fg-primary">{m.value}</p>
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mt-0.5">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
