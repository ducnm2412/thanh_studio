import WeddingIntro from "@/components/wedding-intro/WeddingIntro";
import Masthead from "@/components/Masthead";
import Hero from "@/components/Hero";
import BrandStory from "@/components/brand-story/BrandStory";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import { Footer } from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Đặt NEXT_PUBLIC_INTRO=off trong .env.local để tắt intro khi phát triển */}
      {process.env.NEXT_PUBLIC_INTRO !== "off" && <WeddingIntro />}
      <Masthead />
      <main>
        <Hero />
        <BrandStory />
        <Services />
        <Gallery />
        <Pricing />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
