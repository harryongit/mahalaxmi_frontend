"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { ShieldCheck, Lock, Eye, Database, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      <PageHero
        breadcrumb="Privacy Policy"
        badge="Data Protection & Security"
        title="Privacy"
        titleGold="Policy"
        description="We are committed to safeguarding the personal information and gotra details shared by devotees."
      />

      <main className="flex-1 py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-8">
        <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 text-stone-800 leading-relaxed text-xs sm:text-sm">
          
          <div className="border-b border-stone-200 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Effective Date: January 01, 2026
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
              Privacy Policy & Devotee Data Safeguards
            </h2>
          </div>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="size-5 text-amber-800" />
              1. Information We Collect
            </h3>
            <p className="text-stone-600">
              When you register for online Puja, Chadhava, or VIP Darshan passes on our website, we collect necessary personal details including your name, contact mobile number, optional Gotra, and delivery address for Prasadam courier dispatch.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Lock className="size-5 text-amber-800" />
              2. How Your Information is Used
            </h3>
            <p className="text-stone-600">
              Your details are strictly used for the following devotional purposes:
            </p>
            <ul className="list-disc pl-5 text-stone-600 space-y-1">
              <li>Recitation of your Gotra and family member names by hereditary Shreepujaks during ritual sankalpa.</li>
              <li>Dispatching consecrated Prasadam and blessed items via courier to your specified address.</li>
              <li>Sending live WhatsApp photo and video updates of your performed Puja.</li>
              <li>Sending booking confirmation receipts and Kirnotsav festival reminders.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Eye className="size-5 text-amber-800" />
              3. Data Protection & Non-Disclosure
            </h3>
            <p className="text-stone-600">
              We never sell, rent, or lease devotee personal data to third parties. All financial payment transactions are processed through SSL 256-bit encrypted bank gateways.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Database className="size-5 text-amber-800" />
              4. Devotee Rights & Account Deletion
            </h3>
            <p className="text-stone-600">
              Devotees have full right to request account deletion or data erasure at any time via our dedicated <a href="/delete-account" className="text-amber-900 font-bold underline">Delete My Account</a> page or by emailing <strong>info@mahalaxmikolhapur.com</strong>.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
