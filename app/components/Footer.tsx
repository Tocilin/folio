import Link from "next/link";
import version from "@/version.json";

export function Footer() {
  return (
    <footer className="border-t border-stroke px-6 md:px-12 py-12 max-w-[900px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-fg-tertiary">
        <span>Eugene Tochilin</span>
        <span className="text-fg-tertiary/60">({version.version})</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-fg-tertiary">
        <Link href="/resume" className="underline-dots hover:text-fg-primary transition-colors">Resume</Link>
        <a href="https://www.linkedin.com/in/etochilin/" target="_blank" rel="noopener noreferrer" className="underline-dots hover:text-fg-primary transition-colors">LinkedIn</a>
        <Link href="/design-system" className="underline-dots hover:text-fg-primary transition-colors">Design system</Link>
        <Link href="/templates" className="underline-dots hover:text-fg-primary transition-colors">Templates</Link>
      </div>
    </footer>
  );
}
