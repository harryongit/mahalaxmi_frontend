"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { About, Architecture } from "@/src/components/temple/Sections";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Flame,
  Sparkles,
  ShieldCheck,
  Heart,
  Zap,
  Users,
  Award,
  Star,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      {/* Classic PageHero Banner */}
      <PageHero
        breadcrumb="About Shri Mahalaxmi Mandir"
        badge="Sacred 51 Shakti Peethas"
        title="About Shri Mahalaxmi"
        titleGold="Temple, Kolhapur"
        description="One of the most sacred Shakti Peethas in India, Shri Mahalaxmi Mandir in Kolhapur is dedicated to Goddess Mahalaxmi (Ambabai)."
      />

      {/* Existing Original High-End About Section */}
      <About />

      {/* SECTION: Temple Information Grid */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border-2 border-[var(--gold)]/60 bg-gradient-to-r from-[#4A101C] via-[#3C0F1A] to-[#25070E] text-white p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Ambient Glow Overlay */}
          <div className="absolute top-0 right-0 size-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="border-b border-amber-200/20 pb-4 relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold)] bg-[var(--gold)]/15 px-3 py-1 rounded-full border border-[var(--gold)]/30 inline-block mb-1">
              Essential Devotee Guide
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gradient-gold mt-1">
              Temple Information & Hours
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-[var(--gold)]/30 hover:border-[var(--gold)] hover:bg-white/15 transition-all shadow-md"
            >
              <div className="size-10 rounded-xl bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center border border-[var(--gold)]/40">
                <MapPin className="size-5" />
              </div>
              <strong className="text-[var(--gold)] font-bold block text-sm font-serif">Address</strong>
              <p className="text-amber-100/90 leading-relaxed font-medium">
                Mahalaxmi Temple Road, Kolhapur, Maharashtra 416012, India
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-[var(--gold)]/30 hover:border-[var(--gold)] hover:bg-white/15 transition-all shadow-md"
            >
              <div className="size-10 rounded-xl bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center border border-[var(--gold)]/40">
                <Clock className="size-5" />
              </div>
              <strong className="text-[var(--gold)] font-bold block text-sm font-serif">Temple Timings</strong>
              <p className="text-amber-100/90 leading-relaxed font-medium">
                5:00 AM – 9:30 PM<br />(Daily Aarti & Darshan)
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-[var(--gold)]/30 hover:border-[var(--gold)] hover:bg-white/15 transition-all shadow-md"
            >
              <div className="size-10 rounded-xl bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center border border-[var(--gold)]/40">
                <Phone className="size-5" />
              </div>
              <strong className="text-[var(--gold)] font-bold block text-sm font-serif">Contact Details</strong>
              <p className="text-amber-100/90 leading-relaxed font-medium">
                +91 98765 43210<br />info@mahalaxmikolhapur.com
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-[var(--gold)]/30 hover:border-[var(--gold)] hover:bg-white/15 transition-all shadow-md"
            >
              <div className="size-10 rounded-xl bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center border border-[var(--gold)]/40">
                <Flame className="size-5" />
              </div>
              <strong className="text-[var(--gold)] font-bold block text-sm font-serif">Presiding Deity</strong>
              <p className="text-amber-100/90 leading-relaxed font-medium">
                Goddess Mahalaxmi (Ambabai)<br />— 51 Shakti Peethas
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION: Our Services (ATTRACTIVE RICH CARDS) */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Complete Devotional Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Our Services
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Everything you need for a complete spiritual experience from anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            className="group p-6 sm:p-7 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-2xl transition-all duration-300 space-y-4 relative overflow-hidden"
          >
            <div className="size-14 rounded-2xl bg-gradient-to-br from-[#3C0F1A] to-[#4A101C] text-[var(--gold)] flex items-center justify-center font-bold text-2xl shadow-lg shadow-amber-950/20 border border-[var(--gold)]/30 group-hover:scale-110 transition-transform">
              🕉️
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
              Online Puja Booking
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Book personalized pujas performed by hereditary Shreepujak in your name with full Vedic rituals.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            className="group p-6 sm:p-7 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-2xl transition-all duration-300 space-y-4 relative overflow-hidden"
          >
            <div className="size-14 rounded-2xl bg-gradient-to-br from-[#3C0F1A] to-[#4A101C] text-[var(--gold)] flex items-center justify-center font-bold text-2xl shadow-lg shadow-amber-950/20 border border-[var(--gold)]/30 group-hover:scale-110 transition-transform">
              📿
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
              Chadhava / Arpan
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Offer Regular Otee, Saree Otee, and sacred consecrated items directly to Goddess Mahalaxmi.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            className="group p-6 sm:p-7 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-2xl transition-all duration-300 space-y-4 relative overflow-hidden"
          >
            <div className="size-14 rounded-2xl bg-gradient-to-br from-[#3C0F1A] to-[#4A101C] text-[var(--gold)] flex items-center justify-center font-bold text-2xl shadow-lg shadow-amber-950/20 border border-[var(--gold)]/30 group-hover:scale-110 transition-transform">
              🍃
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
              Naivedya / Bhog
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Offer Puranpoli Naivedya and sacred Bhojan for Brahman, Kumarika, and Suwasini in your family name.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            className="group p-6 sm:p-7 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-2xl transition-all duration-300 space-y-4 relative overflow-hidden"
          >
            <div className="size-14 rounded-2xl bg-gradient-to-br from-[#3C0F1A] to-[#4A101C] text-[var(--gold)] flex items-center justify-center font-bold text-2xl shadow-lg shadow-amber-950/20 border border-[var(--gold)]/30 group-hover:scale-110 transition-transform">
              📺
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
              Online Darshan
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Watch live aarti and darshan of Goddess Ambabai from anywhere in the world 24/7.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            className="group p-6 sm:p-7 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-2xl transition-all duration-300 space-y-4 relative overflow-hidden"
          >
            <div className="size-14 rounded-2xl bg-gradient-to-br from-[#3C0F1A] to-[#4A101C] text-[var(--gold)] flex items-center justify-center font-bold text-2xl shadow-lg shadow-amber-950/20 border border-[var(--gold)]/30 group-hover:scale-110 transition-transform">
              🛕
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
              Offline Darshan Pass
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Book VIP darshan passes for priority temple entry at Kolhapur without long queue waiting times.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            className="group p-6 sm:p-7 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-2xl transition-all duration-300 space-y-4 relative overflow-hidden"
          >
            <div className="size-14 rounded-2xl bg-gradient-to-br from-[#3C0F1A] to-[#4A101C] text-[var(--gold)] flex items-center justify-center font-bold text-2xl shadow-lg shadow-amber-950/20 border border-[var(--gold)]/30 group-hover:scale-110 transition-transform">
              🙏
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
              Annadan & Gou Seva
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Contribute to sacred Annadan and Goushala Gou Seva with any custom contribution amount.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Existing Architecture Section */}
      <Architecture />

      {/* SECTION: How We Serve You (TIMELINE CARDS) */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Fastest Booking Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            How We Serve You
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Book in under 30 seconds — the fastest puja booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl border-2 border-amber-300/80 bg-white space-y-3 shadow-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-4xl font-bold text-gradient-gold block">01</span>
              <span className="size-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                1
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Choose Your Seva</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Browse pujas, chadhava, naivedya, or darshan options.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl border-2 border-amber-300/80 bg-white space-y-3 shadow-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-4xl font-bold text-gradient-gold block">02</span>
              <span className="size-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                2
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Select Date & Type</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Pick a date within the festival period and choose online or offline.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl border-2 border-amber-300/80 bg-white space-y-3 shadow-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-4xl font-bold text-gradient-gold block">03</span>
              <span className="size-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                3
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Enter Details</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Just your name and optional gotra — that's it!
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl border-2 border-amber-300/80 bg-white space-y-3 shadow-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-4xl font-bold text-gradient-gold block">04</span>
              <span className="size-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                4
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Instant Confirmation</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Pay and get instant booking confirmation with booking ID.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION: Why Choose Us & Core Values */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Why Choose Us */}
        <div className="rounded-3xl border-2 border-amber-300/80 bg-white p-6 sm:p-8 space-y-6 shadow-lg">
          <div className="border-b border-stone-200 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Devotee Trust
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              Why Choose Us
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="size-10 rounded-xl bg-amber-900 text-[var(--gold)] flex items-center justify-center shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <strong className="text-stone-900 font-bold text-sm block">Hereditary Shreepujak</strong>
                <p className="text-stone-600 mt-0.5">All rituals performed by hereditary Shreepujak of Mahalaxmi Mandir, Kolhapur.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="size-10 rounded-xl bg-amber-900 text-[var(--gold)] flex items-center justify-center shrink-0">
                <Users className="size-5" />
              </div>
              <div>
                <strong className="text-stone-900 font-bold text-sm block">Trusted by 50K+</strong>
                <p className="text-stone-600 mt-0.5">Over 50,000 devotees have experienced divine blessings through our platform.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="size-10 rounded-xl bg-amber-900 text-[var(--gold)] flex items-center justify-center shrink-0">
                <Heart className="size-5" />
              </div>
              <div>
                <strong className="text-stone-900 font-bold text-sm block">With Love & Devotion</strong>
                <p className="text-stone-600 mt-0.5">Every seva is performed with utmost devotion and care for your spiritual needs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="size-10 rounded-xl bg-amber-900 text-[var(--gold)] flex items-center justify-center shrink-0">
                <Zap className="size-5" />
              </div>
              <div>
                <strong className="text-stone-900 font-bold text-sm block">Ultra-Fast Booking</strong>
                <p className="text-stone-600 mt-0.5">Book in under 30 seconds. Returning users can book in just 1–2 clicks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Core Values */}
        <div className="rounded-3xl border-2 border-amber-300/80 bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 p-6 sm:p-8 space-y-6 shadow-lg">
          <div className="border-b border-amber-300/80 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-950 bg-amber-200 px-3 py-1 rounded-full border border-amber-300">
              Sanatan Principles
            </span>
            <h3 className="font-serif text-2xl font-bold text-amber-950 mt-1">
              Our Core Values
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-xs">
              <strong className="text-amber-950 font-bold text-sm block font-serif">Dharma</strong>
              <p className="text-stone-700 mt-0.5">We uphold the sacred traditions and rituals of Sanatan Dharma in every seva.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-xs">
              <strong className="text-amber-950 font-bold text-sm block font-serif">Bhakti</strong>
              <p className="text-stone-700 mt-0.5">Devotion is at the heart of everything we do — for the Goddess and for you.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-xs">
              <strong className="text-amber-950 font-bold text-sm block font-serif">Transparency</strong>
              <p className="text-stone-700 mt-0.5">Clear pricing, real-time updates, and instant confirmation of every booking.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-xs">
              <strong className="text-amber-950 font-bold text-sm block font-serif">Accessibility</strong>
              <p className="text-stone-700 mt-0.5">Making divine blessings accessible to every devotee, anywhere in the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Key Statistics Counter Bar */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white shadow-2xl border-2 border-[var(--gold)]/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[var(--gold)] block">50K+</span>
              <span className="text-xs text-amber-100/80 font-medium">Devotees Served</span>
            </div>

            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[var(--gold)] block">1000+</span>
              <span className="text-xs text-amber-100/80 font-medium">Pujas Completed</span>
            </div>

            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[var(--gold)] block">4.9 ★</span>
              <span className="text-xs text-amber-100/80 font-medium">User Rating</span>
            </div>

            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[var(--gold)] block">24/7</span>
              <span className="text-xs text-amber-100/80 font-medium">Online Darshan</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
