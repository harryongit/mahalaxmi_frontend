"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { Sparkles, Bell, ArrowRight, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { Reveal } from "./effects";

const COMMUNITY_URL = "https://chat.whatsapp.com/FYhRGAKRuLW8lxqkAY9Qb6";

export function WhatsAppCommunity() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#2D0B0B] via-[#1A0606] to-[#0E0303] border border-amber-500/30 shadow-[0_30px_70px_-20px_rgba(80,20,10,0.6)] text-white p-7 sm:p-10 md:p-14">
            
            {/* Ambient Background Glows */}
            <div
              aria-hidden
              className="absolute -top-24 -right-24 size-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 size-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"
            />
            
            {/* Subtle Mandala Texture Overlay */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#F59E0B 1.5px, transparent 1.5px), radial-gradient(#10B981 1.5px, transparent 1.5px)",
                backgroundSize: "32px 32px",
                backgroundPosition: "0 0, 16px 16px",
              }}
            />

            <div className="relative z-10 grid lg:grid-cols-[1.25fr_0.95fr] gap-8 md:gap-12 items-center">
              
              {/* Left Column: Heading, Perks, Button */}
              <div>
                {/* Live Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                  </span>
                  <span>Official Devotee Community</span>
                </div>

                {/* Main Heading */}
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 leading-[1.1] tracking-tight">
                  Join <span className="text-gradient-gold">Mahalaxmi Puja</span>
                </h2>

                {/* Subtitle */}
                <p className="mt-3.5 text-stone-200/90 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                  Get daily blessings, puja updates &amp; spiritual guidance delivered directly to your WhatsApp.
                </p>

                {/* Community Highlights Pills */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {[
                    "Daily Morning Darshan",
                    "Auspicious Tithi & Muhurat",
                    "Festival Puja Alerts",
                    "Live Sankalpa Updates",
                  ].map((perk) => (
                    <div
                      key={perk}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-amber-200/90 shadow-2xs"
                    >
                      <Sparkles className="size-3 text-amber-400" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Action Button */}
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                    href={COMMUNITY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                  >
                    <FaWhatsapp className="size-5.5 text-white group-hover:rotate-12 transition-transform duration-300" />
                    <span>Join WhatsApp Community</span>
                    <ArrowRight className="size-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <div className="flex items-center gap-2 text-xs text-stone-300">
                    <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
                    <span>Free to join • No spam • Verified group</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Card Preview */}
              <div className="relative">
                <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-white/10 via-white/5 to-white/0 border border-white/15 backdrop-blur-md shadow-2xl relative overflow-hidden">
                  
                  {/* Header of Preview Card */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="size-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
                      <img
                        src="/assets/devi.png"
                        alt="Mahalaxmi Devi"
                        className="size-full rounded-full object-cover"
                        onError={(e) => {
                          // Fallback to icon if asset not loaded
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif text-lg font-bold text-white leading-none">
                          Shri Ambabai Parivar
                        </h4>
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-xs text-emerald-300 mt-1 font-medium">
                        Official Broadcast &bull; 5,000+ Devotees
                      </p>
                    </div>
                  </div>

                  {/* Mock Message 1 */}
                  <div className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-stone-200 leading-relaxed">
                      <div className="flex items-center justify-between text-[11px] text-amber-300 font-semibold mb-1">
                        <span>Today&apos;s Mangal Aarti Darshan</span>
                        <span className="text-stone-400 font-normal">06:00 AM</span>
                      </div>
                      <p className="text-stone-300 text-xs">
                        &quot;May Goddess Mahalaxmi shower prosperity, health, and peace upon you and your family today.&quot;
                      </p>
                    </div>

                    {/* Mock Message 2 */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-100 leading-relaxed">
                      <div className="flex items-center justify-between text-[11px] text-emerald-300 font-semibold mb-1">
                        <span>Next Auspicious Puja Muhurat</span>
                        <span className="text-emerald-400/80 font-normal">Instant Alert</span>
                      </div>
                      <p className="text-emerald-200/90 text-xs">
                        Friday Special Kumkumarchana &amp; Mahanaivedya booking open for this week.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Devotee Avatars */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <Heart className="size-3.5 text-rose-400 fill-rose-400" />
                      <span>Direct from Kolhapur Sanctum</span>
                    </div>
                    <span className="text-[11px] text-amber-300/80 font-medium">Active Community</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
