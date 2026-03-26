import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustSection from "@/components/TrustSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import StickyBottomBar from "@/components/StickyBottomBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <TrustSection />
      </main>
      <Footer />
      <Toast />
      <StickyBottomBar />
    </div>
  );
}
