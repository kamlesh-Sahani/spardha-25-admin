import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {cookies} from "next/headers"
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const protectedRoutes = ["/admin", "/api/report"];
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/report/:path*",
    "/login",
    "/register",
    "/api/:path*",
    "/admin/:path*",
  ],
};
