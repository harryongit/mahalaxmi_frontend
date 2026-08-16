"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function TermsAndConditionsPage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      <PageHero
        breadcrumb="Terms & Conditions"
        badge="Devotee Service Agreement"
        title="Terms &"
        titleGold="Conditions"
        description="Guidelines governing online Puja bookings, VIP Darshan passes, Prasadam dispatch, and temple Seva offerings."
      />

      <main className="flex-1 py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-8">
        <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 text-stone-800 leading-relaxed text-xs sm:text-sm">
          
          <div className="border-b border-stone-200 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Last Updated: January 2026
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
              Devotee Terms of Service & Seva Agreement
            </h2>
          </div>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="size-5 text-amber-800" />
              1. Online Puja & Ritual Bookings
            </h3>
            <p className="text-stone-600">
              All rituals booked through this portal are performed by hereditary Shreepujaks of Shri Mahalaxmi Mandir, Kolhapur, according to strict Vedic rites. Devotees are requested to double-check their Gotra and family member names before confirming payment.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Clock className="size-5 text-amber-800" />
              2. Rescheduling & Cancellations
            </h3>
            <p className="text-stone-600">
              Booked Sevas can be rescheduled to any available date up to 24 hours before the scheduled Puja time. Due to advance procurement of ritual flowers, saree otee, and Naivedya bhog, booking fees are non-refundable once Sankalpa is completed.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <FileText className="size-5 text-amber-800" />
              3. Prasadam Courier Dispatch
            </h3>
            <p className="text-stone-600">
              Blessed Prasadam boxes are packed in sacred food-grade containers and dispatched via registered courier within 2–4 business days following Puja completion. Tracking details will be shared on WhatsApp.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <AlertCircle className="size-5 text-amber-800" />
              4. Code of Conduct for Offline Visiting Devotees
            </h3>
            <p className="text-stone-600">
              Devotees visiting Kolhapur Mandir with VIP Darshan passes must adhere to traditional modest attire guidelines (Dhoti/Kurta for gentlemen and Saree/Salwar for ladies). Photography inside the inner sanctum is strictly prohibited.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
