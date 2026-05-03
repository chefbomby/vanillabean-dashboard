import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "ไม่พบ code จาก Loyverse" }, { status: 400 });
  }

  const body = new URLSearchParams({
    client_id: process.env.LOYVERSE_CLIENT_ID || "",
    client_secret: process.env.LOYVERSE_CLIENT_SECRET || "",
    redirect_uri: process.env.LOYVERSE_REDIRECT_URI || "",
    code,
    grant_type: "authorization_code",
  });

  const tokenResponse = await fetch("https://api.loyverse.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return NextResponse.json(
      { error: "เชื่อมต่อ Loyverse ไม่สำเร็จ", detail: tokenData },
      { status: 400 }
    );
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));

  response.cookies.set("loyverse_access_token", tokenData.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  return response;
}
