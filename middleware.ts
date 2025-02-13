/** @format */

// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Get the session token
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Get the current path
  const path = req.nextUrl.pathname;

  // Define public routes (routes that don't require authentication)
  const publicRoutes = ["/login"];

  // If the user is trying to access a public route, allow it
  if (publicRoutes.includes(path)) {
    // If the user is already logged in, redirect them to the dashboard
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // If the user is not authenticated and trying to access a private route, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow access to all other routes for authenticated users
  return NextResponse.next();
}

// Define the routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
