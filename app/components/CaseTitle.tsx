import { LockIcon } from "@/app/components/LockIcon";
import { FunText } from "@/app/components/FunText";

// Case study title for the work lists. The hover effect fires from the row's
// `group` hover (see FunText).
export function CaseTitle({ name, slug, locked }: { name: string; slug: string; locked?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <FunText seed={slug} className="text-xl font-medium tracking-tight">
        {name}
      </FunText>
      {locked && <LockIcon className="w-3.5 h-3.5 text-fg-tertiary shrink-0" />}
    </span>
  );
}
