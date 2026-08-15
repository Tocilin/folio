import Link from "next/link";
import { headers } from "next/headers";
import { projects } from "@/lib/projects";
import type { WorkTrack } from "@/lib/projects";
import { siteConfigs, DEFAULT_TRACK } from "@/lib/siteConfig";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Footer } from "@/app/components/Footer";
import { ManagementSection } from "@/app/components/ManagementSection";
import { Hero } from "@/app/components/Hero";
import { ICSection } from "@/app/components/ICSection";
import { DesignSystemsSection } from "@/app/components/DesignSystemsSection";
import { SideProjectsSection } from "@/app/components/SideProjectsSection";
import { TrackSwitcher } from "@/app/components/TrackSwitcher";

export default async function Home() {
  const headersList = await headers();
  const track = (headersList.get("x-track") as WorkTrack) || DEFAULT_TRACK;
  const config = siteConfigs[track];
  const trackProjects = projects.filter((p) => p.track === track);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm font-medium tracking-tight hover:text-fg-secondary transition-colors">
            Eugene Tochilin
          </Link>
          <TrackSwitcher current={track} />
        </div>
        <ThemeToggle />
      </nav>

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 md:px-12 pt-44 pb-32">

        <Hero heroWords={config.heroWords} subtitle={config.subtitle} resumeHref={config.resumeHref} />

        {/* Work */}
        <section className="mb-40 flex flex-col gap-16">
          {track === "management" && <ManagementSection projects={trackProjects} />}
          {track === "ic" && <ICSection projects={trackProjects} />}
          {track === "design-systems" && <DesignSystemsSection projects={trackProjects} />}
          {track === "side-projects" && <SideProjectsSection projects={trackProjects} />}
        </section>

        {/* About */}
        <section id="about" className="mb-40 max-w-[560px]">
          <p className="text-xs text-fg-tertiary uppercase tracking-widest mb-6">About</p>
          <p className="text-fg-secondary text-lg leading-relaxed">
            Independent designer and developer focused on product, brand, design systems, and AI-driven experiences.
            Built for startups and larger companies across Europe and the US.
            I care about creating thoughtful work that drives impact, solves real problems, and delivers strong outcomes through a systematic approach to building products.
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
}
