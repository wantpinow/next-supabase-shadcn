import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/middleware";

// routes that require the user to be logged in
export const protectedRoutes = ["/decks", "/deck/**"];
function wildcardToRegex(wildcard: string) {
  const w = wildcard.replace(/[.+^${}()|[\]\\]/g, "\\$&"); // regexp escape
  const re = new RegExp(`^${w.replace(/\*/g, ".*").replace(/\?/g, ".")}$`, "i");
  return re;
}
export const protectedRoutesRegex = protectedRoutes.map(wildcardToRegex);

export async function middleware(req: NextRequest) {
  // get the current user
  const { supabase, response } = createClient(req);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // redirect to login if user is not logged in and the route is protected
  if (!user && protectedRoutesRegex.some((r) => r.test(req.nextUrl.pathname))) {
    return NextResponse.redirect(
      `${req.nextUrl.origin}/login?error=Unauthorized&redirect=${req.nextUrl.pathname}`
    );
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
