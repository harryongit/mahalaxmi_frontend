"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { Cookie, Shield, Check, Info } from "lucide-react";

export default function CookiePolicyPage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      <PageHero
        breadcrumb="Cookie Policy"
        badge="Browsing Preferences"
        title="Cookie"
        titleGold="Policy"
        description="Understanding how cookies enhance your online darshan, booking cart, and user account sessions."
      />

      <main className="flex-1 py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-8">
        <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 text-stone-800 leading-relaxed text-xs sm:text-sm">
          
          <div className="border-b border-stone-200 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Cookie Consent Guidelines
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
              Cookie Policy & Local Storage Usage
            </h2>
          </div>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Cookie className="size-5 text-amber-800" />
              1. What Are Cookies?
            </h3>
            <p className="text-stone-600">
              Cookies are small encrypted text files stored on your browser when visiting websites. They allow our platform to remember your selected Sevas, active devotee login sessions, and language preferences.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Shield className="size-5 text-amber-800" />
              2. Types of Cookies We Use
            </h3>
            <div className="space-y-2 text-stone-600">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <strong className="text-stone-900 font-bold text-sm block">Essential Session Cookies</strong>
                <p className="text-xs mt-0.5">Necessary to keep you logged into your Devotee Profile and maintain items in your Puja booking cart.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <strong className="text-stone-900 font-bold text-sm block">Performance & Security Cookies</strong>
                <p className="text-xs mt-0.5">Help optimize page loading speeds during high-traffic festival periods like Kirnotsav and Navratri.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Info className="size-5 text-amber-800" />
              3. Managing Cookie Preferences
            </h3>
            <p className="text-stone-600">
              You can modify or disable non-essential cookies at any time through your browser settings. Disabling essential session cookies may prevent booking cart items from saving.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
