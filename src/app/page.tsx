import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import AboutSummary from "@/components/AboutSummary";
import InstagramGallery from "@/components/InstagramGallery";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import StickyBottomBar from "@/components/StickyBottomBar";
import SEOManager from "@/components/SEOManager";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEOManager />
      <Header />
      <main className="flex-grow">
        <Hero />
        <CategoryGrid />
        <AboutSummary />
        <FeaturedProducts />
        <TrustSection />
        <TestimonialsSection />
        <InstagramGallery />
        <FAQSection />
      </main>
      <Footer />
      <Toast />
      <StickyBottomBar />
    </div>
  );
}
