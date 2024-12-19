import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyJwtToken } from "@/lib/auth";

const AUTH_PAGES = ["/login", "/register", '/integrations'];

const isAuthPages = (url: string) => AUTH_PAGES.some((page) => url.startsWith(page));

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }

    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const response = NextResponse.redirect(
      new URL(`/login`, url)
    );
    response.cookies.delete("token");

    return response;
  }

  return NextResponse.next();
}

export const config = { 
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};