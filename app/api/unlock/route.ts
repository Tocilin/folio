import { NextResponse } from "next/server";
import { GATE_COOKIE, GATE_MAX_AGE, gateToken, normalize, safeNext } from "@/lib/siteGate";

export async function POST(request: Request) {
  const form = await request.formData();
  const input = String(form.get("password") ?? "");
  const next = safeNext(String(form.get("next") ?? "/"));
  const password = process.env.SITE_PASSWORD;

  if (!password || normalize(input) !== normalize(password)) {
    const url = new URL("/unlock", request.url);
    url.searchParams.set("error", "1");
    if (next !== "/") url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set(GATE_COOKIE, await gateToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: GATE_MAX_AGE,
  });
  return response;
}
