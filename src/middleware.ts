import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // 1. Admin subdonemi tekshiruvi
  if (host.startsWith("admin.")) {
    // Agar pathname allaqachon /admin bilan boshlanmasa
    if (!url.pathname.startsWith("/admin")) {
      url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 2. Asosiy domendagi /admin ni subdomenga yo'naltirish
  if (host === "uumagroup.uz" && url.pathname.startsWith("/admin")) {
    const adminUrl = new URL(url.pathname, `https://admin.uumagroup.uz`);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Quyidagi yo'llardan tashqari hamma joyda ishlaydi:
     * - api (API yo'llari)
     * - _next/static (statik fayllar)
     * - _next/image (rasmlar)
     * - favicon.ico (ikonka)
     * - hamma rasm formatlari (.png, .jpg, .svg, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
