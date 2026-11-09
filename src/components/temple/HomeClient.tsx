"use client";

import { useState } from "react";
import { useLenis } from "@/src/lib/use-lenis";
import { Loader } from "@/src/components/temple/Loader";
import { Navbar } from "@/src/components/temple/Navbar";
import { Hero } from "@/src/components/temple/Hero";
import { BookingWidget } from "@/src/components/temple/BookingWidget";
import { UtsavBanner } from "@/src/components/temple/UtsavBanner";
import {
  About,
  Testimonials,
} from "@/src/components/temple/Sections";
import { ShreepujakSection } from "@/src/components/temple/ShreepujakSection";
import { WhyTrustUs } from "@/src/components/temple/WhyTrustUs";
import { ContactSection } from "@/src/components/temple/ContactSection";
import { Footer } from "@/src/components/temple/Footer";

export function HomeClient({
  initialTestimonials,
}: {
  initialTestimonials?: any[];
  initialGallery?: any[];
}) {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <main className={`relative ${loaded ? "" : "overflow-hidden h-screen"} bg-[#FCF9F3]`}>
        <Navbar />

        {/* 1. Hero Banner */}
        <Hero />

        {/* 2. Online Puja & Seva Booking Cards */}
        <BookingWidget />

        {/* 3. Utsav Special Banner */}
        <UtsavBanner />

        {/* 4. About Temple & Heritage */}
        <About />

        {/* 5. Meet Shreepujak & Hereditary Sanctum Lineage */}
        <ShreepujakSection />

        {/* 6. Why Devotees Trust Us (54th Gen, Born in Kolhapur, No 3rd Party) */}
        <WhyTrustUs />

        {/* 7. Devotee Testimonials & Reviews */}
        <Testimonials initialData={initialTestimonials} />

        {/* 8. Devotee Enquiry & Helpline Contact Form */}
        <ContactSection />

        {/* 9. Footer */}
        <Footer />
      </main>
    </>
  );
}
