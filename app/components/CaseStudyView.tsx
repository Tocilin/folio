import Link from "next/link";
import { FunText } from "@/app/components/FunText";
import { FunLink } from "@/app/components/FunLink";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { FadeImage } from "@/app/components/FadeImage";
import { FramedImage } from "@/app/components/FramedImage";
import { ZoomableImage } from "@/app/components/ZoomableImage";
import { Footer } from "@/app/components/Footer";
import { CaseStudyTOC, type TocItem } from "@/app/components/CaseStudyTOC";
import { ResultsCards } from "@/app/components/ResultsCards";
import { IconCards } from "@/app/components/IconCards";
import { PaymentMethodDemo } from "@/app/components/PaymentMethodDemo";
import { ChameleonAccessibility } from "@/app/components/ChameleonAccessibility";
import { ChameleonDocs } from "@/app/components/ChameleonDocs";
import { ChameleonOverview } from "@/app/components/ChameleonOverview";
import { ChameleonVariants } from "@/app/components/ChameleonVariants";
import { ChameleonShowcase } from "@/app/components/ChameleonShowcase";
import { ChameleonTokens } from "@/app/components/ChameleonTokens";
import { DesignChallenges } from "@/app/components/DesignChallenges";
import { FunPart } from "@/app/components/FunPart";
import { Body, Caption, Label } from "@/app/components/PageBlocks";
import { ProjectGoals } from "@/app/components/ProjectGoals";
import { MissionFigure } from "@/app/components/MissionFigure";
import { InvestorQuote } from "@/app/components/InvestorQuote";
import { SuperAppPhones } from "@/app/components/SuperAppPhones";
import { ThreeProductsBlocks } from "@/app/components/ThreeProductsBlocks";
import { CommerceCenterShowcase } from "@/app/components/CommerceCenterShowcase";
import { CheckoutShowcase } from "@/app/components/CheckoutShowcase";
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
  backLabel = "Home",
  navLabel = "Eugene Tochilin",
  linkPrefix = "/work",
}: {
  project: Project;
  prev: Project | null;
  next: Project | null;
  layout: CaseStudyLayout;
  backHref?: string;
  backLabel?: string;
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
            <Label className="mb-1">Client</Label>
            <p className="text-sm text-fg-secondary">{project.client}</p>
          </div>
          <div>
            <Label className="mb-1">Role</Label>
            <p className="text-sm text-fg-secondary">{project.role}</p>
          </div>
          <div>
            <Label className="mb-1">Responsibilities</Label>
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
        {project.heroDemo === "superapp-phones" && (
          <div className="flex flex-col gap-3">
            <SuperAppPhones />
            <Caption>The SuperApp dashboard, rebuilt in code</Caption>
          </div>
        )}
      </section>

      {/* Content sections */}
      {project.sections.map((section, i) => {
        const prevGroup = i > 0 ? project.sections[i - 1].group : undefined;
        const showGroupHeader = section.group && section.group !== prevGroup;
        const visibleImages = (section.images ?? []).filter((image) => !image.hidden || image.demoBelow);
        return (
          <div
            key={i}
            id={showGroupHeader ? slugify(section.group!) : !hasGroups ? slugify(section.label) : undefined}
            className="flex flex-col gap-10 scroll-mt-28"
          >
            {showGroupHeader && (
              <h2 className="flex items-center gap-4 text-2xl font-semibold tracking-tight">
                <span>{section.group}</span>
                <span aria-hidden className="h-px flex-1 bg-stroke" />
                <span className="text-sm font-mono font-normal text-fg-tertiary">
                  {String(tocLabels.indexOf(section.group!) + 1).padStart(2, "0")}
                </span>
              </h2>
            )}
            <section className="flex flex-col gap-6">
              <Label>{section.label}</Label>
              {section.body && (
                <Body>{section.body}</Body>
              )}
              {section.pageDemo === "checkout-page" && (
                <div className="flex flex-col gap-3">
                  <CheckoutShowcase />
                  <Caption>Consumer-facing checkout demo</Caption>
                </div>
              )}
              {section.stats && section.stats.length > 0 && <ResultsCards stats={section.stats} compact={section.statsVariant === "compact"} />}
              {section.cards && section.cards.length > 0 && <IconCards cards={section.cards} />}
              {section.demo === "payment-methods" && (
                <div className="flex flex-col gap-3">
                  <PaymentMethodDemo />
                  <Caption>Drop-in UI: embedded checkout demo</Caption>
                </div>
              )}
              {visibleImages.length > 0 && (
                <div className={`grid gap-6 mt-2 ${
                  (section.imageLayout ?? project.imageLayout) === "stack" || visibleImages.length === 1 ? "grid-cols-1" :
                  section.imageLayout === "two" || visibleImages.length === 2 ? "grid-cols-2" :
                  "grid-cols-3"
                }`}>
                  {visibleImages.map((image, j) => (
                    <div key={j} className="flex flex-col gap-3">
                    {/* a hidden image still shows the live version built in code that goes with it */}
                    {!image.hidden && (
                    <ZoomableImage src={image.src} alt={image.alt}>
                      {image.framed ? (
                        <FramedImage
                          src={image.src}
                          alt={image.alt}
                          width={image.width ?? 1800}
                          height={image.height ?? 1012}
                          className="rounded-lg w-full"
                        />
                      ) : (
                        <FadeImage
                          src={image.src}
                          alt={image.alt}
                          className={`rounded-lg w-full ${project.imageAspect === "16/9" ? "aspect-video" : "aspect-[16/10]"}`}
                        />
                      )}
                    </ZoomableImage>
                    )}
                    {image.caption && !image.hidden && <Caption>{image.caption}</Caption>}
                    {image.demoBelow === "mission-figure" && <MissionFigure />}
                    {image.demoBelow === "project-goals" && (
                      <div className={image.hidden ? "" : "mt-3"}>
                        <ProjectGoals />
                      </div>
                    )}
                    {image.demoBelow === "fun-part" && (
                      <div className={image.hidden ? "" : "mt-3"}>
                        <FunPart />
                      </div>
                    )}
                    {image.demoBelow === "design-challenges" && (
                      <div className={image.hidden ? "" : "mt-3"}>
                        <DesignChallenges />
                      </div>
                    )}
                    {image.demoBelow === "investor-quote" && (
                      <div className={image.hidden ? "" : "mt-3"}>
                        <InvestorQuote />
                      </div>
                    )}
                    </div>
                  ))}
                </div>
              )}
              {section.pageDemo === "three-products" && (
                <div className="flex flex-col gap-3">
                  <ThreeProductsBlocks />
                  <Caption>Checkout, Commerce Center, and Chameleon Design System</Caption>
                </div>
              )}
              {section.pageDemo === "chameleon" && (
                <div className="flex flex-col gap-3">
                  <ChameleonOverview />
                  <Caption>The design system at a glance: colour, buttons, type and spacing</Caption>
                  <div className="mt-6 flex flex-col gap-3">
                    <ChameleonTokens />
                    <Caption>An example of three-tier design tokens, from primitives through semantic tokens to component tokens</Caption>
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <ChameleonVariants />
                    <Caption>Button variants and states</Caption>
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <ChameleonDocs />
                    <Caption>Anatomy, specs and usage guidance documented next to the component</Caption>
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <ChameleonShowcase />
                    <Caption>Chameleon Design System</Caption>
                  </div>
                </div>
              )}
              {section.pageDemo === "accessibility" && (
                <div className="flex flex-col gap-3">
                  <ChameleonAccessibility />
                  <Caption>An example of an inaccessible field failing and passing WCAG 2.2 AA</Caption>
                </div>
              )}
              {section.pageDemo === "commerce-center" && (
                <div className="flex flex-col gap-3">
                  <CommerceCenterShowcase />
                  <Caption>Commerce Center</Caption>
                </div>
              )}
            </section>
          </div>
        );
      })}

      {/* Closing note */}
      <section className="relative border-t border-stroke pt-20 pb-8 text-center">
        {/* the little figure stands right on the divider: the drawing has about 19% empty space under its feet
            (in a 240 box), so it is dropped by that much (27px at this size) to put its feet on the line */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-[27px] hidden h-[140px] w-[140px] -translate-y-full bg-fg-primary sm:block"
          style={{
            maskImage: "url(/images/closing-figure.svg)", WebkitMaskImage: "url(/images/closing-figure.svg)",
            maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center",
          }}
        />
        <p className="text-5xl md:text-7xl font-semibold tracking-[-1.44px] leading-[1.05] text-fg-primary">
          Thank you for scrolling all the way!
        </p>
      </section>

      {/* Prev / Next */}
      <div className="flex items-center justify-between border-t border-stroke py-12 gap-4">
        {prev ? (
          <Link href={`${linkPrefix}/${prev.slug}`} className="group flex flex-col gap-1">
            <span className="text-xs text-fg-tertiary uppercase tracking-widest">Previous</span>
            <FunText seed={prev.slug} className="text-xl font-medium tracking-tight">
              ← {prev.name}
            </FunText>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`${linkPrefix}/${next.slug}`} className="group flex flex-col gap-1 text-right">
            <span className="text-xs text-fg-tertiary uppercase tracking-widest">Next</span>
            <FunText seed={next.slug} className="text-xl font-medium tracking-tight">
              {next.name} →
            </FunText>
          </Link>
        ) : <div />}
      </div>

    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <FunLink href={backHref} className="text-sm text-fg-secondary underline-dots">
          ← {backLabel}
        </FunLink>
        <span className="text-sm font-medium tracking-tight">{navLabel}</span>
        <ThemeToggle />
      </nav>

      <main className={`flex-1 mx-auto w-full px-6 md:px-12 pt-40 pb-32 ${layout === "centered" ? "max-w-[900px]" : "max-w-[1100px]"}`}>
        {layout === "centered" ? (
          content
        ) : (
          <div className={`lg:grid lg:gap-16 ${layout === "toc-left" ? "lg:grid-cols-[160px_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_160px]"}`}>
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
