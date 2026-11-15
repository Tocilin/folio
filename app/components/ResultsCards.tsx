import type { Metric } from "@/lib/projects";
import { InteractiveCard } from "@/app/components/InteractiveCard";

// Four cards read better as 2x2 than as 3 + 1, so that count gets two columns.
export function ResultsCards({ stats, compact = false }: { stats: Metric[]; compact?: boolean }) {
  const cols = stats.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid ${cols} gap-4 mt-2`}>
      {stats.map((s, i) => (
        <InteractiveCard key={i} className={compact ? "gap-2" : "gap-3"}>
          {compact ? (
            <p className="relative text-lg font-semibold tracking-tight text-fg-primary">
              {[s.value, s.label].filter(Boolean).join(" ")}
            </p>
          ) : (
            <>
              <p className="relative text-4xl md:text-5xl font-semibold tracking-tight text-fg-primary">{s.value}</p>
              <p className="relative text-lg font-semibold tracking-tight text-fg-primary">{s.label}</p>
            </>
          )}
          {s.body && <p className="relative text-sm text-fg-tertiary leading-relaxed">{s.body}</p>}
        </InteractiveCard>
      ))}
    </div>
  );
}
