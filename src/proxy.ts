import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: Protect student routes
  if (pathname.startsWith("/student")) {
    const role = request.cookies.get("role")?.value;
    if (
      !role ||
      (role !== "student" && role !== "superadmin" && role !== "admin")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Example: Protect admin routes
  if (pathname.startsWith("/admin")) {
    const role = request.cookies.get("role")?.value;
    if (role !== "superadmin" && role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Handle CORS for /api routes if needed
  if (pathname.startsWith("/api")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/admin/:path*", "/api/:path*"],
};
