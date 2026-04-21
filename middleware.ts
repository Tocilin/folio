import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/work/superapp") {
    const password = process.env.CASE_STUDY_PASSWORD;
    if (!password) return NextResponse.next(); // no env var = unprotected

    const cookie = request.cookies.get("sa_auth")?.value;
    if (cookie !== password) {
      const url = request.nextUrl.clone();
      url.pathname = "/unlock";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/work/superapp"],
};
