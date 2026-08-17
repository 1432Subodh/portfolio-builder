import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token")?.value
    || request.cookies.get("__Secure-authjs.session-token")?.value;

  if (!token) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/editor/:path*"],
};
