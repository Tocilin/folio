import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectVisual({ project, sizes = "200px" }: { project: Project; sizes?: string }) {
  if (project.heroImage) {
    return <Image src={project.heroImage} alt="" fill sizes={sizes} className="object-cover" />;
  }
  return (
    <div
      className="h-full w-full"
      style={{
        background: `linear-gradient(135deg, ${project.hero.from}, ${project.hero.via}, ${project.hero.to})`,
      }}
    />
  );
}
