"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { GalleryBento } from "@/src/components/temple/GalleryBento";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";

export default function GalleryPage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      <PageHero
        breadcrumb="Photo Gallery"
        badge="1000+ Photo Archive"
        title="Sacred Photo"
        titleGold="Gallery"
        description="Explore visual moments of grace, ancient stone carvings, sunrise Kirnotsav, and night festival lamps captured at Shri Ambabai Temple."
      />

      <main className="flex-1">
        <GalleryBento />
      </main>

      <Footer />
    </div>
  );
}
