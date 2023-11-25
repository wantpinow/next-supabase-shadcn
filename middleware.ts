import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/middleware";

export const protectedRoutes = ["/home"];

export async function middleware(req: NextRequest) {
  const { supabase, response } = createClient(req);

  // get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user", user);
  if (!user && protectedRoutes.includes(req.nextUrl.pathname)) {
    // redirect to login if not logged in
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
