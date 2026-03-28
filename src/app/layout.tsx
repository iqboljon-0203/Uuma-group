import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/store/cart-context";
import { ToastProvider } from "@/store/toast-context";
import { LangProvider } from "@/store/lang-context";
import { RecentlyViewedProvider } from "@/store/recently-viewed";
import SEOManager from "@/components/SEOManager";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  display: 'swap',
});
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#800020",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Accessablity uchun yaxshi
};

export const metadata: Metadata = {
  metadataBase: new URL("https://uumagroup.uz"),
  title: {
    default: "Uuma Group | Premium maishiy kimyo mahsulotlari",
    template: "%s | Uuma Group"
  },
  description: "Habfer va Jieti brendlari - uyingizda mukammal tozalik va xushbo'y ifor yaratishingiz uchun premium sifatli maishiy kimyo.",
  keywords: ["Uuma Group", "Habfer", "Jieti", "maishiy kimyo", "yuvish geli", "kapsulalar", "O'zbekiston", "tozalik vositalari", "Mirobod tumani"],
  authors: [{ name: "Uuma Group Team" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Uuma Group – Tozalikning Yangi Darajasi",
    description: "Premium maishiy kimyo mahsulotlari: Habfer va Jieti.",
    url: "https://uumagroup.uz",
    siteName: "Uuma Group",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Uuma Group Premium Products"
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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-id", // Bu yerga Google Search Console kodini qo'yasiz
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col font-sans ${inter.className}`}>
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
