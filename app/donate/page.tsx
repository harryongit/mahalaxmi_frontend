"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { DonationsSection } from "@/src/components/temple/DonationsSection";

export default function DonatePage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950">
      <Navbar />
      
      <PageHero 
        breadcrumb="Sacred Danam"
        badge="80G Tax Exempted"
        title="Make a Sacred Offering to"
        titleGold="Karveer Nivasini Ambabai"
        description="Support daily Maha Annadanam for pilgrims, sacred Gaushala cow welfare, Akhand Deepam, and 900-year sanctum preservation through your holy contribution."
      />

      <main className="flex-1 w-full pb-20 md:pb-28">
        <DonationsSection isStandalonePage={true} />
      </main>
      
      <Footer />
    </div>
  );
}
