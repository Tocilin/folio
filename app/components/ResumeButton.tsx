import { Button } from "@/app/components/Button";

function DocIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 2h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
        fill="rgb(var(--fg-primary))"
      />
      <path d="M14 2v5h5" stroke="rgb(var(--fill-surface))" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="8" y1="12" x2="15" y2="12" stroke="rgb(var(--fill-surface))" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="8" y1="15" x2="15" y2="15" stroke="rgb(var(--fill-surface))" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="8" y1="18" x2="12" y2="18" stroke="rgb(var(--fill-surface))" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function ResumeButton(props: { href: string; target?: string; rel?: string; children?: React.ReactNode }) {
  return (
    <span className="group/resume relative inline-block">
      <DocIcon
        className="absolute left-2 bottom-0 z-0 h-9 w-9 translate-y-0 drop-shadow-md transition-transform duration-200 ease-[cubic-bezier(0.36,0,0.66,-0.56)] group-hover/resume:-translate-y-7 group-hover/resume:duration-[350ms] group-hover/resume:ease-[cubic-bezier(0.34,1.8,0.64,1)]"
      />
      <Button
        variant="primary"
        href={props.href}
        target={props.target}
        rel={props.rel}
        className="relative z-10"
      >
        {props.children ?? "Resume"}
      </Button>
    </span>
  );
}
