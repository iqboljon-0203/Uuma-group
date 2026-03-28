import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // 1. Agar foydalanuvchi admin.uumagroup.uz dan kirayotgan bo'lsa
  // Lokal test uchun localhost:3000 ni ham hisobga olsak bo'ladi (agar kerak bo'lsa)
  if (host.startsWith("admin.")) {
    // Agar yo'l allaqachon /admin bilan boshlanmasa, biz uni /admin/... ga rewrite qilamiz
    if (!url.pathname.startsWith("/admin")) {
      url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 2. Agar foydalanuvchi asosiy uumagroup.uz da bo'lsa va /admin sahifasini 
  // bevosita ochmoqchi bo'lsa, uni tepadagi subdomenga REDIRECT qilib yuborsak bo'ladi (tanlovga ko'ra)
  if (host === "uumagroup.uz" && url.pathname.startsWith("/admin")) {
    // Bu ixtiyoriy, agar subdomen ishlatilsa /admin ni asosiy saytdan olib chiqib ketish yaxshiroq
    const adminUrl = new URL(url.pathname, `https://admin.uumagroup.uz`);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

// Qaysi manzillar uchun middleware ishlashi kerakligini ko'rsatamiz
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
