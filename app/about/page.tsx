"use client";

import { useState, useEffect } from "react";
import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { AboutHeroCanvas } from "@/src/components/temple/AboutHeroCanvas";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Sparkles,
  CalendarCheck,
  Flame,
  Gift,
  Package,
  Users,
  ShieldCheck,
  Video,
  Truck,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const VINTAGE_PHOTOS = [
  {
    src: "/assets/gallery/IMG-20261009-WA0014.jpg",
    title: "Shree Ambabai Mandir Shikhara",
    marathi: "श्री अंबाबाई मंदिर शिखर दर्शन",
    tag: "Temple Architecture",
    caption: "Grand illuminated Hemadpanthi temple spires crowned with golden kalash at night.",
    tilt: "sm:-rotate-1",
  },
  {
    src: "/assets/gallery/IMG-20261007-WA0096.jpg",
    title: "Suvarna Alankar & Mukut",
    marathi: "श्री महालक्ष्मी सुवर्ण अलंकार",
    tag: "Royal Regalia",
    caption: "Sacred gold crown, Kolhapuri saaj necklaces, royal simha crest, and paduka.",
    tilt: "sm:rotate-1.5",
  },
  {
    src: "/assets/gallery/IMG-20261007-WA0097.jpg",
    title: "Ratnajadit Mukut Jal-Abhishek",
    marathi: "रत्नजडित मुकुट अभिषेक",
    tag: "Ritual Seva",
    caption: "Holy water ablution and purification of the gemstone-studded golden crown.",
    tilt: "sm:-rotate-1.5",
  },
  {
    src: "/assets/gallery/IMG-20261007-WA0058.jpg",
    title: "Suvarna Prabhavali Cleansing",
    marathi: "सुवर्ण प्रभावळ स्नान सेवा",
    tag: "Shreepujak Seva",
    caption: "Hereditary priests performing holy bath of the golden Sheshnag arch.",
    tilt: "sm:rotate-1",
  },
  {
    src: "/assets/gallery/IMG-20261010-WA0057.jpg",
    title: "Hemadpanthi Stambha Mandap",
    marathi: "प्राचीन स्तंभ मंडप",
    tag: "Sanctum Architecture",
    caption: "Carved black basalt monolithic stone pillars inside the 7th-century complex.",
    tilt: "sm:-rotate-1",
  },
  {
    src: "/assets/gallery/IMG-20261010-WA0072.jpg",
    title: "Dev-Koshta Stone Sculptures",
    marathi: "मंदिर बाह्य भिंतीवरील देवकोष्ट मूर्ती",
    tag: "Heritage Carvings",
    caption: "Illuminated exterior stone wall niches and historic carvings of deities.",
    tilt: "sm:rotate-1.5",
  },
];

export default function AboutPage() {
  useLenis();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keyboard navigation for image lightbox preview
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % VINTAGE_PHOTOS.length : null));
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev !== null ? (prev - 1 + VINTAGE_PHOTOS.length) % VINTAGE_PHOTOS.length : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      {/* 1. Immersive Temple Hero */}
      <AboutHeroCanvas />

      {/* 2. Our Sacred Journey */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center space-y-8">
        <div className="space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-4 py-1.5 rounded-full inline-block shadow-2xs">
            Our Sacred Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-950 leading-tight">
            Bridging Devotion &amp; Divine Grace
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80 font-medium max-w-2xl mx-auto">
            Connecting devotees worldwide to Goddess Shree Mahalaxmi Ambabai.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed max-w-3xl mx-auto text-left bg-white/80 border border-amber-200/90 p-8 sm:p-10 rounded-3xl shadow-sm">
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

      {/* 3. Temple Information */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-10 border-t border-amber-900/10">
        <div className="text-center space-y-2.5">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-4 py-1.5 rounded-full inline-block shadow-2xs">
            Kolhapur Dham
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Temple Information
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl mx-auto">
            Essential visitor guidelines, darshan timings, and deity heritage of Karveer Nivasini Ambabai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Address */}
          <div className="p-7 rounded-3xl border border-amber-200/90 bg-white/90 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between space-y-4">
            <div className="size-14 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <MapPin className="size-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800 block">
                Temple Address
              </span>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Shri Ambabai Temple, Bhavani Mandap, Mahadwar Rd, B Ward, C Ward, Kolhapur, Maharashtra 416012
              </p>
            </div>
            <a
              href="https://www.google.com/maps/place/Shri+Ambabai+Temple,+Kolhapur/@17.6389066,72.7138336,8z/data=!4m22!1m15!4m14!1m6!1m2!1s0x3bc2b8c684c414d3:0x4756a62035babeb2!2sPimple+Gurav,+Pimpri-Chinchwad,+Maharashtra!2m2!1d73.8134424!2d18.5865962!1m6!1m2!1s0x3bc0555a31825e95:0x48d3dac4a165bedf!2sShri+Ambabai+Temple,+Kolhapur,+Bhavani+Mandap,+Mahadwar+Rd,+B+Ward,+C+Ward,+Kolhapur,+Maharashtra+416012!2m2!1d74.2226431!2d16.6948594!3m5!1s0x3bc0555a31825e95:0x48d3dac4a165bedf!8m2!3d16.6948594!4d74.2226431!16zL20vMDZqczNz?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-500/60"
            >
              <span>Get Directions</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          {/* Card 2: Temple Timings */}
          <div className="p-7 rounded-3xl border border-amber-200/90 bg-white/90 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between space-y-4">
            <div className="size-14 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Clock className="size-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800 block">
                Daily Darshan Timings
              </span>
              <p className="font-serif text-xl font-bold text-stone-900">
                5:00 AM – 10:00 PM
              </p>
              <p className="text-[11px] text-stone-500 font-medium">
                Open Daily for Darshan, Abhishek &amp; Daily Aartis
              </p>
            </div>
            <Link
              href="/darshan-timings"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-500/60"
            >
              <span>View Aarti Timings</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Card 3: Presiding Deity */}
          <div className="p-7 rounded-3xl border border-amber-200/90 bg-white/90 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between space-y-4">
            <div className="size-14 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Sparkles className="size-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800 block">
                Presiding Deity
              </span>
              <p className="font-serif text-xl font-bold text-stone-900">
                Goddess Mahalaxmi
              </p>
              <p className="text-[11px] text-stone-500 font-medium">
                Karveer Nivasini Ambabai (Swayambhu Vigraha)
              </p>
            </div>
            <Link
              href="/temple-history"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-500/60"
            >
              <span>Explore History</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Archival Glimpses of Shree Ambabai (Existing Vintage Photo Mounts Grid) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 w-full border-t border-amber-900/10 bg-[#FAF7F2]/60">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-4 py-1.5 rounded-full inline-block shadow-2xs">
              Sacred Visual Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
              Archival Glimpses of Shree Ambabai
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
              Timeless moments of divinity, ancient stone architecture, and sacred traditions captured across generations.
            </p>
          </div>

          {/* Vintage Photo Mounts Grid with Tape Pins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-2">
            {VINTAGE_PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActiveIndex(i)}
                className={`group cursor-pointer bg-[#FFFDF9] p-3.5 sm:p-4 pb-5 sm:pb-6 rounded-2xl border border-amber-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 relative ${photo.tilt} hover:rotate-0 hover:z-20`}
              >
                {/* Vintage Tape Pin on Top */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-200/60 backdrop-blur-xs border-x border-amber-300/80 -rotate-1 shadow-2xs pointer-events-none z-10" />

                {/* Photo Frame Container */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 shadow-inner">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter sepia-[0.08] contrast-[1.03]"
                  />
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                    <span className="text-[11px] text-white font-medium flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20">
                      <ZoomIn className="size-3.5 text-amber-300" />
                      <span>Click to preview</span>
                    </span>
                    <span className="text-[10px] text-amber-200/90 font-mono">
                      #{i + 1}
                    </span>
                  </div>
                </div>

                {/* Card Details with accurate title, marathi name & caption */}
                <div className="pt-3.5 px-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200/80">
                      {photo.tag}
                    </span>
                    <span className="text-[11px] text-amber-900/60 font-serif">
                      {photo.marathi}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors pt-0.5">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Link to Full Gallery */}
          <div className="text-center pt-2">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 hover:text-amber-700 underline decoration-amber-400 decoration-2 underline-offset-4 transition-colors"
            >
              <span>Explore All Sacred Photos in Temple Gallery</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 5. How We Serve You */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-10 border-t border-amber-900/10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-4 py-1.5 rounded-full inline-block shadow-2xs">
            Seamless Devotee Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            How We Serve You
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Simple steps to receive divine blessings from anywhere in the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              number: "01",
              icon: Sparkles,
              title: "Choose Service",
              desc: "Select from our range of authentic temple services and pujas",
            },
            {
              step: "2",
              number: "02",
              icon: CalendarCheck,
              title: "Book Online",
              desc: "Provide your details and preferred date/time for the ceremony",
            },
            {
              step: "3",
              number: "03",
              icon: Flame,
              title: "Puja Performed",
              desc: "Our experienced pandits perform the ritual with your name and gotra",
            },
            {
              step: "4",
              number: "04",
              icon: Gift,
              title: "Receive Blessings",
              desc: "Get video recording and blessed prasad delivered to your home",
            },
          ].map((item) => (
            <motion.div
              key={item.step}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="group p-6 rounded-3xl border border-amber-200/90 bg-white/90 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center shadow-md border border-[var(--gold)]/30 group-hover:scale-105 transition-transform">
                  <item.icon className="size-6" />
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

      {/* 6. Our Services */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-10 border-t border-amber-900/10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-4 py-1.5 rounded-full inline-block shadow-2xs">
            Sacred Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Our Services
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Complete devotional pujas, sevas, and offerings performed with Vedic authenticity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Flame,
              title: "Online Puja Booking",
              desc: "Personalized Vedic rituals performed by verified hereditary Shreepujaks with sankalpa.",
              href: "/pujas",
            },
            {
              icon: Sparkles,
              title: "Chadhava / Arpan",
              desc: "Offer Regular Otee, Saree Otee, and sacred vastra directly to Goddess Ambabai.",
              href: "/chadhava",
            },
            {
              icon: Package,
              title: "Naivedya / Bhog",
              desc: "Offer traditional Puranpoli Naivedya and sacred temple Mahaprasad in your family name.",
              href: "/bhog",
            },
            {
              icon: Users,
              title: "Annadan & Gou Seva",
              desc: "Sponsor sacred Annadan for pilgrims and participate in blessed Goushala Gou Seva.",
              href: "/donation",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-3xl bg-white/90 border border-amber-200/90 hover:border-amber-400 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30 shrink-0">
                <service.icon className="size-6" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-serif font-bold text-amber-950 text-lg">
                  {service.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {service.desc}
                </p>
              </div>
              <Link
                href={service.href}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-500/60 pt-1"
              >
                <span>Learn More</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Why Choose MahalaxmiPuja? */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-10 border-t border-amber-900/10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-4 py-1.5 rounded-full inline-block shadow-2xs">
            Devotee Reassurance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Why Choose MahalaxmiPuja?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-2xl mx-auto">
            We combine ancient traditions with modern convenience to deliver authentic spiritual experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Authentic Rituals",
              desc: "Traditional pujas performed by verified and experienced pandits following ancient Vedic traditions.",
            },
            {
              icon: Video,
              title: "Video Recording",
              desc: "Watch your personalized puja ceremony in high definition video sent directly to your phone.",
            },
            {
              icon: Gift,
              title: "Blessed Prasad",
              desc: "Receive blessed prasad and sacred items from the temple delivered to your doorstep.",
            },
            {
              icon: Truck,
              title: "Pan-India Delivery",
              desc: "We deliver blessed prasad and puja materials across India with proper care and reverence.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-3xl border border-amber-200/90 bg-white/90 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center space-y-3.5"
            >
              <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
                <feature.icon className="size-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {feature.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. Experience the Divine CTA */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 w-full bg-[#FAF5EC] border-t border-amber-900/10">
        <div className="max-w-4xl mx-auto text-center space-y-6 bg-white/80 border border-amber-300/80 p-8 sm:p-14 rounded-3xl shadow-sm">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-4 py-1.5 rounded-full inline-block shadow-2xs">
            Receive Ambabai Blessings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-950">
            Experience the Divine Presence
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto leading-relaxed">
            Wherever you are in the world, seek the eternal blessings of Goddess Shree Mahalaxmi Ambabai. Book your sankalpa puja today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/pujas"
              className="w-full sm:w-auto bg-[#3C0F1A] text-amber-100 hover:text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#2A0A12] transition-colors shadow-md border border-amber-500/30 flex items-center justify-center gap-2"
            >
              <span>Explore Sacred Pujas</span>
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="mailto:contact@ambabaimahalaxmi.com"
              className="w-full sm:w-auto bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold transition-colors border border-amber-300 flex items-center justify-center gap-2"
            >
              <span>Contact Temple Sewa</span>
            </a>
          </div>
        </div>
      </section>

      {/* Modern Lightbox Preview for Full View */}
      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between items-center p-3 sm:p-6 transition-all select-none"
        >
          {/* Top Control Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between gap-4 z-20"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-amber-300 bg-amber-950/70 border border-amber-500/30 px-3 py-1 rounded-full shadow-inner">
                {activeIndex + 1} / {VINTAGE_PHOTOS.length}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-300 hidden sm:inline-block bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {VINTAGE_PHOTOS[activeIndex].tag}
              </span>
            </div>

            <button
              onClick={() => setActiveIndex(null)}
              className="size-10 sm:size-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
              title="Close (Esc)"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Central Image & Left/Right Arrows */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-2 sm:my-3 min-h-0"
          >
            {/* Prev Button */}
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev !== null ? (prev - 1 + VINTAGE_PHOTOS.length) % VINTAGE_PHOTOS.length : null
                )
              }
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-black/60 hover:bg-amber-600 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer hover:scale-110 active:scale-95 backdrop-blur-sm shadow-2xl z-20"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft className="size-5 sm:size-6" />
            </button>

            {/* Main High-Res Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-full flex items-center justify-center p-1"
            >
              <img
                src={VINTAGE_PHOTOS[activeIndex].src}
                alt={VINTAGE_PHOTOS[activeIndex].title}
                className="max-h-[66vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/15 ring-1 ring-amber-500/20"
              />
            </motion.div>

            {/* Next Button */}
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev !== null ? (prev + 1) % VINTAGE_PHOTOS.length : null
                )
              }
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-black/60 hover:bg-amber-600 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer hover:scale-110 active:scale-95 backdrop-blur-sm shadow-2xl z-20"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="size-5 sm:size-6" />
            </button>
          </div>

          {/* Bottom Information Card & Dots */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-stone-900/90 border border-amber-500/25 backdrop-blur-md rounded-2xl px-5 sm:px-7 py-3 sm:py-3.5 text-center space-y-1.5 shadow-2xl z-20"
          >
            <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-0.5">
              <h3 className="text-base sm:text-lg font-serif font-bold text-amber-100">
                {VINTAGE_PHOTOS[activeIndex].title}
              </h3>
              <span className="text-xs sm:text-sm text-amber-400 font-medium font-serif">
                ({VINTAGE_PHOTOS[activeIndex].marathi})
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              {VINTAGE_PHOTOS[activeIndex].caption}
            </p>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {VINTAGE_PHOTOS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    dotIdx === activeIndex
                      ? "w-6 bg-amber-400"
                      : "w-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                  title={`View photo ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
