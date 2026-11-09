"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  Flame,
  ArrowRight,
} from "lucide-react";
import { SectionEyebrow, Reveal } from "./effects";

const TRUST_PILLARS = [
  {
    id: "lineage",
    badge: "VERIFIED",
    badgeColor: "bg-emerald-500/10 text-emerald-800 border-emerald-500/30",
    icon: Award,
    iconBg: "from-amber-400 to-amber-500 text-stone-950",
    stat: "54th",
    statLabel: "Generation",
    title: "54th Generation Lineage",
    description:
      "Hereditary Shreepujak family serving since 1470 AD - over 1000 years of authentic tradition.",
    footerTag: "Family heritage documented",
  },
  {
    id: "local",
    badge: "LOCAL",
    badgeColor: "bg-amber-500/10 text-amber-800 border-amber-500/30",
    icon: MapPin,
    iconBg: "from-rose-500 to-amber-500 text-white",
    stat: "100%",
    statLabel: "Kolhapur Native",
    title: "Born in Kolhapur",
    description:
      "Local resident with deep knowledge of authentic Mahalaxmi Ambabai traditions and customs.",
    footerTag: "Visit us in Kolhapur anytime",
  },
  {
    id: "expert",
    badge: "EXPERT",
    badgeColor: "bg-rose-500/10 text-rose-800 border-rose-500/30",
    icon: ShieldCheck,
    iconBg: "from-amber-500 to-rose-600 text-white",
    stat: "Direct",
    statLabel: "Sanctum Seva",
    title: "No third party involved",
    description:
      "We guarantee the quality, sanctity, and integrity of your rituals—upholding the highest traditional standards.",
    footerTag: "Authentic Experience",
  },
];

export function WhyTrustUs() {
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
      id="why-trust-us"
      className="relative py-20 sm:py-28 overflow-hidden bg-[#FAF6EE] text-stone-900 border-t border-amber-200/80"
    >
      {/* Decorative Subtle Background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#881337 1.5px, transparent 1.5px), radial-gradient(#881337 1.5px, #FAF6EE 1.5px)",
          backgroundSize: "36px 36px",
          backgroundPosition: "0 0, 18px 18px",
        }}
      />

      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Reveal>
            <div className="flex justify-center">
              <SectionEyebrow>Devotee Trust & Sanctity</SectionEyebrow>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--maroon)] tracking-tight">
              Why Devotees <span className="text-gradient-gold">Trust Us</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed">
              Genuine hereditary priest service with proven authenticity and thousands of satisfied devotees
            </p>
          </Reveal>
        </div>

        {/* ========================================================================= */}
        {/* 2. THREE PILLARS OF DEVOTEE TRUST                                         */}
        {/* ========================================================================= */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative rounded-3xl bg-white p-7 sm:p-8 border border-amber-200/90 shadow-[0_15px_40px_-15px_rgba(180,83,9,0.1)] hover:shadow-[0_25px_60px_-15px_rgba(180,83,9,0.22)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Top Badge & Metric Row */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full border text-[11px] font-bold tracking-wider uppercase ${pillar.badgeColor}`}
                    >
                      {pillar.badge}
                    </span>

                    <div className="text-right">
                      <div className="font-serif font-bold text-xl sm:text-2xl text-[var(--maroon)] leading-none">
                        {pillar.stat}
                      </div>
                      <div className="text-[10px] text-stone-500 font-medium">
                        {pillar.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Icon Avatar */}
                  <div
                    className={`size-14 rounded-2xl bg-gradient-to-tr ${pillar.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="size-7" />
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[var(--maroon)] transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Footer Micro-Tag */}
                <div className="pt-6 mt-6 border-t border-amber-100 flex items-center gap-2 text-xs font-semibold text-amber-900/90">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>{pillar.footerTag}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. REASSURANCE ACTION BAR                                                 */}
        {/* ========================================================================= */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-300/60 flex flex-wrap items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1 max-w-xl">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[var(--maroon)]">
              Experience Authentic Gotra Sankalpa & Sanctum Seva
            </h4>
            <p className="text-stone-700 text-xs sm:text-sm">
              Conducted strictly as per Vedic scriptures by the hereditary Thanekar family of Shree Ambabai Mandir.
            </p>
          </div>

          <a
            href="#book-puja"
            onClick={scrollToBooking}
            className="w-full sm:w-auto py-3 px-8 rounded-full bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)] text-stone-950 font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Flame className="size-4 text-stone-950" />
            <span>Book Genuine Seva Online</span>
            <ArrowRight className="size-4 text-stone-950" />
          </a>
        </div>

      </div>
    </section>
  );
}
