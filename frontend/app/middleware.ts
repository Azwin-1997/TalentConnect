import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  // 🚫 Not logged in → block protected routes
  if (!refreshToken && !isAuthPage) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // 🚫 Logged in → block login/register ONLY
  // ❗ DO NOT redirect to "/"
  if (refreshToken && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  // ✅ Let AuthContext decide everything else
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/jobs/:path*",
    "/admin/:path*",
    "/login",
    "/register"
  ],
};
