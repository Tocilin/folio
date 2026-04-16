import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return { title: `${project.name} — Portfolio` };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
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

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 md:px-12 pt-40 pb-32">

        {/* Title block */}
        <section className="mb-16">
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-fg-tertiary border border-stroke px-3 py-1 rounded-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.05] mb-10">
            {project.name}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-stroke pt-8">
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-2">Client</p>
              <p className="text-sm text-fg-secondary">{project.client}</p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-2">Role</p>
              <p className="text-sm text-fg-secondary">{project.role}</p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-2">Category</p>
              <p className="text-sm text-fg-secondary">{project.category}</p>
            </div>
            <div>
              <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-2">Year</p>
              <p className="text-sm text-fg-secondary font-mono">{project.year}</p>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <section className="mb-28">
          {project.heroImage ? (
            <img
              src={project.heroImage}
              alt={project.name}
              className="w-full aspect-video rounded-lg object-cover"
            />
          ) : (
            <div
              className="w-full aspect-video rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${project.hero.from}, ${project.hero.via}, ${project.hero.to})`,
              }}
            />
          )}
        </section>

        {/* Overview */}
        <section className="mb-24 max-w-2xl">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-8">Overview</p>
          <p className="text-fg-secondary text-lg leading-relaxed">{project.overview}</p>
        </section>

        {/* Approach */}
        <section className="mb-24">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-8">Approach</p>
          <p className="text-fg-secondary text-lg leading-relaxed max-w-2xl mb-14">{project.approach}</p>

          {/* Supporting visuals */}
          <div className="grid grid-cols-3 gap-4">
            {project.galleryImages
              ? project.galleryImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${project.name} — ${i + 1}`}
                    className="aspect-[4/3] rounded-md object-cover w-full"
                  />
                ))
              : project.swatches.map((swatch, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-md"
                    style={{
                      background: `linear-gradient(160deg, ${swatch.from}, ${swatch.to})`,
                    }}
                  />
                ))}
          </div>
        </section>

        {/* Outcomes */}
        <section className="mb-24 max-w-2xl">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-8">Outcomes</p>
          <p className="text-fg-secondary text-lg leading-relaxed">{project.outcomes}</p>
        </section>

        {/* Credits */}
        <section className="mb-28 border-t border-stroke pt-12">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-8">Credits</p>
          <div className="flex flex-col gap-4">
            {project.credits.map((c) => (
              <div key={c.label} className="flex gap-8 text-sm">
                <span className="text-fg-tertiary w-28 shrink-0">{c.label}</span>
                <span className="text-fg-secondary">{c.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Prev / Next */}
        <div className="flex items-center justify-between border-t border-stroke pt-12 gap-4">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group flex flex-col gap-2">
              <span className="text-xs text-fg-tertiary uppercase tracking-widest">Previous</span>
              <span className="text-xl font-medium tracking-tight group-hover:text-fg-primary transition-colors">
                ← {prev.name}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/work/${next.slug}`} className="group flex flex-col gap-2 text-right">
              <span className="text-xs text-fg-tertiary uppercase tracking-widest">Next</span>
              <span className="text-xl font-medium tracking-tight group-hover:text-fg-primary transition-colors">
                {next.name} →
              </span>
            </Link>
          ) : <div />}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-stroke px-6 md:px-12 py-8 max-w-[900px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="text-xs text-fg-tertiary">© 2024</span>
        <div className="flex items-center gap-6 text-sm text-fg-tertiary">
          <a href="mailto:hello@example.com" className="hover:text-fg-primary transition-colors">Email</a>
          <a href="#" className="hover:text-fg-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-fg-primary transition-colors">Dribbble</a>
          <a href="#" className="hover:text-fg-primary transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
