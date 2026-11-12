import { safeNext } from "@/lib/siteGate";
import { LockIcon } from "@/app/components/LockIcon";

export const dynamic = "force-dynamic";

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col">
      <form
        action="/api/unlock"
        method="post"
        className="flex-1 flex flex-col items-center justify-center gap-4 w-full max-w-lg mx-auto px-6 text-center"
      >
        <input type="hidden" name="next" value={safeNext(next)} />
        <LockIcon className="w-8 h-8 text-fg-primary" />
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2">Psst...what&apos;s the password?</h1>
        <div className="flex w-full">
          <input
            type="password"
            name="password"
            autoFocus
            required
            placeholder="Say the magic word..."
            className="min-w-0 flex-1 px-4 py-2.5 rounded-l-sm text-sm bg-transparent border border-r-0 border-button-secondary-stroke text-fg-primary placeholder:text-fg-tertiary focus:outline-none focus:border-button-secondary-stroke-hover transition-colors"
          />
          <button
            type="submit"
            className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-r-sm text-sm font-medium tracking-tight bg-button-primary-fill text-button-primary-label hover:bg-button-primary-fill-hover transition-colors"
          >
            Open sesame!
          </button>
        </div>
        {error && <p className="text-xs text-red-500">Wrong password, try again.</p>}
      </form>
    </div>
  );
}
