import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://uuma.uz"),
  title: "Uuma Group – Tozalikning Yangi Darajasi | Premium Maishiy Kimyo",
  description:
    "Uuma Group - O'zbekistondagi premium maishiy kimyo mahsulotlari ishlab chiqaruvchisi. Habfer va Jieti brendlari bilan uyingizga mukammal tozalik va xushbo'y hid olib keling.",
  keywords: ["Uuma Group", "Habfer", "Jieti", "maishiy kimyo", "yuvish geli", "kapsulalar", "O'zbekiston", "tozalik vositalari"],
  authors: [{ name: "Uuma Group Team" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Uuma Group – Tozalikning Yangi Darajasi",
    description: "Premium maishiy kimyo mahsulotlari: Habfer va Jieti.",
    url: "https://uuma.uz", // O'zgartirishingiz mumkin
    siteName: "Uuma Group",
    images: [
      {
        url: "/og-image.png", // Agar rasm bo'lsa
        width: 1200,
        height: 630,
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uuma Group – Tozalikning Yangi Darajasi",
    description: "Premium maishiy kimyo mahsulotlari: Habfer va Jieti.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CartProvider } from "@/store/cart-context";
import { ToastProvider } from "@/store/toast-context";
import { LangProvider } from "@/store/lang-context";
import { RecentlyViewedProvider } from "@/store/recently-viewed";
import SEOManager from "@/components/SEOManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <LangProvider>
          <RecentlyViewedProvider>
            <SEOManager />
            <CartProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </CartProvider>
          </RecentlyViewedProvider>
        </LangProvider>
      </body>
    </html>
  );
}
