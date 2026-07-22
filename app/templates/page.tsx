import Link from "next/link";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Footer } from "@/app/components/Footer";

export const metadata = {
  title: "Templates - Portfolio",
};

type TemplateId = "centered" | "toc-left" | "toc-right";

const templates: { id: TemplateId; name: string; description: string; current?: boolean }[] = [
  {
    id: "centered",
    name: "Centered",
    description: "No table of contents. A single centered column of content, with no anchor navigation.",
  },
  {
    id: "toc-left",
    name: "Table of Contents — Left",
    description: "A sticky anchor nav on the left tracks scroll position as you read. Used on all case studies today.",
    current: true,
  },
  {
    id: "toc-right",
    name: "Table of Contents — Right",
    description: "The same sticky anchor nav, mirrored to the right of the content column.",
  },
];

function Bar({ width, opacity, height = "h-1.5" }: { width: string; opacity: number; height?: string }) {
  return (
    <div
      className={`${height} rounded-full`}
      style={{ width, backgroundColor: `rgb(var(--fg-primary) / ${opacity})` }}
    />
  );
}

function TocLines({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex flex-col gap-2 pt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Bar key={i} width={i === activeIndex ? "80%" : "55%"} opacity={i === activeIndex ? 0.45 : 0.14} />
      ))}
    </div>
  );
}

function ContentBlock() {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <Bar width="60%" opacity={0.35} height="h-2.5" />
      <div className="h-1" />
      <Bar width="100%" opacity={0.12} />
      <Bar width="90%" opacity={0.12} />
      <Bar width="70%" opacity={0.12} />
      <div
        className="w-full aspect-[16/10] rounded-sm mt-2"
        style={{ backgroundColor: "rgb(var(--fg-primary) / 0.07)" }}
      />
    </div>
  );
}

function PageSchematic({ variant, current }: { variant: TemplateId; current?: boolean }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-md border border-stroke overflow-hidden bg-surface-base flex flex-col">
      {current && (
        <span className="absolute top-2 left-2 z-10 text-xs text-fg-tertiary uppercase tracking-widest border border-stroke rounded-full px-2 py-0.5 bg-surface-base/90 backdrop-blur-sm">
          Current
        </span>
      )}
      {/* Nav bar */}
      <div className="h-5 shrink-0 border-b border-stroke flex items-center justify-between px-3">
        <Bar width="14px" opacity={0.25} height="h-1" />
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgb(var(--fg-primary) / 0.25)" }} />
      </div>

      <div className="flex-1 p-4">
        {variant === "centered" && (
          <div className="mx-auto w-3/5 h-full">
            <ContentBlock />
          </div>
        )}
        {variant === "toc-left" && (
          <div className="flex gap-4 h-full">
            <div className="w-1/5 shrink-0">
              <TocLines activeIndex={1} />
            </div>
            <ContentBlock />
          </div>
        )}
        {variant === "toc-right" && (
          <div className="flex gap-4 h-full">
            <ContentBlock />
            <div className="w-1/5 shrink-0">
              <TocLines activeIndex={1} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Templates() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <Link href="/" className="text-sm text-fg-secondary underline-dots hover:text-fg-primary transition-colors">
          ← Back
        </Link>
        <span className="text-sm font-medium tracking-tight">Templates</span>
        <ThemeToggle />
      </nav>

      <main className="flex-1 max-w-[1100px] mx-auto w-full px-6 md:px-12 pt-44 pb-32">

        {/* Intro */}
        <section className="mb-20">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-1.44px] leading-[1.05] mb-6">
            Templates
          </h1>
          <p className="text-fg-secondary text-lg leading-relaxed max-w-sm">
            Layout options for case study pages — pick a structure, then apply it per project.
          </p>
        </section>

        {/* Template cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((t) => (
            <Link key={t.id} href={`/templates/${t.id}`} className="group flex flex-col gap-4">
              <PageSchematic variant={t.id} current={t.current} />
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl font-semibold tracking-tight group-hover:text-fg-secondary transition-colors">
                  {t.name}
                </h3>
                <p className="text-sm text-fg-tertiary leading-relaxed">{t.description}</p>
              </div>
            </Link>
          ))}
        </section>

      </main>

      <Footer />
    </div>
  );
}
