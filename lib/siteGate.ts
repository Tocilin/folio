// Site-wide "keep random visitors out" gate. Not real security: one shared
// password, checked on the server. The password itself lives in the
// SITE_PASSWORD environment variable (Vercel project settings, or
// .env.local for local dev) and is never sent to the browser. The cookie
// only holds a hash of it.

export const GATE_COOKIE = "site_auth";
export const GATE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function gateToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`folio-gate:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function normalize(input: string) {
  return input.trim().toLowerCase();
}

// Only allow same-site relative paths as a post-unlock destination.
export function safeNext(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return "/";
  if (next.startsWith("/unlock") || next.startsWith("/api/unlock")) return "/";
  return next;
}
