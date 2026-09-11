import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Respect Accept-Language for the initial redirect, defaulting to English.
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.toLowerCase().includes("es") ? "es" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|images|cv-placeholder.pdf).*)"],
};
