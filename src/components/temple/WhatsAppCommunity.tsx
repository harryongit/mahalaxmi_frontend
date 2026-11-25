"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "./effects";

const COMMUNITY_URL = "https://chat.whatsapp.com/FYhRGAKRuLW8lxqkAY9Qb6";

export function WhatsAppCommunity() {
  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      <div className="container-temple max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2A0909] via-[#1A0505] to-[#2A0909] border border-amber-500/30 shadow-xl text-white px-6 py-8 sm:px-10 sm:py-10 text-center">
            
            {/* Subtle decorative glow */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Join <span className="text-gradient-gold">Mahalaxmi Puja</span>
              </h3>

              <p className="mt-2.5 text-stone-200/90 text-sm sm:text-base leading-relaxed">
                Get daily blessings, puja updates &amp; spiritual guidance
              </p>

              <div className="mt-6">
                <a
                  href={COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <FaWhatsapp className="size-5" />
                  <span>Join WhatsApp Community</span>
                </a>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
