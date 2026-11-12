import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { WorkTrack } from "@/lib/projects";
import { DEFAULT_TRACK } from "@/lib/siteConfig";
import { GATE_COOKIE, gateToken } from "@/lib/siteGate";

const HOST_TRACK: Record<string, WorkTrack> = {
  "tochilin.me": "management",
  "www.tochilin.me": "management",
  "ic.tochilin.me": "ic",
  "ds.tochilin.me": "design-systems",
  "labs.tochilin.me": "side-projects",
};

const TRACKS: WorkTrack[] = ["management", "ic", "design-systems", "side-projects"];

export async function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") ?? "").split(":")[0];

  // md.tochilin.me is an alias for the primary domain — always redirect there.
  if (hostname === "md.tochilin.me") {
    const url = new URL(request.url);
    url.hostname = "tochilin.me";
    return NextResponse.redirect(url, 308);
  }

  // Site-wide password gate. Everything except the unlock page and its form
  // handler needs the gate cookie. With no SITE_PASSWORD set, local dev is
  // open, but production fails closed so a missing env var never exposes the site.
  const gatePassword = process.env.SITE_PASSWORD;
  const gateEnabled = Boolean(gatePassword) || process.env.NODE_ENV === "production";
  if (gateEnabled) {
    const { pathname } = request.nextUrl;
    const authed =
      Boolean(gatePassword) &&
      request.cookies.get(GATE_COOKIE)?.value === (await gateToken(gatePassword as string));
    const isGatePath = pathname === "/unlock" || pathname === "/api/unlock";
    if (!authed && !isGatePath) {
      const url = request.nextUrl.clone();
      url.pathname = "/unlock";
      url.search = "";
      const next = pathname + request.nextUrl.search;
      if (next !== "/") url.searchParams.set("next", next);
      return NextResponse.redirect(url);
    }
    if (authed && pathname === "/unlock") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const override = request.nextUrl.searchParams.get("track");
  const overrideTrack = override && TRACKS.includes(override as WorkTrack) ? (override as WorkTrack) : undefined;
  const cookieTrack = request.cookies.get("track")?.value as WorkTrack | undefined;

  const track =
    overrideTrack ??
    HOST_TRACK[hostname] ??
    (cookieTrack && TRACKS.includes(cookieTrack) ? cookieTrack : undefined) ??
    DEFAULT_TRACK;

  const response = NextResponse.next();
  response.headers.set("x-track", track);

  // Only localhost relies on the cookie (real deployments resolve the track
  // from the hostname); keep it in sync whenever an explicit override shows up.
  if (overrideTrack) {
    response.cookies.set("track", overrideTrack, { path: "/", sameSite: "lax" });
  }

  return response;
}

export const config = {
  matcher: "/((?!_next|.*\\..*).*)",
};
