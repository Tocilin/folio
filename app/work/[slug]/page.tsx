import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { projects } from "@/lib/projects";
import { CaseStudyView } from "@/app/components/CaseStudyView";
import { PasswordGate } from "@/app/components/PasswordGate";
import { DEFAULT_TRACK } from "@/lib/siteConfig";
import type { WorkTrack } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} | Portfolio` };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const headersList = await headers();
  const track = (headersList.get("x-track") as WorkTrack) || DEFAULT_TRACK;
  if (project.track !== track) notFound();

  const trackProjects = projects.filter((p) => p.track === track);
  const currentIndex = trackProjects.findIndex((p) => p.slug === slug);
  const prev = trackProjects[currentIndex - 1] ?? null;
  const next = trackProjects[currentIndex + 1] ?? null;

  const content = <CaseStudyView project={project} prev={prev} next={next} layout="toc-left" />;

  if (!project.password) return content;

  return (
    <PasswordGate slug={project.slug} password={project.password}>
      {content}
    </PasswordGate>
  );
}
