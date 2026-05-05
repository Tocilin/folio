import Link from "next/link";
import { projects } from "@/lib/projects";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Button } from "@/app/components/Button";
import { AvailableTag } from "@/app/components/AvailableTag";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <Link href="/" className="text-sm font-medium tracking-tight hover:text-fg-secondary transition-colors">
          Eugene Tochilin
        </Link>
        <ThemeToggle />
      </nav>

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 md:px-12 pt-44 pb-32">

        {/* Hero */}
        <section className="mb-40">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-1.44px] leading-[1.05] mb-12">
            Design &<br />Development
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-6">
              <p className="text-fg-secondary text-lg leading-relaxed max-w-sm">
                Making digital products that are simple,
                considered, and built to last.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="primary" href="/Eugene_Tochilin_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</Button>
                <Button variant="secondary" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</Button>
              </div>
            </div>
            <AvailableTag />
          </div>
        </section>

        {/* Work */}
        <section id="work" className="mb-40">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-6">Selected Work</p>
          <div className="border-t border-stroke">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-0 py-5 border-b border-stroke"
              >
                <span className="text-xs text-fg-tertiary font-mono w-8 shrink-0">{p.index}</span>
                <div className="flex-1 min-w-0">
                  <span className="relative inline-block text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-fg-primary">
                    {p.name}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-fg-primary group-hover:w-full transition-all duration-500 ease-out" />
                  </span>
                  <p className="text-sm text-fg-tertiary mt-1 leading-relaxed">{p.description}</p>
                </div>
                {/* View → hidden by default, slides in from right on hover */}
                <span className="text-sm text-fg-tertiary underline-dots shrink-0 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                  View →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mb-40 max-w-[560px]">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-6">About</p>
          <p className="text-fg-secondary text-lg leading-relaxed">
            Independent designer and developer focused on product, brand, and AI-driven experiences.
            Built for startups and larger companies across Europe and the US.
            I care about creating thoughtful work that drives impact, solves real problems, and delivers strong outcomes.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-stroke px-6 md:px-12 py-12 max-w-[900px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="text-sm text-fg-tertiary">Eugene Tochilin</span>
        <div className="flex items-center gap-6 text-sm text-fg-tertiary">
          <a href="/Eugene_Tochilin_Resume.pdf" target="_blank" rel="noopener noreferrer" className="underline-dots hover:text-fg-primary transition-colors">Resume</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="underline-dots hover:text-fg-primary transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
