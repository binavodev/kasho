import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") ?? "";

  // 1. Redirect www → non-www (301)
  if (host.startsWith("www.")) {
    url.host = host.replace(/^www\./, "");
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2. Strip trailing slash (301) — excepto la raíz "/"
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, { status: 301 });
  }

  // No forzar HTTP→HTTPS aquí: en Vercel el edge ya redirige, y con Cloudflare delante
  // (SSL "Flexible") x-forwarded-proto puede ser http hacia el origen y provoca
  // ERR_TOO_MANY_REDIRECTS. Usa Cloudflare SSL "Full" o "Full (strict)".

  const response = NextResponse.next();

  // 3. X-Robots-Tag: noindex para rutas privadas
  if (
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/onboarding") ||
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/superadmin")
  ) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    // Excluir assets estáticos y rutas internas de Next.js
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|og|llms.txt).*)",
  ],
};

// Alias para compatibilidad
export { proxy as middleware };
