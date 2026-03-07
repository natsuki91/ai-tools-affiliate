import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Redirect HTTP to HTTPS in production so http://toolscout.tools shows the site.
 * Skip on localhost so local dev still works.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const isLocal =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.endsWith(".local");

  if (isLocal) return NextResponse.next();

  if (url.protocol === "http:") {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except _next/static, _next/image, favicon, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
