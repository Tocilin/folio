import Link from "next/link";
import { experience } from "@/lib/experience";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { ResumeButton } from "@/app/components/ResumeButton";
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
          ← Back
        </Link>
        <span className="text-sm font-medium tracking-tight">Resume</span>
        <ThemeToggle />
      </nav>

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 md:px-12 pt-44 pb-32">

        {/* Intro */}
        <section className="mb-40">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-1.44px] leading-[1.05] mb-6">
            Career overview.
          </h1>
          <p className="text-fg-secondary text-lg leading-relaxed max-w-sm mb-10">
            Fifteen-plus years across product design, design management, and 0→1 founding,
            shipping systems and teams that outlast any one project.
          </p>
          <ResumeButton href="/Eugene_Tochilin_Resume.pdf" target="_blank" rel="noopener noreferrer">
            Download Resume (PDF)
          </ResumeButton>
        </section>

        {/* Career Overview */}
        <section id="experience" className="mb-40">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-6">Career Overview</p>
          <div className="border-t border-stroke">
            {experience.map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-5 border-b border-stroke"
              >
                <div>
                  <p className="text-xl font-medium tracking-tight">{e.role}</p>
                  <p className="text-sm text-fg-tertiary mt-1">{e.company}</p>
                </div>
                <span className="text-sm text-fg-tertiary font-mono shrink-0">
                  {e.year}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
