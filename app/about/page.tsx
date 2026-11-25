"use client";

import { useState, useEffect, useRef } from "react";
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
  Video,
  Gift,
  Truck,
  Flame,
  CalendarCheck,
  Package,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Film,
} from "lucide-react";
import Link from "next/link";

const FILM_PHOTOS = [
  {
    src: "/assets/gallery/IMG-20261009-WA0014.jpg",
    title: "Shree Ambabai Mandir Shikhara",
    marathi: "श्री अंबाबाई मंदिर शिखर दर्शन",
    tag: "Temple Architecture",
    code: "FRAME 01",
    caption: "Grand illuminated Hemadpanthi temple spires crowned with golden kalash at night.",
  },
  {
    src: "/assets/gallery/IMG-20261007-WA0096.jpg",
    title: "Suvarna Alankar & Mukut",
    marathi: "श्री महालक्ष्मी सुवर्ण अलंकार",
    tag: "Royal Regalia",
    code: "FRAME 02",
    caption: "Sacred gold crown, Kolhapuri saaj necklaces, royal simha crest, and paduka.",
  },
  {
    src: "/assets/gallery/IMG-20261007-WA0097.jpg",
    title: "Ratnajadit Mukut Jal-Abhishek",
    marathi: "रत्नजडित मुकुट अभिषेक",
    tag: "Ritual Seva",
    code: "FRAME 03",
    caption: "Holy water ablution and purification of the gemstone-studded golden crown.",
  },
  {
    src: "/assets/gallery/IMG-20261007-WA0058.jpg",
    title: "Suvarna Prabhavali Cleansing",
    marathi: "सुवर्ण प्रभावळ स्नान सेवा",
    tag: "Shreepujak Seva",
    code: "FRAME 04",
    caption: "Hereditary priests performing holy bath of the golden Sheshnag arch.",
  },
  {
    src: "/assets/gallery/IMG-20261010-WA0057.jpg",
    title: "Hemadpanthi Stambha Mandap",
    marathi: "प्राचीन स्तंभ मंडप",
    tag: "Sanctum Architecture",
    code: "FRAME 05",
    caption: "Carved black basalt monolithic stone pillars inside the 7th-century complex.",
  },
  {
    src: "/assets/gallery/IMG-20261010-WA0072.jpg",
    title: "Dev-Koshta Stone Sculptures",
    marathi: "मंदिर बाह्य भिंतीवरील देवकोष्ट मूर्ती",
    tag: "Heritage Carvings",
    code: "FRAME 06",
    caption: "Illuminated exterior stone wall niches and historic carvings of deities.",
  },
  {
    src: "/assets/gallery/IMG-20261007-WA0047.jpg",
    title: "Silver Utsav Murti & Simhasan",
    marathi: "रौप्य सिंहासन व उत्सव मूर्ती",
    tag: "Silver Regalia",
    code: "FRAME 07",
    caption: "Historic silver deities, charan paduka, and ritual aarti deepams.",
  },
  {
    src: "/assets/gallery/IMG-20261007-WA0070.jpg",
    title: "Royal Suvarna Surya-Bimba",
    marathi: "श्री अंबाबाई सुवर्ण सूर्य-बिंब",
    tag: "Procession Insignia",
    code: "FRAME 08",
    caption: "Sacred golden sun insignia inscribed with 'ॐ आदिशक्ती करवीर निवासिनी जगदंबा'.",
  },
];

// Continuous track for seamless 35mm film loop
const REEL_TRACK = [...FILM_PHOTOS, ...FILM_PHOTOS];

export default function AboutPage() {
  useLenis();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const filmTrackRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for image lightbox preview
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % FILM_PHOTOS.length : null));
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev !== null ? (prev - 1 + FILM_PHOTOS.length) % FILM_PHOTOS.length : null
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

      {/* 3. Archival Glimpses / 35mm Vintage Film Reel */}
      <section className="py-20 sm:py-28 w-full border-t border-amber-900/10 bg-[#0E0C0B] text-stone-100 overflow-hidden relative">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-300 bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-500/40 inline-flex items-center gap-1.5 shadow-md">
              <Film className="size-3.5 text-amber-400" />
              <span>35mm Sacred Archival Reel</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Archival Glimpses of Shree Ambabai
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed">
              Experience timeless moments of divinity rolling through an authentic 35mm celluloid film reel. Hover over any frame to pause, click to inspect.
            </p>
          </div>

          {/* Reel Interactive Bar */}
          <div className="flex items-center justify-between max-w-5xl mx-auto text-xs text-stone-400 px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 text-amber-300 transition-all cursor-pointer font-medium shadow-sm hover:border-amber-400"
              >
                {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                <span>{isPlaying ? "Pause Reel" : "Play Reel"}</span>
              </button>
              <span className="hidden sm:inline text-stone-500">•</span>
              <span className="hidden sm:inline text-[11px] font-mono text-stone-400">
                8 Sacred Frames (35mm Stock)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-amber-400/80 hidden sm:inline">
                Hover to pause • Click to enlarge
              </span>
              <Link
                href="/gallery"
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 decoration-amber-500/50"
              >
                Full Gallery →
              </Link>
            </div>
          </div>
        </div>

        {/* 35mm Celluloid Film Reel Strip */}
        <div
          ref={filmTrackRef}
          className="relative w-full overflow-hidden mt-6 py-2 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Moving Film Strip Track */}
          <div
            className="flex items-stretch will-change-transform"
            style={{
              width: "max-content",
              animation: "filmReelRoll 40s linear infinite",
              animationPlayState: !isPlaying || isHovered ? "paused" : "running",
            }}
          >
            {REEL_TRACK.map((photo, idx) => {
              const actualIndex = idx % FILM_PHOTOS.length;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(actualIndex)}
                  className="group shrink-0 w-[290px] sm:w-[360px] md:w-[410px] bg-black border-r-8 border-l border-black cursor-pointer transition-transform duration-300 hover:scale-[1.015] relative flex flex-col justify-between shadow-2xl"
                >
                  {/* Top Sprocket Perforations Rail (Matching 35mm film) */}
                  <div className="bg-black py-2 sm:py-2.5 px-3 flex items-center justify-between border-b border-neutral-900">
                    {Array.from({ length: 6 }).map((_, s) => (
                      <div
                        key={s}
                        className="w-3.5 sm:w-4 h-2 sm:h-2.5 bg-neutral-100 rounded-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.85)] border border-neutral-600/40"
                      />
                    ))}
                  </div>

                  {/* Film Header Metadata Strip */}
                  <div className="bg-black px-3 py-1 flex items-center justify-between text-[10px] font-mono tracking-widest text-amber-500/80 uppercase border-b border-neutral-900">
                    <span className="flex items-center gap-1">
                      <span>▶</span>
                      <span>{String(actualIndex + 1).padStart(2, "0")}A</span>
                    </span>
                    <span className="text-stone-400">KODAK 35mm FILM</span>
                    <span className="text-amber-300/80 truncate max-w-[120px]">{photo.tag}</span>
                  </div>

                  {/* Film Frame Photo Window with Rounded Corners */}
                  <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden mx-2.5 sm:mx-3 my-2 rounded-xl border border-neutral-800 shadow-2xl">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter sepia-[0.06] contrast-[1.04]"
                    />
                    {/* Hover Glow & Inspect Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-[11px] text-white font-medium flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20">
                        <ZoomIn className="size-3.5 text-amber-400" />
                        <span>Inspect Frame</span>
                      </span>
                      <span className="text-[11px] text-amber-300 font-mono">
                        {photo.code}
                      </span>
                    </div>
                  </div>

                  {/* Film Caption Bar */}
                  <div className="bg-black px-3 py-1.5 flex items-center justify-between text-left">
                    <div className="space-y-0.5 max-w-[82%]">
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-100 truncate group-hover:text-amber-400 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-stone-400 font-serif italic truncate">
                        {photo.marathi}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-400/90 bg-amber-950/70 border border-amber-600/40 px-2 py-0.5 rounded">
                      #{actualIndex + 1}
                    </span>
                  </div>

                  {/* Bottom Sprocket Perforations Rail (Matching 35mm film) */}
                  <div className="bg-black py-2 sm:py-2.5 px-3 flex items-center justify-between border-t border-neutral-900">
                    {Array.from({ length: 6 }).map((_, s) => (
                      <div
                        key={s}
                        className="w-3.5 sm:w-4 h-2 sm:h-2.5 bg-neutral-100 rounded-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.85)] border border-neutral-600/40"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Keyframes for Seamless Continuous Film Roll */}
        <style jsx global>{`
          @keyframes filmReelRoll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
        `}</style>
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
                {activeIndex + 1} / {FILM_PHOTOS.length}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-300 hidden sm:inline-block bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {FILM_PHOTOS[activeIndex].tag}
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
                  prev !== null ? (prev - 1 + FILM_PHOTOS.length) % FILM_PHOTOS.length : null
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
                src={FILM_PHOTOS[activeIndex].src}
                alt={FILM_PHOTOS[activeIndex].title}
                className="max-h-[66vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/15 ring-1 ring-amber-500/20"
              />
            </motion.div>

            {/* Next Button */}
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev !== null ? (prev + 1) % FILM_PHOTOS.length : null
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
                {FILM_PHOTOS[activeIndex].title}
              </h3>
              <span className="text-xs sm:text-sm text-amber-400 font-medium font-serif">
                ({FILM_PHOTOS[activeIndex].marathi})
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              {FILM_PHOTOS[activeIndex].caption}
            </p>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {FILM_PHOTOS.map((_, dotIdx) => (
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

      {/* 5. Mission / Vision / Values — Small, Proper & Refined */}
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

      {/* 6. How We Serve You */}
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
              className="group p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden"
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
              {
                icon: Flame,
                title: "Online Puja Booking",
                desc: "Book personalized pujas performed by hereditary Shreepujak.",
              },
              {
                icon: Sparkles,
                title: "Chadhava / Arpan",
                desc: "Offer Regular Otee, Saree Otee, directly to Goddess Mahalaxmi.",
              },
              {
                icon: Package,
                title: "Naivedya / Bhog",
                desc: "Offer Puranpoli Naivedya and sacred Bhojan in your family name.",
              },
              {
                icon: Users,
                title: "Annadan & Gou Seva",
                desc: "Contribute to sacred Annadan and Goushala Gou Seva.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border-2 border-amber-200/90 hover:border-amber-400 hover:shadow-xl transition-all duration-300 shadow-md flex gap-4 items-start"
              >
                <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30 shrink-0">
                  <s.icon className="size-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-amber-950 text-lg mb-1">{s.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose MahalaxmiPuja Section */}
        <div className="border-t border-amber-900/10 pt-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300 inline-block">
              Devotee Reassurance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Why Choose MahalaxmiPuja?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
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
                className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center space-y-3.5"
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
