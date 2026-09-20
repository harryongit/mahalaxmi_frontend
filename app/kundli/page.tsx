"use client";

import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import dynamic from 'next/dynamic';
import "kundli-generator/style.css";

// Dynamically import KundliPage with SSR disabled since it uses client-only react internals
const KundliPage = dynamic(
  () => import("kundli-generator").then((mod) => mod.KundliPage),
  { ssr: false }
);

export default function KundliGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />
      <PageHero
        breadcrumb="Astrology"
        badge="Vedic Astrology"
        title="Free Kundli"
        titleGold="Generator"
        description="Generate your accurate Vedic birth chart (Janam Kundli) based on Indian astrology."
      />

      <main className="flex-1 py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-12">
        
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-amber-200/50">
          <div className="bg-amber-50/30 rounded-2xl overflow-hidden min-h-[500px]">
            <KundliPage />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
