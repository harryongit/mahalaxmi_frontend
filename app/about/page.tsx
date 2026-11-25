"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { AboutHeroCanvas } from "@/src/components/temple/AboutHeroCanvas";
import { IMG } from "@/src/components/temple/images";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Heart,
  Zap,
  Users,
  Compass,
  Eye,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      {/* 1. Immersive Temple Hero */}
      <AboutHeroCanvas />

      {/* 2. About the Temple */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-6">
          ABOUT THE TEMPLE
        </h2>
        <p className="font-serif text-3xl sm:text-5xl leading-tight mb-12 text-amber-950">
          A sanctuary woven <br className="hidden sm:block" /> from stone, fire and song.
        </p>
        <div className="space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl mx-auto text-left">
          <p>
            Shri Mahalaxmi Mandir in Kolhapur is one of the most sacred Shakti Peethas in India, dedicated to Goddess Mahalaxmi (Ambabai). Built originally during the Chalukya period in the 7th century CE, the <Link href="/temple-history" className="text-amber-900 font-bold underline">temple has been expanded over centuries</Link> by various dynasties including the Shilahara, Yadava, and Maratha rulers.
          </p>
          <p>
            It holds immense importance in Hindu tradition, standing as an enduring symbol of spiritual devotion, cultural heritage, and incredible ancient architectural mastery. The temple remains a living, breathing space where centuries-old <Link href="/darshan-timings" className="text-amber-900 font-bold underline">traditions and daily aartis</Link> are performed every single day without interruption.
          </p>
        </div>
      </section>

      {/* 3. Sacred Deity */}
      <section className="py-24 px-4 sm:px-6 w-full border-t border-amber-900/10 bg-amber-50/30">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-4">
              SACRED DEITY
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl text-amber-950 mb-6">
              Goddess Mahalaxmi <br /> (Ambabai)
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              The idol of Mahalaxmi is believed to be self-manifested (Swayambhu). Seated on a stone platform, the image of the four-armed deity is carved in black stone, holding sacred symbols in her hands. She is revered as the mother of the universe, blessing devotees with spiritual liberation and worldly prosperity alike.
            </p>
          </div>
          <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative border-4 border-white">
            <img
              src={IMG.about}
              alt="Goddess Mahalaxmi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Kirnotsav */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-6">
          KIRNOTSAV
        </h2>
        <p className="font-serif text-3xl sm:text-4xl leading-tight mb-8 text-amber-950">
          A rare alignment of <br className="hidden sm:block" /> light and devotion.
        </p>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl mx-auto">
          The annual Kirnotsav (Festival of Sun Rays) is a unique architectural and astronomical phenomenon. Twice a year, in January and November, the setting sun aligns perfectly with the temple's western entrance. The golden rays travel across the mandapam, illuminating the Goddess's feet on the first day, her chest on the second, and finally resting upon her face on the third day.
        </p>
      </section>

      {/* 5. Architecture Grid */}
      <section className="py-24 px-4 sm:px-6 w-full bg-[#1A1412] text-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-500 mb-4">
              ARCHITECTURE
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl text-white">
              A Geometry of Devotion
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 text-center">
            {[
              { id: "01", title: "Gopuram", desc: "The towering, intricately carved entrance gateway." },
              { id: "02", title: "Main Entrance", desc: "Sacred thresholds leading inward to the divine." },
              { id: "03", title: "Mandapam", desc: "The grand assembly hall supported by master-crafted pillars." },
              { id: "04", title: "Sanctum", desc: "Garbhagriha — the innermost sacred chamber." },
              { id: "05", title: "Pillars", desc: "Monolithic columns bearing ancient stories and geometry." },
              { id: "06", title: "Carvings", desc: "Centuries-old bas-reliefs of celestial dancers and deities." }
            ].map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <span className="text-sm font-mono text-amber-500/70 mb-3">{item.id}</span>
                <h4 className="font-serif text-xl text-amber-100 mb-2">{item.title}</h4>
                <div className="w-8 h-[1px] bg-amber-500/30 mb-3" />
                <p className="text-xs text-amber-50/60 max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Temple Information */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="border border-amber-900/10 p-8 sm:p-12 bg-white text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-10">
            TEMPLE INFORMATION
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-900/50 mb-2">Address</div>
              <p className="text-sm font-medium text-stone-800">
                Shri Ambabai Temple, Bhavani Mandap, <br />
                Mahadwar Rd, B Ward, C Ward, <br />
                Kolhapur, Maharashtra 416012
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-900/50 mb-2">Temple Timings</div>
              <p className="text-sm font-medium text-stone-800">
                5:00 AM – 9:30 PM <br />
                (Open Daily)
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-900/50 mb-2">Presiding Deity</div>
              <p className="text-sm font-medium text-stone-800">
                Goddess Mahalaxmi <br />
                (Ambabai)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Mission / Vision / Values — Elevated Sacred Sanctuary Section */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 w-full bg-gradient-to-b from-[#2A060E] via-[#380D14] to-[#1F040A] text-amber-50 border-y border-amber-900/50 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 size-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 size-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--gold)] bg-[var(--gold)]/10 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 inline-block shadow-xs">
              Sacred Guiding Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gradient-gold tracking-tight leading-tight">
              Dharma, Devotion &amp; Divine Vision
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed font-light">
              Centuries of unbroken Vedic heritage guide our pledge to protect sacred rituals, empower pilgrims, and serve seekers across the globe.
            </p>
          </div>

          {/* 3 Elevated Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Mission */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-[#4A101C]/80 via-[#320812]/90 to-[#20050B] p-7 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between group hover:border-[var(--gold)] hover:shadow-[0_0_35px_rgba(212,160,23,0.25)] transition-all duration-300"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-400/40 text-[var(--gold)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Compass className="size-7" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300/80 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Parampara
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-amber-400/90 block mb-1">
                    Our Mission
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-amber-50 leading-snug">
                    Preserving Sacred Tradition
                  </h3>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-amber-500/40 via-amber-300/20 to-transparent" />

                <p className="font-serif text-base text-amber-100/90 leading-relaxed italic">
                  &ldquo;To preserve sacred tradition with grace, transparency, and openness for all seekers.&rdquo;
                </p>

                <ul className="space-y-2.5 text-xs text-amber-100/75 pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
                    <span>Pure Vedic rites performed by hereditary Shreepujaks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
                    <span>Live Gotra Sankalpa video &amp; photo proof delivered to devotees.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
                    <span>Consecrated Mahaprasad securely dispatched worldwide.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-amber-300/60 font-mono">
                <span>Sansthan Seva</span>
                <span className="text-amber-400/90 font-bold">Pillar 01</span>
              </div>
            </motion.div>

            {/* Card 2: Vision */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl border-2 border-[var(--gold)]/50 bg-gradient-to-b from-[#551422]/90 via-[#3B0A16]/90 to-[#26060E] p-7 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between group hover:border-amber-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-all duration-300"
            >
              {/* Highlight Ribbon */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 via-[var(--gold)] to-amber-600 text-stone-950 text-[10px] font-extrabold uppercase tracking-widest px-4 py-0.5 rounded-full shadow-md border border-amber-200">
                Core Sanctuary Vision
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-amber-400/25 via-amber-500/15 to-transparent border border-[var(--gold)] text-amber-300 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Eye className="size-7" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
                    Sarva Seva
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-amber-400 block mb-1">
                    Our Vision
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-amber-50 leading-snug">
                    A Universal Spiritual Home
                  </h3>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-amber-500/40 via-amber-300/20 to-transparent" />

                <p className="font-serif text-base text-amber-100/90 leading-relaxed italic">
                  &ldquo;A spiritual home for every seeker, of every path, transcending geographical limits.&rdquo;
                </p>

                <ul className="space-y-2.5 text-xs text-amber-100/75 pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
                    <span>Connecting millions globally with the chief abode of Ambabai.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
                    <span>Digitally accessible darshan timings, aartis &amp; sacred festal guides.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
                    <span>Empowering genuine faith, peace, and family spiritual well-being.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-amber-300/60 font-mono">
                <span>Sansthan Seva</span>
                <span className="text-amber-400/90 font-bold">Pillar 02</span>
              </div>
            </motion.div>

            {/* Card 3: Values */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-[#4A101C]/80 via-[#320812]/90 to-[#20050B] p-7 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between group hover:border-[var(--gold)] hover:shadow-[0_0_35px_rgba(212,160,23,0.25)] transition-all duration-300"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-rose-400/20 via-amber-500/10 to-transparent border border-rose-400/40 text-amber-300 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <HeartHandshake className="size-7" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300/80 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Chaturvidha
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-amber-400/90 block mb-1">
                    Our Values
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-amber-50 leading-snug">
                    Four Sacred Virtues
                  </h3>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-amber-500/40 via-amber-300/20 to-transparent" />

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-0.5 hover:border-[var(--gold)]/50 transition-colors">
                    <div className="font-serif text-base font-bold text-[var(--gold)]">Reverence</div>
                    <div className="text-[11px] text-amber-100/70">Unwavering devotion (श्रद्धा)</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-0.5 hover:border-[var(--gold)]/50 transition-colors">
                    <div className="font-serif text-base font-bold text-[var(--gold)]">Service</div>
                    <div className="text-[11px] text-amber-100/70">Selfless pilgrim seva (सेवा)</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-0.5 hover:border-[var(--gold)]/50 transition-colors">
                    <div className="font-serif text-base font-bold text-[var(--gold)]">Compassion</div>
                    <div className="text-[11px] text-amber-100/70">Heartfelt warmth (करुणा)</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-0.5 hover:border-[var(--gold)]/50 transition-colors">
                    <div className="font-serif text-base font-bold text-[var(--gold)]">Sanctity</div>
                    <div className="text-[11px] text-amber-100/70">Vedic purity &amp; beauty (सौंदर्य)</div>
                  </div>
                </div>

                <p className="text-xs text-amber-100/75 leading-relaxed pt-1">
                  Every ritual, blessing, and interaction reflects these ancient principles of devotion.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-amber-300/60 font-mono">
                <span>Sansthan Seva</span>
                <span className="text-amber-400/90 font-bold">Pillar 03</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Vedic Shloka Ribbon */}
          <div className="text-center pt-8 border-t border-amber-900/60">
            <p className="font-serif text-base sm:text-lg text-[var(--gold)]/90 tracking-wide font-medium">
              ॥ सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥
            </p>
            <p className="text-[11px] uppercase tracking-widest text-amber-200/50 mt-1">
              Shri Karveer Nivasini Ambabai Mahalaxmi Temple Sansthan
            </p>
          </div>
        </div>
      </section>

      {/* 8. MahalaxmiPuja Story */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-3xl mx-auto w-full text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-6">
          OUR SACRED JOURNEY
        </h2>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-8">
          MahalaxmiPuja was born from a vision to bring authentic temple rituals closer to devotees who cannot physically visit Kolhapur. We understand that devotion knows no geographical boundaries.
        </p>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-10">
          Our platform serves as a digital bridge to the divine, ensuring that every seva, chadhava, and naivedya is offered with exact Vedic precision by the hereditary Shreepujaks of the temple, directly in your name.
        </p>
        <div className="w-16 h-[1px] bg-amber-900/20 mx-auto" />
      </section>

      {/* 9. Services & Statistics */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-20">

        {/* Services List */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-4">
              OUR SERVICES
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl text-amber-950">
              Complete Devotional Offerings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🕉️", title: "Online Puja Booking", desc: "Book personalized pujas performed by hereditary Shreepujak." },
              { icon: "📿", title: "Chadhava / Arpan", desc: "Offer Regular Otee, Saree Otee, directly to Goddess Mahalaxmi." },
              { icon: "🍃", title: "Naivedya / Bhog", desc: "Offer Puranpoli Naivedya and sacred Bhojan in your family name." },
              { icon: "🙏", title: "Annadan & Gou Seva", desc: "Contribute to sacred Annadan and Goushala Gou Seva." }
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm flex gap-4 items-start">
                <div className="text-2xl">{s.icon}</div>
                <div>
                  <h4 className="font-serif font-bold text-amber-950 text-lg mb-1">{s.title}</h4>
                  <p className="text-xs text-stone-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Minimal Variant */}
        <div className="border-t border-amber-900/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-amber-700 w-6 h-6 mb-3" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">Authentic</span>
            <span className="text-xs text-stone-500">Hereditary Shreepujak</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="text-amber-700 w-6 h-6 mb-3" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">Trusted</span>
            <span className="text-xs text-stone-500">50,000+ Devotees</span>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="text-amber-700 w-6 h-6 mb-3" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">Devoted</span>
            <span className="text-xs text-stone-500">Performed with Love</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="text-amber-700 w-6 h-6 mb-3" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">Fast</span>
            <span className="text-xs text-stone-500">Instant Booking</span>
          </div>
        </div>

      </section>

      {/* 10. Visit Contact Action */}
      <section className="py-24 px-4 text-center bg-amber-50">
        <h2 className="font-serif text-3xl sm:text-4xl text-amber-950 mb-6">Experience the Divine</h2>
        <Link
          href="/rituals"
          className="inline-block bg-amber-900 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-amber-950 transition-colors"
        >
          Explore Rituals
        </Link>
      </section>

      <Footer />
    </div>
  );
}
