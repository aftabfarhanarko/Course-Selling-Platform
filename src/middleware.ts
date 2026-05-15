import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAdmin(role: string | undefined) {
  return role === "superadmin" || role === "super_admin" || role === "admin";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const role = request.cookies.get("role")?.value;

  if (pathname === "/admin/users") {
    // const url = new URL("/admin/users", request.url);
    const url = new URL("/admin/users-api", request.url);
    return NextResponse.redirect(url);
  }

  if (pathname === "/admin/courses") {
    // const url = new URL("/admin/courses", request.url);
    const url = new URL("/admin/courses-api", request.url);
    return NextResponse.redirect(url);
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!isAdmin(role)) {
      const url = new URL("/login", request.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/student" || pathname.startsWith("/student/")) {
    if (!role) {
      const url = new URL("/login", request.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/student", "/student/:path*"],
};
