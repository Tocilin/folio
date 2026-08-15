import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/app/components/ProjectVisual";
import { seededRandom, hashSeed } from "@/lib/seededRandom";

const ZONES = ["left", "right", "top"] as const;
type Zone = (typeof ZONES)[number];

const MIN_GAP = 30;
const MAX_EXTRA_GAP = 30;
const MAX_LATERAL = 40;
const MAX_ROTATION = 14;

function getOffsets(slug: string, squareIndex: number, zone: Zone) {
  const n = hashSeed(slug) + squareIndex * 977;
  const gap = MIN_GAP + seededRandom(n * 5.19 + 10) * MAX_EXTRA_GAP;
  const lateral = (seededRandom(n * 8.37 + 20) - 0.5) * 2 * MAX_LATERAL;
  const rot = (seededRandom(n * 2.63 + 30) - 0.5) * 2 * MAX_ROTATION;
  const tx = zone === "left" ? -gap : zone === "right" ? gap : lateral;
  const ty = zone === "top" ? -gap : lateral;
  return { tx, ty, rot };
}

export function ManagementSection({ projects }: { projects: Project[] }) {
  return (
    <div id="work">
      <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-6">Selected Work</p>
      <div className="border-t border-stroke">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group relative flex flex-col md:flex-row md:items-center gap-3 md:gap-0 py-5 border-b border-stroke"
          >
            {ZONES.map((zone, zi) => {
              const { tx, ty, rot } = getOffsets(p.slug, zi, zone);
              return (
                <div
                  key={zone}
                  aria-hidden
                  className={`mgmt-flyout mgmt-flyout--${zone} hidden overflow-hidden md:block`}
                  style={{ "--tx": `${tx}px`, "--ty": `${ty}px`, "--rot": `${rot}deg` } as React.CSSProperties}
                >
                  <ProjectVisual project={p} sizes="140px" />
                </div>
              );
            })}
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
    </div>
  );
}
