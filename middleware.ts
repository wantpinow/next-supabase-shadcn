import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/middleware";

export const protectedRoutes = ["/home"];

export async function middleware(req: NextRequest) {
  // get the current user
  const { supabase, response } = createClient(req);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // redirect to login if user is not logged in and the route is protected
  if (!user && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
