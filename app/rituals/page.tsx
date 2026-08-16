"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Rituals } from "@/src/components/temple/Sections";
import { BookingWidget } from "@/src/components/temple/BookingWidget";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";

export default function RitualsPage() {
  useLenis();

  return (
    <>
      <main className="relative bg-[#FCF9F3]">
        <Navbar />

        {/* 1. Hero Section */}
        <PageHero
          breadcrumb="Rituals & Sevas"
          badge="5 Daily Aartis"
          title="Daily"
          titleGold="Rituals & Pujas"
          description="From dawn Kakad Aarti to night Shej Aarti — reserve online pujas and receive consecrated prasadam at home."
        />

        {/* 2. Cards of Puja / Online Puja Booking Widget */}
        <BookingWidget />

        {/* 3. Daily Rituals Schedule Section */}
        <Rituals />

        {/* 4. Footer */}
        <Footer />
      </main>
    </>
  );
}
