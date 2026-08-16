"use client";

import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { User, Phone, Mail, MapPin, ShieldCheck, Sparkles, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      {/* Proper Dark Compact Hero Banner */}
      <PageHero
        breadcrumb="My Profile"
        badge="Verified Devotee"
        title="Devotee"
        titleGold="Account Profile"
        description="Manage your contact details, prasadam delivery address, and gotra ritual preferences."
      />

      <main className="flex-1 py-12 px-4">
        <div className="container-temple max-w-4xl mx-auto space-y-8">
          {/* Header Devotee Identity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl border border-[var(--gold)]/30 p-6 sm:p-8 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white shadow-xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              <div className="size-20 rounded-full bg-[var(--gold)]/20 border-2 border-[var(--gold)] flex items-center justify-center font-serif text-3xl text-[var(--gold)] font-bold shadow-xl shrink-0">
                A
              </div>

              <div className="text-center sm:text-left space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] text-xs font-semibold border border-[var(--gold)]/30 mb-1">
                  <ShieldCheck className="size-3.5" />
                  <span>Verified Devotee</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gradient-gold">
                  Ananya Deshmukh
                </h1>
                <p className="text-sm text-amber-100/70">Registered Member • Kolhapur Circle</p>
              </div>

              <button className="sm:ml-auto px-4 py-2 rounded-full border border-[var(--gold)]/40 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer">
                <Edit3 className="size-3.5 text-[var(--gold)]" />
                <span>Edit Profile</span>
              </button>
            </div>
          </motion.div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
                <User className="size-5 text-amber-800" />
                <h2 className="font-serif text-xl font-bold text-stone-900">Personal Details</h2>
              </div>

              <div className="space-y-3.5 text-sm">
                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Full Name</span>
                  <span className="text-stone-900 font-semibold">Ananya Deshmukh</span>
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Mobile Number</span>
                  <span className="text-stone-900 font-semibold flex items-center gap-2">
                    <Phone className="size-3.5 text-amber-800" /> +91 98765 43210
                  </span>
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Email Address</span>
                  <span className="text-stone-900 font-semibold flex items-center gap-2">
                    <Mail className="size-3.5 text-amber-800" /> ananya.d@example.com
                  </span>
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Prasadam Delivery Address</span>
                  <span className="text-stone-700 font-medium flex items-start gap-2 mt-0.5">
                    <MapPin className="size-4 text-amber-800 shrink-0 mt-0.5" /> 
                    Plot No. 42, Tarabai Park, Near Old Palace, Kolhapur - 416003
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Devotional Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
                <Sparkles className="size-5 text-amber-800" />
                <h2 className="font-serif text-xl font-bold text-stone-900">Ritual Preferences</h2>
              </div>

              <div className="space-y-3.5 text-sm">
                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Preferred Gotra</span>
                  <span className="text-stone-900 font-semibold">Kashyap Gotra</span>
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Favorite Puja Types</span>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
                      Kumkumarchana
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
                      Abhishek Seva
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
                      Mahapuja
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Recent Devotee Activity</span>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Booked 3 rituals in the last 30 days. Prasadam delivered to home address.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
