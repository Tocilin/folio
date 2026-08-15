import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { WorkTrack } from "@/lib/projects";
import { DEFAULT_TRACK } from "@/lib/siteConfig";

const HOST_TRACK: Record<string, WorkTrack> = {
  "tochilin.me": "management",
  "www.tochilin.me": "management",
  "ic.tochilin.me": "ic",
  "ds.tochilin.me": "design-systems",
  "labs.tochilin.me": "side-projects",
};

const TRACKS: WorkTrack[] = ["management", "ic", "design-systems", "side-projects"];

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") ?? "").split(":")[0];

  // md.tochilin.me is an alias for the primary domain — always redirect there.
  if (hostname === "md.tochilin.me") {
    const url = new URL(request.url);
    url.hostname = "tochilin.me";
    return NextResponse.redirect(url, 308);
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
