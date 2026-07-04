import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ["/profile", "/settings", "/sessions", "/onboarding"];
const authPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const localeMatch = pathname.match(/^\/(en|fa)/);
  const pathWithoutLocale = localeMatch ? pathname.slice(3) : pathname;

  const isProtected = protectedPaths.some((p) => pathWithoutLocale.startsWith(p));
  const isAuth = authPaths.some((p) => pathWithoutLocale.startsWith(p));

  if (isProtected || isAuth) {
    return intlMiddleware(request);
  }

  return intlMiddleware(request);
}

import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/", "/(en|fa)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
