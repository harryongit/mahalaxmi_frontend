"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { UtsavBanner } from "@/src/components/temple/UtsavBanner";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  Calendar,
  Clock,
  Sun,
  Star,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";

const festivalList = [
  {
    id: "f1",
    name: "Kirnotsav (Sun Rays Festival)",
    tag: "Natural Phenomenon",
    date: "Jan 31 – Feb 02 & Nov 09 – Nov 11",
    deity: "Goddess Ambabai Mahalaxmi",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800",
    description:
      "Kirnotsav (Festival of Sun Rays) is a rare natural miracle observed at Kolhapur Mahalaxmi Mandir. As the setting sun enters the temple door, its golden rays fall directly on the feet, waist, and face of Goddess Ambabai.",
    highlights: ["Day 1: Sun rays touch Goddess feet", "Day 2: Sun rays illuminate waist", "Day 3: Rays fall directly on divine face"],
  },
  {
    id: "f2",
    name: "Sharadiya Navratri Utsav",
    tag: "9 Divine Nights",
    date: "Sep 22 – Oct 02, 2026",
    deity: "Goddess Ambabai Mahalaxmi",
    image: "https://images.unsplash.com/photo-1545232979-fbf34fe37b38?q=80&w=800",
    description: "Nine sacred nights honoring Goddess Mahalaxmi in Her 9 auspicious Alankar forms. Millions of pilgrims gather for daily Lalita Panchami Gaja-Shringar and Maha Aarti.",
    highlights: ["Ghatasthapana Commencement", "Lalita Panchami Elephant Procession", "Mahashtami & Khandi Navami Havan"],
  },
  {
    id: "f3",
    name: "Rathotsav (Chariot Procession)",
    tag: "Annual Yatra",
    date: "Chaitra Purnima (April)",
    deity: "Goddess Ambabai Mahalaxmi",
    image: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=800",
    description: "The grand golden chariot carrying Goddess Ambabai is pulled by thousands of enthusiastic devotees through the historic paved streets of Kolhapur.",
    highlights: ["Golden Chariot Decoration", "Traditional Tutari & Nagada Music", "Midnight Maha Deeparadhana"],
  },
  {
    id: "f4",
    name: "Karthikai Deepotsav",
    tag: "108,000 Diya Festival",
    date: "Nov 24, 2026",
    deity: "Goddess Ambabai Mahalaxmi",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    description: "The entire temple courtyard and Hemadpanthi stone pillars are illuminated with over 108,000 clay oil lamps, turning the mandir into a golden sea of light.",
    highlights: ["108,000 Earthen Lamps Lighting", "Special Sahasranama Archana", "Grand Aarti at Twilight"],
  },
];

export default function FestivalsPage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      {/* Proper Classic PageHero Header Banner */}
      <PageHero
        breadcrumb="Festivals & Celebrations"
        badge="Kirnotsav & Navratri 2026"
        title="Grand Utsavs &"
        titleGold="Festivals"
        description="Experience Kirnotsav sun-ray miracles, Navratri Lalita Panchami, and annual Rathotsav chariot processions at Ambabai Temple."
      />

      <main className="flex-1 py-12 px-4 sm:px-6 space-y-16 max-w-6xl mx-auto w-full">
        
        {/* Banner Announcement Component */}
        <UtsavBanner />

        {/* Featured Festivals Cards Section */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Sacred Annual Celebrations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Major Temple Utsavs
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              Join thousands of devotees in honoring Goddess Ambabai during sacred festive periods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {festivalList.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                className="rounded-3xl border-2 border-amber-200/90 bg-white overflow-hidden shadow-lg hover:border-amber-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--gold)] text-stone-950 shadow-md">
                      {item.tag}
                    </span>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                      <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                        <Calendar className="size-3.5 text-amber-400" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                        Key Festival Highlights:
                      </span>
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                          <Sparkles className="size-3.5 text-amber-800 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action CTA */}
                <div className="p-6 pt-0">
                  <Link
                    href="/checkout?puja=s1"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Flame className="size-4 text-[var(--gold)]" />
                    <span>Book Festival Special Puja</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Festival Schedule Table Card */}
        <section className="rounded-3xl border-2 border-[var(--gold)]/60 bg-gradient-to-r from-[#4A101C] via-[#3C0F1A] to-[#25070E] text-white p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="border-b border-amber-200/20 pb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold)]">
              2026 Devotional Calendar
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gradient-gold mt-1">
              Upcoming Festival Timings & Rituals
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { title: "Ghatasthapana (Navratri Day 1)", date: "Sep 22, 2026", time: "08:30 AM", note: "Kalash Sthapana & Special Kumkumarchan" },
              { title: "Lalita Panchami Gaja-Shringar", date: "Sep 26, 2026", time: "06:00 AM", note: "Elephant Procession & Golden Saree Drape" },
              { title: "Mahashtami & Khandi Navami", date: "Sep 29 – Sep 30", time: "11:00 AM", note: "Navachandi Yajna Havan & Maha Bhog" },
              { title: "Dasara Vijayadashami Yatra", date: "Oct 02, 2026", time: "05:00 PM", note: "Simbhabali Yatra & Victory Aarti" },
              { title: "Kirnotsav Sun-Ray Miracle", date: "Nov 09 – Nov 11", time: "05:15 PM", note: "Setting Sun Rays illuminate Goddess Face" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-[var(--gold)]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-serif text-base font-bold text-amber-200">{item.title}</h4>
                  <p className="text-amber-100/80 mt-0.5">{item.note}</p>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0 font-bold text-[var(--gold)]">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
