import type { Metric } from "@/lib/projects";

export function ResultsCards({ stats }: { stats: Metric[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      {stats.map((s, i) => (
        <div key={i} className="rounded-lg border border-stroke bg-fill-frame px-6 py-6 flex flex-col gap-3">
          <p className="text-4xl md:text-5xl font-semibold tracking-tight text-fg-primary">{s.value}</p>
          <p className="text-lg font-semibold tracking-tight text-fg-primary">{s.label}</p>
          {s.body && <p className="text-sm text-fg-tertiary leading-relaxed">{s.body}</p>}
        </div>
      ))}
    </div>
  );
}
