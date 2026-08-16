import type { Metric } from "@/lib/projects";

export function ResultsCards({ stats }: { stats: Metric[] }) {
  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {stats.map((s, i) => (
        <div key={i} className="flex-1 min-w-[140px] rounded-lg border border-stroke bg-fill-frame px-4 py-5 text-center">
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-fg-primary">{s.value}</p>
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mt-1.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
