import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALE_COOKIE = "locale";

export function proxy(request: NextRequest) {
  const storedLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (storedLocale === "tr" || storedLocale === "en") {
    return NextResponse.next();
  }

  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang.startsWith("tr") ? "tr" : "en";

  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, preferred, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
