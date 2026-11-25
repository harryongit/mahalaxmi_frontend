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
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      {/* 1. Immersive Temple Hero */}
      <AboutHeroCanvas />

      {/* 2. Our Sacred Journey */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center space-y-8">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300 inline-block">
            Our Sacred Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-950 leading-tight">
            Bridging Devotion &amp; Divine Grace
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80 font-medium max-w-2xl mx-auto">
            Connecting devotees worldwide to Goddess Shree Mahalaxmi Ambabai.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed max-w-3xl mx-auto text-left bg-white/70 border border-amber-200/80 p-8 sm:p-10 rounded-3xl shadow-sm">
          <p className="font-serif text-lg text-amber-950/90 leading-relaxed italic border-l-4 border-[var(--gold)] pl-4">
            MahalaxmiPuja was born from a vision to bring divine blessing to devotees who can not visit physically, in a virtual format, by using modern technology.
          </p>
          <p>
            We believe that distance should never be a barrier to seeking divine blessings. Through our innovative online platform, we bring the sacred rituals of Shree Mahalaxmi Ambabai directly to your homes, maintaining the authenticity and sanctity of traditional temple worship.
          </p>
          <p>
            Our experienced pandits perform each puja with complete dedication and devotion, ensuring that every ritual follows the ancient Vedic traditions. From simple offerings to elaborate ceremonies, we treat each service with equal reverence and care.
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

      {/* 4. Temple Information */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
            Visitor Information
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Temple Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Address */}
          <div className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between space-y-4">
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <MapPin className="size-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800 block">
                Address
              </span>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Shri Ambabai Temple, Bhavani Mandap, Mahadwar Rd, B Ward, C Ward, Kolhapur, Maharashtra 416012
              </p>
            </div>
            <a
              href="https://www.google.com/maps/place/Shri+Ambabai+Temple,+Kolhapur/@17.6389066,72.7138336,8z/data=!4m22!1m15!4m14!1m6!1m2!1s0x3bc2b8c684c414d3:0x4756a62035babeb2!2sPimple+Gurav,+Pimpri-Chinchwad,+Maharashtra!2m2!1d73.8134424!2d18.5865962!1m6!1m2!1s0x3bc0555a31825e95:0x48d3dac4a165bedf!2sShri+Ambabai+Temple,+Kolhapur,+Bhavani+Mandap,+Mahadwar+Rd,+B+Ward,+C+Ward,+Kolhapur,+Maharashtra+416012!2m2!1d74.2226431!2d16.6948594!3m5!1s0x3bc0555a31825e95:0x48d3dac4a165bedf!8m2!3d16.6948594!4d74.2226431!16zL20vMDZqczNz?entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-500/60"
            >
              <span>Get Directions</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 2: Temple Timings */}
          <div className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between space-y-4">
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Clock className="size-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800 block">
                Temple Timings
              </span>
              <p className="font-serif text-lg font-bold text-stone-900">
                5:00 AM – 10:00 PM
              </p>
              <p className="text-[11px] text-stone-500 font-medium">
                Open Daily for Darshan &amp; Rituals
              </p>
            </div>
            <Link
              href="/darshan-timings"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-500/60"
            >
              <span>View Aarti Timings</span>
              <span>→</span>
            </Link>
          </div>

          {/* Card 3: Presiding Deity */}
          <div className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between space-y-4">
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Sparkles className="size-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800 block">
                Presiding Deity
              </span>
              <p className="font-serif text-lg font-bold text-stone-900">
                Goddess Mahalaxmi
              </p>
              <p className="text-[11px] text-stone-500 font-medium">
                Karveer Nivasini Ambabai (Swayambhu)
              </p>
            </div>
            <Link
              href="/temple-history"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-500/60"
            >
              <span>Explore History</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. How We Serve You */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300 inline-block">
            Seamless Devotee Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            How We Serve You
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Simple steps to receive divine blessings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              number: "01",
              emoji: "🙏",
              title: "Choose Service",
              desc: "Select from our range of authentic temple services and pujas",
            },
            {
              step: "2",
              number: "02",
              emoji: "📅",
              title: "Book Online",
              desc: "Provide your details and preferred date/time for the ceremony",
            },
            {
              step: "3",
              number: "03",
              emoji: "🕉️",
              title: "Puja Performed",
              desc: "Our experienced pandits perform the ritual with your name and gotra",
            },
            {
              step: "4",
              number: "04",
              emoji: "🎁",
              title: "Receive Blessings",
              desc: "Get video recording and blessed prasad delivered to your home",
            },
          ].map((item) => (
            <motion.div
              key={item.step}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="group p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-[#3C0F1A] text-2xl flex items-center justify-center shadow-md border border-[var(--gold)]/30 group-hover:scale-105 transition-transform">
                  <span>{item.emoji}</span>
                </div>
                <span className="font-serif text-3xl font-bold text-amber-900/20 group-hover:text-amber-800/40 transition-colors">
                  {item.number}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block border border-amber-200">
                  Step {item.step}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Mission / Vision / Values — Small, Proper & Refined */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 w-full bg-gradient-to-r from-[#2F0B13] via-[#3C0F1A] to-[#25070E] text-amber-50 border-y border-amber-900/60">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Mission */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-amber-400/20 hover:border-amber-400/50 hover:bg-white/[0.07] transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-amber-400/15 border border-amber-400/30 text-[var(--gold)] flex items-center justify-center shrink-0">
                <Compass className="size-5" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-amber-400">
                Mission
              </h3>
            </div>
            <p className="font-serif text-lg text-amber-100 leading-snug">
              To preserve sacred tradition with grace and openness.
            </p>
          </div>

          {/* Vision */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-amber-400/20 hover:border-amber-400/50 hover:bg-white/[0.07] transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-amber-400/15 border border-amber-400/30 text-[var(--gold)] flex items-center justify-center shrink-0">
                <Eye className="size-5" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-amber-400">
                Vision
              </h3>
            </div>
            <p className="font-serif text-lg text-amber-100 leading-snug">
              A spiritual home for every seeker, of every path.
            </p>
          </div>

          {/* Values */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-amber-400/20 hover:border-amber-400/50 hover:bg-white/[0.07] transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-amber-400/15 border border-amber-400/30 text-[var(--gold)] flex items-center justify-center shrink-0">
                <HeartHandshake className="size-5" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-amber-400">
                Values
              </h3>
            </div>
            <p className="font-serif text-lg text-amber-100 leading-snug">
              Reverence • Service • Compassion • Sanctity
            </p>
          </div>
        </div>
      </section>

      {/* 7. Services & Statistics */}
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

      {/* 9. Visit Contact Action */}
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
