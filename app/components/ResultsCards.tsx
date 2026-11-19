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
          {s.note && <span className="relative block h-4 shrink-0" aria-hidden />}
          {s.note && (
            // a "redacted" tag: dashed outline and a lock, pinned to the bottom of the card
            <span className="relative mt-auto inline-flex items-center gap-1.5 self-start whitespace-nowrap rounded-full border border-dashed border-stroke-strong px-2.5 py-1 text-xs text-fg-secondary" style={{ marginTop: "auto" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
                <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
              </svg>
              {s.note}
            </span>
          )}
        </InteractiveCard>
      ))}
    </div>
  );
}
