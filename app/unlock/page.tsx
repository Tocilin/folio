import { safeNext } from "@/lib/siteGate";

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
        className="flex-1 flex flex-col items-center justify-center gap-4 w-full max-w-xs mx-auto px-6 text-center"
      >
        <input type="hidden" name="next" value={safeNext(next)} />
        <p className="text-sm font-medium tracking-tight">Eugene Tochilin</p>
        <p className="text-xs text-fg-tertiary uppercase tracking-widest">This portfolio is password protected</p>
        <p className="text-sm text-fg-secondary leading-relaxed">
          Enter the password you were given to take a look around.
        </p>
        <input
          type="password"
          name="password"
          autoFocus
          required
          placeholder="Password"
          className="w-full px-4 py-2.5 rounded-sm text-sm bg-transparent border border-button-secondary-stroke text-fg-primary placeholder:text-fg-tertiary focus:outline-none focus:border-button-secondary-stroke-hover transition-colors"
        />
        {error && <p className="text-xs text-red-500">Wrong password, try again.</p>}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-sm text-sm font-medium tracking-tight bg-button-primary-fill text-button-primary-label hover:bg-button-primary-fill-hover transition-colors"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
