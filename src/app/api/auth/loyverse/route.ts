import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.LOYVERSE_CLIENT_ID;
  const redirectUri = process.env.LOYVERSE_REDIRECT_URI;

  const url = new URL("https://api.loyverse.com/oauth/authorize");

  url.searchParams.set("client_id", clientId || "");
  url.searchParams.set("redirect_uri", redirectUri || "");
  url.searchParams.set("response_type", "code");

  return NextResponse.redirect(url);
}