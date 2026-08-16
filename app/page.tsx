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
  Donate,
  Testimonials,
} from "@/src/components/temple/Sections";
import { Footer } from "@/src/components/temple/Footer";

export default function Home() {
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

        {/* 5. Annadan & Gou Seva Contributions */}
        <Donate />

        {/* 6. Devotee Testimonials & Reviews */}
        <Testimonials />

        {/* 7. Footer */}
        <Footer />
      </main>
    </>
  );
}
