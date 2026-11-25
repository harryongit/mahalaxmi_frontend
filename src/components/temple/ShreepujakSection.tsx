"use client";

import { motion } from "framer-motion";
import {
  Flame,
  ShieldCheck,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Quote,
  ArrowRight,
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
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-[#FCF8F2] via-[#F8F1E5] to-[#FCF8F2] text-stone-900 border-t border-amber-200/80"
    >
      {/* Subtle Devotional Background Pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#b45309 1.5px, transparent 1.5px), radial-gradient(#b45309 1.5px, #F8F1E5 1.5px)",
          backgroundSize: "36px 36px",
          backgroundPosition: "0 0, 18px 18px",
        }}
      />

      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12 sm:space-y-16">

        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
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
            <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-900 font-serif text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              श्री करवीर निवासिनी अंबाबाई महालक्ष्मी मंदिराचे अधिकृत व वंशपरंपरागत हक्कदार श्रीपूजक
            </div>
          </Reveal>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN PRIEST SPOTLIGHT CARD                                             */}
        {/* ========================================================================= */}
        <Reveal delay={0.25}>
          <div className="relative rounded-3xl bg-gradient-to-b from-white via-[#FCFAF5] to-[#FAF5EC] border border-amber-200/90 shadow-[0_20px_60px_-15px_rgba(180,83,9,0.14)] overflow-hidden">
            {/* Top Radiant Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600" />

            <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 p-6 sm:p-10 lg:p-12 items-center">

              {/* Left: Priest Photo & Authentic Badge */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl ring-1 ring-amber-400/40 border-4 border-white bg-stone-900 group">
                  <img
                    src="/assets/nilesh.jpeg"
                    alt="Shreepujak Nilesh Vidyadhar Thanekar performing ritual seva"
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/gallery/IMG-20261007-WA0045.jpg";
                    }}
                  />

                  {/* Bottom Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Badge: Hereditary Priest */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-amber-400/70 text-[11px] font-bold text-amber-200 backdrop-blur-md shadow-md">
                      <ShieldCheck className="size-3.5 text-emerald-400" />
                      <span>हक्कदार श्रीपूजक</span>
                    </span>
                  </div>

                  {/* Bottom Photo Caption */}
                  <div className="absolute bottom-4 inset-x-4 text-left text-white space-y-1">
                    <div className="text-xs font-serif text-amber-300 font-semibold tracking-wide">
                      Shri Karveer Nivasini Mandir, Kolhapur
                    </div>
                    <div className="text-base font-bold drop-shadow-md">
                      Nilesh Vidyadhar Thanekar
                    </div>
                    <div className="text-xs text-stone-300">
                      Sanctum Abhishek &amp; Ritual Preparations
                    </div>
                  </div>
                </div>

                {/* Floating Gold Seal */}
                <div className="absolute -bottom-5 -right-5 size-22 sm:size-24 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 p-[2px] shadow-2xl hidden sm:flex items-center justify-center text-center">
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
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs uppercase font-bold tracking-widest text-amber-900">
                    <Sparkles className="size-3.5 text-amber-600" />
                    <span>Hereditary Shreepujak</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
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
                <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#FFF9EE] via-[#FDF3DE] to-[#FBF0D5] border-l-4 border-amber-500 border-y border-r border-amber-200/70 shadow-sm">
                  <Quote className="size-8 text-amber-400/30 absolute top-4 right-4 pointer-events-none" />
                  <p className="font-serif italic text-sm sm:text-base text-stone-800 leading-relaxed relative z-10">
                    &ldquo;Every puja is a sacred connection between the devotee and the divine.
                    I consider myself blessed to be a medium for these divine blessings and ensure
                    that each ritual carries the pure intentions and prayers of our devotees to
                    Mahalaxmi Ambabai Mata.&rdquo;
                  </p>
                  <div className="mt-3.5 text-xs sm:text-sm font-serif font-bold text-[var(--maroon)] text-right">
                    — Shreepujak Nilesh Vidyadhar Thanekar
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <a
                    href="#book-puja"
                    onClick={scrollToBooking}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--gold)] via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Flame className="size-4 text-stone-950" />
                    <span>Book Personalized Puja with Shreepujak</span>
                    <ArrowRight className="size-4 text-stone-950" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* 3. AUTHORIZED CENTURIES-OLD LINEAGE TRUST CARD                            */}
        {/* ========================================================================= */}
        <Reveal delay={0.3}>
          <div className="relative rounded-3xl bg-gradient-to-br from-[#260710] via-[#160308] to-[#260710] text-white p-7 sm:p-10 lg:p-12 border border-amber-400/40 shadow-2xl overflow-hidden">

            {/* Ambient Lighting Orbs */}
            <div
              aria-hidden
              className="absolute -top-20 -left-20 size-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -right-20 size-72 rounded-full bg-rose-500/10 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 space-y-7 text-left">

              {/* Header with Certified Emblem */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-400/20 pb-6">
                <div className="space-y-1.5 max-w-xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
                    <ShieldCheck className="size-4 text-emerald-400" />
                    <span>Authentic &amp; Authorized Main Pujaris</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                    Generations of Lineage Priests of Shri Karveer Nivasini Kolhapur
                  </h3>
                </div>

                <span className="px-4 py-2 rounded-full bg-amber-400/15 border border-amber-400/40 text-xs font-serif font-bold text-amber-200 shadow-inner">
                  हक्कदार श्रीपूजक मंडळ (Shree Pujak Mandal)
                </span>
              </div>

              {/* Authoritative Lineage Explanation */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-5xl">
                This is the <strong className="text-amber-300 font-semibold">authentic and authorized main pujaris</strong> from
                many years and decades of hereditary lineage pujaris and their families of{" "}
                <strong className="text-white">Shri Karveer Nivasini Mahalaxmi Ambabai Temple, Kolhapur</strong>.
                For generations, the Thanekar family and fellow hereditary pujaris have held the sacred constitutional
                and traditional rights to enter the holy Garbhagriha, conduct daily Panchamrut Abhishek, adorn Mata
                with royal ornaments (Alankar), and perform personalized Gotra Sankalpa directly at the feet of the divine Swayambhu idol.
              </p>

              {/* 4 Pillars of Lineage Authenticity */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">

                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-amber-400/25 hover:border-amber-400/60 transition-all duration-300 space-y-3 group backdrop-blur-sm hover:-translate-y-1 shadow-sm">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform shadow-inner">
                    <Award className="size-5 text-amber-300" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-white group-hover:text-amber-200 transition-colors">
                    Authorized Hereditary Rights
                  </h4>
                  <p className="text-xs text-stone-300/90 leading-relaxed font-normal">
                    Serving the inner sanctum across unbroken family generations with official traditional rights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-amber-400/25 hover:border-amber-400/60 transition-all duration-300 space-y-3 group backdrop-blur-sm hover:-translate-y-1 shadow-sm">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform shadow-inner">
                    <BookOpen className="size-5 text-amber-300" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-white group-hover:text-amber-200 transition-colors">
                    Vedic Mantra Accuracy
                  </h4>
                  <p className="text-xs text-stone-300/90 leading-relaxed font-normal">
                    Chanting authentic Vedic Suktams, Shri Sukta and Gotra Sankalpa with strict ritual purity.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-amber-400/25 hover:border-amber-400/60 transition-all duration-300 space-y-3 group backdrop-blur-sm hover:-translate-y-1 shadow-sm">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform shadow-inner">
                    <Flame className="size-5 text-amber-300" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-white group-hover:text-amber-200 transition-colors">
                    Direct Sanctum Seva
                  </h4>
                  <p className="text-xs text-stone-300/90 leading-relaxed font-normal">
                    All offerings, naivedya, and chadhava presented directly inside the sacred garbhagriha.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-amber-400/25 hover:border-amber-400/60 transition-all duration-300 space-y-3 group backdrop-blur-sm hover:-translate-y-1 shadow-sm">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/30 text-emerald-300 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform shadow-inner">
                    <CheckCircle2 className="size-5 text-emerald-400" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-white group-hover:text-emerald-200 transition-colors">
                    100% Genuine Devotee Seva
                  </h4>
                  <p className="text-xs text-stone-300/90 leading-relaxed font-normal">
                    Devotees receive genuine blessed prasad, kumkum, and authentic WhatsApp booking updates.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
