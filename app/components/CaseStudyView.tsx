import Link from "next/link";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { FadeImage } from "@/app/components/FadeImage";
import { FramedImage } from "@/app/components/FramedImage";
import { Footer } from "@/app/components/Footer";
import { CaseStudyTOC, type TocItem } from "@/app/components/CaseStudyTOC";
import { ResultsCards } from "@/app/components/ResultsCards";
import type { Project } from "@/lib/projects";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export type CaseStudyLayout = "centered" | "toc-left" | "toc-right";

export function CaseStudyView({
  project,
  prev,
  next,
  layout,
  backHref = "/",
  navLabel = "Eugene Tochilin",
  linkPrefix = "/work",
}: {
  project: Project;
  prev: Project | null;
  next: Project | null;
  layout: CaseStudyLayout;
  backHref?: string;
  navLabel?: string;
  linkPrefix?: string;
}) {
  const hasGroups = project.sections.some((s) => s.group);
  const tocLabels = hasGroups
    ? Array.from(new Set(project.sections.map((s) => s.group).filter((g): g is string => Boolean(g))))
    : project.sections.map((s) => s.label);
  const toc: TocItem[] = tocLabels.map((label) => ({ id: slugify(label), label }));

  const content = (
    <div className="flex flex-col gap-20 max-w-[900px] w-full">

      {/* Header block */}
      <section className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-[-1.28px] leading-[1.05]">
            {project.name}
          </h1>
          {project.subtitle && (
            <p className="text-fg-secondary text-xl leading-snug max-w-[560px]">{project.subtitle}</p>
          )}
        </div>
        <div className="border-t border-stroke" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-1">Client</p>
            <p className="text-sm text-fg-secondary">{project.client}</p>
          </div>
          <div>
            <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-1">Role</p>
            <p className="text-sm text-fg-secondary">{project.role}</p>
          </div>
          <div>
            <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-1">Responsibilities</p>
            <p className="text-sm text-fg-secondary">{project.responsibilities}</p>
          </div>
        </div>
        {project.heroImage && (
          project.heroFramed ? (
            <FramedImage
              src={project.heroImage}
              alt={project.name}
              width={project.heroImageWidth ?? 1800}
              height={project.heroImageHeight ?? 1012}
              className="w-full rounded-lg"
              priority
            />
          ) : (
            <FadeImage
              src={project.heroImage}
              alt={project.name}
              className="w-full aspect-[16/10] rounded-lg"
              priority
            />
          )
        )}
      </section>

      {/* Content sections */}
      {project.sections.map((section, i) => {
        const prevGroup = i > 0 ? project.sections[i - 1].group : undefined;
        const showGroupHeader = section.group && section.group !== prevGroup;
        return (
          <div
            key={i}
            id={showGroupHeader ? slugify(section.group!) : !hasGroups ? slugify(section.label) : undefined}
            className="flex flex-col gap-10 scroll-mt-28"
          >
            {showGroupHeader && (
              <h2 className="text-2xl font-semibold tracking-tight">{section.group}</h2>
            )}
            <section className="flex flex-col gap-6">
              <p className="text-xs text-fg-tertiary uppercase tracking-widest">{section.label}</p>
              {section.body && (
                <p className="text-fg-secondary text-lg leading-relaxed max-w-[560px]">{section.body}</p>
              )}
              {section.stats && section.stats.length > 0 && <ResultsCards stats={section.stats} />}
              {section.images && section.images.length > 0 && (
                <div className={`grid gap-6 mt-2 ${
                  section.images.length === 1 ? "grid-cols-1" :
                  section.images.length === 2 ? "grid-cols-2" :
                  "grid-cols-3"
                }`}>
                  {section.images.map((image, j) =>
                    image.framed ? (
                      <FramedImage
                        key={j}
                        src={image.src}
                        alt={image.alt}
                        width={image.width ?? 1800}
                        height={image.height ?? 1012}
                        className="rounded-lg w-full"
                      />
                    ) : (
                      <FadeImage
                        key={j}
                        src={image.src}
                        alt={image.alt}
                        className="rounded-lg w-full aspect-[16/10]"
                      />
                    )
                  )}
                </div>
              )}
            </section>
          </div>
        );
      })}

      {/* Closing note */}
      <section className="border-t border-stroke pt-20 pb-8 text-center">
        <p className="text-5xl md:text-7xl font-semibold tracking-[-1.44px] leading-[1.05] text-fg-primary">
          Thank you for scrolling all the way!
        </p>
      </section>

      {/* Prev / Next */}
      <div className="flex items-center justify-between border-t border-stroke py-12 gap-4">
        {prev ? (
          <Link href={`${linkPrefix}/${prev.slug}`} className="group flex flex-col gap-1">
            <span className="text-xs text-fg-tertiary uppercase tracking-widest">Previous</span>
            <span className="text-xl font-medium tracking-tight group-hover:text-fg-primary transition-colors">
              ← {prev.name}
            </span>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`${linkPrefix}/${next.slug}`} className="group flex flex-col gap-1 text-right">
            <span className="text-xs text-fg-tertiary uppercase tracking-widest">Next</span>
            <span className="text-xl font-medium tracking-tight group-hover:text-fg-primary transition-colors">
              {next.name} →
            </span>
          </Link>
        ) : <div />}
      </div>

    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <Link href={backHref} className="text-sm text-fg-secondary underline-dots hover:text-fg-primary transition-colors">
          ← Back
        </Link>
        <span className="text-sm font-medium tracking-tight">{navLabel}</span>
        <ThemeToggle />
      </nav>

      <main className={`flex-1 mx-auto w-full px-6 md:px-12 pt-40 pb-32 ${layout === "centered" ? "max-w-[900px]" : "max-w-[1100px]"}`}>
        {layout === "centered" ? (
          content
        ) : (
          <div className={`lg:grid lg:gap-16 ${layout === "toc-left" ? "lg:grid-cols-[160px_1fr]" : "lg:grid-cols-[1fr_160px]"}`}>
            {layout === "toc-left" && <CaseStudyTOC items={toc} />}
            {content}
            {layout === "toc-right" && <CaseStudyTOC items={toc} />}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
