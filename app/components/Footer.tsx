import { FunLink } from "@/app/components/FunLink";
import version from "@/version.json";

export function Footer() {
  return (
    <footer className="border-t border-stroke px-6 md:px-12 py-12 max-w-[900px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-fg-tertiary">
        <span>Eugene Tochilin</span>
        <span className="text-fg-tertiary/60">({version.version})</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-fg-tertiary">
        <FunLink href="/resume" className="underline-dots">Resume</FunLink>
        <FunLink href="https://www.linkedin.com/in/etochilin/" target="_blank" rel="noopener noreferrer" className="underline-dots">LinkedIn</FunLink>
        <FunLink href="/design-system" className="underline-dots">Design system</FunLink>
        <FunLink href="/templates" className="underline-dots">Templates</FunLink>
      </div>
    </footer>
  );
}
