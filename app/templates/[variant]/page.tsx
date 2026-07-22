import { notFound } from "next/navigation";
import { CaseStudyView, type CaseStudyLayout } from "@/app/components/CaseStudyView";
import { dummyCaseStudy } from "@/lib/dummy-case-study";

const VARIANTS: { id: CaseStudyLayout; name: string }[] = [
  { id: "centered", name: "Centered" },
  { id: "toc-left", name: "Table of Contents — Left" },
  { id: "toc-right", name: "Table of Contents — Right" },
];

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ variant: v.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const match = VARIANTS.find((v) => v.id === variant);
  if (!match) return {};
  return { title: `${match.name} Template — Portfolio` };
}

export default async function TemplatePreview({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const match = VARIANTS.find((v) => v.id === variant);
  if (!match) notFound();

  return (
    <CaseStudyView
      project={dummyCaseStudy}
      prev={null}
      next={null}
      layout={match.id}
      backHref="/templates"
      navLabel={`Template — ${match.name}`}
      linkPrefix="/templates"
    />
  );
}
