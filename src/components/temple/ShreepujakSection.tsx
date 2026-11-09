"use client";

import { motion } from "framer-motion";
import {
  Flame,
  ShieldCheck,
  Award,
  Sparkles,
  BookOpen,
  Users,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { SectionEyebrow, Reveal } from "./effects";

export function ShreepujakSection() {
  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("book-puja");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/rituals";
    }
  };

  return (
    <section
      id="shreepujak"
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-[#FCF9F3] via-[#FAF4EA] to-[#FCF9F3] text-stone-900 border-t border-amber-200/70"
    >
      {/* Subtle Background Pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#b45309 1.5px, transparent 1.5px), radial-gradient(#b45309 1.5px, #FAF4EA 1.5px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />

      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Reveal>
            <div className="flex justify-center">
              <SectionEyebrow>Hereditary Sanctum Lineage</SectionEyebrow>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--maroon)] tracking-tight">
              Meet <span className="text-gradient-gold">Shreepujak</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-stone-600 text-sm sm:text-base font-normal">
              श्री करवीर निवासिनी अंबाबाई महालक्ष्मी मंदिराचे अधिकृत व वंशपरंपरागत हक्कदार श्रीपूजक
            </p>
          </Reveal>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN PRIEST SPOTLIGHT CARD                                             */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-white border border-amber-200/90 shadow-[0_20px_60px_-15px_rgba(180,83,9,0.15)] overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 p-6 sm:p-10 lg:p-12 items-center">
            
            {/* Left: Priest Photo & Authentic Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border-2 border-amber-300/60 bg-stone-900 group">
                <img
                  src="/assets/gallery/IMG-20261007-WA0045.jpg"
                  alt="Shreepujak Nilesh Vidyadhar Thanekar performing ritual seva"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Bottom Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge: Hereditary Priest */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-amber-400/70 text-[11px] font-bold text-amber-200 backdrop-blur-md shadow-md">
                    <ShieldCheck className="size-3.5 text-emerald-400" />
                    <span>हक्कदार श्रीपूजक</span>
                  </span>
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-3 inset-x-3 text-left text-white space-y-0.5">
                  <div className="text-xs font-serif text-amber-300 font-semibold">
                    Shri Karveer Nivasini Mandir, Kolhapur
                  </div>
                  <div className="text-sm font-bold drop-shadow">
                    Nilesh Vidyadhar Thanekar
                  </div>
                  <div className="text-[11px] text-stone-300">
                    Sanctum Abhishek & Ritual Preparations
                  </div>
                </div>
              </div>

              {/* Floating Gold Seal */}
              <div className="absolute -bottom-4 -right-4 size-20 sm:size-24 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-500 p-0.5 shadow-2xl hidden sm:flex items-center justify-center text-center">
                <div className="size-full rounded-full bg-gradient-to-b from-[#2B0812] to-[#140308] text-amber-200 flex flex-col items-center justify-center p-2 border border-amber-300/40">
                  <Award className="size-4 text-amber-300 mb-0.5" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-200 leading-tight">
                    Authorized<br />Lineage
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Bio & Sacred Devotional Quote */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Header Titles */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[var(--saffron)]">
                  <Sparkles className="size-3.5 text-amber-500" />
                  <span>Hereditary Shreepujak</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
                  Nilesh Vidyadhar Thanekar
                </h3>
                <div className="font-serif text-base sm:text-lg text-[var(--maroon)] font-semibold">
                  श्रीपूजक · श्री करवीर निवासिनी महालक्ष्मी (अंबाबाई) मंदिर, कोल्हापूर
                </div>
              </div>

              {/* Detailed Biography */}
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                With over many years of dedicated service to Shree Mahalaxmi Ambabai,{" "}
                <strong className="text-stone-900 font-semibold">Nilesh Vidyadhar Thanekar</strong>{" "}
                brings profound spiritual wisdom and authentic Vedic knowledge to every ceremony.
                He is hereditary Shreepujak of Mahalaxmi Ambabai Devi. His deep understanding of
                ancient Sanskrit texts and traditional rituals ensures that each puja is performed
                with utmost devotion and precision.
              </p>

              {/* Sacred Personal Quote Card */}
              <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FCF7ED] to-[#F5ECE0] border-l-4 border-amber-500 shadow-sm">
                <Quote className="size-7 text-amber-400/40 absolute top-3 right-3" />
                <p className="font-serif italic text-sm sm:text-base text-stone-800 leading-relaxed relative z-10">
                  &ldquo;Every puja is a sacred connection between the devotee and the divine.
                  I consider myself blessed to be a medium for these divine blessings and ensure
                  that each ritual carries the pure intentions and prayers of our devotees to
                  Mahalaxmi Ambabai Mata.&rdquo;
                </p>
                <div className="mt-3 text-xs sm:text-sm font-serif font-bold text-[var(--maroon)] text-right">
                  — Shreepujak Nilesh Vidyadhar Thanekar
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <a
                  href="#book-puja"
                  onClick={scrollToBooking}
                  className="inline-flex items-center gap-2.5 py-3 px-7 rounded-full bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)] text-stone-950 font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Flame className="size-4.5 text-stone-950" />
                  <span>Book Puja with Shreepujak</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. AUTHORIZED CENTURIES-OLD LINEAGE TRUST CARD (AS REQUESTED)              */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-r from-[#24060E] via-[#1A0309] to-[#24060E] text-white p-6 sm:p-10 border border-amber-400/40 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Radial Light */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, rgba(217,119,6,0.3), transparent 60%), radial-gradient(circle at 80% 50%, rgba(245,158,11,0.2), transparent 60%)",
            }}
          />

          <div className="relative z-10 space-y-6 text-left">
            
            {/* Header with Certified Emblem */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-400/20 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>Authentic & Authorized Main Pujaris</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Generations of Lineage Priests of Shri Karveer Nivasini Kolhapur
                </h4>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-xs font-serif font-bold text-amber-200">
                हक्कदार श्रीपूजक मंडळ (Shree Pujak Mandal)
              </span>
            </div>

            {/* Authoritative Lineage Explanation */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              This is the <strong className="text-amber-300 font-semibold">authentic and authorized main pujaris</strong> from
              many years and decades of hereditary lineage pujaris and their families of{" "}
              <strong>Shri Karveer Nivasini Mahalaxmi Ambabai Temple, Kolhapur</strong>.
              For generations, the Thanekar family and fellow hereditary pujaris have held the sacred constitutional
              and traditional rights to enter the holy Garbhagriha, conduct daily Panchamrut Abhishek, adorn Mata
              with royal ornaments (Alankar), and perform personalized Gotra Sankalpa directly at the feet of the divine Swayambhu idol.
            </p>

            {/* 4 Pillars of Lineage Authenticity */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-white/5 border border-amber-400/20 space-y-2 backdrop-blur-sm">
                <div className="size-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                  <Award className="size-4 text-amber-300" />
                </div>
                <div className="font-serif font-bold text-sm text-white">
                  Authorized Hereditary Rights
                </div>
                <p className="text-xs text-stone-300 leading-normal">
                  Serving the inner sanctum across unbroken family generations with official traditional rights.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-amber-400/20 space-y-2 backdrop-blur-sm">
                <div className="size-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                  <BookOpen className="size-4 text-amber-300" />
                </div>
                <div className="font-serif font-bold text-sm text-white">
                  Vedic Mantra Accuracy
                </div>
                <p className="text-xs text-stone-300 leading-normal">
                  Chanting authentic Vedic Suktams, Shri Sukta and Gotra Sankalpa with strict ritual purity.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-amber-400/20 space-y-2 backdrop-blur-sm">
                <div className="size-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                  <Flame className="size-4 text-amber-300" />
                </div>
                <div className="font-serif font-bold text-sm text-white">
                  Direct Sanctum Seva
                </div>
                <p className="text-xs text-stone-300 leading-normal">
                  All offerings, naivedya, and chadhava presented directly inside the sacred garbhagriha.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-amber-400/20 space-y-2 backdrop-blur-sm">
                <div className="size-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                </div>
                <div className="font-serif font-bold text-sm text-white">
                  100% Genuine Devotee Seva
                </div>
                <p className="text-xs text-stone-300 leading-normal">
                  Devotees receive genuine blessed prasad, kumkum, and authentic WhatsApp booking updates.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
