import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;
    const expected = process.env.CASE_STUDY_PASSWORD;

    if (!expected || password !== expected) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("sa_auth", expected, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
