import type { Metric } from "@/lib/projects";

export function ProjectMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {metrics.map((m, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 text-xs border border-stroke rounded-full px-2.5 py-1"
        >
          <span className="font-medium text-fg-secondary">{m.value}</span>
          <span className="text-fg-tertiary">{m.label}</span>
        </span>
      ))}
    </div>
  );
}
