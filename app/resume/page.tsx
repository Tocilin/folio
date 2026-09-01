import Link from "next/link";
import { resume } from "@/lib/resume";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Button } from "@/app/components/Button";
import { Footer } from "@/app/components/Footer";

export const metadata = {
  title: "Resume - Portfolio",
};

export default function Resume() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <Link href="/" className="text-sm text-fg-secondary underline-dots hover:text-fg-primary transition-colors">
          ← Home
        </Link>
        <span className="text-sm font-medium tracking-tight">Resume</span>
        <ThemeToggle />
      </nav>

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 md:px-12 pt-44 pb-32">

        {/* Intro */}
        <section className="mb-24">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-1.44px] leading-[1.05] mb-6">
            {resume.name}
          </h1>
          <p className="text-fg-secondary text-lg leading-relaxed max-w-sm mb-10">
            {resume.title}
          </p>
          <Button variant="primary" href="/Eugene_Tochilin_Resume.pdf" target="_blank" rel="noopener noreferrer">
            Download Resume (PDF)
          </Button>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-24">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-8">Experience</p>
          <div className="flex flex-col gap-12">
            {resume.experience.map((e, i) => (
              <div key={i}>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                  <p className="text-xl font-medium tracking-tight">
                    {e.role} <span className="text-fg-tertiary font-normal">@ {e.company}</span>
                  </p>
                  <span className="text-sm text-fg-tertiary font-mono shrink-0">{e.dates}</span>
                </div>
                <p className="text-fg-secondary leading-relaxed max-w-2xl">{e.description}</p>
              </div>
            ))}
          </div>
          <a
            href={resume.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-12 text-sm underline-dots hover:text-fg-primary transition-colors text-fg-secondary"
          >
            View full work history on LinkedIn →
          </a>
        </section>

        {/* Education */}
        <section id="education" className="mb-40">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-6">Education</p>
          <div className="border-t border-stroke">
            {resume.education.map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-5 border-b border-stroke"
              >
                <div>
                  <p className="text-xl font-medium tracking-tight">{e.degree}</p>
                  <p className="text-sm text-fg-tertiary mt-1">{e.school}</p>
                </div>
                <span className="text-sm text-fg-tertiary font-mono shrink-0">{e.dates}</span>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
