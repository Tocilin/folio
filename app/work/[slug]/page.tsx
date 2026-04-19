import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Portfolio` };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = projects[currentIndex - 1] ?? null;
  const next = projects[currentIndex + 1] ?? null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <Link href="/" className="text-sm text-fg-secondary hover:text-fg-primary transition-colors">
          ← Back
        </Link>
        <span className="text-sm font-medium tracking-tight">Eugene Tochilin</span>
        <ThemeToggle />
      </nav>

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 md:px-12 pt-40 pb-32 flex flex-col gap-20">

        {/* Header block */}
        <section className="flex flex-col gap-12">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-[-1.28px] leading-[1.05]">
            {project.name}
          </h1>
          <div className="border-t border-stroke" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-1">Client</p>
              <p className="text-sm text-fg-secondary">{project.client}</p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-1">Role</p>
              <p className="text-sm text-fg-secondary">{project.role}</p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-1">Category</p>
              <p className="text-sm text-fg-secondary">{project.category}</p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-1">Year</p>
              <p className="text-sm text-fg-secondary font-mono">{project.year}</p>
            </div>
          </div>
          <img
            src={project.heroImage ?? "/images/placeholder.png"}
            alt={project.name}
            className="w-full h-[520px] rounded-lg object-cover"
          />
        </section>

        {/* Content sections */}
        {project.sections.map((section, i) => {
          const prevGroup = i > 0 ? project.sections[i - 1].group : undefined;
          const showGroupHeader = section.group && section.group !== prevGroup;
          return (
            <div key={i} className="flex flex-col gap-10">
              {showGroupHeader && (
                <h2 className="text-2xl font-semibold tracking-tight">{section.group}</h2>
              )}
              <section className="flex flex-col gap-6">
                <p className="text-xs text-fg-tertiary uppercase tracking-widest">{section.label}</p>
                <p className="text-fg-secondary text-lg leading-relaxed max-w-[560px]">{section.body}</p>
                {section.images && section.images.length > 0 && (
                  <div className={`grid gap-6 mt-2 ${
                    section.images.length === 1 ? "grid-cols-1" :
                    section.images.length === 2 ? "grid-cols-2" :
                    "grid-cols-3"
                  }`}>
                    {section.images.map((src, j) => (
                      <img
                        key={j}
                        src={src}
                        alt={`${project.name} — ${section.label} ${j + 1}`}
                        className="rounded-lg object-cover w-full h-[520px]"
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          );
        })}

        {/* Credits */}
        <section className="border-t border-stroke pt-12 flex flex-col gap-4">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-4">Credits</p>
          {project.credits.map((c) => (
            <div key={c.label} className="flex gap-8 text-sm">
              <span className="text-fg-tertiary w-28 shrink-0">{c.label}</span>
              <span className="text-fg-secondary">{c.value}</span>
            </div>
          ))}
        </section>

        {/* Prev / Next */}
        <div className="flex items-center justify-between border-t border-stroke py-12 gap-4">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group flex flex-col gap-1">
              <span className="text-xs text-fg-tertiary uppercase tracking-widest">Previous</span>
              <span className="text-xl font-medium tracking-tight group-hover:text-fg-primary transition-colors">
                ← {prev.name}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/work/${next.slug}`} className="group flex flex-col gap-1 text-right">
              <span className="text-xs text-fg-tertiary uppercase tracking-widest">Next</span>
              <span className="text-xl font-medium tracking-tight group-hover:text-fg-primary transition-colors">
                {next.name} →
              </span>
            </Link>
          ) : <div />}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-stroke px-6 md:px-12 py-12 max-w-[900px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="text-sm text-fg-tertiary">Eugene Tochilin</span>
        <div className="flex items-center gap-6 text-sm text-fg-tertiary">
          <a href="/Eugene_Tochilin_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-fg-primary transition-colors">Resume</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-fg-primary transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
