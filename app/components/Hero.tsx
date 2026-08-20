import { Button } from "@/app/components/Button";

export function Hero({
  heroWords,
  subtitle,
  resumeHref,
}: {
  heroWords: [string, string, string];
  subtitle: string;
  resumeHref: string;
}) {
  return (
    <section className="mb-40">
      <h1 className="text-5xl md:text-7xl font-semibold tracking-[-1.44px] leading-[1.05] mb-12">
        {heroWords[0]}
        <br />
        {heroWords[1]}
        <br />
        {heroWords[2]}
      </h1>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex flex-col gap-6">
          <p className="text-fg-secondary text-lg leading-relaxed max-w-sm">{subtitle}</p>
          <div className="flex items-center gap-3">
            <Button variant="primary" href={resumeHref}>Resume</Button>
            <Button variant="secondary" href="https://www.linkedin.com/in/etochilin/" target="_blank" rel="noopener noreferrer">LinkedIn</Button>
          </div>
        </div>
        <div className="inline-flex items-center shrink-0">
          <span className="flex items-center gap-2 text-sm text-fg-tertiary">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: "rgb(var(--status-available))",
                animation: "pulse-available 3s ease-in-out infinite",
              }}
            />
            Available for work
          </span>
        </div>
      </div>
    </section>
  );
}
